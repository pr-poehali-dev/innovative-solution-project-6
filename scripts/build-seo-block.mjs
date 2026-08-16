/**
 * Генерирует SEO-блок для index.html: готовый текст главной страницы,
 * который поисковики видят сразу, без запуска JavaScript.
 * Запуск: node scripts/build-seo-block.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PHONE = "+7 960 188-30-84";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const out = path.join(root, "node_modules/.cache/prerender-data.mjs");
fs.mkdirSync(path.dirname(out), { recursive: true });
await esbuild.build({
  entryPoints: [path.join(root, "scripts/prerender-data.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: out,
  logLevel: "silent",
  alias: { "@": path.join(root, "src") },
});
const d = await import(`file://${out}?t=${Date.now()}`);

const { articles, cities, seoLandings, MATERIAL_SEO_PAGES, trucks, reviews, priceRows, terms } = d;

const parts = [];
parts.push(`<h1>Аренда манипулятора в Нижнем Новгороде</h1>`);
parts.push(
  `<p>ООО «Фаворит» — аренда манипуляторов с краном-манипуляторной установкой (КМУ) в Нижнем Новгороде и Нижегородской области с 2015 года. Собственный парк спецтехники грузоподъёмностью до 20 тонн, вылет стрелы до 23 метров, монтажная люлька. Подача техники от 1 часа в любой район города, оператор со стажем 10+ лет включён в стоимость. Работаем круглосуточно, по договору, с НДС и безналичным расчётом. Телефон: <a href="tel:+79601883084">${PHONE}</a>.</p>`
);

parts.push(`<h2>Техника в аренду и цены</h2>`);
parts.push(
  Object.entries(trucks)
    .map(
      ([slug, t]) =>
        `<h3><a href="/tehnika/${slug}">${esc(t.title)} — ${esc(t.price)}</a></h3><p>${esc(
          t.description
        )}</p>`
    )
    .join("")
);

parts.push(`<h2>Прайс-лист: цены на аренду техники</h2>`);
parts.push(
  `<p>Цены указаны за час работы вместе с оператором и включают НДС 22%. Топливо, подача в черте Нижнего Новгорода и работа стропальщика входят в стоимость. Минимальный заказ — 4 часа.</p>` +
    `<table><thead><tr><th>Техника</th><th>Грузоподъёмность</th><th>Вылет стрелы</th><th>Мин. заказ</th><th>Цена с НДС</th></tr></thead><tbody>` +
    priceRows
      .map(
        (r) =>
          `<tr><td><a href="/tehnika/${r.slug}">${esc(r.title)}</a></td><td>${esc(
            r.capacity
          )}</td><td>${esc(r.boom)}</td><td>${esc(r.minOrder)}</td><td>${esc(r.price)}</td></tr>`
      )
      .join("") +
    `</tbody></table>`
);

parts.push(`<h2>Условия работы и оплаты</h2>`);
parts.push(terms.map((t) => `<h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>`).join(""));

parts.push(`<h2>Услуги манипулятора</h2>`);
parts.push(
  Object.values(seoLandings)
    .map(
      (l) =>
        `<h3><a href="/${l.slug}">${esc(l.breadcrumb)}</a></h3><p>${esc(l.subtitle)}</p>`
    )
    .join("")
);

parts.push(`<h2>Доставка стройматериалов</h2>`);
parts.push(
  MATERIAL_SEO_PAGES.map(
    (m) => `<h3><a href="/stroymaterialy/${m.slug}">${esc(m.h1)}</a></h3><p>${esc(m.intro)}</p>`
  ).join("")
);

parts.push(`<h2>Асфальтирование</h2>`);
parts.push(
  `<p><a href="/asfaltirovanie">Асфальтирование в Нижнем Новгороде</a> под ключ от 450 ₽/м²: снятие грунта, отсыпка и трамбовка щебня, укладка асфальта, укатка катком. Гарантия 3 года, договор с НДС, бесплатный замер.</p>`
);

parts.push(`<h2>Города и районы обслуживания</h2>`);
parts.push(
  `<p>${cities
    .map((c) => `<a href="/gorod/${c.slug}">Манипулятор в ${esc(c.nameIn)}</a>`)
    .join(" · ")}</p>`
);

parts.push(`<h2>Отзывы клиентов</h2>`);
parts.push(
  reviews
    .slice(0, 15)
    .map((r) => `<p><b>${esc(r.name)}</b> (оценка ${r.rating}/5): ${esc(r.body)}</p>`)
    .join("")
);

parts.push(`<h2>Полезные статьи</h2>`);
parts.push(
  articles
    .map((a) => `<p><a href="/blog/${a.slug}">${esc(a.title)}</a> — ${esc(a.excerpt)}</p>`)
    .join("")
);

parts.push(
  `<h2>Контакты</h2><p>ООО «Фаворит», Нижний Новгород, Шуваловский проезд, 7. Телефон <a href="tel:+79601883084">${PHONE}</a>, <a href="tel:+79601690990">+7 960 169-09-90</a>. Работаем круглосуточно, без выходных.</p>`
);

const blockHtml = `<div id="seo-static">` + parts.join("") + `</div>`;

const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf-8");
const START = "<!-- SEO-STATIC-START -->";
const END = "<!-- SEO-STATIC-END -->";
const cleanup = `<script>if(location.pathname!=="/"){var b=document.getElementById("seo-static");if(b)b.remove();}</script>`;
const replacement = `<div id="root">${START}${blockHtml}${END}</div>${cleanup}`;

html = html.replace(
  /<div id="root">[\s\S]*?<\/div>\s*<script type="module"/,
  `${replacement}\n<script type="module"`
);
fs.writeFileSync(indexPath, html);
console.log(`SEO-блок обновлён, размер ${(blockHtml.length / 1024).toFixed(1)} КБ`);