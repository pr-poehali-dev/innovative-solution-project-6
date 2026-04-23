import { useEffect, useState } from "react";

export const useVisibleSections = (sectionIds: string[]) => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const tracked = new Set<string>();

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

    sectionIds.forEach(attach);

    const mo = new MutationObserver(() => {
      sectionIds.forEach(attach);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return visibleSections;
};
