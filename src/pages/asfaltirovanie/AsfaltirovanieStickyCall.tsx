import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";
import { PHONE, PHONE_TEL } from "./asfaltirovanieData";

const AsfaltirovanieStickyCall = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
    >
      <div className="mx-2 mb-2 rounded-2xl border border-amber-300 bg-white/95 backdrop-blur-md shadow-2xl shadow-amber-500/30 px-3 py-2.5 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider font-bold text-amber-700">
            Замер бесплатно
          </div>
          <div className="text-xs text-slate-600 truncate">
            Ответим за 5 минут, без выходных
          </div>
        </div>
        <a
          href={PHONE_TEL}
          onClick={() => reachGoal("phone_click", { source: "asphalt_sticky_bottom" })}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white font-black text-xs shadow-lg shadow-amber-500/40 active:scale-95 transition-transform whitespace-nowrap"
        >
          <Icon name="Phone" size={14} className="animate-pulse" />
          {PHONE}
        </a>
      </div>
    </div>
  );
};

export default AsfaltirovanieStickyCall;
