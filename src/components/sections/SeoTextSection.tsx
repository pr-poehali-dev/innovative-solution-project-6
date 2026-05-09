import SectionBadge from "@/components/ui/SectionBadge";
import Icon from "@/components/ui/icon";

const cards = [
  {
    icon: "Wrench",
    badge: "УСЛУГИ",
    accent: "from-cyan-400 to-teal-500",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30",
    bullet: "bg-cyan-400",
    title: "Услуги манипулятора в Нижнем Новгороде",
    paragraphs: [
      "Выполняем услуги крана-манипулятора любой сложности: погрузка и разгрузка грузов, монтаж металлоконструкций, перевозка негабарита, работа с люлькой на высоте, бурение скважин под опоры и сваи.",
      "Стоимость услуг манипулятора — от 1500 ₽/час с оператором. Работаем по всему Нижнему Новгороду и области без выходных.",
    ],
    listTitle: "ЧТО ВКЛЮЧЕНО",
    list: ["Погрузка и разгрузка грузов", "Монтаж металлоконструкций", "Работа с люлькой и буром"],
    number: "01",
  },
  {
    icon: "HardHat",
    badge: "С ОПЕРАТОРОМ",
    accent: "from-amber-400 to-orange-500",
    accentText: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    bullet: "bg-amber-400",
    title: "Аренда манипулятора с оператором",
    paragraphs: [
      "Сдаём в аренду манипулятор на час, посуточно или на длительный срок. В стоимость аренды уже включена работа профессионального оператора с большим опытом.",
      "Вся техника прошла ТО и имеет действующие разрешения Ростехнадзора. Заказать манипулятор можно онлайн или по телефону — подача от 1 часа.",
    ],
    listTitle: "ПРЕИМУЩЕСТВА",
    list: ["Опытные операторы в штате", "Разрешения Ростехнадзора", "Подача от 1 часа"],
    number: "02",
  },
  {
    icon: "Truck",
    badge: "АВТОПАРК",
    accent: "from-blue-400 to-indigo-500",
    accentText: "text-blue-300",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    bullet: "bg-blue-400",
    title: "Аренда крана-манипулятора: техника на выбор",
    paragraphs: [
      "В нашем автопарке — 15 манипуляторов КАМАЗ, FAW, ISUZU и Renault с КМУ DongYang, Kanglim, HANGIL. Грузоподъёмность шасси до 20 тонн, вылет стрелы до 23 метров.",
      "Подберём манипулятор под ваш груз: бортовые платформы шириной до 2,45 м, есть модели с монтажной люлькой и буровой установкой.",
    ],
    listTitle: "В ПАРКЕ",
    list: ["15 единиц техники", "Грузоподъёмность до 20 т", "Стрела до 23 метров"],
    number: "03",
  },
  {
    icon: "BadgeRussianRuble",
    badge: "ЦЕНЫ",
    accent: "from-emerald-400 to-green-500",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    bullet: "bg-emerald-400",
    title: "Цены на услуги манипулятора",
    paragraphs: [
      "Стоимость аренды манипулятора зависит от грузоподъёмности и типа техники: от 1500 ₽/час, ISUZU 5т — от 2200 ₽/час, КАМАЗ 65115 — 2800 ₽/час, FAW с КМУ DongYang — 3000 ₽/час, КАМАЗ 43118 вездеход — 3500 ₽/час.",
      "Для корпоративных клиентов — индивидуальные тарифы, работа по договору, полный пакет документов и ЭДО.",
    ],
    listTitle: "ОПЛАТА",
    list: ["Наличные, карта, безнал", "Договор и закрывающие", "ЭДО для юр. лиц"],
    number: "04",
  },
];

const SeoTextSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <SectionBadge>О компании</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Аренда манипулятора и услуги манипулятора в Нижнем Новгороде
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto">
            ООО «Фаворит» — собственный автопарк крано-манипуляторных установок (КМУ) в Нижнем Новгороде и Нижегородской области. Предоставляем полный спектр услуг аренды манипулятора с оператором для строительных, промышленных и логистических задач.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((c) => (
            <article
              key={c.number}
              className={`relative overflow-hidden p-5 sm:p-7 rounded-2xl border ${c.accentBorder} bg-card/40 backdrop-blur-sm transition-all hover:bg-card/60 hover:scale-[1.01]`}
            >
              {/* Декоративный градиент */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${c.accent} opacity-[0.08] blur-3xl pointer-events-none`} />

              {/* Крупная цифра-фон */}
              <div className="absolute bottom-2 right-3 font-display font-black text-7xl sm:text-8xl text-white/[0.04] leading-none pointer-events-none select-none">
                {c.number}
              </div>

              <div className="relative">
                {/* Шапка: иконка + бейдж */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${c.accentBg} border ${c.accentBorder} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={c.icon} size={22} className={c.accentText} />
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${c.accentBg} border ${c.accentBorder} ${c.accentText} text-[10px] font-black tracking-widest`}>
                    {c.badge}
                  </div>
                </div>

                <h3 className="font-display font-black text-lg sm:text-xl text-white mb-3 leading-tight">
                  {c.title}
                </h3>

                {c.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 last:mb-0"
                  >
                    {p}
                  </p>
                ))}

                {/* Разделитель */}
                <div className={`mt-4 mb-3 h-px bg-gradient-to-r ${c.accent} opacity-30`} />

                {/* Список */}
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground/70 mb-2">
                  {c.listTitle}
                </div>
                <ul className="space-y-1.5">
                  {c.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.bullet} flex-shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Финальный CTA-блок */}
        <div className="relative overflow-hidden mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center">
              <Icon name="Phone" size={26} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="font-display font-black text-lg sm:text-2xl text-white mb-2">
                Заказать услуги манипулятора в Нижнем Новгороде
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Позвоните{" "}
                <a href="tel:+79601883084" className="text-accent font-bold hover:underline whitespace-nowrap">
                  +7 960 188-30-84
                </a>
                {" "}или оставьте заявку. Подберём технику, согласуем время подачи. Юр. и физ. лицам, наличные, карта, безнал с НДС, ЭДО.
              </p>
            </div>
            <a
              href="tel:+79601883084"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-black font-black text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <Icon name="Phone" size={16} />
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoTextSection;
