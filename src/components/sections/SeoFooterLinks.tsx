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
      { label: "Манипулятор с буровой установкой" },
      { label: "Аренда крана-манипулятора" },
      { label: "Манипулятор для монтажа" },
      { label: "Разгрузка манипулятором" },
      { label: "Перевозка негабаритных грузов" },
    ],
  },
  {
    title: "География работы",
    icon: "MapPin",
    links: cities.map((c) => ({
      label: `Манипулятор в ${c.nameIn}`,
      to: `/gorod/${c.slug}`,
    })),
  },
  {
    title: "Техника в аренду",
    icon: "Truck",
    links: [
      { label: "Манипулятор 5 тонн" },
      { label: "Манипулятор 10 тонн" },
      { label: "Манипулятор 12 тонн" },
      { label: "Манипулятор 17 тонн" },
      { label: "КАМАЗ с манипулятором" },
      { label: "FAW с КМУ DongYang" },
      { label: "КАМАЗ 43118 вездеход" },
      { label: "ISUZU 5т с КМУ" },
      { label: "Экскаватор-погрузчик JCB" },
    ],
  },
  {
    title: "Для бизнеса",
    icon: "Briefcase",
    links: [
      { label: "Аренда манипулятора для строительства" },
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

const SeoFooterLinks = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {linkGroups.map((group, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl border border-accent/15 bg-card/30">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent/15">
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={group.icon} size={15} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white">
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

        <div className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
          ООО «Фаворит» — аренда манипулятора и услуги крана-манипулятора в Нижнем Новгороде и Нижегородской области.
          Собственный автопарк КМУ DongYang, Kanglim, HANGIL на шасси КАМАЗ, FAW, ISUZU, Renault.
          Грузоподъёмность до 17 тонн, вылет стрелы до 23 метров. Подача от 1 часа, работа без выходных.
          Стоимость услуг манипулятора — от 1800 ₽/час с оператором.
        </div>
      </div>
    </section>
  );
};

export default SeoFooterLinks;