import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import OrderModal from "@/components/ui/OrderModal";

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
  const [orderPhoto, setOrderPhoto] = useState<(typeof photos)[number] | null>(null);

  const prev = () => setActive((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const next = () => setActive((p) => (p !== null ? (p + 1) % photos.length : 0));

  const openOrder = (
    photo: (typeof photos)[number],
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setOrderPhoto(photo);
  };

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
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:from-black/0 sm:via-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-300 flex flex-col justify-end p-3 sm:p-5 gap-2">
                <p className="text-white text-xs sm:text-sm font-semibold sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:translate-y-2 group-hover:translate-y-0 line-clamp-2 drop-shadow-md">
                  {photo.caption}
                </p>
                <button
                  type="button"
                  onClick={(e) => openOrder(photo, e)}
                  className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-accent to-accent/80 text-black shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 active:scale-95 transition-all sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                >
                  <Icon name="Sparkles" size={14} />
                  Хочу такую же
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox — фото на весь экран */}
      {active !== null && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <img
            src={photos[active].url}
            alt={photos[active].caption}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            className="w-screen h-screen object-contain select-none"
            decoding="async"
          />

          <button
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
            onClick={(e) => { e.stopPropagation(); setActive(null); }}
            aria-label="Закрыть"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>

          <button
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Предыдущее"
          >
            <Icon name="ChevronLeft" size={26} className="text-white" />
          </button>

          <button
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Следующее"
          >
            <Icon name="ChevronRight" size={26} className="text-white" />
          </button>

          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs sm:text-sm font-bold z-10">
            {active + 1} / {photos.length}
          </div>

          <div className="absolute left-0 right-0 bottom-0 px-4 py-4 sm:py-5 text-center bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10">
            <p className="text-white text-sm sm:text-base font-semibold drop-shadow mb-3">
              {photos[active].caption}
            </p>
            <button
              type="button"
              onClick={(e) => openOrder(photos[active], e)}
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-bold bg-gradient-to-r from-accent to-accent/80 text-black shadow-xl shadow-accent/40 hover:shadow-2xl hover:shadow-accent/60 hover:scale-105 active:scale-95 transition-all"
            >
              <Icon name="Sparkles" size={18} />
              Хочу такую же
            </button>
          </div>
        </div>
      )}

      <OrderModal
        open={orderPhoto !== null}
        onClose={() => setOrderPhoto(null)}
        title="Хочу такую же работу"
        truckName={orderPhoto ? orderPhoto.caption : undefined}
        submitLabel="Рассчитать стоимость"
      />
    </section>
  );
};

export default GallerySection;