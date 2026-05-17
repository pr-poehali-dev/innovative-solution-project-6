import Icon from "@/components/ui/icon";

interface AsphaltCalculatorHeaderProps {
  light: boolean;
}

const AsphaltCalculatorHeader = ({ light }: AsphaltCalculatorHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${
          light
            ? "bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 shadow-lg shadow-amber-400/30"
            : "bg-accent/10 border border-accent/30"
        }`}
      >
        <Icon name="Calculator" size={14} className={light ? "text-white" : "text-accent"} />
        <span
          className={`text-xs font-black uppercase tracking-wider ${
            light ? "text-white" : "text-accent"
          }`}
        >
          Калькулятор
        </span>
      </div>
      <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3">
        <span
          className={
            light
              ? "bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent"
          }
        >
          Расчёт стоимости асфальтирования
        </span>
      </h2>
      <p
        className={`text-sm sm:text-base max-w-2xl mx-auto ${
          light ? "text-slate-600" : "text-muted-foreground"
        }`}
      >
        Укажите параметры объекта — получите примерную стоимость за 30 секунд.
        Финальная цена — после бесплатного выезда замерщика.
      </p>
    </div>
  );
};

export default AsphaltCalculatorHeader;
