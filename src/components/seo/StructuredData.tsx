import { reviews, reviewSchema } from "@/data/reviews";
import { faqs } from "@/components/sections/FaqSection";
import { trucks as fleetTrucks } from "@/components/sections/fleet/data";

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
    "image": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg",
    "logo": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Шуваловский проезд, 7",
      "addressLocality": "Нижний Новгород",
      "addressRegion": "Нижегородская область",
      "postalCode": "603035",
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
    "foundingDate": "2015",
    "description": "ООО «ФАВОРИТ» — аренда манипуляторов и спецтехники в Нижнем Новгороде с 2015 года. ИНН 5250077990, ОГРН 1235200013531. Собственный парк из 15 единиц техники, работа с НДС, договор для юр. лиц, документы для отчётности.",
    "priceRange": "1500-3500 RUB",
    "currenciesAccepted": "RUB",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.326797,
      "longitude": 44.006516
    },
    "hasMap": "https://yandex.ru/maps/?text=Нижний+Новгород+Шуваловский+проезд+7",
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
    "review": reviewSchema,
    "sameAs": [
      "https://yandex.ru/maps/",
      "https://2gis.ru/"
    ]
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://фаварит.рф/#service",
    "serviceType": "Аренда манипулятора с КМУ",
    "name": "Аренда манипулятора в Нижнем Новгороде",
    "description": "Аренда манипуляторов с КМУ от 1500 ₽/час в Нижнем Новгороде и Нижегородской области. Подача за 60 минут, без выходных. 15 единиц техники: 3-17 т, стрела до 23 м, люлька, бур.",
    "image": "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg",
    "url": "https://фаварит.рф",
    "provider": { "@id": "https://фаварит.рф/#organization" },
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
    "offers": {
      "@type": "AggregateOffer",
      "url": "https://фаварит.рф",
      "priceCurrency": "RUB",
      "lowPrice": "1500",
      "highPrice": "3500",
      "offerCount": String(fleetTrucks.length),
      "availability": "https://schema.org/InStock",
      "seller": { "@id": "https://фаварит.рф/#organization" }
    }
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://фаварит.рф/#faq",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://фаварит.рф/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Аренда манипулятора в Нижнем Новгороде",
        "item": "https://фаварит.рф/"
      }
    ]
  };

  const parsePriceNum = (price: string): number => {
    const digits = price.replace(/\D/g, "");
    return digits ? Number(digits.slice(0, 4)) : 0;
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://фаварит.рф/#fleet",
    "name": "Парк техники ООО «Фаворит» в Нижнем Новгороде",
    "numberOfItems": fleetTrucks.length,
    "itemListElement": fleetTrucks.map((truck, idx) => {
      const priceNum = parsePriceNum(truck.price);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "@id": `https://фаварит.рф/tehnika/${truck.slug}#product`,
          "name": truck.title,
          "image": truck.image,
          "description": `${truck.title} — аренда в Нижнем Новгороде. ${truck.specs.map((s) => `${s.label}: ${s.value}`).join(", ")}. ${truck.price}.`,
          "brand": {
            "@type": "Brand",
            "name": truck.badge
          },
          "category": "Аренда спецтехники",
          "url": `https://фаварит.рф/tehnika/${truck.slug}`,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": String(Math.max(3, Math.ceil(reviews.length / fleetTrucks.length))),
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://фаварит.рф/tehnika/${truck.slug}`,
            "priceCurrency": "RUB",
            "price": priceNum > 0 ? String(priceNum) : "2200",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": priceNum > 0 ? String(priceNum) : "2200",
              "priceCurrency": "RUB",
              "unitText": "час",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitCode": "HUR"
              }
            },
            "availability": "https://schema.org/InStock",
            "areaServed": {
              "@type": "City",
              "name": "Нижний Новгород"
            },
            "seller": { "@id": "https://фаварит.рф/#organization" },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "RUB"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "RU",
                "addressRegion": "Нижегородская область"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                }
              }
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "RU",
              "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
            }
          }
        }
      };
    })
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://фаварит.рф/#website",
    "url": "https://фаварит.рф",
    "name": "Фаворит — аренда манипулятора в Нижнем Новгороде",
    "publisher": { "@id": "https://фаварит.рф/#organization" },
    "inLanguage": "ru-RU"
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(service)}</script>
      <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </>
  );
};

export default StructuredData;