import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { getCategory, type Review, type Palette } from "./data";

interface ReviewCardProps {
  review: Review;
  palette: Palette;
}

const ReviewCard = ({ review, palette }: ReviewCardProps) => {
  return (
    <article
      className={`relative overflow-hidden flex flex-col justify-between p-5 sm:p-7 rounded-2xl border ${palette.cardBorder} bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:scale-[1.01]`}
    >
      {/* Декоративный градиент в углу */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: palette.glow }}
      />

      {/* Огромная фоновая кавычка */}
      <div
        className="absolute -bottom-8 right-2 text-[180px] font-serif leading-none text-white/[0.04] pointer-events-none select-none"
      >
        "
      </div>

      <div className="relative">
        {/* Шапка: иконка + бейдж highlight */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div
            className={`w-12 h-12 rounded-xl ${palette.accentBg} border ${palette.accentBorder} flex items-center justify-center flex-shrink-0`}
          >
            <Icon name="Quote" size={20} className={palette.accentText} />
          </div>
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${palette.accentBg} border ${palette.accentBorder} ${palette.accentText} text-[10px] font-black tracking-widest text-right`}
          >
            <Icon name="CircleCheck" size={11} />
            <span className="line-clamp-1">{review.highlight}</span>
          </div>
        </div>

        {/* Звёзды */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: review.rating }).map((_, j) => (
            <span
              key={j}
              className="text-yellow-400 text-base drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]"
            >
              ★
            </span>
          ))}
        </div>

        {/* Текст отзыва */}
        <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
          {review.text}
        </p>

        {/* Разделитель */}
        <div
          className={`h-px mb-4 bg-gradient-to-r ${palette.accent} opacity-30`}
        />

        {/* Автор */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-12 h-12 rounded-full border-2 ${palette.accentBorder} overflow-hidden flex-shrink-0 ${palette.accentBg}`}
          >
            {review.photo ? (
              <img
                src={review.photo}
                alt={review.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="48"
                height="48"
              />
            ) : (
              <span
                className={`w-full h-full flex items-center justify-center ${palette.accentText} text-xs font-bold`}
              >
                {review.avatar}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm leading-tight">{review.name}</p>
            <p className="text-muted-foreground text-xs mt-0.5 truncate">
              {review.company}
            </p>
          </div>
        </div>

        {/* Услуга + категория */}
        <div className="flex flex-wrap items-center gap-2">
          {(() => {
            const cat = getCategory(review);
            const isAsphalt = cat === "asphalt";
            const badgeClass = `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
              isAsphalt
                ? "bg-amber-500/15 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 hover:border-amber-300 hover:scale-105 cursor-pointer"
                : "bg-cyan-500/15 border border-cyan-400/50 text-cyan-300"
            }`;
            const inner = (
              <>
                <Icon
                  name={isAsphalt ? "Sparkles" : "Truck"}
                  size={11}
                />
                {isAsphalt ? "Асфальтирование" : "Манипулятор"}
                {isAsphalt && <Icon name="ArrowRight" size={10} />}
              </>
            );
            return isAsphalt ? (
              <Link
                to="/asfaltirovanie"
                className={badgeClass}
                aria-label="Перейти к услуге асфальтирования"
              >
                {inner}
              </Link>
            ) : (
              <span className={badgeClass}>{inner}</span>
            );
          })()}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${palette.accentBg} border ${palette.accentBorder}`}
          >
            <Icon name="Wrench" size={12} className={palette.accentText} />
            <span className={`${palette.accentText} text-xs font-semibold`}>
              {review.service}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
