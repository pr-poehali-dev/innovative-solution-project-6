import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { trucks } from "@/components/sections/calculator/data";
import { DELIVERY_CITIES } from "./deliveryCities";
import { type Brick, PALLET_SIZE, WALL_THICKNESS, formatTons, priceText, palletsFor } from "./brickUtils";

export type DeliveryInfo = { city: string; km: number; truck: string; trips: number; cost: number };

interface BrickCalculatorProps {
  bricks: Brick[];
  onAdd: (brick: Brick, qty: number, delivery?: DeliveryInfo) => void;
}

type Mode = "build" | "packs";
type Shape = "box" | "wall";
type ThicknessId = (typeof WALL_THICKNESS)[number]["id"];

const WINDOW_M2 = 1.8;
const DOOR_M2 = 1.9;
const GATE_M2 = 6;
const RESERVE = 1.05;
const KM_RATE = 120;
const MANIPULATORS = trucks
  .filter((t) => t.category === "Манипулятор")
  .map((t) => {
    const m = t.capacity.match(/[\d.,]+/);
    return { name: t.short || t.name, tons: m ? parseFloat(m[0].replace(",", ".")) : 5 };
  })
  .filter((t, i, arr) => arr.findIndex((x) => x.tons === t.tons) === i)
  .sort((a, b) => a.tons - b.tons);

const PRESETS: {
  id: string;
  label: string;
  icon: string;
  shape: Shape;
  length: number;
  width: number;
  height: number;
  windows: number;
  doors: number;
  gates: number;
  thickness: ThicknessId;
}[] = [
  { id: "house", label: "Дом", icon: "Home", shape: "box", length: 10, width: 8, height: 3, windows: 6, doors: 2, gates: 0, thickness: "1.5" },
  { id: "garage", label: "Гараж", icon: "Warehouse", shape: "box", length: 6, width: 4, height: 2.5, windows: 0, doors: 0, gates: 1, thickness: "1" },
  { id: "bath", label: "Баня", icon: "Flame", shape: "box", length: 6, width: 4, height: 2.4, windows: 1, doors: 1, gates: 0, thickness: "1" },
  { id: "fence", label: "Забор / стена", icon: "Blocks", shape: "wall", length: 30, width: 0, height: 2, windows: 0, doors: 0, gates: 0, thickness: "0.5" },
];

const num = (v: string) => Math.max(0, parseFloat(v.replace(",", ".")) || 0);
const fmt = (v: number, d = 1) => v.toLocaleString("ru-RU", { maximumFractionDigits: d });

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-7 h-7 rounded-full bg-accent text-black text-sm font-black flex items-center justify-center shrink-0">{n}</span>
      <p className="text-white font-bold">{title}</p>
    </div>
    {children}
  </div>
);

const NumField = ({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  hint?: string;
}) => (
  <label className="block">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="mt-1 flex items-center rounded-xl border border-accent/25 bg-black/15 focus-within:border-accent">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent px-3 py-2.5 text-white font-bold outline-none"
      />
      <span className="pr-3 text-xs text-muted-foreground">{suffix}</span>
    </div>
    {hint && <span className="block mt-1 text-[11px] text-muted-foreground/80">{hint}</span>}
  </label>
);

const Counter = ({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint: string }) => (
  <div className="rounded-xl border border-white/10 bg-black/10 p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="mt-1.5 flex items-center justify-between">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-8 h-8 rounded-lg border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
        aria-label={`Меньше: ${label}`}
      >
        <Icon name="Minus" size={14} />
      </button>
      <span className="text-lg font-black text-white">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-lg border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
        aria-label={`Больше: ${label}`}
      >
        <Icon name="Plus" size={14} />
      </button>
    </div>
    <p className="mt-1 text-[10px] text-muted-foreground/80">{hint}</p>
  </div>
);

const Row = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <div className="flex justify-between gap-3">
    <span className="text-muted-foreground">{label}</span>
    <span className={strong ? "text-white font-black" : "text-white font-bold"}>{value}</span>
  </div>
);

const BrickCalculator = ({ bricks, onAdd }: BrickCalculatorProps) => {
  const [mode, setMode] = useState<Mode>("build");
  const [brickId, setBrickId] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const [preset, setPreset] = useState("house");
  const [shape, setShape] = useState<Shape>("box");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [height, setHeight] = useState("3");
  const [windows, setWindows] = useState(6);
  const [doors, setDoors] = useState(2);
  const [gates, setGates] = useState(0);
  const [thickness, setThickness] = useState<ThicknessId>("1.5");

  const [packs, setPacks] = useState(1);
  const [city, setCity] = useState(DELIVERY_CITIES[0].name);
  const [distance, setDistance] = useState(String(DELIVERY_CITIES[0].km));
  const [truckTons, setTruckTons] = useState<number | null>(null);

  const selected = bricks.find((b) => b.id === brickId) || bricks[0];
  const format = selected?.format || "oneHalf";

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPreset(id);
    setShape(p.shape);
    setLength(String(p.length));
    setWidth(String(p.width));
    setHeight(String(p.height));
    setWindows(p.windows);
    setDoors(p.doors);
    setGates(p.gates);
    setThickness(p.thickness);
  };

  const build = useMemo(() => {
    const L = num(length);
    const W = num(width);
    const H = num(height);
    const perimeter = shape === "box" ? 2 * (L + W) : L;
    const wallArea = perimeter * H;
    const openings = windows * WINDOW_M2 + doors * DOOR_M2 + gates * GATE_M2;
    const area = Math.max(0, wallArea - openings);
    const t = WALL_THICKNESS.find((w) => w.id === thickness)!;
    const perM2 = t.perM2[format];
    const net = area * perM2;
    const qty = Math.ceil((net * RESERVE) / 10) * 10;
    const pallets = palletsFor(qty);
    return { perimeter, wallArea, openings, area, perM2, net, qty, pallets, orderQty: pallets * PALLET_SIZE, t };
  }, [length, width, height, shape, windows, doors, gates, thickness, format]);

  const packQty = packs * PALLET_SIZE;

  const pallets = mode === "build" ? build.pallets : packs;
  const orderQty = mode === "build" ? build.orderQty : packQty;
  const weight = selected ? pallets * selected.palletWeight : 0;
  const total = selected ? orderQty * selected.priceNum : 0;
  const km = num(distance);
  const palletKg = selected?.palletWeight || 1680;
  const perTripOf = (tons: number) => Math.floor((tons * 1000) / palletKg);
  const tripsOf = (tons: number) => (pallets > 0 && perTripOf(tons) > 0 ? Math.ceil(pallets / perTripOf(tons)) : 0);
  const usable = MANIPULATORS.filter((t) => perTripOf(t.tons) > 0);
  const bestTruck = usable.reduce<(typeof MANIPULATORS)[number] | undefined>((best, t) => {
    if (!best) return t;
    const a = tripsOf(t.tons);
    const b = tripsOf(best.tons);
    return a < b || (a === b && t.tons < best.tons) ? t : best;
  }, undefined);
  const truck = usable.find((t) => t.tons === truckTons) || bestTruck;
  const perTrip = truck ? perTripOf(truck.tons) : 0;
  const trips = truck ? tripsOf(truck.tons) : 0;
  const delivery = Math.round(km * 2 * KM_RATE * trips);
  const grandTotal = total + delivery;

  const handleAdd = () => {
    if (!selected || orderQty === 0) return;
    onAdd(
      selected,
      orderQty,
      km > 0 && truck
        ? { city: city === "other" ? "Другой адрес" : city, km, truck: `${fmt(truck.tons)} т`, trips, cost: delivery }
        : undefined,
    );
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };

  return (
    <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-card/70 to-black/10 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
            <Icon name="Calculator" size={22} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Калькулятор кирпича</h2>
            <p className="text-sm text-muted-foreground">Посчитайте сами — сколько кирпича и упаковок нужно</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-black/15 border border-white/10 sm:w-[420px]">
          {[
            { id: "build" as Mode, label: "По размерам постройки", icon: "Home" },
            { id: "packs" as Mode, label: "По упаковкам", icon: "Package" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                mode === m.id ? "bg-accent text-black" : "text-white/80 hover:text-white"
              }`}
            >
              <Icon name={m.icon} size={15} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="space-y-4">
          {bricks.length > 0 && (
            <Step n={1} title="Выберите кирпич">
              <div className="grid grid-cols-2 gap-2">
                {bricks.map((b) => {
                  const active = selected?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBrickId(b.id)}
                      className={`flex items-center gap-3 rounded-xl border p-2 text-left transition-all ${
                        active ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"
                      }`}
                    >
                      <span className="w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden">
                        {b.imageUrl && <img src={b.imageUrl} alt="" className="w-full h-full object-contain p-1" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-black text-white">{b.hollow ? "Пустотелый" : "Полнотелый"}</span>
                        <span className="block text-[11px] text-muted-foreground">
                          {b.grade} · {b.priceNum > 0 ? `${b.priceNum} ₽/шт` : "цена по запросу"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>
          )}

          {mode === "build" ? (
            <>
              <Step n={2} title="Что строите?">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-sm font-bold transition-all ${
                        preset === p.id ? "border-accent bg-accent/15 text-white" : "border-white/10 bg-black/10 text-white/80 hover:border-accent/50"
                      }`}
                    >
                      <Icon name={p.icon} size={20} className="text-accent" />
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">Подставим типовые размеры — дальше поправьте под себя</p>
              </Step>

              <Step n={3} title="Размеры">
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/15 border border-white/10 mb-3">
                  {[
                    { id: "box" as Shape, label: "Коробка из 4 стен" },
                    { id: "wall" as Shape, label: "Одна стена / забор" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShape(s.id)}
                      className={`rounded-lg py-2 text-xs sm:text-sm font-bold transition-all ${
                        shape === s.id ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className={`grid gap-3 ${shape === "box" ? "grid-cols-3" : "grid-cols-2"}`}>
                  <NumField label={shape === "box" ? "Длина" : "Длина стены"} value={length} onChange={setLength} suffix="м" />
                  {shape === "box" && <NumField label="Ширина" value={width} onChange={setWidth} suffix="м" />}
                  <NumField label="Высота стен" value={height} onChange={setHeight} suffix="м" />
                </div>
                {shape === "box" && (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Наружные размеры здания. Периметр: {fmt(build.perimeter)} м
                  </p>
                )}
              </Step>

              <Step n={4} title="Окна, двери, ворота">
                <div className="grid grid-cols-3 gap-2">
                  <Counter label="Окна" value={windows} onChange={setWindows} hint="≈ 1,5 × 1,2 м" />
                  <Counter label="Двери" value={doors} onChange={setDoors} hint="≈ 0,9 × 2,1 м" />
                  <Counter label="Ворота" value={gates} onChange={setGates} hint="≈ 2,5 × 2,4 м" />
                </div>
              </Step>

              <Step n={5} title="Толщина стены">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WALL_THICKNESS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setThickness(w.id)}
                      className={`rounded-xl border p-2.5 text-left transition-all ${
                        thickness === w.id ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"
                      }`}
                    >
                      <p className="text-sm font-bold text-white">{w.label}</p>
                      <p className="text-[11px] text-muted-foreground">{w.mm}</p>
                      <p className="text-[11px] text-accent/90">{w.hint}</p>
                    </button>
                  ))}
                </div>
              </Step>
            </>
          ) : (
            <Step n={2} title="Сколько упаковок?">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPacks((p) => Math.max(1, p - 1))}
                  className="w-12 h-12 rounded-xl border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
                  aria-label="Меньше упаковок"
                >
                  <Icon name="Minus" size={18} />
                </button>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={packs}
                  onChange={(e) => setPacks(Math.max(1, Math.floor(num(e.target.value)) || 1))}
                  className="flex-1 min-w-0 h-12 rounded-xl border border-accent/25 bg-black/15 text-center text-2xl font-black text-white outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setPacks((p) => p + 1)}
                  className="w-12 h-12 rounded-xl border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
                  aria-label="Больше упаковок"
                >
                  <Icon name="Plus" size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[1, 2, 4, 8, 12, 20].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPacks(n)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                      packs === n ? "border-accent bg-accent text-black" : "border-white/10 bg-black/10 text-white/80 hover:border-accent/50"
                    }`}
                  >
                    {n} уп.
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-black/15 border border-white/10 p-4">
                <p className="text-sm text-white font-bold mb-3">
                  На сколько хватит {packQty.toLocaleString("ru-RU")} шт?
                </p>
                <div className="space-y-2 text-sm">
                  {WALL_THICKNESS.map((w) => (
                    <div key={w.id} className="flex justify-between gap-3">
                      <span className="text-muted-foreground">
                        Стена {w.label.toLowerCase()} <span className="text-white/50">({w.hint.toLowerCase()})</span>
                      </span>
                      <span className="text-white font-bold whitespace-nowrap">≈ {fmt(packQty / w.perM2[format] / RESERVE)} м²</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">С учётом швов раствора и запаса 5% на бой и подрезку</p>
              </div>
            </Step>
          )}
        </div>

        <div className="lg:sticky lg:top-24 self-start rounded-2xl border border-accent/40 bg-black/10 p-5 shadow-[0_0_40px_rgba(232,168,32,0.08)]">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Итог расчёта</p>

          <div className="rounded-xl bg-accent/10 border border-accent/30 p-4 text-center mb-4">
            <p className="text-xs text-muted-foreground">Нужно заказать</p>
            <p className="text-4xl font-black text-accent leading-tight">
              {pallets} <span className="text-xl">уп.</span>
            </p>
            <p className="text-sm text-white font-bold">{orderQty.toLocaleString("ru-RU")} шт кирпича</p>
          </div>

          {mode === "build" && (
            <div className="space-y-2 text-sm mb-4">
              <Row label="Площадь стен" value={`${fmt(build.wallArea)} м²`} />
              <Row label="Минус окна, двери, ворота" value={`− ${fmt(build.openings)} м²`} />
              <Row label="Площадь кладки" value={`${fmt(build.area)} м²`} strong />
              <Row label={`Кирпича на 1 м² (${build.t.label.toLowerCase()})`} value={`${build.perM2} шт`} />
              <Row label="Нужно с запасом 5%" value={`${build.qty.toLocaleString("ru-RU")} шт`} strong />
              <p className="text-[11px] text-muted-foreground pt-1">
                Округлили до целых упаковок по {PALLET_SIZE} шт — останется {(build.orderQty - build.qty).toLocaleString("ru-RU")} шт в запас
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm pt-3 border-t border-white/10">
            <Row label="Вес" value={selected ? formatTons(weight) : "—"} />
            <Row label="Цена упаковки" value={selected ? priceText(selected.palletPrice) : "—"} />
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Truck" size={16} className="text-accent" />
              <span className="text-sm font-bold text-white">Доставка манипулятором</span>
            </div>
            <label className="block mb-3">
              <span className="text-xs text-muted-foreground">Город или посёлок</span>
              <div className="mt-1 relative">
                <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                <select
                  value={city}
                  onChange={(e) => {
                    const c = DELIVERY_CITIES.find((x) => x.name === e.target.value);
                    setCity(e.target.value);
                    if (c) setDistance(String(c.km));
                  }}
                  className="w-full appearance-none rounded-xl border border-accent/25 bg-[#4a5260] pl-9 pr-9 py-2.5 text-white font-bold outline-none focus:border-accent"
                >
                  {DELIVERY_CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} — {c.km} км
                    </option>
                  ))}
                  <option value="other">Другой адрес — введу километры</option>
                </select>
                <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </label>
            <NumField
              label="Расстояние до объекта"
              value={distance}
              onChange={(v) => {
                setDistance(v);
                const c = DELIVERY_CITIES.find((x) => x.name === city);
                if (c && String(c.km) !== v) setCity("other");
              }}
              suffix="км"
              hint="Можно поправить, если объект дальше или ближе"
            />
            <p className="text-xs text-muted-foreground mt-3 mb-1.5">Грузоподъёмность манипулятора</p>
            <div className="grid grid-cols-3 gap-1.5">
              {usable.map((t) => {
                const active = truck?.tons === t.tons;
                return (
                  <button
                    key={t.tons}
                    type="button"
                    onClick={() => setTruckTons(t.tons)}
                    className={`relative rounded-lg border px-1.5 py-2 text-center transition-all ${
                      active ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"
                    }`}
                  >
                    {bestTruck?.tons === t.tons && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 rounded-full bg-accent text-black text-[9px] font-black whitespace-nowrap">
                        выгодно
                      </span>
                    )}
                    <span className="block text-sm font-black text-white">{fmt(t.tons)} т</span>
                    <span className="block text-[10px] text-muted-foreground">{perTripOf(t.tons)} уп./рейс</span>
                  </button>
                );
              })}
            </div>
            <div className="space-y-2 text-sm mt-3">
              <Row label="Вес груза" value={formatTons(pallets * palletKg)} />
              <Row label="Везём за рейс" value={truck ? `${perTrip} уп. (${formatTons(perTrip * palletKg)})` : "—"} />
              <Row label="Рейсов манипулятора" value={km > 0 ? `${trips}` : "—"} />
              <Row label="Доставка с разгрузкой" value={km > 0 ? priceText(delivery) : "—"} />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-accent/20 space-y-2 text-sm">
            <Row label="Кирпич" value={priceText(total)} />
            <Row label="Доставка" value={km > 0 ? priceText(delivery) : "—"} />
          </div>
          <div className="mt-3 flex justify-between items-end">
            <span className="text-white font-bold">Итого</span>
            <span className="text-3xl font-black text-accent">{priceText(grandTotal)}</span>
          </div>

          <button
            type="button"
            disabled={!selected || orderQty === 0}
            onClick={handleAdd}
            className={`mt-5 w-full h-12 rounded-xl font-black inline-flex items-center justify-center gap-2 transition-all disabled:opacity-40 ${
              done ? "bg-emerald-500 text-black" : "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
            }`}
          >
            <Icon name={done ? "Check" : "ShoppingCart"} size={18} />
            {done ? "Добавлено в корзину" : `Добавить ${pallets} уп. в корзину`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrickCalculator;