import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { MAX_LINK } from "@/data/contacts";
import { reachGoal } from "@/lib/metrika";

const PHONE = "+7 960 188-30-84";
const PHONE_HREF = "tel:+79601883084";

const isAsphaltPath = (path: string) =>
  path.includes("asfalt") || path.includes("ukladka-asfalta") || path.includes("yamochnyy-remont");

const FloatingCallButton = () => {
  const [visible, setVisible] = useState(false);
  const [hideOnRoute, setHideOnRoute] = useState(() =>
    typeof window !== "undefined" ? isAsphaltPath(window.location.pathname) : false,
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Следим за сменой URL без useLocation — компонент рендерится вне Router
    const onRouteChange = () => setHideOnRoute(isAsphaltPath(window.location.pathname));
    window.addEventListener("popstate", onRouteChange);
    const interval = window.setInterval(onRouteChange, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onRouteChange);
      window.clearInterval(interval);
    };
  }, []);

  // На страницах асфальтирования у нас уже есть своя кнопка «Позвонить» — не дублируем.
  if (hideOnRoute) {
    return null;
  }

  return (
    <div
      className={`md:hidden fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={MAX_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => reachGoal("max_click", { source: "floating_fab" })}
        aria-label="Написать в MAX"
        className="w-12 h-12 rounded-full shadow-xl shadow-[#8B5CF6]/40 active:scale-90 flex items-center justify-center bg-[#8B5CF6]"
      >
        <Icon name="MessageSquare" size={20} className="text-white" strokeWidth={2.5} />
      </a>

      <a
        href={PHONE_HREF}
        onClick={() => reachGoal("phone_click", { source: "floating_fab" })}
        aria-label={`Позвонить ${PHONE}`}
        className="w-14 h-14 rounded-full shadow-xl shadow-accent/50 active:scale-90 flex items-center justify-center floating-mobile-fab"
        style={{
          background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
        }}
      >
        <Icon name="Phone" size={24} className="relative text-black" strokeWidth={2.5} />
      </a>
    </div>
  );
};

export default FloatingCallButton;