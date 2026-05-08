import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

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
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider"
        title="Нет интернета — сайт продолжает работать из памяти"
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-amber-400" />
        </span>
        <Icon name="WifiOff" size={11} />
        <span className="hidden sm:inline">Офлайн</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-wider"
      title="Сайт сохранён — работает без интернета"
    >
      <span className="relative flex w-1.5 h-1.5">
        <span className="relative w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
      </span>
      <span className="hidden sm:inline">Готово</span>
    </div>
  );
};

export default OfflineStatusDot;
