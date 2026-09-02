import { lazy, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import MaxButton from "@/components/ui/MaxButton";
import LazySection from "@/components/LazySection";
import WeatherWidget from "@/components/sections/WeatherWidget";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const COVER =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg";

const WeatherPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const title = "Погода для работы манипулятора в Нижнем Новгороде — прогноз на неделю";
  const description =
    "Прогноз погоды и скорости ветра в Нижнем Новгороде на неделю для планирования крановых работ. Ветер, порывы, ограничения по подъёму груза манипулятором.";
  const pageUrl = "https://фаварит.рф/pogoda";

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 2, name: "Погода для крановых работ", item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={COVER} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="ru_RU" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={COVER} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo compact />
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <MaxButton place="header_weather" compact />
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      <section className="pt-24 sm:pt-32 pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Погода для работ" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Планирование работ</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Погода для крановых работ
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            Прогноз ветра и погоды в Нижнем Новгороде на неделю вперёд. Ветер —
            главное ограничение при подъёме груза: при порывах свыше 10 м/с работы
            приостанавливаются по требованиям безопасности. Планируйте заказ заранее.
          </p>

          <div className="flex flex-wrap gap-3">
            <PhoneButton size="md" />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={16} className="text-accent" />
              Подобрать дату
            </button>
          </div>
        </div>
      </section>

      <WeatherWidget />

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default WeatherPage;
