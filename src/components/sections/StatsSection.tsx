

const stats = [
  { value: 10, suffix: " лет", label: "На рынке Нижнего Новгорода" },
  { value: 17, suffix: "т", label: "Макс. грузоподъёмность" },
  { value: 23, suffix: "м", label: "Вылет стрелы" },
];

const StatCard = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const count = value;
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-accent leading-none mb-3">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground text-sm sm:text-base font-medium">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;