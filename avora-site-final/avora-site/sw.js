const CACHE_NAME = "avora-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/bolsa-luna.svg",
  "./assets/bolsa-aurora.svg",
  "./assets/ursinho.svg",
  "./assets/cesto.svg",
  "./assets/maternidade.svg",
  "./assets/necessaire.svg",
  "./assets/coelho.svg",
  "./assets/sousplat.svg",
  "./assets/atelier.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))));
self.addEventListener("fetch", event => event.respondWith(caches.match(event.request).then(response => response || fetch(event.request))));
