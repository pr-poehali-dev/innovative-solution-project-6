import { Suspense, useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  id?: string;
}

/**
 * Очередь фоновой догрузки.
 * Все секции, до которых пользователь ещё не долистал, встают в очередь и
 * незаметно подгружаются в паузах между кадрами. Благодаря этому при быстрой
 * прокрутке страница уже собрана и не мигает пустыми блоками.
 */
const queue: Array<() => void> = [];
let draining = false;

const idle = (cb: () => void) => {
  const ric = (window as unknown as { requestIdleCallback?: (c: () => void, o?: { timeout: number }) => number })
    .requestIdleCallback;
  if (ric) ric(cb, { timeout: 400 });
  else window.setTimeout(cb, 120);
};

const drain = () => {
  if (draining) return;
  draining = true;
  const step = () => {
    const next = queue.shift();
    if (!next) {
      draining = false;
      return;
    }
    next();
    idle(step);
  };
  idle(step);
};

const enqueue = (cb: () => void) => {
  queue.push(cb);
  drain();
};

const dequeue = (cb: () => void) => {
  const i = queue.indexOf(cb);
  if (i !== -1) queue.splice(i, 1);
};

const LazySection = ({ children, minHeight = "400px", rootMargin, id }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const show = () => setVisible(true);

    // Секция вблизи экрана — показываем немедленно, вне очереди
    const margin = rootMargin ?? `${Math.round((window.innerHeight || 800) * 2)}px`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dequeue(show);
          show();
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);

    // Всё остальное — в фоновую очередь, чтобы страница была готова заранее
    enqueue(show);

    return () => {
      observer.disconnect();
      dequeue(show);
    };
  }, [rootMargin, visible]);

  return (
    <div ref={ref} id={id} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
};

export default LazySection;
