import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";

interface MobileCallPopoverProps {
  className?: string;
}

const MobileCallPopover = ({ className = "" }: MobileCallPopoverProps) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5 active:scale-95 transition-transform"
        aria-label="Показать номер телефона"
        aria-expanded={open}
      >
        <Icon name="Phone" size={18} className="text-accent" />
      </button>

      {open && (
        <div className="popover-glow absolute right-0 top-12 z-50 w-60 rounded-2xl border border-accent/50 bg-background/95 backdrop-blur-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-muted-foreground mb-1">Звоните прямо сейчас</p>
          <a
            href="tel:+79601883084"
            onClick={() => reachGoal("phone_click")}
            className="block text-xl font-black mb-3 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(232,168,32,0.5))",
              fontFamily: "'Cinzel', serif",
            }}
          >
            +7 960 188-30-84
          </a>
          <a
            href="tel:+79601883084"
            onClick={() => reachGoal("phone_click")}
            className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-black font-bold px-4 py-3 rounded-xl active:scale-95 transition-transform"
          >
            <Icon name="Phone" size={18} />
            Позвонить
          </a>
        </div>
      )}
    </div>
  );
};

export default MobileCallPopover;