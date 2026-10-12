import { useState } from "react";
import type { Truck } from "./trucksData";

interface TruckGalleryProps {
  truck: Truck;
}

export default function TruckGallery({ truck }: TruckGalleryProps) {
  const gallery =
    truck.images && truck.images.length > 0 ? truck.images : [truck.image];
  const [active, setActive] = useState(0);
  const current = gallery[active] ?? truck.image;

  return (
    <div className="flex flex-col gap-3">
      {/* Главное фото */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-card/50 border border-accent/10">
        <img
          key={current}
          src={current}
          alt={truck.alt}
          className="w-full h-full object-contain animate-in fade-in duration-300"
          width="1200"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute top-4 left-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
          {truck.badge}
        </div>
      </div>

      {/* Миниатюры */}
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto snap-x pb-1 -mx-1 px-1 sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible sm:mx-0 sm:px-0">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={`relative shrink-0 w-20 sm:w-auto snap-start rounded-xl overflow-hidden aspect-square bg-card/50 border transition-all ${
                active === i
                  ? "border-accent ring-2 ring-accent/40"
                  : "border-accent/10 hover:border-accent/50"
              }`}
            >
              <img
                src={img}
                alt={`${truck.title} — фото ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
