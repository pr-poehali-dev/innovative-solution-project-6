import SectionBadge from "@/components/ui/SectionBadge";

const SeoTextSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
      <div className="max-w-5xl mx-auto">
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
          <article className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-lg sm:text-xl text-white mb-3">
              Услуги манипулятора в Нижнем Новгороде
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
              Выполняем услуги крана-манипулятора любой сложности: погрузка и разгрузка грузов, монтаж металлоконструкций, перевозка негабарита, работа с люлькой на высоте, бурение скважин под опоры и сваи.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Стоимость услуг манипулятора — от 2200 ₽/час с оператором. Работаем по всему Нижнему Новгороду и области без выходных.
            </p>
          </article>

          <article className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-lg sm:text-xl text-white mb-3">
              Аренда манипулятора с оператором
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
              Сдаём в аренду манипулятор на час, посуточно или на длительный срок. В стоимость аренды манипулятора уже включена работа профессионального оператора с большим опытом.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Вся техника прошла ТО и имеет действующие разрешения Ростехнадзора. Заказать манипулятор можно онлайн или по телефону — подача от 1 часа.
            </p>
          </article>

          <article className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-lg sm:text-xl text-white mb-3">
              Аренда крана-манипулятора: техника на выбор
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
              В нашем автопарке — манипуляторы КАМАЗ, FAW, ISUZU и Renault с КМУ DongYang, Kanglim, HANGIL. Грузоподъёмность шасси до 17 тонн, вылет стрелы до 23 метров.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Подберём манипулятор под ваш груз: бортовые платформы шириной до 2,45 м, есть модели с монтажной люлькой и буровой установкой.
            </p>
          </article>

          <article className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-lg sm:text-xl text-white mb-3">
              Цены на услуги манипулятора
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
              Стоимость аренды манипулятора зависит от грузоподъёмности и типа техники: ISUZU 5т — от 2200 ₽/час, КАМАЗ 65115 — 2800 ₽/час, FAW с КМУ DongYang — 3000 ₽/час, КАМАЗ 43118 вездеход — 3500 ₽/час.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Для корпоративных клиентов — индивидуальные тарифы, работа по договору, полный пакет документов и ЭДО.
            </p>
          </article>
        </div>

        <div className="mt-8 sm:mt-12 text-center p-5 sm:p-7 rounded-2xl border border-accent/30 bg-accent/5">
          <h3 className="font-display font-black text-lg sm:text-2xl text-white mb-3">
            Заказать услуги манипулятора в Нижнем Новгороде
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Для заказа аренды манипулятора позвоните по телефону{" "}
            <a href="tel:+79601883084" className="text-accent font-bold hover:underline">
              +7 960 188-30-84
            </a>
            {" "}или оставьте заявку на сайте. Мы оперативно уточним задачу, подберём подходящий манипулятор и согласуем время подачи. Работаем с юридическими и физическими лицами, принимаем оплату наличными, картой и по безналу с НДС.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeoTextSection;
