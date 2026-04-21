import { useState } from "react";
import { ArrowRight } from "lucide-react";

const trucks = [
  { name: "ISUZU 5т + КМУ", price: 2200 },
  { name: "КАМАЗ 65115 + КМУ HANGIL", price: 2800 },
  { name: "FAW + КМУ DongYang", price: 3000 },
  { name: "КАМАЗ 43118 + КМУ Kanglim", price: 3500 },
];

const CalculatorSection = () => {
  const [truckIdx, setTruckIdx] = useState(0);
  const [hours, setHours] = useState(4);

  const truck = trucks[truckIdx];
  const total = truck.price * hours;

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Калькулятор</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Рассчитайте стоимость
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Выберите технику и укажите количество часов
          </p>
        </div>

        <div className="border border-accent/20 rounded-2xl sm:rounded-3xl bg-card/50 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
          <div className="relative">

            {/* Выбор машины */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3 font-medium">Выберите технику</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trucks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTruckIdx(i)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      truckIdx === i
                        ? "border-accent bg-accent/15 text-white"
                        : "border-accent/10 bg-background/30 text-muted-foreground hover:border-accent/30"
                    }`}
                  >
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className={`text-xs mt-1 ${truckIdx === i ? "text-accent" : "text-muted-foreground"}`}>
                      {t.price.toLocaleString("ru")} ₽/час
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Слайдер часов */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-muted-foreground font-medium">Количество часов</p>
                <span className="text-accent font-black text-xl">{hours} ч</span>
              </div>
              <input
                type="range"
                min={4}
                max={24}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--accent))]"
                style={{
                  background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>4 ч (мин.)</span>
                <span>12 ч</span>
                <span>24 ч</span>
              </div>
            </div>

            {/* Итог */}
            <div className="border-t border-accent/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Итоговая стоимость</p>
                <p className="text-4xl sm:text-5xl font-black text-accent">
                  {total.toLocaleString("ru")} ₽
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  {truck.price.toLocaleString("ru")} ₽/час × {hours} ч · с НДС
                </p>
              </div>
              <a
                href="tel:+79601883084"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-bold text-base hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                Заказать за {total.toLocaleString("ru")} ₽
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
            </div>

          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Точная стоимость рассчитывается индивидуально · Минимальный заказ 4 часа
        </p>
      </div>
    </section>
  );
};

export default CalculatorSection;
