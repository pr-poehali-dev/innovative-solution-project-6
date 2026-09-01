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
    // Большой margin — секции успеют подгрузиться до того, как пользователь до них доскроллит
    const margin = rootMargin ?? "800px";
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

    // Страховка: если за 3.5с секция так и не показалась (например, из-за content-visibility),
    // принудительно загружаем её, чтобы пользователь не увидел пустоту
    const fallback = window.setTimeout(() => setVisible(true), 3500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [rootMargin]);

  // content-visibility на мобильных вызывает мигание и чёрные полосы при скролле:
  // браузер постоянно пересчитывает высоту секции. Держим только минимальную высоту.
  return (
    <div ref={ref} id={id} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
};

export default LazySection;