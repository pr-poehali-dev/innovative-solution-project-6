import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CalcResult {
  hours: number;
  shifts: number;
  pricePerHour: number;
  total: number;
}

interface PriceCalculatorProps {
  pricePerHour: number;
  onOrder: (result: CalcResult) => void;
}

const PriceCalculator = ({ pricePerHour, onOrder }: PriceCalculatorProps) => {
  const [hours, setHours] = useState(4);
  const [shifts, setShifts] = useState(1);

  const minHours = 4;
  const total = pricePerHour * hours * shifts;

  const formatted = total.toLocaleString("ru-RU");

  return (
    <div className="border border-accent/20 rounded-2xl bg-card/40 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Calculator" size={18} className="text-accent" />
        <span className="text-accent text-sm font-semibold uppercase tracking-widest">Калькулятор стоимости</span>
      </div>

      <div className="space-y-6">
        {/* Часы */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Количество часов</span>
            <span className="font-black text-white text-lg">{hours} ч</span>
          </div>
          <input
            type="range"
            min={minHours}
            max={24}
            step={1}
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>4 ч (мин.)</span>
            <span>24 ч</span>
          </div>
        </div>

        {/* Смены */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">Количество смен (дней)</span>
            <span className="font-black text-white text-lg">{shifts} дн.</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 5, 10, 20, 30].map(d => (
              <button
                key={d}
                onClick={() => setShifts(d)}
                className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                style={
                  shifts === d
                    ? { background: "linear-gradient(135deg, #f5d060, #e8a820)", color: "#1a1a1a" }
                    : { background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Итог */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{ background: "rgba(232,168,32,0.08)", border: "1px solid rgba(232,168,32,0.3)" }}
        >
          <p className="text-muted-foreground text-sm mb-1">Итоговая стоимость</p>
          <p
            className="text-4xl sm:text-5xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg, #f5d060, #e8a820, #c8850a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {formatted} ₽
          </p>
          <p className="text-xs text-muted-foreground">
            {hours} ч × {shifts} дн. × {pricePerHour.toLocaleString("ru-RU")} ₽/ч · с НДС
          </p>
        </div>

        <button
          onClick={() => onOrder({ hours, shifts, pricePerHour, total })}
          className="w-full py-4 font-bold rounded-xl text-black text-base transition-all hover:opacity-90 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #f5d060, #e8a820, #c8850a)" }}
        >
          Оставить заявку на этот расчёт
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Минимальный заказ — 4 часа. Точную стоимость уточняйте у менеджера.
        </p>
      </div>
    </div>
  );
};

export default PriceCalculator;