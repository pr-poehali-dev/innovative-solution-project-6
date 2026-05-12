import { lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBarSection from "@/components/sections/TrustBarSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import LazySection from "@/components/LazySection";
import SeoMeta from "@/components/seo/SeoMeta";
import StructuredData from "@/components/seo/StructuredData";
import { useVisibleSections } from "@/hooks/useVisibleSections";

const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
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

const SECTION_IDS = ["hero", "features", "how", "pricing", "cta"];

const Index = () => {
  const visibleSections = useVisibleSections(SECTION_IDS);

  return (
    <div className="min-h-screen bg-background page-enter">
      <SeoMeta />
      <StructuredData />
      <HeroSection visibleSections={visibleSections} />
      <TrustBarSection />
      <FeaturesSection visibleSections={visibleSections} />
      <LazySection id="fleet"><FleetSection /></LazySection>
      <LazySection><UseCasesSection /></LazySection>
      <LazySection><CalculatorSection /></LazySection>
      <LazySection><GallerySection /></LazySection>
      <LazySection><ClientsSection /></LazySection>
      <LazySection><ReviewsSection /></LazySection>
      <LazySection><SeoTextSection /></LazySection>
      <LazySection><FaqSection /></LazySection>
      <LazySection><BottomSections visibleSections={visibleSections} /></LazySection>
      <LazySection><SeoFooterLinks /></LazySection>
      <LazySection><SiteFooter /></LazySection>
    </div>
  );
};

export default Index;