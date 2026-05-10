import { useState, useEffect } from "react";
import OrderModal from "@/components/ui/OrderModal";
import SectionBadge from "@/components/ui/SectionBadge";
import { trucks } from "./fleet/data";
import TruckCard from "./fleet/TruckCard";
import OrderInfoBlock from "./fleet/OrderInfoBlock";
import FleetLightbox from "./fleet/FleetLightbox";

const FleetSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState("");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);

  const openModal = (truckTitle: string) => {
    setSelectedTruck(truckTitle);
    setModalOpen(true);
  };

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
    <section className="py-16 sm:py-32 px-4 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        truckName={selectedTruck}
        title="Заказать эту технику"
        submitLabel="Заказать технику"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge>Наш парк</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Наша техника
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью КМУ под вашу задачу
          </p>
        </div>

        {trucks.map((truck, idx) => (
          <TruckCard
            key={idx}
            truck={truck}
            idx={idx}
            total={trucks.length}
            onOrder={openModal}
            onOpenLightbox={setLightbox}
          />
        ))}

        <OrderInfoBlock />
      </div>

      <FleetLightbox data={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
};

export default FleetSection;
