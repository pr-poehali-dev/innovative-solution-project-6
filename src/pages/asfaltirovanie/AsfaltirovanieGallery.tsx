import { useState, useMemo, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type Category = "yards" | "parking" | "roads" | "process";

type Work = {
  src: string;
  title: string;
  area: string;
  location: string;
  category: Category;
};

const works: Work[] = [
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/3ff228ce-886a-4efa-bac4-e98976c379a1.jpg",
    title: "Двор жилого дома",
    area: "1 200 м²",
    location: "Нижний Новгород",
    category: "yards",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/44daedbe-8ea1-468e-af86-b1778e5f5de9.jpg",
    title: "Парковка ТЦ",
    area: "3 500 м²",
    location: "Дзержинск",
    category: "parking",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/0efa338f-3a1c-4595-8a6d-a47d7161ff3f.jpg",
    title: "Дворовая территория",
    area: "850 м²",
    location: "Нижний Новгород",
    category: "yards",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9e903a42-a5d3-4875-8217-d4d8b30166c0.jpg",
    title: "Ямочный ремонт",
    area: "420 м²",
    location: "Кстово",
    category: "roads",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/cf9bf1c6-f980-427b-8dcc-74d7647ea7b9.jpg",
    title: "Промышленная площадка",
    area: "8 700 м²",
    location: "Богородск",
    category: "parking",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9108011f-75c5-4231-a104-f0eb06943729.jpg",
    title: "Подъезд к коттеджу",
    area: "180 м²",
    location: "Нижегородская обл.",
    category: "yards",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/9a4ce060-8f23-43d3-9969-ac89ac70fd0d.jpg",
    title: "Школьная территория",
    area: "1 500 м²",
    location: "Нижний Новгород",
    category: "yards",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/6af5003a-b34d-43b1-8c9d-56940fb7314d.jpg",
    title: "Парковка супермаркета",
    area: "2 800 м²",
    location: "Арзамас",
    category: "parking",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/6246b3ce-7192-48ca-b459-a04121f251f4.jpg",
    title: "Укладка асфальта",
    area: "процесс работ",
    location: "Нижний Новгород",
    category: "process",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/ad14ffca-4c80-43db-931f-bb0041da5d53.jpg",
    title: "Загородная дорога",
    area: "5 200 м²",
    location: "Городец",
    category: "roads",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/62518e7d-e4bc-4826-be58-11a8633260e0.jpg",
    title: "Дорожки в парке",
    area: "960 м²",
    location: "Нижний Новгород",
    category: "roads",
  },
  {
    src: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/3d013303-4160-4174-a961-b7fd129023dd.jpg",
    title: "Укатка катком",
    area: "процесс работ",
    location: "Кстово",
    category: "process",
  },
];

type Tab = { id: "all" | Category; label: string; icon: string };

const tabs: Tab[] = [
  { id: "all", label: "Все работы", icon: "LayoutGrid" },
  { id: "yards", label: "Дворы", icon: "Home" },
  { id: "parking", label: "Парковки", icon: "Car" },
  { id: "roads", label: "Дороги", icon: "Milestone" },
  { id: "process", label: "Процесс работ", icon: "HardHat" },
];

const AsfaltirovanieGallery = () => {
  const [active, setActive] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab["id"]>("all");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const goPrev = () =>
    setActive((p) => (p === null ? 0 : (p - 1 + works.length) % works.length));
  const goNext = () =>
    setActive((p) => (p === null ? 0 : (p + 1) % works.length));

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setSwipeOffset(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy)) setSwipeOffset(dx);
  };
  const onTouchEnd = () => {
    if (!touchStart.current) return;
    if (swipeOffset > 60) goPrev();
    else if (swipeOffset < -60) goNext();
    setSwipeOffset(0);
    touchStart.current = null;
  };

  const filtered = useMemo(
    () => (tab === "all" ? works : works.filter((w) => w.category === tab)),
    [tab],
  );

  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
          <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            Наши работы
          </span>
        </h2>
        <p className="text-center text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Фото готовых объектов в Нижнем Новгороде и области
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {tabs.map((t) => {
            const isActive = tab === t.id;
            const count =
              t.id === "all"
                ? works.length
                : works.filter((w) => w.category === t.id).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40 scale-105"
                    : "bg-white/80 text-slate-700 border border-amber-200 hover:bg-amber-50 hover:border-amber-400"
                }`}
              >
                <Icon name={t.icon} size={14} />
                <span>{t.label}</span>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/25" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filtered.map((w) => {
            const i = works.indexOf(w);
            return (
              <button
                type="button"
                key={w.src}
                onClick={() => setActive(i)}
                className="group relative overflow-hidden rounded-2xl bg-white border border-amber-200 shadow-lg shadow-amber-200/30 sm:hover:shadow-xl sm:hover:shadow-amber-300/50 sm:hover:-translate-y-1 active:scale-95 transition-all text-left cursor-pointer"
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
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            В этой категории пока нет фото
          </div>
        )}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black animate-in fade-in overflow-hidden"
          style={{ width: "100vw", height: "100dvh" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={works[active].src}
            alt={works[active].title}
            className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            style={{
              width: "100vw",
              height: "100dvh",
              transform: `translateX(${swipeOffset}px)`,
              transition: swipeOffset === 0 ? "transform 0.25s ease" : "none",
              opacity: 1 - Math.min(Math.abs(swipeOffset) / 400, 0.4),
            }}
            draggable={false}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 flex items-center justify-center text-white transition backdrop-blur"
            aria-label="Закрыть"
          >
            <Icon name="X" size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 flex items-center justify-center text-white transition backdrop-blur"
            aria-label="Предыдущее"
          >
            <Icon name="ChevronLeft" size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 flex items-center justify-center text-white transition backdrop-blur"
            aria-label="Следующее"
          >
            <Icon name="ChevronRight" size={26} />
          </button>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs sm:text-sm font-bold">
            {active + 1} / {works.length}
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 px-4 py-3 sm:py-4 text-center text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-bold text-base sm:text-lg drop-shadow">
              {works[active].title}
            </div>
            <div className="text-xs sm:text-sm opacity-90 mt-0.5">
              {works[active].area} · {works[active].location}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AsfaltirovanieGallery;