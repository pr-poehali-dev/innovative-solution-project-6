import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import type { Truck } from "./trucksData";
import { trucks } from "./trucksData";

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

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4">Нужен {truck.title}?</h2>
        <p className="text-muted-foreground mb-6">Позвоните прямо сейчас — подача от 1 часа, работаем без выходных.</p>
        <a
          href="tel:+79601883084"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-black font-black px-10 py-5 rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all text-2xl"
        >
          <span className="text-2xl">📞</span>
          <span className="text-red-600">+7 960 188-30-84</span>
        </a>
      </section>
    </>
  );
}