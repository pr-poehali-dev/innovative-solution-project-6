import type { Material } from "@/data/materials";

export const PALLET_SIZE = 240;

export type BrickFormat = "single" | "oneHalf";

export type Brick = Material & {
  priceNum: number;
  format: BrickFormat;
  hollow: boolean;
  facing: boolean;
  grade: string;
  size: string;
  palletPrice: number;
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

export const toBrick = (m: Material): Brick => {
  const n = m.name.toLowerCase();
  const priceNum = parseFloat((m.price || "0").replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const format: BrickFormat = n.includes("одинарн") ? "single" : "oneHalf";
  const gradeMatch = m.name.match(/М-?\s?(\d{2,3})/i);
  const sizeMatch = (m.description || "").match(/(\d{3})\s?[×x]\s?(\d{2,3})\s?[×x]\s?(\d{2,3})/);
  return {
    ...m,
    priceNum,
    format,
    hollow: n.includes("пустотел"),
    facing: n.includes("лицев"),
    grade: gradeMatch ? `М${gradeMatch[1]}` : "",
    size: sizeMatch ? `${sizeMatch[1]}×${sizeMatch[2]}×${sizeMatch[3]} мм` : format === "single" ? "250×120×65 мм" : "250×120×88 мм",
    palletPrice: priceNum * PALLET_SIZE,
  };
};

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

export const palletsFor = (qty: number) => Math.ceil(qty / PALLET_SIZE);
