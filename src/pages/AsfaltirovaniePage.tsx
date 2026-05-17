import { useEffect } from "react";
import SiteFooter from "@/components/sections/SiteFooter";
import AsphaltCalculator from "@/components/AsphaltCalculator";
import AsfaltirovanieHero from "./asfaltirovanie/AsfaltirovanieHero";
import AsfaltirovanieBenefitsAndPrice from "./asfaltirovanie/AsfaltirovanieBenefitsAndPrice";
import AsfaltirovanieStagesAndObjects from "./asfaltirovanie/AsfaltirovanieStagesAndObjects";
import AsfaltirovanieGallery from "./asfaltirovanie/AsfaltirovanieGallery";
import AsfaltirovanieReviews from "./asfaltirovanie/AsfaltirovanieReviews";
import AsfaltirovanieFaqAndCta from "./asfaltirovanie/AsfaltirovanieFaqAndCta";
import { faq } from "./asfaltirovanie/asfaltirovanieData";

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
    <div className="page-enter min-h-screen relative text-slate-800" style={{ background: "linear-gradient(180deg, #fffaf0 0%, #fff7e8 30%, #fef3dc 60%, #fff7e8 100%)" }}>
      {/* Декоративные размытые круги фона */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-300/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-orange-200/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-yellow-200/30 blur-[100px]" />
      </div>

      <AsfaltirovanieHero />

      <AsfaltirovanieBenefitsAndPrice />

      {/* Calculator */}
      <div className="relative z-10">
        <AsphaltCalculator light />
      </div>

      <AsfaltirovanieStagesAndObjects />

      <AsfaltirovanieGallery />

      <AsfaltirovanieReviews />

      <AsfaltirovanieFaqAndCta />

      <SiteFooter />
    </div>
  );
};

export default AsfaltirovaniePage;