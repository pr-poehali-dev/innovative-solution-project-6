import { useEffect, useState } from "react";
import HeroHeader from "./hero/HeroHeader";
import HeroSlider from "./hero/HeroSlider";
import HeroContent from "./hero/HeroContent";
import HeroLeadForm from "./hero/HeroLeadForm";
import HeroButtons from "./hero/HeroButtons";

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

      <section id="hero" className="relative lg:h-screen overflow-hidden">
        <HeroSlider current={current} setCurrent={setCurrent} />
        {!isDesktop && <HeroContent visibleSections={visibleSections} />}
        {isDesktop && (
          <div className="absolute inset-x-0 bottom-20 z-20">
            <HeroButtons overlay />
          </div>
        )}
      </section>

      {isDesktop && (
        <section className="relative bg-background">
          <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 gap-12 items-start">
            <HeroContent visibleSections={visibleSections} showForm={false} below />
            <div className="pt-2">
              <HeroLeadForm />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
