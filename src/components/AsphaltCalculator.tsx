import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE_TEL = "tel:+79601690990";
const PHONE = "+7 (960) 169-09-90";

type WorkType = "new" | "patch" | "overlay";
type Thickness = 4 | 5 | 7 | 10;
type Base = "none" | "light" | "full";
type Extras = {
  curb: boolean;
  marking: boolean;
  removal: boolean;
};

interface WorkOption {
  id: WorkType;
  title: string;
  subtitle: string;
  icon: string;
  pricePerM2: number;
}

const workOptions: WorkOption[] = [
  {
    id: "new",
    title: "Новая укладка",
    subtitle: "С подготовкой основания",
    icon: "Layers",
    pricePerM2: 450,
  },
  {
    id: "overlay",
    title: "Поверх старого",
    subtitle: "На существующее покрытие",
    icon: "PlusSquare",
    pricePerM2: 380,
  },
  {
    id: "patch",
    title: "Ямочный ремонт",
    subtitle: "Заделка выбоин и трещин",
    icon: "Wrench",
    pricePerM2: 600,
  },
];

const thicknessOptions: { value: Thickness; label: string; multiplier: number }[] = [
  { value: 4, label: "4 см", multiplier: 0.9 },
  { value: 5, label: "5 см", multiplier: 1.0 },
  { value: 7, label: "7 см", multiplier: 1.25 },
  { value: 10, label: "10 см", multiplier: 1.55 },
];

const baseOptions: { value: Base; title: string; subtitle: string; addPerM2: number }[] = [
  { value: "none", title: "Не требуется", subtitle: "Основание готово", addPerM2: 0 },
  { value: "light", title: "Лёгкая подготовка", subtitle: "Подсыпка, выравнивание", addPerM2: 150 },
  { value: "full", title: "Полная подготовка", subtitle: "Щебень + песок + уплотнение", addPerM2: 350 },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n));

interface AsphaltCalculatorProps {
  light?: boolean;
}

const AsphaltCalculator = ({ light = false }: AsphaltCalculatorProps) => {
  const [work, setWork] = useState<WorkType>("new");
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(10);
  const [thickness, setThickness] = useState<Thickness>(5);
  const [base, setBase] = useState<Base>("full");
  const [extras, setExtras] = useState<Extras>({
    curb: false,
    marking: false,
    removal: false,
  });
  const [urgent, setUrgent] = useState<boolean>(false);

  const area = useMemo(
    () => Math.max(0, Number(length) || 0) * Math.max(0, Number(width) || 0),
    [length, width],
  );

  const breakdown = useMemo(() => {
    const workOpt = workOptions.find((o) => o.id === work)!;
    const thickOpt = thicknessOptions.find((t) => t.value === thickness)!;
    const baseOpt = baseOptions.find((b) => b.value === base)!;

    const mainCost = area * workOpt.pricePerM2 * thickOpt.multiplier;
    const baseCost = work === "patch" ? 0 : area * baseOpt.addPerM2;
    const curbCost = extras.curb ? (Number(length) + Number(width)) * 2 * 550 : 0;
    const markingCost = extras.marking ? area * 35 : 0;
    const removalCost = extras.removal ? area * 90 : 0;
    const subtotal = mainCost + baseCost + curbCost + markingCost + removalCost;

    const urgentCost = urgent ? subtotal * 0.15 : 0;
    const discount = area >= 500 ? subtotal * 0.08 : area >= 200 ? subtotal * 0.04 : 0;

    const total = subtotal + urgentCost - discount;
    const days = Math.max(1, Math.ceil(area / 500));

    return {
      mainCost,
      baseCost,
      curbCost,
      markingCost,
      removalCost,
      subtotal,
      urgentCost,
      discount,
      total,
      days,
    };
  }, [area, work, thickness, base, extras, urgent, length, width]);

  const showResult = area > 0 && breakdown.total > 0;

  return (
    <section
      id="calculator"
      className={`relative z-10 px-4 sm:px-6 py-12 sm:py-20 ${light ? "" : "bg-accent/5"}`}
      style={
        light
          ? {
              background:
                "linear-gradient(180deg, rgba(255,243,220,0.6) 0%, rgba(255,236,200,0.8) 50%, rgba(255,243,220,0.6) 100%)",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-[1fr_auto] gap-6">
          {/* Form */}
          <div
            className={`rounded-3xl border-2 p-5 sm:p-8 space-y-6 ${
              light
                ? "border-amber-300 bg-white/90 shadow-xl shadow-amber-300/30"
                : "border-accent/30 bg-card/60 backdrop-blur-sm"
            }`}
          >
            {/* Work type */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
                1. Тип работ
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {workOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWork(opt.id)}
                    className={`group p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                      work === opt.id
                        ? light
                          ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg shadow-amber-400/30"
                          : "border-accent bg-accent/15 shadow-lg shadow-accent/20"
                        : light
                          ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                          : "border-accent/20 bg-card/40 hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        name={opt.icon}
                        size={18}
                        className={
                          work === opt.id
                            ? light ? "text-orange-600" : "text-accent"
                            : light ? "text-slate-500" : "text-white/60"
                        }
                      />
                      <span className={`font-bold text-sm ${light ? "text-slate-900" : ""}`}>{opt.title}</span>
                    </div>
                    <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>
                      {opt.subtitle}
                    </div>
                    <div className={`text-[11px] font-bold mt-1 ${light ? "text-orange-600" : "text-accent"}`}>
                      от {opt.pricePerM2} ₽/м²
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
                2. Размеры участка
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className={`text-xs mb-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>Длина, м</div>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none font-bold text-lg transition-colors ${
                        light
                          ? "bg-amber-50 border-amber-300 focus:border-amber-500 text-slate-900"
                          : "bg-black/40 border-accent/20 focus:border-accent text-white"
                      }`}
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${light ? "text-slate-500" : "text-muted-foreground"}`}>
                      м
                    </span>
                  </div>
                </div>
                <div>
                  <div className={`text-xs mb-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>Ширина, м</div>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none font-bold text-lg transition-colors ${
                        light
                          ? "bg-amber-50 border-amber-300 focus:border-amber-500 text-slate-900"
                          : "bg-black/40 border-accent/20 focus:border-accent text-white"
                      }`}
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${light ? "text-slate-500" : "text-muted-foreground"}`}>
                      м
                    </span>
                  </div>
                </div>
              </div>
              <div className={`mt-3 flex items-center justify-between px-4 py-2.5 rounded-xl border ${
                light
                  ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300"
                  : "bg-accent/10 border-accent/30"
              }`}>
                <span className={`text-xs sm:text-sm ${light ? "text-slate-700 font-semibold" : "text-muted-foreground"}`}>
                  Площадь:
                </span>
                <span className={`font-black text-base sm:text-lg ${light ? "text-orange-600" : "text-accent"}`}>
                  {fmt(area)} м²
                </span>
              </div>
            </div>

            {/* Thickness */}
            {work !== "patch" && (
              <div>
                <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
                  3. Толщина слоя асфальта
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {thicknessOptions.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setThickness(t.value)}
                      className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        thickness === t.value
                          ? light
                            ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600"
                            : "border-accent bg-accent/15 text-accent"
                          : light
                            ? "border-amber-200 bg-amber-50/50 hover:border-amber-400 text-slate-700"
                            : "border-accent/20 bg-card/40 hover:border-accent/50 text-white/70"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className={`text-[11px] mt-2 flex items-start gap-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>
                  <Icon name="Info" size={11} className={`mt-0.5 flex-shrink-0 ${light ? "text-amber-600" : "text-accent"}`} />
                  <span>
                    4-5 см — для дворов и пешеходных зон. 7-10 см — для парковок и проездов грузовиков.
                  </span>
                </p>
              </div>
            )}

            {/* Base */}
            {work !== "patch" && (
              <div>
                <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
                  4. Подготовка основания
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {baseOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBase(opt.value)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        base === opt.value
                          ? light
                            ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100"
                            : "border-accent bg-accent/15"
                          : light
                            ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                            : "border-accent/20 bg-card/40 hover:border-accent/50"
                      }`}
                    >
                      <div className={`font-bold text-sm mb-0.5 ${light ? "text-slate-900" : ""}`}>{opt.title}</div>
                      <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>{opt.subtitle}</div>
                      {opt.addPerM2 > 0 && (
                        <div className={`text-[11px] font-bold mt-1 ${light ? "text-orange-600" : "text-accent"}`}>
                          +{opt.addPerM2} ₽/м²
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
                {work === "patch" ? "3. Дополнительно" : "5. Дополнительно"}
              </label>
              <div className="space-y-2">
                {[
                  {
                    key: "removal" as const,
                    title: "Срезка старого асфальта",
                    sub: "Фрезерование + вывоз",
                    price: "+90 ₽/м²",
                  },
                  {
                    key: "curb" as const,
                    title: "Установка бордюров",
                    sub: "По периметру участка",
                    price: "+550 ₽/п.м",
                  },
                  {
                    key: "marking" as const,
                    title: "Дорожная разметка",
                    sub: "Парковочные места и стрелки",
                    price: "+35 ₽/м²",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      extras[item.key]
                        ? light
                          ? "border-amber-500 bg-gradient-to-r from-amber-100 to-orange-100"
                          : "border-accent bg-accent/10"
                        : light
                          ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                          : "border-accent/20 bg-card/40 hover:border-accent/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={extras[item.key]}
                      onChange={(e) =>
                        setExtras((p) => ({ ...p, [item.key]: e.target.checked }))
                      }
                      className="sr-only"
                    />
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        extras[item.key]
                          ? light
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500"
                            : "bg-accent border-accent"
                          : light
                            ? "border-amber-400 bg-white"
                            : "border-accent/40 bg-transparent"
                      }`}
                    >
                      {extras[item.key] && (
                        <Icon name="Check" size={14} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm ${light ? "text-slate-900" : ""}`}>{item.title}</div>
                      <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>{item.sub}</div>
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${light ? "text-orange-600" : "text-accent"}`}>
                      {item.price}
                    </span>
                  </label>
                ))}

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    urgent
                      ? light ? "border-red-500 bg-red-50" : "border-red-500/60 bg-red-500/10"
                      : light ? "border-amber-200 bg-amber-50/50 hover:border-amber-400" : "border-accent/20 bg-card/40 hover:border-accent/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      urgent ? "bg-red-500 border-red-500" : light ? "border-amber-400 bg-white" : "border-accent/40 bg-transparent"
                    }`}
                  >
                    {urgent && <Icon name="Check" size={14} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm flex items-center gap-1.5 ${light ? "text-slate-900" : ""}`}>
                      <span>🔥</span> Срочный заказ
                    </div>
                    <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>
                      Выезд в течение 24 часов
                    </div>
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${light ? "text-red-600" : "text-red-400"}`}>
                    +15%
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Result */}
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
        </div>
      </div>
    </section>
  );
};

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

export default AsphaltCalculator;