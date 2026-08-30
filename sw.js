const CACHE='fitfinity-staff-ui-v36-couple-onboarding';
const SHELL=[
  './',
  './?staff=1',
  './assets/css/core.css',
  './assets/css/patches/review-48.css',
  './assets/css/patches/review-50.css',
  './assets/css/patches/review-53.css',
  './assets/css/patches/v012-normalization.css',
  './assets/css/patches/v019.css',
  './assets/css/patches/v020.css',
  './assets/css/patches/v022.css',
  './assets/css/patches/v023-overrides.css',
  './assets/css/patches/v024.css',
  './assets/css/patches/v025.css',
  './assets/css/patches/v027.css',
  './assets/css/patches/v028.css',
  './assets/css/v030-final-polish.css',
  './assets/css/v030-final.css',
  './assets/css/v030.css',
  './assets/css/v032-ui-fixes.css',
  './assets/css/v033-polish.css',
  './assets/css/v034-mobile-renewals.css',
  './assets/css/v036-onboarding-ipad.css',
  './assets/images/about-hero.jpg',
  './assets/images/about-story.jpg',
  './assets/images/about-timeline.jpg',
  './assets/images/equipment-adjustable-benches.jpg',
  './assets/images/equipment-cardio-zone.jpg',
  './assets/images/equipment-dumbbells.jpg',
  './assets/images/equipment-functional-area.jpg',
  './assets/images/equipment-recovery-stretch.jpg',
  './assets/images/equipment-squat-racks.jpg',
  './assets/images/fitfinity-logo.jpg',
  './assets/images/home-hero.jpg',
  './assets/images/membership-hero.jpg',
  './assets/images/staff-login.jpg',
  './assets/images/trainer-darren.jpg',
  './assets/images/trainer-huang-min.jpg',
  './assets/images/trainer-jason.jpg',
  './assets/images/trainer-meiling.jpg',
  './assets/images/training-hero.jpg',
  './assets/images/video-core-conditioning.jpg',
  './assets/images/video-dumbbell-strength.jpg',
  './assets/images/video-hiit-finisher.jpg',
  './assets/images/video-lower-body-power.jpg',
  './assets/js/core.js',
  './assets/js/patches/review-48.js',
  './assets/js/patches/review-49.js',
  './assets/js/patches/v015.js',
  './assets/js/patches/v016.js',
  './assets/js/patches/v017.js',
  './assets/js/patches/v018.js',
  './assets/js/patches/v019.js',
  './assets/js/patches/v020.js',
  './assets/js/patches/v023.js',
  './assets/js/patches/v024.js',
  './assets/js/patches/v025.js',
  './assets/js/patches/v026.js',
  './assets/js/patches/v027.js',
  './assets/js/patches/v028.js',
  './assets/js/pwa.js',
  './assets/js/requests-v029.js',
  './assets/js/v030-final.js',
  './assets/js/v030.js',
  './assets/js/v032-ui-fixes.js',
  './assets/js/v033-polish.js',
  './assets/js/v035-demo-data.js',
  './assets/js/v036-onboarding-ipad.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.webmanifest'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method !== 'GET') return;
  const url=new URL(req.url);
  if(url.pathname.startsWith('/api/')) return;
  if(req.mode === 'navigate'){
    event.respondWith(fetch(req).catch(() => caches.match('./?staff=1').then(r => r || caches.match('./'))));
    return;
  }
  if(url.origin === self.location.origin){
    event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy=resp.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return resp;
    })));
  }
});
