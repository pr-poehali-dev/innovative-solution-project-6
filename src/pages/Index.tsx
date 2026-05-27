import { lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBarSection from "@/components/sections/TrustBarSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import LazySection from "@/components/LazySection";
import SeoMeta from "@/components/seo/SeoMeta";
import StructuredData from "@/components/seo/StructuredData";
import SectionDivider from "@/components/ui/SectionDivider";
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
      <SectionDivider variant="glow" />
      <FeaturesSection visibleSections={visibleSections} />
      <SectionDivider variant="diamond" />
      <LazySection><PopularTechSection /></LazySection>
      <SectionDivider variant="crane" />
      <LazySection id="fleet"><FleetSection /></LazySection>
      <SectionDivider variant="stripes" />
      <LazySection><UseCasesSection /></LazySection>
      <SectionDivider variant="wave" />
      <LazySection><AsphaltPromoSection /></LazySection>
      <SectionDivider variant="glow" />
      <LazySection><CalculatorSection /></LazySection>
      <SectionDivider variant="diamond" />
      <LazySection><WeatherWidget /></LazySection>
      <SectionDivider variant="wave" flip />
      <LazySection><GallerySection /></LazySection>
      <SectionDivider variant="stripes" />
      <LazySection><ClientsSection /></LazySection>
      <SectionDivider variant="glow" />
      <LazySection><ReviewsSection /></LazySection>
      <SectionDivider variant="crane" />
      <LazySection><SeoTextSection /></LazySection>
      <SectionDivider variant="diamond" />
      <LazySection><AsphaltSeoText /></LazySection>
      <SectionDivider variant="wave" />
      <LazySection><FaqSection /></LazySection>
      <SectionDivider variant="glow" />
      <LazySection><BottomSections visibleSections={visibleSections} /></LazySection>
      <LazySection><SeoFooterLinks /></LazySection>
      <LazySection><SiteFooter /></LazySection>
    </div>
  );
};

export default Index;