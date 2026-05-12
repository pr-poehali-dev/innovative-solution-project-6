import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { trucks as fleetTrucks } from "@/components/sections/fleet/data";

type Props = {
  currentSlug: string;
};

const SimilarTrucks = ({ currentSlug }: Props) => {
  const isExcavator = (slug: string) => slug.startsWith("jcb-");
  const currentIsExcavator = isExcavator(currentSlug);

  const sameCategory = fleetTrucks.filter(
    (t) => t.slug !== currentSlug && isExcavator(t.slug) === currentIsExcavator,
  );
  const otherCategory = fleetTrucks.filter(
    (t) => t.slug !== currentSlug && isExcavator(t.slug) !== currentIsExcavator,
  );

  const similar = [...sameCategory, ...otherCategory].slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-3">
            <Icon name="Layers" size={14} className="text-accent" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-accent">
              Другие варианты из парка
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground leading-tight">
            Похожая техника
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
            Не уверены, что эта машина подойдёт под задачу? Посмотрите аналогичные варианты — оператор поможет выбрать оптимальный.
          </p>
        </div>
        <Link
          to="/#fleet"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
        >
          Весь парк
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {similar.map((t) => (
          <Link
            key={t.slug}
            to={`/tehnika/${t.slug}`}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(245,208,96,0.15)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
              <img
                src={t.image}
                alt={t.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {t.tag && (
                <div
                  className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${t.tag.color} text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg`}
                >
                  <Icon name={t.tag.icon} size={12} />
                  {t.tag.label}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2 left-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/90">
                {t.badge}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-tight mb-3 group-hover:text-accent transition-colors">
                {t.title}
              </h3>
              <ul className="space-y-1 mb-4 flex-1">
                {t.specs.slice(0, 3).map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <Icon
                      name="Check"
                      size={14}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span>
                      {s.label}: <span className="text-foreground font-semibold">{s.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="text-base sm:text-lg font-display font-black text-accent">
                  {t.price}
                </div>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-foreground/80 group-hover:text-accent transition-colors">
                  Подробнее
                  <Icon name="ArrowRight" size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sm:hidden mt-5 text-center">
        <Link
          to="/#fleet"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          Смотреть весь парк
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default SimilarTrucks;
