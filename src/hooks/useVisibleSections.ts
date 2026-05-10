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
    const retry = (attemptsLeft: number) => {
      if (cancelled) return;
      sectionIds.forEach(attach);
      if (tracked.size < sectionIds.length && attemptsLeft > 0) {
        setTimeout(() => retry(attemptsLeft - 1), 200);
      }
    };
    retry(8);

    return () => {
      cancelled = true;
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return visibleSections;
};