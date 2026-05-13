import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/sections/SiteFooter";

const ASPHALT_IMG =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/78ce7324-bf4d-4f95-9518-8178c0fcaa2a.jpg";

const PHONE = "+7 (960) 169-09-90";
const PHONE_TEL = "tel:+79601690990";

const priceList = [
  {
    title: "Укладка асфальта",
    subtitle: "Под ключ, с подготовкой основания",
    price: "от 450",
    unit: "₽/м²",
    note: "Толщина слоя 5 см, мелкозернистый асфальтобетон",
    icon: "Layers",
    popular: true,
  },
  {
    title: "Ямочный ремонт",
    subtitle: "Заделка трещин, выбоин, провалов",
    price: "от 600",
    unit: "₽/м²",
    note: "Резка карт, обработка битумом, заполнение, уплотнение",
    icon: "Wrench",
  },
  {
    title: "Срезка старого асфальта",
    subtitle: "Фрезерование покрытия",
    price: "от 90",
    unit: "₽/м²",
    note: "Своя фреза, вывоз срезанного материала",
    icon: "Scissors",
  },
  {
    title: "Подготовка основания",
    subtitle: "Песок, щебень, виброкаток",
    price: "от 250",
    unit: "₽/м²",
    note: "Уплотнение в 3 слоя по ГОСТ 9128-2013",
    icon: "Hammer",
  },
  {
    title: "Установка бордюров",
    subtitle: "Дорожный и садовый камень",
    price: "от 550",
    unit: "₽/п.м",
    note: "С установкой на бетонное основание",
    icon: "RectangleHorizontal",
  },
  {
    title: "Разметка дорожная",
    subtitle: "Краска, термопластик",
    price: "от 70",
    unit: "₽/п.м",
    note: "Парковочные места, стрелки, обозначения",
    icon: "PaintBucket",
  },
];

const benefits = [
  {
    icon: "Truck",
    title: "Своя техника",
    text: "Асфальтоукладчики, катки, фрезы, манипуляторы. Не зависим от подрядчиков.",
  },
  {
    icon: "Zap",
    title: "Сроки от 1 дня",
    text: "Двор площадью до 500 м² укладываем за смену. Большие объёмы — по графику.",
  },
  {
    icon: "ShieldCheck",
    title: "Гарантия до 3 лет",
    text: "Прописываем в договоре. Любые дефекты по нашей вине устраняем бесплатно.",
  },
  {
    icon: "Award",
    title: "Работаем по ГОСТ",
    text: "ГОСТ 9128-2013 и СП 78.13330.2012. Сертификаты на материалы предоставляем.",
  },
  {
    icon: "FileCheck",
    title: "Договор и закрывающие",
    text: "Работаем с физлицами, юрлицами и муниципальными заказчиками.",
  },
  {
    icon: "Wallet",
    title: "Без предоплаты",
    text: "Замер и расчёт — бесплатно. Оплата по факту приёмки работ.",
  },
];

const stages = [
  {
    n: "01",
    title: "Бесплатный выезд замерщика",
    text: "Приедем на объект, замерим, оценим состояние основания. Расчёт за 15 минут.",
  },
  {
    n: "02",
    title: "Договор и смета",
    text: "Фиксируем объём, материалы, сроки и гарантию. Цена не меняется в процессе.",
  },
  {
    n: "03",
    title: "Подготовка основания",
    text: "Срезаем старое покрытие, отсыпаем щебень и песок, уплотняем катком.",
  },
  {
    n: "04",
    title: "Укладка асфальта",
    text: "Завозим горячий асфальтобетон, укладываем асфальтоукладчиком, прикатываем.",
  },
  {
    n: "05",
    title: "Сдача объекта",
    text: "Подписываем акты, передаём гарантийные обязательства. Покрытие готово к эксплуатации через 24 часа.",
  },
];

const objects = [
  { icon: "Home", title: "Дворы частных домов" },
  { icon: "Building2", title: "Парковки у магазинов и ТЦ" },
  { icon: "Warehouse", title: "Производственные площадки" },
  { icon: "Car", title: "Подъездные пути" },
  { icon: "MapPin", title: "Дороги в посёлках и СНТ" },
  { icon: "Trees", title: "Площадки и тротуары" },
];

const faq = [
  {
    q: "За сколько дней можно уложить асфальт?",
    a: "Двор площадью до 500 м² — за 1 рабочий день. Парковка 1000-2000 м² — 2-3 дня. Промышленные объёмы — по графику. Всё зависит от состояния основания и погоды.",
  },
  {
    q: "Какая гарантия на покрытие?",
    a: "Стандартная гарантия — 2 года, на ответственных объектах — до 3 лет. Прописываем в договоре. Если в гарантийный период появятся дефекты по нашей вине (трещины, проседания) — устраняем бесплатно.",
  },
  {
    q: "Работаете зимой?",
    a: "Укладку горячего асфальта проводим с апреля по октябрь — это требование ГОСТ. Зимой выполняем ямочный ремонт холодным асфальтом, фрезерование, подготовку оснований.",
  },
  {
    q: "Можно ли уложить асфальт без подготовки основания?",
    a: "Не рекомендуем. Без подготовки покрытие просядет за 1-2 сезона. Если основание ровное и хорошо уплотнено — возможна укладка поверх старого асфальта после фрезерования.",
  },
  {
    q: "Какая минимальная площадь?",
    a: "Берёмся от 50 м². На меньшие объёмы выезд экономически невыгоден из-за стоимости доставки техники и асфальта.",
  },
  {
    q: "Работаете по области или только в Нижнем Новгороде?",
    a: "Нижний Новгород, Кстово, Бор, Дзержинск, Богородск, Балахна, Павлово и вся Нижегородская область. Выезд в радиусе 100 км — без доплаты за доставку.",
  },
];

const AsfaltirovaniePage = () => {
  useEffect(() => {
    document.title =
      "Асфальтирование в Нижнем Новгороде — цена от 450 ₽/м² | Фаварит";

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Асфальтирование в Нижнем Новгороде и области под ключ от 450 ₽/м². Укладка асфальта, ямочный ремонт, парковки и дворы. Гарантия до 3 лет. Звоните: +7 960 169-09-90",
    );
    setMeta(
      "keywords",
      "асфальтирование нижний новгород, укладка асфальта нн, асфальтирование цена, асфальтирование дворов, асфальтирование парковок, ямочный ремонт, асфальтирование под ключ, асфальт нижегородская область",
    );

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Асфальтирование",
      areaServed: { "@type": "City", name: "Нижний Новгород" },
      provider: {
        "@type": "LocalBusiness",
        name: "Фаварит",
        telephone: "+79601690990",
      },
      offers: {
        "@type": "Offer",
        price: "450",
        priceCurrency: "RUB",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "450",
          priceCurrency: "RUB",
          unitText: "м²",
        },
      },
    };

    const oldScript = document.getElementById("asphalt-jsonld");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "asphalt-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify([faqSchema, serviceSchema]);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("asphalt-jsonld");
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="page-enter min-h-screen">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-accent/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-accent/40 transition-all"
          >
            <Icon name="Phone" size={14} />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={ASPHALT_IMG}
            alt="Асфальтирование Нижний Новгород"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 mb-4">
              <span className="text-base animate-pulse">🔥</span>
              <span className="text-red-300 font-bold text-xs sm:text-sm tracking-wider">
                СЕЗОННАЯ СКИДКА 15% ДО КОНЦА МЕСЯЦА
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-white to-accent/50 bg-clip-text text-transparent">
                Асфальтирование в Нижнем Новгороде
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed">
              Укладка асфальта под ключ от{" "}
              <span className="text-accent font-bold">450 ₽/м²</span>. Своя
              техника, гарантия до 3 лет, работаем по ГОСТ. Бесплатный замер и
              расчёт за 15 минут.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={PHONE_TEL}
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-black bg-gradient-to-r from-accent via-accent to-amber-500 text-black overflow-hidden hover:shadow-2xl hover:shadow-accent/40 transition-all"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <Icon name="Phone" size={20} className="relative animate-pulse" />
                <span className="relative text-base sm:text-lg">{PHONE}</span>
              </a>
              <a
                href="#price"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold bg-white/5 border border-accent/30 text-white hover:bg-accent/10 transition-all"
              >
                <Icon name="ListChecks" size={18} />
                Смотреть прайс
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {[
                { v: "12+", l: "лет на рынке" },
                { v: "850+", l: "объектов сдано" },
                { v: "3 года", l: "гарантия" },
                { v: "24/7", l: "приём заявок" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/5 border border-accent/20 backdrop-blur-sm p-3 sm:p-4"
                >
                  <div className="text-xl sm:text-3xl font-display font-black text-accent">
                    {s.v}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
              Почему выбирают нас
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Делаем асфальтирование с 2013 года. За плечами — дороги, парковки и
            промплощадки в Нижнем Новгороде и области.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group p-5 sm:p-6 rounded-2xl bg-card/40 border border-accent/20 hover:border-accent/50 hover:bg-card/70 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={b.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price list */}
      <section id="price" className="px-4 sm:px-6 py-12 sm:py-20 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-4">
              <Icon name="Tag" size={14} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Прайс-лист
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Цены на асфальтирование
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Финальная цена зависит от объёма, состояния основания и удалённости
              объекта. Точная смета — после бесплатного выезда замерщика.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {priceList.map((item, i) => (
              <div
                key={i}
                className={`relative group p-5 sm:p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                  item.popular
                    ? "border-accent/60 bg-gradient-to-br from-accent/10 via-card/60 to-amber-500/5"
                    : "border-accent/20 bg-card/50 hover:border-accent/40"
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-black text-[10px] font-black tracking-wider shadow-lg">
                    ★ ПОПУЛЯРНОЕ
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={22} className="text-accent" />
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  {item.subtitle}
                </p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">от</span>
                  <span className="text-3xl sm:text-4xl font-black text-accent">
                    {item.price}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {item.unit}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed border-t border-accent/10 pt-3">
                  <Icon
                    name="Info"
                    size={11}
                    className="inline text-accent mr-1 -mt-0.5"
                  />
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-card/60 border border-accent/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="Calculator" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-base sm:text-lg">
                    Нужна точная цена для вашего объекта?
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Расскажите про объёмы — посчитаем за 15 минут
                  </p>
                </div>
              </div>
              <a
                href={PHONE_TEL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:shadow-lg hover:shadow-accent/40 transition-all whitespace-nowrap"
              >
                <Icon name="Phone" size={16} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
              Как мы работаем
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
            Пять понятных этапов от заявки до сдачи объекта
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((s, i) => (
              <div
                key={i}
                className="relative p-5 rounded-2xl bg-card/40 border border-accent/20 hover:border-accent/50 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-display font-black text-accent/30 mb-2">
                  {s.n}
                </div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objects */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
              Какие объекты делаем
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
            От маленького двора до промышленной площадки в 10 000 м²
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {objects.map((o, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-card/50 border border-accent/20 hover:border-accent/50 hover:bg-card/80 transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-3">
                  <Icon name={o.icon} size={22} className="text-accent" />
                </div>
                <div className="font-bold text-sm sm:text-base">{o.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
              Частые вопросы
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
            Если вашего вопроса нет — звоните, ответим
          </p>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-card/40 border border-accent/20 hover:border-accent/50 transition-all"
              >
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-3 list-none">
                  <span className="font-bold text-sm sm:text-base">
                    {item.q}
                  </span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className="text-accent flex-shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 via-card/80 to-amber-500/10 p-6 sm:p-10 lg:p-12 text-center">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tighter mb-3">
                <span className="bg-gradient-to-r from-white to-accent/50 bg-clip-text text-transparent">
                  Готовы рассчитать ваш объект?
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Позвоните прямо сейчас — назовём цену, согласуем дату выезда
                замерщика и пришлём смету
              </p>

              <a
                href={PHONE_TEL}
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black bg-gradient-to-r from-accent via-accent to-amber-500 text-black overflow-hidden hover:shadow-2xl hover:shadow-accent/50 transition-all relative"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <Icon name="Phone" size={22} className="relative animate-pulse" />
                <span className="relative text-lg sm:text-2xl">{PHONE}</span>
              </a>

              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  На связи прямо сейчас · Без выходных · Замер бесплатно
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AsfaltirovaniePage;
