import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { type Brick, type BrickFormat, FORMAT_LABEL, PALLET_SIZE, WALL_THICKNESS, formatTons, priceText, palletsFor } from "./brickUtils";

interface BrickCalculatorProps {
  bricks: Brick[];
  onAdd: (brick: Brick, qty: number) => void;
}

const BrickCalculator = ({ bricks, onAdd }: BrickCalculatorProps) => {
  const [length, setLength] = useState("10");
  const [height, setHeight] = useState("3");
  const [openings, setOpenings] = useState("0");
  const [thickness, setThickness] = useState<(typeof WALL_THICKNESS)[number]["id"]>("1");
  const formats = (Object.keys(FORMAT_LABEL) as BrickFormat[]).filter((f) => bricks.some((b) => b.format === f));
  const [format, setFormat] = useState<BrickFormat>(formats.includes("oneHalf") ? "oneHalf" : formats[0] || "oneHalf");
  const [brickId, setBrickId] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const options = bricks.filter((b) => b.format === format);
  const selected = options.find((b) => b.id === brickId) || options[0];

  const result = useMemo(() => {
    const num = (v: string) => Math.max(0, parseFloat(v.replace(",", ".")) || 0);
    const area = Math.max(0, num(length) * num(height) - num(openings));
    const t = WALL_THICKNESS.find((w) => w.id === thickness)!;
    const raw = area * t.perM2[format];
    const qty = Math.ceil((raw * 1.05) / 10) * 10;
    const pallets = palletsFor(qty);
    return { area, qty, pallets, orderQty: pallets * PALLET_SIZE };
  }, [length, height, openings, thickness, format]);

  const total = selected ? result.orderQty * selected.priceNum : 0;

  const field = (label: string, value: string, set: (v: string) => void, suffix: string) => (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-accent/25 bg-black/30 focus-within:border-accent">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => set(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-white font-bold outline-none"
        />
        <span className="pr-3 text-xs text-muted-foreground">{suffix}</span>
      </div>
    </label>
  );

  return (
    <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-card/70 to-black/40 p-5 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center">
          <Icon name="Calculator" size={22} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Сколько нужно кирпича?</h2>
          <p className="text-sm text-muted-foreground">Посчитаем по размерам стены с запасом 5%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {field("Длина стен", length, setLength, "м")}
            {field("Высота", height, setHeight, "м")}
            {field("Окна и двери", openings, setOpenings, "м²")}
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Толщина стены</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WALL_THICKNESS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setThickness(w.id)}
                  className={`rounded-xl border p-2.5 text-left transition-all ${
                    thickness === w.id ? "border-accent bg-accent/15" : "border-white/10 bg-white/5 hover:border-accent/50"
                  }`}
                >
                  <p className="text-sm font-bold text-white">{w.label}</p>
                  <p className="text-[11px] text-muted-foreground">{w.mm} · {w.hint}</p>
                </button>
              ))}
            </div>
          </div>

          {formats.length > 1 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Формат кирпича</p>
            <div className="flex gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFormat(f);
                    setBrickId(null);
                  }}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-bold transition-all ${
                    format === f ? "border-accent bg-accent text-black" : "border-white/10 bg-white/5 text-white hover:border-accent/50"
                  }`}
                >
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>
          </div>
          )}

          {options.length > 0 && (
            <label className="block">
              <span className="text-xs text-muted-foreground">Какой кирпич</span>
              <select
                value={selected?.id}
                onChange={(e) => setBrickId(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-accent/25 bg-[#0e1420] px-3 py-2.5 text-white font-semibold outline-none focus:border-accent"
              >
                {options.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="rounded-2xl border border-accent/30 bg-black/40 p-5 flex flex-col">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Результат</p>
          <div className="space-y-3 text-sm flex-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Площадь кладки</span>
              <span className="text-white font-bold">{result.area.toFixed(1)} м²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Нужно кирпича</span>
              <span className="text-white font-bold">{result.qty.toLocaleString("ru-RU")} шт</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Поддонов по {PALLET_SIZE} шт</span>
              <span className="text-white font-bold">{result.pallets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Общий вес</span>
              <span className="text-white font-bold">{selected ? formatTons(result.pallets * selected.palletWeight) : "—"}</span>
            </div>
            <div className="pt-3 border-t border-accent/20 flex justify-between items-end">
              <span className="text-muted-foreground">Стоимость</span>
              <span className="text-2xl font-black text-accent">{priceText(total)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {result.orderQty.toLocaleString("ru-RU")} шт — целые упаковки по {PALLET_SIZE} шт
            </p>
          </div>
          <button
            type="button"
            disabled={!selected || result.qty === 0}
            onClick={() => {
              if (!selected) return;
              onAdd(selected, result.orderQty);
              setDone(true);
              setTimeout(() => setDone(false), 1500);
            }}
            className={`mt-5 h-12 rounded-xl font-black inline-flex items-center justify-center gap-2 transition-all disabled:opacity-40 ${
              done ? "bg-emerald-500 text-black" : "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
            }`}
          >
            <Icon name={done ? "Check" : "ShoppingCart"} size={18} />
            {done ? "Добавлено в корзину" : "Добавить расчёт в корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrickCalculator;
