export type Material = {
  id: number;
  name: string;
  category: string;
  price: string;
  unit: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
};

export const MATERIALS_API = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

export type CategoryBanner = {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  bullets: { icon: string; title: string; text: string }[];
};

export const CATEGORY_BANNERS: Record<string, CategoryBanner> = {
  kirpich: {
    image: "/images/kirpich-banner.jpg",
    title: "Кирпич силикатный",
    subtitle: "Прочные стены, ровная кладка, аккуратный фасад",
    text: "Полнотелый и пустотелый силикатный кирпич для несущих стен, перегородок и облицовки. Ровная геометрия — кладка идёт быстро, расход раствора меньше. Привезём нужный объём и разгрузим манипулятором точно там, где ведутся работы.",
    bullets: [
      { icon: "ShieldCheck", title: "Марка М150–М200", text: "Морозостойкость F35, ГОСТ 379-2015" },
      { icon: "Truck", title: "Доставка от 1 поддона", text: "Своим транспортом по городу и области" },
      { icon: "Crane", title: "Разгрузка манипулятором", text: "Ставим поддоны прямо на площадку" },
      { icon: "FileText", title: "Работаем с юр. лицами", text: "Договор, НДС, ЭДО, безнал" },
    ],
  },
};

export const MATERIAL_CATEGORIES = [
  { slug: "kirpich", label: "Кирпич силикатный", icon: "Blocks" },
  { slug: "bloki", label: "Газосиликатные блоки", icon: "Box" },
  { slug: "plity", label: "Плиты и перемычки", icon: "Layers" },
  { slug: "cement", label: "Цемент и сухие смеси", icon: "Package" },
  { slug: "pilomaterialy", label: "Пиломатериалы", icon: "TreePine" },
  { slug: "asfalt-beton", label: "Асфальт и бетон", icon: "Truck" },
  { slug: "bordyur", label: "Бордюр", icon: "Grid3x3" },
  { slug: "bytovki", label: "Бытовки и контейнеры", icon: "Container" },
] as const;

export async function fetchMaterials(): Promise<Material[]> {
  const res = await fetch(MATERIALS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "materials-list" }),
  });
  if (!res.ok) throw new Error("Не удалось загрузить каталог");
  const data = await res.json();
  return data.items || [];
}

export async function addMaterial(adminKey: string, item: Partial<Material>) {
  const res = await fetch(MATERIALS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "materials-add", adminKey, ...item }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка добавления");
  return data;
}

export async function updateMaterial(adminKey: string, item: Partial<Material>) {
  const res = await fetch(MATERIALS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "materials-update", adminKey, ...item }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка сохранения");
  return data;
}

export async function deleteMaterial(adminKey: string, id: number) {
  const res = await fetch(MATERIALS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "materials-delete", adminKey, id }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка удаления");
  return data;
}

export async function uploadMaterialPhoto(file: File): Promise<string> {
  const base64: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const res = await fetch(MATERIALS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "upload-media",
      filename: file.name,
      mime: file.type,
      data: base64,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Не удалось загрузить фото");
  return data.url;
}