// Offline support: keeps the game's files so it works without internet after the first visit.
const CACHE = 'wordcraft-v2';
const FILES = [
  './', './index.html', './play.html', './css/style.css', './manifest.webmanifest', './icons/icon.svg',
  './js/game.js', './js/art.js', './js/data.js', './js/i18n.js', './js/sound.js', './js/speech.js',
  './js/state.js', './js/tasks.js', './js/logo.js',
  './fonts/fredoka-hebrew-wght-normal.woff2', './fonts/fredoka-latin-wght-normal.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first (so updates show up), cache as fallback when offline.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        if (res.ok || res.type === 'opaque') caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
