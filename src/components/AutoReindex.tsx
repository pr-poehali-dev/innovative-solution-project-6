import { useEffect } from "react";

const INDEXNOW_URL = "https://functions.poehali.dev/20b064f2-7534-47ab-8a1e-ff6e58aee9b9";
const STORAGE_KEY = "lastReindexTs";
const INTERVAL_MS = 24 * 60 * 60 * 1000;
const TRIGGER_DELAY_MS = 8000;

const AutoReindex = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hostname === "localhost") return;

    const timer = setTimeout(() => {
      try {
        const last = Number(localStorage.getItem(STORAGE_KEY) || "0");
        const now = Date.now();
        if (now - last < INTERVAL_MS) return;

        localStorage.setItem(STORAGE_KEY, String(now));

        fetch(INDEXNOW_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ all: true }),
          keepalive: true,
        }).catch(() => {
          localStorage.setItem(STORAGE_KEY, String(last));
        });
      } catch {
        // localStorage unavailable — silently ignore
      }
    }, TRIGGER_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AutoReindex;
