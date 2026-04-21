import { useEffect, useState } from "react";
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
      <HeroSection visibleSections={visibleSections} />
      <FeaturesSection visibleSections={visibleSections} />
      <FleetSection />
      <UseCasesSection />
      <CalculatorSection />
      <GallerySection />
      <ClientsSection />
      <ReviewsSection />
      <BottomSections visibleSections={visibleSections} />

      {/* Плавающая кнопка звонка */}
      <a
        href="tel:+79601883084"
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-full hover:scale-105 active:scale-95 px-4 sm:px-5 py-3.5 border font-black"
        style={{ color: "#e8a820", borderColor: "#e8a820", background: "rgba(232,168,32,0.08)", animation: "goldPulse 1.2s ease-in-out infinite", fontFamily: "'Cinzel', serif" }}
      >
        <span className="text-xl">📞</span>
        <span className="text-sm sm:text-base hidden sm:block">+7 960 188-30-84</span>
      </a>
    </div>
  );
};

export default Index;