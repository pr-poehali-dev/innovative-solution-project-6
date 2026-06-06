const SeoMeta = () => {
  const title = "Аренда манипулятора в Нижнем Новгороде от 1500 ₽/час ☎ Фаворит — свой парк 15 машин";
  const description = "Аренда манипулятора в Нижнем Новгороде от 1500 ₽/час с НДС. Свой парк из 15 машин: грузоподъёмность до 17 т, стрела до 23 м, люлька, бур. Оператор включён, подача за 60 минут, работаем 24/7. Договор для юр.лиц, ЭДО, безнал. ☎ +7 (960) 188-30-84 — Фаворит, опыт 10+ лет.";
  // Расширенный список ключей: 4 главных запроса в начале (приоритет), затем расширения и LSI
  const keywords = [
    // ТОП-4 главных запроса (точные вхождения)
    "аренда манипулятора",
    "аренда манипулятора Нижний Новгород",
    "аренда манипулятора в Нижнем Новгороде",
    "услуги манипулятора",
    "услуги манипулятора Нижний Новгород",
    "услуги манипулятора в Нижнем Новгороде",
    // Морфология и синонимы
    "манипулятор Нижний Новгород",
    "манипулятор в аренду",
    "арендовать манипулятор",
    "заказать манипулятор",
    "заказать манипулятор в Нижнем Новгороде",
    "вызвать манипулятор",
    "манипулятор с оператором",
    "манипулятор Нижний Новгород цена",
    "манипулятор цена час",
    // Расширения по технике
    "аренда крана-манипулятора",
    "кран-манипулятор Нижний Новгород",
    "КМУ аренда",
    "КМУ Нижний Новгород",
    "манипулятор с люлькой",
    "манипулятор с буром",
    "манипулятор с гидробуром",
    // По грузоподъёмности
    "аренда манипулятора 3 тонны",
    "аренда манипулятора 5 тонн",
    "аренда манипулятора 7 тонн",
    "аренда манипулятора 10 тонн",
    "манипулятор 15 тонн",
    // Геолокация — районы и города области
    "манипулятор Автозаводский район",
    "манипулятор Сормовский район",
    "манипулятор Канавино",
    "манипулятор Дзержинск",
    "манипулятор Кстово",
    "манипулятор Арзамас",
    "манипулятор Бор",
    "манипулятор Богородск",
    // Коммерческие
    "грузоперевозки манипулятором",
    "перевозка грузов манипулятором",
    "разгрузка манипулятором",
    "погрузка манипулятором",
    "спецтехника Нижний Новгород",
    "аренда спецтехники Нижний Новгород",
    // Бренды и компания
    "Фаворит манипуляторы",
    "ООО Фаворит",
    "фаварит.рф",
  ].join(", ");
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="subject" content="Аренда манипулятора в Нижнем Новгороде, услуги манипулятора" />
      <meta name="topic" content="Услуги манипулятора, аренда крана-манипулятора" />
      <meta name="abstract" content="Аренда манипулятора в Нижнем Новгороде от 1500 ₽/час. Услуги манипулятора с оператором — подача за 60 минут." />
      <meta name="classification" content="Аренда спецтехники, услуги манипулятора" />
      <meta name="coverage" content="Нижний Новгород, Нижегородская область" />
      <meta name="distribution" content="Local" />
      <meta name="target" content="Нижний Новгород" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://фаварит.рф/" />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Аренда манипулятора в Нижнем Новгороде — Фаворит" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg" />
      <meta name="twitter:image:alt" content="Аренда манипулятора в Нижнем Новгороде" />
      <meta name="geo.region" content="RU-NIZ" />
      <meta name="geo.placename" content="Нижний Новгород" />
      <meta name="geo.position" content="56.326797;44.006516" />
      <meta name="ICBM" content="56.326797, 44.006516" />
      <meta name="google-site-verification" content="6TvMJWGLCEZfJBzJN2nd_HcZ-lGUr7QxdY92N2ELrg0" />
    </>
  );
};

export default SeoMeta;