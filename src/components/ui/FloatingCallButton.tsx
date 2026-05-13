import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 960 188-30-84";
const PHONE_HREF = "tel:+79601883084";

const FloatingCallButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={PHONE_HREF}
      aria-label={`Позвонить ${PHONE}`}
      className={`md:hidden fixed bottom-5 right-4 z-40 w-14 h-14 rounded-full shadow-xl shadow-accent/50 active:scale-90 flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
      }}
    >
      <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
      <Icon name="Phone" size={24} className="relative text-black" strokeWidth={2.5} />
    </a>
  );
};

export default FloatingCallButton;