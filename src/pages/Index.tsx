import { lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBarSection from "@/components/sections/TrustBarSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import LazySection from "@/components/LazySection";
import SeoMeta from "@/components/seo/SeoMeta";
import StructuredData from "@/components/seo/StructuredData";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { useVisibleSections } from "@/hooks/useVisibleSections";

const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
const PopularTechSection = lazy(() => import("@/components/sections/PopularTechSection"));
const BottomSections = lazy(() => import("@/components/sections/BottomSections"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const CalculatorSection = lazy(() => import("@/components/sections/CalculatorSection"));
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const UseCasesSection = lazy(() => import("@/components/sections/UseCasesSection"));
const SeoTextSection = lazy(() => import("@/components/sections/SeoTextSection"));
const FaqSection = lazy(() => import("@/components/sections/FaqSection"));
const SeoFooterLinks = lazy(() => import("@/components/sections/SeoFooterLinks"));
const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));
const WeatherWidget = lazy(() => import("@/components/sections/WeatherWidget"));
const AsphaltPromoSection = lazy(() => import("@/components/sections/AsphaltPromoSection"));
const AsphaltSeoText = lazy(() => import("@/components/sections/AsphaltSeoText"));
const SECTION_IDS = ["hero", "features", "how", "pricing", "cta"];

const Index = () => {
  const visibleSections = useVisibleSections(SECTION_IDS);

  return (
    <div className="min-h-screen bg-background page-enter">
      <SeoMeta />
      <StructuredData />
      <HeroSection visibleSections={visibleSections} />
      <TrustBarSection />

      <SectionDivider variant="aurora" />

      {/* Преимущества — спотлайт с шестерёнками (механика работы) */}
      <SectionBackdrop tone="spotlight" pattern="gears">
        <FeaturesSection visibleSections={visibleSections} />
      </SectionBackdrop>

      <SectionDivider variant="neon" />

      {/* Зона техники — силуэт крана-манипулятора на фоне */}
      <SectionBackdrop tone="tech" pattern="crane">
        <LazySection><PopularTechSection /></LazySection>
        <SectionDivider variant="crane" />
        <LazySection id="fleet"><FleetSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="circuit" />

      {/* Применение + асфальт — следы протекторов (грузовая техника) */}
      <SectionBackdrop tone="warm" pattern="tracks">
        <LazySection><UseCasesSection /></LazySection>
        <SectionDivider variant="wave" />
        <LazySection><AsphaltPromoSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="particles" />

      {/* Калькулятор + погода — чертёж со схемой (инженерный расчёт) */}
      <SectionBackdrop tone="deep" pattern="blueprint">
        <LazySection><CalculatorSection /></LazySection>
        <SectionDivider variant="blueprint" />
        <LazySection><WeatherWidget /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="wave" flip />

      {/* Галерея + клиенты — контейнеры со стропами (груз / работа) */}
      <SectionBackdrop tone="soft" pattern="cargo">
        <LazySection><GallerySection /></LazySection>
        <SectionDivider variant="stripes" />
        <LazySection><ClientsSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="aurora" />

      {/* Отзывы — заклёпки на металле (надёжно) */}
      <SectionBackdrop tone="spotlight" pattern="rivets">
        <LazySection><ReviewsSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="diamond" />

      {/* SEO-текст — трубы / арматура (стройка) */}
      <SectionBackdrop tone="deep" pattern="pipes">
        <LazySection><SeoTextSection /></LazySection>
        <SectionDivider variant="particles" />
        <LazySection><AsphaltSeoText /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="neon" />

      {/* FAQ — знаки стройки + жёлтая лента (внимание) */}
      <SectionBackdrop tone="warm" pattern="warning">
        <LazySection><FaqSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="glow" />

      <LazySection><BottomSections visibleSections={visibleSections} /></LazySection>
      <LazySection><SeoFooterLinks /></LazySection>
      <LazySection><SiteFooter /></LazySection>
    </div>
  );
};

export default Index;