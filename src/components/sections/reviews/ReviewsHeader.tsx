import Icon from "@/components/ui/icon";
import { reviews, filters, getCategory, type FilterId } from "./data";

interface ReviewsHeaderProps {
  filter: FilterId;
  setFilter: (id: FilterId) => void;
  setActive: (i: number) => void;
  active: number;
  pages: number;
  prev: () => void;
  next: () => void;
}

const ReviewsHeader = ({
  filter,
  setFilter,
  setActive,
  active,
  pages,
  prev,
  next,
}: ReviewsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10 gap-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">★</span>
            ))}
          </div>
          <span className="text-white font-bold text-lg">5.0</span>
          <span className="text-muted-foreground text-sm">на основе {reviews.length} отзывов</span>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-xl">
          Более 5 000 выполненных заказов — работаем с частными лицами, ИП и крупными предприятиями
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {filters.map((f) => {
            const isActive = filter === f.id;
            const count =
              f.id === "all"
                ? reviews.length
                : reviews.filter((r) => getCategory(r) === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setActive(0);
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-white/5 text-white/80 border border-accent/20 hover:bg-white/10 hover:border-accent/40"
                }`}
              >
                <Icon name={f.icon} size={14} />
                <span>{f.label}</span>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/25" : "bg-accent/20 text-accent"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Счётчик + кнопки */}
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground text-xs sm:text-sm tabular-nums">
          <span className="text-white font-bold">{active + 1}</span> / {pages}
        </span>
        <button
          onClick={prev}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
        >
          <Icon name="ChevronLeft" size={16} className="sm:!w-[18px] sm:!h-[18px]" />
        </button>
        <button
          onClick={next}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
        >
          <Icon name="ChevronRight" size={16} className="sm:!w-[18px] sm:!h-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default ReviewsHeader;