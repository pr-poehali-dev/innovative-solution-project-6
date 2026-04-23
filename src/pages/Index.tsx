import { lazy, useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import LazySection from "@/components/LazySection";

const FleetSection = lazy(() => import("@/components/sections/FleetSection"));
const BottomSections = lazy(() => import("@/components/sections/BottomSections"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const CalculatorSection = lazy(() => import("@/components/sections/CalculatorSection"));
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const UseCasesSection = lazy(() => import("@/components/sections/UseCasesSection"));

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <title>Аренда манипуляторов и спецтехники в Нижнем Новгороде — ООО Фаворит</title>
      <meta name="description" content="Аренда манипуляторов, экскаваторов-погрузчиков в Нижнем Новгороде. Собственный парк техники. Опыт 15 лет. От 2200 ₽/час. Звоните: +7 960 188-30-84." />
      <meta name="keywords" content="аренда манипулятора Нижний Новгород, аренда спецтехники НН, аренда экскаватора погрузчика Нижний Новгород, кран манипулятор аренда НН, аренда манипулятора с люлькой Нижний Новгород, аренда манипулятора с буром, спецтехника Нижегородская область, ООО Фаворит манипулятор" />
      <meta property="og:title" content="Аренда манипуляторов и спецтехники в Нижнем Новгороде — ООО Фаворит" />
      <meta property="og:description" content="Аренда манипуляторов, экскаваторов-погрузчиков в Нижнем Новгороде. Собственный парк техники. Опыт 15 лет. От 2200 ₽/час." />
      <meta property="og:type" content="website" />
      <meta name="google-site-verification" content="6TvMJWGLCEZfJBzJN2nd_HcZ-lGUr7QxdY92N2ELrg0" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ООО Фаворит",
        "url": "https://фаворит.рф",
        "telephone": "+79601883084",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Нижний Новгород",
          "addressRegion": "Нижегородская область",
          "addressCountry": "RU"
        },
        "description": "Аренда манипуляторов и спецтехники в Нижнем Новгороде. Собственный парк техники. Опыт 15 лет.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "12",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          { "@type": "Review", "author": { "@type": "Person", "name": "Андрей Соколов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Дмитрий Карпов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Сергей Михайлов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!" },
          { "@type": "Review", "author": { "@type": "Person", "name": "Николай Фёдоров" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Алексей Громов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Виктор Зайцев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Павел Орлов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Обращаемся регулярно — перевозим крупногабаритное оборудование. Всегда чёткая координация, водители опытные. Никаких задержек и накладок за всё время сотрудничества." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Игорь Васильев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Разгружали крупную партию металлоконструкций на складе. Работали быстро и аккуратно, всё разложили точно по местам. Оператор — настоящий профессионал." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Елена Смирнова" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Искала надёжного подрядчика для стройки — коллеги посоветовали Фаворит. Не пожалела: техника чистая, оператор вежливый, документы оформили без вопросов." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Максим Куликов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Заказывал манипулятор для переезда производственного цеха. Всё сделали за один день — думал, уйдёт минимум два. Цена оказалась ниже, чем у конкурентов." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Роман Тихонов" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Работаем с Фаворитом на нескольких объектах одновременно. Всегда выручают с техникой в последний момент. Диспетчеры на связи круглосуточно." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Олег Беляев" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Сотрудничаем уже пять лет. За это время ни разу не подвели — ни по срокам, ни по качеству. Техника всегда исправна, операторы знают своё дело." }
        ]
      })}</script>
      <HeroSection visibleSections={visibleSections} />
      <FeaturesSection visibleSections={visibleSections} />
      <LazySection><FleetSection /></LazySection>
      <LazySection><UseCasesSection /></LazySection>
      <LazySection><CalculatorSection /></LazySection>
      <LazySection><GallerySection /></LazySection>
      <LazySection><ClientsSection /></LazySection>
      <LazySection><ReviewsSection /></LazySection>
      <LazySection><BottomSections visibleSections={visibleSections} /></LazySection>


    </div>
  );
};

export default Index;