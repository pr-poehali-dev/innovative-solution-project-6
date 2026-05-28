import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Icon from "@/components/ui/icon";

interface WorkPhoto {
  url: string;
  title: string;
  description: string;
  location?: string;
  truck?: string;
}

// Реальные фото с объектов — легко добавлять новые
const REAL_WORKS: WorkPhoto[] = [
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/191b94b2-35ca-4309-9273-0325efde7891.jpg",
    title: "Доставка на загородный объект",
    description:
      "Перевозка строительных материалов и разгрузка манипулятором на территории коттеджного посёлка",
    location: "Нижегородская область",
    truck: "FAW J6P-390 + DongYang SS1956 ACE",
  },
  // ⬇️ Сюда легко добавлять новые фото:
  // {
  //   url: "https://...",
  //   title: "...",
  //   description: "...",
  //   location: "...",
  //   truck: "...",
  // },
];

const RealWorkGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: REAL_WORKS.length > 1,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightbox, setLightbox] = useState<WorkPhoto | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Если фото только одно — показываем без стрелок и точек
  const single = REAL_WORKS.length === 1;

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex flex-col items-center text-center mb-7 sm:mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-accent/60" />
            <Icon name="Camera" size={16} className="text-accent" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] text-accent uppercase">
              С реальных объектов
            </span>
            <Icon name="Camera" size={16} className="text-accent" />
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-accent/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            <span className="text-white">НАШИ </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ffe890 0%, #f5d060 50%, #e8a820 100%)",
              }}
            >
              РАБОТЫ
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/75">
            Реальные фотографии нашей техники на выезде — без постановочных снимков и стоков
          </p>
          <div className="mt-4 flex items-center gap-3 opacity-80">
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-accent/60 to-accent" />
            <span className="w-2 h-2 rotate-45 bg-accent shadow-[0_0_12px_rgba(245,208,96,0.9)]" />
            <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-accent/60 to-accent" />
          </div>
        </div>

        {/* Карусель */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {REAL_WORKS.map((work, i) => (
                <div
                  key={i}
                  className="relative flex-[0_0_100%] sm:flex-[0_0_92%] md:flex-[0_0_85%] lg:flex-[0_0_78%] min-w-0 px-1 sm:px-2"
                >
                  {/* Карточка с фото */}
                  <button
                    type="button"
                    onClick={() => setLightbox(work)}
                    className="relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl group cursor-zoom-in"
                    aria-label={`Увеличить фото: ${work.title}`}
                  >
                    {/* Золотая рамка */}
                    <div
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(245,208,96,0.9) 0%, rgba(232,168,32,0.3) 50%, rgba(232,168,32,0.8) 100%)",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        padding: "2px",
                      }}
                      aria-hidden="true"
                    />
                    {/* Уголки */}
                    <span className="absolute top-3 left-3 w-7 h-7 border-l-2 border-t-2 border-accent z-20 pointer-events-none" aria-hidden="true" />
                    <span className="absolute top-3 right-3 w-7 h-7 border-r-2 border-t-2 border-accent z-20 pointer-events-none" aria-hidden="true" />
                    <span className="absolute bottom-3 left-3 w-7 h-7 border-l-2 border-b-2 border-accent z-20 pointer-events-none" aria-hidden="true" />
                    <span className="absolute bottom-3 right-3 w-7 h-7 border-r-2 border-b-2 border-accent z-20 pointer-events-none" aria-hidden="true" />

                    {/* Иконка лупы при наведении */}
                    <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-11 h-11 rounded-full bg-accent/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                        <Icon name="ZoomIn" size={20} className="text-black" />
                      </div>
                    </div>

                    {/* Лейбл «реальное фото» */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-accent/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase">
                          Реальное фото · {i + 1} / {REAL_WORKS.length}
                        </span>
                      </div>
                    </div>

                    {/* Фото */}
                    <img
                      src={work.url}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="relative w-full h-[260px] sm:h-[400px] md:h-[520px] object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                    />

                    {/* Информационная плашка снизу */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pt-12 sm:pt-16 z-20 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)",
                      }}
                    >
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white mb-1.5 sm:mb-2 leading-tight">
                        {work.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/85 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                        {work.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {work.truck && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/40">
                            <Icon name="Truck" size={11} className="text-accent" />
                            <span className="text-[10px] sm:text-xs text-accent font-semibold">
                              {work.truck}
                            </span>
                          </div>
                        )}
                        {work.location && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                            <Icon name="MapPin" size={11} className="text-white/80" />
                            <span className="text-[10px] sm:text-xs text-white/90 font-medium">
                              {work.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Стрелки навигации — только если фото больше 1 */}
          {!single && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Предыдущее фото"
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 backdrop-blur-sm border border-accent/40 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all group"
              >
                <Icon
                  name="ChevronLeft"
                  size={20}
                  className="text-accent group-hover:text-black sm:!w-6 sm:!h-6"
                />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Следующее фото"
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 backdrop-blur-sm border border-accent/40 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all group"
              >
                <Icon
                  name="ChevronRight"
                  size={20}
                  className="text-accent group-hover:text-black sm:!w-6 sm:!h-6"
                />
              </button>
            </>
          )}
        </div>

        {/* Точки пагинации — только если фото больше 1 */}
        {!single && (
          <div className="flex justify-center gap-2 mt-5 sm:mt-7">
            {REAL_WORKS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Перейти к фото ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === i
                    ? "w-8 bg-accent shadow-[0_0_12px_rgba(245,208,96,0.7)]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Подсказка добавить ещё */}
        <p className="text-center mt-6 sm:mt-8 text-xs text-white/50 italic">
          {REAL_WORKS.length === 1
            ? "Скоро добавим больше реальных фотографий с объектов"
            : `${REAL_WORKS.length} реальных объектов · нажмите на фото для увеличения`}
        </p>
      </div>

      {/* === Лайтбокс — полноэкранный просмотр === */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
          >
            <Icon name="X" size={22} className="text-white" />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 sm:mt-5 text-center">
              <h3 className="text-lg sm:text-2xl font-black text-white mb-1">
                {lightbox.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 mb-2">
                {lightbox.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {lightbox.truck && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-xs text-accent font-semibold">
                    <Icon name="Truck" size={12} />
                    {lightbox.truck}
                  </span>
                )}
                {lightbox.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/90">
                    <Icon name="MapPin" size={12} />
                    {lightbox.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RealWorkGallery;
