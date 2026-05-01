import { useState } from "react";
import HeroHeader from "./hero/HeroHeader";
import HeroSlider from "./hero/HeroSlider";
import HeroContent from "./hero/HeroContent";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <HeroHeader />

      {/* Hero Section: на мобиле текст идёт первым (быстрый LCP), слайдер ниже. На десктопе слайдер — абсолютный фон, порядок не важен. */}
      <section id="hero" className="relative flex flex-col lg:block lg:min-h-screen lg:items-center overflow-hidden">
        <div className="order-2 lg:order-none">
          <HeroSlider current={current} setCurrent={setCurrent} />
        </div>
        <div className="order-1 lg:order-none lg:flex lg:items-center lg:min-h-screen">
          <HeroContent visibleSections={visibleSections} />
        </div>
      </section>
    </>
  );
};

export default HeroSection;