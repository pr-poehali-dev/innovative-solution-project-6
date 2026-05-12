import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const miniReviews = [
  { name: "Андрей С.", text: "Приехали через 40 минут, всё чётко", rating: 5 },
  { name: "Дмитрий К.", text: "Подобрали машину за 20 минут", rating: 5 },
  { name: "Сергей М.", text: "Справились в неудобном месте", rating: 5 },
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
    <section className="relative py-6 sm:py-10 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Счётчик заказов сегодня */}
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-accent/30 bg-accent/5">
            <div className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
              <span className="relative block w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-black text-accent leading-none">{orders}</div>
              <div className="text-[10px] sm:text-xs text-white/70 mt-1">заказов сегодня</div>
            </div>
          </div>

          {/* Рейтинг Яндекс */}
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
              <span className="text-red-400 font-black text-lg">Я</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-lg font-bold text-white">4.9</span>
                <Icon name="Star" size={14} className="text-accent fill-accent" />
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">на Яндекс.Картах</div>
            </div>
          </div>

          {/* Мини-отзывы (на десктопе видны 2) */}
          {miniReviews.slice(0, 2).map((r, i) => (
            <div
              key={i}
              className={`${i === 1 ? "hidden lg:flex" : "hidden sm:flex lg:flex"} items-center gap-3 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-sm">
                {r.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon key={j} name="Star" size={10} className="text-accent fill-accent" />
                  ))}
                </div>
                <div className="text-[11px] sm:text-xs text-white/85 leading-snug truncate">«{r.text}»</div>
                <div className="text-[10px] text-white/50 mt-0.5">{r.name}</div>
              </div>
            </div>
          ))}

          {/* На мобиле один отзыв вместо двух */}
          <div className="flex sm:hidden items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-sm">
              А
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="Star" size={10} className="text-accent fill-accent" />
                ))}
              </div>
              <div className="text-[11px] text-white/85 leading-snug truncate">«Приехали за 40 минут»</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
