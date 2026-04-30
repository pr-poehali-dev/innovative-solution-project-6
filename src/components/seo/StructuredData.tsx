const reviews = [
  { name: "Андрей Соколов", date: "2025-09-12", body: "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год." },
  { name: "Дмитрий Карпов", date: "2025-08-28", body: "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу." },
  { name: "Сергей Михайлов", date: "2025-08-15", body: "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!" },
  { name: "Николай Фёдоров", date: "2025-07-30", body: "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки." },
  { name: "Алексей Громов", date: "2025-07-14", body: "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор." },
  { name: "Виктор Зайцев", date: "2025-06-22", body: "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё." },
  { name: "Павел Орлов", date: "2025-06-08", body: "Обращаемся регулярно — перевозим крупногабаритное оборудование. Всегда чёткая координация, водители опытные. Никаких задержек и накладок за всё время сотрудничества." },
  { name: "Игорь Васильев", date: "2025-05-19", body: "Разгружали крупную партию металлоконструкций на складе. Работали быстро и аккуратно, всё разложили точно по местам. Оператор — настоящий профессионал." },
  { name: "Елена Смирнова", date: "2025-05-03", body: "Искала надёжного подрядчика для стройки — коллеги посоветовали Фаворит. Не пожалела: техника чистая, оператор вежливый, документы оформили без вопросов." },
  { name: "Максим Куликов", date: "2025-04-21", body: "Заказывал манипулятор для переезда производственного цеха. Всё сделали за один день — думал, уйдёт минимум два. Цена оказалась ниже, чем у конкурентов." },
  { name: "Роман Тихонов", date: "2025-04-07", body: "Работаем с Фаворитом на нескольких объектах одновременно. Всегда выручают с техникой в последний момент. Диспетчеры на связи круглосуточно." },
  { name: "Олег Беляев", date: "2025-03-18", body: "Сотрудничаем уже пять лет. За это время ни разу не подвели — ни по срокам, ни по качеству. Техника всегда исправна, операторы знают своё дело." }
];

const reviewSchema = reviews.map((r) => ({
  "@type": "Review",
  "name": `Отзыв от ${r.name}`,
  "author": { "@type": "Person", "name": r.name },
  "datePublished": r.date,
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
  "reviewBody": r.body
}));

const StructuredData = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://фаварит.рф/#organization",
    "name": "ООО Фаворит",
    "legalName": "Общество с ограниченной ответственностью «ФАВОРИТ»",
    "url": "https://фаварит.рф",
    "telephone": ["+79601883084", "+79601690990"],
    "email": "960188@list.ru",
    "image": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg",
    "logo": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6-й микрорайон, д. 2, офис 13",
      "addressLocality": "Кстово",
      "addressRegion": "Нижегородская область",
      "postalCode": "607657",
      "addressCountry": "RU"
    },
    "vatID": "5250077990",
    "taxID": "5250077990",
    "iso6523Code": "0211:1235200013531",
    "identifier": [
      { "@type": "PropertyValue", "propertyID": "ИНН", "value": "5250077990" },
      { "@type": "PropertyValue", "propertyID": "КПП", "value": "525001001" },
      { "@type": "PropertyValue", "propertyID": "ОГРН", "value": "1235200013531" }
    ],
    "foundingDate": "2023",
    "description": "ООО «ФАВОРИТ» — аренда манипуляторов и спецтехники в Нижнем Новгороде. ИНН 5250077990, ОГРН 1235200013531. Собственный парк техники, работа с НДС, договор для юр. лиц.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": String(reviews.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewSchema
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://фаварит.рф/#service",
    "serviceType": "Аренда манипулятора с КМУ",
    "name": "Аренда манипулятора в Нижнем Новгороде",
    "description": "Аренда манипуляторов с КМУ от 2200 ₽/час в Нижнем Новгороде и области. Подача от 1 часа, без выходных. 15 единиц техники.",
    "image": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg",
    "url": "https://фаварит.рф",
    "provider": { "@id": "https://фаварит.рф/#organization" },
    "areaServed": [
      { "@type": "City", "name": "Нижний Новгород" },
      { "@type": "AdministrativeArea", "name": "Нижегородская область" }
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://фаварит.рф",
      "priceCurrency": "RUB",
      "price": "2200",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2200",
        "priceCurrency": "RUB",
        "unitText": "час"
      },
      "availability": "https://schema.org/InStock",
      "seller": { "@id": "https://фаварит.рф/#organization" }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": String(reviews.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewSchema
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(service)}</script>
    </>
  );
};

export default StructuredData;