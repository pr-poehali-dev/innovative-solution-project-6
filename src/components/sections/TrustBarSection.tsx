import Icon from "@/components/ui/icon";

const miniReviews = [
  { name: "Андрей С.", text: "Приехали через 40 минут, всё чётко", rating: 5 },
  { name: "Дмитрий К.", text: "Подобрали машину за 20 минут", rating: 5 },
];

const TrustBarSection = () => {
  return (
    <section className="relative py-3 sm:py-10 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-6">
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
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
