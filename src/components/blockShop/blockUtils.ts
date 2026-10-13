import type { Material } from "@/data/materials";

export const PACK_M3 = 1.8;

export const parseNum = (s: string) => parseFloat((s || "0").replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

export const packInfo = (item: Material) => {
  const d = item.description || "";
  const vol = d.match(/(\d+[.,]\d+)\s*м³/);
  const pcs = d.match(/(\d+)\s*(?:шт|блок)/);
  const kg = d.match(/Вес поддона\s*(\d+)/i);
  const dens = (item.name + " " + d).match(/D\s?(\d{3})/);
  return {
    m3: vol ? parseFloat(vol[1].replace(",", ".")) : PACK_M3,
    pcs: pcs ? Number(pcs[1]) : 0,
    kg: kg ? Number(kg[1]) : 0,
    density: dens ? `D${dens[1]}` : "",
  };
};

export const blockSize = (item: Material) => {
  const s = (item.name + " " + (item.description || "")).match(/(\d{3})\s?[×x]\s?(\d{2,3})\s?[×x]\s?(\d{2,3})/);
  return s ? { l: Number(s[1]), h: Number(s[2]), t: Number(s[3]) } : null;
};

export const rub = (v: number) => `${Math.round(v).toLocaleString("ru-RU")} ₽`;
export const m3 = (v: number) => `${v.toLocaleString("ru-RU", { maximumFractionDigits: 3 })} м³`;
export const num = (v: number, d = 1) => v.toLocaleString("ru-RU", { maximumFractionDigits: d });
