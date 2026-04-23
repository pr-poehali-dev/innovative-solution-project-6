import Icon from "@/components/ui/icon";

const linkGroups = [
  {
    title: "Популярные услуги",
    icon: "Wrench",
    links: [
      "Аренда манипулятора с оператором",
      "Услуги манипулятора с люлькой",
      "Манипулятор с буровой установкой",
      "Аренда крана-манипулятора",
      "Манипулятор для монтажа",
      "Услуги автовышки",
      "Разгрузка манипулятором",
      "Перевозка негабаритных грузов",
    ],
  },
  {
    title: "География работы",
    icon: "MapPin",
    links: [
      "Аренда манипулятора в Нижнем Новгороде",
      "Манипулятор в Кстово",
      "Услуги манипулятора в Дзержинске",
      "Манипулятор в Богородске",
      "Аренда манипулятора в Боре",
      "Манипулятор в Арзамасе",
      "Услуги в Павлово",
      "Аренда в Балахне",
      "Манипулятор в Городце",
      "По Нижегородской области",
    ],
  },
  {
    title: "Техника в аренду",
    icon: "Truck",
    links: [
      "Манипулятор 5 тонн",
      "Манипулятор 10 тонн",
      "Манипулятор 12 тонн",
      "Манипулятор 17 тонн",
      "КАМАЗ с манипулятором",
      "FAW с КМУ DongYang",
      "КАМАЗ 43118 вездеход",
      "ISUZU 5т с КМУ",
      "Экскаватор-погрузчик JCB",
    ],
  },
  {
    title: "Для бизнеса",
    icon: "Briefcase",
    links: [
      "Аренда манипулятора для строительства",
      "Услуги для ЖКХ",
      "Манипулятор для промышленности",
      "Монтаж металлоконструкций",
      "Работа с НДС и ЭДО",
      "Корпоративные тарифы",
      "Длительная аренда техники",
      "Работа по договору",
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
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="tel:+79601883084"
                      className="inline-flex items-start gap-1.5 text-muted-foreground text-xs sm:text-sm leading-snug hover:text-accent transition-colors group"
                    >
                      <span className="text-accent/50 group-hover:text-accent mt-0.5 flex-shrink-0">›</span>
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
          ООО «Фаворит» — аренда манипулятора и услуги крана-манипулятора в Нижнем Новгороде и Нижегородской области.
          Собственный автопарк КМУ DongYang, Kanglim, HANGIL на шасси КАМАЗ, FAW, ISUZU, Renault.
          Грузоподъёмность до 17 тонн, вылет стрелы до 23 метров. Подача от 1 часа, работа без выходных.
          Стоимость услуг манипулятора — от 2200 ₽/час с оператором.
        </div>
      </div>
    </section>
  );
};

export default SeoFooterLinks;
