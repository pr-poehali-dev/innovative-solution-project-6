import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const STORAGE_KEY = "favorit_install_prompt_dismissed_at";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

const isIos = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
};

const isStandalone = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
};

const InstallPrompt = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosMode, setIosMode] = useState(false);

  useEffect(() => {
    const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < COOLDOWN_MS) return;
    if (isStandalone()) return;

    if (isIos()) {
      setIosMode(true);
      setTimeout(() => setVisible(true), 5000);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setTimeout(() => setVisible(true), 4000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  const onInstall = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "dismissed") {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      }
    } catch {
      // игнорируем
    }
    setVisible(false);
    setDeferred(null);
  };

  const onClose = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;
  if (!iosMode && !deferred) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[60] animate-in slide-in-from-bottom-4 duration-300">
      <div className="relative rounded-2xl border border-accent/40 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-4 sm:p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <Icon name="X" size={16} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-black shadow-lg"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
          >
            Ф
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm sm:text-base mb-0.5">
              Установить «Фаворит»
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
              {iosMode
                ? "Добавьте сайт на главный экран — открывайте одним касанием"
                : "Открывайте сайт одним касанием с главного экрана — работает даже без интернета"}
            </p>
          </div>
        </div>

        {iosMode ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-bold text-accent text-xs">1</span>
              <span>Нажмите кнопку</span>
              <Icon name="Share" size={16} className="text-accent" />
              <span>«Поделиться» внизу</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-bold text-accent text-xs">2</span>
              <span>Выберите «На экран Домой»</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 px-4 py-2.5 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors text-white text-sm font-semibold"
            >
              Понятно
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onInstall}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-black font-bold text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <Icon name="Download" size={16} />
              Установить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors text-white text-sm font-semibold"
            >
              Позже
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;