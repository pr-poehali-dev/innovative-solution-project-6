import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

export interface ViewerPhoto {
  src: string;
  alt: string;
  price?: string;
}

interface BrickPhotoViewerProps {
  photos: ViewerPhoto[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

const TAP_SCALE = 2.5;
const MIN_SCALE = 1;
const MAX_SCALE = 5;

type Pt = { x: number; y: number };

const BrickPhotoViewer = ({ photos, index, onIndexChange, onClose }: BrickPhotoViewerProps) => {
  const { src, alt, price } = photos[index];
  const total = photos.length;
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState<Pt>({ x: 0, y: 0 });
  const [swipeX, setSwipeX] = useState(0);
  const [animate, setAnimate] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, Pt>());
  const gesture = useRef<{
    mode: "pan" | "pinch";
    start: Pt;
    pos0: Pt;
    scale0: number;
    dist0: number;
    moved: boolean;
    pinched: boolean;
  } | null>(null);
  const stateRef = useRef({ scale, pos });
  stateRef.current = { scale, pos };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goRef.current(1);
      if (e.key === "ArrowLeft") goRef.current(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const go = (dir: number) => {
    if (total < 2) return;
    setAnimate(false);
    setScale(1);
    setPos({ x: 0, y: 0 });
    setSwipeX(0);
    onIndexChange((index + dir + total) % total);
  };
  const goRef = useRef(go);
  goRef.current = go;

  const clampPos = (p: Pt, s: number): Pt => {
    const img = imgRef.current;
    if (!img) return p;
    const mx = (img.offsetWidth * (s - 1)) / 2;
    const my = (img.offsetHeight * (s - 1)) / 2;
    return { x: Math.max(-mx, Math.min(mx, p.x)), y: Math.max(-my, Math.min(my, p.y)) };
  };

  const imageCenter = (): Pt => {
    const img = imgRef.current;
    if (!img) return { x: 0, y: 0 };
    const r = img.getBoundingClientRect();
    const { pos: p } = stateRef.current;
    return { x: r.left + r.width / 2 - p.x, y: r.top + r.height / 2 - p.y };
  };

  const zoomTo = (newScale: number, focus: Pt, anchor: Pt = focus, from = stateRef.current) => {
    const s = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    const c = imageCenter();
    const px = (focus.x - c.x - from.pos.x) / from.scale;
    const py = (focus.y - c.y - from.pos.y) / from.scale;
    const next = clampPos({ x: anchor.x - c.x - s * px, y: anchor.y - c.y - s * py }, s);
    setScale(s);
    setPos(s === 1 ? { x: 0, y: 0 } : next);
  };

  const twoPoints = () => {
    const [a, b] = Array.from(pointers.current.values());
    return { mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, dist: Math.hypot(a.x - b.x, a.y - b.y) };
  };

  const startGesture = () => {
    const pts = Array.from(pointers.current.values());
    const prevPinched = gesture.current?.pinched ?? false;
    if (pts.length >= 2) {
      const { mid, dist } = twoPoints();
      gesture.current = { mode: "pinch", start: mid, pos0: pos, scale0: scale, dist0: dist || 1, moved: true, pinched: true };
    } else if (pts.length === 1) {
      gesture.current = { mode: "pan", start: pts[0], pos0: pos, scale0: scale, dist0: 1, moved: prevPinched, pinched: prevPinched };
    } else {
      gesture.current = null;
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setAnimate(false);
    startGesture();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.mode === "pinch" && pointers.current.size >= 2) {
      const { mid, dist } = twoPoints();
      zoomTo(g.scale0 * (dist / g.dist0), g.start, mid, { scale: g.scale0, pos: g.pos0 });
      return;
    }

    const dx = e.clientX - g.start.x;
    const dy = e.clientY - g.start.y;
    if (!g.moved && Math.hypot(dx, dy) < 6) return;
    g.moved = true;
    if (scale > 1) setPos(clampPos({ x: g.pos0.x + dx, y: g.pos0.y + dy }, scale));
    else if (total > 1) setSwipeX(dx);
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    if (pointers.current.size > 0) {
      startGesture();
      return;
    }

    gesture.current = null;
    setAnimate(true);

    if (scale <= 1 && g?.mode === "pan" && !g.pinched && total > 1) {
      const dx = e.clientX - g.start.x;
      setSwipeX(0);
      if (Math.abs(dx) > 60) {
        go(dx < 0 ? 1 : -1);
        return;
      }
    }

    if (scale < 1.05) {
      setScale(1);
      setPos({ x: 0, y: 0 });
    }

    if (!g || g.moved || g.pinched || e.type === "pointercancel") return;

    if (scale > 1) {
      setScale(1);
      setPos({ x: 0, y: 0 });
    } else {
      const c = imageCenter();
      const s = TAP_SCALE;
      setScale(s);
      setPos(clampPos({ x: -(e.clientX - c.x) * s, y: -(e.clientY - c.y) * s }, s));
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setAnimate(false);
    const pt = { x: e.clientX, y: e.clientY };
    zoomTo(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), pt);
  };

  const zoomed = scale > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight line-clamp-2">{alt}</p>
          <p className="text-xs text-white/60 mt-0.5">
            {price && <span className="text-accent font-bold mr-2">{price}</span>}
            {total > 1 && `${index + 1} из ${total}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          aria-label="Закрыть"
        >
          <Icon name="X" size={22} />
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden px-2">
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center"
              aria-label="Предыдущий кирпич"
            >
              <Icon name="ChevronLeft" size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center"
              aria-label="Следующий кирпич"
            >
              <Icon name="ChevronRight" size={28} />
            </button>
          </>
        )}
        <div
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onWheel={onWheel}
          style={{ touchAction: "none", transform: `translateX(${swipeX}px)`, opacity: 1 - Math.min(Math.abs(swipeX) / 400, 0.5) }}
          className="max-w-full max-h-full flex items-center justify-center"
        >
          <img
            key={src}
            ref={imgRef}
            src={src}
            alt={alt}
            draggable={false}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
            className={`max-w-full max-h-[calc(100dvh-140px)] object-contain bg-white rounded-xl select-none ${
              animate ? "transition-transform duration-300 ease-out" : ""
            } ${zoomed ? "cursor-grab" : "cursor-zoom-in"}`}
          />
        </div>
      </div>
      <p className="relative z-10 text-center text-xs text-white/60 py-3">
        {zoomed
          ? "Двигайте фото пальцем · нажмите, чтобы уменьшить"
          : total > 1
            ? "Листайте влево-вправо · разведите пальцы, чтобы приблизить"
            : "Разведите пальцы или нажмите на фото, чтобы приблизить"}
      </p>
    </div>,
    document.body
  );
};

export default BrickPhotoViewer;
