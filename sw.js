var CACHE = 'telefoonboek-v8';
var FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
var WACHT = 2000; /* zo lang wachten we op het netwerk voordat we de opgeslagen versie pakken */

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Eerst het netwerk, zodat updates altijd doorkomen.
   Duurt dat langer dan twee seconden of is er geen verbinding,
   dan meteen de opgeslagen versie. */
function uitDeKast(req) {
  return caches.match(req).then(function (hit) {
    if (hit) return hit;
    return caches.match('./index.html').then(function (idx) {
      return idx || new Response('Geen verbinding', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    });
  });
}

function netEerst(req) {
  return new Promise(function (resolve) {
    var klaar = false;
    var timer = setTimeout(function () {
      if (klaar) return;
      caches.match(req).then(function (hit) {
        if (hit && !klaar) { klaar = true; resolve(hit); }
      });
    }, WACHT);

    fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      if (!klaar) { klaar = true; clearTimeout(timer); resolve(res); }
    }).catch(function () {
      if (klaar) return;
      uitDeKast(req).then(function (r) {
        if (klaar) return;
        klaar = true; clearTimeout(timer); resolve(r);
      });
    });
  });
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(netEerst(e.request));
});
