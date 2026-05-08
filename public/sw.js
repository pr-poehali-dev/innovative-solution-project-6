/* Service Worker — Фаворит PWA v2 (полноценная работа всех страниц без сети) */
const CACHE_VERSION = "v2";
const STATIC_CACHE = `favorit-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `favorit-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `favorit-images-${CACHE_VERSION}`;

const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(k))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isOwnOrigin = url.origin === self.location.origin;
  const isCdn = url.hostname === "cdn.poehali.dev";

  // Не обрабатываем сторонние домены, кроме нашего CDN
  if (!isOwnOrigin && !isCdn) return;

  // Не кешируем API/функции/аналитику
  if (
    url.hostname.includes("functions.poehali.dev") ||
    url.hostname.includes("mc.yandex.ru") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  // НАВИГАЦИЯ — любая страница (/, /blog, /tehnika/..., /gorod/...) → SPA-фолбэк через index.html
  const isNavigation =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNavigation) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Кешируем только успешные HTML-ответы
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
            // Дублируем как / и index.html — это и есть SPA-shell
            caches.open(STATIC_CACHE).then((c) => {
              c.put("/", res.clone());
              c.put("/index.html", res.clone());
            });
          }
          return res;
        })
        .catch(async () => {
          // Сначала ищем точно эту страницу в кеше
          const cached = await caches.match(req);
          if (cached) return cached;
          // Иначе отдаём app-shell — React-router сам отрисует нужную страницу
          const shell =
            (await caches.match("/index.html")) || (await caches.match("/"));
          if (shell) return shell;
          return new Response(
            "<h1>Нет соединения</h1><p>Откройте приложение, когда будет интернет.</p>",
            {
              status: 503,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            }
          );
        })
    );
    return;
  }

  // ИЗОБРАЖЕНИЯ — Cache First (картинки техники, фото)
  const isImage =
    req.destination === "image" ||
    /\.(?:png|jpe?g|svg|gif|webp|avif|ico)(?:\?.*)?$/i.test(url.pathname);

  if (isImage) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(req).then(
          (cached) =>
            cached ||
            fetch(req)
              .then((res) => {
                if (res && res.status === 200) cache.put(req, res.clone());
                return res;
              })
              .catch(() => cached)
        )
      )
    );
    return;
  }

  // СТАТИКА (JS, CSS, шрифты) — Stale-While-Revalidate
  const isStatic =
    ["script", "style", "font"].includes(req.destination) ||
    /\.(?:js|css|woff2?|ttf|otf)(?:\?.*)?$/i.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const network = fetch(req)
            .then((res) => {
              if (res && res.status === 200) cache.put(req, res.clone());
              return res;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Остальное — Network First с фолбэком на кеш
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});