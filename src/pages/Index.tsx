import { lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import LazySection from "@/components/LazySection";
import SeoMeta from "@/components/seo/SeoMeta";
import StructuredData from "@/components/seo/StructuredData";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import IndustrialBanner from "@/components/sections/IndustrialBanner";
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
const AsphaltBigBanner = lazy(() => import("@/components/sections/AsphaltBigBanner"));
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
        subtitle="15+ единиц спецтехники — манипуляторы, краны, асфальтоукладчики"
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

      {/* === Баннер — КИРПИЧ с доставкой === */}
      <IndustrialBanner
        eyebrow="СТРОЙМАТЕРИАЛЫ"
        titleStart="КИРПИЧ С"
        titleAccent="ДОСТАВКОЙ"
        subtitle="Силикатный и облицовочный кирпич — привезём и разгрузим манипулятором"
        icon="Blocks"
        size="md"
        href="/stroymaterialy/kirpich"
        clean
        caption="Склад силикатного кирпича — белый, жёлтый и розовый, отгрузка поддонами"
        alt="Склад силикатного кирпича поддонами — белый, жёлтый и розовый кирпич"
        imageUrl="/img/banner-kirpich.webp"
      />

      {/* Применение — следы протекторов (грузовая техника) */}
      <SectionBackdrop tone="warm" pattern="tracks">
        <LazySection><UseCasesSection /></LazySection>
      </SectionBackdrop>

      {/* === Баннер №3 — АСФАЛЬТ (асфальтоукладчик на закате) === */}
      <IndustrialBanner
        eyebrow="АСФАЛЬТИРОВАНИЕ"
        titleStart="УКЛАДЫВАЕМ"
        titleAccent="АСФАЛЬТ"
        subtitle="Дороги, дворы, парковки — под ключ с гарантией"
        icon="Construction"
        size="md"
        imageUrl="/img/banner-asfalt.webp"
      />

      {/* Всё про асфальт в одном месте: промо + большой баннер с калькулятором + SEO-текст */}
      <SectionBackdrop tone="warm" pattern="tracks">
        <LazySection><AsphaltPromoSection /></LazySection>
        <LazySection><AsphaltBigBanner /></LazySection>
        <SectionDivider variant="wave" />
        <LazySection><AsphaltSeoText /></LazySection>
      </SectionBackdrop>

      {/* Погода — чертёж со схемой (инженерный расчёт) */}
      <SectionBackdrop tone="deep" pattern="blueprint">
        <LazySection><WeatherWidget /></LazySection>
      </SectionBackdrop>

      {/* === Баннер №4 — НАШИ РАБОТЫ (экскаватор в работе) === */}
      <IndustrialBanner
        eyebrow="ПОРТФОЛИО"
        titleStart="НАШИ"
        titleAccent="РАБОТЫ"
        subtitle="5000+ выполненных заказов за 10 лет — фотоотчёты с объектов"
        icon="Camera"
        size="md"
        imageUrl="/img/banner-raboty.webp"
      />

      {/* Галерея + клиенты — контейнеры со стропами (груз / работа) */}
      <SectionBackdrop tone="soft" pattern="cargo">
        <LazySection><GallerySection /></LazySection>
        <SectionDivider variant="stripes" />
        <LazySection><ClientsSection /></LazySection>
      </SectionBackdrop>

      {/* === Баннер №5 — ОТЗЫВЫ (рукопожатие на стройке) === */}
      <IndustrialBanner
        eyebrow="НАМ ДОВЕРЯЮТ"
        titleStart="ОТЗЫВЫ"
        titleAccent="КЛИЕНТОВ"
        subtitle="Что говорят компании и частные заказчики о нашей работе"
        icon="Star"
        size="sm"
        imageUrl="/img/banner-otzyvy.webp"
      />

      {/* Отзывы — заклёпки на металле (надёжно) */}
      <SectionBackdrop tone="spotlight" pattern="rivets">
        <LazySection><ReviewsSection /></LazySection>
      </SectionBackdrop>

      <SectionDivider variant="diamond" />

      {/* SEO-текст — трубы / арматура (стройка) */}
      <SectionBackdrop tone="deep" pattern="pipes">
        <LazySection><SeoTextSection /></LazySection>
      </SectionBackdrop>

      {/* === Баннер №6 — FAQ (городские краны на закате) === */}
      <IndustrialBanner
        eyebrow="ЧАСТЫЕ ВОПРОСЫ"
        titleStart="ОТВЕЧАЕМ"
        titleAccent="НА ВСЁ"
        subtitle="Условия, цены, документы, география работы"
        icon="HelpCircle"
        size="sm"
        imageUrl="/img/banner-faq.webp"
      />

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