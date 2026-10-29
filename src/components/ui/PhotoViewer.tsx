import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface PhotoViewerProps {
  images: string[];
  startIndex?: number;
  title?: string;
  alt?: string;
  open: boolean;
  onClose: () => void;
}

const PhotoViewer = ({ images, startIndex = 0, title, alt = "", open, onClose }: PhotoViewerProps) => {
  const [index, setIndex] = useState(startIndex);
  const startX = useRef<number | null>(null);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(total - 1, i)));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, total]);

  if (!open || !total || typeof document === "undefined") return null;

  const setTrack = (extra: number, animate: boolean) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = animate ? "transform 0.3s ease-out" : "none";
    trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${extra}px))`;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    deltaX.current = 0;
    setTrack(0, false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    setTrack(deltaX.current, false);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dy = e.changedTouches[0].clientY - startY.current;
    const dx = deltaX.current;
    startX.current = null;
    if (Math.abs(dy) > 120 && Math.abs(dy) > Math.abs(dx)) {
      onClose();
      return;
    }
    let next = index;
    if (dx < -50 && index < total - 1) next = index + 1;
    else if (dx > 50 && index > 0) next = index - 1;
    if (next === index) setTrack(0, true);
    else setIndex(next);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm select-none" style={{ animation: "fadeIn 0.2s ease-out" }}>
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex-1 min-w-0 text-white/90 text-sm sm:text-base font-semibold truncate">{title}</div>
        {total > 1 && (
          <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">
            {index + 1} / {total}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center"
          aria-label="Закрыть"
        >
          <Icon name="X" size={22} className="text-white" />
        </button>
      </div>

      <div className="absolute inset-0 overflow-hidden" onClick={onClose}>
        <div
          ref={trackRef}
          className="flex w-full h-full"
          style={{ transform: `translateX(${-index * 100}%)`, transition: "transform 0.3s ease-out", touchAction: "none" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, i) => (
            <div key={src + i} className="flex-shrink-0 w-full h-full flex items-center justify-center px-0 py-14 sm:px-20 sm:py-16">
              {Math.abs(i - index) <= 1 && (
                <img
                  src={src}
                  alt={`${alt} — фото ${i + 1}`}
                  className="max-w-full max-h-full object-contain pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center disabled:opacity-30"
            aria-label="Предыдущее фото"
          >
            <Icon name="ChevronLeft" size={26} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center disabled:opacity-30"
            aria-label="Следующее фото"
          >
            <Icon name="ChevronRight" size={26} className="text-white" />
          </button>
          <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Фото ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>,
    document.body,
  );
};

export default PhotoViewer;