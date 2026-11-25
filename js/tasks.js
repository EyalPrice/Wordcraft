// The task window: word tasks (to place an item) and sentence tasks (to change one).
// Rules: 2 tries, then hint 1, then hint 2, then quietly switch to an easier version.
// The answer is never shown.
import { STR } from './i18n.js';
import { sfx } from './sound.js';
import { say, listen, canSpeak, canListen } from './speech.js';
import { state } from './state.js';

const $ = (sel, el = document) => el.querySelector(sel);
const t = () => STR[state.ui];
const rand = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const norm = (s) => s.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const POOLS = { 1: ['pick', 'scramble'], 2: ['pick', 'scramble', 'listen', 'say'], 3: ['listen', 'say', 'type', 'scramble'] };
let lastType = null;

export function chooseWordType(level) {
  let pool = POOLS[level] || POOLS[1];
  let challenge = false;
  if (level < 3 && Math.random() < 0.15) {
    const up = POOLS[level + 1].filter((x) => !pool.includes(x));
    if (up.length) { pool = up; challenge = true; }
  }
  let type = rand(pool);
  if (type === lastType && pool.length > 1) type = rand(pool.filter((x) => x !== lastType));
  lastType = type;
  return { type, challenge };
}

// Builds the overlay window and returns helpers.
function openShell({ artSvg, badge }) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `
    <div class="task" role="dialog" aria-modal="true" aria-labelledby="task-prompt" dir="${t().dir}">
      <button class="icon-btn task-close" aria-label="${t().close}">${ICON.x}</button>
      ${badge ? `<span class="badge">${esc(badge)}</span>` : ''}
      <div class="task-art">${artSvg}</div>
      <p class="task-prompt" id="task-prompt"></p>
      <div class="task-body"></div>
      <p class="task-hint" dir="ltr" aria-live="polite"></p>
      <p class="task-feedback" aria-live="polite"></p>
    </div>`;
  document.body.appendChild(ov);
  const box = $('.task', ov);
  requestAnimationFrame(() => ov.classList.add('show'));
  return {
    ov, box,
    prompt: (s) => { $('.task-prompt', box).textContent = s; },
    body: $('.task-body', box),
    hint: (s, hearText) => {
      const h = $('.task-hint', box);
      h.textContent = s;
      if (hearText) {
        const b = document.createElement('button');
        b.className = 'btn hear-hint';
        b.innerHTML = `${ICON.speaker}<span>${t().hearIt}</span>`;
        b.onclick = () => say(hearText, 0.8);
        h.appendChild(b);
      }
      h.classList.toggle('on', !!s || !!hearText);
    },
    feedback: (s, kind) => { const f = $('.task-feedback', box); f.textContent = s; f.className = 'task-feedback ' + (kind || ''); },
    shake: () => { box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); },
    close: () => { ov.classList.remove('show'); setTimeout(() => ov.remove(), 200); },
    onClose: (fn) => { $('.task-close', box).onclick = fn; ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') fn(); }); },
  };
}

// pattern hint: "l _ _ p" style. reveal = number of letters shown from the start.
function pattern(word, reveal) {
  let shown = 0;
  return word.split('').map((ch) => {
    if (ch === ' ') return '   ';
    if (shown < reveal) { shown++; return ch; }
    return '_';
  }).join(' ');
}

// ---------- word task ----------
// opts: {word, artSvg, level, distractors[], forceType, badge}
export function runWordTask(opts) {
  return new Promise((resolve) => {
    const word = opts.word;
    let { type, challenge } = opts.forceType ? { type: opts.forceType, challenge: false } : chooseWordType(opts.level);
    if (type === 'listen' && !canSpeak) type = 'type';
    const badge = opts.badge || (challenge ? t().challenge : '');
    const ui = openShell({ artSvg: opts.artSvg, badge });
    const started = Date.now();
    let wrong = 0;
    let fellBack = false;
    let finished = false;
    let hintLevel = 0;
    let api = null; // type-specific hooks: {applyHint(n)}

    ui.onClose(() => { if (!finished) { finished = true; ui.close(); resolve({ ok: false }); } });

    const succeed = () => {
      if (finished) return;
      finished = true;
      sfx.success();
      ui.feedback(rand(t().great), 'good');
      ui.box.classList.add('win');
      setTimeout(() => { ui.close(); resolve({ ok: true, firstTry: wrong === 0, fellBack, seconds: (Date.now() - started) / 1000 }); }, 750);
    };

    const fail = () => {
      wrong++;
      sfx.wrong();
      ui.shake();
      if (fellBack) { ui.feedback(t().tryAgain, 'bad'); api.applyHint && api.applyHint(9); return; }
      if (wrong === 1) ui.feedback(t().tryAgain, 'bad');
      else if (wrong === 2 || wrong === 3) {
        hintLevel = wrong - 1;
        ui.feedback(`${t().hint} ${hintLevel}`, 'hint');
        api.applyHint(hintLevel);
        if (hintLevel === 2) { const cur = $('.task-hint', ui.box).textContent; ui.hint(cur, word); }
      }
      else { fellBack = true; ui.feedback(t().easier, 'hint'); ui.hint(''); render('pick2'); }
    };

    const check = (answer) => { if (norm(answer) === norm(word)) succeed(); else fail(); };

    function textEntry(placeholder) {
      const wrap = document.createElement('div');
      wrap.className = 'row';
      wrap.innerHTML = `<input class="text-in" dir="ltr" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}">
        <button class="btn primary">${t().check}</button>`;
      const inp = $('input', wrap);
      const go = () => { if (inp.value.trim()) { check(inp.value); if (!finished) inp.select(); } };
      $('button', wrap).onclick = go;
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      setTimeout(() => inp.focus(), 250);
      return wrap;
    }

    function render(kind) {
      const b = ui.body;
      b.innerHTML = '';
      api = { applyHint: () => {} };
      if (kind === 'pick' || kind === 'pick2') {
        ui.prompt(t().whatIsThis);
        const n = kind === 'pick2' ? 2 : opts.level >= 2 ? 4 : 3;
        const opt = shuffle([word, ...shuffle(opts.distractors).slice(0, n - 1)]);
        const grid = document.createElement('div');
        grid.className = 'choices';
        grid.innerHTML = opt.map((o) => `<button class="choice" dir="ltr" lang="en" data-w="${esc(o)}">${esc(o)}</button>`).join('');
        b.appendChild(grid);
        grid.querySelectorAll('.choice').forEach((btn) => {
          btn.onclick = () => {
            if (btn.dataset.w === word) { btn.classList.add('right'); succeed(); }
            else { btn.disabled = true; btn.classList.add('gone'); fail(); }
          };
        });
        api.applyHint = () => {
          const live = [...grid.querySelectorAll('.choice:not(:disabled)')].filter((x) => x.dataset.w !== word);
          if (live.length > 1 || (kind === 'pick2' && live.length)) { const x = rand(live); x.disabled = true; x.classList.add('gone'); }
        };
      } else if (kind === 'scramble') {
        ui.prompt(t().unscramble);
        const letters = word.split('');
        const slots = document.createElement('div');
        slots.className = 'slots';
        slots.dir = 'ltr';
        slots.innerHTML = letters.map((ch, i) => ch === ' ' ? '<span class="gap"></span>' : `<button class="slot" data-i="${i}" aria-label="slot ${i + 1}"></button>`).join('');
        let order;
        do { order = shuffle(letters.map((ch, i) => i).filter((i) => letters[i] !== ' ')); } while (letters.filter((c) => c !== ' ').length > 2 && order.map((i) => letters[i]).join('') === word.replace(/ /g, ''));
        const tiles = document.createElement('div');
        tiles.className = 'tiles';
        tiles.dir = 'ltr';
        tiles.innerHTML = order.map((i) => `<button class="tile" data-src="${i}">${esc(letters[i])}</button>`).join('');
        const hear = document.createElement('button');
        hear.className = 'btn small-hear';
        hear.innerHTML = `${ICON.speaker}<span>${t().hear}</span>`;
        hear.onclick = () => say(word, 0.8);
        b.append(hear, slots, tiles);
        const slotEls = [...slots.querySelectorAll('.slot')];
        const fillState = new Map(); // slot -> tile
        const locked = new Set();
        const tryComplete = () => {
          if (slotEls.every((s) => s.textContent)) {
            const guess = letters.map((ch, i) => ch === ' ' ? ' ' : slots.querySelector(`.slot[data-i="${i}"]`).textContent).join('');
            if (guess === word) succeed();
            else {
              fail();
              if (!finished && !fellBack) setTimeout(() => slotEls.forEach((s) => { if (!locked.has(s)) clearSlot(s); }), 350);
            }
          }
        };
        const clearSlot = (s) => { const tile = fillState.get(s); if (tile) { tile.disabled = false; tile.classList.remove('used'); } fillState.delete(s); s.textContent = ''; };
        tiles.querySelectorAll('.tile').forEach((tile) => {
          tile.onclick = () => {
            const s = slotEls.find((x) => !x.textContent);
            if (!s) return;
            sfx.tap();
            s.textContent = tile.textContent;
            fillState.set(s, tile);
            tile.disabled = true; tile.classList.add('used');
            tryComplete();
          };
        });
        slotEls.forEach((s) => { s.onclick = () => { if (!locked.has(s) && s.textContent) clearSlot(s); }; });
        api.applyHint = (n) => {
          const want = n === 1 ? 1 : Math.ceil(slotEls.length / 2);
          slotEls.forEach((s) => { if (!locked.has(s)) clearSlot(s); });
          slotEls.slice(0, want).forEach((s) => {
            const ch = letters[+s.dataset.i];
            const tile = [...tiles.querySelectorAll('.tile:not(:disabled)')].find((x) => x.textContent === ch);
            if (tile) { s.textContent = ch; tile.disabled = true; tile.classList.add('used'); fillState.set(s, tile); }
            locked.add(s); s.classList.add('locked');
          });
        };
      } else if (kind === 'listen') {
        ui.prompt(t().listenType);
        const play = document.createElement('button');
        play.className = 'btn big-listen';
        play.innerHTML = `${ICON.speaker}<span>${t().listen}</span>`;
        play.onclick = () => say(word, 0.8);
        b.append(play, textEntry(t().typeHere));
        setTimeout(() => say(word, 0.8), 300);
        api.applyHint = (n) => ui.hint(pattern(word, n === 1 ? 1 : Math.ceil(word.replace(/ /g, '').length / 2)));
      } else if (kind === 'type') {
        ui.prompt(t().typeWord);
        b.append(textEntry(t().typeHere));
        api.applyHint = (n) => ui.hint(pattern(word, n === 1 ? 1 : Math.ceil(word.replace(/ /g, '').length / 2)));
      } else if (kind === 'say') {
        ui.prompt(t().sayIt);
        if (canListen) {
          const mic = document.createElement('button');
          mic.className = 'btn big-listen mic';
          mic.innerHTML = `${ICON.mic}<span>${t().speak}</span>`;
          mic.onclick = async () => {
            mic.classList.add('rec'); mic.querySelector('span').textContent = t().listening;
            const alts = await listen();
            mic.classList.remove('rec'); mic.querySelector('span').textContent = t().speak;
            if (finished) return;
            if (alts.some((a) => (' ' + norm(a) + ' ').includes(' ' + norm(word) + ' '))) succeed(); else fail();
          };
          const or = document.createElement('p');
          or.className = 'small';
          or.textContent = t().sayOrType;
          b.append(mic, or, textEntry(t().typeHere));
        } else {
          const note = document.createElement('p');
          note.className = 'small';
          note.textContent = t().noMic;
          b.append(note, textEntry(t().typeHere));
        }
        api.applyHint = (n) => ui.hint(pattern(word, n === 1 ? 1 : Math.ceil(word.replace(/ /g, '').length / 2)));
      }
    }
    render(type);
  });
}

// ---------- sentence task ----------
// opts: {artSvg, kind:'color'|'action'|'feeling'|'surface', subject, value, valueHe, swatch, level}
export function sentenceTarget(o) {
  const vals = (o.accept || [o.value]).map((v) => norm(v).replace(/gray/g, '(gray|grey)')).join('|');
  if (o.kind === 'feeling') return { words: ['I', 'am', ...o.value.split(' ')], re: new RegExp(`^(i am|i'm|im) (${vals})$`) };
  const subj = norm(o.subject);
  return { words: ['The', ...o.subject.split(' '), 'is', ...o.value.split(' ')], re: new RegExp(`^(the|my|this|that) ${subj} is (${vals})$`) };
}

export function runSentenceTask(o) {
  return new Promise((resolve) => {
    const target = sentenceTarget(o);
    const ui = openShell({ artSvg: o.artSvg });
    const started = Date.now();
    let wrong = 0, fellBack = false, finished = false;
    const promptKey = { color: 'sentenceColor', surface: 'sentenceSurface', action: 'sentenceAction', feeling: 'sentenceFeeling' }[o.kind];
    ui.prompt(t()[promptKey]);
    ui.onClose(() => { if (!finished) { finished = true; ui.close(); resolve({ ok: false }); } });

    const chip = document.createElement('div');
    chip.className = 'value-chip';
    chip.innerHTML = `${o.swatch ? `<span class="sw" style="background:${o.swatch}"></span>` : ''}<span>${esc(o.valueHe)}</span>
      <button class="chip-hear" aria-label="${t().hear}">${ICON.speaker}</button>`;
    chip.querySelector('.chip-hear').onclick = () => say(o.value, 0.8);

    const blank = (w) => w.replace(/[a-z]/gi, '_');
    const firstL = (w) => w[0] + w.slice(1).replace(/[a-z]/gi, '_');
    const w = target.words;
    const variable = (i) => i > 0 && !['is', 'am'].includes(w[i].toLowerCase()) && !(o.kind === 'feeling' && i < 2); // subject + value positions
    const patternAll = () => w.map((x, i) => variable(i) ? blank(x) : x).join(' ') + '.';
    const patternFirst = () => w.map((x, i) => variable(i) ? firstL(x) : x).join(' ') + '.';
    const patternLast = () => w.map((x, i) => i === w.length - 1 ? firstL(x) : x).join(' ') + '.';

    const succeed = () => {
      if (finished) return;
      finished = true;
      sfx.success();
      ui.feedback(rand(t().great), 'good');
      ui.box.classList.add('win');
      setTimeout(() => { ui.close(); resolve({ ok: true, firstTry: wrong === 0, fellBack, seconds: (Date.now() - started) / 1000 }); }, 750);
    };
    const fail = () => {
      wrong++;
      sfx.wrong();
      ui.shake();
      if (fellBack) { ui.feedback(t().tryAgain, 'bad'); return; }
      const l1 = o.level <= 1;
      if (wrong === 1) ui.feedback(t().tryAgain, 'bad');
      else if (wrong === 2) { ui.feedback(`${t().hint} 1`, 'hint'); ui.hint(l1 ? patternFirst() : patternAll()); }
      else if (wrong === 3) { ui.feedback(`${t().hint} 2`, 'hint'); ui.hint(l1 ? patternLast() : patternFirst(), w.join(' ')); }
      else { fellBack = true; ui.feedback(t().easier, 'hint'); ui.hint(''); renderArrange(); }
    };
    const check = (s) => { if (target.re.test(norm(s))) succeed(); else fail(); };

    function renderType() {
      const b = ui.body;
      b.innerHTML = '';
      b.appendChild(chip);
      const wrap = document.createElement('div');
      wrap.className = 'row';
      wrap.innerHTML = `<input class="text-in" dir="ltr" lang="en" autocomplete="off" spellcheck="false" placeholder="${esc(t().typeHere)}" aria-label="${esc(t().typeHere)}">
        ${canListen ? `<button class="icon-btn mic-sm" aria-label="${t().speak}">${ICON.mic}</button>` : ''}
        <button class="btn primary">${t().check}</button>`;
      const inp = $('input', wrap);
      const go = () => { if (inp.value.trim()) check(inp.value); };
      $('.btn.primary', wrap).onclick = go;
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      const mic = $('.mic-sm', wrap);
      if (mic) mic.onclick = async () => {
        mic.classList.add('rec');
        const alts = await listen();
        mic.classList.remove('rec');
        if (finished) return;
        const hit = alts.find((a) => target.re.test(norm(a)));
        if (hit) { inp.value = hit; succeed(); } else if (alts.length) { inp.value = alts[0]; fail(); }
      };
      b.appendChild(wrap);
      if (o.level <= 1) ui.hint(patternAll());
      setTimeout(() => inp.focus(), 250);
    }

    function renderArrange() {
      ui.prompt(t().arrange);
      const b = ui.body;
      b.innerHTML = '';
      b.appendChild(chip);
      const line = document.createElement('div');
      line.className = 'sentence-line';
      line.dir = 'ltr';
      const tiles = document.createElement('div');
      tiles.className = 'tiles';
      tiles.dir = 'ltr';
      const order = shuffle(w.map((x, i) => i));
      tiles.innerHTML = order.map((i) => `<button class="tile word" data-i="${i}">${esc(w[i])}</button>`).join('');
      b.append(line, tiles);
      const picked = [];
      tiles.querySelectorAll('.tile').forEach((tile) => {
        tile.onclick = () => {
          sfx.tap();
          picked.push(tile);
          tile.disabled = true; tile.classList.add('used');
          line.textContent = picked.map((x) => x.textContent).join(' ');
          if (picked.length === w.length) {
            if (picked.map((x) => x.textContent).join(' ') === w.join(' ')) succeed();
            else { fail(); setTimeout(() => { picked.splice(0).forEach((x) => { x.disabled = false; x.classList.remove('used'); }); line.textContent = ''; }, 400); }
          }
        };
      });
    }
    renderType();
  });
}

// ---------- small confirm dialog ----------
export function confirmBox(text) {
  return new Promise((resolve) => {
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = `<div class="task small-box" role="dialog" aria-modal="true" dir="${t().dir}"><p class="task-prompt">${esc(text)}</p>
      <div class="row center"><button class="btn primary yes">${t().yes}</button><button class="btn no">${t().no}</button></div></div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    const done = (v) => { ov.classList.remove('show'); setTimeout(() => ov.remove(), 200); resolve(v); };
    $('.yes', ov).onclick = () => done(true);
    $('.no', ov).onclick = () => done(false);
    $('.yes', ov).focus();
  });
}

export const ICON = {
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};
