import { Suspense, useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  id?: string;
}

const LazySection = ({ children, minHeight = "400px", rootMargin, id }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    // Если IntersectionObserver недоступен — показываем сразу
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Запас хода: секция начинает грузиться за 1.5 экрана до появления,
    // чтобы к моменту прокрутки она уже была отрисована
    const margin = rootMargin ?? `${Math.round((window.innerHeight || 800) * 1.5)}px`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      id={id}
      style={{ minHeight: visible ? undefined : minHeight, contain: visible ? undefined : "layout" }}
    >
      {visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
};

export default LazySection;
