import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";

const PHONE = "+7 960 188-30-84";
const PHONE_HREF = "tel:+79601883084";

const FloatingCallButton = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На страницах асфальтирования у нас уже есть собственная крупная кнопка «Позвонить»
  // в шапке — плавающую кнопку прячем, чтобы не дублировать.
  if (pathname.includes("asfalt") || pathname.includes("ukladka-asfalta") || pathname.includes("yamochnyy-remont")) {
    return null;
  }

  return (
    <a
      href={PHONE_HREF}
      onClick={() => reachGoal("phone_click", { source: "floating_fab" })}
      aria-label={`Позвонить ${PHONE}`}
      className={`md:hidden fixed bottom-5 right-4 z-40 w-14 h-14 rounded-full shadow-xl shadow-accent/50 active:scale-90 flex items-center justify-center transition-all duration-300 floating-mobile-fab ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
        animation: "goldPulse 1.4s ease-in-out infinite",
      }}
    >
      <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
      <span className="absolute -inset-1 rounded-full bg-accent/30 animate-ping" style={{ animationDelay: "0.4s" }} />
      <Icon name="Phone" size={24} className="relative text-black" strokeWidth={2.5} />
    </a>
  );
};

export default FloatingCallButton;