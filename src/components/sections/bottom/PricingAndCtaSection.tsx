import PhoneButton from "@/components/ui/PhoneButton";
import SectionBadge from "@/components/ui/SectionBadge";
import Icon from "@/components/ui/icon";

interface PricingAndCtaSectionProps {
  visibleSections: Record<string, boolean>;
  onOpenModal: () => void;
}

const plans = [
  {
    name: "Почасовая аренда",
    subtitle: "Идеально для разовых работ",
    price: "1 500",
    priceUnit: "₽/час",
    pricePrefix: "от",
    oldPrice: "2 500 ₽",
    discountLabel: "-40%",
    features: [
      { icon: "Truck", text: "Манипулятор от 5 до 20 тонн" },
      { icon: "Package", text: "КМУ от 3 до 8 тонн" },
      { icon: "UserCheck", text: "Опытный оператор включён в цену" },
      { icon: "Fuel", text: "Топливо и подача — бесплатно по городу" },
      { icon: "Zap", text: "Подача за 60 минут, 24/7" },
      { icon: "ShieldCheck", text: "Страхование груза до 500 000 ₽" },
      { icon: "BadgePercent", text: "Скидка 10% на второй заказ" },
    ],
    bonuses: [
      { icon: "Gift", text: "+1 час бесплатно при заказе от 8 часов" },
      { icon: "FileCheck", text: "Документы для отчётности" },
    ],
    badge: "ХИТ",
    badgeColor: "bg-red-500",
    highlight: false,
    buttonText: "Заказать со скидкой",
  },
  {
    name: "Корпоративный",
    subtitle: "Для бизнеса под ключ",
    price: "По договору",
    priceUnit: "",
    pricePrefix: "",
    oldPrice: "",
    discountLabel: "",
    features: [
      { icon: "Truck", text: "Техника от 5 до 20 тонн" },
      { icon: "Rocket", text: "Приоритетная подача 24/7" },
      { icon: "Headphones", text: "Персональный менеджер" },
      { icon: "FileCheck", text: "Все закрывающие документы" },
      { icon: "TrendingDown", text: "Скидки до 25% при объёме" },
    ],
    bonuses: [],
    badge: "ПРЕМИУМ",
    badgeColor: "bg-gradient-to-r from-amber-400 to-yellow-600",
    highlight: true,
    buttonText: "Обсудить условия",
  },
];

const PricingAndCtaSection = ({ visibleSections, onOpenModal }: PricingAndCtaSectionProps) => {
  return (
    <>
      {/* Pricing */}
      <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          <div
            className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex justify-center mb-4">
              <SectionBadge>Тарифы</SectionBadge>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные цены
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Без скрытых платежей и доплат. Цена, которую видите — финальная.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {plans.map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "sm:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {/* Glow effect */}
                  {plan.highlight ? (
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
                  ) : (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40 rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
                  )}

                  <div
                    className={`relative p-5 sm:p-6 md:p-8 lg:p-10 border-2 rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 ${
                      plan.highlight
                        ? "border-amber-400/50 bg-gradient-to-br from-amber-500/10 via-zinc-900/80 to-amber-700/10"
                        : "border-accent/20 bg-card/60 hover:border-accent/50 hover:bg-card/80"
                    }`}
                  >
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className={`px-4 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider text-black ${plan.badgeColor} shadow-lg`}>
                        {plan.highlight && <span className="mr-1">★</span>}
                        {plan.badge}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 sm:mb-2 mt-2">
                        <Icon
                          name={plan.highlight ? "Crown" : "Truck"}
                          size={20}
                          className={plan.highlight ? "text-amber-400" : "text-accent"}
                        />
                        <h3 className="font-display font-bold text-lg sm:text-2xl">{plan.name}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{plan.subtitle}</p>

                      {/* Price */}
                      <div className="mb-5 sm:mb-8">
                        {plan.oldPrice && (
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm text-muted-foreground line-through">{plan.oldPrice}</span>
                            {plan.discountLabel && (
                              <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 rounded text-red-400 text-[10px] font-black animate-pulse">
                                {plan.discountLabel}
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/40 rounded text-emerald-400 text-[10px] font-black inline-flex items-center gap-1">
                              <Icon name="Flame" size={10} />
                              ВЫГОДА
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          {plan.pricePrefix && (
                            <span className="text-sm sm:text-base text-muted-foreground font-medium">{plan.pricePrefix}</span>
                          )}
                          <span
                            className={`font-black tracking-tight ${
                              plan.highlight
                                ? "text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                                : "text-3xl sm:text-4xl md:text-5xl text-accent"
                            }`}
                          >
                            {plan.price}
                          </span>
                          {plan.priceUnit && (
                            <span className="text-base sm:text-xl text-accent font-bold">{plan.priceUnit}</span>
                          )}
                        </div>
                        {!plan.highlight && (
                          <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                            <Icon name="Info" size={11} className="text-accent flex-shrink-0" />
                            Оплачивается только фактическое время работы
                          </p>
                        )}
                      </div>

                      <ul className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-2.5 sm:gap-3 items-start">
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 ${
                                plan.highlight ? "bg-amber-400/20 border border-amber-400/40" : "bg-accent/15 border border-accent/30"
                              }`}
                            >
                              <Icon
                                name={f.icon}
                                size={12}
                                className={plan.highlight ? "text-amber-300" : "text-accent"}
                              />
                            </div>
                            <span className="text-foreground/90 text-xs sm:text-sm pt-0.5">{f.text}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.bonuses && plan.bonuses.length > 0 && (
                        <div
                          className={`mb-5 sm:mb-8 p-3 sm:p-3.5 rounded-xl border-2 border-dashed ${
                            plan.highlight
                              ? "border-amber-400/40 bg-amber-400/5"
                              : "border-emerald-500/40 bg-emerald-500/5"
                          }`}
                        >
                          <div
                            className={`text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                              plan.highlight ? "text-amber-400" : "text-emerald-400"
                            }`}
                          >
                            <Icon name="Gift" size={12} />
                            Бонусы клиентам
                          </div>
                          <ul className="space-y-1.5">
                            {plan.bonuses.map((b, k) => (
                              <li key={k} className="flex gap-2 items-start">
                                <Icon
                                  name={b.icon}
                                  size={13}
                                  className={`flex-shrink-0 mt-0.5 ${
                                    plan.highlight ? "text-amber-300" : "text-emerald-400"
                                  }`}
                                />
                                <span className="text-foreground/95 text-xs sm:text-[13px] font-medium leading-snug">
                                  {b.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={onOpenModal}
                      className={`group/btn relative w-full px-5 py-3 sm:py-4 rounded-xl font-bold transition-all text-sm overflow-hidden ${
                        plan.highlight
                          ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black hover:shadow-xl hover:shadow-amber-500/40"
                          : "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                      }`}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                      <span className="relative flex items-center justify-center gap-2">
                        {plan.buttonText}
                        <Icon name="ArrowRight" size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust line */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheck" size={16} className="text-accent" />
              <span>Договор и закрывающие</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Wallet" size={16} className="text-accent" />
              <span>Нал / безнал / карта</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-accent" />
              <span>Работаем 7 дней в неделю</span>
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