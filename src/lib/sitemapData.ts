/**
 * Единый источник данных для sitemap.xml
 *
 * При добавлении новой техники / города / статьи —
 * автоматически берутся данные из articles.ts, cities.ts, trucksData.ts.
 *
 * Для обновления public/sitemap.xml скажи Юре: "обнови sitemap".
 */
import { articles } from "@/data/articles";
import { cities } from "@/data/cities";
import { trucks } from "@/pages/truck/trucksData";

export const SITE_DOMAIN = "https://xn--e1afamdhf.xn--p1ai";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

/**
 * Приоритет для городов: Нижний Новгород максимум, остальные по важности
 */
const getCityPriority = (slug: string): string => {
  if (slug === "nizhny-novgorod") return "0.95";
  const bigCities = ["kstovo", "dzerzhinsk", "bor"];
  return bigCities.includes(slug) ? "0.9" : "0.85";
};

/**
 * Собирает полный список URL для sitemap из реальных данных сайта
 */
export const buildSitemapEntries = (): SitemapEntry[] => {
  const today = new Date().toISOString().split("T")[0];
  const entries: SitemapEntry[] = [];

  // Главная
  entries.push({
    loc: `${SITE_DOMAIN}/`,
    lastmod: today,
    changefreq: "weekly",
    priority: "1.0",
  });

  // Страница отзывов
  entries.push({
    loc: `${SITE_DOMAIN}/otzyvy`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.85",
  });

  // Техника
  Object.keys(trucks).forEach((slug) => {
    entries.push({
      loc: `${SITE_DOMAIN}/tehnika/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.9",
    });
  });

  // Города
  cities.forEach((city) => {
    entries.push({
      loc: `${SITE_DOMAIN}/gorod/${city.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: getCityPriority(city.slug),
    });
  });

  // Главная блога
  entries.push({
    loc: `${SITE_DOMAIN}/blog`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  });

  // Статьи блога (дата из самой статьи)
  articles.forEach((article) => {
    entries.push({
      loc: `${SITE_DOMAIN}/blog/${article.slug}`,
      lastmod: article.date,
      changefreq: "monthly",
      priority: "0.75",
    });
  });

  return entries;
};

/**
 * Генерирует XML-контент sitemap
 */
export const generateSitemapXml = (): string => {
  const entries = buildSitemapEntries();

  const urlBlocks = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlocks}\n</urlset>\n`;
};
