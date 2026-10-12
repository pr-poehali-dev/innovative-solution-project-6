import type { Material } from "@/data/materials";

export const PALLET_SIZE = 336;

export const MANUFACTURER = "Борский силикатный завод";

export type BrickFormat = "single" | "oneHalf";

export type Brick = Material & {
  priceNum: number;
  format: BrickFormat;
  hollow: boolean;
  facing: boolean;
  grade: string;
  size: string;
  palletPrice: number;
  palletWeight: number;
};

export const FORMAT_LABEL: Record<BrickFormat, string> = {
  single: "Одинарный",
  oneHalf: "Полуторный",
};

export const PURPOSES = [
  { id: "all", label: "Все", icon: "LayoutGrid" },
  { id: "walls", label: "Несущие стены", icon: "Building2" },
  { id: "light", label: "Лёгкие и тёплые", icon: "Thermometer" },
  { id: "facade", label: "Фасад", icon: "Sparkles" },
] as const;

export type PurposeId = (typeof PURPOSES)[number]["id"];

export const BRICK_COLORS = [
  { id: "white", label: "Белый", swatch: "#f4f4f2", match: [] as string[] },
  { id: "yellow", label: "Жёлтый", swatch: "#d9c56b", match: ["жёлт", "желт"] },
  { id: "pink", label: "Розовый", swatch: "#b8746f", match: ["розов", "красн"] },
  { id: "brown", label: "Коричневый", swatch: "#5a4033", match: ["коричн"] },
  { id: "marble", label: "Мраморный", swatch: "linear-gradient(135deg,#2f3338 0%,#6b7078 35%,#3a3e44 55%,#8a8f96 75%,#2f3338 100%)", match: ["мрамор", "чёрн", "черн"] },
] as const;

export type BrickColorId = (typeof BRICK_COLORS)[number]["id"];

export const brickColor = (name: string): BrickColorId => {
  const n = name.toLowerCase();
  const found = BRICK_COLORS.find((c) => c.match.some((m) => n.includes(m)));
  return found ? found.id : "white";
};

export const toBrick = (m: Material): Brick => {
  const n = m.name.toLowerCase();
  const priceNum = parseFloat((m.price || "0").replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const format: BrickFormat = n.includes("одинарн") ? "single" : "oneHalf";
  const gradeMatch = m.name.match(/М-?\s?(\d{2,3})/i);
  const weightMatch = (m.description || "").match(/Вес поддона\s*(\d+)/i);
  const hollow = n.includes("пустотел");
  const packMatch = (m.description || "").match(/336 шт\s*[—-]\s*([\d\s\u00a0]+)\s*₽/);
  const packPrice = packMatch ? Number(packMatch[1].replace(/[\s\u00a0]/g, "")) : 0;
  const sizeMatch = (m.description || "").match(/(\d{3})\s?[×x]\s?(\d{2,3})\s?[×x]\s?(\d{2,3})/);
  return {
    ...m,
    priceNum: packPrice > 0 ? packPrice / PALLET_SIZE : priceNum,
    format,
    hollow,
    facing: n.includes("лицев"),
    grade: gradeMatch ? `М${gradeMatch[1]}` : "",
    size: sizeMatch ? `${sizeMatch[1]}×${sizeMatch[2]}×${sizeMatch[3]} мм` : format === "single" ? "250×120×65 мм" : "250×120×88 мм",
    palletPrice: packPrice > 0 ? packPrice : priceNum * PALLET_SIZE,
    palletWeight: weightMatch ? Number(weightMatch[1]) : hollow ? 1340 : 1680,
  };
};

export const popularRank = (b: Brick) => {
  const c = brickColor(b.name);
  if (c === "white" && !b.hollow && !b.facing) return 0;
  if (c === "white" && b.hollow && !b.facing) return 1;
  if (c === "yellow") return 2;
  return 99;
};

export const isPopular = (b: Brick) => popularRank(b) < 99;

export const matchesPurpose = (b: Brick, p: PurposeId) => {
  if (p === "all") return true;
  if (p === "facade") return b.facing;
  if (p === "light") return b.hollow;
  return !b.hollow && !b.facing;
};

export const WALL_THICKNESS = [
  { id: "0.5", label: "В полкирпича", mm: "120 мм", hint: "Перегородки", perM2: { single: 51, oneHalf: 39 } },
  { id: "1", label: "В 1 кирпич", mm: "250 мм", hint: "Гаражи, хозпостройки", perM2: { single: 102, oneHalf: 78 } },
  { id: "1.5", label: "В 1,5 кирпича", mm: "380 мм", hint: "Стены дома", perM2: { single: 153, oneHalf: 117 } },
  { id: "2", label: "В 2 кирпича", mm: "510 мм", hint: "Несущие стены", perM2: { single: 204, oneHalf: 156 } },
] as const;

export const formatRub = (v: number) =>
  `${Math.round(v).toLocaleString("ru-RU")} ₽`;

export const priceText = (v: number) => (v > 0 ? formatRub(v) : "По запросу");

export const formatTons = (kg: number) => `${(kg / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} т`;

export const palletsFor = (qty: number) => Math.ceil(qty / PALLET_SIZE);
