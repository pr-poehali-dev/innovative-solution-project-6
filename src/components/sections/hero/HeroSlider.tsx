import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { slides, WEBP_BASE } from "./heroData";

interface HeroSliderProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const HeroSlider = ({ current, setCurrent }: HeroSliderProps) => {
  const touchStartX = useRef<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (interacted) return;
    const mark = () => setInteracted(true);
    // Откладываем подгрузку соседних слайдов до полной загрузки + idle,
    // чтобы LCP-картинка не конкурировала за сеть/CPU
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = (window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }).requestIdleCallback(mark, { timeout: 8000 });
      } else {
        timeoutId = setTimeout(mark, 6000);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      window.removeEventListener("load", schedule);
    };
  }, [interacted]);

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
      {/* Мобильный и планшетный слайдер — на всю ширину экрана */}
      <div className="relative lg:hidden w-full pt-16 sm:pt-20 pb-3 sm:pb-4 bg-gradient-to-b from-background via-background to-black/80">
        {/* Декор — размытые золотые круги (только на планшете, на мобилке съедает FPS) */}
        <div className="hidden sm:block absolute top-16 -left-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 -right-10 w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative w-full">
          {/* Карточка с фото — на всю ширину, без скруглений */}
          <div className="relative">
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
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
              const shouldRender = isActive || (interacted && (i === next || i === prev));
              if (!shouldRender) return null;
              const fullSrc = slide.fullSrc || `${WEBP_BASE}/${slide.id}.webp`;
              return (
                <div
                  key={i}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                >
                  <img
                    src={fullSrc}
                    sizes="(max-width: 1024px) 100vw, 0px"
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center"
                    width="800"
                    height="600"
                    loading={i === 0 ? "eager" : "lazy"}
                    {...({ fetchpriority: i === 0 ? "high" : "low" } as Record<string, string>)}
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

          </div>
        </div>

        </div>
      </div>

      {/* Десктопный слайдер — фон на весь экран. Рендерим только если реально десктоп */}
      {isDesktop && slides.map((slide, i) => {
        const isActive = i === current;
        const next = (current + 1) % slides.length;
        const prev = (current - 1 + slides.length) % slides.length;
        const shouldRender = isActive || (interacted && (i === next || i === prev));
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
              {...({ fetchpriority: i === 0 ? "high" : "low" } as Record<string, string>)}
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