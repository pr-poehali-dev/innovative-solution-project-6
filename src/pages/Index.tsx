import { useEffect, useState } from "react";
import PhoneButton from "@/components/ui/PhoneButton";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FleetSection from "@/components/sections/FleetSection";
import BottomSections from "@/components/sections/BottomSections";
import ReviewsSection from "@/components/sections/ReviewsSection";
import GallerySection from "@/components/sections/GallerySection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import ClientsSection from "@/components/sections/ClientsSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import StatsSection from "@/components/sections/StatsSection";

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
      <HeroSection visibleSections={visibleSections} />
      <FeaturesSection visibleSections={visibleSections} />
      <FleetSection />
      <UseCasesSection />
      <CalculatorSection />
      <GallerySection />
      <ClientsSection />
      <ReviewsSection />
      <BottomSections visibleSections={visibleSections} />


    </div>
  );
};

export default Index;