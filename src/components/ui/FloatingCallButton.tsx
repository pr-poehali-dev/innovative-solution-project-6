import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 960 188-30-84";
const PHONE_HREF = "tel:+79601883084";

const FloatingCallButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={PHONE_HREF}
      aria-label={`Позвонить ${PHONE}`}
      className={`md:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 pl-3 pr-4 py-3 rounded-full shadow-2xl shadow-accent/40 active:scale-95 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
      }}
    >
      <span className="relative flex w-9 h-9 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
        <span className="relative w-9 h-9 rounded-full bg-black/15 flex items-center justify-center">
          <Icon name="Phone" size={18} className="text-black" />
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] font-bold uppercase tracking-wider text-black/70">
          Позвонить
        </span>
        <span className="text-black font-black text-sm tabular-nums">{PHONE}</span>
      </span>
    </a>
  );
};

export default FloatingCallButton;
