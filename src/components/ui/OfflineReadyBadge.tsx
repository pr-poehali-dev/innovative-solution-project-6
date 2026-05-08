import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const OfflineReadyBadge = () => {
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
          // Если уже есть активный контроллер — кеш готов к работе
          if (navigator.serviceWorker.controller) {
            setReady(true);
          } else {
            // Иначе ждём, пока SW возьмёт управление
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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-semibold">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
          <span className="relative w-2 h-2 rounded-full bg-amber-400" />
        </span>
        <Icon name="WifiOff" size={13} />
        Без интернета — сайт работает
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs font-semibold"
      title="Сайт сохранён в памяти телефона и работает без интернета"
    >
      <Icon name="CheckCircle2" size={13} />
      Готово к работе без интернета
    </div>
  );
};

export default OfflineReadyBadge;
