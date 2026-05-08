import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const RELOAD_FLAG = "chunk-reload-attempted";

const isChunkLoadError = (msg: string) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk \d+ failed|Loading CSS chunk/i.test(msg);

const tryReload = (reason: string) => {
  if (sessionStorage.getItem(RELOAD_FLAG)) {
    console.error("Chunk reload already attempted, skipping. Reason:", reason);
    return;
  }
  sessionStorage.setItem(RELOAD_FLAG, "1");
  window.location.reload();
};

window.addEventListener("error", (event) => {
  const msg = event?.message || String(event?.error || "");
  if (isChunkLoadError(msg)) {
    event.preventDefault();
    tryReload(msg);
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event?.reason;
  const msg = reason?.message || String(reason || "");
  if (isChunkLoadError(msg)) {
    event.preventDefault();
    tryReload(msg);
  }
});

window.addEventListener("load", () => {
  setTimeout(() => sessionStorage.removeItem(RELOAD_FLAG), 5000);
});

createRoot(document.getElementById("root")!).render(<App />);

requestAnimationFrame(() => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 350);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        // Проверяем обновления каждые 60 секунд
        setInterval(() => reg.update().catch(() => {}), 60_000);
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              sw.postMessage("SKIP_WAITING");
            }
          });
        });
      })
      .catch(() => {});

    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  });
}