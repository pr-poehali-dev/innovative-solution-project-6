import { lazy } from "react";
import LazySection from "@/components/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import SeoMeta from "@/components/seo/SeoMeta";
import StructuredData from "@/components/seo/StructuredData";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import IndustrialBanner from "@/components/sections/IndustrialBanner";
import SectionLinkCard from "@/components/sections/SectionLinkCard";
import { useVisibleSections } from "@/hooks/useVisibleSections";

// Разделы грузятся по мере прокрутки — так сайт работал раньше.
// Браузер не держит в памяти всю страницу разом, поэтому не мигает.
const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
const PopularTechSection = lazy(() => import("@/components/sections/PopularTechSection"));
const BottomSections = lazy(() => import("@/components/sections/BottomSections"));
const CalculatorSection = lazy(() => import("@/components/sections/CalculatorSection"));
const PricingTableSection = lazy(() => import("@/components/sections/PricingTableSection"));
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const UseCasesSection = lazy(() => import("@/components/sections/UseCasesSection"));
const SeoTextSection = lazy(() => import("@/components/sections/SeoTextSection"));
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

      <SectionDivider variant="aurora" />

      {/* Преимущества — спотлайт с шестерёнками (механика работы) */}
      <SectionBackdrop tone="spotlight" pattern="gears">
        <FeaturesSection visibleSections={visibleSections} />
      </SectionBackdrop>

      {/* === Баннер №1 — НАША ТЕХНИКА (кран-манипулятор с воздуха) === */}
      <IndustrialBanner
        eyebrow="СОБСТВЕННЫЙ ПАРК"
        titleStart="НАША"
        titleAccent="ТЕХНИКА"
        subtitle="15+ единиц спецтехники — краны-манипуляторы и автокраны"
        icon="Truck"
        size="md"
        href="#fleet"
        imageUrl="/img/banner-tehnika.webp"
      />

      {/* Зона техники — силуэт крана-манипулятора на фоне */}
      <SectionBackdrop tone="tech" pattern="crane">
        <LazySection><PopularTechSection /></LazySection>
        <SectionDivider variant="crane" />
        <LazySection id="fleet"><FleetSection /></LazySection>
        <SectionDivider variant="blueprint" />
        <LazySection><PricingTableSection compact /></LazySection>
        <SectionDivider variant="blueprint" />
        <LazySection><CalculatorSection /></LazySection>
      </SectionBackdrop>

      {/* === Баннер №2 — ВЕСЬ ПАРК (грузовики в ряд на закате) === */}
      <IndustrialBanner
        eyebrow="ПОЛНЫЙ ПАРК"
        titleStart="ВСЯ"
        titleAccent="СПЕЦТЕХНИКА"
        subtitle="Подача от 1 часа. Замена техники за 3-5 часов при поломке"
        icon="Warehouse"
        size="sm"
        imageUrl="/img/banner-park.webp"
      />

      {/* Применение — следы протекторов (грузовая техника) */}
      <SectionBackdrop tone="warm" pattern="tracks">
        <LazySection><UseCasesSection /></LazySection>
      </SectionBackdrop>

      {/* Погода вынесена на /pogoda — на главной короткая ссылка */}
      <SectionLinkCard
        to="/pogoda"
        eyebrow="Планирование работ"
        title="Погода для крановых работ"
        description="Прогноз ветра в Нижнем Новгороде на неделю. Ветер — главное ограничение при подъёме груза."
        icon="CloudSun"
        cta="Смотреть прогноз"
      />

      {/* Галерея вынесена на /nashi-raboty — на главной короткая ссылка */}
      <SectionLinkCard
        to="/nashi-raboty"
        eyebrow="Портфолио"
        title="Наши работы на объектах"
        description="5000+ выполненных заказов за 10 лет — фотоотчёты с реальных объектов."
        icon="Camera"
        cta="Смотреть работы"
        imageUrl="/img/banner-raboty.webp"
      />

      {/* Клиенты остаются на главной — блок лёгкий */}
      <SectionBackdrop tone="soft" pattern="cargo">
        <LazySection><ClientsSection /></LazySection>
      </SectionBackdrop>

      {/* Отзывы вынесены на /otzyvy — на главной короткая ссылка */}
      <SectionLinkCard
        to="/otzyvy"
        eyebrow="Нам доверяют"
        title="Отзывы клиентов"
        description="Реальные отзывы с Яндекс.Карт от компаний и частных заказчиков."
        icon="Star"
        cta="Читать отзывы"
        imageUrl="/img/banner-otzyvy.webp"
      />

      <SectionDivider variant="diamond" />

      {/* SEO-текст — трубы / арматура (стройка) */}
      <SectionBackdrop tone="deep" pattern="pipes">
        <LazySection><SeoTextSection /></LazySection>
      </SectionBackdrop>

      {/* Частые вопросы вынесены на /voprosy — на главной короткая ссылка */}
      <SectionLinkCard
        to="/voprosy"
        eyebrow="Частые вопросы"
        title="Отвечаем на всё"
        description="Условия и цены, сроки подачи, документы и оплата, география работы."
        icon="HelpCircle"
        cta="Читать ответы"
        imageUrl="/img/banner-faq.webp"
      />

      <SectionDivider variant="glow" />

      <LazySection><BottomSections visibleSections={visibleSections} /></LazySection>
      <LazySection><SeoFooterLinks /></LazySection>
      <LazySection><SiteFooter /></LazySection>
    </div>
  );
};

export default Index;