import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FleetSection from "@/components/sections/FleetSection";
import BottomSections from "@/components/sections/BottomSections";
import ReviewsSection from "@/components/sections/ReviewsSection";
import GallerySection from "@/components/sections/GallerySection";

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
      <GallerySection />
      <ReviewsSection />
      <BottomSections visibleSections={visibleSections} />

      {/* Плавающая кнопка звонка */}
      <a
        href="tel:+79601883084"
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full shadow-2xl shadow-accent/40 hover:shadow-accent/60 transition-all hover:scale-105 active:scale-95 px-4 sm:px-5 py-3.5"
      >
        <div className="w-8 h-8 flex items-center justify-center relative">
          <span className="absolute inset-0 rounded-full bg-black/20 animate-ping" />
          <span className="text-xl">📞</span>
        </div>
        <span className="font-black text-sm sm:text-base hidden sm:block">+7 960 188-30-84</span>
      </a>
    </div>
  );
};

export default Index;