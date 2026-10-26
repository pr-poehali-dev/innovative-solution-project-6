import Icon from "@/components/ui/icon";
import { trucks } from "@/components/sections/calculator/data";
import { WALL_THICKNESS } from "./brickUtils";

export type DeliveryInfo = { city: string; km: number; truck: string; trips: number; cost: number; local?: boolean };

export type Mode = "build" | "packs";
export type Shape = "box" | "wall";
export type ThicknessId = (typeof WALL_THICKNESS)[number]["id"];

export const WINDOW_M2 = 1.8;
export const DOOR_M2 = 1.9;
export const GATE_M2 = 6;
export const RESERVE = 1.05;
export const LOCAL_KM = 30;
export const MANIPULATORS = trucks
  .filter((t) => t.category === "Манипулятор")
  .map((t) => {
    const m = t.capacity.match(/[\d.,]+/);
    return { name: t.short || t.name, full: t.name, tons: m ? parseFloat(m[0].replace(",", ".")) : 5, price: t.price };
  })
  .filter((t, i, arr) => arr.findIndex((x) => x.tons === t.tons) === i)
  .sort((a, b) => a.tons - b.tons);

export type Manipulator = (typeof MANIPULATORS)[number];

export const PRESETS: {
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

export const num = (v: string) => Math.max(0, parseFloat(v.replace(",", ".")) || 0);
export const fmt = (v: number, d = 1) => v.toLocaleString("ru-RU", { maximumFractionDigits: d });

export const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-7 h-7 rounded-full bg-accent text-black text-sm font-black flex items-center justify-center shrink-0">{n}</span>
      <p className="text-white font-bold">{title}</p>
    </div>
    {children}
  </div>
);

export const NumField = ({
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
  <label className="flex flex-col h-full min-w-0">
    <span className="block truncate whitespace-nowrap text-[11px] sm:text-xs leading-4 mb-1 text-muted-foreground">{label}</span>
    <div className="mt-auto flex items-center rounded-xl border border-accent/25 bg-black/15 focus-within:border-accent">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent px-2 sm:px-3 py-2.5 text-white font-bold outline-none"
      />
      <span className="pr-2 sm:pr-3 text-xs text-muted-foreground">{suffix}</span>
    </div>
    {hint && <span className="block mt-1 text-[12.5px] text-muted-foreground/80">{hint}</span>}
  </label>
);

export const Counter = ({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint: string }) => (
  <div className="rounded-xl border border-white/10 bg-black/10 p-3 flex sm:block items-center justify-between gap-3">
    <div className="min-w-0">
      <p className="text-sm sm:text-xs text-white sm:text-muted-foreground font-bold sm:font-normal">{label}</p>
      <p className="text-[12.5px] sm:hidden text-muted-foreground/80">{hint}</p>
    </div>
    <div className="sm:mt-1.5 flex items-center gap-1 sm:justify-between shrink-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-11 h-11 sm:w-8 sm:h-8 rounded-lg border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
        aria-label={`Меньше: ${label}`}
      >
        <Icon name="Minus" size={16} />
      </button>
      <span className="w-9 text-center text-lg font-black text-white">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-11 h-11 sm:w-8 sm:h-8 rounded-lg border border-accent/30 text-white flex items-center justify-center hover:bg-accent/10"
        aria-label={`Больше: ${label}`}
      >
        <Icon name="Plus" size={16} />
      </button>
    </div>
    <p className="hidden sm:block mt-1 text-[12px] text-muted-foreground/80">{hint}</p>
  </div>
);

export const Row = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <div className="flex justify-between gap-3">
    <span className="text-muted-foreground">{label}</span>
    <span className={`text-right whitespace-nowrap ${strong ? "text-white font-black" : "text-white font-bold"}`}>{value}</span>
  </div>
);
