const CACHE='personal-hub-v29-supabase-runtime-fix';
const APP_SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo.svg',
  './assets/logo-white.svg',
  './assets/logo-mark.svg',
  './assets/brands/bif.svg',
  './assets/brands/bcp.svg',
  './assets/brands/bbva.svg',
  './assets/brands/interbank.svg',
  './assets/brands/scotia.svg',
  './assets/brands/pichincha.svg',
  './assets/brands/nacion.svg',
  './assets/brands/falabella.svg',
  './assets/brands/ripley.svg',
  './assets/brands/cajaarequipa.svg',
  './assets/brands/diners.svg',
  './assets/brands/amex.svg',
  './assets/brands/visa.svg',
  './assets/brands/mastercard.svg',
  './assets/brands/yape.svg',
  './assets/brands/plin.svg',
  './assets/brands/generic.svg',
  './icons/favicon-32.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './favicon.ico'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request)
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
          return response;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }))
  );
});
