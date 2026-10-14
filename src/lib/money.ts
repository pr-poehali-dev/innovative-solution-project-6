export const money = (v: number) => {
  const r = Math.round(v);
  if (Math.abs(r) >= 1000) return `${r.toLocaleString("ru-RU").replace(/[\s\u00a0\u202f]/g, ".")} т.р`;
  return `${v.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽`;
};
