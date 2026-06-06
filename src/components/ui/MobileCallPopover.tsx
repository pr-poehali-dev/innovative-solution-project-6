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
        <div className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-accent/30 bg-background/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-muted-foreground mb-1">Звоните прямо сейчас</p>
          <a
            href="tel:+79601883084"
            onClick={() => reachGoal("phone_click")}
            className="block text-lg font-black text-white mb-3 tracking-tight"
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
