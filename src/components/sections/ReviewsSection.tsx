import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { reviews, getCategory, palettes, type FilterId } from "./reviews/data";
import ReviewsHeader from "./reviews/ReviewsHeader";
import ReviewCard from "./reviews/ReviewCard";
import ReviewsPagination from "./reviews/ReviewsPagination";

const ReviewsSection = () => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<FilterId>("all");
  const [swipeDelta, setSwipeDelta] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => getCategory(r) === filter);

  const step = 3;
  const pages = Math.max(1, Math.ceil(filtered.length / step));
  const prev = () => setActive((p) => (p - 1 + pages) % pages);
  const next = () => setActive((p) => (p + 1) % pages);

  const visible = filtered.slice(active * step, active * step + step);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isSwiping.current = false;
    setSwipeDelta(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (!isSwiping.current) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        isSwiping.current = true;
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        startX.current = null;
        return;
      }
    }
    if (isSwiping.current) {
      setSwipeDelta(dx);
    }
  };

  const onTouchEnd = () => {
    if (isSwiping.current) {
      const threshold = 60;
      if (swipeDelta < -threshold) next();
      else if (swipeDelta > threshold) prev();
    }
    setSwipeDelta(0);
    startX.current = null;
    startY.current = null;
    isSwiping.current = false;
  };

  return (
    <section className="pt-4 sm:pt-6 pb-16 sm:pb-32 px-4 sm:px-6 bg-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Шапка */}
        <ReviewsHeader
          filter={filter}
          setFilter={setFilter}
          setActive={setActive}
          active={active}
          pages={pages}
          prev={prev}
          next={next}
        />

        {/* Подсказка про свайп — только мобильные */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-3 text-muted-foreground text-xs">
          <Icon name="ChevronLeft" size={12} />
          <span>Листайте отзывы пальцем</span>
          <Icon name="ChevronRight" size={12} />
        </div>

        {/* Карточки */}
        <div
          className="grid md:grid-cols-3 gap-4 sm:gap-6 transition-transform md:transition-none"
          style={{
            transform: swipeDelta !== 0 ? `translateX(${swipeDelta * 0.4}px)` : undefined,
            touchAction: "pan-y",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {visible.map((review, i) => (
            <ReviewCard
              key={`${active}-${i}`}
              review={review}
              palette={palettes[i % 3]}
            />
          ))}
        </div>

        {/* Точки навигации */}
        <ReviewsPagination pages={pages} active={active} setActive={setActive} />

      </div>
    </section>
  );
};

export default ReviewsSection;