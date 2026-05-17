import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

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
  {
    title: "Асфальтирование",
    icon: "Sparkles",
    links: [
      { label: "Асфальтирование в Нижнем Новгороде", to: "/asfaltirovanie" },
      { label: "Асфальтирование Нижегородской области", to: "/asfaltirovanie-nizhny-novgorod" },
      { label: "Укладка асфальта под ключ", to: "/asfaltirovanie" },
      { label: "Асфальтирование дворов", to: "/asfaltirovanie" },
      { label: "Асфальтирование парковок", to: "/asfaltirovanie" },
      { label: "Ямочный ремонт асфальта", to: "/asfaltirovanie" },
      { label: "Асфальтирование цена за м²", to: "/asfaltirovanie" },
      { label: "Калькулятор асфальтирования", to: "/asfaltirovanie" },
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