import Icon from "@/components/ui/icon";
import HeroLeadForm from "./HeroLeadForm";
import { reachGoal } from "@/lib/metrika";

interface HeroContentProps {
  visibleSections: Record<string, boolean>;
}

const HeroContent = ({ visibleSections }: HeroContentProps) => {
  return (
    <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-5 sm:pt-7 lg:pt-40 pb-10 sm:pb-16 lg:pb-32">
      <div className={`max-w-2xl transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-2 sm:mb-5 tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
          <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">Аренда манипулятора </span>
          <span className="text-accent">в Нижнем Новгороде</span>
        </h1>
        <p className="text-sm sm:text-lg text-white/85 leading-snug sm:leading-relaxed mb-3 sm:mb-7 max-w-full sm:max-w-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Оставьте заявку или позвоните — подберём манипулятор с платформой нужных габаритов и грузоподъёмностью под вашу задачу по Нижнему Новгороду и области.
        </p>

        {/* Ключевое преимущество — подача и режим работы */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-black font-black text-sm sm:text-base shadow-[0_6px_20px_rgba(16,185,129,0.5)]">
            <Icon name="Timer" size={18} strokeWidth={2.6} />
            Подача за 60 минут
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 border-emerald-400/70 bg-emerald-500/10 backdrop-blur-sm text-emerald-300 font-black text-sm sm:text-base animate-blink-badge motion-reduce:animate-none">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-300" />
            </span>
            Работаем 24/7
          </span>
        </div>

        {/* Ключевые условия */}
        <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-3 sm:mb-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="Clock" size={14} className="text-accent" />
            <span>Подача от <span className="font-semibold">1 часа</span></span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="Calendar" size={14} className="text-accent" />
            <span>Мин. заказ — <span className="font-semibold">4 часа</span></span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="UserCheck" size={14} className="text-accent" />
            <span>Оператор включён</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="FileCheck" size={14} className="text-accent" />
            <span>Работаем с НДС</span>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-10 flex-col sm:flex-row">
          <a
            href="tel:+79601883084"
            onClick={() => reachGoal("phone_click", { place: "hero_main" })}
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
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-sm sm:text-lg text-white text-center cursor-pointer"
          >
            Посмотреть технику
          </a>
        </div>

        {/* Форма заявки — компактная и заметная */}
        <HeroLeadForm />

      </div>
    </div>
  );
};

export default HeroContent;