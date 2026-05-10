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
    // На мобильных — меньше предзагрузка (быстрее открытие), на десктопе — больше (плавнее скролл)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const margin = rootMargin ?? (isMobile ? "120px" : "300px");
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
  }, [visible, rootMargin]);

  return (
    <div
      ref={ref}
      id={id}
      style={{
        minHeight: visible ? undefined : minHeight,
        contentVisibility: visible ? undefined : ("auto" as const),
        containIntrinsicSize: visible ? undefined : `1px ${minHeight}`,
      }}
    >
      {visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
};

export default LazySection;