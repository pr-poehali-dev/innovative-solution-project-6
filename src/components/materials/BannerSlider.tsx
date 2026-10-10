import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface BannerSliderProps {
  images: string[];
  alt: string;
}

const BannerSlider = ({ images, alt }: BannerSliderProps) => {
  const [current, setCurrent] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    if (count < 2) return;
    const t = setTimeout(() => setCurrent((p) => (p + 1) % count), 5000);
    return () => clearTimeout(t);
  }, [current, count]);

  const go = (dir: number) => setCurrent((p) => (p + dir + count) % count);

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7] max-h-[720px] overflow-hidden bg-card"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} — фото ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-black/60 transition"
            aria-label="Предыдущее фото"
          >
            <Icon name="ChevronLeft" size={22} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-black/60 transition"
            aria-label="Следующее фото"
          >
            <Icon name="ChevronRight" size={22} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Фото ${i + 1}`}
                className="p-1.5"
              >
                <span className={`block h-2 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-2 bg-white/70"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
