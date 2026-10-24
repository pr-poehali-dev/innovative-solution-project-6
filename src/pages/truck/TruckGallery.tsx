import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Truck } from "./trucksData";

interface TruckGalleryProps {
  truck: Truck;
}

type Item = { type: "image"; src: string; thumb: string } | { type: "video"; src: string; thumb: string };

export default function TruckGallery({ truck }: TruckGalleryProps) {
  const photos = truck.images && truck.images.length > 0 ? truck.images : [truck.image];
  const gallery: Item[] = [
    ...photos.map((src) => ({ type: "image" as const, src, thumb: src })),
    ...(truck.videos ?? []).map((v) => ({ type: "video" as const, src: v.src, thumb: v.poster })),
  ];
  const [active, setActive] = useState(0);
  const current = gallery[active] ?? gallery[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-card/50 border border-accent/10">
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.thumb}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={truck.alt}
            className="w-full h-full object-contain animate-in fade-in duration-300"
            width="1200"
            height="900"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute top-4 left-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
          {truck.badge}
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto snap-x pb-1 -mx-1 px-1 sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible sm:mx-0 sm:px-0">
          {gallery.map((item, i) => (
            <button
              key={item.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.type === "video" ? `Видео ${i + 1}` : `Фото ${i + 1}`}
              className={`relative shrink-0 w-20 sm:w-auto snap-start rounded-xl overflow-hidden aspect-square bg-card/50 border transition-all ${
                active === i
                  ? "border-accent ring-2 ring-accent/40"
                  : "border-accent/10 hover:border-accent/50"
              }`}
            >
              <img
                src={item.thumb}
                alt={`${truck.title} — ${item.type === "video" ? "видео" : "фото"} ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center">
                    <Icon name="Play" size={18} />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
