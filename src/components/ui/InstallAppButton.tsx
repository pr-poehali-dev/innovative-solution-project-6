import { useEffect, useRef, useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import Icon from "@/components/ui/icon";

interface InstallAppButtonProps {
  className?: string;
  iconOnly?: boolean;
}

type Platform = "ios" | "android" | "desktop";
type Stage = "idle" | "downloading" | "done" | "error";

const detectPlatform = (): Platform => {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
};

const collectAssetUrls = (): string[] => {
  const set = new Set<string>();
  const origin = window.location.origin;
  set.add(origin + "/");
  set.add(origin + "/index.html");
  set.add(origin + "/manifest.webmanifest");

  try {
    const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    entries.forEach((e) => {
      if (!e.name) return;
      try {
        const u = new URL(e.name, origin);
        if (u.hostname.includes("functions.poehali.dev")) return;
        if (u.hostname.includes("mc.yandex.ru")) return;
        if (u.pathname.startsWith("/api/")) return;
        if (u.origin === origin || u.hostname === "cdn.poehali.dev") {
          set.add(u.toString());
        }
      } catch {
        void 0;
      }
    });
  } catch {
    void 0;
  }

  document.querySelectorAll<HTMLImageElement>("img[src]").forEach((img) => {
    const src = img.currentSrc || img.src;
    if (!src) return;
    try {
      const u = new URL(src, origin);
      if (u.origin === origin || u.hostname === "cdn.poehali.dev") set.add(u.toString());
    } catch {
      void 0;
    }
  });

  document.querySelectorAll<HTMLLinkElement>("link[href]").forEach((l) => {
    if (!l.href) return;
    try {
      const u = new URL(l.href, origin);
      if (u.origin === origin) set.add(u.toString());
    } catch {
      void 0;
    }
  });

  return Array.from(set);
};

const InstallAppButton = ({ className = "", iconOnly = false }: InstallAppButtonProps) => {
  const { canInstall, installed, install } = useInstallPrompt();
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0, failed: 0 });
  const [swReady, setSwReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => setSwReady(true)).catch(() => setSwReady(false));
    }
  }, []);

  if (installed) return null;

  const startDownload = async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStage("downloading");
    setProgress({ done: 0, total: 0, failed: 0 });

    if (!("serviceWorker" in navigator)) {
      setStage("error");
      return;
    }

    try {
      const reg = await navigator.serviceWorker.ready;
      const sw = reg.active || navigator.serviceWorker.controller;
      if (!sw) {
        setStage("error");
        return;
      }

      const urls = collectAssetUrls();
      const channel = new MessageChannel();

      channel.port1.onmessage = (e) => {
        const data = e.data;
        if (!data) return;
        if (data.type === "progress") {
          setProgress({ done: data.done, total: data.total, failed: data.failed });
        } else if (data.type === "done") {
          setProgress({ done: data.done, total: data.total, failed: data.failed });
          setStage("done");
          channel.port1.close();
        }
      };

      sw.postMessage({ type: "PRECACHE_ASSETS", urls }, [channel.port2]);
    } catch {
      setStage("error");
    }
  };

  const onClick = () => {
    setOpen(true);
    startedRef.current = false;
    setStage("idle");
    setTimeout(() => startDownload(), 200);
  };

  const close = () => {
    setOpen(false);
    setStage("idle");
    startedRef.current = false;
  };

  const handleInstall = async () => {
    if (canInstall) {
      const ok = await install();
      if (ok) close();
    }
  };

  const percent =
    progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : 0;

  const helpText =
    platform === "ios"
      ? "Нажмите кнопку «Поделиться» в Safari, затем «На экран Домой» — иконка появится на рабочем столе"
      : platform === "android"
      ? "Откройте меню браузера (три точки) и выберите «Установить приложение» или «Добавить на главный экран»"
      : "В адресной строке нажмите значок установки, либо в меню браузера выберите «Установить приложение»";

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Скачать сайт — работает без интернета"
        title="Скачать сайт — работает без интернета"
        className={`group relative inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-white font-semibold ${
          iconOnly ? "w-9 h-9 justify-center p-0" : "px-2.5 py-1.5 text-xs"
        } ${className}`}
      >
        <Icon name="Download" size={iconOnly ? 15 : 13} className="text-accent shrink-0" />
        {!iconOnly && <span className="font-bold whitespace-nowrap">Скачать</span>}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={close}
        >
          <div
            className="relative w-full sm:max-w-md rounded-2xl border border-accent/40 bg-card p-5 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
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
                  {stage === "done" ? "Сайт скачан" : "Скачиваем сайт"}
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {stage === "done"
                    ? "Теперь работает без интернета"
                    : "Сохраняем все страницы, фото и стили в память"}
                </p>
              </div>
            </div>

            {/* Прогресс */}
            <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 mb-4">
              {stage === "error" || !swReady ? (
                <div className="flex items-center gap-2 text-amber-400">
                  <Icon name="TriangleAlert" size={16} />
                  <span className="text-sm font-semibold">
                    {!swReady
                      ? "Браузер не поддерживает офлайн-режим"
                      : "Не удалось скачать. Проверьте интернет"}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {stage === "done" ? (
                        <Icon name="CircleCheck" size={16} className="text-green-400" />
                      ) : (
                        <Icon
                          name="Download"
                          size={16}
                          className="text-accent animate-pulse"
                        />
                      )}
                      <span className="text-white font-bold text-sm">
                        {stage === "done" ? "Готово" : "Загрузка..."}
                      </span>
                    </div>
                    <span className="text-accent font-black text-sm tabular-nums">{percent}%</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percent}%`,
                        background:
                          stage === "done"
                            ? "linear-gradient(90deg, #4ade80, #22c55e)"
                            : "linear-gradient(90deg, #f5d060, #e8a820)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
                    <span>
                      {progress.done} из {progress.total || "..."} файлов
                    </span>
                    {progress.failed > 0 && (
                      <span className="text-amber-400">пропущено: {progress.failed}</span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* После скачивания — установка PWA */}
            {stage === "done" && (
              <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    name={platform === "ios" ? "Apple" : platform === "android" ? "Smartphone" : "Monitor"}
                    size={16}
                    className="text-accent"
                  />
                  <span className="text-accent font-bold text-sm uppercase tracking-wider">
                    {canInstall
                      ? "Установить иконкой"
                      : platform === "ios"
                      ? "iPhone / iPad"
                      : platform === "android"
                      ? "Android"
                      : "Компьютер"}
                  </span>
                </div>
                <p className="text-white/85 text-sm leading-relaxed">
                  {canInstall
                    ? "Добавим ярлык на рабочий стол — открытие в одно касание"
                    : helpText}
                </p>
              </div>
            )}

            {stage === "done" && canInstall ? (
              <button
                type="button"
                onClick={handleInstall}
                className="w-full px-4 py-2.5 rounded-xl text-black font-bold text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                Добавить на рабочий стол
              </button>
            ) : (
              <button
                type="button"
                onClick={close}
                disabled={stage === "downloading"}
                className="w-full px-4 py-2.5 rounded-xl text-black font-bold text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                {stage === "downloading" ? "Подождите..." : stage === "done" ? "Готово" : "Закрыть"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InstallAppButton;