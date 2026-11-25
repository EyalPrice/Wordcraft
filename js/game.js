// Wordcraft – main game screen.
import { ART, PEOPLE_ART, DRESS_ART, ACCESSORIES, SKINS, HAIR_COLORS, characterBase, svg, shade } from './art.js';
import { WORLD_ART, COLORING } from './art-worlds.js';
import { PLACES, ITEMS, COLORS, TEXTURES, TEXTURE_NAMES, ACTIONS, FEELINGS, RANKS, itemsFor, itemById, placeById, catOf, worldRank } from './data.js';
import { STR } from './i18n.js';
import { sfx, setSound } from './sound.js';
import { say } from './speech.js';
import { state, save, resetAll, nextUid, recordWordResult, addPoints, learnWord, rankIndex, setDemo, replaceState, newChar } from './state.js';
import { runWordTask, runSentenceTask, runKidSay, confirmBox, ICON } from './tasks.js';

Object.assign(ART, WORLD_ART);
import { logoHTML } from './logo.js';

const app = document.getElementById('app');
const t = () => STR[state.ui];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rand = (a) => a[Math.floor(Math.random() * a.length)];

const SKY = ['cloud', 'sun', 'kite', 'bird', 'butterfly'];
const WALL = ['window', 'curtain', 'picture', 'poster', 'clock', 'mirror', 'blackboard', 'map', 'sign_open', 'class_clock'];
// Flat things lie on the floor, so they start in the back layer (behind furniture and people).
const FLAT = ['rug', 'towel', 'sea', 'crater'];
const startsBehind = (id) => FLAT.includes(id) || WALL.includes(id);

// Dress-up character placement inside the 4:3 scene (character box is 200x420).
const CH = { w: 0.94 * 0.75 * (200 / 420) * 100, top: 3, h: 94 };
CH.left = 50 - CH.w / 2;

let view = { place: null, cat: null, sel: null };

// ---------- art ----------
function artFor(item, inst = {}) {
  const color = inst.color || item.color;
  if (item.person) return svg(PEOPLE_ART[item.person](color, inst.skin || SKINS[2], inst.hair || HAIR_COLORS[0]));
  if (item.acc) { const a = DRESS_ART[item.acc[inst.v || 0]]; return svg(a.d(color), a.box); }
  if (item.dress) {
    const d = DRESS_ART[item.dress[inst.v || 0]];
    if (d.slot === 'hair') return svg((d.back ? d.back(color) : '') + '<ellipse cx="100" cy="62" rx="27" ry="33" fill="#E8DACB"/>' + d.d(color), '40 0 120 160');
    return svg((d.back ? d.back(color) : '') + d.d(color), d.box);
  }
  return svg(ART[item.art[inst.v || 0]](color));
}
const variantsOf = (item) => (item.art || item.dress || item.acc || [null]).length;
const isLocked = (item) => item.rare && !state.unlocked.includes(item.id) && !state.test;
const isOpen = (p) => !p.locked || state.test || rankIndex() >= worldRank(p.id);
const curChar = () => state.chars[Math.min(state.charIdx, state.chars.length - 1)];
const itemsOf = (pid) => (pid === 'dressup' ? curChar().acc : state.worlds[pid].items);
const charById = (id) => state.chars.find((c) => c.id === id);
const charName = (ch) => `${t().character} ${ch.n}`;
const sceneWorlds = () => PLACES.filter((p) => !p.coloring && p.id !== 'dressup' && isOpen(p));

// A finished character as one picture (used in rooms and as thumbnails). Box: 200x420.
function charInner(ch) {
  const base = characterBase(ch.skin, ch.feeling);
  const layer = (slot) => { const s = ch.slots[slot]; if (!s) return ''; const it = itemById(s.id); return DRESS_ART[it.dress[s.v || 0]].d(s.color || it.color); };
  const hairS = ch.slots.hair;
  const hairD = hairS ? DRESS_ART[itemById('hair').dress[hairS.v || 0]] : null;
  const accSvg = (a) => {
    const it = itemById(a.id); if (!it) return '';
    const A = ACCESSORIES[it.acc[a.v || 0]];
    const cx = ((a.x - CH.left) / CH.w) * 200, cy = ((a.y - CH.top) / CH.h) * 420;
    const aw = (a.w / CH.w) * 200, ah = aw * (A.box[3] / A.box[2]);
    const k = aw / A.box[2];
    return `<g transform="translate(${cx} ${cy}) rotate(${a.rot || 0}) scale(${a.flip ? -1 : 1} 1) translate(${-aw / 2} ${-ah / 2}) scale(${k})">${A.d(a.color || it.color)}</g>`;
  };
  const behind = ch.acc.filter((a) => itemById(a.id)?.acc?.[a.v || 0] === 'wings');
  const front = ch.acc.filter((a) => !behind.includes(a));
  return behind.map(accSvg).join('') + (hairD && hairD.back ? hairD.back(hairS.color) : '') + base.body + layer('bottom') + layer('feet') + layer('top') + layer('dress') + layer('outer') + layer('neck') + base.head + layer('hair') + front.map(accSvg).join('');
}
const charSVG = (ch) => svg(charInner(ch), '0 0 200 420', 'overflow="visible"');
const prizeRank = (id) => RANKS.findIndex((r) => r.prize === id);

// ---------- textures (CSS backgrounds made from small SVG tiles) ----------
const tile = (w, h, body) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`)}")`;
function texBG(tex, c) {
  const d = shade(c, -9), d2 = shade(c, -18), l = shade(c, 10);
  switch (tex) {
    case 'stripes': return `repeating-linear-gradient(90deg, ${c} 0 26px, ${l} 26px 52px)`;
    case 'dots': return `${tile(28, 28, `<circle cx='14' cy='14' r='3.4' fill='${d}'/>`)}, ${c}`;
    case 'bricks': return `${tile(60, 32, `<rect width='60' height='32' fill='${c}'/><path d='M0 0.5H60M0 16.5H60M30 0V16M0 16V32M60 16V32' stroke='${d2}' stroke-width='2'/><rect x='2' y='3' width='26' height='11' fill='${l}' opacity='.35'/><rect x='32' y='19' width='26' height='11' fill='${l}' opacity='.25'/>`)}`;
    case 'wood': return `${tile(120, 30, `<rect width='120' height='30' fill='${c}'/><path d='M0 29.5H120' stroke='${d2}' stroke-width='1.6'/><path d='M70 0V30' stroke='${d}' stroke-width='1.2'/><path d='M8 10Q30 6 52 12M80 18Q96 14 114 20' stroke='${d}' stroke-width='1' fill='none'/>`)}`;
    case 'checks': return `${tile(40, 40, `<rect width='40' height='40' fill='${c}'/><rect width='20' height='20' fill='${d}'/><rect x='20' y='20' width='20' height='20' fill='${d}'/>`)}`;
    case 'flowers': return `${tile(48, 48, `<rect width='48' height='48' fill='${c}'/><g fill='${l}'><circle cx='12' cy='8' r='3'/><circle cx='16' cy='12' r='3'/><circle cx='12' cy='16' r='3'/><circle cx='8' cy='12' r='3'/></g><circle cx='12' cy='12' r='2' fill='${d2}'/><g fill='${d}'><circle cx='36' cy='32' r='2.4'/><circle cx='39' cy='35' r='2.4'/><circle cx='36' cy='38' r='2.4'/><circle cx='33' cy='35' r='2.4'/></g>`)}`;
    case 'waves': return `${tile(60, 24, `<rect width='60' height='24' fill='${c}'/><path d='M0 12Q15 2 30 12T60 12' stroke='${d}' stroke-width='2.4' fill='none'/>`)}`;
    case 'tiles': return `${tile(46, 46, `<rect width='46' height='46' fill='${c}'/><rect x='1.5' y='1.5' width='43' height='43' rx='2' fill='${l}' opacity='.35' stroke='${d2}' stroke-width='1.4'/>`)}`;
    case 'carpet': return `${tile(12, 12, `<rect width='12' height='12' fill='${c}'/><circle cx='3' cy='4' r='.9' fill='${d}'/><circle cx='9' cy='9' r='.9' fill='${l}'/>`)}`;
    case 'stone': return `${tile(80, 50, `<rect width='80' height='50' fill='${c}'/><path d='M0 22L26 18L40 26L80 20M26 18L22 0M40 26L36 50M60 22L64 50' stroke='${d2}' stroke-width='1.6' fill='none'/>`)}`;
    case 'sunset': return `linear-gradient(to bottom, ${shade(c, -10)} 0%, ${c} 40%, #F7B58A 80%, #F59A7A 100%)`;
    case 'night': return `${tile(90, 70, `<circle cx='12' cy='14' r='1.1' fill='#fff'/><circle cx='54' cy='8' r='1.4' fill='#fff'/><circle cx='76' cy='40' r='1' fill='#fff'/><circle cx='30' cy='52' r='1.2' fill='#fff'/>`)}, linear-gradient(to bottom, #0F1D3A, #26406E)`;
    case 'clouds': return `${tile(220, 120, `<g fill='#fff' opacity='.75'><ellipse cx='50' cy='40' rx='34' ry='12'/><ellipse cx='70' cy='32' rx='22' ry='12'/><ellipse cx='170' cy='86' rx='30' ry='10'/></g>`)}, ${c}`;
    case 'sand': return `${tile(14, 14, `<rect width='14' height='14' fill='#E8D29A'/><circle cx='4' cy='5' r='.8' fill='#C9AE6E'/><circle cx='10' cy='10' r='.7' fill='#F6E6BC'/>`)}`;
    case 'asphalt': return `${tile(16, 16, `<rect width='16' height='16' fill='${c}'/><circle cx='4' cy='4' r='.8' fill='${l}'/><circle cx='11' cy='12' r='.7' fill='${d}'/>`)}`;
    case 'dirt': return `${tile(30, 20, `<rect width='30' height='20' fill='#A67B52'/><ellipse cx='8' cy='6' rx='3' ry='1.4' fill='#8C6440'/><ellipse cx='22' cy='15' rx='2.4' ry='1.2' fill='#BF946A'/>`)}`;
    default: return c;
  }
}

// ---------- top-level render ----------
function render() {
  document.documentElement.lang = state.ui;
  document.documentElement.dir = t().dir;
  setSound(state.sound);
  if (!view.place) renderHome();
  else if (placeById(view.place).coloring) renderColoring();
  else renderWorld();
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
    if (!isOpen(p)) {
      const r = RANKS[worldRank(p.id)];
      return `<div class="place-card locked" aria-disabled="true">
        <span class="place-lock">${ICON_LOCK}</span>
        <span class="place-name">${esc(p[state.ui])}</span>
        <span class="place-en" dir="ltr" lang="en">${esc(p.en)}</span>
        <span class="small">${t().lockedWorld} ${esc(r[state.ui])} · ${r.points} ${t().pointsShort}</span>
      </div>`;
    }
    const w = state.worlds[p.id];
    const n = p.coloring ? Object.keys(state.coloring).length : p.id === 'dressup' ? state.chars.length : w.items.length;
    return `<button class="place-card" data-place="${p.id}">
      <span class="place-art">${placePreview(p.id)}</span>
      <span class="place-name">${esc(p[state.ui])}</span>
      <span class="place-en" dir="ltr" lang="en">${esc(p.en)}</span>
      ${n ? `<span class="place-count">${n}</span>` : ''}
    </button>`;
  }).join('');
  app.innerHTML = `${header()}
    <main class="home">
      ${state.test ? `<p class="test-banner">${t().testMode}</p>` : ''}
      <h1 class="home-title">${t().choosePlace}</h1>
      <p class="home-sub">${t().tapToAdd}</p>
      <div class="place-grid">${cards}</div>
      <p class="small center">${t().savedLocal}</p>
    </main>`;
  bindHeader();
  app.querySelectorAll('[data-place]').forEach((b) => {
    b.onclick = () => { sfx.whoosh(); const p = placeById(b.dataset.place); view = { place: p.id, cat: p.cats[0]?.id, sel: null, page: null }; state.lastPlace = view.place; save(); render(); };
  });
}

function placePreview(id) {
  if (id === 'coloring') return ['lion', 'elephant', 'fish'].map((k) => `<span>${svg(COLORING[k], '0 0 200 200')}</span>`).join('');
  if (id === 'dressup') return state.chars.slice(0, 3).map((c) => `<span class="pv-char">${charSVG(c)}</span>`).join('');
  const show = { bedroom: ['bed', 'lamp', 'plant'], park: ['tree', 'swing', 'dog'], track: ['car', 'flag', 'cone'], garden: ['sunflower', 'watering_can', 'ladybug'],
    kitchen: ['fridge', 'stove', 'cake'], beach: ['beach_umbrella', 'sandcastle', 'crab'], street: ['house', 'stop_sign', 'street_bus'], restaurant: ['pizza', 'burger', 'juice'],
    classroom: ['blackboard', 'globe', 'pencil'], airport: ['airplane', 'suitcase', 'control_tower'], forest: ['castle', 'mushroom', 'owl'], graffiti: ['spray_can', 'tag_wow', 'heart'],
    moon: ['astronaut', 'planet', 'moon_rover'] }[id] || [];
  return show.map((k) => `<span>${artFor(itemById(k))}</span>`).join('');
}

// ---------- world screen ----------
function renderWorld() {
  const p = placeById(view.place);
  const cats = [...p.cats, { id: '_bg', he: t().background, en: t().background }];
  app.innerHTML = `${header()}
    <main class="world" dir="ltr">
      <section class="scene-wrap${p.id === 'dressup' ? ' with-pager' : ''}">
        ${p.id === 'dressup' ? studioBar() : ''}
        <div class="scene scene-${p.id}" id="scene" aria-label="${esc(p[state.ui])}"></div>
        <div class="toolbar" id="toolbar" dir="${t().dir}"></div>
      </section>
      <aside class="panel" dir="${t().dir}">
        <h2 class="panel-title">${esc(p[state.ui])} <span class="en" dir="ltr" lang="en">${esc(p.en)}</span></h2>
        <div class="cats" role="tablist">${cats.map((c) => `<button role="tab" class="cat${c.id === view.cat ? ' on' : ''}" aria-selected="${c.id === view.cat}" data-cat="${c.id}">${esc(c.id === '_bg' ? t().background : c[state.ui] || c.he)}</button>`).join('')}</div>
        <div class="grid" id="grid"></div>
      </aside>
    </main>`;
  bindHeader();
  app.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { sfx.tap(); view.cat = b.dataset.cat; renderWorld(); }; });
  if (p.id === 'dressup') bindStudioBar();
  drawScene();
  drawGrid();
}

function drawGrid() {
  const grid = document.getElementById('grid');
  const p = placeById(view.place);
  const w = state.worlds[p.id];
  if (view.cat === '_bg') {
    grid.innerHTML = p.surfaces.map((s) => `<button class="tile-item surface" data-surf="${s.id}">
      <span class="swatch-big" style="background:${esc(texBG(w.tex[s.id], w.bg[s.id]))}"></span>
      <span class="lbl">${esc(state.ui === 'he' ? s.he : s.en)}</span>
      ${state.learned['_' + s.id] ? `<span class="en" dir="ltr" lang="en">${esc(s.en)}</span>` : ''}</button>`).join('');
    grid.querySelectorAll('[data-surf]').forEach((b) => { b.onclick = () => openSurface(b, b.dataset.surf); });
    return;
  }
  const items = itemsFor(view.place).filter((it) => catOf(it, view.place) === view.cat);
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
  const mine = view.cat === 'people' ? state.chars.map((c) => `<button class="tile-item mine" data-char="${c.id}" aria-label="${esc(charName(c))}">
      <span class="tile-art">${charSVG(c)}</span><span class="lbl">${esc(charName(c))}</span></button>`).join('') : '';
  grid.innerHTML = (mine ? `<p class="grid-head">${t().myCharacters}</p>${mine}<p class="grid-head">${esc(placeById(view.place).cats.find((c) => c.id === 'people')?.[state.ui] || '')}</p>` : '') + tiles.join('');
  grid.querySelectorAll('[data-char]').forEach((b) => { b.onclick = () => putCharIn(view.place, b.dataset.char); });
  grid.querySelectorAll('.tile-item[data-id]:not(.locked)').forEach((b) => { b.onclick = () => addItem(itemById(b.dataset.id), +b.dataset.v); });
  grid.querySelectorAll('.tile-item.locked').forEach((b) => { b.onclick = () => { sfx.wrong(); toast(`${t().prizeLocked} ${RANKS[prizeRank(b.dataset.id)][state.ui]}`); }; });
}

// ---------- the scene ----------
function drawScene() {
  const sc = document.getElementById('scene');
  const p = placeById(view.place);
  const w = state.worlds[p.id];
  const [s0, s1] = p.surfaces;
  sc.innerHTML = '';
  // background layers (always behind the items)
  const top = document.createElement('div');
  top.className = 'surf surf-top';
  top.style.height = p.split + '%';
  top.style.background = texBG(w.tex[s0.id], w.bg[s0.id]);
  sc.appendChild(top);
  if (s1) {
    const bot = document.createElement('div');
    bot.className = 'surf surf-bottom';
    bot.style.top = p.split + '%';
    bot.style.background = texBG(w.tex[s1.id], w.bg[s1.id]);
    if (p.id === 'track') bot.innerHTML = '<span class="kerb"></span><span class="lane"></span>';
    if (p.id === 'bedroom') bot.innerHTML = '<span class="skirting"></span>';
    sc.appendChild(bot);
  }
  if (p.id === 'dressup') drawCharacter(sc);
  const list = itemsOf(p.id);
  if (!list.length && p.id !== 'dressup') sc.insertAdjacentHTML('beforeend', `<p class="scene-empty" dir="${t().dir}">${t().emptyScene}</p>`);
  list.forEach((inst) => {
    const isChar = inst.id === '_char';
    const ch = isChar ? charById(inst.charId) : null;
    const it = isChar ? { person: true, he: ch ? charName(ch) : '', en: 'character' } : itemById(inst.id);
    if (!it || (isChar && !ch)) return;
    const el = document.createElement('div');
    const act = it.person && inst.action ? (ACTIONS.find((a) => a.en === inst.action) || {}).cls : '';
    const behind = it.acc && it.acc[inst.v || 0] === 'wings';
    el.className = `placed${view.sel === inst.uid ? ' sel' : ''} ${act || ''}${behind ? ' behind' : ''}${isChar ? ' is-char' : ''}`;
    el.style.left = inst.x + '%';
    el.style.top = inst.y + '%';
    el.style.width = inst.w + '%';
    el.dataset.uid = inst.uid;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', isChar ? charName(ch) : state.learned[it.id] ? it.en : it.he);
    el.innerHTML = `<div class="flipper" style="transform:rotate(${inst.rot || 0}deg) scaleX(${inst.flip ? -1 : 1})">${isChar ? charSVG(ch) : artFor(it, inst)}</div>${inst.action === 'sleeping' ? '<span class="zz">z z</span>' : ''}`;
    sc.appendChild(el);
    makeDraggable(el, inst, sc);
  });
  sc.onclick = (e) => { if (e.target === sc || e.target.classList.contains('surf') || e.target.classList.contains('scene-empty')) select(null); };
  showToolbar();
}

function makeDraggable(el, inst, sc) {
  let start = null;
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    start = { x: e.clientX, y: e.clientY, ix: inst.x, iy: inst.y, r: sc.getBoundingClientRect(), moved: false };
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
    if (moved) save(); else select(inst.uid); // tapping selects; the word is heard only with the speaker button
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
  document.querySelectorAll('.placed').forEach((x) => x.classList.toggle('sel', x.dataset.uid == uid));
  const cw = document.querySelector('.char-wrap');
  if (cw) cw.classList.toggle('sel', typeof uid === 'string' && (uid === 'char' || uid.startsWith('slot:')));
  showToolbar();
}

function showToolbar() {
  const tb = document.getElementById('toolbar');
  if (!tb) return;
  const list = itemsOf(view.place);
  if (view.place === 'dressup' && typeof view.sel === 'string') return charToolbar(tb);
  const inst = list.find((x) => x.uid === view.sel);
  if (!inst) { tb.classList.add('idle'); tb.innerHTML = `<span class="tb-hint">${t().noneSelected}</span>`; return; }
  tb.classList.remove('idle');
  if (inst.id === '_char') return charInstToolbar(tb, inst, list);
  const it = itemById(inst.id);
  const learned = state.learned[it.id];
  tb.innerHTML = `
    <span class="tb-name" dir="ltr" lang="en">${esc(learned ? it.en : it.he)}</span>
    <button class="tb" data-tb="hear" aria-label="${t().hear}" title="${t().hear}">${ICON.speaker}</button>
    <button class="tb" data-tb="color">${ICON_PAINT}<span>${t().color}</span></button>
    ${it.person ? `<button class="tb" data-tb="action">${ICON_RUN}<span>${t().action}</span></button><button class="tb" data-tb="skin" aria-label="${t().skin}" title="${t().skin}">${ICON_DROP}</button>` : ''}
    <button class="tb" data-tb="bigger" aria-label="${t().bigger}" title="${t().bigger}">${ICON_PLUS}</button>
    <button class="tb" data-tb="smaller" aria-label="${t().smaller}" title="${t().smaller}">${ICON_MINUS}</button>
    <button class="tb" data-tb="rotl" aria-label="${t().rotL}" title="${t().rotL}">${ICON_ROTL}</button>
    <button class="tb" data-tb="rotr" aria-label="${t().rotR}" title="${t().rotR}">${ICON_ROTR}</button>
    <button class="tb" data-tb="flip" aria-label="${t().flip}" title="${t().flip}">${ICON_FLIP}</button>
    <button class="tb" data-tb="front" aria-label="${t().front}" title="${t().front}">${ICON_FRONT}</button>
    <button class="tb" data-tb="back" aria-label="${t().back2}" title="${t().back2}">${ICON_BACK}</button>
    <button class="tb danger" data-tb="remove" aria-label="${t().remove}" title="${t().remove}">${ICON_TRASH}</button>`;
  tb.querySelectorAll('[data-tb]').forEach((b) => {
    b.onclick = () => {
      const a = b.dataset.tb;
      if (a === 'hear') return say(it.en);
      if (a === 'back') { list.splice(list.indexOf(inst), 1); list.unshift(inst); sfx.tap(); }
      if (a === 'bigger') { inst.w = Math.min(80, inst.w * 1.15); sfx.tap(); }
      if (a === 'smaller') { inst.w = Math.max(3, inst.w / 1.15); sfx.tap(); }
      if (a === 'rotl') { inst.rot = ((inst.rot || 0) - 15) % 360; sfx.tap(); }
      if (a === 'rotr') { inst.rot = ((inst.rot || 0) + 15) % 360; sfx.tap(); }
      if (a === 'flip') { inst.flip = !inst.flip; sfx.tap(); }
      if (a === 'front') { list.splice(list.indexOf(inst), 1); list.push(inst); sfx.tap(); }
      if (a === 'remove') { list.splice(list.indexOf(inst), 1); view.sel = null; sfx.whoosh(); }
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
  const ch = curChar();
  const base = characterBase(ch.skin, ch.feeling);
  const layer = (slot) => {
    const s = ch.slots[slot];
    if (!s) return '';
    const d = DRESS_ART[itemById(s.id).dress[s.v || 0]];
    return d.d(s.color || itemById(s.id).color);
  };
  const hairS = ch.slots.hair;
  const hairD = hairS ? DRESS_ART[itemById('hair').dress[hairS.v || 0]] : null;
  const back = hairD && hairD.back ? hairD.back(hairS.color) : '';
  const inner = back + base.body + layer('bottom') + layer('feet') + layer('top') + layer('dress') + layer('outer') + layer('neck') + base.head + layer('hair');
  const wrap = document.createElement('button');
  wrap.className = 'char-wrap' + (typeof view.sel === 'string' ? ' sel' : '');
  wrap.style.left = CH.left + '%';
  wrap.style.width = CH.w + '%';
  wrap.setAttribute('aria-label', 'character');
  wrap.innerHTML = svg(inner, '0 0 200 420');
  wrap.onclick = (e) => { e.stopPropagation(); select('char'); };
  sc.appendChild(wrap);
}

function charToolbar(tb) {
  const ch = curChar();
  tb.classList.remove('idle');
  const slotSel = view.sel.startsWith('slot:') ? view.sel.slice(5) : null;
  const worn = Object.entries(ch.slots).map(([slot, s]) => {
    const it = itemById(s.id);
    return `<button class="tb worn${slot === slotSel ? ' on' : ''}" data-slot="${slot}" aria-label="${esc(it.en)}"><span class="mini">${artFor(it, s)}</span></button>`;
  }).join('');
  let selPart = '';
  if (slotSel && ch.slots[slotSel]) {
    const it = itemById(ch.slots[slotSel].id);
    const learned = state.learned[it.id];
    selPart = `<span class="tb-sep"></span><span class="tb-name" dir="ltr" lang="en">${esc(learned ? it.en : it.he)}</span>
      <button class="tb" data-p="hear" aria-label="${t().hear}" title="${t().hear}">${ICON.speaker}</button>
      <button class="tb" data-p="color">${ICON_PAINT}<span>${t().color}</span></button>
      <button class="tb danger" data-p="remove" aria-label="${t().remove}" title="${t().remove}">${ICON_TRASH}</button>`;
  }
  tb.innerHTML = `
    <button class="tb" data-tb="feeling">${ICON_FACE}<span>${t().feeling}</span></button>
    <button class="tb" data-tb="skin" aria-label="${t().skin}" title="${t().skin}">${ICON_DROP}</button>
    ${worn}${selPart}`;
  tb.querySelector('[data-tb="feeling"]').onclick = (e) => openList(e.currentTarget, FEELINGS, changeFeeling);
  tb.querySelector('[data-tb="skin"]').onclick = (e) => openSkins(e.currentTarget, (s) => { ch.skin = s; save(); drawScene(); });
  tb.querySelectorAll('[data-slot]').forEach((b) => { b.onclick = () => { sfx.tap(); view.sel = 'slot:' + b.dataset.slot; showToolbar(); }; });
  if (selPart) {
    const s = ch.slots[slotSel];
    const it = itemById(s.id);
    tb.querySelector('[data-p="hear"]').onclick = () => say(it.en);
    tb.querySelector('[data-p="color"]').onclick = (e) => openPalette(e.currentTarget, (c) => changeColor(s, it, c));
    tb.querySelector('[data-p="remove"]').onclick = () => { delete ch.slots[slotSel]; view.sel = 'char'; sfx.whoosh(); save(); drawScene(); };
  }
}

// ---------- character studio: pages 1, 2, 3 … ----------
function studioBar() {
  return `<div class="studio-bar" dir="${t().dir}">
    <span class="sb-label">${t().character}:</span>
    ${state.chars.map((c, i) => `<button class="sb-page${i === state.charIdx ? ' on' : ''}" data-ci="${i}" aria-label="${esc(charName(c))}">${c.n}</button>`).join('')}
    <button class="sb-page add" data-new aria-label="${t().newCharacter}">${ICON_PLUS}</button>
    <span class="sb-gap"></span>
    <button class="btn primary sb-put" data-put>${ICON_PLACES}<span>${t().putInRoom}</span></button>
    ${state.chars.length > 1 ? `<button class="tb danger" data-del aria-label="${t().deleteCharacter}" title="${t().deleteCharacter}">${ICON_TRASH}</button>` : ''}
  </div>`;
}
function bindStudioBar() {
  app.querySelectorAll('[data-ci]').forEach((b) => { b.onclick = () => { sfx.tap(); state.charIdx = +b.dataset.ci; view.sel = null; save(); renderWorld(); }; });
  app.querySelector('[data-new]').onclick = () => {
    sfx.pop();
    const n = Math.max(...state.chars.map((c) => c.n)) + 1;
    state.chars.push(newChar(n));
    state.charIdx = state.chars.length - 1;
    view.sel = 'char';
    save(); renderWorld();
  };
  app.querySelector('[data-put]').onclick = (e) => {
    const worlds = sceneWorlds();
    popover(e.currentTarget, `<p class="pop-title">${t().putInRoom}</p><div class="pop-list">${worlds.map((p) => `<button class="pop-item" data-w="${p.id}">${esc(p[state.ui])}</button>`).join('')}</div>`, (pop, close) => {
      pop.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => { close(); putCharIn(b.dataset.w, curChar().id); toast(t().addedTo + placeById(b.dataset.w)[state.ui]); }; });
    });
  };
  const del = app.querySelector('[data-del]');
  if (del) del.onclick = async () => {
    if (!(await confirmBox(t().deleteCharConfirm))) return;
    const ch = curChar();
    state.chars.splice(state.charIdx, 1);
    for (const w of Object.values(state.worlds)) w.items = w.items.filter((x) => x.charId !== ch.id);
    state.charIdx = Math.max(0, state.charIdx - 1);
    view.sel = null; save(); renderWorld();
  };
}

// The same character can stand in many rooms; changes in the studio show everywhere.
function putCharIn(placeId, charId) {
  const p = placeById(placeId);
  const inst = { uid: nextUid(), id: '_char', charId, x: 20 + Math.random() * 60, y: p.split + (100 - p.split) * 0.2, w: 9, rot: 0 };
  state.worlds[placeId].items.push(inst);
  sfx.pop();
  save();
  if (view.place === placeId) { view.sel = inst.uid; drawScene(); }
}

function charInstToolbar(tb, inst, list) {
  const ch = charById(inst.charId);
  tb.innerHTML = `
    <span class="tb-name">${esc(charName(ch))}</span>
    <button class="tb" data-tb="action">${ICON_RUN}<span>${t().action}</span></button>
    <button class="tb" data-tb="studio">${ICON_PAINT}<span>${t().editInStudio}</span></button>
    <button class="tb" data-tb="bigger" aria-label="${t().bigger}" title="${t().bigger}">${ICON_PLUS}</button>
    <button class="tb" data-tb="smaller" aria-label="${t().smaller}" title="${t().smaller}">${ICON_MINUS}</button>
    <button class="tb" data-tb="rotl" aria-label="${t().rotL}" title="${t().rotL}">${ICON_ROTL}</button>
    <button class="tb" data-tb="rotr" aria-label="${t().rotR}" title="${t().rotR}">${ICON_ROTR}</button>
    <button class="tb" data-tb="flip" aria-label="${t().flip}" title="${t().flip}">${ICON_FLIP}</button>
    <button class="tb" data-tb="front" aria-label="${t().front}" title="${t().front}">${ICON_FRONT}</button>
    <button class="tb" data-tb="back" aria-label="${t().back2}" title="${t().back2}">${ICON_BACK}</button>
    <button class="tb danger" data-tb="remove" aria-label="${t().remove}" title="${t().remove}">${ICON_TRASH}</button>`;
  tb.querySelectorAll('[data-tb]').forEach((b) => {
    b.onclick = () => {
      const a = b.dataset.tb;
      if (a === 'back') { list.splice(list.indexOf(inst), 1); list.unshift(inst); }
      if (a === 'action') return openList(b, ACTIONS, (x) => changeAction(inst, { he: charName(ch), en: 'character' }, x));
      if (a === 'studio') { state.charIdx = state.chars.indexOf(ch); view = { place: 'dressup', cat: placeById('dressup').cats[0].id, sel: 'char' }; save(); return render(); }
      if (a === 'bigger') inst.w = Math.min(60, inst.w * 1.15);
      if (a === 'smaller') inst.w = Math.max(3, inst.w / 1.15);
      if (a === 'rotl') inst.rot = ((inst.rot || 0) - 15) % 360;
      if (a === 'rotr') inst.rot = ((inst.rot || 0) + 15) % 360;
      if (a === 'flip') inst.flip = !inst.flip;
      if (a === 'front') { list.splice(list.indexOf(inst), 1); list.push(inst); }
      if (a === 'remove') { list.splice(list.indexOf(inst), 1); view.sel = null; sfx.whoosh(); }
      sfx.tap(); save(); drawScene();
    };
  });
}

// ---------- coloring world for little kids ----------
const KID_PAGES = [
  ['lion', 'אריה'], ['elephant', 'פיל'], ['hippo', 'היפופוטם'], ['cat', 'חתול'], ['dog', 'כלב'], ['fish', 'דג'],
  ['bird', 'ציפור'], ['butterfly', 'פרפר'], ['frog', 'צפרדע'], ['pig', 'חזיר'], ['cow', 'פרה'], ['bear', 'דוב'],
];
const KID_COLORS = COLORS.filter((c) => !c.shade && !['turquoise', 'white'].includes(c.en));
const BRUSHES = [6, 14, 28]; // pencil sizes (in canvas pixels; the canvas is 600x600)
let brush = null;      // current color (hex) – set after the child says the color word
let brushSize = 1;     // index into BRUSHES
let eraser = false;

// A saved drawing is a picture (data URL) under the outline. Older saves (area fills) are ignored.
const savedDrawing = (id) => (typeof state.coloring[id] === 'string' ? state.coloring[id] : null);
const pageThumb = (id) => `<span class="kid-thumb">${savedDrawing(id) ? `<img src="${savedDrawing(id)}" alt="">` : ''}${svg(COLORING[id], '0 0 200 200')}</span>`;

function renderColoring() {
  const page = view.page;
  if (!page) {
    app.innerHTML = `${header()}
      <main class="home kid-home">
        <h1 class="home-title">${t().kidWhat}</h1>
        <div class="kid-grid">${KID_PAGES.map(([id, he]) => `<button class="kid-card" data-page="${id}" aria-label="${esc(he)}">${pageThumb(id)}
          <span>${state.kidWords[id] ? `<b dir="ltr" lang="en">${id}</b>` : esc(he)}</span></button>`).join('')}</div>
      </main>`;
    bindHeader();
    app.querySelectorAll('[data-page]').forEach((b) => { b.onclick = () => openPage(b.dataset.page); });
    return;
  }
  const he = KID_PAGES.find((x) => x[0] === page)[1];
  app.innerHTML = `${header()}
    <main class="kid-page" dir="ltr">
      <section class="kid-canvas-wrap">
        <div class="kid-canvas" id="kidCanvas" aria-label="${esc(he)}">
          <canvas width="600" height="600" id="paper"></canvas>
          <div class="kid-lines">${svg(COLORING[page], '0 0 200 200')}</div>
        </div>
      </section>
      <aside class="panel kid-panel" dir="${t().dir}">
        <button class="btn" data-back>${t().kidBack}</button>
        <h2 class="panel-title">${esc(he)} <button class="chip-hear" data-hear aria-label="${t().hear}">${ICON.speaker}</button></h2>
        <p class="small">${t().kidPickColor}</p>
        <div class="kid-colors">${KID_COLORS.map((c) => `<button class="kid-sw${brush === c.hex && !eraser ? ' on' : ''}" style="background:${c.hex}" data-c="${c.en}" aria-label="${esc(c.he)}">
          ${state.kidWords['c:' + c.en] ? `<span dir="ltr" lang="en">${c.en}</span>` : ''}</button>`).join('')}</div>
        <div class="kid-tools">
          ${BRUSHES.map((s, i) => `<button class="kid-size${i === brushSize && !eraser ? ' on' : ''}" data-size="${i}" aria-label="${t().pencil} ${i + 1}"><span style="width:${6 + i * 8}px;height:${6 + i * 8}px;background:${brush || '#2B3440'}"></span></button>`).join('')}
          <button class="kid-size${eraser ? ' on' : ''}" data-eraser aria-label="${t().eraser}" title="${t().eraser}">${ICON_ERASER}</button>
          <button class="kid-size" data-clear aria-label="${t().clearAll}" title="${t().clearAll}">${ICON_TRASH}</button>
        </div>
      </aside>
    </main>`;
  bindHeader();
  app.querySelector('[data-back]').onclick = () => { view.page = null; render(); };
  app.querySelector('[data-hear]').onclick = () => say(page);
  app.querySelectorAll('[data-c]').forEach((b) => {
    b.onclick = async () => {
      const c = KID_COLORS.find((x) => x.en === b.dataset.c);
      const ok = await runKidSay({ word: c.en, prompt: t().kidSayColor, artHTML: `<div class="kid-swatch" style="background:${c.hex}"></div>` });
      if (!ok) return;
      if (!state.kidWords['c:' + c.en]) { state.kidWords['c:' + c.en] = 1; addPoints(5, { countSuccess: false }); }
      brush = c.hex; eraser = false;
      sfx.paint(); save(); render();
    };
  });
  app.querySelectorAll('[data-size]').forEach((b) => { b.onclick = () => { brushSize = +b.dataset.size; eraser = false; sfx.tap(); render(); }; });
  app.querySelector('[data-eraser]').onclick = () => { eraser = true; sfx.tap(); render(); };
  app.querySelector('[data-clear]').onclick = async () => {
    if (!(await confirmBox(t().clearConfirm))) return;
    delete state.coloring[page]; save(); render();
  };

  // ---- free drawing with a pencil: color appears only where the finger or mouse goes ----
  const cv = document.getElementById('paper');
  const ctx = cv.getContext('2d');
  const saved = savedDrawing(page);
  if (saved) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, 600, 600); img.src = saved; }
  let last = null;
  const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: ((e.clientX - r.left) / r.width) * 600, y: ((e.clientY - r.top) / r.height) * 600 }; };
  const stroke = (a, b2) => {
    ctx.globalCompositeOperation = eraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = brush || '#000';
    ctx.lineWidth = eraser ? BRUSHES[2] * 1.4 : BRUSHES[brushSize];
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b2.x, b2.y); ctx.stroke();
  };
  cv.addEventListener('pointerdown', (e) => {
    if (!brush && !eraser) { sfx.wrong(); toast(t().kidPickColor); return; }
    e.preventDefault();
    cv.setPointerCapture(e.pointerId);
    last = pos(e);
    stroke(last, { x: last.x + 0.1, y: last.y + 0.1 });
  });
  cv.addEventListener('pointermove', (e) => { if (!last) return; const p = pos(e); stroke(last, p); last = p; });
  const end = () => {
    if (!last) return;
    last = null;
    try { state.coloring[page] = cv.toDataURL('image/png'); save(); } catch { /* storage full */ }
  };
  cv.addEventListener('pointerup', end);
  cv.addEventListener('pointercancel', end);
}

async function openPage(id) {
  sfx.tap();
  if (!state.kidWords[id]) {
    const he = KID_PAGES.find((x) => x[0] === id)[1];
    const ok = await runKidSay({ word: id, prompt: t().kidSayAnimal, artHTML: svg(COLORING[id], '0 0 200 200') });
    if (!ok) return;
    state.kidWords[id] = 1;
    addPoints(5, { countSuccess: false });
    save();
    toast(`${he} = ${id}`);
  }
  view.page = id;
  render();
}

// ---------- adding items (word task) ----------
async function addItem(item, v) {
  sfx.tap();
  const topic = view.place;
  const pool = [...new Set(itemsFor(view.place).filter((x) => x.en !== item.en).map((x) => x.en))];
  const r = await runWordTask({ word: item.en, artSvg: artFor(item, { v }), level: state.levels[topic], distractors: pool });
  if (!r.ok) return;
  learnWord(item.id);
  recordWordResult(topic, r);
  if (r.fellBack) state.review = state.review.filter((x) => x.id !== item.id).concat({ id: item.id, place: view.place });
  placeItem(item, v);
  sfx.pop();
  afterSuccess(addPoints(10 + (r.firstTry ? 5 : 0)));
  maybeReview(item.id);
}

// An accessory starts where it belongs on the character (box is on the 200x420 character).
function accInst(item, v, uid) {
  const [ax, ay, aw, ah] = ACCESSORIES[item.acc[v]].box;
  return { uid, id: item.id, v, x: CH.left + ((ax + aw / 2) / 200) * CH.w, y: CH.top + ((ay + ah / 2) / 420) * CH.h, w: (aw / 200) * CH.w, color: item.color, rot: 0 };
}

function placeItem(item, v) {
  const p = placeById(view.place);
  const list = itemsOf(view.place);
  if (item.dress) {
    const ch = curChar();
    const slot = DRESS_ART[item.dress[v]].slot;
    ch.slots[slot] = { id: item.id, v, color: item.color };
    if (slot === 'dress') { delete ch.slots.top; delete ch.slots.bottom; }
    if ((slot === 'top' || slot === 'bottom') && ch.slots.dress) delete ch.slots.dress;
    view.sel = 'slot:' + slot;
  } else if (item.acc) {
    const inst = accInst(item, v, nextUid());
    list.push(inst);
    view.sel = inst.uid;
  } else {
    const y = SKY.includes(item.id) ? 12 + Math.random() * 20
      : WALL.includes(item.id) ? p.split * (0.35 + Math.random() * 0.3)
      : p.split + (100 - p.split) * (0.3 + Math.random() * 0.35);
    const inst = { uid: nextUid(), id: item.id, v, x: 20 + Math.random() * 60, y, w: item.w || 14, color: item.color, rot: 0 };
    if (item.person) { inst.skin = rand(SKINS); inst.hair = rand(HAIR_COLORS); }
    if (startsBehind(item.id)) list.unshift(inst); else list.push(inst);
    view.sel = inst.uid;
  }
  save();
  drawScene();
  drawGrid();
  const el = document.querySelector('.placed.sel');
  if (el) el.classList.add('pop-in');
}


async function maybeReview(justId) {
  const q = state.review.find((x) => x.id !== justId);
  if (!q || Math.random() > 0.5) return;
  const item = itemById(q.id);
  const pool = [...new Set(itemsFor(q.place).filter((x) => x.en !== item.en).map((x) => x.en))];
  await wait(500);
  const r = await runWordTask({ word: item.en, artSvg: artFor(item), level: state.levels[q.place] || 1, distractors: pool, forceType: rand(['type', 'scramble']), badge: t().review });
  if (r.ok && !r.fellBack) {
    state.review = state.review.filter((x) => x.id !== q.id);
    afterSuccess(addPoints(5, { countSuccess: false }));
  }
  save();
}

// ---------- changing things (sentence tasks) ----------
// Colors: at levels 1-2 the basic color word is enough ("blue"); at level 3 the shade is needed ("light blue").
function colorWords(color) {
  const lv = state.levels.sentences;
  if (lv >= 3) return { value: color.en, accept: [color.en] };
  return { value: color.base, accept: [color.base, color.en] };
}

async function changeColor(inst, it, color) {
  const subject = it.person ? 'shirt' : it.en;
  const subjectHe = it.person ? 'חולצה' : it.he;
  const cw = colorWords(color);
  const r = await runSentenceTask({ kind: 'color', artSvg: artFor(it, { ...inst, color: color.hex }), subject, subjectHe, value: cw.value, accept: cw.accept, valueHe: color.he, swatch: color.hex, level: state.levels.sentences });
  if (!r.ok) return;
  inst.color = color.hex;
  sfx.paint();
  sentenceDone(r);
}

async function changeSurface(surfId, color) {
  const p = placeById(view.place);
  const s = p.surfaces.find((x) => x.id === surfId);
  const w = state.worlds[p.id];
  const box = `<div class="surf-preview" style="background:${esc(texBG(w.tex[surfId], color.hex))}"></div>`;
  const cw = colorWords(color);
  const r = await runSentenceTask({ kind: 'surface', artSvg: box, subject: s.en, subjectHe: s.he, value: cw.value, accept: cw.accept, valueHe: color.he, swatch: color.hex, level: state.levels.sentences });
  if (!r.ok) return;
  w.bg[surfId] = color.hex;
  learnWord('_' + surfId);
  sfx.paint();
  sentenceDone(r);
}

async function changeAction(inst, it, action) {
  const isChar = inst.id === '_char';
  const art = isChar ? charSVG(charById(inst.charId)) : artFor(it, inst);
  const r = await runSentenceTask({ kind: 'action', artSvg: art, subject: isChar ? 'character' : it.en, subjectHe: isChar ? 'הדמות' : it.he, value: action.en, valueHe: action.he, level: state.levels.sentences });
  if (!r.ok) return;
  inst.action = action.en === 'standing' ? null : action.en;
  sentenceDone(r);
}

async function changeFeeling(f) {
  const ch = curChar();
  const face = characterBase(ch.skin, f.en).head;
  const r = await runSentenceTask({ kind: 'feeling', artSvg: svg(face, '64 22 72 76'), subject: 'I', value: f.en, valueHe: f.he, level: state.levels.sentences });
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
  const ri = rankIndex();
  for (let k = (state.rankSeen || 0) + 1; k <= ri; k++) {
    const wId = RANKS[k].world;
    if (wId) { confetti(); sfx.sparkle(); toast(`${t().worldOpened} ${placeById(wId)[state.ui]}`); state.newPrize = true; }
  }
  state.rankSeen = Math.max(state.rankSeen || 0, ri);
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
  const left = Math.min(window.innerWidth - pr.width - 8, Math.max(8, r.left + r.width / 2 - pr.width / 2));
  let top = r.top - pr.height - 8;
  if (top < 8) top = Math.min(window.innerHeight - pr.height - 8, r.bottom + 8);
  pop.style.left = left + 'px';
  pop.style.top = Math.max(8, top) + window.scrollY + 'px';
  const close = () => pop.remove();
  setTimeout(() => document.addEventListener('pointerdown', function h(e) { if (!pop.contains(e.target)) { close(); document.removeEventListener('pointerdown', h); } }), 0);
  bind(pop, close);
}
function closePopovers() { document.querySelectorAll('.popover').forEach((p) => p.remove()); }

function paletteHTML() {
  const groups = [];
  for (const c of COLORS) {
    let g = groups.find((x) => x.base === c.base && !(c.base === 'gray' && x.full));
    if (!g) { g = { base: c.base, list: [] }; groups.push(g); }
    g.list.push(c);
    if (g.list.length >= 3) g.full = true;
  }
  return `<div class="palette">${groups.map((g) => `<div class="pal-col">${g.list.map((c) => `<button class="sw" style="background:${c.hex}" data-i="${COLORS.indexOf(c)}" aria-label="${esc(c.he)}" title="${esc(c.he)}"></button>`).join('')}</div>`).join('')}</div>`;
}
function openPalette(anchor, onPick) {
  popover(anchor, paletteHTML(), (pop, close) => {
    pop.querySelectorAll('.sw').forEach((b) => { b.onclick = () => { close(); onPick(COLORS[+b.dataset.i]); }; });
  });
}
function openSurface(anchor, surfId) {
  const w = state.worlds[view.place];
  const texes = TEXTURES[surfId] || ['plain'];
  popover(anchor, `<p class="pop-title">${t().texture}</p>
    <div class="tex-row">${texes.map((x) => `<button class="tex${w.tex[surfId] === x ? ' on' : ''}" data-tex="${x}" style="background:${esc(texBG(x, w.bg[surfId]))}" aria-label="${esc(TEXTURE_NAMES[x] || x)}" title="${esc(TEXTURE_NAMES[x] || x)}"></button>`).join('')}</div>
    <p class="pop-title">${t().color}</p>${paletteHTML()}`, (pop, close) => {
    pop.querySelectorAll('[data-tex]').forEach((b) => { b.onclick = () => { w.tex[surfId] = b.dataset.tex; sfx.paint(); save(); drawScene(); drawGrid(); close(); }; });
    pop.querySelectorAll('.sw').forEach((b) => { b.onclick = () => { close(); changeSurface(surfId, COLORS[+b.dataset.i]); }; });
  });
}
function openSkins(anchor, onPick) {
  popover(anchor, `<div class="palette one-row">${SKINS.map((s) => `<button class="sw" style="background:${s}" data-s="${s}" aria-label="${t().skin}"></button>`).join('')}</div>`, (pop, close) => {
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

function stickerSVG(r, i) {
  const glyph = {
    seed: '<path d="M50 70 Q50 50 40 40 Q56 38 54 56 Q60 42 70 42 Q66 58 52 60" fill="#FFFFFF"/>',
    magnifier: '<circle cx="46" cy="46" r="13" fill="none" stroke="#FFFFFF" stroke-width="6"/><path d="M56 56 L68 68" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>',
    brush: '<path d="M64 30 L70 36 L48 58 L42 52 Z" fill="#FFFFFF"/><path d="M42 54 Q30 56 32 70 Q44 70 46 58 Z" fill="#FFFFFF"/>',
    star: '<path d="M50 28 L56 44 L72 44 L59 54 L64 70 L50 60 L36 70 L41 54 L28 44 L44 44 Z" fill="#FFFFFF"/>',
    wave: '<path d="M28 56 Q36 44 44 56 T60 56 T76 56" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>',
    house: '<path d="M32 50 L50 34 L68 50 L68 68 L32 68 Z" fill="#FFFFFF"/>',
    heart: '<path d="M50 70 Q30 56 32 44 Q34 34 42 34 Q48 34 50 42 Q52 34 58 34 Q66 34 68 44 Q70 56 50 70 Z" fill="#FFFFFF"/>',
    book: '<path d="M30 36 L48 40 L48 68 L30 64 Z M70 36 L52 40 L52 68 L70 64 Z" fill="#FFFFFF"/>',
    plane: '<path d="M28 54 L72 46 L70 52 L54 56 L46 70 L42 70 L44 58 L30 60 Z" fill="#FFFFFF"/>',
    wand: '<path d="M34 68 L58 44" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/><path d="M62 30 L65 38 L73 38 L67 43 L69 51 L62 46 L55 51 L57 43 L51 38 L59 38 Z" fill="#FFFFFF"/>',
    spray: '<rect x="42" y="40" width="16" height="30" rx="3" fill="#FFFFFF"/><rect x="46" y="32" width="8" height="8" fill="#FFFFFF"/><circle cx="64" cy="32" r="2.4" fill="#FFFFFF"/><circle cx="68" cy="38" r="2" fill="#FFFFFF"/>',
    rocket: '<path d="M50 28 Q62 40 60 60 L40 60 Q38 40 50 28 Z M40 52 L32 64 L40 62 Z M60 52 L68 64 L60 62 Z" fill="#FFFFFF"/>',
    trophy: '<path d="M38 34 L62 34 L60 50 Q56 58 50 58 Q44 58 40 50 Z M46 58 L54 58 L54 64 L46 64 Z M40 66 L60 66 L60 70 L40 70 Z" fill="#FFFFFF"/>',
    crown: '<path d="M32 64 L30 38 L42 50 L50 34 L58 50 L70 38 L68 64 Z" fill="#FFFFFF"/>',
  }[r.icon] || '';
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="${r.color}"/><circle cx="50" cy="50" r="44" fill="none" stroke="#FFFFFF" stroke-width="5"/><circle cx="50" cy="50" r="36" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3 3" opacity=".7"/>${glyph}<text x="50" y="90" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="12" fill="${r.color}">${i + 1}</text></svg>`;
}

function openProgress() {
  const i = rankIndex();
  const cur = RANKS[i], next = RANKS[i + 1];
  const pct = next ? Math.round(((state.points - cur.points) / (next.points - cur.points)) * 100) : 100;
  const rows = RANKS.map((r, k) => {
    const got = k <= i;
    const item = r.prize ? itemById(r.prize) : null;
    const world = r.world ? placeById(r.world) : null;
    return `<div class="rank-row${got ? ' got' : ''}${k === i ? ' now' : ''}">
      <div class="rr-sticker">${stickerSVG(r, k)}</div>
      <div class="rr-info"><b>${esc(r[state.ui])}</b><span class="small">${r.points} ${t().pointsShort}</span>
        ${got ? `<span class="rr-got">${t().youGot}:</span>` : `<span class="rr-lock">${ICON_LOCK}</span>`}</div>
      <div class="rr-prizes">
        <div class="rr-prize"><span class="rr-art">${stickerSVG(r, k)}</span><span>${t().sticker}</span></div>
        ${item ? `<div class="rr-prize"><span class="rr-art">${artFor(item)}</span><span dir="ltr" lang="en">${got ? esc(item.en) : '?'}</span></div>` : ''}
        ${world ? `<div class="rr-prize world"><span class="rr-art">${placePreview(world.id).split('</span>')[0]}</span></span><span>${t().newWorld}: ${esc(world[state.ui])}</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
  sheet(t().progress, `
    <div class="rank-card"><span class="rank-label">${t().rank}</span><span class="rank-name">${esc(cur[state.ui])}</span>
      <span class="rank-pts">${state.points} ${t().points}</span></div>
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
    <p class="small">${next ? `${next.points - state.points} ${t().points} ${t().nextRank}: ${esc(next[state.ui])}` : ''}</p>
    <h3>${t().prizes}</h3><div class="rank-rows">${rows}</div>`);
  state.newPrize = false;
  save();
  document.querySelector('[data-act="progress"]')?.classList.remove('glow');
  setTimeout(() => document.querySelector('.rank-row.now')?.scrollIntoView({ block: 'center' }), 250);
}

function openDictionary() {
  const seen = new Set();
  const words = ITEMS.filter((it) => state.learned[it.id] && !seen.has(it.en) && seen.add(it.en));
  const html = words.length ? `<div class="dict">${words.map((it) => `<button class="dict-item" data-say="${esc(it.en)}">
      <span class="tile-art">${artFor(it)}</span><b dir="ltr" lang="en">${esc(it.en)}</b><span>${esc(it.he)}</span></button>`).join('')}</div>`
    : `<p>${t().noWords}</p>`;
  sheet(`${t().wordsLearned} (${words.length})`, html, (ov) => {
    ov.querySelectorAll('[data-say]').forEach((b) => { b.onclick = () => say(b.dataset.say); });
  });
}

function openSettings() {
  const label = (k) => (k === 'sentences' ? t().topics.sentences : placeById(k)?.[state.ui] || k);
  const lv = Object.keys(state.levels).filter((k) => k === 'sentences' || (placeById(k) && isOpen(placeById(k)))).map((k) => `<div class="set-row"><span>${esc(label(k))}</span>
    <div class="seg" role="radiogroup" aria-label="${esc(label(k))}">${[1, 2, 3].map((n) => `<button role="radio" aria-checked="${state.levels[k] === n}" class="${state.levels[k] === n ? 'on' : ''}" data-lv="${k}" data-n="${n}">${n}</button>`).join('')}</div></div>`).join('');
  sheet(t().settings, `
    <h3>${t().level}</h3><p class="small">${t().levelNote}</p>${lv}
    <h3>${t().language}</h3>
    <div class="seg wide"><button class="${state.ui === 'he' ? 'on' : ''}" data-ui="he">עברית</button><button class="${state.ui === 'en' ? 'on' : ''}" data-ui="en">English</button></div>
    <h3>${t().sound}</h3>
    <div class="seg wide"><button class="${state.sound ? 'on' : ''}" data-snd="1">${t().on}</button><button class="${!state.sound ? 'on' : ''}" data-snd="0">${t().off}</button></div>
    <p class="small">${t().savedLocal}</p>
    ${state.test ? `<p class="test-banner">${t().testMode}</p><button class="btn" data-testoff>${t().testOff}</button>` : ''}
    <button class="btn danger" data-reset>${t().reset}</button>`, (ov, close) => {
    const off = ov.querySelector('[data-testoff]');
    if (off) off.onclick = () => { state.test = false; save(); close(); view = { place: null }; render(); };
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
const ICON_ROTL = I(`<path d="M4 4v6h6M4.5 10A8 8 0 1 1 6 16.5" ${SW}/>`);
const ICON_ROTR = I(`<path d="M20 4v6h-6M19.5 10A8 8 0 1 0 18 16.5" ${SW}/>`);
const ICON_FLIP = I(`<path d="M12 3v18M8 7L3 12l5 5M16 7l5 5-5 5" ${SW}/>`);
const ICON_FRONT = I(`<rect x="8" y="8" width="12" height="12" rx="2" ${SW}/><path d="M4 16V5a1 1 0 0 1 1-1h11" ${SW}/>`);
const ICON_BACK = I(`<rect x="4" y="4" width="12" height="12" rx="2" ${SW} stroke-dasharray="3 2"/><rect x="9" y="9" width="11" height="11" rx="2" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2"/>`);
const ICON_ERASER = I(`<path d="M16 3l5 5-11 11H5l-2-2z" ${SW}/><path d="M9 9l6 6M5 19h15" ${SW}/>`);
const ICON_TRASH = I(`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" ${SW}/>`);

// ---------- demo scenes (for the website screenshots): play.html?demo=bedroom ----------
function demo(place) {
  setDemo(true);
  const s = JSON.parse(JSON.stringify(state));
  s.test = true;
  if (s.worlds[place]) s.worlds[place].items = [];
  const add = (id, x, y, w, extra = {}) => s.worlds[place].items.push({ uid: s.uid++, id, v: 0, x, y, w: w || itemById(id).w, color: itemById(id).color, rot: 0, ...extra });
  const learn = (list) => list.forEach((k) => { s.learned[k] = { n: 1 }; });
  if (place === 'bedroom') {
    s.worlds.bedroom.bg = { wall: '#CFE6EE', floor: '#C99A6B' };
    s.worlds.bedroom.tex = { wall: 'stripes', floor: 'wood' };
    add('window', 24, 30, 20); add('curtain', 24, 30, 30, { color: '#2EC4B6' }); add('poster', 52, 26, 11, { color: '#8A5CC8' }); add('shelf', 76, 28, 18, { v: 1 });
    add('rug', 52, 88, 44, { v: 2, color: '#F2C230' }); add('bed', 68, 74, 38, { v: 1, color: '#2F7BC0' }); add('lamp', 14, 70, 12, { v: 0 }); add('plant', 92, 74, 10);
    add('record_player', 34, 84, 15); add('cat', 44, 92, 11, { v: 1 }); add('girl', 36, 66, 10, { skin: '#B9805A', hair: '#2B1B10', action: 'dancing', color: '#3FA66A' });
    learn(['bed', 'window', 'curtain', 'poster', 'shelf', 'rug', 'lamp', 'plant', 'record_player', 'cat', 'girl']);
  }
  if (place === 'park') {
    s.worlds.park.tex = { sky: 'clouds', grass: 'flowers' };
    add('sun', 86, 14, 12); add('kite', 64, 22, 9);
    add('tree', 14, 50, 26); add('tree', 88, 52, 20, { v: 1, color: '#2F7D4A' }); add('swing', 40, 66, 22); add('slide', 66, 70, 22);
    add('bench', 20, 84, 20); add('flower', 50, 90, 6); add('flower', 55, 92, 6, { v: 1, color: '#F7F6F2' }); add('dog', 82, 88, 12); add('duck', 34, 92, 8);
    add('boy', 40, 72, 9, { skin: '#8D5A3A', hair: '#1C1C1C', action: 'waving' }); add('teenager', 74, 76, 9, { skin: '#FDE0C6', hair: '#B5483B' });
    learn(['sun', 'kite', 'tree', 'swing', 'slide', 'bench', 'flower', 'dog', 'duck', 'boy', 'teenager']);
  }
  if (place === 'track') {
    add('flag', 10, 40, 12); add('traffic_light', 90, 40, 8); add('trophy', 76, 46, 8);
    add('car', 30, 74, 26); add('car', 70, 88, 24, { v: 2, color: '#2F7BC0' }); add('motorcycle', 56, 66, 16, { color: '#2EC4B6' });
    add('cone', 90, 80, 6); add('cone', 95, 84, 6); add('driver', 46, 44, 9, { skin: '#F3C9A0', hair: '#5E3B25', action: 'jumping' }); add('fan', 28, 44, 9, { skin: '#5C3A24' });
    learn(['flag', 'traffic_light', 'trophy', 'car', 'motorcycle', 'cone', 'driver', 'fan']);
  }
  if (place === 'dressup') {
    s.worlds.dressup.tex = { wall: 'dots' };
    s.chars = [newChar(1)]; s.charIdx = 0;
    Object.assign(s.chars[0], { skin: '#B9805A', feeling: 'happy', slots: {
      hair: { id: 'hair', v: 9, color: '#2B1B10' }, top: { id: 'hoodie', v: 0, color: '#2EC4B6' }, bottom: { id: 'jeans', v: 0, color: '#3E5C8A' },
      feet: { id: 'sneakers', v: 0, color: '#F7F6F2' } } });
    learn(['hair', 'hoodie', 'jeans', 'sneakers']);
  }
  if (place === 'dressup') {
    s.chars[0].acc.push(accInst(itemById('sunglasses'), 0, s.uid++), accInst(itemById('bag'), 1, s.uid++));
    learn(['sunglasses', 'bag']);
  }
  replaceState(s);
  view = { place, cat: placeById(place).cats[0]?.id, sel: null };
}

// ---------- start ----------
const params = new URLSearchParams(location.search);
if (params.get('lang') === 'en' || params.get('lang') === 'he') { state.ui = params.get('lang'); save(); }
// Test mode for the team: play.html?test=wordcraft-team opens all worlds and prizes (saved in this browser).
if (params.get('test') === 'wordcraft-team') { state.test = true; save(); }
if (params.get('test') === 'off') { state.test = false; save(); }
if (params.get('demo') && placeById(params.get('demo'))) {
  demo(params.get('demo'));
}
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !params.get('demo')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
