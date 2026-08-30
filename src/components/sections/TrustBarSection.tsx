import Icon from "@/components/ui/icon";
import { openDownloadModal } from "@/components/ui/OfflineDownloadModal";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const miniReviews = [
  { name: "Андрей С.", text: "Приехали через 40 минут, всё чётко", rating: 5 },
  { name: "Дмитрий К.", text: "Подобрали машину за 20 минут", rating: 5 },
];

const TrustBarSection = () => {
  const { installed } = useInstallPrompt();

  return (
    <section
      className="relative py-4 sm:py-10 border-y border-accent/15 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,12,4,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(20,12,4,0.7) 100%)",
      }}
    >
      {/* Декоративные золотые пятна */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
        {/* Шапка секции */}
        <div className="flex items-center justify-between mb-3 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-accent/30 bg-accent/10">
            <span className="relative flex w-1.5 h-1.5">
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-accent font-black">
              Нам доверяют
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-white/55 font-bold">
            <Icon name="ShieldCheck" size={14} className="text-accent" />
            ООО «Фаворит» · с 2015 года
          </div>
        </div>

        <div
          className={`grid gap-2 sm:gap-3 ${
            installed
              ? "grid-cols-2 sm:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-5"
          }`}
        >
          {/* 1. Яндекс рейтинг — премиум-плитка */}
          <div
            className="relative rounded-2xl p-[1.5px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,208,96,0.6) 0%, rgba(232,168,32,0.2) 50%, rgba(232,168,32,0.6) 100%)",
            }}
          >
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-2.5 sm:p-3.5 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-2 sm:gap-2.5">
                <div
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-black font-black text-base sm:text-lg shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #ff4d4d 0%, #d33 50%, #b22 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(220,30,30,0.4)",
                  }}
                >
                  Я
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-xl font-black text-white leading-none tabular-nums">4.9</span>
                    <Icon name="Star" size={12} className="text-accent fill-accent sm:!w-[14px] sm:!h-[14px]" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/65 mt-0.5 leading-tight font-bold uppercase tracking-wider">
                    Яндекс
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2-3. Мини-отзывы */}
          {miniReviews.map((r, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-[1.5px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(232,168,32,0.15) 50%, rgba(255,255,255,0.2) 100%)",
              }}
            >
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-black/95 to-zinc-900 p-2.5 sm:p-3.5 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
                <div className="relative flex items-center gap-2 sm:gap-2.5">
                  <div
                    className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(232,168,32,0.25)",
                    }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Icon
                          key={j}
                          name="Star"
                          size={9}
                          className="text-accent fill-accent sm:!w-[11px] sm:!h-[11px]"
                        />
                      ))}
                    </div>
                    <div className="hidden sm:block text-[11px] text-white/85 leading-snug truncate font-medium">
                      «{r.text}»
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/55 font-bold leading-tight truncate uppercase tracking-wider sm:normal-case sm:tracking-normal sm:font-normal">
                      {r.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 4. Договор + НДС — новая плитка чтобы убрать пустоту */}
          <div
            className="relative rounded-2xl p-[1.5px] overflow-hidden col-span-2 sm:col-span-1"
            style={{
              background:
                "linear-gradient(135deg, rgba(74,222,128,0.5) 0%, rgba(34,197,94,0.2) 50%, rgba(74,222,128,0.5) 100%)",
            }}
          >
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-2.5 sm:p-3.5 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-2 sm:gap-2.5">
                <div
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #4ade80 0%, #16a34a 50%, #15803d 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(34,197,94,0.3)",
                  }}
                >
                  <Icon name="FileCheck" size={16} className="text-white sm:!w-[20px] sm:!h-[20px]" strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-black text-white leading-tight">
                    Договор и НДС
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-emerald-400/90 mt-0.5 leading-tight font-bold">
                    Безнал · ЭДО · УПД
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Скачать сайт — работает офлайн (прячем, если уже установлено) */}
          {!installed && (
            <button
              type="button"
              onClick={openDownloadModal}
              aria-label="Скачать сайт — работает без интернета"
              className="group relative rounded-2xl p-[1.5px] overflow-hidden active:scale-[0.98] transition-transform col-span-2 sm:col-span-1"
              style={{
                background:
                  "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
              }}
            >
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-2.5 sm:p-3.5 overflow-hidden">
                {/* Бегущий блик */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent/25 blur-2xl pointer-events-none" />

                <div className="relative flex items-center gap-2 sm:gap-2.5">
                  <div
                    className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg relative"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(232,168,32,0.4)",
                    }}
                  >
                    <Icon
                      name="Download"
                      size={16}
                      className="text-black sm:!w-[20px] sm:!h-[20px] animate-bounce"
                      strokeWidth={2.5}
                      style={{ animationDuration: "2s" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-xs sm:text-sm font-black text-white leading-tight flex items-center gap-1">
                      Скачать сайт
                      <span
                        className="hidden sm:inline-flex px-1 py-0.5 rounded-full text-[8px] font-black text-black"
                        style={{
                          background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                        }}
                      >
                        PWA
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-accent/90 mt-0.5 leading-tight font-bold">
                      Работает офлайн
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
