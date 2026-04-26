import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/96f657e8-7741-4d2b-b428-ca560b0047fb.webp",
    caption: "Монтаж металлоконструкций ангара",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/8f5f1c5e-cd31-4f9e-83e9-6814c83c395e.webp",
    caption: "Работа на высоте — строительство склада",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/b5c276a4-5b1a-4bc7-ad4f-af1964ea3099.webp",
    caption: "Монтаж конструкций на промышленном объекте",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/201f98a5-c2c5-42cf-9c8f-6fbd5c67b508.webp",
    caption: "Два манипулятора на строительстве производственного здания",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/0c5ebbe2-cc38-4284-81fb-4721e3e53eaa.webp",
    caption: "Перевозка и разгрузка кабельных барабанов",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/62534a4c-b7cb-4179-a953-6bf52321d543.webp",
    caption: "Монтаж кровли — подъём сэндвич-панелей",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/bb2703e5-098c-4386-968f-1c4f5bd48fac.webp",
    caption: "Установка металлического гаража на участке",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/1d067d16-d8b2-42b2-b1ef-4a27f3db79f1.webp",
    caption: "Перевозка торгового павильона по городу",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/737482fb-5cef-4606-94a1-7256b0d8b9ab.webp",
    caption: "Монтаж фасадных панелей на здании",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/a386df86-71cf-4a6a-b971-87f437eab3db.webp",
    caption: "Совместная работа манипулятора и автовышки на стройке",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/56e40bf4-c213-4485-a5fc-cd80c85fb564.webp",
    caption: "Погрузка бетонных изделий на склад",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/ad03fa64-abbe-491a-85cc-f51f79cefc0a.webp",
    caption: "Перевозка торгового павильона «Хочу Есть» по городу",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/f96d4e3d-b06a-4cab-818e-ba49896791b5.webp",
    caption: "Работа автовышки на объектах РЖД зимой",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/e8b0e860-8ca1-40df-8600-4d28597aa247.webp",
    caption: "КамАЗ с манипулятором DY — готов к выезду на объект",
  },
];


const GallerySection = () => {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const next = () => setActive((p) => (p !== null ? (p + 1) % photos.length : 0));

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge>Портфолио</SectionBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Выполненные работы
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Реальные объекты — стройки, склады, промышленные предприятия Нижнего Новгорода и области
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group border border-accent/10 hover:border-accent/40 transition-all duration-300 ${i === 0 ? "col-span-2 lg:col-span-2" : ""}`}
              style={{ aspectRatio: "4/3" }}
              onClick={() => setActive(i)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent sm:from-black/0 sm:via-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-300 flex items-end p-3 sm:p-5">
                <p className="text-white text-xs sm:text-sm font-semibold sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:translate-y-2 group-hover:translate-y-0 line-clamp-2 drop-shadow-md">
                  {photo.caption}
                </p>
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
            className="absolute left-4 lg:left-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[active].url}
              alt={photos[active].caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-white/70 mt-4 text-sm">{photos[active].caption}</p>
            <p className="text-center text-accent/50 text-xs mt-1">{active + 1} / {photos.length}</p>
          </div>

          <button
            className="absolute right-4 lg:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
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