import Icon from "@/components/ui/icon";
import { WALL_THICKNESS } from "./brickUtils";
import { type Shape, type ThicknessId, Counter, NumField, PRESETS, Step, fmt } from "./calculatorParts";

interface BrickBuildStepsProps {
  preset: string;
  applyPreset: (id: string) => void;
  shape: Shape;
  setShape: (s: Shape) => void;
  length: string;
  setLength: (v: string) => void;
  width: string;
  setWidth: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  perimeter: number;
  windows: number;
  setWindows: (v: number) => void;
  doors: number;
  setDoors: (v: number) => void;
  gates: number;
  setGates: (v: number) => void;
  thickness: ThicknessId;
  setThickness: (v: ThicknessId) => void;
}

const BrickBuildSteps = ({
  preset,
  applyPreset,
  shape,
  setShape,
  length,
  setLength,
  width,
  setWidth,
  height,
  setHeight,
  perimeter,
  windows,
  setWindows,
  doors,
  setDoors,
  gates,
  setGates,
  thickness,
  setThickness,
}: BrickBuildStepsProps) => (
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
      <p className="mt-2 text-[12.5px] text-muted-foreground">Подставим типовые размеры — дальше поправьте под себя</p>
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
      <div className={`grid items-stretch gap-2 sm:gap-3 ${shape === "box" ? "grid-cols-3" : "grid-cols-2"}`}>
        <NumField label={shape === "box" ? "Длина" : "Длина стены"} value={length} onChange={setLength} suffix="м" />
        {shape === "box" && <NumField label="Ширина" value={width} onChange={setWidth} suffix="м" />}
        <NumField label="Высота стен" value={height} onChange={setHeight} suffix="м" />
      </div>
      {shape === "box" && (
        <p className="mt-2 text-[12.5px] text-muted-foreground">
          Наружные размеры здания. Периметр: {fmt(perimeter)} м
        </p>
      )}
    </Step>

    <Step n={4} title="Окна, двери, ворота">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
            <p className="text-[12.5px] text-muted-foreground">{w.mm}</p>
            <p className="text-[12.5px] text-accent/90">{w.hint}</p>
          </button>
        ))}
      </div>
    </Step>
  </>
);

export default BrickBuildSteps;
