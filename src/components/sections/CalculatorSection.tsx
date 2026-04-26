import { useState, useMemo } from "react";
import OrderModal from "@/components/ui/OrderModal";
import SectionBadge from "@/components/ui/SectionBadge";
import Icon from "@/components/ui/icon";

type Truck = {
  name: string;
  short: string;
  price: number;
  category: "Манипулятор" | "Экскаватор";
  capacity: string;
  boom?: string;
  highlight?: string;
};

const trucks: Truck[] = [
  // Манипуляторы
  { name: "ISUZU 5т + КМУ", short: "ISUZU 5т", price: 2200, category: "Манипулятор", capacity: "до 5 т", boom: "8,5 м", highlight: "Выгодная цена" },
  { name: "Hino 500 + КМУ Kanglim KS1256G-II", short: "Hino 500", price: 2700, category: "Манипулятор", capacity: "до 6 т", boom: "19 м", highlight: "Универсал" },
  { name: "КАМАЗ 65115 + КМУ HANGIL", short: "КАМАЗ 65115", price: 2800, category: "Манипулятор", capacity: "до 12 т", boom: "19 м", highlight: "Хит заказов" },
  { name: "FAW + КМУ DongYang", short: "FAW DongYang", price: 3000, category: "Манипулятор", capacity: "до 17 т", boom: "21 м" },
  { name: "Hyundai Gold + КМУ HIAB 190TM", short: "Hyundai Gold", price: 3200, category: "Манипулятор", capacity: "до 10 т", boom: "22 м", highlight: "Длинная стрела" },
  { name: "RENAULT LANDER + КМУ", short: "Renault Lander", price: 3200, category: "Манипулятор", capacity: "до 15 т", boom: "20 м" },
  { name: "КАМАЗ 43118 + КМУ Kanglim", short: "КАМАЗ 43118", price: 3500, category: "Манипулятор", capacity: "до 10 т", boom: "23 м", highlight: "Вездеход" },
  { name: "FAW J6 + КМУ DONGYANG 1966", short: "FAW J6 + Бур", price: 3500, category: "Манипулятор", capacity: "до 20 т", boom: "22 м", highlight: "Эксклюзив · Бур" },
  // Экскаваторы
  { name: "Экскаватор-погрузчик JCB 3CX", short: "JCB 3CX", price: 2400, category: "Экскаватор", capacity: "8,1 т", boom: "копание 4,24 м", highlight: "Новинка" },
  { name: "Экскаватор-погрузчик JCB 4CX", short: "JCB 4CX", price: 2700, category: "Экскаватор", capacity: "8,8 т", boom: "копание 5,58 м" },
];

const categories = ["Все", "Манипулятор", "Экскаватор"] as const;
type Category = (typeof categories)[number];

const CalculatorSection = () => {
  const [activeCat, setActiveCat] = useState<Category>("Все");
  const [truckIdx, setTruckIdx] = useState(0);
  const [hours, setHours] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () => (activeCat === "Все" ? trucks : trucks.filter((t) => t.category === activeCat)),
    [activeCat]
  );

  const truck = trucks[truckIdx];
  const total = truck.price * hours;
  const discount = hours >= 8 ? Math.round(total * 0.05) : 0;
  const finalTotal = total - discount;

  const minPrice = Math.min(...trucks.map((t) => t.price));
  const maxPrice = Math.max(...trucks.map((t) => t.price));

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        truckName={`${truck.name} · ${hours} ч · ${truck.price.toLocaleString("ru")} ₽/час · Итого: ${finalTotal.toLocaleString("ru")} ₽${discount > 0 ? ` (скидка ${discount.toLocaleString("ru")} ₽)` : ""}`}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex justify-center mb-4">
            <SectionBadge>Калькулятор</SectionBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Рассчитайте стоимость
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Выберите технику, укажите часы — узнайте точную сумму. При заказе от 8 часов скидка 5%.
          </p>

          {/* Stat strip */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Icon name="Truck" size={14} className="text-accent" />
              <span className="text-xs sm:text-sm">{trucks.length} единиц техники</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Icon name="Wallet" size={14} className="text-accent" />
              <span className="text-xs sm:text-sm">
                от {minPrice.toLocaleString("ru")} до {maxPrice.toLocaleString("ru")} ₽/час
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <Icon name="Percent" size={14} className="text-emerald-400" />
              <span className="text-xs sm:text-sm text-emerald-300">Скидка 5% от 8 часов</span>
            </div>
          </div>
        </div>

        {/* Wrapper with animated golden border */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-br from-accent/40 via-accent/10 to-accent/40">
          <div className="border-0 rounded-2xl sm:rounded-3xl bg-card/80 backdrop-blur-sm p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              {/* Категории */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <Icon name="LayoutGrid" size={14} className="text-accent" />
                  Категория техники
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const count = cat === "Все" ? trucks.length : trucks.filter((t) => t.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                          activeCat === cat
                            ? "bg-accent text-black shadow-lg shadow-accent/30"
                            : "bg-background/40 border border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"
                        }`}
                      >
                        {cat}
                        <span className={`ml-1.5 text-[10px] ${activeCat === cat ? "text-black/60" : "text-muted-foreground"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Выбор машины */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <Icon name="MousePointerClick" size={14} className="text-accent" />
                  Выберите технику
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
                  {filtered.map((t) => {
                    const i = trucks.indexOf(t);
                    const selected = truckIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setTruckIdx(i)}
                        className={`group relative text-left p-3.5 rounded-xl border-2 transition-all overflow-hidden ${
                          selected
                            ? "border-accent bg-gradient-to-br from-accent/20 to-accent/5 shadow-lg shadow-accent/20"
                            : "border-accent/10 bg-background/30 hover:border-accent/40 hover:bg-background/50"
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <Icon name="Check" size={12} className="text-black" strokeWidth={3} />
                          </div>
                        )}

                        <div className="flex items-start gap-2 mb-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selected ? "bg-accent/30" : "bg-accent/10 group-hover:bg-accent/20"
                            }`}
                          >
                            <Icon
                              name={t.category === "Экскаватор" ? "Construction" : "Truck"}
                              size={16}
                              className="text-accent"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className={`font-bold text-sm leading-tight ${selected ? "text-white" : "text-foreground/90"}`}>
                              {t.short}
                            </p>
                            {t.highlight && (
                              <span className="inline-block mt-0.5 text-[10px] text-accent/90 font-semibold">
                                ★ {t.highlight}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-accent/10">
                          <div className="flex flex-col gap-0.5 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Weight" size={10} /> {t.capacity}
                            </span>
                            {t.boom && (
                              <span className="flex items-center gap-1">
                                <Icon name="MoveUpRight" size={10} /> {t.boom}
                              </span>
                            )}
                          </div>
                          <p className={`font-black text-sm whitespace-nowrap ${selected ? "text-accent" : "text-white/80"}`}>
                            {t.price.toLocaleString("ru")} ₽
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Слайдер часов */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="calc-hours-main" className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <Icon name="Clock" size={14} className="text-accent" />
                    Количество часов
                  </label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-accent font-black text-2xl sm:text-3xl tabular-nums">{hours}</span>
                    <span className="text-accent/70 text-sm">ч</span>
                  </div>
                </div>
                <input
                  id="calc-hours-main"
                  type="range"
                  min={4}
                  max={24}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  aria-label="Количество часов аренды"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--accent))]"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>4 ч (мин.)</span>
                  <span className={hours >= 8 ? "text-emerald-400 font-bold" : ""}>8 ч (-5%)</span>
                  <span>16 ч</span>
                  <span>24 ч</span>
                </div>

                {/* Quick presets */}
                <div className="flex gap-2 mt-3">
                  {[4, 8, 12, 24].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHours(h)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hours === h
                          ? "bg-accent/20 border border-accent text-accent"
                          : "bg-background/40 border border-accent/10 text-muted-foreground hover:border-accent/30"
                      }`}
                    >
                      {h} ч
                    </button>
                  ))}
                </div>
              </div>

              {/* Итог */}
              <div className="border-t border-accent/10 pt-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <Icon name="Calculator" size={12} className="text-accent" />
                      Итоговая стоимость
                    </p>
                    {discount > 0 && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground line-through">
                          {total.toLocaleString("ru")} ₽
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-400 text-[10px] font-black">
                          −{discount.toLocaleString("ru")} ₽
                        </span>
                      </div>
                    )}
                    <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent tabular-nums">
                      {finalTotal.toLocaleString("ru")} ₽
                    </p>
                    <p className="text-muted-foreground text-xs mt-1.5">
                      {truck.price.toLocaleString("ru")} ₽/час × {hours} ч · с НДС
                    </p>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-accent via-amber-400 to-accent text-black rounded-xl font-black text-sm sm:text-base hover:shadow-2xl hover:shadow-accent/40 transition-all overflow-hidden active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    <span className="relative flex flex-col items-start leading-tight">
                      <span className="text-[10px] opacity-70 font-bold tracking-wider">ЗАКАЗАТЬ ЗА</span>
                      <span className="text-base sm:text-lg">{finalTotal.toLocaleString("ru")} ₽</span>
                    </span>
                    <Icon name="ArrowRight" size={18} className="relative group-hover:translate-x-1 transition" />
                  </button>
                </div>

                {/* Trust line */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-5 pt-5 border-t border-accent/10 text-[11px] sm:text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Icon name="ShieldCheck" size={12} className="text-accent" /> Договор
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="UserCheck" size={12} className="text-accent" /> Оператор включён
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="Zap" size={12} className="text-accent" /> Подача от 1 часа
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="FileCheck" size={12} className="text-accent" /> Закрывающие документы
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Точная стоимость рассчитывается индивидуально · Минимальный заказ 4 часа
        </p>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: hsl(var(--accent) / 0.3); border-radius: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: hsl(var(--accent) / 0.5); }
      `}</style>
    </section>
  );
};

export default CalculatorSection;
