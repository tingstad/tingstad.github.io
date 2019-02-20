const expectedCaches = ['static-v1'];

self.addEventListener('install', event => {
  //self.skipWaiting();
  event.waitUntil(
    caches.open('static-v1')
      .then(cache => cache.addAll(['/data']))
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
  if (url.origin == location.origin && url.pathname == '/data') {
    event.respondWith(caches.match('/data'));
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

