import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Выполненных заказов" },
  { value: 10, suffix: " лет", label: "На рынке Нижнего Новгорода" },
  { value: 17, suffix: "т", label: "Макс. грузоподъёмность" },
  { value: 23, suffix: "м", label: "Вылет стрелы" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

const StatCard = ({ value, suffix, label, active, delay }: { value: number; suffix: string; label: string; active: boolean; delay: number }) => {
  const count = useCountUp(value, 1500, active);
  return (
    <div
      className={`text-center transition-all duration-700 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-accent leading-none mb-3">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground text-sm sm:text-base font-medium">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} active={visible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
