import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const miniReviews = [
  { name: "Андрей С.", text: "Приехали через 40 минут, всё чётко", rating: 5 },
  { name: "Дмитрий К.", text: "Подобрали машину за 20 минут", rating: 5 },
];

const getOrdersToday = () => {
  const now = new Date();
  const hour = now.getHours();
  const base = 3 + Math.floor((hour / 24) * 9);
  const seed = now.getDate() + now.getMonth();
  return base + (seed % 3);
};

const TrustBarSection = () => {
  const [orders, setOrders] = useState(getOrdersToday());

  useEffect(() => {
    const id = setInterval(() => setOrders(getOrdersToday()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-3 sm:py-10 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-6">
          {/* Счётчик заказов сегодня */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-accent/30 bg-accent/5 text-center sm:text-left">
            <div className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
              <span className="relative block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" />
            </div>
            <div>
              <div className="text-base sm:text-2xl font-display font-black text-accent leading-none">{orders}</div>
              <div className="text-[9px] sm:text-xs text-white/70 mt-0.5 sm:mt-1 leading-tight">заказов<br className="sm:hidden" /> сегодня</div>
            </div>
          </div>

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

          {/* Мини-отзыв 1 */}
          {miniReviews.map((r, i) => (
            <div
              key={i}
              className={`${i === 1 ? "hidden lg:flex" : "flex"} flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-1 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-center sm:text-left`}
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

          {/* 4-й блок только на мобиле — гарантия */}
          <div className="flex lg:hidden flex-col items-center justify-center gap-1 p-2 rounded-lg border border-white/10 bg-white/5 text-center">
            <Icon name="ShieldCheck" size={18} className="text-accent" />
            <div className="text-[9px] sm:text-xs text-white/80 leading-tight font-semibold">10 лет<br />на рынке</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
