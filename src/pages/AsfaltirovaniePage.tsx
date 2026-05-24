import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteFooter from "@/components/sections/SiteFooter";
import AsphaltCalculator from "@/components/AsphaltCalculator";
import AsfaltirovanieHero from "./asfaltirovanie/AsfaltirovanieHero";
import AsfaltirovanieBenefitsAndPrice from "./asfaltirovanie/AsfaltirovanieBenefitsAndPrice";
import AsfaltirovanieStagesAndObjects from "./asfaltirovanie/AsfaltirovanieStagesAndObjects";
import AsfaltirovanieGallery from "./asfaltirovanie/AsfaltirovanieGallery";
import AsfaltirovanieReviews from "./asfaltirovanie/AsfaltirovanieReviews";
import AsfaltirovanieFaqAndCta from "./asfaltirovanie/AsfaltirovanieFaqAndCta";
import { faq } from "./asfaltirovanie/asfaltirovanieData";

const SLUG_META: Record<string, { title: string; description: string; keywords: string }> = {
  "/asfaltirovanie": {
    title: "Асфальтирование в Нижнем Новгороде под ключ от 450 ₽/м² — Фаворит",
    description: "Асфальтирование в Нижнем Новгороде и области под ключ от 450 ₽/м². Своя техника, гарантия 3 года, договор с НДС. Замер бесплатно. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Нижний Новгород, асфальтирование цена, асфальтирование под ключ, укладка асфальта, ямочный ремонт, асфальтирование дворов, асфальтирование парковок",
  },
  "/asfaltirovanie-nizhny-novgorod": {
    title: "Асфальтирование Нижний Новгород — цена от 450 ₽/м² | Фаворит",
    description: "Заказать асфальтирование в Нижнем Новгороде. Свой парк техники, гарантия до 3 лет, договор с НДС. Замер бесплатно. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Нижний Новгород, асфальт НН, укладка асфальта Нижний Новгород, асфальтирование цена за м2",
  },
  "/asfaltirovanie-dvorov": {
    title: "Асфальтирование дворов в Нижнем Новгороде — Фаворит",
    description: "Асфальтирование дворов жилых домов под ключ. Работаем с УК, ТСЖ, застройщиками. Парковочные карманы, разметка. ☎ +7 960 188-30-84",
    keywords: "асфальтирование дворов, асфальт во двор многоквартирного дома, асфальтирование придомовой территории",
  },
  "/asfaltirovanie-parkovok": {
    title: "Асфальтирование парковок и стоянок — от 550 ₽/м² | Фаворит",
    description: "Асфальтирование парковок от 100 до 10 000 м². Бордюры, водоотведение, разметка. Гарантия 3 года. ☎ +7 960 188-30-84",
    keywords: "асфальтирование парковок, асфальт на стоянку, асфальтирование парковки ТЦ",
  },
  "/asfaltirovanie-dorog": {
    title: "Асфальтирование дорог в Нижегородской области — Фаворит",
    description: "Асфальтирование автодорог IV–V категории, подъездных путей, дорог в посёлках. Толщина 4–12 см. ☎ +7 960 188-30-84",
    keywords: "асфальтирование дорог, асфальт на дорогу, асфальтирование подъездных путей",
  },
  "/ukladka-asfalta": {
    title: "Укладка асфальта в Нижнем Новгороде — Фаворит",
    description: "Укладка асфальта горячим способом по ГОСТ 9128-2013. Своя техника: асфальтоукладчики, катки, фрезы. ☎ +7 960 188-30-84",
    keywords: "укладка асфальта, укладка асфальта Нижний Новгород, асфальтоукладчик, горячий асфальт",
  },
  "/yamochnyy-remont": {
    title: "Ямочный ремонт асфальта в Нижнем Новгороде — от 600 ₽/м² | Фаворит",
    description: "Ямочный ремонт асфальтового покрытия горячим способом с фрезерованием краёв. Сезон апрель–октябрь. От 50 м². ☎ +7 960 188-30-84",
    keywords: "ямочный ремонт асфальта, ремонт асфальта Нижний Новгород, заделка ям",
  },
  "/asfaltirovanie-pod-klyuch": {
    title: "Асфальтирование под ключ в Нижнем Новгороде — Фаворит",
    description: "Асфальтирование под ключ: замер, смета, материалы, укладка — от одной бригады. Гарантия 3 года, договор с НДС. ☎ +7 960 188-30-84",
    keywords: "асфальтирование под ключ, асфальт под ключ Нижний Новгород",
  },
  "/asfaltirovanie-cena": {
    title: "Цена асфальтирования за м² в Нижнем Новгороде — Фаворит",
    description: "Прайс-лист на асфальтирование: укладка от 450 ₽/м², ямочный ремонт от 600 ₽/м², бордюры от 550 ₽/п.м. ☎ +7 960 188-30-84",
    keywords: "асфальтирование цена, цена асфальта за м2, стоимость асфальтирования",
  },
  "/asfaltirovanie-dzerzhinsk": {
    title: "Асфальтирование в Дзержинске — Фаворит",
    description: "Асфальтирование дворов, парковок и дорог в Дзержинске. Выезд бригады в день обращения. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Дзержинск, асфальт Дзержинск",
  },
  "/asfaltirovanie-kstovo": {
    title: "Асфальтирование в Кстово — Фаворит",
    description: "Асфальтирование под ключ в Кстово и Кстовском районе. Своя техника, гарантия 3 года. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Кстово, асфальт Кстово",
  },
  "/asfaltirovanie-arzamas": {
    title: "Асфальтирование в Арзамасе — Фаворит",
    description: "Асфальтирование в Арзамасе и Арзамасском районе. Дворы, парковки, дороги под ключ. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Арзамас, асфальт Арзамас",
  },
  "/asfaltirovanie-bogorodsk": {
    title: "Асфальтирование в Богородске — Фаворит",
    description: "Асфальтирование в Богородске и Богородском районе. Гарантия 3 года, договор с НДС. ☎ +7 960 188-30-84",
    keywords: "асфальтирование Богородск, асфальт Богородск",
  },
};

const AsfaltirovaniePage = () => {
  const { pathname } = useLocation();
  const meta = SLUG_META[pathname] ?? SLUG_META["/asfaltirovanie"];

  useEffect(() => {
    document.title = meta.title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setOg = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", meta.description);
    setMeta("keywords", meta.keywords);
    setOg("og:title", meta.title);
    setOg("og:description", meta.description);
    setOg("og:url", `https://фаварит.рф${pathname}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://фаварит.рф${pathname}`);

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
      name: meta.title,
      description: meta.description,
      areaServed: [
        { "@type": "City", name: "Нижний Новгород" },
        { "@type": "City", name: "Дзержинск" },
        { "@type": "City", name: "Кстово" },
        { "@type": "City", name: "Арзамас" },
        { "@type": "City", name: "Богородск" },
        { "@type": "AdministrativeArea", name: "Нижегородская область" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: "ООО Фаворит",
        telephone: "+7-960-188-30-84",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Шуваловский проезд, 7",
          addressLocality: "Нижний Новгород",
          addressCountry: "RU",
        },
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: "450",
        highPrice: "850",
        offerCount: "6",
      },
    };

    const breadcrumbsSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
        { "@type": "ListItem", position: 2, name: meta.title, item: `https://фаварит.рф${pathname}` },
      ],
    };

    const oldScript = document.getElementById("asphalt-jsonld");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "asphalt-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify([faqSchema, serviceSchema, breadcrumbsSchema]);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("asphalt-jsonld");
      if (s) s.remove();
    };
  }, [pathname, meta]);

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