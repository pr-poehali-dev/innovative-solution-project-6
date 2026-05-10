import { useEffect, useState } from "react";

export const useVisibleSections = (sectionIds: string[]) => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const tracked = new Set<string>();
    let cancelled = false;

    const attach = (id: string) => {
      if (tracked.has(id)) return;
      const element = document.getElementById(id);
      if (!element) return;
      tracked.add(id);
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
            observers[id].disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observers[id].observe(element);
    };

    // Пытаемся подключить — повторяем несколько раз с задержкой (вместо MutationObserver)
    // 30 попыток × 300мс = 9 сек — хватит времени, чтобы все ленивые секции отрендерились
    const retry = (attemptsLeft: number) => {
      if (cancelled) return;
      sectionIds.forEach(attach);
      if (tracked.size < sectionIds.length && attemptsLeft > 0) {
        setTimeout(() => retry(attemptsLeft - 1), 300);
      }
    };
    retry(30);

    // Страховка: помечаем все секции как видимые, чтобы анимации/контент точно показались
    const fallback = window.setTimeout(() => {
      if (cancelled) return;
      const allVisible: Record<string, boolean> = {};
      sectionIds.forEach((id) => { allVisible[id] = true; });
      setVisibleSections((prev) => ({ ...allVisible, ...prev }));
    }, 4000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return visibleSections;
};