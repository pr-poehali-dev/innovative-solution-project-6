import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import BrandLogo from "@/components/ui/BrandLogo";
import { cities } from "@/data/cities";

const trucks = [
  { slug: "faw-kmu-dongyoung", label: "FAW + КМУ DongYang" },
  { slug: "kamaz-65115-hangil", label: "КАМАЗ 65115 + HANGIL" },
  { slug: "kamaz-43118-kanglim", label: "КАМАЗ 43118 вездеход" },
  { slug: "faw-j6-dongyang-1966", label: "FAW J6 + DONGYANG 1966" },
  { slug: "renault-lander-kmu", label: "Renault Lander + КМУ" },
  { slug: "isuzu-5t-kmu", label: "ISUZU 5т + КМУ" },
  { slug: "jcb-4cx", label: "JCB 4CX" },
  { slug: "jcb-3cx", label: "JCB 3CX" },
];

const sections = [
  { href: "/#features", label: "Преимущества" },
  { href: "/#fleet", label: "Техника" },
  { href: "/#usecases", label: "Услуги" },
  { href: "/#how", label: "Как это работает" },
  { href: "/#pricing", label: "Тарифы" },
  { href: "/#gallery", label: "Портфолио" },
];

const SiteFooter = () => {
  return (
    <footer className="relative border-t border-accent/20 bg-gradient-to-b from-background to-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Верхний блок с колонками */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Колонка 1 — О компании */}
          <div>
            <BrandLogo size="sm" />
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-4 mb-4">
              Собственный автопарк манипуляторов в Нижнем Новгороде. Работаем с 2015 года. Аренда техники с опытным оператором.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+79601883084"
                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-accent transition-colors"
              >
                <Icon name="Phone" size={14} className="text-accent" />
                +7 960 188-30-84
              </a>
              <a
                href="mailto:960188@list.ru"
                className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
              >
                <Icon name="Mail" size={14} className="text-accent" />
                960188@list.ru
              </a>
              <div className="inline-flex items-start gap-2 text-muted-foreground text-xs">
                <Icon name="MapPin" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <span>Нижний Новгород, Шуваловский проезд, 7</span>
              </div>
            </div>
          </div>

          {/* Колонка 2 — Разделы сайта */}
          <div>
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#e8a820" }}>
              <Icon name="Layout" size={14} />
              Разделы сайта
            </h3>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-accent/40 group-hover:text-accent">›</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 — Города */}
          <div>
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#e8a820" }}>
              <Icon name="MapPin" size={14} />
              Города работы
            </h3>
            <ul className="space-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/gorod/${c.slug}`}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-accent/40 group-hover:text-accent">›</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 4 — Техника */}
          <div>
            <h3 className="font-display font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#e8a820" }}>
              <Icon name="Truck" size={14} />
              Наш автопарк
            </h3>
            <ul className="space-y-2">
              {trucks.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/tehnika/${t.slug}`}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-accent/40 group-hover:text-accent">›</span>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя полоска */}
      <div className="border-t border-accent/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground/80">
          <p className="text-center md:text-left">
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://webmaster.yandex.ru/siteinfo/?site=https://фаварит.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                width="88"
                height="31"
                alt="Яндекс.Метрика"
                style={{ borderRadius: "6px" }}
                src="https://yandex.ru/cycounter?https://фаварит.рф&theme=light&lang=ru"
              />
            </a>
            <a href="/sitemap.xml" className="hover:text-accent transition-colors">
              Карта сайта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
