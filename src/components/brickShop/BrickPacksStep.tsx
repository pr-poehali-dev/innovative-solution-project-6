import Icon from "@/components/ui/icon";
import { type BrickFormat, WALL_THICKNESS } from "./brickUtils";
import { RESERVE, Step, fmt, num } from "./calculatorParts";

interface BrickPacksStepProps {
  packs: number;
  setPacks: React.Dispatch<React.SetStateAction<number>>;
  packQty: number;
  format: BrickFormat;
}

const BrickPacksStep = ({ packs, setPacks, packQty, format }: BrickPacksStepProps) => (
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
            <span className="text-muted-foreground min-w-0">
              Стена {w.label.toLowerCase()} <span className="text-white/50">({w.hint.toLowerCase()})</span>
            </span>
            <span className="text-white font-bold whitespace-nowrap">≈ {fmt(packQty / w.perM2[format] / RESERVE)} м²</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">С учётом швов раствора и запаса 5% на бой и подрезку</p>
    </div>
  </Step>
);

export default BrickPacksStep;
