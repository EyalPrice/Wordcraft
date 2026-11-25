// Speaking English words aloud, and listening to the player (when the browser can).
export const canSpeak = 'speechSynthesis' in window;
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!Rec;

let voice = null;
function pickVoice() {
  if (!canSpeak) return;
  const vs = speechSynthesis.getVoices();
  voice = vs.find((v) => /en[-_]US/i.test(v.lang) && /Google|Samantha|Female/i.test(v.name))
    || vs.find((v) => /en[-_](US|GB)/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || null;
}
if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

export function say(text, rate = 0.9) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

// Listens once. Resolves with a list of possible transcripts (lower case), or [] on failure.
export function listen() {
  return new Promise((resolve) => {
    if (!canListen) return resolve([]);
    const r = new Rec();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 5;
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    r.onresult = (e) => {
      const alts = [];
      for (const res of e.results) for (const a of res) alts.push(a.transcript.toLowerCase().trim());
      finish(alts);
    };
    r.onerror = () => finish([]);
    r.onend = () => finish([]);
    try { r.start(); } catch { finish([]); }
    setTimeout(() => { try { r.stop(); } catch { /* ignore */ } }, 7000);
  });
}
