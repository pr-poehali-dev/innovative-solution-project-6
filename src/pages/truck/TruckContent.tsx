import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import type { Truck } from "./trucksData";
import { trucks } from "./trucksData";
import { cities } from "@/data/cities";
import { MAX_LINK } from "@/data/contacts";
import MaxIcon from "@/components/ui/MaxIcon";
import { MAX_GRADIENT } from "@/components/ui/MaxButton";
import { reachGoal } from "@/lib/metrika";

interface TruckContentProps {
  truck: Truck;
  slug: string;
}

export default function TruckContent({ truck, slug }: TruckContentProps) {
  return (
    <>
      {/* Описание */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="border border-accent/10 rounded-2xl bg-card/30 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Info" size={18} className="text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">О технике</span>
          </div>
          <div className="text-foreground/80 leading-relaxed text-base sm:text-lg space-y-4 whitespace-pre-line">{truck.description}</div>
        </div>
      </section>

      {/* Габаритная схема */}
      {truck.scheme && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="border border-accent/10 rounded-2xl bg-card/30 p-4 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Ruler" size={18} className="text-accent" />
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                Габаритная схема
              </span>
            </div>
            <div className="rounded-xl bg-white p-3 sm:p-6">
              <img
                src={truck.scheme.image}
                alt={truck.scheme.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </div>
            {truck.scheme.caption && (
              <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {truck.scheme.caption}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Применение */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6">
          Где применяется
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {truck.useCases.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 border border-accent/10 rounded-xl bg-card/30">
              <Icon name="CheckCircle" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Другая техника */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl sm:text-3xl font-black tracking-tighter mb-6">Другая техника</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(trucks)
            .filter(([s]) => s !== slug)
            .map(([s, t]) => (
              <Link
                key={s}
                to={`/tehnika/${s}`}
                className="block p-4 border border-accent/10 rounded-xl bg-card/30 hover:border-accent/30 hover:bg-card/60 transition-all group"
              >
                <img src={t.image} alt={t.alt} loading="lazy" decoding="async" className="w-full aspect-video object-cover rounded-lg mb-3" />
                <p className="font-semibold text-sm group-hover:text-accent transition-colors">{t.title}</p>
                <p className="text-accent text-sm font-bold mt-1">{t.price}</p>
              </Link>
            ))}
        </div>
      </section>

      {/* Города работы */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl sm:text-3xl font-black tracking-tighter mb-2">
          Куда подаём {truck.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Работаем в Нижнем Новгороде и по всей Нижегородской области — выберите ваш город
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              to={`/gorod/${c.slug}`}
              className="group p-3 sm:p-4 rounded-xl border border-accent/10 bg-card/30 hover:border-accent/40 hover:bg-card/60 transition-all"
            >
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-accent flex-shrink-0" />
                <span className="font-bold text-sm group-hover:text-accent transition-colors truncate">
                  {c.name}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 ml-6">{c.distance}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4">Нужен {truck.title}?</h2>
        <p className="text-muted-foreground mb-6">Позвоните прямо сейчас — подача от 1 часа, работаем без выходных.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a
            href="tel:+79601883084"
            onClick={() => reachGoal("phone_click", { place: "truck_page", slug })}
            className="inline-flex justify-center items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-black font-black px-6 sm:px-10 py-4 sm:py-5 rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all text-xl sm:text-2xl"
          >
            <span className="text-2xl">📞</span>
            <span className="text-red-600 whitespace-nowrap">+7 960 188-30-84</span>
          </a>
          <a
            href={MAX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => reachGoal("max_click", { place: "truck_page_cta", truck: slug })}
            className="inline-flex justify-center items-center gap-2.5 text-white font-black px-6 sm:px-8 py-4 sm:py-5 rounded-2xl transition-all active:scale-95 hover:brightness-110 text-lg sm:text-xl"
            style={{
              background: MAX_GRADIENT,
              boxShadow: "0 4px 20px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
            }}
          >
            <MaxIcon size={24} className="text-white shrink-0" />
            Написать в MAX
          </a>
        </div>
      </section>
    </>
  );
}