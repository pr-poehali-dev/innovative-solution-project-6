import { useEffect, useState } from "react";

const OfflineStatusDot = () => {
  const [ready, setReady] = useState(false);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);

    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          if (navigator.serviceWorker.controller) {
            setReady(true);
          } else {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              setReady(true);
            });
          }
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!ready) return null;

  if (!online) {
    return (
      <div
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/40"
        title="Нет интернета — сайт работает из памяти"
        aria-label="Нет интернета"
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
          <span className="relative w-2 h-2 rounded-full bg-amber-400" />
        </span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30"
      title="Есть интернет — сайт сохранён и работает офлайн"
      aria-label="Есть интернет"
    >
      <span className="relative flex w-2 h-2">
        <span className="relative w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
      </span>
    </div>
  );
};

export default OfflineStatusDot;