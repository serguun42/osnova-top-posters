/* eslint-disable */
const CACHE_STORAGE_NAME = 'osnova_top_posters_react_cache_storage';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_STORAGE_NAME).then((cache) => cache.addAll(['/osnova-top-posters/dtf'])));
});

self.addEventListener('activate', () => {});

self.addEventListener('beforeinstallprompt', () => {});

/**
 * Fetch network resource and put result in cache if needed
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
const fromNetwork = (request) =>
  fetch(request).then((response) => {
    if (response.status === 200)
      caches
        .open(CACHE_STORAGE_NAME)
        .then((cache) => cache.put(request, response.clone()))
        .catch(console.warn);

    return response.clone();
  });

/**
 * **From Cache**
 *
 * @param {Request} request
 */
const fromCache = (request) =>
  caches
    .open(CACHE_STORAGE_NAME)
    .then((cache) => cache.match(request))
    .then((matching) => {
      if (matching) return matching;
      return Promise.reject('no-match');
    });

self.addEventListener(
  'fetch',
  /** @param {Event & { request: Request, respondWith: (Promise<Response>) => void }} event */ (event) => {
    const { request } = event;

    if (request.method !== 'GET') return fetch(request);

    let apiCalledFlag = false;

    try {
      const parsedURL = new URL(request.url || '', 'https://serguun42.ru');

      if (/^\/osnova-top-posters\/data\//i.test(parsedURL.pathname)) apiCalledFlag = true;
    } catch (e) {}

    if (apiCalledFlag)
      event.respondWith(
        fromNetwork(request)
          .catch(() => fromCache(request))
          .catch((e) => {
            console.warn(e);
            return new Response('');
          })
      );
    else
      event.respondWith(
        fromCache(request)
          .catch(() => fromNetwork(request))
          .catch((e) => {
            console.warn(e);
            return new Response('');
          })
      );
  }
);
