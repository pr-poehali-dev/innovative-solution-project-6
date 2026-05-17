export type Engine = "yandex" | "google";

export type Measurement = {
  date: string;
  position: number;
  engine: Engine;
};

export type Query = {
  id: string;
  text: string;
  measurements: Measurement[];
};

export const STORAGE_KEY = "seoPositions_v1";

export const DEFAULT_QUERIES: Query[] = [
  { id: "q1", text: "аренда манипулятора нижний новгород", measurements: [] },
  { id: "q2", text: "манипулятор нижний новгород", measurements: [] },
  { id: "q3", text: "услуги манипулятора нн", measurements: [] },
  { id: "q4", text: "аренда крана манипулятора нижний новгород", measurements: [] },
  { id: "q5", text: "манипулятор с люлькой нижний новгород", measurements: [] },
];

export const todayIso = () => new Date().toISOString().split("T")[0];

export const loadQueries = (): Query[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_QUERIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_QUERIES;
  } catch {
    return DEFAULT_QUERIES;
  }
};

export const saveQueries = (queries: Query[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  } catch {
    /* ignore */
  }
};

export const positionColor = (pos: number) => {
  if (pos <= 3) return "text-emerald-500";
  if (pos <= 10) return "text-amber-500";
  if (pos <= 20) return "text-orange-500";
  return "text-red-500";
};

export const positionBg = (pos: number) => {
  if (pos <= 3) return "bg-emerald-500/10 border-emerald-500/30";
  if (pos <= 10) return "bg-amber-500/10 border-amber-500/30";
  if (pos <= 20) return "bg-orange-500/10 border-orange-500/30";
  return "bg-red-500/10 border-red-500/30";
};

export const getLatest = (q: Query, engine: Engine): Measurement | null => {
  const filtered = q.measurements.filter((m) => m.engine === engine);
  if (filtered.length === 0) return null;
  return filtered.sort((a, b) => b.date.localeCompare(a.date))[0];
};

export const getChange = (q: Query, engine: Engine): number | null => {
  const filtered = q.measurements
    .filter((m) => m.engine === engine)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (filtered.length < 2) return null;
  const first = filtered[0].position;
  const last = filtered[filtered.length - 1].position;
  return first - last;
};
