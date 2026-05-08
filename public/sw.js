/* Service Worker — Фаворит PWA v3 (Cache First, мгновенная работа без интернета) */
const CACHE_VERSION = "v3";
const STATIC_CACHE = `favorit-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `favorit-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `favorit-images-${CACHE_VERSION}`;

const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest"];

// Таймаут сети — после этого отдаём кеш, не ждём вечно
const NET_TIMEOUT = 2500;

const fetchWithTimeout = (req, ms = NET_TIMEOUT) =>
  new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    fetch(req)
      .then((r) => {
        clearTimeout(t);
        resolve(r);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });

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

  if (!isOwnOrigin && !isCdn) return;

  if (
    url.hostname.includes("functions.poehali.dev") ||
    url.hostname.includes("mc.yandex.ru") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  // НАВИГАЦИЯ — Cache First (мгновенно), потом обновляем из сети в фоне
  const isNavigation =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNavigation) {
    event.respondWith(
      caches.match("/index.html").then((shell) => {
        // Если есть закешированный shell — отдаём моментально
        const networkUpdate = fetchWithTimeout(new Request("/index.html", { cache: "no-cache" }))
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(STATIC_CACHE).then((c) => {
                c.put("/", copy.clone());
                c.put("/index.html", copy);
              });
            }
            return res;
          })
          .catch(() => null);

        if (shell) {
          // Обновляем в фоне, отдаём кеш
          networkUpdate;
          return shell;
        }
        // Кеша нет (первая загрузка) — ждём сеть
        return networkUpdate.then(
          (res) =>
            res ||
            new Response(
              "<h1>Нет соединения</h1><p>Откройте приложение, когда будет интернет.</p>",
              { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
            )
        );
      })
    );
    return;
  }

  // ИЗОБРАЖЕНИЯ — Cache First
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
              .catch(() => cached || Response.error())
        )
      )
    );
    return;
  }

  // СТАТИКА (JS, CSS, шрифты) — Cache First (мгновенно), сеть в фоне
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

  // Остальное — Cache First с обновлением в фоне
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});