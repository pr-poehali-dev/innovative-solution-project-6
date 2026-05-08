import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

interface LinkItem {
  label: string;
  to?: string;
}

interface LinkGroup {
  title: string;
  icon: string;
  links: LinkItem[];
}

const linkGroups: LinkGroup[] = [
  {
    title: "Популярные услуги",
    icon: "Wrench",
    links: [
      { label: "Аренда манипулятора Нижний Новгород", to: "/arenda-manipulyatora-nizhny-novgorod" },
      { label: "Услуги манипулятора", to: "/uslugi-manipulyatora" },
      { label: "Манипулятор с люлькой", to: "/manipulyator-s-lyulkoy" },
      { label: "Манипулятор с буром", to: "/tehnika/faw-j6-dongyang-1966" },
      { label: "Аренда крана-манипулятора", to: "/uslugi-manipulyatora" },
      { label: "Все отзывы клиентов", to: "/otzyvy" },
      { label: "Блог о манипуляторах", to: "/blog" },
      { label: "Контакты и реквизиты", to: "/privacy" },
    ],
  },
  {
    title: "Техника в аренду",
    icon: "Truck",
    links: [
      { label: "FAW с КМУ DongYang (17 т)", to: "/tehnika/faw-kmu-dongyoung" },
      { label: "КАМАЗ 65115 + HANGIL", to: "/tehnika/kamaz-65115-hangil" },
      { label: "КАМАЗ 43118 вездеход", to: "/tehnika/kamaz-43118-kanglim" },
      { label: "FAW J6 + DONGYANG с буром", to: "/tehnika/faw-j6-dongyang-1966" },
      { label: "Renault Lander с КМУ", to: "/tehnika/renault-lander-kmu" },
      { label: "Hyundai Gold + HIAB 8 т", to: "/tehnika/hyundai-gold-kmu-8t" },
      { label: "Hino 500 + Kanglim 7 т", to: "/tehnika/hino-500-kmu-7t" },
      { label: "ISUZU 5т с КМУ", to: "/tehnika/isuzu-5t-kmu" },
      { label: "Экскаватор-погрузчик JCB 4CX", to: "/tehnika/jcb-4cx" },
      { label: "Экскаватор-погрузчик JCB 3CX", to: "/tehnika/jcb-3cx" },
    ],
  },
  {
    title: "Для бизнеса",
    icon: "Briefcase",
    links: [
      { label: "Аренда для строительства", to: "/uslugi-manipulyatora" },
      { label: "Услуги для ЖКХ" },
      { label: "Манипулятор для промышленности" },
      { label: "Монтаж металлоконструкций" },
      { label: "Работа с НДС и ЭДО" },
      { label: "Корпоративные тарифы" },
      { label: "Длительная аренда техники" },
      { label: "Работа по договору" },
    ],
  },
];

const normalize = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

const SeoFooterLinks = () => {
  const [query, setQuery] = useState("");
  const filteredCities = useMemo(() => {
    const q = normalize(query);
    if (!q) return cities;
    return cities.filter((c) => normalize(c.name).includes(q) || normalize(c.nameIn).includes(q));
  }, [query]);

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-accent/10 bg-accent/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-display font-black text-xl sm:text-2xl text-white/90 mb-2">
            Услуги и аренда манипулятора в Нижнем Новгороде
          </h2>
          <p className="text-muted-foreground text-sm">
            Работаем по всей Нижегородской области — выберите подходящую услугу
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {linkGroups.map((group, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl border border-accent/15 bg-card/30">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent/15">
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={group.icon} size={15} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                  {group.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {group.links.map((link, j) => {
                  const baseClass =
                    "inline-flex items-start gap-1.5 text-muted-foreground text-xs sm:text-sm leading-snug hover:text-accent transition-colors group";
                  const inner = (
                    <>
                      <span className="text-accent/50 group-hover:text-accent mt-0.5 flex-shrink-0">›</span>
                      <span>{link.label}</span>
                    </>
                  );
                  return (
                    <li key={j}>
                      {link.to ? (
                        <Link to={link.to} className={baseClass}>
                          {inner}
                        </Link>
                      ) : (
                        <a href="tel:+79601883084" className={baseClass}>
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* География работы — компактные чипы */}
        <div className="p-4 sm:p-5 rounded-2xl border border-accent/15 bg-card/30">
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-3 border-b border-accent/15">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={15} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                География работы
              </h3>
            </div>
            <span className="text-[11px] font-bold text-accent shrink-0 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30">
              {query ? `${filteredCities.length} из ${cities.length}` : `${cities.length} городов`}
            </span>
          </div>

          {/* Поиск */}
          <div className="relative mb-3 sm:mb-4">
            <Icon
              name="Search"
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти город — например, Кстово, Бор, Дзержинск"
              className="w-full pl-9 pr-9 py-2 rounded-full bg-background/60 border border-accent/20 text-xs sm:text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/60 focus:bg-background/80 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-accent/15 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={12} className="text-muted-foreground" />
              </button>
            )}
          </div>

          {filteredCities.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {filteredCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/gorod/${c.slug}`}
                  title={`Манипулятор в ${c.nameIn}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/[0.06] border border-accent/20 text-[11px] sm:text-xs text-muted-foreground hover:bg-accent/15 hover:border-accent/50 hover:text-accent transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-xs text-muted-foreground">
              Город не найден. Позвоните — выезжаем по всей области:{" "}
              <a href="tel:+79601883084" className="text-accent hover:underline whitespace-nowrap">
                +7 960 188-30-84
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
          ООО «Фаворит» — аренда манипулятора и услуги крана-манипулятора в Нижнем Новгороде и Нижегородской области.
          Собственный автопарк КМУ DongYang, Kanglim, HANGIL на шасси КАМАЗ, FAW, ISUZU, Renault.
          Грузоподъёмность до 20 тонн, вылет стрелы до 23 метров. Подача от 1 часа, работа без выходных.
          Стоимость услуг манипулятора — от 1500 ₽/час с оператором.
        </div>
      </div>
    </section>
  );
};

export default SeoFooterLinks;