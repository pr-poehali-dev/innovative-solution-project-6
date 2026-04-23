const StructuredData = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ООО Фаворит",
    "url": "https://фаворит.рф",
    "telephone": "+79601883084",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Нижний Новгород",
      "addressRegion": "Нижегородская область",
      "addressCountry": "RU"
    },
    "description": "Аренда манипуляторов и спецтехники в Нижнем Новгороде. Собственный парк техники. Опыт 15 лет.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      { "@type": "Review", "author": { "@type": "Person", "name": "Андрей Соколов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Дмитрий Карпов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Сергей Михайлов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!" },
      { "@type": "Review", "author": { "@type": "Person", "name": "Николай Фёдоров" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Алексей Громов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Виктор Зайцев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Павел Орлов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Обращаемся регулярно — перевозим крупногабаритное оборудование. Всегда чёткая координация, водители опытные. Никаких задержек и накладок за всё время сотрудничества." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Игорь Васильев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Разгружали крупную партию металлоконструкций на складе. Работали быстро и аккуратно, всё разложили точно по местам. Оператор — настоящий профессионал." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Елена Смирнова" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Искала надёжного подрядчика для стройки — коллеги посоветовали Фаворит. Не пожалела: техника чистая, оператор вежливый, документы оформили без вопросов." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Максим Куликов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Заказывал манипулятор для переезда производственного цеха. Всё сделали за один день — думал, уйдёт минимум два. Цена оказалась ниже, чем у конкурентов." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Роман Тихонов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Работаем с Фаворитом на нескольких объектах одновременно. Всегда выручают с техникой в последний момент. Диспетчеры на связи круглосуточно." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Олег Беляев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Сотрудничаем уже пять лет. За это время ни разу не подвели — ни по срокам, ни по качеству. Техника всегда исправна, операторы знают своё дело." }
    ]
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default StructuredData;
