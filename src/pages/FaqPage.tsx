import { lazy, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import MaxButton from "@/components/ui/MaxButton";
import LazySection from "@/components/LazySection";
import FaqSection from "@/components/sections/FaqSection";
import { terms } from "@/components/sections/pricing/priceData";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const COVER =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/d239fd05-a0c5-44a2-9cbb-e19192bf07a9.jpg";

const FaqPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const title = "Частые вопросы об аренде манипулятора — условия, цены, документы | Фаворит";
  const description =
    "Ответы на частые вопросы об аренде манипулятора в Нижнем Новгороде: стоимость и минимальный заказ, сроки подачи техники, документы и оплата, география работы, выбор техники под задачу.";
  const pageUrl = "https://фаварит.рф/voprosy";

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 2, name: "Частые вопросы", item: pageUrl },
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
            <MaxButton place="header_faq" compact />
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      <section className="pt-24 sm:pt-32 pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Частые вопросы" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Отвечаем на всё</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Частые вопросы
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            Условия аренды, цены и минимальный заказ, сроки подачи техники,
            документы и оплата, география работы. Не нашли свой вопрос — позвоните,
            диспетчер ответит и подберёт технику под задачу.
          </p>

          <div className="flex flex-wrap gap-3">
            <PhoneButton size="md" />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={16} className="text-accent" />
              Задать свой вопрос
            </button>
          </div>
        </div>
      </section>

      <FaqSection />

      {/* Условия работы и оплаты — перенесены сюда из прайса на главной */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-6 sm:mb-8 text-2xl sm:text-4xl font-display font-black tracking-tight text-white">
            Условия работы и оплаты
          </h2>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-accent/25 bg-card/40 p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Icon name={t.icon} size={20} className="text-accent" />
                  </span>
                  <h3 className="font-black text-white text-base sm:text-lg leading-tight">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default FaqPage;