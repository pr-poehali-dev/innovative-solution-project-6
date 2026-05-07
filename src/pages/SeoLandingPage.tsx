import { lazy, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { getSeoLandingBySlug } from "@/data/seoLandings";
import { cities } from "@/data/cities";
import { trucks } from "@/pages/truck/trucksData";

const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

interface SeoLandingPageProps {
  slugOverride?: string;
}

const SeoLandingPage = ({ slugOverride }: SeoLandingPageProps) => {
  const params = useParams();
  const slug = slugOverride ?? params.slug ?? "";
  const [callbackOpen, setCallbackOpen] = useState(false);

  const data = getSeoLandingBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const canonicalUrl = `https://фаварит.рф/${data.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data.metaTitle,
    provider: {
      "@type": "LocalBusiness",
      name: "ООО Фаворит",
      telephone: "+79601883084",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Нижний Новгород",
        addressRegion: "Нижегородская область",
        addressCountry: "RU",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Нижний Новгород",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "1500",
      priceValidUntil: "2026-12-31",
    },
  };

  const popularTrucks = Object.entries(trucks).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <title>{data.metaTitle}</title>
      <meta name="description" content={data.metaDescription} />
      <meta name="keywords" content={data.metaKeywords} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={data.metaTitle} />
      <meta property="og:description" content={data.metaDescription} />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.metaTitle} />
      <meta name="twitter:description" content={data.metaDescription} />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo compact />
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
            <PhoneButton iconOnly />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: data.breadcrumb },
            ]}
          />

          <div className="flex justify-start mb-4">
            <SectionBadge>{data.badge}</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              {data.h1}
            </span>
            {data.h1Highlight && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
                  {data.h1Highlight}
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl">
            {data.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {data.heroBadges.map((badge, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5"
              >
                <Icon name={badge.icon} size={14} className="text-accent" />
                <span className="text-white text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <PhoneButton size="lg" />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-white font-semibold"
            >
              <Icon name="MessageCircle" size={18} className="text-accent" />
              Заказать обратный звонок
            </button>
          </div>
        </div>
      </section>

      {/* Intro Lead */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/85 text-base sm:text-lg leading-relaxed">
            {data.introLead}
          </p>
        </div>
      </section>

      {/* Advantages (6 cards) */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <SectionBadge>Почему выбирают нас</SectionBadge>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-3">
              6 причин заказать у{" "}
              <span className="text-accent">«Фаворит»</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Работаем с 2015 года — за это время выполнили более 5 000 заказов в Нижнем Новгороде и области
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {data.advantages.map((adv, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                  <Icon name={adv.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-black text-lg text-white mb-2">
                  {adv.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {adv.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Middle */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-6 sm:p-10 text-center">
          <h2 className="font-display font-black text-xl sm:text-3xl text-white mb-3">
            Получите расчёт за 2 минуты
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Позвоните или закажите звонок — менеджер уточнит задачу, подберёт оптимальную машину и назовёт точную стоимость
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneButton size="lg" />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-accent/40 bg-black/30 hover:bg-accent/10 transition-all text-white font-semibold"
            >
              <Icon name="Phone" size={18} className="text-accent" />
              Заказать звонок
            </button>
          </div>
        </div>
      </section>

      {/* SEO Text Blocks */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14">
          {data.textBlocks.map((block, i) => (
            <article key={i}>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-4 sm:mb-6">
                {block.h2}
              </h2>
              <div className="space-y-4">
                {block.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-white/80 text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
                {block.list && (
                  <ul className="space-y-2 mt-4 pl-1">
                    {block.list.map((item, k) => (
                      <li
                        key={k}
                        className="flex items-start gap-3 text-white/80 text-base"
                      >
                        <Icon
                          name="Check"
                          size={18}
                          className="text-accent mt-1 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Fleet */}
      <LazySection>
        <FleetSection />
      </LazySection>

      {/* Popular trucks links */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <SectionBadge>Популярная техника</SectionBadge>
            </div>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white mb-2">
              Посмотрите характеристики наших машин
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {popularTrucks.map(([truckSlug, truck]) => (
              <Link
                key={truckSlug}
                to={`/tehnika/${truckSlug}`}
                className="group p-4 rounded-xl border border-accent/15 bg-card/30 hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name="Truck"
                    size={20}
                    className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm leading-tight mb-1">
                      {truck.title}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {truck.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <LazySection>
        <ReviewsSection />
      </LazySection>

      {/* FAQ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <SectionBadge>Частые вопросы</SectionBadge>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Вопрос-ответ
            </h2>
          </div>

          <div className="space-y-3">
            {data.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-accent/20 bg-card/40 backdrop-blur-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none hover:bg-accent/5 transition-colors">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {item.q}
                  </h3>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className="text-accent flex-shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/75 text-sm sm:text-base leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <SectionBadge>География работы</SectionBadge>
            </div>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white mb-2">
              Работаем по всей Нижегородской области
            </h2>
            <p className="text-muted-foreground text-sm">
              Выберите ваш город — услуги манипулятора рядом с вами
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to={`/gorod/${c.slug}`}
                className="group p-3 sm:p-4 rounded-xl border border-accent/15 bg-card/30 hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name="MapPin"
                    size={16}
                    className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-white text-sm font-medium">
                    {c.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-accent/50 shadow-2xl shadow-accent/20 overflow-hidden">
          <div
            className="relative p-8 sm:p-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,168,32,0.2) 0%, rgba(232,168,32,0.05) 50%, rgba(0,0,0,0.3) 100%)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white mb-4 leading-tight">
                {data.bottomCtaTitle}
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                {data.bottomCtaText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <PhoneButton size="lg" />
                <button
                  type="button"
                  onClick={() => setCallbackOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-accent/40 bg-black/40 hover:bg-accent/10 transition-all text-white font-semibold"
                >
                  <Icon name="MessageCircle" size={18} className="text-accent" />
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default SeoLandingPage;