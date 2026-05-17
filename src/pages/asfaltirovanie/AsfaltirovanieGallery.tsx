import { useState } from "react";
import Icon from "@/components/ui/icon";

const works = [
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/3ff228ce-886a-4efa-bac4-e98976c379a1.jpg",
    title: "Двор жилого дома",
    area: "1 200 м²",
    location: "Нижний Новгород",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/44daedbe-8ea1-468e-af86-b1778e5f5de9.jpg",
    title: "Парковка ТЦ",
    area: "3 500 м²",
    location: "Дзержинск",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/0efa338f-3a1c-4595-8a6d-a47d7161ff3f.jpg",
    title: "Дворовая территория",
    area: "850 м²",
    location: "Нижний Новгород",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9e903a42-a5d3-4875-8217-d4d8b30166c0.jpg",
    title: "Ямочный ремонт",
    area: "420 м²",
    location: "Кстово",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/cf9bf1c6-f980-427b-8dcc-74d7647ea7b9.jpg",
    title: "Промышленная площадка",
    area: "8 700 м²",
    location: "Богородск",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9108011f-75c5-4231-a104-f0eb06943729.jpg",
    title: "Подъезд к коттеджу",
    area: "180 м²",
    location: "Нижегородская обл.",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9a4ce060-8f23-43d3-9969-ac89ac70fd0d.jpg",
    title: "Школьная территория",
    area: "1 500 м²",
    location: "Нижний Новгород",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/6af5003a-b34d-43b1-8c9d-56940fb7314d.jpg",
    title: "Парковка супермаркета",
    area: "2 800 м²",
    location: "Арзамас",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/6246b3ce-7192-48ca-b459-a04121f251f4.jpg",
    title: "Укладка асфальта",
    area: "процесс работ",
    location: "Нижний Новгород",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/ad14ffca-4c80-43db-931f-bb0041da5d53.jpg",
    title: "Загородная дорога",
    area: "5 200 м²",
    location: "Городец",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/62518e7d-e4bc-4826-be58-11a8633260e0.jpg",
    title: "Дорожки в парке",
    area: "960 м²",
    location: "Нижний Новгород",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/3d013303-4160-4174-a961-b7fd129023dd.jpg",
    title: "Укатка катком",
    area: "процесс работ",
    location: "Кстово",
  },
];

const AsfaltirovanieGallery = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
          <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            Наши работы
          </span>
        </h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
          Фото готовых объектов в Нижнем Новгороде и области
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {works.map((w, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-2xl bg-white border border-amber-200 shadow-lg shadow-amber-200/30 hover:shadow-xl hover:shadow-amber-300/50 hover:-translate-y-1 transition-all text-left"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={w.src}
                  alt={`${w.title} — ${w.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <div className="font-bold text-sm sm:text-base drop-shadow">
                  {w.title}
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90 mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <Icon name="Ruler" size={12} />
                    {w.area}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {w.location}
                  </span>
                </div>
              </div>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ZoomIn" size={16} className="text-amber-600" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            aria-label="Закрыть"
          >
            <Icon name="X" size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((p) => (p === null ? 0 : (p - 1 + works.length) % works.length));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            aria-label="Предыдущее"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((p) => (p === null ? 0 : (p + 1) % works.length));
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            aria-label="Следующее"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={works[active].src}
              alt={works[active].title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <div className="font-bold text-lg">{works[active].title}</div>
              <div className="text-sm opacity-80 mt-1">
                {works[active].area} · {works[active].location}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AsfaltirovanieGallery;