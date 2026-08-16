import { buildSitemapEntries } from "@/lib/sitemapData";

export const INDEXNOW_URL = "https://functions.poehali.dev/20b064f2-7534-47ab-8a1e-ff6e58aee9b9";
export const SITE_PUNY = "https://xn--80aafz3bni.xn--p1ai";

export type PageGroup = {
  key: string;
  title: string;
  icon: string;
  urls: string[];
};

const groupOf = (loc: string): string => {
  const p = loc.replace(/^https?:\/\/[^/]+/, "");
  if (p === "/" || p === "") return "main";
  if (p.startsWith("/tehnika/")) return "tehnika";
  if (p.startsWith("/gorod/")) return "goroda";
  if (p.startsWith("/blog")) return "blog";
  if (p.startsWith("/stroymaterialy")) return "materialy";
  if (p.includes("asfalt") || p.includes("yamochnyy")) return "asfalt";
  return "uslugi";
};

const GROUP_META: Record<string, { title: string; icon: string }> = {
  main: { title: "Главная страница", icon: "Home" },
  uslugi: { title: "Услуги и посадочные страницы", icon: "Wrench" },
  tehnika: { title: "Страницы техники", icon: "Truck" },
  materialy: { title: "Стройматериалы", icon: "Package" },
  asfalt: { title: "Асфальтирование", icon: "Route" },
  goroda: { title: "Города и районы", icon: "MapPin" },
  blog: { title: "Блог", icon: "BookOpen" },
};

const ORDER = ["main", "uslugi", "tehnika", "materialy", "asfalt", "goroda", "blog"];

export const buildGroups = (): PageGroup[] => {
  const entries = buildSitemapEntries();
  const map = new Map<string, string[]>();
  entries.forEach((e) => {
    const g = groupOf(e.loc);
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(e.loc);
  });
  return ORDER.filter((k) => map.has(k)).map((k) => ({
    key: k,
    title: GROUP_META[k].title,
    icon: GROUP_META[k].icon,
    urls: map.get(k)!,
  }));
};

export const toPuny = (loc: string) =>
  loc.replace(/^https?:\/\/[^/]+/, SITE_PUNY);

export const yandexReindexUrl = (loc: string) =>
  `https://webmaster.yandex.ru/site/${encodeURIComponent(
    SITE_PUNY
  )}:443/indexing/reindex/?url=${encodeURIComponent(toPuny(loc))}`;

export const checklist = [
  {
    title: "Отправить страницы на переобход",
    text: "Нажмите «Отправить всё» ниже. Яндекс и Bing получат список страниц и поставят их в очередь на переобход. Делать это нужно после каждого изменения сайта.",
    icon: "Send",
  },
  {
    title: "Обновить карту сайта",
    text: "Если добавляли новые страницы, техника или статьи — скачайте свежий sitemap.xml на служебной странице и передайте мне, я положу его на сайт.",
    icon: "FileText",
  },
  {
    title: "Проверить регион в Вебмастере",
    text: "В Яндекс.Вебмастере регион сайта должен быть «Нижний Новгород». Без правильного региона сайт не показывается по локальным запросам.",
    icon: "MapPin",
  },
  {
    title: "Следить за позициями",
    text: "Через 2–3 недели после изменений проверьте раздел «Поисковые запросы» в Вебмастере — там видно, по каким фразам сайт вырос, а по каким просел.",
    icon: "TrendingUp",
  },
];
