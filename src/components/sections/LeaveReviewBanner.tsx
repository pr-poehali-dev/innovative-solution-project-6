import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const YANDEX_REVIEW_URL = "https://yandex.ru/profile/-/CPGZ78ll?add-review=true";

const LeaveReviewBanner = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border-2 border-accent/40 shadow-2xl shadow-accent/20">
          {/* Градиентный фон */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,168,32,0.15) 0%, rgba(232,168,32,0.05) 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          {/* Декоративные пятна */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

          {/* Движущиеся звёзды фоном */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
            <div className="absolute top-6 left-10"><Icon name="Star" size={40} className="text-accent fill-accent" /></div>
            <div className="absolute top-20 left-1/3"><Icon name="Star" size={28} className="text-accent fill-accent" /></div>
            <div className="absolute bottom-10 left-1/4"><Icon name="Star" size={32} className="text-accent fill-accent" /></div>
            <div className="absolute top-10 right-1/3"><Icon name="Star" size={24} className="text-accent fill-accent" /></div>
            <div className="absolute bottom-16 right-12"><Icon name="Star" size={36} className="text-accent fill-accent" /></div>
          </div>

          <div className="relative p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Левая часть — текст */}
            <div>
              {/* Бейдж */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/50 mb-4 animate-pulse">
                <Icon name="Gift" size={14} className="text-accent" />
                <span className="text-accent font-bold text-xs uppercase tracking-wider">
                  Для наших клиентов
                </span>
              </div>

              {/* 5 звёзд */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="Star" size={22} className="text-accent fill-accent drop-shadow-[0_0_8px_rgba(232,168,32,0.6)]" />
                ))}
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-[1.05] mb-4">
                Оставьте отзыв —
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
                  получите скидку 5%
                </span>
                <br className="hidden sm:block" />
                на следующий заказ
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                Уже работали с нами? Расскажите о своём опыте на Яндекс.Картах — это займёт 1 минуту, а мы подарим персональную скидку на следующую аренду манипулятора.
              </p>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={YANDEX_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl shadow-lg shadow-accent/40 active:scale-[0.98] transition-transform"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  }}
                >
                  <Icon name="Star" size={20} className="text-black fill-black" />
                  <span className="text-black font-black text-base sm:text-lg">
                    Оставить отзыв на Яндексе
                  </span>
                  <Icon name="ArrowRight" size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  to="/otzyvy"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-accent/50 bg-black/30 hover:bg-accent/10 transition-colors text-white font-semibold text-sm sm:text-base"
                >
                  <Icon name="MessagesSquare" size={18} className="text-accent" />
                  Все отзывы клиентов
                </Link>
              </div>

              {/* Мелкие плюшки */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs sm:text-sm text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="Clock" size={14} className="text-accent" />
                  1 минута
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="ShieldCheck" size={14} className="text-accent" />
                  Проверенные отзывы
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="BadgePercent" size={14} className="text-accent" />
                  Реальная скидка
                </span>
              </div>
            </div>

            {/* Правая часть — большая рейтинг-карточка */}
            <div className="hidden lg:flex flex-col items-center justify-center p-8 rounded-3xl bg-black/40 border border-accent/30 backdrop-blur-sm min-w-[220px]">
              <div className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                Наш рейтинг
              </div>
              <div className="text-7xl font-display font-black text-white tabular-nums leading-none mb-2">
                5.0
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                ))}
              </div>
              <div className="text-muted-foreground text-xs text-center">
                на Яндекс.Картах
                <br />
                <span className="text-white/80 font-semibold">6+ отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveReviewBanner;
