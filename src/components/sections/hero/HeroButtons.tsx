import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";

interface HeroButtonsProps {
  overlay?: boolean;
}

const HeroButtons = ({ overlay = false }: HeroButtonsProps) => {
  return (
    <div className={overlay ? "flex gap-4 flex-row justify-center" : "flex gap-3 sm:gap-4 mb-4 sm:mb-10 flex-col sm:flex-row"}>
      <a
        href="tel:+79601883084"
        onClick={() => reachGoal("phone_click", { place: overlay ? "hero_photo" : "hero_main" })}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-[0_10px_30px_rgba(245,214,128,0.4)] hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
          color: "#111",
        }}
      >
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon name="Phone" size={18} className="sm:!w-5 sm:!h-5 relative" />
        <span className="relative">Позвонить: +7 960 188-30-84</span>
      </a>
      <a
        href="#fleet"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("fleet");
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: "smooth" });
            history.replaceState(null, "", "#fleet");
          }
        }}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-sm sm:text-lg text-white text-center cursor-pointer bg-black/50 backdrop-blur-md"
      >
        Посмотреть технику
      </a>
    </div>

  );
};

export default HeroButtons;
