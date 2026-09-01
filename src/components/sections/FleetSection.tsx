import { useState, useEffect } from "react";
import { trucks } from "./fleet/data";
import TruckCard from "./fleet/TruckCard";
import OrderInfoBlock from "./fleet/OrderInfoBlock";
import FleetLightbox from "./fleet/FleetLightbox";
import LazySection from "@/components/LazySection";

const FleetSection = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>(".parallax-card");
        const vh = window.innerHeight;
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".parallax-img");
          if (!img) return;
          const rect = card.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          const offset = Math.max(-20, Math.min(20, progress * -25));
          img.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pt-4 sm:pt-6 pb-16 sm:pb-32 px-4 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {trucks.map((truck, idx) => {
          const card = (
            <TruckCard
              truck={truck}
              idx={idx}
              total={trucks.length}
              onOpenLightbox={setLightbox}
            />
          );
          // Первые 2 карточки рендерим сразу, остальные — по мере прокрутки,
          // иначе телефон одновременно тянет 13 фото и подвисает
          return idx < 2 ? (
            <div key={idx}>{card}</div>
          ) : (
            <LazySection key={idx} minHeight="700px">
              {card}
            </LazySection>
          );
        })}

        <OrderInfoBlock />
      </div>

      <FleetLightbox data={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
};

export default FleetSection;