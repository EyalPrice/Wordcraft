// Game state: saved in the browser (localStorage), no account needed.
import { PLACES, RANKS } from './data.js';

const KEY = 'wordcraft.v2'; // v2: new art and items (v1 saves are not compatible)

function fresh() {
  const worlds = {};
  for (const p of PLACES) {
    const bg = {}, tex = {};
    for (const s of p.surfaces) { bg[s.id] = s.color; tex[s.id] = s.tex; }
    worlds[p.id] = { bg, tex, items: [] };
  }
  worlds.dressup.char = { skin: '#DDA878', feeling: 'happy', slots: { hair: { id: 'hair', v: 0, color: '#5E3B25' }, top: { id: 'shirt', v: 0, color: '#F7F6F2' }, bottom: { id: 'pants', v: 0, color: '#3E5C8A' } } };
  return {
    v: 1,
    ui: 'he',
    sound: true,
    levels: { bedroom: 1, dressup: 1, park: 1, track: 1, sentences: 1 },
    placement: { active: true, done: 0, streak: 0 },
    streaks: {},
    fallbacks: {},
    points: 0,
    rankSeen: 0,
    unlocked: [],
    newPrize: false,
    learned: {},
    review: [],
    successes: 0,
    englishAsked: false,
    worlds,
    lastPlace: null,
    uid: 1,
  };
}

export let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      const base = fresh();
      // Merge so new fields from later versions get defaults.
      return { ...base, ...s, levels: { ...base.levels, ...s.levels }, worlds: { ...base.worlds, ...s.worlds } };
    }
  } catch { /* corrupted save: start fresh */ }
  return fresh();
}

let demo = false;
export function setDemo(v) { demo = v; }

export function save() {
  if (demo) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}

export function resetAll() {
  state = fresh();
  save();
}

export function replaceState(s) { state = s; }

export const nextUid = () => state.uid++;

// ---------- levels ----------
// Hidden placement: everyone starts at level 1; perfect, fast answers jump the level up quickly.
export function recordWordResult(topic, { firstTry, seconds, fellBack }) {
  const lv = state.levels;
  const p = state.placement;
  if (p.active) {
    p.done++;
    if (firstTry && seconds < 12) {
      p.streak++;
      if (p.streak === 2) for (const k of Object.keys(lv)) lv[k] = Math.max(lv[k], 2);
      if (p.streak === 4) for (const k of Object.keys(lv)) lv[k] = 3;
    } else {
      p.active = false; // a miss ends placement at the current level
    }
    if (p.done >= 5) p.active = false;
    return;
  }
  const st = (state.streaks[topic] = firstTry ? (state.streaks[topic] || 0) + 1 : 0);
  if (st >= 5 && lv[topic] < 3) { lv[topic]++; state.streaks[topic] = 0; }
  const fb = (state.fallbacks[topic] = (state.fallbacks[topic] || []).concat(fellBack ? 1 : 0).slice(-6));
  if (fb.filter(Boolean).length >= 2 && lv[topic] > 1) { lv[topic]--; state.fallbacks[topic] = []; }
}

// ---------- points and ranks ----------
export function rankIndex(points = state.points) {
  let i = 0;
  RANKS.forEach((r, k) => { if (points >= r.points) i = k; });
  return i;
}

// Returns {rankUp, prize, surprise}
export function addPoints(n, { countSuccess = true } = {}) {
  const before = rankIndex();
  state.points += n;
  let surprise = false;
  if (countSuccess) {
    state.successes++;
    if (state.successes % 6 === 0) { state.points += 20; surprise = true; state.newPrize = true; }
  }
  const after = rankIndex();
  let prize = null;
  if (after > before) {
    for (let k = before + 1; k <= after; k++) {
      const pz = RANKS[k].prize;
      if (pz && !state.unlocked.includes(pz)) { state.unlocked.push(pz); prize = pz; }
    }
    state.newPrize = true;
  }
  return { rankUp: after > before, prize, surprise };
}

export function learnWord(id) {
  const w = state.learned[id] || { n: 0, at: Date.now() };
  w.n++;
  state.learned[id] = w;
}
