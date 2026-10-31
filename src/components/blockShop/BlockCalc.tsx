import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import type { Material } from "@/data/materials";
import { blockSize, m3, num, packInfo, parseNum, rub } from "./blockUtils";

type Mode = "walls" | "partitions";

const plural = (n: number, one: string, few: string, many: string) => {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
};

const thicknessHint = (t: number, mode: Mode) => {
  if (mode === "partitions") {
    if (t <= 75) return "Тонкая перегородка, облицовка";
    if (t <= 100) return "Обычная межкомнатная";
    return "Плотная, лучше шумоизоляция";
  }
  if (t >= 400) return "Тёплый дом без утепления";
  if (t >= 300) return "Жилой дом, можно утеплить";
  return "Гараж, баня, хозпостройка";
};

const HOUSE_PRESETS = [
  { label: "6×6", p: 24 },
  { label: "8×8", p: 32 },
  { label: "9×9", p: 36 },
  { label: "10×10", p: 40 },
  { label: "10×12", p: 44 },
  { label: "12×12", p: 48 },
];

const StepTitle = ({ n, title, sub }: { n: number; title: string; sub?: string }) => (
  <div className="flex items-start gap-3 mb-4">
    <span className="w-8 h-8 shrink-0 rounded-full bg-accent text-black text-sm font-black flex items-center justify-center shadow-[0_0_0_4px_rgba(232,168,32,0.15)]">
      {n}
    </span>
    <div className="pt-0.5">
      <h3 className="text-base sm:text-lg font-black text-white leading-tight">{title}</h3>
      {sub && <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

const Stepper = ({
  label,
  value,
  onChange,
  unit,
  step = 1,
  min = 0,
  hint,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  step?: number;
  min?: number;
  hint?: string;
  icon: string;
}) => {
  const n = parseNum(value);
  const set = (v: number) => onChange(String(Math.max(min, Math.round(v * 10) / 10)).replace(".", ","));
  return (
    <div className="rounded-2xl bg-black/15 border border-white/10 p-3">
      <div className="flex items-center gap-1.5 text-sm font-semibold text-white mb-2">
        <Icon name={icon} size={15} className="text-accent" />
        {label}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => set(n - step)}
          className="w-11 h-11 shrink-0 rounded-xl border border-accent/30 text-white hover:bg-accent/15 flex items-center justify-center"
          aria-label="Меньше"
        >
          <Icon name="Minus" size={16} />
        </button>
        <div className="relative flex-1 min-w-0">
          <input
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))}
            className="w-full h-11 rounded-xl bg-black/20 border border-accent/30 pl-3 pr-10 text-center text-white text-lg font-black focus:outline-none focus:border-accent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{unit}</span>
        </div>
        <button
          type="button"
          onClick={() => set(n + step)}
          className="w-11 h-11 shrink-0 rounded-xl border border-accent/30 text-white hover:bg-accent/15 flex items-center justify-center"
          aria-label="Больше"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

const BlockCalc = ({ items, onOrder }: { items: Material[]; onOrder: (item: Material, packs: number) => void }) => {
  const [mode, setMode] = useState<Mode>("walls");
  const [perimeter, setPerimeter] = useState("40");
  const [partLen, setPartLen] = useState("20");
  const [height, setHeight] = useState("3");
  const [windows, setWindows] = useState("6");
  const [doors, setDoors] = useState("2");
  const [thick, setThick] = useState<number | null>(null);
  const [selId, setSelId] = useState<number | null>(null);

  const all = useMemo(
    () =>
      items
        .map((it) => {
          const size = blockSize(it);
          const desc = it.description || "";
          const w = desc.match(/Монтажный вес блока\s*([\d,]+)/i);
          return {
            it,
            size,
            pack: packInfo(it),
            price: parseNum(it.price),
            factory: /поритеп/i.test(desc) ? "Поритеп" : /бор/i.test(desc) ? "г. Бор" : "",
            partition: /перегород/i.test(it.name) || (size ? size.t < 200 : false),
            kg: w ? parseFloat(w[1].replace(",", ".")) : 0,
          };
        })
        .filter((b) => b.size),
    [items],
  );

  const list = all.filter((b) => b.partition === (mode === "partitions"));
  const thicknesses = Array.from(new Set(list.map((b) => b.size!.t))).sort((a, b) => a - b);
  const defThick = mode === "walls" ? (thicknesses.includes(300) ? 300 : thicknesses[thicknesses.length - 1]) : (thicknesses.includes(100) ? 100 : thicknesses[0]);
  const curThick = thick && thicknesses.includes(thick) ? thick : defThick;
  const variants = list
    .filter((b) => b.size!.t === curThick)
    .sort((a, b) => b.size!.h - a.size!.h || a.price - b.price);
  const sel = variants.find((b) => b.it.id === selId) || variants[0];

  const switchMode = (m: Mode) => {
    setMode(m);
    setThick(null);
    setSelId(null);
  };

  if (!sel) return null;
  const { size, pack, price } = sel as typeof sel & { size: NonNullable<typeof sel.size> };

  const len = mode === "walls" ? parseNum(perimeter) : parseNum(partLen);
  const wallArea = len * parseNum(height);
  const openArea = mode === "walls" ? parseNum(windows) * 1.5 + parseNum(doors) * 2 : parseNum(doors) * 1.8;
  const area = Math.max(0, wallArea - openArea);
  const volume = area * (size.t / 1000);
  const volumeReserve = volume * 1.05;
  const blockVol = (size.l * size.h * size.t) / 1e9;
  const pcsNeed = Math.ceil(volumeReserve / blockVol);
  const perPack = pack.pcs || Math.round(pack.m3 / blockVol);
  const packs = Math.max(0, Math.ceil(pcsNeed / perPack));
  const totalM3 = packs * pack.m3;
  const cost = totalM3 * price;
  const rows = Math.ceil((parseNum(height) * 1000) / size.h);
  const perM2 = 1 / ((size.l / 1000) * (size.h / 1000));
  const blockKg = sel.kg || (pack.kg && perPack ? pack.kg / perPack : 0);
  const weightT = (packs * perPack * blockKg) / 1000;
  const glueBags = Math.ceil(totalM3);
  const packWord = plural(packs, "поддон", "поддона", "поддонов");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-card/60">
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center shadow-lg shadow-accent/20">
            <Icon name="Calculator" size={24} />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Калькулятор блоков</h2>
            <p className="text-sm text-muted-foreground">Ответьте на 3 вопроса — посчитаем поддоны, клей и стоимость</p>
          </div>
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_380px]">
        <div className="p-5 sm:p-8 space-y-8">
          <section>
            <StepTitle n={1} title="Что будем строить?" />
            <div className="grid grid-cols-2 gap-3">
              {([
                { m: "walls", icon: "Home", title: "Стены дома", sub: "Наружные несущие стены" },
                { m: "partitions", icon: "BrickWall", title: "Перегородки", sub: "Стены внутри дома" },
              ] as const).map((o) => {
                const active = mode === o.m;
                return (
                  <button
                    key={o.m}
                    type="button"
                    onClick={() => switchMode(o.m)}
                    className={`relative rounded-2xl border-2 p-4 text-left transition-all ${active ? "border-accent bg-accent/15 shadow-lg shadow-accent/10" : "border-white/10 bg-black/10 hover:border-accent/50"}`}
                  >
                    {active && <Icon name="CheckCircle2" size={20} className="absolute top-3 right-3 text-accent" />}
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 ${active ? "bg-accent text-black" : "bg-accent/10 text-accent"}`}>
                      <Icon name={o.icon} size={22} />
                    </span>
                    <p className="font-black text-white">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{o.sub}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <StepTitle
              n={2}
              title={mode === "walls" ? "Размеры дома" : "Размеры перегородок"}
              sub={mode === "walls" ? "Нажмите на размер дома или введите периметр сами" : "Сложите длину всех перегородок"}
            />
            {mode === "walls" && (
              <div className="flex flex-wrap gap-2 mb-3">
                {HOUSE_PRESETS.map((p) => {
                  const active = parseNum(perimeter) === p.p;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPerimeter(String(p.p))}
                      className={`px-3.5 h-10 rounded-xl text-sm font-bold border transition-all ${active ? "bg-accent text-black border-accent" : "border-accent/30 text-white hover:bg-accent/10"}`}
                    >
                      Дом {p.label} м
                    </button>
                  );
                })}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3">
              {mode === "walls" ? (
                <Stepper icon="Ruler" label="Периметр стен" unit="м" value={perimeter} onChange={setPerimeter} hint="Длина всех наружных стен вместе" />
              ) : (
                <Stepper icon="Ruler" label="Длина перегородок" unit="м" value={partLen} onChange={setPartLen} hint="Все перегородки вместе" />
              )}
              <Stepper icon="ArrowUpDown" label="Высота стен" unit="м" step={0.1} value={height} onChange={setHeight} hint="Обычно 2,7–3 м" />
              {mode === "walls" && (
                <Stepper icon="LayoutGrid" label="Окна" unit="шт" value={windows} onChange={setWindows} hint="≈ 1,5 м² каждое" />
              )}
              <Stepper icon="RectangleHorizontal" label="Двери" unit="шт" value={doors} onChange={setDoors} hint={mode === "walls" ? "≈ 2 м² каждая" : "≈ 1,8 м² каждая"} />
            </div>
          </section>

          <section>
            <StepTitle n={3} title="Толщина стены" sub="Толщина блока — это толщина будущей стены" />
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {thicknesses.map((t) => {
                const active = t === curThick;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setThick(t);
                      setSelId(null);
                    }}
                    className={`rounded-xl border-2 py-2.5 px-2 text-center transition-all ${active ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"}`}
                  >
                    <p className="text-xl font-black text-white leading-none">{t}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">мм</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent font-semibold">
              <Icon name="Sparkles" size={15} />
              {thicknessHint(curThick, mode)}
            </p>

            {variants.length > 1 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-white mb-2">Выберите блок толщиной {curThick} мм:</p>
                <div className="space-y-2">
                  {variants.map((b) => {
                    const active = b.it.id === sel.it.id;
                    return (
                      <button
                        key={b.it.id}
                        type="button"
                        onClick={() => setSelId(b.it.id)}
                        className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${active ? "border-accent bg-accent/10" : "border-white/10 hover:border-accent/50"}`}
                      >
                        <span className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${active ? "border-accent" : "border-white/30"}`}>
                          {active && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white">
                            {b.size!.l}×{b.size!.t}×{b.size!.h} мм
                            {b.pack.density && <span className="ml-2 px-1.5 py-0.5 rounded bg-black/30 text-[11px] text-accent">{b.pack.density}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {b.factory && `${b.factory} · `}высота {b.size!.h} мм{b.pack.pcs > 0 && ` · ${b.pack.pcs} шт в поддоне`}
                          </p>
                        </div>
                        <p className="text-sm font-black text-accent whitespace-nowrap">{b.price > 0 ? `${rub(b.price)}/м³` : ""}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="border-t lg:border-t-0 lg:border-l border-white/10 bg-black/10 p-5 sm:p-8">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">Ваш расчёт</p>

            <div className="rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/50 p-5 mb-4">
              <p className="text-sm text-muted-foreground">Нужно заказать</p>
              <p className="text-4xl font-black text-white leading-none mt-1">
                {packs} <span className="text-xl">{packWord}</span>
              </p>
              <p className="text-sm text-white/80 mt-1.5">
                {packs * perPack} блоков · {m3(Math.round(totalM3 * 100) / 100)}
              </p>
              <div className="h-px bg-accent/30 my-4" />
              <p className="text-sm text-muted-foreground">Стоимость блоков</p>
              <p className="text-3xl font-black text-accent leading-none mt-1">{price > 0 ? rub(cost) : "По запросу"}</p>
              {price > 0 && <p className="text-xs text-muted-foreground mt-1">{rub(price)} за м³ · без доставки</p>}
            </div>

            <p className="text-sm text-white/90 mb-3">
              <span className="text-muted-foreground">Блок: </span>
              <b>
                {size.l}×{size.t}×{size.h} мм {pack.density}
              </b>
              {sel.factory && <span className="text-muted-foreground"> · {sel.factory}</span>}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { icon: "Square", label: "Площадь кладки", value: `${num(area)} м²` },
                { icon: "Layers", label: "Рядов", value: `${rows}` },
                weightT > 0
                  ? { icon: "Weight", label: "Вес груза", value: `${num(weightT)} т` }
                  : { icon: "LayoutGrid", label: "Блоков на 1 м²", value: num(perM2) },
                { icon: "Package", label: "Клей 25 кг", value: `${glueBags} ${plural(glueBags, "мешок", "мешка", "мешков")}` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-black/20 p-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon name={s.icon} size={13} />
                    <p className="text-[12px]">{s.label}</p>
                  </div>
                  <p className="text-lg font-black text-white leading-tight">{s.value}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled={packs < 1}
              onClick={() => onOrder(sel.it, packs)}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/85 text-black text-base sm:text-lg font-black inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50"
            >
              <Icon name="ShoppingCart" size={20} />
              Заказать {packs} {packWord}
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Перезвоним, проверим расчёт и назовём цену доставки манипулятором
            </p>

            <details className="mt-4 rounded-xl bg-black/15 border border-white/10 px-4 py-3 text-sm text-muted-foreground">
              <summary className="cursor-pointer font-semibold text-white">Как мы посчитали?</summary>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>
                  Площадь: {num(len)} м × {num(parseNum(height))} м = {num(wallArea)} м², минус проёмы {num(openArea)} м² = {num(area)} м².
                </li>
                <li>
                  Объём: {num(area)} м² × {size.t / 1000} м = {num(volume, 2)} м³, +5% на подрезку = {num(volumeReserve, 2)} м³.
                </li>
                <li>
                  На 1 м² стены ≈ {num(perM2)} блока, всего ≈ {pcsNeed} шт.
                </li>
                <li>
                  В поддоне {perPack} шт ({m3(pack.m3)}) → {packs} {packWord}.
                </li>
              </ol>
            </details>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlockCalc;