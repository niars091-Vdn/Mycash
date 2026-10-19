// MyCash — service worker minimo.
// Tiene in cache solo il guscio (icone, pagina di avvio, informativa) per aprirsi subito.
// Non salva né intercetta MAI i dati della nota spese: quelli passano solo tra Google e il tuo Drive.
const CACHE = "mycash-guscio-v1";
const FILE = ["./", "./index.html", "./config.js", "./privacy.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return; // Google: mai toccato
  // Rete prima (così gli aggiornamenti arrivano subito), cache solo se offline
  e.respondWith(
    fetch(e.request)
      .then((r) => { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request))
  );
});
