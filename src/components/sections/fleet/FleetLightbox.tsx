import { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface FleetLightboxProps {
  data: { src: string; alt: string; title: string } | null;
  onClose: () => void;
}

const FleetLightbox = ({ data, onClose }: FleetLightboxProps) => {
  // Закрытие лайтбокса по Escape + блокировка скролла
  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [data, onClose]);

  if (!data) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Закрыть"
      >
        <Icon name="X" size={20} className="text-white" />
      </button>
      <div className="absolute top-4 left-4 right-20 text-white/90 text-sm sm:text-base font-semibold truncate">
        {data.title}
      </div>
      <img
        src={data.src}
        alt={data.alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs">
        Нажмите вне фото, чтобы закрыть
      </div>
    </div>,
    document.body,
  );
};

export default FleetLightbox;
