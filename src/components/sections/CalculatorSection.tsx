import { useState, useMemo, useEffect } from "react";
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
  image: string;
};

const trucks: Truck[] = [
  { name: "ISUZU 5т + КМУ", short: "ISUZU 5т", price: 2200, category: "Манипулятор", capacity: "до 5 т", boom: "8,5 м", highlight: "Выгодная цена", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/4bb58aab-783b-43b6-8d89-ee519e570e09.webp" },
  { name: "Hino 500 + КМУ Kanglim KS1256G-II", short: "Hino 500", price: 2700, category: "Манипулятор", capacity: "до 6 т", boom: "19 м", highlight: "Универсал", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/660a8623-ee67-4819-a414-68b954548e0b.webp" },
  { name: "КАМАЗ 65115 + КМУ HANGIL", short: "КАМАЗ 65115", price: 2800, category: "Манипулятор", capacity: "до 12 т", boom: "19 м", highlight: "Хит заказов", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/b646729f-a106-46bf-b7e4-abf0fe1c4983.webp" },
  { name: "FAW + КМУ DongYang", short: "FAW DongYang", price: 3000, category: "Манипулятор", capacity: "до 17 т", boom: "21 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/df8d23ad-2b19-4a5c-bfef-8403f404cab9.webp" },
  { name: "Hyundai Gold + КМУ HIAB 190TM", short: "Hyundai Gold", price: 3200, category: "Манипулятор", capacity: "до 10 т", boom: "22 м", highlight: "Длинная стрела", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/106c30cf-02d3-4b99-ac02-47e7404652e2.webp" },
  { name: "RENAULT LANDER + КМУ", short: "Renault Lander", price: 3200, category: "Манипулятор", capacity: "до 15 т", boom: "20 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/72811b07-39fb-476d-9b0a-6a3f31285de9.webp" },
  { name: "КАМАЗ 43118 + КМУ Kanglim", short: "КАМАЗ 43118", price: 3500, category: "Манипулятор", capacity: "до 10 т", boom: "23 м", highlight: "Вездеход", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.webp" },
  { name: "FAW J6 + КМУ DONGYANG 1966", short: "FAW J6 + Бур", price: 3500, category: "Манипулятор", capacity: "до 20 т", boom: "22 м", highlight: "Эксклюзив · Бур", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/cb1469ab-3878-4eea-9eac-9ce6f4129301.webp" },
  { name: "Экскаватор-погрузчик JCB 3CX", short: "JCB 3CX", price: 2400, category: "Экскаватор", capacity: "8,1 т", boom: "копание 4,24 м", highlight: "Новинка", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/761d840a-c678-4fee-a5eb-4531b7ca7d17.webp" },
  { name: "Экскаватор-погрузчик JCB 4CX", short: "JCB 4CX", price: 2700, category: "Экскаватор", capacity: "8,8 т", boom: "копание 5,58 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/29fc9d6a-adfb-4899-9119-3136ce0cb7d4.webp" },
];

const categories = ["Все", "Манипулятор", "Экскаватор"] as const;
type Category = (typeof categories)[number];

const tasks: { id: string; label: string; icon: string; suggested: number[] }[] = [
  { id: "any", label: "Любая задача", icon: "Sparkles", suggested: [] },
  { id: "build", label: "Стройка / разгрузка", icon: "Hammer", suggested: [2, 3, 6] },
  { id: "long", label: "Длинные грузы", icon: "MoveHorizontal", suggested: [3, 6, 7] },
  { id: "heavy", label: "Тяжёлые до 20 т", icon: "Anchor", suggested: [3, 7] },
  { id: "dig", label: "Копать / грунт", icon: "Construction", suggested: [8, 9] },
  { id: "tower", label: "Высотные работы", icon: "Building2", suggested: [4, 5, 7] },
];

// Выезд в города области = N часов работы по тарифу выбранной техники (туда-обратно)
const cities: { name: string; hours: number }[] = [
  { name: "Нижний Новгород", hours: 0 },
  { name: "Бор", hours: 0.5 },
  { name: "Кстово", hours: 0.5 },
  { name: "Дзержинск", hours: 1 },
  { name: "Богородск", hours: 1 },
  { name: "Балахна", hours: 1 },
  { name: "Городец", hours: 1.5 },
  { name: "Павлово", hours: 1.5 },
  { name: "Семёнов", hours: 1.5 },
  { name: "Арзамас", hours: 2 },
  { name: "Выкса", hours: 2.5 },
  { name: "Другой город", hours: 2 },
];

const CalculatorSection = () => {
  const [activeCat, setActiveCat] = useState<Category>("Все");
  const [taskId, setTaskId] = useState("any");
  const [truckIdx, setTruckIdx] = useState(0);
  const [hours, setHours] = useState(4);
  const [cityIdx, setCityIdx] = useState(0);
  const [withRigger, setWithRigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCat === "Все" ? trucks : trucks.filter((t) => t.category === activeCat);
    const t = tasks.find((x) => x.id === taskId);
    if (t && t.suggested.length > 0) {
      list = list.filter((tr) => t.suggested.includes(trucks.indexOf(tr)));
    }
    return list;
  }, [activeCat, taskId]);

  useEffect(() => {
    if (!filtered.find((t) => trucks.indexOf(t) === truckIdx) && filtered.length > 0) {
      setTruckIdx(trucks.indexOf(filtered[0]));
    }
  }, [filtered, truckIdx]);

  const truck = trucks[truckIdx];
  const baseTotal = truck.price * hours;
  const discountPct = hours >= 12 ? 0.08 : hours >= 8 ? 0.05 : 0;
  const discount = Math.round(baseTotal * discountPct);
  const city = cities[cityIdx];
  const citySurcharge = Math.round(city.hours * truck.price);
  const riggerPrice = withRigger ? 250 * hours : 0;
  const finalTotal = baseTotal - discount + citySurcharge + riggerPrice;

  const competitorPrice = Math.round(finalTotal * 1.18);
  const savings = competitorPrice - finalTotal;

  const minPrice = Math.min(...trucks.map((t) => t.price));
  const maxPrice = Math.max(...trucks.map((t) => t.price));

  const stepsDone = [
    truck ? 1 : 0,
    hours > 4 || hours === 4 ? 1 : 0,
    cityIdx >= 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        truckName={`${truck.name} · ${hours} ч · ${city.name}${withRigger ? " · стропальщик" : ""} · Итого: ${finalTotal.toLocaleString("ru")} ₽`}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex justify-center mb-4">
            <SectionBadge>Калькулятор</SectionBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Рассчитайте стоимость
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            3 простых шага — узнайте точную сумму с учётом скидки, города и доп. услуг
          </p>

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
              <span className="text-xs sm:text-sm text-emerald-300">До 8% скидки</span>
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

        <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-br from-accent/40 via-accent/10 to-accent/40">
          <div className="border-0 rounded-2xl sm:rounded-3xl bg-card/80 backdrop-blur-sm p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative">

              {/* Шаг 1: Тип задачи */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">1</span>
                  Какая у вас задача?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {tasks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTaskId(t.id)}
                      className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                        taskId === t.id
                          ? "border-accent bg-accent/15 text-white"
                          : "border-accent/10 bg-background/30 text-muted-foreground hover:border-accent/30"
                      }`}
                    >
                      <Icon name={t.icon} size={18} className={taskId === t.id ? "text-accent" : "text-accent/60"} />
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight text-center">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Категории фильтр */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const count = cat === "Все" ? trucks.length : trucks.filter((t) => t.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
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

              {/* Шаг 2: Выбор техники */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">2</span>
                  Выберите технику
                  {filtered.length < trucks.length && (
                    <span className="ml-auto text-[11px] text-accent/80">Подобрано: {filtered.length}</span>
                  )}
                </p>

                {/* Selected truck preview */}
                <div className="mb-3 p-3 rounded-xl border-2 border-accent/40 bg-gradient-to-r from-accent/10 to-transparent flex items-center gap-3">
                  <img src={truck.image} alt={truck.short} className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-black/30" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-accent font-bold tracking-wider mb-0.5">ВЫБРАНО</p>
                    <p className="font-bold text-sm sm:text-base text-white truncate">{truck.name}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Icon name="Weight" size={10} />{truck.capacity}</span>
                      {truck.boom && <span className="flex items-center gap-1"><Icon name="MoveUpRight" size={10} />{truck.boom}</span>}
                      <span className="flex items-center gap-1 text-accent"><Icon name="Wallet" size={10} />{truck.price.toLocaleString("ru")} ₽/ч</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[340px] overflow-y-auto pr-1 custom-scroll">
                  {filtered.map((t) => {
                    const i = trucks.indexOf(t);
                    const selected = truckIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setTruckIdx(i)}
                        className={`group relative text-left rounded-xl border-2 transition-all overflow-hidden ${
                          selected
                            ? "border-accent shadow-lg shadow-accent/20"
                            : "border-accent/10 hover:border-accent/40"
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                          <img src={t.image} alt={t.short} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                          {selected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                              <Icon name="Check" size={12} className="text-black" strokeWidth={3} />
                            </div>
                          )}
                          {t.highlight && (
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-accent/90 text-black text-[9px] font-black rounded">
                              ★ {t.highlight}
                            </div>
                          )}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5">
                            <p className="font-bold text-xs text-white leading-tight truncate">{t.short}</p>
                            <p className="text-[10px] text-accent font-black">{t.price.toLocaleString("ru")} ₽/ч</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Шаг 3: Часы */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">3</span>
                  Сколько часов нужна техника?
                </p>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} className="text-accent" />
                    <span>Часов работы</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-accent font-black text-2xl sm:text-3xl tabular-nums">{hours}</span>
                    <span className="text-accent/70 text-sm">ч</span>
                  </div>
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
                    background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) 100%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                  <span>4 ч</span>
                  <span className={hours >= 8 ? "text-emerald-400 font-bold" : ""}>8 ч (-5%)</span>
                  <span className={hours >= 12 ? "text-emerald-400 font-bold" : ""}>12 ч (-8%)</span>
                  <span>24 ч</span>
                </div>

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

              {/* Город */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-accent" />
                  Куда подать технику?
                  <span className="ml-auto text-[10px] text-muted-foreground/70 font-normal">
                    выезд по тарифу выбранной техники
                  </span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {cities.map((c, i) => {
                    const surcharge = Math.round(c.hours * truck.price);
                    return (
                      <button
                        key={c.name}
                        onClick={() => setCityIdx(i)}
                        className={`p-2.5 rounded-lg border-2 text-left transition-all ${
                          cityIdx === i
                            ? "border-accent bg-accent/15"
                            : "border-accent/10 bg-background/30 hover:border-accent/30"
                        }`}
                      >
                        <p className={`text-xs font-bold ${cityIdx === i ? "text-white" : "text-foreground/80"}`}>{c.name}</p>
                        <p className={`text-[10px] mt-0.5 ${c.hours === 0 ? "text-emerald-400" : "text-muted-foreground"}`}>
                          {c.hours === 0
                            ? "Бесплатная подача"
                            : `+${surcharge.toLocaleString("ru")} ₽ (${c.hours} ч пути)`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Доп. услуги */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
                  <Icon name="PlusCircle" size={14} className="text-accent" />
                  Дополнительные опции
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    withRigger ? "border-accent bg-accent/10" : "border-accent/10 bg-background/30 hover:border-accent/30"
                  }`}>
                    <input type="checkbox" checked={withRigger} onChange={(e) => setWithRigger(e.target.checked)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                      withRigger ? "bg-accent border-accent" : "border-accent/40"
                    }`}>
                      {withRigger && <Icon name="Check" size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <Icon name="HardHat" size={12} className="text-accent" />
                        Стропальщик
                      </p>
                      <p className="text-[10px] text-muted-foreground">Помощь со строповкой груза</p>
                    </div>
                    <span className="text-xs font-black text-accent">+250 ₽/ч</span>
                  </label>
                </div>
              </div>

              {/* Чек */}
              <button
                type="button"
                onClick={() => setShowCheck(!showCheck)}
                className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-accent transition-colors mb-3"
              >
                <span className="flex items-center gap-1.5">
                  <Icon name="ReceiptText" size={12} />
                  Детальный чек
                </span>
                <Icon name={showCheck ? "ChevronUp" : "ChevronDown"} size={14} />
              </button>
              {showCheck && (
                <div className="mb-4 p-3 rounded-lg bg-background/40 border border-accent/10 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{truck.short} × {hours} ч</span>
                    <span className="font-bold tabular-nums">{baseTotal.toLocaleString("ru")} ₽</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Скидка {Math.round(discountPct * 100)}% за длительность</span>
                      <span className="font-bold tabular-nums">−{discount.toLocaleString("ru")} ₽</span>
                    </div>
                  )}
                  {citySurcharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Выезд в «{city.name}» ({city.hours} ч × {truck.price.toLocaleString("ru")} ₽)</span>
                      <span className="font-bold tabular-nums">+{citySurcharge.toLocaleString("ru")} ₽</span>
                    </div>
                  )}
                  {withRigger && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Стропальщик × {hours} ч</span>
                      <span className="font-bold tabular-nums">+{riggerPrice.toLocaleString("ru")} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1.5 border-t border-accent/10 text-accent">
                    <span className="font-bold">Итого</span>
                    <span className="font-black tabular-nums">{finalTotal.toLocaleString("ru")} ₽</span>
                  </div>
                </div>
              )}

              {/* Итог */}
              <div className="border-t border-accent/10 pt-6">
                {savings > 1000 && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="TrendingDown" size={18} className="text-emerald-400" />
                    </div>
                    <div className="flex-1 text-xs sm:text-sm">
                      <p className="font-bold text-emerald-300">Вы экономите ~{savings.toLocaleString("ru")} ₽</p>
                      <p className="text-emerald-400/70 text-[11px]">по сравнению со средним рынком ({competitorPrice.toLocaleString("ru")} ₽)</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                      <Icon name="Calculator" size={12} className="text-accent" />
                      Итоговая стоимость
                    </p>
                    {discount > 0 && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground line-through">
                          {(baseTotal + citySurcharge + riggerPrice).toLocaleString("ru")} ₽
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
                    <Icon name="CreditCard" size={12} className="text-accent" /> Нал/безнал/карта
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