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
      <meta property="og:title" content={truck.seoTitle} />
      <meta property="og:description" content={truck.seoDesc} />
      <meta property="og:image" content={truck.image} />
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
