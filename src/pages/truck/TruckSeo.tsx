import type { Truck } from "./trucksData";
import { reviews, reviewSchema } from "@/data/reviews";

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
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={truck.seoTitle} />
      <meta property="og:description" content={truck.seoDesc} />
      <meta property="og:image" content={truck.image} />
      <meta property="og:image:secure_url" content={truck.image} />
      <meta property="og:image:alt" content={truck.alt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="product:price:amount" content={String(truck.priceNum)} />
      <meta property="product:price:currency" content="RUB" />
      <meta property="product:availability" content="in stock" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={truck.seoTitle} />
      <meta name="twitter:description" content={truck.seoDesc} />
      <meta name="twitter:image" content={truck.image} />
      <meta name="twitter:image:alt" content={truck.alt} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="geo.region" content="RU-NIZ" />
      <meta name="geo.placename" content="Нижний Новгород" />
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
          "reviewCount": String(reviews.length),
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": reviewSchema
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Сколько стоит аренда ${truck.title} в Нижнем Новгороде?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Стоимость аренды ${truck.title} в Нижнем Новгороде — ${truck.price}. Минимальный заказ — 4 часа. Оператор и топливо включены в цену. Для постоянных клиентов и длительных заказов — индивидуальные скидки.`
            }
          },
          {
            "@type": "Question",
            "name": `Как быстро подаётся ${truck.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Подача техники в Нижнем Новгороде — за 60 минут после оформления заявки. Работаем 24/7, без выходных. Позвоните +7 960 188-30-84 или оставьте заявку на сайте — диспетчер согласует время.`
            }
          },
          {
            "@type": "Question",
            "name": "Работаете ли вы с юридическими лицами и НДС?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Да. ООО «Фаворит» — плательщик НДС, ИНН 5250077990, ОГРН 1235200013531. Заключаем договор, предоставляем полный пакет закрывающих документов: акт, УПД, счёт-фактуру, путевой лист. Возможна безналичная оплата и работа по 44-ФЗ/223-ФЗ."
            }
          },
          {
            "@type": "Question",
            "name": "Включён ли оператор в стоимость?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Да, оператор-водитель включён в часовой тариф. Все наши операторы имеют удостоверение машиниста крана-манипулятора и стаж работы на КМУ от 10 лет. Техника без оператора не сдаётся."
            }
          }
        ]
      })}</script>
    </>
  );
}