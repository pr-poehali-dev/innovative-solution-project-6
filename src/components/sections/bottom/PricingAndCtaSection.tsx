import PhoneButton from "@/components/ui/PhoneButton";
import Icon from "@/components/ui/icon";
import AsphaltMiniCalc from "@/components/AsphaltMiniCalc";

interface PricingAndCtaSectionProps {
  visibleSections: Record<string, boolean>;
  onOpenModal: () => void;
}

const asphaltServices = [
  "Дворы и парковки",
  "Подъездные пути",
  "Дороги и проезды",
  "Площадки и тротуары",
];

const PricingAndCtaSection = ({ visibleSections, onOpenModal }: PricingAndCtaSectionProps) => {
  return (
    <>
      {/* Asphalt Banner — светлая тема */}
      <section
        id="pricing"
        className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #fffaf0 0%, #fff7e8 30%, #fef3dc 60%, #fff7e8 100%)",
        }}
      >
        {/* Декоративные размытые круги */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-300/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-300/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-200/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 shadow-lg shadow-amber-400/40">
                <Icon name="Sparkles" size={14} className="text-white" />
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Новая услуга
                </span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
                Асфальтирование под ключ
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Укладка асфальта в Нижнем Новгороде и области. Качественно, в срок, с гарантией.
            </p>
          </div>

          {/* Banner */}
          <div
            className={`relative group transition-all duration-1000 ${
              visibleSections["pricing"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/50 via-orange-400/40 to-amber-400/50 rounded-3xl opacity-50 blur-2xl group-hover:opacity-80 transition-opacity duration-700" />

            <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-white shadow-2xl shadow-amber-400/30">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative h-64 sm:h-80 lg:h-auto min-h-[300px] overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/78ce7324-bf4d-4f95-9518-8178c0fcaa2a.jpg"
                    alt="Асфальтирование дорог и площадок"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Floating badge on image */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-600/95 backdrop-blur-md border-2 border-white/50 shadow-2xl">
                      <span className="text-base sm:text-lg animate-pulse">🔥</span>
                      <span className="text-white font-black text-[11px] sm:text-sm tracking-wider">
                        СЕЗОННАЯ СКИДКА 15%
                      </span>
                    </div>
                  </div>

                  {/* Price tag on image */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                    <div className="bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-2xl shadow-amber-900/40 border-2 border-white/50">
                      <div className="text-[10px] sm:text-xs text-white/90 font-black uppercase tracking-wider drop-shadow">
                        Цена работ
                      </div>
                      <div className="flex items-baseline gap-1 text-white drop-shadow-lg">
                        <span className="text-xs sm:text-sm font-bold">от</span>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-black">450</span>
                        <span className="text-sm sm:text-base font-bold">₽/м²</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-amber-50/40 to-orange-50/40">
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/40 flex items-center justify-center">
                        <Icon name="Construction" size={22} className="text-white drop-shadow" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-600 font-black">
                          Фаварит · Спецтехника
                        </div>
                        <h3 className="text-lg sm:text-2xl font-display font-black text-slate-900">
                          Укладка асфальта
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
                      Полный цикл работ по ГОСТ: подготовка основания, укладка асфальта, уплотнение катком. Гарантия до 3 лет.
                    </p>

                    {/* Services pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {asphaltServices.map((s, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-[11px] sm:text-xs text-slate-700 font-semibold shadow-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Calculator */}
                  <div className="mb-3">
                    <AsphaltMiniCalc light />
                  </div>

                  {/* CTA */}
                  <div className="space-y-2">
                    <button
                      onClick={onOpenModal}
                      className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-bold bg-white border-2 border-amber-300 text-slate-800 hover:bg-amber-50 hover:border-amber-500 hover:shadow-md transition-all text-xs sm:text-sm"
                    >
                      <Icon name="MessageSquare" size={14} className="text-amber-600" />
                      <span>Заказать выезд замерщика</span>
                      <Icon
                        name="ArrowRight"
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform text-amber-600"
                      />
                    </button>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">
                        Бесплатный замер · Расчёт сметы за 15 минут
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-amber-200 shadow-sm">
              <Icon name="ShieldCheck" size={16} className="text-amber-600" />
              <span className="font-semibold">Гарантия по договору</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-amber-200 shadow-sm">
              <Icon name="Award" size={16} className="text-amber-600" />
              <span className="font-semibold">Работаем по ГОСТ</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-amber-200 shadow-sm">
              <Icon name="Calendar" size={16} className="text-amber-600" />
              <span className="font-semibold">7 дней в неделю</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-12 sm:py-24 px-4 sm:px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black tracking-tighter mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нужен манипулятор?
            </span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground mb-6 sm:mb-10 font-light max-w-2xl mx-auto">
            Позвоните прямо сейчас — ответим сразу, подберём технику и согласуем время подачи.
          </p>

          <PhoneButton size="lg" className="mx-auto" />

          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 sm:px-5 sm:py-3 bg-red-600/15 border border-red-500/40 rounded-2xl">
            <span className="text-lg sm:text-xl animate-pulse">🔥</span>
            <p className="text-red-400 font-bold text-xs sm:text-base">Скидка 10% на первый заказ — при звонке прямо сейчас!</p>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-3 sm:mt-4">Работаем без выходных · Подача от 1 часа</p>
        </div>
      </section>
    </>
  );
};

export default PricingAndCtaSection;