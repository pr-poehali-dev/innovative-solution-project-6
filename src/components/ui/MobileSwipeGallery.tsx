import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface MobileSwipeGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  imgClassName?: string;
  onOpen?: (index: number) => void;
}

const MobileSwipeGallery = ({
  images,
  alt,
  className = "",
  imgClassName = "",
  onOpen,
}: MobileSwipeGalleryProps) => {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${deltaX.current}px))`;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    if (onOpen && Math.abs(deltaX.current) < 10) {
      e.preventDefault();
      startX.current = null;
      deltaX.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transition = "transform 0.3s ease-out";
        trackRef.current.style.transform = `translateX(${-index * 100}%)`;
      }
      onOpen(index);
      return;
    }
    const threshold = 50;
    let newIndex = index;
    if (deltaX.current < -threshold && index < total - 1) newIndex = index + 1;
    else if (deltaX.current > threshold && index > 0) newIndex = index - 1;
    setIndex(newIndex);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.3s ease-out";
      trackRef.current.style.transform = `translateX(${-newIndex * 100}%)`;
    }
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <div className={`relative overflow-hidden bg-white/5 ${onOpen ? "cursor-zoom-in" : ""} ${className}`}>
      <div
        ref={trackRef}
        className="flex w-full h-full"
        style={{
          transform: `translateX(${-index * 100}%)`,
          transition: "transform 0.3s ease-out",
          touchAction: "pan-y",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onOpen ? () => onOpen(index) : undefined}
      >
        {images.map((src, i) => {
          // Рендерим картинки только в окне ±1 от текущего слайда —
          // экономит память и трафик на мобиле, когда карточек 10+
          const shouldRender = Math.abs(i - index) <= 1;
          return (
            <div key={i} className="flex-shrink-0 w-full h-full flex items-center justify-center">
              {shouldRender ? (
                <img
                  src={src}
                  alt={`${alt} — фото ${i + 1}`}
                  className={`w-full select-none pointer-events-none ${imgClassName}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  width="800"
                  height="600"
                />
              ) : (
                <div className={`w-full ${imgClassName}`} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>

      {onOpen && (
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center"
          aria-label="Открыть фото на весь экран"
        >
          <Icon name="Expand" fallback="ZoomIn" size={18} className="text-white" />
        </button>
      )}

      {total > 1 && (
        <>
          {/* Точки-индикаторы */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Перейти к фото ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Счётчик */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold z-10">
            {index + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSwipeGallery;