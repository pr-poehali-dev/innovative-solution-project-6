import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE_TEL = "tel:+79601690990";

type WorkType = "new" | "overlay" | "patch";
type Thickness = 4 | 5 | 7;

const works: { id: WorkType; label: string; price: number }[] = [
  { id: "new", label: "Новая укладка", price: 450 },
  { id: "overlay", label: "Поверх старого", price: 380 },
  { id: "patch", label: "Ямочный ремонт", price: 600 },
];

const thicknessMul: Record<Thickness, number> = { 4: 0.9, 5: 1.0, 7: 1.25 };

const fmt = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n));

const AsphaltMiniCalc = () => {
  const [work, setWork] = useState<WorkType>("new");
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(8);
  const [thickness, setThickness] = useState<Thickness>(5);

  const area = useMemo(
    () => Math.max(0, Number(length) || 0) * Math.max(0, Number(width) || 0),
    [length, width],
  );

  const total = useMemo(() => {
    const workOpt = works.find((w) => w.id === work)!;
    const mul = work === "patch" ? 1 : thicknessMul[thickness];
    const base = work === "patch" ? 0 : area * 200;
    return area * workOpt.price * mul + base;
  }, [area, work, thickness]);

  const showResult = area > 0 && total > 0;

  return (
    <div className="rounded-2xl border border-accent/30 bg-black/40 backdrop-blur-sm p-4 sm:p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
          <Icon name="Calculator" size={16} className="text-accent" />
        </div>
        <div>
          <div className="font-display font-bold text-sm sm:text-base">
            Калькулятор стоимости
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            Узнайте цену за 15 секунд
          </div>
        </div>
      </div>

      {/* Work type */}
      <div>
        <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-bold">
          Тип работ
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {works.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setWork(w.id)}
              className={`px-2 py-2 rounded-lg text-[11px] sm:text-xs font-bold border-2 transition-all ${
                work === w.id
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-accent/20 bg-white/5 hover:border-accent/40 text-white/70"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5">
            Длина, м
          </div>
          <input
            type="number"
            min={0}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-lg bg-black/50 border-2 border-accent/20 focus:border-accent focus:outline-none text-white font-bold text-sm sm:text-base transition-colors"
          />
        </div>
        <div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5">
            Ширина, м
          </div>
          <input
            type="number"
            min={0}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-lg bg-black/50 border-2 border-accent/20 focus:border-accent focus:outline-none text-white font-bold text-sm sm:text-base transition-colors"
          />
        </div>
      </div>

      {/* Thickness */}
      {work !== "patch" && (
        <div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-bold">
            Толщина асфальта
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {([4, 5, 7] as Thickness[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setThickness(t)}
                className={`py-2 rounded-lg text-xs font-bold border-2 transition-all ${
                  thickness === t
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-accent/20 bg-white/5 hover:border-accent/40 text-white/70"
                }`}
              >
                {t} см
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      <div className="rounded-xl bg-gradient-to-br from-accent/20 via-accent/10 to-amber-500/10 border-2 border-accent/40 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-bold">
            Площадь
          </div>
          <div className="font-bold text-sm text-white">{fmt(area)} м²</div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-bold">
              Примерная стоимость
            </div>
            {showResult ? (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-accent tracking-tight">
                  {fmt(total)}
                </span>
                <span className="text-base sm:text-lg font-bold text-accent">₽</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-1">
                Укажите размеры
              </div>
            )}
          </div>
          {showResult && (
            <div className="text-[10px] sm:text-xs text-muted-foreground text-right">
              ≈ {fmt(total / Math.max(area, 1))} ₽/м²
            </div>
          )}
        </div>
      </div>

      <a
        href={PHONE_TEL}
        className="group flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-accent via-accent to-amber-500 text-black overflow-hidden hover:shadow-lg hover:shadow-accent/40 transition-all relative text-sm"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        <Icon name="Phone" size={15} className="relative animate-pulse" />
        <span className="relative">Узнать точную цену</span>
      </a>

      <p className="text-[10px] sm:text-[11px] text-muted-foreground text-center leading-relaxed">
        <Icon name="Info" size={10} className="inline text-accent mr-0.5 -mt-0.5" />
        Расчёт примерный. Финальная цена — после выезда замерщика.
      </p>
    </div>
  );
};

export default AsphaltMiniCalc;
