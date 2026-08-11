import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";
import { MATERIAL_SEO_PAGES } from "@/data/materialsSeo";
import { MATERIAL_CATEGORIES } from "@/data/materials";

const groups = [
  {
    icon: "Blocks",
    title: "Купить кирпич с доставкой в Нижнем Новгороде",
    text: "Силикатный и керамический кирпич с доставкой манипулятором по Нижнему Новгороду и области. Отгружаем поддонами, разгружаем краном точно на месте кладки — не нужны грузчики.",
    queries: [
      "купить кирпич с доставкой манипулятором",
      "кирпич Нижний Новгород цена за штуку",
      "силикатный кирпич с доставкой",
      "керамический кирпич поддон доставка",
      "кирпич с доставкой и разгрузкой",
    ],
    cat: "/stroymaterialy/kirpich",
  },
  {
    icon: "Box",
    title: "Купить газосиликатные блоки с доставкой",
    text: "Газосиликатные и керамзитобетонные блоки с доставкой на объект. Считаем нужное количество поддонов и привозим одной машиной — от 1 поддона до полной фуры.",
    queries: [
      "купить газосиликатные блоки Нижний Новгород",
      "газоблок с доставкой манипулятором",
      "блоки для стен цена с доставкой",
      "керамзитобетонные блоки доставка",
      "пеноблок купить с разгрузкой",
    ],
    cat: "/stroymaterialy/bloki",
  },
  {
    icon: "Truck",
    title: "Аренда манипулятора в Нижнем Новгороде",
    text: "Аренда крана-манипулятора с оператором от 1500 ₽/час. Подача за 60 минут, работаем 24/7. Техника зарегистрирована в Ростехнадзоре, операторы с допусками.",
    queries: [
      "аренда манипулятора Нижний Новгород",
      "услуги манипулятора с оператором",
      "заказать манипулятор недорого",
      "манипулятор 5 тонн аренда",
      "вызвать манипулятор сегодня",
    ],
    cat: "/arenda-manipulyatora-nizhny-novgorod",
  },
  {
    icon: "Layers",
    title: "Плиты, бордюр, цемент и пиломатериалы",
    text: "Плиты перекрытия, дорожный и тротуарный бордюр, цемент, доска и брус. Возим длинномером и манипулятором — доставка на стройплощадку в день заказа.",
    queries: [
      "плиты перекрытия с доставкой",
      "бордюрный камень купить Нижний Новгород",
      "тротуарный бордюр с доставкой",
      "цемент мешками доставка",
      "пиломатериалы доска брус доставка",
    ],
    cat: "/stroymaterialy/plity",
  },
];

const MaterialsSeoBlock = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-accent/10">
    <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
      Купить стройматериалы с доставкой манипулятором в Нижнем Новгороде
    </h2>
    <p className="text-muted-foreground max-w-4xl mb-8 text-sm sm:text-base">
      Компания «Фаворит» — продажа строительных материалов и аренда манипулятора в одном месте.
      Кирпич, блоки, плиты, цемент, бордюр и пиломатериалы привозим собственным транспортом по
      Нижнему Новгороду, Бору, Дзержинску, Кстово, Арзамасу и области. Работаем с юр. лицами по
      договору, НДС и ЭДО. Заказ и расчёт по телефону {MATERIALS_PHONE_LABEL}.
    </p>

    <div className="grid sm:grid-cols-2 gap-5">
      {groups.map((g) => (
        <article
          key={g.title}
          className="rounded-2xl border border-accent/15 bg-card/40 p-5 hover:border-accent/40 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
              <Icon name={g.icon} size={20} className="text-accent" />
            </span>
              <Link to={g.cat} className="text-base sm:text-lg font-black text-white leading-tight hover:text-accent transition-colors">
              {g.title}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{g.text}</p>
          <div className="flex flex-wrap gap-2">
            {g.queries.map((q) => (
              <Link
                key={q}
                to={g.cat}
                className="text-xs px-3 py-1.5 rounded-full border border-accent/20 bg-background/40 text-muted-foreground hover:text-accent hover:border-accent/60 transition-colors"
              >
                {q}
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>

    <div className="mt-8">
      <p className="text-white font-black mb-3">Разделы каталога с доставкой:</p>
      <div className="flex flex-wrap gap-2">
        {MATERIAL_SEO_PAGES.map((p) => {
          const c = MATERIAL_CATEGORIES.find((x) => x.slug === p.cat);
          return (
            <Link
              key={p.slug}
              to={`/stroymaterialy/${p.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-card/40 text-sm font-semibold text-white hover:border-accent/60 hover:text-accent transition-colors"
            >
              <Icon name={c?.icon || "Package"} size={14} className="text-accent" />
              {c?.label || p.slug}
            </Link>
          );
        })}
      </div>
    </div>

    <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div>
        <p className="text-white font-black text-lg mb-1">Не нашли нужный материал?</p>
        <p className="text-sm text-muted-foreground">
          Привезём любой стройматериал под заказ — назовите объём, посчитаем цену с доставкой.
        </p>
      </div>
      <a
        href={`tel:${MATERIALS_PHONE}`}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-black whitespace-nowrap"
      >
        <Icon name="Phone" size={18} />
        {MATERIALS_PHONE_LABEL}
      </a>
    </div>
  </section>
);

export default MaterialsSeoBlock;
