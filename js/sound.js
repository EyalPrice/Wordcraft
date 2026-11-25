// Short modern sound effects, made in the browser (no audio files, no background music).
let ctx = null;
let enabled = true;
export function setSound(on) { enabled = on; }

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, dur, { type = 'sine', vol = 0.18, slide = 0, delay = 0 } = {}) {
  const a = ac();
  if (!a || !enabled) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export const sfx = {
  tap: () => tone(660, 0.06, { type: 'triangle', vol: 0.08 }),
  pop: () => { tone(420, 0.09, { slide: 500, vol: 0.2 }); tone(900, 0.06, { type: 'triangle', vol: 0.08, delay: 0.05 }); },
  success: () => { tone(660, 0.12, { type: 'triangle' }); tone(880, 0.14, { type: 'triangle', delay: 0.09 }); tone(1320, 0.18, { type: 'sine', vol: 0.1, delay: 0.18 }); },
  wrong: () => tone(240, 0.16, { type: 'sine', slide: -60, vol: 0.14 }),
  whoosh: () => tone(300, 0.14, { type: 'sine', slide: 600, vol: 0.06 }),
  sparkle: () => [0, 0.07, 0.14, 0.21, 0.3].forEach((d, i) => tone(880 + i * 220, 0.12, { type: 'triangle', vol: 0.09, delay: d })),
  paint: () => { tone(520, 0.08, { type: 'triangle', slide: 200, vol: 0.12 }); tone(780, 0.1, { type: 'sine', vol: 0.08, delay: 0.06 }); },
};
