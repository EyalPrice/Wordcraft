// Wordcraft – main game screen.
import { ART, PEOPLE_ART, DRESS_ART, SKINS, characterBase, svg } from './art.js';
import { PLACES, ITEMS, COLORS, ACTIONS, FEELINGS, RANKS, itemsFor, itemById, placeById } from './data.js';
import { STR } from './i18n.js';
import { sfx, setSound } from './sound.js';
import { say } from './speech.js';
import { state, save, resetAll, nextUid, recordWordResult, addPoints, learnWord, rankIndex, setDemo, replaceState } from './state.js';
import { runWordTask, runSentenceTask, confirmBox, ICON } from './tasks.js';
import { logoHTML } from './logo.js';

const app = document.getElementById('app');
const t = () => STR[state.ui];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rand = (a) => a[Math.floor(Math.random() * a.length)];

const SKY = ['cloud', 'sun', 'kite', 'bird', 'butterfly'];
const WALL = ['window', 'curtain', 'picture', 'clock', 'mirror'];

let view = { place: null, cat: null, sel: null };

// ---------- art helpers ----------
function artFor(item, inst = {}) {
  const color = inst.color || item.color;
  if (item.person) return svg(PEOPLE_ART[item.person](color, inst.skin || SKINS[1]));
  if (item.dress) {
    const d = DRESS_ART[item.dress[inst.v || 0]];
    return svg((d.back ? d.back(color) : '') + d.d(color), d.box);
  }
  return svg(ART[item.art[inst.v || 0]](color));
}
const variantsOf = (item) => (item.art || item.dress || [null]).length;
const isLocked = (item) => item.rare && !state.unlocked.includes(item.id);
const prizeRank = (id) => RANKS.findIndex((r) => r.prize === id);
const topicOf = (placeId) => placeId;

// ---------- top-level render ----------
function render() {
  document.documentElement.lang = state.ui;
  document.documentElement.dir = t().dir;
  setSound(state.sound);
  if (!view.place) renderHome(); else renderWorld();
}

function header() {
  return `<header class="topbar" dir="ltr">
    <a class="mini-logo" href="./" aria-label="Wordcraft">${logoHTML({ subtitle: false })}</a>
    <nav class="top-actions" dir="${t().dir}">
      <button class="btn ghost" data-act="home">${ICON_PLACES}<span>${t().places}</span></button>
      <button class="btn ghost glowable${state.newPrize ? ' glow' : ''}" data-act="progress">${ICON_STAR}<span>${t().progress}</span></button>
      <button class="btn ghost" data-act="dict">${ICON_BOOK}<span>${t().dictionary}</span></button>
      <button class="btn ghost icon-only" data-act="settings" aria-label="${t().settings}">${ICON_GEAR}</button>
    </nav>
  </header>`;
}

function bindHeader() {
  app.querySelectorAll('[data-act]').forEach((b) => {
    b.onclick = () => {
      sfx.tap();
      const a = b.dataset.act;
      if (a === 'home') { view = { place: null }; render(); }
      if (a === 'progress') openProgress();
      if (a === 'dict') openDictionary();
      if (a === 'settings') openSettings();
    };
  });
}

// ---------- home: choose a place ----------
function renderHome() {
  const cards = PLACES.map((p) => {
    const w = state.worlds[p.id];
    const n = p.id === 'dressup' ? Object.keys(w.char.slots).length : w.items.length;
    return `<button class="place-card" data-place="${p.id}">
      <span class="place-art">${placePreview(p.id)}</span>
      <span class="place-name">${esc(p[state.ui])}</span>
      <span class="place-en" dir="ltr" lang="en">${esc(p.en)}</span>
      ${n ? `<span class="place-count">${n}</span>` : ''}
    </button>`;
  }).join('');
  app.innerHTML = `${header()}
    <main class="home">
      <h1 class="home-title">${t().choosePlace}</h1>
      <p class="home-sub">${t().tapToAdd}</p>
      <div class="place-grid">${cards}
        <div class="place-card soon" aria-disabled="true"><span class="place-name">${t().morePlaces}</span><span class="place-en">${t().morePlacesSub}</span></div>
      </div>
      <p class="small center">${t().savedLocal}</p>
    </main>`;
  bindHeader();
  app.querySelectorAll('[data-place]').forEach((b) => {
    b.onclick = () => { sfx.whoosh(); view = { place: b.dataset.place, cat: placeById(b.dataset.place).cats[0].id, sel: null }; state.lastPlace = view.place; save(); render(); };
  });
}

function placePreview(id) {
  const show = { bedroom: ['bed', 'lamp', 'plant'], dressup: ['shirt', 'hat', 'shoes'], park: ['tree', 'swing', 'flower'], track: ['car', 'flag', 'cone'] }[id];
  return show.map((k) => `<span>${artFor(itemById(k))}</span>`).join('');
}

// ---------- world screen ----------
function renderWorld() {
  const p = placeById(view.place);
  const cats = [...p.cats, { id: '_bg', he: t().background, en: t().background }];
  app.innerHTML = `${header()}
    <main class="world" dir="ltr">
      <section class="scene-wrap">
        <div class="scene scene-${p.id}" id="scene" aria-label="${esc(p[state.ui])}"></div>
        <div class="toolbar" id="toolbar" dir="${t().dir}" hidden></div>
      </section>
      <aside class="panel" dir="${t().dir}">
        <h2 class="panel-title">${esc(p[state.ui])} <span class="en" dir="ltr" lang="en">${esc(p.en)}</span></h2>
        <div class="cats" role="tablist">${cats.map((c) => `<button role="tab" class="cat${c.id === view.cat ? ' on' : ''}" aria-selected="${c.id === view.cat}" data-cat="${c.id}">${esc(c.id === '_bg' ? t().background : c[state.ui] || c.he)}</button>`).join('')}</div>
        <div class="grid" id="grid"></div>
      </aside>
    </main>`;
  bindHeader();
  app.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { sfx.tap(); view.cat = b.dataset.cat; renderWorld(); }; });
  drawScene();
  drawGrid();
}

function drawGrid() {
  const grid = document.getElementById('grid');
  const p = placeById(view.place);
  if (view.cat === '_bg') {
    grid.innerHTML = p.surfaces.map((s) => `<button class="tile-item surface" data-surf="${s.id}">
      <span class="swatch-big" style="background:${state.worlds[p.id].bg[s.id]}"></span>
      <span class="lbl">${esc(s.he && state.ui === 'he' ? s.he : s.en)}</span>
      ${state.learned['_' + s.id] ? `<span class="en" dir="ltr" lang="en">${esc(s.en)}</span>` : ''}</button>`).join('');
    grid.querySelectorAll('[data-surf]').forEach((b) => { b.onclick = () => openPalette(b, (c) => changeSurface(b.dataset.surf, c)); });
    return;
  }
  const items = itemsFor(view.place).filter((it) => it.cat === view.cat);
  const tiles = [];
  for (const it of items) {
    for (let v = 0; v < variantsOf(it); v++) {
      const lock = isLocked(it);
      const learned = state.learned[it.id];
      tiles.push(`<button class="tile-item${lock ? ' locked' : ''}" data-id="${it.id}" data-v="${v}" ${lock ? 'aria-disabled="true"' : ''} aria-label="${esc(learned ? it.en : it.he)}">
        <span class="tile-art">${artFor(it, { v })}</span>
        ${learned ? `<span class="en" dir="ltr" lang="en">${esc(it.en)}</span>` : `<span class="lbl">${esc(state.ui === 'he' ? it.he : '?')}</span>`}
        ${lock ? `<span class="lock">${ICON_LOCK}<small>${t().prizeLocked} ${esc(RANKS[prizeRank(it.id)][state.ui])}</small></span>` : ''}
      </button>`);
    }
  }
  grid.innerHTML = tiles.join('');
  grid.querySelectorAll('.tile-item:not(.locked)').forEach((b) => { b.onclick = () => addItem(itemById(b.dataset.id), +b.dataset.v); });
  grid.querySelectorAll('.tile-item.locked').forEach((b) => { b.onclick = () => { sfx.wrong(); toast(`${t().prizeLocked} ${RANKS[prizeRank(b.dataset.id)][state.ui]}`); }; });
}

// ---------- the scene ----------
function drawScene() {
  const sc = document.getElementById('scene');
  const p = placeById(view.place);
  const w = state.worlds[p.id];
  const [s0, s1] = p.surfaces;
  sc.style.setProperty('--s0', w.bg[s0.id]);
  sc.style.setProperty('--s1', s1 ? w.bg[s1.id] : w.bg[s0.id]);
  sc.style.setProperty('--split', p.split + '%');
  if (p.id === 'dressup') return drawCharacter(sc);
  sc.innerHTML = w.items.length ? '' : `<p class="scene-empty">${t().emptyScene}</p>`;
  w.items.forEach((inst) => {
    const it = itemById(inst.id);
    if (!it) return;
    const el = document.createElement('div');
    const act = it.person && inst.action ? (ACTIONS.find((a) => a.en === inst.action) || {}).cls : '';
    el.className = `placed${view.sel === inst.uid ? ' sel' : ''} ${act || ''}`;
    el.style.left = inst.x + '%';
    el.style.top = inst.y + '%';
    el.style.width = inst.w + '%';
    el.dataset.uid = inst.uid;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', state.learned[it.id] ? it.en : it.he);
    el.innerHTML = `<div class="flipper" style="transform:scaleX(${inst.flip ? -1 : 1})">${artFor(it, inst)}</div>${inst.action === 'sleeping' ? '<span class="zz">z z</span>' : ''}`;
    sc.appendChild(el);
    makeDraggable(el, inst, sc);
  });
  sc.onclick = (e) => { if (e.target === sc || e.target.classList.contains('scene-empty')) select(null); };
  showToolbar();
}

function makeDraggable(el, inst, sc) {
  let start = null;
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    const r = sc.getBoundingClientRect();
    start = { x: e.clientX, y: e.clientY, ix: inst.x, iy: inst.y, r, moved: false };
  });
  el.addEventListener('pointermove', (e) => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (!start.moved && Math.hypot(dx, dy) < 5) return;
    start.moved = true;
    inst.x = Math.max(0, Math.min(100, start.ix + (dx / start.r.width) * 100));
    inst.y = Math.max(0, Math.min(100, start.iy + (dy / start.r.height) * 100));
    el.style.left = inst.x + '%';
    el.style.top = inst.y + '%';
    el.classList.add('dragging');
  });
  const end = () => {
    if (!start) return;
    const moved = start.moved;
    start = null;
    el.classList.remove('dragging');
    if (moved) save();
    else { select(inst.uid); const it = itemById(inst.id); if (state.learned[it.id]) say(it.en); }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 5 : 1.5;
    const k = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (k) { e.preventDefault(); inst.x = Math.max(0, Math.min(100, inst.x + k[0])); inst.y = Math.max(0, Math.min(100, inst.y + k[1])); el.style.left = inst.x + '%'; el.style.top = inst.y + '%'; save(); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(inst.uid); }
  });
}

function select(uid) {
  view.sel = uid;
  document.querySelectorAll('.placed, .char-wrap').forEach((x) => x.classList.toggle('sel', x.dataset.uid == uid));
  showToolbar();
}

function showToolbar() {
  const tb = document.getElementById('toolbar');
  if (!tb) return;
  const w = state.worlds[view.place];
  if (view.place === 'dressup') return charToolbar(tb);
  const inst = w.items.find((x) => x.uid === view.sel);
  if (!inst) { tb.hidden = true; return; }
  const it = itemById(inst.id);
  const learned = state.learned[it.id];
  tb.hidden = false;
  tb.innerHTML = `
    <span class="tb-name" dir="ltr" lang="en">${esc(learned ? it.en : it.he)}</span>
    <button class="tb" data-tb="hear" aria-label="${t().hear}">${ICON.speaker}</button>
    <button class="tb" data-tb="color">${ICON_PAINT}<span>${t().color}</span></button>
    ${it.person ? `<button class="tb" data-tb="action">${ICON_RUN}<span>${t().action}</span></button><button class="tb" data-tb="skin">${ICON_FACE}<span>${t().skin}</span></button>` : ''}
    <button class="tb" data-tb="bigger" aria-label="${t().bigger}">${ICON_PLUS}</button>
    <button class="tb" data-tb="smaller" aria-label="${t().smaller}">${ICON_MINUS}</button>
    <button class="tb" data-tb="flip" aria-label="${t().flip}">${ICON_FLIP}</button>
    <button class="tb" data-tb="front" aria-label="${t().front}">${ICON_FRONT}</button>
    <button class="tb danger" data-tb="remove" aria-label="${t().remove}">${ICON_TRASH}</button>`;
  tb.querySelectorAll('[data-tb]').forEach((b) => {
    b.onclick = () => {
      const a = b.dataset.tb;
      if (a === 'hear') say(it.en);
      if (a === 'bigger') { inst.w = Math.min(70, inst.w * 1.15); sfx.tap(); }
      if (a === 'smaller') { inst.w = Math.max(4, inst.w / 1.15); sfx.tap(); }
      if (a === 'flip') { inst.flip = !inst.flip; sfx.tap(); }
      if (a === 'front') { w.items.splice(w.items.indexOf(inst), 1); w.items.push(inst); sfx.tap(); }
      if (a === 'remove') { w.items.splice(w.items.indexOf(inst), 1); view.sel = null; sfx.whoosh(); }
      if (a === 'color') return openPalette(b, (c) => changeColor(inst, it, c));
      if (a === 'action') return openList(b, ACTIONS, (x) => changeAction(inst, it, x));
      if (a === 'skin') return openSkins(b, (s) => { inst.skin = s; save(); drawScene(); });
      save();
      drawScene();
    };
  });
}

// ---------- dress-up character ----------
function drawCharacter(sc) {
  const ch = state.worlds.dressup.char;
  const base = characterBase(ch.skin, ch.feeling);
  const layer = (slot) => {
    const s = ch.slots[slot];
    if (!s) return '';
    const it = itemById(s.id);
    const d = DRESS_ART[it.dress[s.v || 0]];
    return d.d(s.color || it.color);
  };
  const hair = ch.slots.hair ? DRESS_ART[itemById('hair').dress[ch.slots.hair.v || 0]] : null;
  const back = hair && hair.back ? hair.back(ch.slots.hair.color) : '';
  const inner = back + base.body + layer('bottom') + layer('feet') + layer('top') + layer('dress') + layer('outer') + layer('neck') + layer('side') + base.head + layer('hair') + layer('eyes') + layer('head');
  sc.innerHTML = `<button class="char-wrap${view.sel === 'char' ? ' sel' : ''}" data-uid="char" aria-label="character">${svg(inner, '0 0 200 400')}</button>`;
  sc.querySelector('.char-wrap').onclick = (e) => { e.stopPropagation(); select('char'); };
  sc.onclick = () => select(null);
  showToolbar();
}

function charToolbar(tb) {
  const ch = state.worlds.dressup.char;
  if (view.sel !== 'char') { tb.hidden = true; return; }
  tb.hidden = false;
  const worn = Object.entries(ch.slots).map(([slot, s]) => {
    const it = itemById(s.id);
    return `<button class="tb worn" data-slot="${slot}" aria-label="${esc(it.en)}"><span class="mini">${artFor(it, s)}</span></button>`;
  }).join('');
  tb.innerHTML = `
    <button class="tb" data-tb="feeling">${ICON_FACE}<span>${t().feeling}</span></button>
    <button class="tb" data-tb="skin">${ICON_DROP}<span>${t().skin}</span></button>
    ${worn}`;
  tb.querySelector('[data-tb="feeling"]').onclick = (e) => openList(e.currentTarget, FEELINGS, changeFeeling);
  tb.querySelector('[data-tb="skin"]').onclick = (e) => openSkins(e.currentTarget, (s) => { ch.skin = s; save(); drawScene(); });
  tb.querySelectorAll('[data-slot]').forEach((b) => {
    b.onclick = () => {
      const s = ch.slots[b.dataset.slot];
      const it = itemById(s.id);
      if (state.learned[it.id]) say(it.en);
      popover(b, `<div class="pop-row">
        <button class="tb" data-p="color">${ICON_PAINT}<span>${t().color}</span></button>
        <button class="tb danger" data-p="remove">${ICON_TRASH}<span>${t().remove}</span></button></div>`, (pop, close) => {
        pop.querySelector('[data-p="color"]').onclick = () => { close(); openPalette(b, (c) => changeColor(s, it, c)); };
        pop.querySelector('[data-p="remove"]').onclick = () => { close(); delete ch.slots[b.dataset.slot]; sfx.whoosh(); save(); drawScene(); };
      });
    };
  });
}

// ---------- adding items (word task) ----------
async function addItem(item, v) {
  sfx.tap();
  const topic = topicOf(view.place);
  const pool = itemsFor(view.place).filter((x) => x.id !== item.id).map((x) => x.en);
  const extra = ITEMS.filter((x) => x.id !== item.id && !pool.includes(x.en)).map((x) => x.en);
  const r = await runWordTask({ word: item.en, artSvg: artFor(item, { v }), level: state.levels[topic], distractors: pool.length >= 3 ? pool : pool.concat(extra) });
  if (!r.ok) return;
  learnWord(item.id);
  recordWordResult(topic, r);
  if (r.fellBack) state.review = state.review.filter((x) => x.id !== item.id).concat({ id: item.id, place: view.place });
  placeItem(item, v);
  sfx.pop();
  const res = addPoints(10 + (r.firstTry ? 5 : 0));
  afterSuccess(res);
  maybeReview(item.id);
}

function placeItem(item, v) {
  if (view.place === 'dressup') {
    const slot = DRESS_ART[item.dress[v]].slot;
    state.worlds.dressup.char.slots[slot] = { id: item.id, v, color: item.color };
    view.sel = 'char';
  } else {
    const p = placeById(view.place);
    const y = SKY.includes(item.id) ? 12 + Math.random() * 20
      : WALL.includes(item.id) ? p.split * (0.35 + Math.random() * 0.3)
      : p.split + (100 - p.split) * (0.3 + Math.random() * 0.35);
    const inst = { uid: nextUid(), id: item.id, v, x: 20 + Math.random() * 60, y, w: item.w || 14, color: item.color };
    if (item.person) inst.skin = rand(SKINS);
    state.worlds[view.place].items.push(inst);
    view.sel = inst.uid;
  }
  save();
  drawScene();
  drawGrid();
  const el = document.querySelector('.placed.sel, .char-wrap');
  if (el) { el.classList.add('pop-in'); }
}

async function maybeReview(justId) {
  const q = state.review.find((x) => x.id !== justId);
  if (!q || Math.random() > 0.5) return;
  const item = itemById(q.id);
  const pool = itemsFor(q.place).filter((x) => x.id !== item.id).map((x) => x.en);
  await wait(500);
  const r = await runWordTask({ word: item.en, artSvg: artFor(item), level: state.levels[q.place] || 1, distractors: pool, forceType: rand(['type', 'scramble']), badge: t().review });
  if (r.ok && !r.fellBack) {
    state.review = state.review.filter((x) => x.id !== q.id);
    afterSuccess(addPoints(5, { countSuccess: false }));
  }
  save();
}

// ---------- changing things (sentence tasks) ----------
async function changeColor(inst, it, color) {
  const subject = it.person ? 'shirt' : it.en;
  const preview = { ...inst, color: color.hex };
  const r = await runSentenceTask({ kind: 'color', artSvg: artFor(it, preview), subject, value: color.en, valueHe: color.he, swatch: color.hex, level: state.levels.sentences });
  if (!r.ok) return;
  inst.color = color.hex;
  sfx.paint();
  if (it.person) learnWord('_shirt');
  sentenceDone(r);
}

async function changeSurface(surfId, color) {
  const p = placeById(view.place);
  const s = p.surfaces.find((x) => x.id === surfId);
  const box = `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="10" y="10" width="80" height="80" rx="14" fill="${color.hex}" stroke="#0A2540" stroke-width="2.5"/></svg>`;
  const r = await runSentenceTask({ kind: 'surface', artSvg: box, subject: s.en, value: color.en, valueHe: `${s.he} · ${color.he}`, swatch: color.hex, level: state.levels.sentences });
  if (!r.ok) return;
  state.worlds[p.id].bg[surfId] = color.hex;
  learnWord('_' + surfId);
  sfx.paint();
  sentenceDone(r);
}

async function changeAction(inst, it, action) {
  const r = await runSentenceTask({ kind: 'action', artSvg: artFor(it, inst), subject: it.en, value: action.en, valueHe: action.he, level: state.levels.sentences });
  if (!r.ok) return;
  inst.action = action.en === 'standing' ? null : action.en;
  sentenceDone(r);
}

async function changeFeeling(f) {
  const ch = state.worlds.dressup.char;
  const face = characterBase(ch.skin, f.en).head;
  const r = await runSentenceTask({ kind: 'feeling', artSvg: svg(face, '50 30 100 100'), subject: 'I', value: f.en, valueHe: f.he, level: state.levels.sentences });
  if (!r.ok) return;
  ch.feeling = f.en;
  sentenceDone(r);
}

function sentenceDone(r) {
  recordWordResult('sentences', r);
  const res = addPoints(15 + (r.firstTry ? 5 : 0));
  save();
  drawScene();
  if (view.cat === '_bg') drawGrid();
  afterSuccess(res);
}

// ---------- rewards ----------
function afterSuccess(res) {
  if (res.surprise) { confetti(); sfx.sparkle(); toast(t().surprise); }
  if (res.prize) { confetti(); sfx.sparkle(); toast(t().newPrize); }
  save();
  const g = document.querySelector('[data-act="progress"]');
  if (g) g.classList.toggle('glow', state.newPrize);
  maybeEnglish();
}

async function maybeEnglish() {
  if (state.englishAsked || state.ui === 'en') return;
  const all3 = Object.values(state.levels).every((l) => l >= 3);
  if (!all3 || Object.keys(state.learned).length < 25) return;
  state.englishAsked = true;
  save();
  await wait(900);
  if (await confirmBox(t().switchEnglish)) { state.ui = 'en'; save(); render(); }
}

// ---------- popovers ----------
function popover(anchor, html, bind) {
  closePopovers();
  const pop = document.createElement('div');
  pop.className = 'popover';
  pop.dir = t().dir;
  pop.innerHTML = html;
  document.body.appendChild(pop);
  const r = anchor.getBoundingClientRect();
  const pr = pop.getBoundingClientRect();
  let left = Math.min(window.innerWidth - pr.width - 8, Math.max(8, r.left + r.width / 2 - pr.width / 2));
  let top = r.top - pr.height - 8;
  if (top < 8) top = r.bottom + 8;
  pop.style.left = left + 'px';
  pop.style.top = top + window.scrollY + 'px';
  const close = () => pop.remove();
  setTimeout(() => document.addEventListener('pointerdown', function h(e) { if (!pop.contains(e.target)) { close(); document.removeEventListener('pointerdown', h); } }), 0);
  bind(pop, close);
}
function closePopovers() { document.querySelectorAll('.popover').forEach((p) => p.remove()); }

function openPalette(anchor, onPick) {
  popover(anchor, `<div class="palette">${COLORS.map((c, i) => `<button class="sw" style="background:${c.hex}" data-i="${i}" aria-label="${esc(c.he)}"></button>`).join('')}</div>`, (pop, close) => {
    pop.querySelectorAll('.sw').forEach((b) => { b.onclick = () => { close(); onPick(COLORS[+b.dataset.i]); }; });
  });
}
function openSkins(anchor, onPick) {
  popover(anchor, `<div class="palette">${SKINS.map((s) => `<button class="sw" style="background:${s}" data-s="${s}" aria-label="${t().skin}"></button>`).join('')}</div>`, (pop, close) => {
    pop.querySelectorAll('.sw').forEach((b) => { b.onclick = () => { close(); sfx.tap(); onPick(b.dataset.s); }; });
  });
}
function openList(anchor, list, onPick) {
  popover(anchor, `<div class="pop-list">${list.map((x, i) => `<button class="pop-item" data-i="${i}">${esc(x.he)}</button>`).join('')}</div>`, (pop, close) => {
    pop.querySelectorAll('.pop-item').forEach((b) => { b.onclick = () => { close(); onPick(list[+b.dataset.i]); }; });
  });
}

// ---------- windows: progress, dictionary, settings ----------
function sheet(title, html, bind) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}" dir="${t().dir}">
    <div class="sheet-head"><h2>${esc(title)}</h2><button class="icon-btn" data-close aria-label="${t().close}">${ICON.x}</button></div>
    <div class="sheet-body">${html}</div></div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('show'));
  const close = () => { ov.classList.remove('show'); setTimeout(() => ov.remove(), 200); };
  ov.querySelector('[data-close]').onclick = close;
  ov.addEventListener('pointerdown', (e) => { if (e.target === ov) close(); });
  ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  ov.querySelector('[data-close]').focus();
  if (bind) bind(ov, close);
}

function openProgress() {
  const i = rankIndex();
  const cur = RANKS[i], next = RANKS[i + 1];
  const pct = next ? Math.round(((state.points - cur.points) / (next.points - cur.points)) * 100) : 100;
  const prizes = RANKS.filter((r) => r.prize).map((r) => {
    const it = itemById(r.prize);
    const got = state.unlocked.includes(r.prize);
    return `<div class="prize${got ? ' got' : ''}"><span class="tile-art">${artFor(it)}</span>
      <span>${got ? `<b dir="ltr" lang="en">${esc(it.en)}</b>` : `${ICON_LOCK} ${esc(r[state.ui])}`}</span></div>`;
  }).join('');
  sheet(t().progress, `
    <div class="rank-card"><span class="rank-label">${t().rank}</span><span class="rank-name">${esc(cur[state.ui])}</span>
      <span class="rank-pts">${state.points} ${t().points}</span></div>
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
    <p class="small">${next ? `${next.points - state.points} ${t().points} ${t().nextRank}: ${esc(next[state.ui])}` : ''}</p>
    <h3>${t().prizes}</h3><div class="prizes">${prizes}</div>`);
  state.newPrize = false;
  save();
  document.querySelector('[data-act="progress"]')?.classList.remove('glow');
}

function openDictionary() {
  const words = ITEMS.filter((it) => state.learned[it.id]);
  const html = words.length ? `<div class="dict">${words.map((it) => `<button class="dict-item" data-say="${esc(it.en)}">
      <span class="tile-art">${artFor(it)}</span><b dir="ltr" lang="en">${esc(it.en)}</b><span>${esc(it.he)}</span></button>`).join('')}</div>`
    : `<p>${t().noWords}</p>`;
  sheet(`${t().wordsLearned} (${words.length})`, html, (ov) => {
    ov.querySelectorAll('[data-say]').forEach((b) => { b.onclick = () => say(b.dataset.say); });
  });
}

function openSettings() {
  const lv = Object.keys(state.levels).map((k) => `<div class="set-row"><span>${esc(t().topics[k])}</span>
    <div class="seg" role="radiogroup" aria-label="${esc(t().topics[k])}">${[1, 2, 3].map((n) => `<button role="radio" aria-checked="${state.levels[k] === n}" class="${state.levels[k] === n ? 'on' : ''}" data-lv="${k}" data-n="${n}">${n}</button>`).join('')}</div></div>`).join('');
  sheet(t().settings, `
    <h3>${t().level}</h3><p class="small">${t().levelNote}</p>${lv}
    <h3>${t().language}</h3>
    <div class="seg wide"><button class="${state.ui === 'he' ? 'on' : ''}" data-ui="he">עברית</button><button class="${state.ui === 'en' ? 'on' : ''}" data-ui="en">English</button></div>
    <h3>${t().sound}</h3>
    <div class="seg wide"><button class="${state.sound ? 'on' : ''}" data-snd="1">${t().on}</button><button class="${!state.sound ? 'on' : ''}" data-snd="0">${t().off}</button></div>
    <p class="small">${t().savedLocal}</p>
    <button class="btn danger" data-reset>${t().reset}</button>`, (ov, close) => {
    ov.querySelectorAll('[data-lv]').forEach((b) => { b.onclick = () => { state.levels[b.dataset.lv] = +b.dataset.n; state.placement.active = false; save(); close(); openSettings(); }; });
    ov.querySelectorAll('[data-ui]').forEach((b) => { b.onclick = () => { state.ui = b.dataset.ui; state.englishAsked = true; save(); close(); render(); openSettings(); }; });
    ov.querySelectorAll('[data-snd]').forEach((b) => { b.onclick = () => { state.sound = b.dataset.snd === '1'; setSound(state.sound); save(); close(); openSettings(); }; });
    ov.querySelector('[data-reset]').onclick = async () => { if (await confirmBox(t().resetConfirm)) { resetAll(); view = { place: null }; close(); render(); } };
  });
}

// ---------- little effects ----------
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2600);
}
function confetti() {
  const colors = ['#3DDBC4', '#1279B8', '#12855A', '#FFD54F', '#4FB3F0'];
  for (let i = 0; i < 36; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = rand(colors);
    c.style.animationDelay = Math.random() * 0.4 + 's';
    c.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2200);
  }
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- icons ----------
const I = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const SW = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ICON_PLACES = I(`<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" ${SW}/>`);
const ICON_STAR = I(`<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" ${SW}/>`);
const ICON_BOOK = I(`<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7" ${SW}/>`);
const ICON_GEAR = I(`<circle cx="12" cy="12" r="3" ${SW}/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" ${SW}/>`);
const ICON_LOCK = I(`<rect x="5" y="11" width="14" height="10" rx="2" ${SW}/><path d="M8 11V7a4 4 0 0 1 8 0v4" ${SW}/>`);
const ICON_PAINT = I(`<path d="M19 3l2 2-9 9-3 1 1-3z" ${SW}/><path d="M7 14c-2 0-3 1.5-3 3 0 1.5-1 2-2 2 1 1.5 3 2 5 2 2.5 0 4-1.5 4-4" ${SW}/>`);
const ICON_RUN = I(`<circle cx="14" cy="4" r="2" ${SW}/><path d="M6 20l3-6 3 2v5M9 14l1-5 4 2 3 3M10 9L7 10l-2 3" ${SW}/>`);
const ICON_FACE = I(`<circle cx="12" cy="12" r="9" ${SW}/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" ${SW}/>`);
const ICON_DROP = I(`<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" ${SW}/>`);
const ICON_PLUS = I(`<path d="M12 5v14M5 12h14" ${SW}/>`);
const ICON_MINUS = I(`<path d="M5 12h14" ${SW}/>`);
const ICON_FLIP = I(`<path d="M12 3v18M8 7L3 12l5 5M16 7l5 5-5 5" ${SW}/>`);
const ICON_FRONT = I(`<rect x="8" y="8" width="12" height="12" rx="2" ${SW}/><path d="M4 16V5a1 1 0 0 1 1-1h11" ${SW}/>`);
const ICON_TRASH = I(`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" ${SW}/>`);

// ---------- demo scenes (for the website screenshots): play.html?demo=bedroom ----------
function demo(place) {
  setDemo(true);
  const s = JSON.parse(JSON.stringify(state));
  const add = (id, x, y, w, extra = {}) => s.worlds[place].items.push({ uid: s.uid++, id, v: 0, x, y, w: w || itemById(id).w, color: itemById(id).color, ...extra });
  if (place === 'bedroom') {
    s.worlds.bedroom.bg = { wall: '#BFE9F7', floor: '#C99A6B' };
    add('window', 26, 30, 18); add('curtain', 26, 30, 28); add('picture', 62, 28, 13); add('clock', 82, 22, 9);
    add('rug', 50, 86, 40, { color: '#3DDBC4' }); add('bed', 66, 70, 38); add('lamp', 14, 60, 13, { v: 0 }); add('plant', 90, 70, 10);
    add('record_player', 34, 76, 15); add('girl', 46, 72, 11, { skin: '#D7A16E', action: 'dancing', color: '#3FB36F' });
    ['bed', 'window', 'curtain', 'picture', 'clock', 'rug', 'lamp', 'plant', 'record_player', 'girl'].forEach((k) => { s.learned[k] = { n: 1 }; });
  }
  if (place === 'park') {
    add('sun', 84, 16, 12); add('cloud', 22, 16, 18); add('cloud', 56, 10, 13); add('kite', 64, 28, 9);
    add('tree', 16, 52, 26); add('tree', 86, 54, 22, { color: '#2F9A5B' }); add('swing', 40, 64, 22); add('slide', 66, 70, 22);
    add('bench', 22, 82, 20); add('flower', 50, 88, 7); add('flower', 56, 90, 7, { color: '#FFD54F' }); add('dog', 80, 88, 12); add('boy', 40, 74, 10, { skin: '#8A5A3B', action: 'waving' });
    ['sun', 'cloud', 'kite', 'tree', 'swing', 'slide', 'bench', 'flower', 'boy'].forEach((k) => { s.learned[k] = { n: 1 }; });
  }
  if (place === 'track') {
    add('flag', 12, 40, 14); add('traffic_light', 88, 40, 9); add('trophy', 74, 46, 9);
    add('car', 30, 74, 26); add('car', 68, 86, 24, { v: 1, color: '#1279B8' }); add('motorcycle', 56, 66, 17, { color: '#3DDBC4' });
    add('cone', 88, 78, 6); add('cone', 94, 82, 6); add('driver', 46, 44, 10, { skin: '#F1C27D', action: 'jumping' }); add('fan', 30, 44, 10, { skin: '#5E3B25' });
    ['flag', 'traffic_light', 'trophy', 'car', 'motorcycle', 'cone', 'driver', 'fan'].forEach((k) => { s.learned[k] = { n: 1 }; });
  }
  if (place === 'dressup') {
    s.worlds.dressup.bg = { wall: '#E3F4FA' };
    s.worlds.dressup.char = { skin: '#D7A16E', feeling: 'happy', slots: {
      hair: { id: 'hair', v: 2, color: '#2B1B10' }, top: { id: 'shirt', v: 0, color: '#3DDBC4' }, bottom: { id: 'pants', v: 0, color: '#1279B8' },
      feet: { id: 'boots', v: 0, color: '#12855A' }, neck: { id: 'scarf', v: 0, color: '#FFD54F' }, eyes: { id: 'glasses', v: 0, color: '#0B4F8A' } } };
    ['hair', 'shirt', 'pants', 'boots', 'scarf', 'glasses'].forEach((k) => { s.learned[k] = { n: 1 }; });
  }
  replaceState(s);
  view = { place, cat: placeById(place).cats[0].id, sel: null };
}

// ---------- start ----------
const params = new URLSearchParams(location.search);
if (params.get('lang') === 'en' || params.get('lang') === 'he') { state.ui = params.get('lang'); save(); }
if (params.get('demo') && placeById(params.get('demo'))) demo(params.get('demo'));
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !params.get('demo')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
