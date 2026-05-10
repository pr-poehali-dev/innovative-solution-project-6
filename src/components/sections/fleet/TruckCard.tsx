import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MobileSwipeGallery from "@/components/ui/MobileSwipeGallery";
import { Truck, pluralizeUnits } from "./data";

interface TruckCardProps {
  truck: Truck;
  idx: number;
  total: number;
  onOrder: (title: string) => void;
  onOpenLightbox: (data: { src: string; alt: string; title: string }) => void;
}

const TruckCard = ({ truck, idx, total, onOrder, onOpenLightbox }: TruckCardProps) => {
  const tag = truck.tag;
  return (
    <div className={`group relative ${idx < total - 1 ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
      {/* Пульсирующая изумрудная подсветка */}
      <div
        className="emerald-pulse absolute -inset-0.5 rounded-2xl sm:rounded-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)", animationDelay: `${(idx % 4) * 0.6}s` }}
      />
      {/* Градиентная рамка */}
      <div
        className="relative rounded-2xl sm:rounded-3xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.85) 0%, rgba(16,185,129,0.25) 50%, rgba(13,148,136,0.8) 100%)" }}
      >
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
          {/* Угловой "лейбл-флажок" — на десктопе, на мобилке вынесен под фото */}
          {tag && (
            <div className={`hidden lg:flex absolute top-0 left-0 z-20 items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${tag.color} text-white text-[10px] sm:text-sm font-black uppercase tracking-wider shadow-xl rounded-br-xl sm:rounded-br-2xl`}>
              <Icon name={tag.icon} size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span className="whitespace-nowrap">{tag.label}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className={`relative grid gap-0 lg:items-stretch ${truck.image ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            {truck.image && (
              <div className="relative lg:hidden overflow-hidden bg-white/5">
                <MobileSwipeGallery
                  images={truck.images?.length ? truck.images : [truck.image]}
                  alt={truck.alt}
                  className="w-full h-80 sm:h-[420px] md:h-[520px]"
                  imgClassName="object-contain h-80 sm:h-[420px] md:h-[520px]"
                />
                {/* Информационный блок ПОД фото — больше не перекрывает машину */}
                <div className="px-4 py-3 bg-gradient-to-b from-transparent to-black/40">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <div className="inline-block px-2.5 py-1 bg-accent/90 rounded-full text-black text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      {truck.badge}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/90 text-black text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                        <span className="relative rounded-full w-1.5 h-1.5 bg-white" />
                      </span>
                      В наличии
                    </div>
                    {tag && (
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${tag.color} text-white text-[10px] font-bold tracking-widest uppercase shadow-lg`}>
                        <Icon name={tag.icon} size={11} />
                        {tag.label}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-black text-lg text-white leading-tight">{truck.title}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-accent font-bold text-sm">{truck.price}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-accent text-[11px] font-bold">
                      <Icon name="Truck" size={11} />
                      В парке: {truck.count} {pluralizeUnits(truck.count)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 sm:p-6 md:p-8 lg:p-14">
              <div className="hidden lg:flex items-center gap-3 mb-4 sm:mb-6 flex-wrap">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-semibold tracking-widest uppercase">
                  {truck.badge}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/40 text-accent text-xs font-bold">
                  <Icon name="Truck" size={13} />
                  В парке: {truck.count} {pluralizeUnits(truck.count)}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs font-bold">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                    <span className="relative rounded-full w-2 h-2 bg-green-400" />
                  </span>
                  В наличии
                </div>
              </div>
              <h3 className="hidden lg:block font-display font-black text-xl sm:text-3xl lg:text-4xl mb-2">{truck.title}</h3>
              <p className="hidden lg:block text-accent font-bold text-lg sm:text-xl mb-5 sm:mb-8">{truck.price}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-8">
                {truck.specs.map((spec, i) => (
                  <div key={i} className="bg-background/40 rounded-xl p-3 sm:p-4 border border-accent/10">
                    <p className="text-muted-foreground text-[11px] sm:text-xs mb-1 leading-tight">{spec.label}</p>
                    <p className="font-bold text-white text-sm sm:text-base">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Бейджи доверия */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 sm:mb-7">
                {[
                  "faw-kmu-dongyoung",
                  "kamaz-65115-hangil",
                  "kamaz-43118-kanglim",
                  "faw-j6-dongyang-1966",
                  "hyundai-gold-kmu-8t",
                ].includes(truck.slug) && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-semibold">
                    <Icon name="ShieldCheck" size={13} />
                    На учёте в Ростехнадзоре
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs font-semibold">
                  <Icon name="FileCheck2" size={13} />
                  Работа с НДС / ЭДО
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold">
                  <Icon name="UserCheck" size={13} />
                  Опытный машинист
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-semibold">
                  <Icon name="Wrench" size={13} />
                  Тех. обслуживание ✓
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] sm:text-xs font-semibold">
                  <Icon name="Zap" size={13} />
                  Подача от 1 часа
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-semibold">
                  <Icon name="RefreshCw" size={13} />
                  Замена за 3-5 ч
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button onClick={() => onOrder(truck.title)} className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-accent/40 transition-all">
                  Заказать
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <a
                  href="tel:+79601883084"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 bg-green-500/15 border border-green-500/40 text-green-400 rounded-full font-semibold text-sm hover:bg-green-500/25 hover:border-green-500/60 transition-all"
                >
                  <Icon name="Phone" size={16} />
                  Позвонить
                </a>
                <Link to={`/tehnika/${truck.slug}`} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 border border-accent/30 rounded-full font-semibold text-sm hover:border-accent/60 hover:bg-accent/5 transition-all">
                  Подробнее
                </Link>
              </div>
            </div>

            {truck.image && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("[Fleet] Open lightbox:", truck.title);
                  onOpenLightbox({ src: truck.image, alt: truck.alt, title: truck.title });
                }}
                className="parallax-card relative hidden lg:block w-full h-full min-h-[420px] overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 group/img cursor-zoom-in select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ zIndex: 5 }}
                aria-label={`Открыть фото ${truck.title} на весь экран`}
              >
                <img
                  src={truck.image}
                  alt={truck.alt}
                  className="parallax-img absolute inset-0 w-full h-full object-contain object-center p-3 transition-transform duration-300 ease-out will-change-transform pointer-events-none"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-lg pointer-events-none transition-all duration-300 group-hover/img:bg-accent/90 group-hover/img:border-accent group-hover/img:scale-105">
                  <Icon name="Maximize2" size={16} className="text-white group-hover/img:text-black transition-colors" />
                  <span className="text-white text-xs font-bold group-hover/img:text-black transition-colors">Увеличить</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;
