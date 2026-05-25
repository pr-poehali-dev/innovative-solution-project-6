import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const STORAGE_KEY = "favorit_offline_toast_shown_v1";

const OfflineSuccessToast = () => {
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Определяем — сайт установлен как PWA?
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true;
      setInstalled(standalone);
    };
    checkStandalone();

    // Показываем тост один раз — при первом срабатывании service worker
    if (!("serviceWorker" in navigator)) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    navigator.serviceWorker.ready
      .then(() => {
        // Ждём чтобы кэш точно сохранился
        setTimeout(() => {
          if (navigator.serviceWorker.controller) {
            setVisible(true);
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
            // Автоскрытие через 8 секунд
            setTimeout(() => setVisible(false), 8000);
          }
        }, 2000);
      })
      .catch(() => undefined);

    // Реакция на событие установки приложения
    const onInstalled = () => {
      setInstalled(true);
      setVisible(true);
      setTimeout(() => setVisible(false), 10000);
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:left-auto sm:right-4 sm:inset-x-auto z-[150] px-3 sm:px-0 sm:w-[360px] animate-in slide-in-from-bottom-5 duration-500"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div
        className="relative rounded-2xl p-[1.5px] shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, #4ade80 0%, #16a34a 50%, #15803d 100%)",
        }}
      >
        <div className="rounded-2xl bg-zinc-950/95 backdrop-blur-md p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center">
              <Icon
                name="CircleCheck"
                size={22}
                className="text-green-400"
                strokeWidth={2.5}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-white font-black text-sm sm:text-base leading-tight mb-1 flex items-center gap-1.5">
                {installed ? "Приложение установлено" : "Сайт сохранён"}
                <span className="text-base">🎉</span>
              </div>
              <p className="text-white/75 text-xs leading-snug">
                {installed
                  ? "Запускайте «Фаворит» с главного экрана. Работает без интернета."
                  : "Теперь сайт работает без интернета — можно открывать в дороге."}
              </p>

              <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-green-400/90 font-bold uppercase tracking-wider">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Готово к работе офлайн
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="flex-shrink-0 w-7 h-7 -mt-1 -mr-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 flex items-center justify-center"
              aria-label="Закрыть"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineSuccessToast;
