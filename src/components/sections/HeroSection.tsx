import { useEffect, useState } from "react";
import HeroHeader from "./hero/HeroHeader";
import HeroSlider from "./hero/HeroSlider";
import HeroContent from "./hero/HeroContent";
import HeroLeadForm from "./hero/HeroLeadForm";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  return (
    <>
      <HeroHeader />

      <section id="hero" className="relative lg:min-h-screen lg:flex lg:items-center overflow-hidden">
        <HeroSlider current={current} setCurrent={setCurrent} />
        <HeroContent visibleSections={visibleSections} showForm={!isDesktop} />
      </section>

      {isDesktop && (
        <section className="relative bg-background py-12">
          <div className="max-w-3xl mx-auto px-6">
            <HeroLeadForm />
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
