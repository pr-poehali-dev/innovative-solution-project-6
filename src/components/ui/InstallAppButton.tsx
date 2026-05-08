import { useEffect, useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import Icon from "@/components/ui/icon";

interface InstallAppButtonProps {
  className?: string;
  iconOnly?: boolean;
}

type Platform = "ios" | "android" | "desktop";

const detectPlatform = (): Platform => {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
};

const InstallAppButton = ({ className = "", iconOnly = false }: InstallAppButtonProps) => {
  const { canInstall, installed, install } = useInstallPrompt();
  const [showHelp, setShowHelp] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (installed) return null;

  const onClick = async () => {
    if (canInstall) {
      await install();
    } else {
      setShowHelp(true);
    }
  };

  const helpText =
    platform === "ios"
      ? "В Safari нажмите кнопку «Поделиться» внизу экрана, затем «На экран Домой»"
      : platform === "android"
      ? "Откройте меню браузера (три точки) и выберите «Установить приложение» или «Добавить на главный экран»"
      : "В адресной строке нажмите значок установки, либо в меню браузера выберите «Установить приложение»";

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Установить приложение — работает без интернета"
        title="Установить приложение — работает без интернета"
        className={`group relative inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-white font-semibold ${
          iconOnly ? "w-10 h-10 justify-center p-0" : "pl-3 sm:pl-4 pr-3 sm:pr-4 py-1.5 text-xs sm:text-sm"
        } ${className}`}
      >
        <Icon name="Download" size={iconOnly ? 16 : 14} className="text-accent shrink-0" />
        {!iconOnly && (
          <span className="flex flex-col leading-tight items-start">
            <span className="font-bold whitespace-nowrap">Установить</span>
            <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-accent/80 whitespace-nowrap">
              Работает без интернета
            </span>
          </span>
        )}
      </button>

      {showHelp && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="relative w-full sm:max-w-md rounded-2xl border border-accent/40 bg-card p-5 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-white/10"
              aria-label="Закрыть"
            >
              <Icon name="X" size={16} />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-black shadow-lg"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                Ф
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-base sm:text-lg mb-0.5">
                  Установить «Фаворит» на телефон
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Открытие одним касанием · работает без интернета
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  name={platform === "ios" ? "Apple" : platform === "android" ? "Smartphone" : "Monitor"}
                  size={16}
                  className="text-accent"
                />
                <span className="text-accent font-bold text-sm uppercase tracking-wider">
                  {platform === "ios" ? "iPhone / iPad" : platform === "android" ? "Android" : "Компьютер"}
                </span>
              </div>
              <p className="text-white/85 text-sm leading-relaxed">{helpText}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="w-full px-4 py-2.5 rounded-xl text-black font-bold text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallAppButton;
