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
    <section className="relative py-3 sm:py-10 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div
          className={`grid gap-1.5 sm:gap-6 ${
            installed
              ? "grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
          }`}
        >
          {/* Рейтинг Яндекс */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-center sm:text-left">
            <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-red-500/15 flex items-center justify-center">
              <span className="text-red-400 font-black text-sm sm:text-lg">Я</span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                <span className="text-sm sm:text-lg font-bold text-white leading-none">4.9</span>
                <Icon name="Star" size={10} className="text-accent fill-accent sm:!w-[14px] sm:!h-[14px]" />
              </div>
              <div className="text-[9px] sm:text-xs text-white/70 mt-0.5 leading-tight">Яндекс.<br className="sm:hidden" />Карты</div>
            </div>
          </div>

          {/* Мини-отзывы */}
          {miniReviews.map((r, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-center sm:text-left"
            >
              <div className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-xs sm:text-sm">
                {r.name.charAt(0)}
              </div>
              <div className="min-w-0 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon key={j} name="Star" size={8} className="text-accent fill-accent sm:!w-[10px] sm:!h-[10px]" />
                  ))}
                </div>
                <div className="hidden sm:block text-[11px] sm:text-xs text-white/85 leading-snug truncate">«{r.text}»</div>
                <div className="text-[9px] sm:text-[10px] text-white/60 sm:text-white/50 mt-0.5 leading-tight">{r.name}</div>
              </div>
            </div>
          ))}

          {/* Скачать сайт — работает офлайн (прячем, если уже установлено) */}
          {!installed && (
          <button
            type="button"
            onClick={openDownloadModal}
            aria-label="Скачать сайт — работает без интернета"
            className="group relative flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-center sm:text-left active:scale-[0.98] overflow-hidden col-span-2 sm:col-span-1"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none" />
            <div
              className="relative flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <Icon name="Download" size={14} className="text-black sm:!w-[18px] sm:!h-[18px]" strokeWidth={2.5} />
            </div>
            <div className="relative min-w-0">
              <div className="text-[11px] sm:text-sm font-black text-white leading-tight">
                Скачать сайт
              </div>
              <div className="text-[9px] sm:text-[11px] text-accent/90 mt-0.5 leading-tight font-bold">
                Работает без интернета
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