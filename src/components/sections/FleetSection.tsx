import { useState, useEffect } from "react";
import LazySection from "@/components/LazySection";
import { trucks } from "./fleet/data";
import TruckCard from "./fleet/TruckCard";
import OrderInfoBlock from "./fleet/OrderInfoBlock";
import FleetLightbox from "./fleet/FleetLightbox";

const FleetSection = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);

  // Предзагрузка фото парка — ТОЛЬКО на десктопе.
  // На телефоне одновременная загрузка десятка больших фото переполняет память:
  // браузер начинает выгружать и заново декодировать картинки, экран мигает.
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const urls = Array.from(
      new Set(trucks.flatMap((t) => (t.images?.length ? t.images : t.image ? [t.image] : [])))
    );
    let i = 0;
    let stopped = false;
    const next = () => {
      if (stopped || i >= urls.length) return;
      const img = new Image();
      img.src = urls[i++];
      img.onload = img.onerror = () => window.setTimeout(next, 120);
    };
    const t = window.setTimeout(next, 1200);
    return () => {
      stopped = true;
      window.clearTimeout(t);
    };
  }, []);

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
          // Первые 3 карточки рисуем сразу, остальные — через фоновую очередь.
          // Они всё равно готовы до того, как пользователь долистает, но телефон
          // собирает их по одной и не захлёбывается от 13 карточек разом.
          return idx < 3 ? (
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