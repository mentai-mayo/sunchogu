
const swself = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

/** キャッシュする(オフラインでも使えるようにする)ファイル群 */
const cacheFiles = [
  "/sunchogu/",
  "/sunchogu/index.js",
  "/sunchogu/manifest.json",
];

/** キャッシュバージョン */
const cacheName = "v1";

swself.addEventListener("install", event => {
  console.log("\x1b[92m[ServiceWorker]\x1b[0m", "Install");

  // chache files
  event.waitUntil(caches.open(cacheName).then(cache => {
    return cache.addAll(cacheFiles).then(_ => swself.skipWaiting());
  }));
});

swself.addEventListener("activate", _ => {
  console.log("\x1b[92m[ServiceWorker]\x1b[0m", "activate");
});

swself.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if(origin === location.origin && cacheFiles.includes(url.pathname)) {
    event.respondWith(caches.match(url.pathname).then(res => res ?? fetch(event.request.url).catch(_ => new Response(`{"type":"service_worker","content":"CANNOT_FETCH_DATA"}`, { status: 404, headers: { "content-type": "application/json" } }))));
  }
});
