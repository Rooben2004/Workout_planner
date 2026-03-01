const CACHE_NAME = 'workout-planner-v1';
const ASSETS = [
    './workout.html',
    './favicon.png',
    './zoro-one-piece-black-white-moewalls-com.mp4'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
