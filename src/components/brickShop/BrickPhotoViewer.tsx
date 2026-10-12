import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface BrickPhotoViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const SCALE = 2.5;

const BrickPhotoViewer = ({ src, alt, onClose }: BrickPhotoViewerProps) => {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ sx: number; sy: number; px: number; py: number; moved: boolean } | null>(null);

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

  const clamp = (x: number, y: number) => {
    const img = imgRef.current;
    if (!img) return { x, y };
    const mx = (img.offsetWidth * (SCALE - 1)) / 2;
    const my = (img.offsetHeight * (SCALE - 1)) / 2;
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  };

  const zoomAt = (clientX: number, clientY: number) => {
    const img = imgRef.current;
    if (!img) return;
    const r = img.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    setPos(clamp(-dx * SCALE, -dy * SCALE));
    setZoomed(true);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    const d = drag.current;
    if (!d || !zoomed) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 6) return;
    d.moved = true;
    setDragging(true);
    setPos(clamp(d.px + dx, d.py + dy));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (d?.moved) return;
    if (zoomed) {
      setZoomed(false);
      setPos({ x: 0, y: 0 });
    } else {
      zoomAt(e.clientX, e.clientY);
    }
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
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
          }}
          style={{
            transform: zoomed ? `translate(${pos.x}px, ${pos.y}px) scale(${SCALE})` : "none",
            touchAction: zoomed ? "none" : "manipulation",
          }}
          className={`max-w-full max-h-full object-contain bg-white rounded-xl select-none ${
            dragging ? "" : "transition-transform duration-300 ease-out"
          } ${zoomed ? "cursor-grab" : "cursor-zoom-in"}`}
        />
      </div>
      <p className="text-center text-xs text-white/60 py-3">
        {zoomed ? "Двигайте фото пальцем · нажмите, чтобы уменьшить" : "Нажмите на фото, чтобы приблизить"}
      </p>
    </div>,
    document.body
  );
};

export default BrickPhotoViewer;
