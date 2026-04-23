import { useState } from "react";
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

interface CollapsibleColumnProps {
  icon: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleColumn = ({ icon, title, defaultOpen = false, children }: CollapsibleColumnProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-accent/10 md:border-b-0 md:pb-0 pb-3">
      {/* Кнопка — только на мобильных */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden w-full flex items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <h3 className="font-display font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#e8a820" }}>
          <Icon name={icon} size={14} />
          {title}
        </h3>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-accent/70" />
      </button>
      {/* Статичный заголовок — на планшете и десктопе */}
      <h3 className="hidden md:flex font-display font-black text-sm uppercase tracking-widest mb-4 items-center gap-2" style={{ color: "#e8a820" }}>
        <Icon name={icon} size={14} />
        {title}
      </h3>
      {/* Контент */}
      <div className={`${open ? "block" : "hidden"} md:block pb-3 md:pb-0`}>
        {children}
      </div>
    </div>
  );
};

const LinkItem = ({ label }: { label: string }) => (
  <span className="inline-flex items-start gap-1.5 leading-snug">
    <span className="text-accent/40 group-hover:text-accent flex-shrink-0">›</span>
    <span>{label}</span>
  </span>
);

const SiteFooter = () => {
  return (
    <footer className="relative border-t border-accent/20 bg-gradient-to-b from-background to-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Верхний блок с колонками */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* Колонка 1 — О компании (всегда видна полностью) */}
          <div className="md:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" />
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4 mb-4 max-w-md">
              Собственный автопарк манипуляторов в Нижнем Новгороде. Работаем с 2015 года. Аренда техники с опытным оператором.
            </p>

            {/* Крупные кнопки звонка */}
            <div className="flex flex-col gap-2.5 mb-4">
              <a
                href="tel:+79601883084"
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/15 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={18} className="text-black" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-black/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Позвонить</span>
                  <span className="text-black font-black text-base sm:text-lg tabular-nums">+7 960 188-30-84</span>
                </div>
              </a>
              <a
                href="tel:+79601690990"
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/10 transition-colors"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="PhoneCall" size={18} className="text-accent" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-accent/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Запасной номер</span>
                  <span className="text-white font-black text-base sm:text-lg tabular-nums">+7 960 169-09-90</span>
                </div>
              </a>
            </div>

            {/* Email и адрес */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:960188@list.ru"
                className="inline-flex items-center gap-2 text-muted-foreground text-xs sm:text-sm hover:text-accent transition-colors break-all"
              >
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={12} className="text-accent" />
                </div>
                960188@list.ru
              </a>
              <div className="inline-flex items-start gap-2 text-muted-foreground text-xs sm:text-sm">
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={12} className="text-accent" />
                </div>
                <span className="mt-1">Нижний Новгород,<br className="sm:hidden" /> Шуваловский проезд, 7</span>
              </div>
              <div className="inline-flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={12} className="text-accent" />
                </div>
                <span>Работаем без выходных · с 7:00 до 22:00</span>
              </div>
            </div>
          </div>

          {/* Колонка 2 — Разделы сайта */}
          <CollapsibleColumn icon="Layout" title="Разделы сайта">
            <ul className="space-y-2 sm:space-y-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-muted-foreground text-xs sm:text-sm hover:text-accent transition-colors group"
                  >
                    <LinkItem label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleColumn>

          {/* Колонка 3 — Города */}
          <CollapsibleColumn icon="MapPin" title="Города работы">
            <ul className="space-y-2 sm:space-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/gorod/${c.slug}`}
                    className="text-muted-foreground text-xs sm:text-sm hover:text-accent transition-colors group"
                  >
                    <LinkItem label={c.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleColumn>

          {/* Колонка 4 — Техника */}
          <CollapsibleColumn icon="Truck" title="Наш автопарк">
            <ul className="space-y-2 sm:space-y-2.5">
              {trucks.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/tehnika/${t.slug}`}
                    className="text-muted-foreground text-xs sm:text-sm hover:text-accent transition-colors group"
                  >
                    <LinkItem label={t.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleColumn>
        </div>
      </div>

      {/* Нижняя полоска */}
      <div className="border-t border-accent/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-muted-foreground/80">
          <p className="text-center sm:text-left order-2 sm:order-1 leading-relaxed">
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов<br className="sm:hidden" /> в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
            <a
              href="https://webmaster.yandex.ru/siteinfo/?site=https://фаварит.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img
                width="88"
                height="31"
                alt="Яндекс.Метрика"
                style={{ borderRadius: "6px" }}
                src="https://yandex.ru/cycounter?https://фаварит.рф&theme=light&lang=ru"
              />
            </a>
            <a href="/sitemap.xml" className="hover:text-accent transition-colors whitespace-nowrap">
              Карта сайта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;