import { lazy } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { useState } from "react";
import { getCityBySlug, cities } from "@/data/cities";

const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
const FaqSection = lazy(() => import("@/components/sections/FaqSection"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const CityPage = () => {
  const { slug } = useParams();
  const [callbackOpen, setCallbackOpen] = useState(false);
  const city = slug ? getCityBySlug(slug) : undefined;

  if (!city) {
    return <Navigate to="/" replace />;
  }

  const title = `Манипулятор с КМУ в ${city.nameIn} — заказать от 1500 ₽/час | Фаворит`;
  const description = `Заказать манипулятор в ${city.nameIn}: подача от 1 часа, до 20 т, стрела 23 м, люлька. Работаем без выходных, оператор включён. ☎ +7 960 188-30-84`;
  const cityUrl = `https://фаварит.рф/gorod/${city.slug}`;
  const ogTitle = `Аренда манипулятора в ${city.nameIn} — от 1500 ₽/час | Фаворит`;
  const ogDescription = `Манипулятор с КМУ в ${city.nameIn}: подача от 1 часа, до 20 тонн, стрела 23 м, люлька. Оператор включён. ☎ +7 960 188-30-84`;

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 2, name: "Города", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 3, name: city.name, item: cityUrl },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Аренда манипулятора в ${city.nameIn}`,
    name: `Аренда манипулятора с КМУ в ${city.nameIn}`,
    description: `Услуги аренды манипулятора (КМУ) в ${city.nameIn} от компании «Фаворит». Подача техники от 1 часа, грузоподъёмность до 20 тонн, стрела до 23 м, монтажная люлька. Работаем без выходных.`,
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "Нижегородская область",
        addressCountry: "RU",
      },
    },
    provider: {
      "@type": "LocalBusiness",
      name: "ООО Фаворит",
      telephone: "+79601883084",
      url: "https://фаварит.рф/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Кстово",
        addressRegion: "Нижегородская область",
        addressCountry: "RU",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "12",
        bestRating: "5",
        worstRating: "1",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "1500",
      url: cityUrl,
      availability: "https://schema.org/InStock",
      areaServed: city.name,
    },
  };

  const otherCities = cities.filter((c) => c.slug !== city.slug);

  return (
    <div className="min-h-screen bg-background">
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`аренда манипулятора ${city.nameIn}, услуги манипулятора ${city.nameIn}, манипулятор ${city.name}, заказать манипулятор ${city.name}, кран манипулятор ${city.nameIn}, аренда КМУ ${city.name}, услуги крана манипулятора ${city.nameIn}, манипулятор с оператором ${city.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:url" content={cityUrl} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="geo.region" content="RU-NIZ" />
      <meta name="geo.placename" content={city.name} />
      <link rel="canonical" href={cityUrl} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo />
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5"
              aria-label="Заказать обратный звонок"
            >
              <Icon name="MessageCircle" size={18} className="text-accent" />
            </button>
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Города", to: "/" },
              { label: city.name },
            ]}
          />

          <div className="flex justify-start mb-4">
            <SectionBadge>Город {city.name}</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Аренда манипулятора в {city.nameIn}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl">
            {city.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <Icon name="MapPin" size={14} className="text-accent" />
              <span className="text-white text-sm font-medium">{city.distance}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <Icon name="Clock" size={14} className="text-accent" />
              <span className="text-white text-sm font-medium">Подача от 1 часа</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <Icon name="BadgeRussianRuble" size={14} className="text-accent" />
              <span className="text-white text-sm font-medium">От 2200 ₽/час</span>
            </div>
          </div>

          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Specifics + Popular */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={18} className="text-accent" />
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white">
                Услуги манипулятора в {city.nameIn}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {city.specifics}
            </p>
          </div>

          <div className="p-5 sm:p-7 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={18} className="text-accent" />
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white">
                Популярные заказы в {city.nameIn}
              </h2>
            </div>
            <ul className="space-y-2">
              {city.popular.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <LazySection><FleetSection /></LazySection>

      {/* Reviews */}
      <LazySection><ReviewsSection /></LazySection>

      {/* FAQ */}
      <LazySection><FaqSection /></LazySection>

      {/* Other cities */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <SectionBadge>Другие города</SectionBadge>
            </div>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white mb-2">
              Работаем по всей Нижегородской области
            </h2>
            <p className="text-muted-foreground text-sm">
              Выберите ваш город — услуги манипулятора рядом с вами
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/gorod/${c.slug}`}
                className="group p-3 sm:p-4 rounded-xl border border-accent/15 bg-card/30 hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-accent flex-shrink-0" />
                  <span className="font-display font-bold text-sm text-white group-hover:text-accent transition-colors truncate">
                    {c.name}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 ml-6">{c.distance}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 sm:mb-5">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Заказать манипулятор в {city.nameIn}
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
            Позвоните — ответим сразу, подберём технику и согласуем время подачи
          </p>
          <PhoneButton size="lg" className="mx-auto" />
        </div>
      </section>

      <LazySection><SiteFooter /></LazySection>
    </div>
  );
};

export default CityPage;