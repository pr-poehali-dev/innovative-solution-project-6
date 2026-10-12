import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface BrickPhotoViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const BrickPhotoViewer = ({ src, alt, onClose }: BrickPhotoViewerProps) => {
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const toggleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (zoom) return setZoom(null);
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-bold leading-tight line-clamp-2">{alt}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          aria-label="Закрыть"
        >
          <Icon name="X" size={22} />
        </button>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden px-2">
        <img
          src={src}
          alt={alt}
          onClick={toggleZoom}
          style={zoom ? { transform: "scale(2.5)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          className={`max-w-full max-h-full object-contain bg-white rounded-xl transition-transform duration-300 ease-out ${
            zoom ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        />
      </div>
      <p className="text-center text-xs text-white/60 py-3">
        {zoom ? "Нажмите ещё раз, чтобы уменьшить" : "Нажмите на фото, чтобы приблизить"}
      </p>
    </div>,
    document.body
  );
};

export default BrickPhotoViewer;
