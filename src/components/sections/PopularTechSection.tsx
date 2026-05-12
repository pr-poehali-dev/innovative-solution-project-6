import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const items = [
  {
    slug: "jcb-3cx",
    title: "Экскаватор-погрузчик JCB 3CX",
    badge: "Новинка",
    badgeIcon: "Sparkles",
    badgeColor: "from-cyan-500 to-blue-500",
    price: "от 2 400 ₽/час",
    image:
      "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/761d840a-c678-4fee-a5eb-4531b7ca7d17.webp",
    alt: "Экскаватор-погрузчик JCB 3CX",
    specs: ["Глубина копания 4,24 м", "Задний и погрузочный ковш", "Навесное оборудование"],
  },
  {
    slug: "isuzu-5t-kmu",
    title: "ISUZU 5т + КМУ",
    badge: "Выгодная цена",
    badgeIcon: "BadgePercent",
    badgeColor: "from-emerald-500 to-green-600",
    price: "от 2 200 ₽/час",
    image:
      "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/4bb58aab-783b-43b6-8d89-ee519e570e09.webp",
    alt: "ISUZU 5т с КМУ",
    specs: ["Платформа до 5 т", "Стрела до 3 т", "Вылет до 8,5 м"],
  },
  {
    slug: "hyundai-gold-kmu-8t",
    title: "Hyundai Gold + КМУ HIAB 190TM",
    badge: "Длинная стрела",
    badgeIcon: "MoveUpRight",
    badgeColor: "from-sky-500 to-blue-600",
    price: "от 3 200 ₽/час",
    image:
      "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/106c30cf-02d3-4b99-ac02-47e7404652e2.webp",
    alt: "Hyundai Gold + КМУ HIAB 190TM 8т",
    specs: ["КМУ до 8 т", "Вылет стрелы до 22 м", "Платформа 6,0 × 2,45 м"],
  },
];

const PopularTechSection = () => {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-background to-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-3">
              <Icon name="TrendingUp" size={14} className="text-accent" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-accent">
                Чаще всего заказывают
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
              Популярная техника
            </h2>
            <p className="text-sm sm:text-base text-white/60 mt-2 max-w-2xl">
              Три машины, которые клиенты Нижнего Новгорода берут в аренду чаще всего.
              Подача за 30–60 минут.
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
          {items.map((it) => (
            <Link
              key={it.slug}
              to={`/tehnika/${it.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(245,208,96,0.15)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={it.image}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${it.badgeColor} text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg`}
                >
                  <Icon name={it.badgeIcon} size={12} />
                  {it.badge}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg font-display font-bold text-white leading-tight mb-2 group-hover:text-accent transition-colors">
                  {it.title}
                </h3>
                <ul className="space-y-1 mb-4 flex-1">
                  {it.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                      <Icon name="Check" size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="text-lg sm:text-xl font-display font-black text-accent">
                    {it.price}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-white/80 group-hover:text-accent transition-colors">
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
      </div>
    </section>
  );
};

export default PopularTechSection;
