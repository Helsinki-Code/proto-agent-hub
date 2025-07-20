// public/sw.js

// This is a basic service worker file.
// It's intentionally left empty for now to resolve the registration error.
// You can add caching strategies and other PWA features here later.

self.addEventListener('install', (event) => {
  // console.log('Service Worker installing.');
  // event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
  // console.log('Service Worker activating.');
  // event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('fetch', (event) => {
  // This basic fetch handler allows the browser to handle all network requests.
  // It's a placeholder and doesn't provide offline functionality.
  // To enable offline caching, you would implement caching strategies here.
  // For example:
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     return response || fetch(event.request);
  //   })
  // );
});
