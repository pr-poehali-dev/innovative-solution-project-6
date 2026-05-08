import Icon from "@/components/ui/icon";
import HeroLeadForm from "./HeroLeadForm";

interface HeroContentProps {
  visibleSections: Record<string, boolean>;
}

const HeroContent = ({ visibleSections }: HeroContentProps) => {
  return (
    <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-28 lg:pt-40 pb-16 sm:pb-32">
      <div className={`max-w-2xl transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="hidden sm:inline-flex mb-3 sm:mb-8 items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-accent/40 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(245,214,128,0.8)]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: "#f5d680", letterSpacing: "0.18em" }}>
            Аренда манипуляторов в Нижнем Новгороде
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-2 sm:mb-8 tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
          <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">Манипуляторы </span>
          <span className="text-accent">в аренду </span>
          <span className="text-white/90">в Нижнем Новгороде</span>
        </h1>
        <p className="text-sm sm:text-xl text-white leading-snug sm:leading-relaxed mb-3 sm:mb-7 max-w-full sm:max-w-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Оставьте заявку или позвоните — мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью под вашу задачу.
        </p>

        {/* Ключевые условия: цена · мин. заказ · оператор */}
        <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-3 sm:mb-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-accent/40 bg-accent/10 text-white text-xs sm:text-sm">
            <Icon name="Wallet" size={14} className="text-accent" />
            <span className="font-semibold">от 1500 ₽/час</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="Clock" size={14} className="text-accent" />
            <span>Мин. заказ — <span className="font-semibold">4 часа</span></span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs sm:text-sm">
            <Icon name="UserCheck" size={14} className="text-accent" />
            <span>Оператор включён</span>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-12 flex-col sm:flex-row">
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
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-sm sm:text-lg text-white text-center cursor-pointer"
          >
            Посмотреть технику
          </a>
        </div>

        {/* Форма заявки — компактная и заметная */}
        <HeroLeadForm />

        <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10 mt-8">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">15+</div>
            <p className="text-xs sm:text-sm text-white/60">Единиц техники</p>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">5 000+</div>
            <p className="text-xs sm:text-sm text-white/60">Выполненных заказов</p>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">10 лет</div>
            <p className="text-xs sm:text-sm text-white/60">На рынке</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;