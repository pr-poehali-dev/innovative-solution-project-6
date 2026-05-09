import { useRef, useState } from "react";

interface MobileSwipeGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  imgClassName?: string;
}

const MobileSwipeGallery = ({
  images,
  alt,
  className = "",
  imgClassName = "",
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

  const onTouchEnd = () => {
    if (startX.current === null) return;
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
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
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
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full flex items-center justify-center">
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
          </div>
        ))}
      </div>

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
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold z-10">
            {index + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSwipeGallery;
