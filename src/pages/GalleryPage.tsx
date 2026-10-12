import { lazy, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import MaxButton from "@/components/ui/MaxButton";
import LazySection from "@/components/LazySection";
import GallerySection from "@/components/sections/GallerySection";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const COVER =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/96f657e8-7741-4d2b-b428-ca560b0047fb.webp";

const GalleryPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const title = "Наши работы — фотоотчёты с объектов | Аренда манипулятора Фаворит";
  const description =
    "Фотографии выполненных работ ООО «Фаворит»: монтаж металлоконструкций, работа на высоте, перевозка негабарита манипулятором в Нижнем Новгороде и области. Более 5000 заказов за 10 лет.";
  const pageUrl = "https://фаварит.рф/nashi-raboty";

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 2, name: "Наши работы", item: pageUrl },
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
            <MaxButton place="header_gallery" compact />
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      <section className="pt-24 sm:pt-32 pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Наши работы" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Портфолио</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Наши работы на объектах
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            Фотоотчёты с реальных объектов в Нижнем Новгороде и области: монтаж
            металлоконструкций, работа на высоте, перевозка негабаритных грузов.
            За 10 лет — более 5000 выполненных заказов.
          </p>

          <div className="flex flex-wrap gap-3">
            <PhoneButton size="md" />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={16} className="text-accent" />
              Обсудить задачу
            </button>
          </div>
        </div>
      </section>

      <GallerySection />

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default GalleryPage;
