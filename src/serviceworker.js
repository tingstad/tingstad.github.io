const cacheName = 'static-v3';
const expectedCaches = [cacheName];

self.addEventListener('install', event => {
  self.skipWaiting(); //New SW may take over old versions
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        cache.addAll(['/', '/dist/app.js', '/dist/data']);
        cache.put('/version', new Response(`version; ${cacheName} ${new Date()}`));
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin == location.origin && url.pathname == '/dist/data') {
    const response = caches.match('/dist/data');
    event.respondWith(response);
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

