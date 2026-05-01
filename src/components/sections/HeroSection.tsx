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

      {/* Hero Section */}
      <section id="hero" className="relative lg:min-h-screen lg:flex lg:items-center overflow-hidden">
        <HeroSlider current={current} setCurrent={setCurrent} />
        <HeroContent visibleSections={visibleSections} />
      </section>
    </>
  );
};

export default HeroSection;