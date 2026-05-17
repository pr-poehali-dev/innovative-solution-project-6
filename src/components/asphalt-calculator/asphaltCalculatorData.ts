export const PHONE_TEL = "tel:+79601690990";
export const PHONE = "+7 (960) 169-09-90";

export type WorkType = "new" | "patch" | "overlay";
export type Thickness = 4 | 5 | 7 | 10;
export type Base = "none" | "light" | "full";
export type Extras = {
  curb: boolean;
  marking: boolean;
  removal: boolean;
};

export interface WorkOption {
  id: WorkType;
  title: string;
  subtitle: string;
  icon: string;
  pricePerM2: number;
}

export const workOptions: WorkOption[] = [
  {
    id: "new",
    title: "Новая укладка",
    subtitle: "С подготовкой основания",
    icon: "Layers",
    pricePerM2: 450,
  },
  {
    id: "overlay",
    title: "Поверх старого",
    subtitle: "На существующее покрытие",
    icon: "PlusSquare",
    pricePerM2: 380,
  },
  {
    id: "patch",
    title: "Ямочный ремонт",
    subtitle: "Заделка выбоин и трещин",
    icon: "Wrench",
    pricePerM2: 600,
  },
];

export const thicknessOptions: { value: Thickness; label: string; multiplier: number }[] = [
  { value: 4, label: "4 см", multiplier: 0.9 },
  { value: 5, label: "5 см", multiplier: 1.0 },
  { value: 7, label: "7 см", multiplier: 1.25 },
  { value: 10, label: "10 см", multiplier: 1.55 },
];

export const baseOptions: { value: Base; title: string; subtitle: string; addPerM2: number }[] = [
  { value: "none", title: "Не требуется", subtitle: "Основание готово", addPerM2: 0 },
  { value: "light", title: "Лёгкая подготовка", subtitle: "Подсыпка, выравнивание", addPerM2: 150 },
  { value: "full", title: "Полная подготовка", subtitle: "Щебень + песок + уплотнение", addPerM2: 350 },
];

export const fmt = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n));
