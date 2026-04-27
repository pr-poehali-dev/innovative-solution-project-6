import type { Truck } from "./trucksData";

interface TruckSeoProps {
  truck: Truck;
}

export default function TruckSeo({ truck }: TruckSeoProps) {
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
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": truck.title,
        "description": truck.seoDesc,
        "image": truck.image,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "RUB",
          "price": truck.priceNum,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": truck.priceNum,
            "priceCurrency": "RUB",
            "unitText": "час"
          },
          "availability": "https://schema.org/InStock",
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
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "12",
          "bestRating": "5",
          "worstRating": "1"
        }
      })}</script>
    </>
  );
}