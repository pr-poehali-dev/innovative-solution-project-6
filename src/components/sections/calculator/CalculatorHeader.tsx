import SectionBadge from "@/components/ui/SectionBadge";
import Icon from "@/components/ui/icon";

type Props = {
  minPrice: number;
  maxPrice: number;
  stepsDone: number;
};

const CalculatorHeader = ({ minPrice, maxPrice, stepsDone }: Props) => {
  return (
    <>
      <div className="text-center mb-10 sm:mb-12">
        <div className="flex justify-center mb-4">
          <SectionBadge>Калькулятор</SectionBadge>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4">
          <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">
            Рассчитайте стоимость
          </span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Подберём технику под вашу задачу за 30 секунд — без звонков и переписок
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Icon name="Truck" size={14} className="text-accent" />
            <span className="text-xs sm:text-sm">15+ единиц техники</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Icon name="Wallet" size={14} className="text-accent" />
            <span className="text-xs sm:text-sm">
              от {minPrice.toLocaleString("ru")} до {maxPrice.toLocaleString("ru")} ₽/час
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Icon name="Zap" size={14} className="text-emerald-400" />
            <span className="text-xs sm:text-sm text-emerald-300">Подача от 1 часа</span>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-1 sm:gap-3 mb-6">
        {["Задача", "Техника", "Часы и опции"].map((step, i) => (
          <div key={step} className="flex items-center gap-1 sm:gap-3">
            <div className={`flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
              i < stepsDone ? "bg-accent text-black" : "bg-background/40 border border-accent/20 text-muted-foreground"
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                i < stepsDone ? "bg-black/20" : "bg-accent/20"
              }`}>{i + 1}</span>
              {step}
            </div>
            {i < 2 && <div className={`w-3 sm:w-6 h-0.5 ${i < stepsDone - 1 ? "bg-accent" : "bg-accent/20"}`} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default CalculatorHeader;
