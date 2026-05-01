import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { slides, WEBP_BASE } from "./heroData";

interface HeroSliderProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const HeroSlider = ({ current, setCurrent }: HeroSliderProps) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Автослайд: запускаем только когда вкладка активна — экономит CPU на мобильных
    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    // Откладываем запуск автослайда до полной загрузки страницы, чтобы не мешать LCP/TBT
    const kickoff = () => start();
    if (document.readyState === "complete") {
      kickoff();
    } else {
      window.addEventListener("load", kickoff, { once: true });
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stop();
      window.removeEventListener("load", kickoff);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [setCurrent]);

  return (
    <>
      {/* Мобильный и планшетный слайдер — премиум-карточка с рамкой и бликами */}
      <div className="relative lg:hidden w-full pt-24 sm:pt-28 pb-4 sm:pb-6 px-3 sm:px-6 md:px-10 bg-gradient-to-b from-background via-background to-black/80">
        {/* Декор — размытые золотые круги */}
        <div className="absolute top-16 -left-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-10 w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Бейдж над фото */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg shadow-accent/30"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-white" />
              </span>
              <span className="text-black text-[11px] sm:text-sm font-black uppercase tracking-widest">Наш автопарк</span>
            </div>
            <div className="text-white text-sm sm:text-base font-mono tabular-nums font-bold">
              <span className="text-accent">{String(current + 1).padStart(2, "0")}</span>
              <span className="text-white/50"> / {String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Карточка с фото */}
          <div className="relative rounded-3xl p-[2px]" style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.6) 0%, rgba(232,168,32,0.1) 40%, rgba(232,168,32,0.05) 60%, rgba(232,168,32,0.5) 100%)" }}>
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const startX = touchStartX.current;
              if (startX === null) return;
              const endX = e.changedTouches[0].clientX;
              const diff = endX - startX;
              if (Math.abs(diff) > 40) {
                if (diff < 0) setCurrent((prev) => (prev + 1) % slides.length);
                else setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
              }
              touchStartX.current = null;
            }}
          >
            {/* Сетка-узор на фоне */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(232,168,32,0.3) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

            {slides.map((slide, i) => {
              const isActive = i === current;
              const next = (current + 1) % slides.length;
              const prev = (current - 1 + slides.length) % slides.length;
              const shouldRender = isActive || i === next || i === prev;
              if (!shouldRender) return null;
              const fullSrc = slide.fullSrc || `${WEBP_BASE}/${slide.id}.webp`;
              return (
                <div
                  key={i}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                >
                  <img
                    src={fullSrc}
                    sizes="100vw"
                    alt={slide.alt}
                    className="w-full h-full object-contain object-center drop-shadow-2xl"
                    width="1600"
                    height="900"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                  />
                </div>
              );
            })}

            {/* Блик сверху */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Стрелки навигации */}
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-90 transition-transform z-10"
              aria-label="Предыдущий слайд"
            >
              <Icon name="ChevronLeft" size={16} className="text-white sm:!w-[18px] sm:!h-[18px]" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-90 transition-transform z-10"
              aria-label="Следующий слайд"
            >
              <Icon name="ChevronRight" size={16} className="text-white sm:!w-[18px] sm:!h-[18px]" />
            </button>

            {/* Подпись слайда */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p key={current} className="text-white text-sm font-semibold text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                {slides[current].alt}
              </p>
            </div>
          </div>
        </div>

        {/* Прогресс-полоска + точки */}
        <div className="relative mt-4 px-1">
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              key={current}
              className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-full"
              style={{ animation: "heroProgress 4s linear forwards" }}
            />
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Перейти к слайду ${i + 1} из ${slides.length}`}
                aria-current={i === current ? "true" : undefined}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
        </div>
        <style>{`@keyframes heroProgress { from { width: 0% } to { width: 100% } }`}</style>
      </div>

      {/* Десктопный слайдер — фон на весь экран */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const next = (current + 1) % slides.length;
        const prev = (current - 1 + slides.length) % slides.length;
        const shouldRender = isActive || i === next || i === prev;
        if (!shouldRender) return null;
        const fullSrc = slide.fullSrc || `${WEBP_BASE}/${slide.id}.webp`;
        return (
          <div
            key={i}
            className={`hidden lg:block absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={fullSrc}
              sizes="100vw"
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              width="1600"
              height="900"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          </div>
        );
      })}

      {/* Затемнение — только для десктопа */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10 z-10" />

      {/* Точки-индикаторы — десктоп */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-0 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Перейти к слайду ${i + 1} из ${slides.length}`}
            aria-current={i === current ? "true" : undefined}
            className="p-3 group"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/40 group-hover:bg-white/70"}`}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default HeroSlider;