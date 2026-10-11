import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

export type HeroSlide = { image: string; alt: string; badge: string; title: string; text: string };

const BrickHeroSlider = ({ slides }: { slides: HeroSlide[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (d: number) => setActive((i) => (i + d + count) % count);

  return (
    <div
      className="relative mt-7 rounded-2xl overflow-hidden border border-accent/30 shadow-[0_12px_40px_rgba(0,0,0,0.45)] aspect-[5/4] sm:aspect-[16/8] bg-black/40 text-left"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        if (touchX.current !== null) {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }
        touchX.current = null;
        setPaused(false);
      }}
    >
      {slides.map((s, i) => (
        <figure
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${i === active ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-7 pb-9 sm:pb-11">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider">
              {s.badge}
            </span>
            <h3 className="mt-2 text-lg sm:text-3xl font-black text-white leading-tight drop-shadow">{s.title}</h3>
            <p className="mt-1 text-xs sm:text-base text-white/85 max-w-xl">{s.text}</p>
          </figcaption>
        </figure>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Предыдущее фото"
            className="hidden sm:inline-flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur text-white items-center justify-center transition"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Следующее фото"
            className="hidden sm:inline-flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur text-white items-center justify-center transition"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
          <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Фото ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-7 bg-accent" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BrickHeroSlider;
