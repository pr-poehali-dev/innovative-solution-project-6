import Icon from "@/components/ui/icon";
import { PHONE, PHONE_TEL, fmt } from "./asphaltCalculatorData";

interface Breakdown {
  mainCost: number;
  baseCost: number;
  curbCost: number;
  markingCost: number;
  removalCost: number;
  subtotal: number;
  urgentCost: number;
  discount: number;
  total: number;
  days: number;
}

interface AsphaltCalculatorResultProps {
  light: boolean;
  area: number;
  breakdown: Breakdown;
  showResult: boolean;
}

const Row = ({
  label,
  value,
  green,
  red,
  light,
}: {
  label: string;
  value: number;
  green?: boolean;
  red?: boolean;
  light?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span className={light ? "text-slate-600" : "text-muted-foreground"}>{label}</span>
    <span
      className={`font-bold tabular-nums ${
        green
          ? light ? "text-emerald-600" : "text-emerald-400"
          : red
            ? light ? "text-red-600" : "text-red-400"
            : light ? "text-slate-900" : "text-white/90"
      }`}
    >
      {value < 0 ? "−" : ""}
      {fmt(Math.abs(value))} ₽
    </span>
  </div>
);

const AsphaltCalculatorResult = ({
  light,
  area,
  breakdown,
  showResult,
}: AsphaltCalculatorResultProps) => {
  return (
    <aside className="lg:w-[360px]">
      <div
        className={`lg:sticky lg:top-6 rounded-3xl border-2 p-5 sm:p-6 ${
          light
            ? "border-amber-400 bg-gradient-to-br from-amber-100 via-white to-orange-100 shadow-2xl shadow-amber-400/40"
            : "border-accent/40 bg-gradient-to-br from-accent/15 via-card/80 to-amber-500/10 backdrop-blur-sm"
        }`}
      >
        <div className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${light ? "text-orange-600" : "text-accent"}`}>
          Примерная стоимость
        </div>

        {!showResult ? (
          <div className={`py-8 text-center text-sm ${light ? "text-slate-600" : "text-muted-foreground"}`}>
            Укажите размеры участка, чтобы увидеть расчёт
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className={`text-3xl sm:text-5xl font-black tracking-tight ${
                  light
                    ? "bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent"
                    : "text-accent"
                }`}
              >
                {fmt(breakdown.total)}
              </span>
              <span className={`text-lg sm:text-2xl font-bold ${light ? "text-orange-600" : "text-accent"}`}>₽</span>
            </div>
            <div className={`text-xs mb-4 ${light ? "text-slate-600" : "text-muted-foreground"}`}>
              ≈ {fmt(breakdown.total / Math.max(area, 1))} ₽ за м²
            </div>

            <div className={`space-y-1.5 text-xs sm:text-sm border-t pt-4 mb-4 ${light ? "border-amber-300" : "border-accent/20"}`}>
              <Row light={light} label="Работы и материалы" value={breakdown.mainCost} />
              {breakdown.baseCost > 0 && (
                <Row light={light} label="Подготовка основания" value={breakdown.baseCost} />
              )}
              {breakdown.removalCost > 0 && (
                <Row light={light} label="Срезка старого асфальта" value={breakdown.removalCost} />
              )}
              {breakdown.curbCost > 0 && (
                <Row light={light} label="Установка бордюров" value={breakdown.curbCost} />
              )}
              {breakdown.markingCost > 0 && (
                <Row light={light} label="Разметка" value={breakdown.markingCost} />
              )}
              {breakdown.urgentCost > 0 && (
                <Row
                  light={light}
                  label="Срочный выезд (+15%)"
                  value={breakdown.urgentCost}
                  red
                />
              )}
              {breakdown.discount > 0 && (
                <Row
                  light={light}
                  label={`Скидка за объём ${area >= 500 ? "8%" : "4%"}`}
                  value={-breakdown.discount}
                  green
                />
              )}
            </div>

            <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${light ? "bg-white/80 border border-amber-200" : "bg-black/40"}`}>
              <div className={`flex items-center gap-2 text-xs ${light ? "text-slate-700" : "text-muted-foreground"}`}>
                <Icon name="Clock" size={14} className={light ? "text-orange-600" : "text-accent"} />
                Сроки работ
              </div>
              <span className={`font-bold text-sm ${light ? "text-slate-900" : "text-white"}`}>
                ≈ {breakdown.days} {breakdown.days === 1 ? "день" : breakdown.days < 5 ? "дня" : "дней"}
              </span>
            </div>
          </>
        )}

        <a
          href={PHONE_TEL}
          className={`group flex items-center justify-center gap-2 w-full px-4 py-4 rounded-2xl font-black overflow-hidden transition-all relative ${
            light
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105"
              : "bg-gradient-to-r from-accent via-accent to-amber-500 text-black hover:shadow-2xl hover:shadow-accent/40"
          }`}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <Icon name="Phone" size={18} className="relative animate-pulse" />
          <span className="relative text-sm sm:text-base">Уточнить точную цену</span>
        </a>

        <a
          href={PHONE_TEL}
          className={`block text-center text-xs sm:text-sm font-bold mt-3 hover:underline ${light ? "text-orange-600" : "text-accent"}`}
        >
          {PHONE}
        </a>

        <p className={`text-[11px] text-center mt-3 leading-relaxed ${light ? "text-slate-600" : "text-muted-foreground"}`}>
          <Icon name="Info" size={10} className={`inline mr-1 -mt-0.5 ${light ? "text-amber-600" : "text-accent"}`} />
          Расчёт примерный. Финальная цена — после бесплатного выезда замерщика.
        </p>
      </div>
    </aside>
  );
};

export default AsphaltCalculatorResult;
