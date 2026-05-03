import type { Truck } from "./trucksData";

interface TruckSeoProps {
  truck: Truck;
  slug: string;
}

export default function TruckSeo({ truck, slug }: TruckSeoProps) {
  if (!slug || !truck) return null;
  const pageUrl = `https://фаварит.рф/tehnika/${slug}`;
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split("T")[0];
  return (
    <>
      <title>{truck.seoTitle}</title>
      <meta name="description" content={truck.seoDesc} />
      <meta name="keywords" content={truck.seoKeywords} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:title" content="Аренда манипулятора в Нижнем Новгороде — ООО Фаворит" />
      <meta property="og:description" content="Аренда манипулятора с КМУ от 2200 ₽/час. Подача от 1 часа. +7 960 188-30-84" />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Аренда манипулятора в Нижнем Новгороде — ООО Фаворит" />
      <meta name="twitter:description" content="Аренда манипулятора с КМУ от 2200 ₽/час. Подача от 1 часа. +7 960 188-30-84" />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://фаварит.рф/" },
          { "@type": "ListItem", "position": 2, "name": "Техника", "item": "https://фаварит.рф/#fleet" },
          { "@type": "ListItem", "position": 3, "name": truck.title, "item": pageUrl },
          { "@type": "ListItem", "position": 4, "name": "Контакты", "item": "https://фаварит.рф/#contacts" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": truck.title,
        "description": truck.seoDesc,
        "image": truck.image,
        "sku": slug,
        "mpn": slug,
        "brand": {
          "@type": "Brand",
          "name": "ООО Фаворит"
        },
        "offers": {
          "@type": "Offer",
          "url": pageUrl,
          "priceCurrency": "RUB",
          "price": truck.priceNum,
          "priceValidUntil": priceValidUntil,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": truck.priceNum,
            "priceCurrency": "RUB",
            "unitText": "час"
          },
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/UsedCondition",
          "seller": {
            "@type": "LocalBusiness",
            "name": "ООО Фаворит",
            "telephone": "+79601883084",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Нижний Новгород",
              "addressRegion": "Нижегородская область",
              "addressCountry": "RU"
            }
          },
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
                "unitCode": "HUR"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 2,
                "unitCode": "HUR"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "RU",
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "12",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [{
          "@type": "Review",
          "name": `Отзыв об аренде ${truck.title}`,
          "author": { "@type": "Person", "name": "Андрей Соколов" },
          "datePublished": "2025-09-12",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
          "reviewBody": "Отличная техника, оператор профессиональный. Подача быстрая, всё сделали в срок. Рекомендую."
        }]
      })}</script>
    </>
  );
}