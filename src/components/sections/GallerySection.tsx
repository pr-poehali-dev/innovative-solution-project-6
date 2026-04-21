import { useState } from "react";
import Icon from "@/components/ui/icon";

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/96f657e8-7741-4d2b-b428-ca560b0047fb.jpg",
    caption: "Монтаж металлоконструкций ангара",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/8f5f1c5e-cd31-4f9e-83e9-6814c83c395e.jpg",
    caption: "Работа на высоте — строительство склада",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/b5c276a4-5b1a-4bc7-ad4f-af1964ea3099.jpg",
    caption: "Монтаж конструкций на промышленном объекте",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/201f98a5-c2c5-42cf-9c8f-6fbd5c67b508.jpg",
    caption: "Два манипулятора на строительстве производственного здания",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/0c5ebbe2-cc38-4284-81fb-4721e3e53eaa.jpg",
    caption: "Перевозка и разгрузка кабельных барабанов",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/62534a4c-b7cb-4179-a953-6bf52321d543.jpg",
    caption: "Монтаж кровли — подъём сэндвич-панелей",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/bb2703e5-098c-4386-968f-1c4f5bd48fac.jpg",
    caption: "Установка металлического гаража на участке",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/1d067d16-d8b2-42b2-b1ef-4a27f3db79f1.jpg",
    caption: "Перевозка торгового павильона по городу",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/737482fb-5cef-4606-94a1-7256b0d8b9ab.jpg",
    caption: "Монтаж фасадных панелей на здании",
  },
];

const GallerySection = () => {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const next = () => setActive((p) => (p !== null ? (p + 1) % photos.length : 0));

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Портфолио</span>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Выполненные работы
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Реальные объекты — стройки, склады, промышленные предприятия Нижнего Новгорода и области
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-accent/10 hover:border-accent/40 transition-all duration-300 ${i === 0 ? "col-span-2 lg:col-span-2 row-span-1" : ""}`}
              style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
              onClick={() => setActive(i)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {photo.caption}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ZoomIn" size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setActive(null)}
          >
            <Icon name="X" size={20} className="text-white" />
          </button>

          <button
            className="absolute left-4 lg:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[active].url}
              alt={photos[active].caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-center text-white/70 mt-4 text-sm">{photos[active].caption}</p>
            <p className="text-center text-accent/50 text-xs mt-1">{active + 1} / {photos.length}</p>
          </div>

          <button
            className="absolute right-4 lg:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;