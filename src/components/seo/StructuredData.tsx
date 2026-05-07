import { reviews, reviewSchema } from "@/data/reviews";

const StructuredData = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://фаварит.рф/#organization",
    "name": "Фаворит",
    "alternateName": ["ООО Фаворит", "фаварит.рф", "Фаворит Нижний Новгород", "ООО «ФАВОРИТ»"],
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
    "priceRange": "1500-3500 RUB",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.270596,
      "longitude": 43.848988
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }],
    "areaServed": [
      { "@type": "City", "name": "Нижний Новгород" },
      { "@type": "AdministrativeArea", "name": "Нижегородская область" }
    ],
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
    }
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(service)}</script>
    </>
  );
};

export default StructuredData;