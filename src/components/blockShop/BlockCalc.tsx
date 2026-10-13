import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import type { Material } from "@/data/materials";
import { blockSize, m3, num, packInfo, parseNum, rub } from "./blockUtils";

const wallHint = (t: number, h: number) => {
  if (t >= 400) return "Тёплый дом без утепления";
  if (t >= 300) return h >= 250 ? "Дом — меньше рядов, быстрее кладка" : "Дом — лёгкий блок, удобно класть";
  return "Гараж, баня, хозпостройка";
};

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2.5 mb-3">
      <span className="w-7 h-7 rounded-full bg-accent text-black text-sm font-black flex items-center justify-center">{n}</span>
      <h3 className="text-base sm:text-lg font-black text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const Field = ({ label, hint, value, onChange, unit }: { label: string; hint: string; value: string; onChange: (v: string) => void; unit: string }) => (
  <label className="block">
    <span className="text-sm font-semibold text-white">{label}</span>
    <div className="relative mt-1">
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))}
        className="w-full h-12 rounded-xl bg-black/20 border border-accent/30 pl-3 pr-12 text-white text-lg font-bold focus:outline-none focus:border-accent"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{unit}</span>
    </div>
    <span className="block mt-1 text-xs text-muted-foreground">{hint}</span>
  </label>
);

const BlockCalc = ({ items, onOrder }: { items: Material[]; onOrder: (item: Material, packs: number) => void }) => {
  const [perimeter, setPerimeter] = useState("40");
  const [height, setHeight] = useState("3");
  const [windows, setWindows] = useState("6");
  const [doors, setDoors] = useState("2");

  const blocks = useMemo(
    () =>
      items
        .map((it) => ({ it, size: blockSize(it), pack: packInfo(it), price: parseNum(it.price) }))
        .filter((b) => b.size)
        .sort((a, b) => b.size!.t - a.size!.t || b.size!.h - a.size!.h),
    [items],
  );
  const [selId, setSelId] = useState<number | null>(null);
  const sel = blocks.find((b) => b.it.id === selId) || blocks.find((b) => b.size!.t === 300) || blocks[0];

  if (!sel) return null;
  const { size, pack, price } = sel as typeof sel & { size: NonNullable<typeof sel.size> };

  const wallArea = parseNum(perimeter) * parseNum(height);
  const openArea = parseNum(windows) * 1.5 + parseNum(doors) * 2;
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
  const weightT = (packs * pack.kg) / 1000;
  const glueBags = Math.ceil(totalM3);
  const blockKg = pack.kg && perPack ? pack.kg / perPack : 0;

  return (
    <div className="rounded-3xl border border-accent/30 bg-card/60 p-5 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-11 h-11 rounded-xl bg-accent text-black flex items-center justify-center">
          <Icon name="Calculator" size={22} />
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Калькулятор газоблоков</h2>
          <p className="text-sm text-muted-foreground">3 шага — и вы знаете, сколько поддонов заказать и сколько это стоит</p>
        </div>
      </div>

      <Step n={1} title="Размеры стен">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Периметр стен" unit="м" value={perimeter} onChange={setPerimeter} hint="Сложите длину всех наружных стен. Дом 10×10 м = 40 м" />
          <Field label="Высота стен" unit="м" value={height} onChange={setHeight} hint="От фундамента до перекрытия, обычно 2,7–3 м" />
          <Field label="Окон" unit="шт" value={windows} onChange={setWindows} hint="Считаем ~1,5 м² на одно окно" />
          <Field label="Дверей" unit="шт" value={doors} onChange={setDoors} hint="Считаем ~2 м² на одну дверь" />
        </div>
      </Step>

      <Step n={2} title="Выберите блок">
        <p className="text-xs text-muted-foreground -mt-1 mb-3">Толщина блока = толщина стены. Чем толще — тем теплее дом.</p>
        <div className="grid sm:grid-cols-3 gap-2">
          {blocks.map((b) => {
            const active = b.it.id === sel.it.id;
            const kg = b.pack.kg && b.pack.pcs ? Math.round(b.pack.kg / b.pack.pcs) : 0;
            return (
              <button
                key={b.it.id}
                type="button"
                onClick={() => setSelId(b.it.id)}
                className={`relative rounded-xl border p-3 text-left transition-all ${active ? "border-accent bg-accent/15" : "border-white/15 hover:border-accent/50"}`}
              >
                {active && <Icon name="CircleCheck" size={18} className="absolute top-2.5 right-2.5 text-accent" />}
                <p className="text-xs text-muted-foreground">Стена</p>
                <p className="text-2xl font-black text-white leading-none mb-1">{b.size!.t} мм</p>
                <p className="text-sm font-semibold text-accent">Блок {b.size!.l}×{b.size!.h}×{b.size!.t}</p>
                <p className="text-xs text-muted-foreground mt-1">{wallHint(b.size!.t, b.size!.h)}</p>
                <p className="text-xs text-white/70 mt-2">
                  {b.pack.pcs > 0 && `${b.pack.pcs} шт в поддоне`}
                  {kg > 0 && ` · ${kg} кг/шт`}
                </p>
              </button>
            );
          })}
        </div>
      </Step>

      <Step n={3} title="Результат">
        <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/50 p-4 sm:p-5 mb-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Нужно заказать</p>
              <p className="text-3xl sm:text-4xl font-black text-white leading-none">
                {packs} <span className="text-xl">поддон{packs === 1 ? "" : packs > 1 && packs < 5 ? "а" : "ов"}</span>
              </p>
              <p className="text-sm text-white/80 mt-1">
                {packs * perPack} блоков · {m3(Math.round(totalM3 * 100) / 100)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Стоимость блоков</p>
              <p className="text-3xl sm:text-4xl font-black text-accent leading-none">{price > 0 ? rub(cost) : "По запросу"}</p>
              <p className="text-xs text-muted-foreground mt-1">{price > 0 && `${rub(price)} за м³ · доставка отдельно`}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {[
            { icon: "Square", label: "Площадь кладки", value: `${num(area)} м²`, sub: `стены ${num(wallArea)} − проёмы ${num(openArea)}` },
            { icon: "Layers", label: "Рядов кладки", value: `${rows}`, sub: `по ${size.h} мм в высоту` },
            { icon: "Weight", label: "Вес груза", value: weightT > 0 ? `${num(weightT)} т` : "—", sub: blockKg ? `блок ≈ ${Math.round(blockKg)} кг` : "" },
            { icon: "PaintBucket", label: "Клей", value: `${glueBags} меш.`, sub: "по 25 кг, ~25 кг на 1 м³" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-black/20 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon name={s.icon} size={13} />
                <p className="text-[11px]">{s.label}</p>
              </div>
              <p className="text-lg font-black text-white">{s.value}</p>
              {s.sub && <p className="text-[11px] text-muted-foreground leading-tight">{s.sub}</p>}
            </div>
          ))}
        </div>

        <details className="rounded-xl bg-black/15 border border-white/10 px-4 py-3 text-sm text-muted-foreground">
          <summary className="cursor-pointer font-semibold text-white">Как мы посчитали?</summary>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Площадь стен: {num(parseNum(perimeter))} м × {num(parseNum(height))} м = {num(wallArea)} м², минус окна и двери ({num(openArea)} м²) = {num(area)} м².</li>
            <li>Объём: {num(area)} м² × {size.t / 1000} м (толщина) = {num(volume, 2)} м³, плюс 5% на подрезку = {num(volumeReserve, 2)} м³.</li>
            <li>Один блок {size.l}×{size.h}×{size.t} — это {num(blockVol, 3)} м³, на 1 м² стены уходит ≈ {num(perM2)} шт. Всего нужно ≈ {pcsNeed} шт.</li>
            <li>В поддоне {perPack} шт ({m3(pack.m3)}) → округляем вверх до {packs} поддонов.</li>
          </ol>
        </details>
      </Step>

      <button
        type="button"
        disabled={packs < 1}
        onClick={() => onOrder(sel.it, packs)}
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/85 text-black text-lg font-black inline-flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Icon name="ShoppingCart" size={20} />
        Заказать {packs} поддон{packs === 1 ? "" : packs > 1 && packs < 5 ? "а" : "ов"} с доставкой
      </button>
      <p className="text-xs text-muted-foreground text-center mt-2">Перезвоним, уточним расчёт и стоимость доставки манипулятором</p>
    </div>
  );
};

export default BlockCalc;
