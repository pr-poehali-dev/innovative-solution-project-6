export const MIN_HOURS = 4;
export const WORK_HOURS = 1.8;

export const RATE_CLASSES: { maxTons: number; label: string; rate: number }[] = [
  { maxTons: 5, label: "до 5 т", rate: 100 },
  { maxTons: 6, label: "до 6 т", rate: 105 },
  { maxTons: 10, label: "до 10 т", rate: 115 },
  { maxTons: 12, label: "до 12 т", rate: 120 },
  { maxTons: 15, label: "до 15 т", rate: 125 },
  { maxTons: Infinity, label: "до 17 т", rate: 130 },
];

export const kmRateFor = (tons: number) =>
  (RATE_CLASSES.find((c) => tons <= c.maxTons) || RATE_CLASSES[RATE_CLASSES.length - 1]).rate;

export const tonsFromCapacity = (capacity: string) => {
  const m = capacity.match(/[\d.,]+/);
  return m ? parseFloat(m[0].replace(",", ".")) : 5;
};

export const tripCost = (km: number, tons: number, hourly: number) => {
  const byKm = Math.round(km * 2 * kmRateFor(tons) + hourly * WORK_HOURS);
  return Math.max(byKm, hourly * MIN_HOURS);
};

export const roundTo = (n: number, step = 100) => Math.round(n / step) * step;

export const KM_RATES: Record<string, number> = {
  "ISUZU 5т + КМУ": 85,
  "Hino 500 + КМУ Kanglim KS1256G-II": 90,
  "КАМАЗ 65115 + КМУ HANGIL": 95,
  "FAW + КМУ DongYang": 120,
  "Hyundai Gold + КМУ HIAB 190TM": 125,
  "RENAULT LANDER + КМУ": 110,
  "КАМАЗ 43118 + КМУ Kanglim": 135,
  "FAW J6 + КМУ DONGYANG 1966": 115,
};

export const materialTripCost = (km: number, tons: number, hourly: number, name: string) => {
  const rate = KM_RATES[name];
  if (!rate) return tripCost(km, tons, hourly);
  return Math.round(km * 2 * rate + hourly * WORK_HOURS);
};
