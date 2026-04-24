import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { Truck } from "./trucksData";
import { pluralizeUnits } from "./trucksData";

interface TruckHeroProps {
  truck: Truck;
  onOrder: () => void;
  onCallback: () => void;
}

export function TruckHeader({ onCallback }: { onCallback: () => void }) {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <BrandLogo size="sm" />
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCallback}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
          >
            <Icon name="MessageCircle" size={14} className="text-accent" />
            Перезвоните мне
          </button>
          <button
            type="button"
            onClick={onCallback}
            className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5"
            aria-label="Заказать обратный звонок"
          >
            <Icon name="MessageCircle" size={18} className="text-accent" />
          </button>
          <PhoneButton size="sm" className="rounded-xl" />
        </div>
      </div>
    </header>
  );
}

export default function TruckHero({ truck, onOrder }: Omit<TruckHeroProps, "onCallback">) {
  return (
    <>
      {/* Хлебные крошки */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Наша техника", to: "/#fleet" },
            { label: truck.title },
          ]}
        />
      </div>

      {/* Основной блок */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-start">
          {/* Фото */}
          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square bg-card/50 border border-accent/10">
            <img
              src={truck.image}
              alt={truck.alt}
              className="w-full h-full object-contain"
              width="1200"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute top-4 left-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
              {truck.badge}
            </div>
          </div>

          {/* Инфо */}
          <div>
            {truck.tag && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${truck.tag.color} text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg mb-3`}>
                <Icon name={truck.tag.icon} size={14} />
                {truck.tag.label}
              </div>
            )}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                {truck.title}
              </span>
            </h1>
            <div className="flex items-center gap-3 mb-4 sm:mb-6 flex-wrap">
              <p className="text-2xl sm:text-3xl font-black text-accent">{truck.price}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/40 text-accent text-xs sm:text-sm font-bold">
                <Icon name="Truck" size={14} />
                В парке: {truck.count} {pluralizeUnits(truck.count)}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs sm:text-sm font-bold">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                  <span className="relative rounded-full w-2 h-2 bg-green-400" />
                </span>
                В наличии
              </span>
            </div>

            <button
              onClick={onOrder}
              className="inline-flex w-full sm:w-auto items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-accent/40 transition-all text-base sm:text-lg mb-6 sm:mb-8"
            >
              <Icon name="Phone" size={20} />
              Заказать — +7 960 188-30-84
            </button>

            {/* Характеристики */}
            <div className="border border-accent/10 rounded-2xl overflow-hidden bg-card/30">
              <div className="px-5 py-3 border-b border-accent/10 bg-accent/5">
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Характеристики</span>
              </div>
              <div className="divide-y divide-accent/10">
                {truck.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center px-5 py-3 text-sm">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
