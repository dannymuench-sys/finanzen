// Service Worker: hält die App offline verfügbar.
// Finanzdaten liegen NICHT hier, sondern nur im localStorage des Geräts.
// Bei jeder Änderung an der App die Versionsnummer erhöhen.
const CACHE = 'finanzen-v1.2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Sofort aus dem Speicher antworten, im Hintergrund die neue Version holen
// (Änderungen an der App erscheinen dadurch beim übernächsten Öffnen).
// Fremde Adressen (z. B. Wechselkurse) werden nicht angefasst.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const key = req.mode === 'navigate' ? './index.html' : req;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(key, { ignoreSearch: true });
    const fresh = fetch(req).then(res => {
      if (res && res.ok) cache.put(key, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { e.waitUntil(fresh); return cached; }
    return (await fresh) || new Response('Offline – bitte einmal mit Internet öffnen.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }));
});
