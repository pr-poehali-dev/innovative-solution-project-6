import { ArrowRight } from "lucide-react";
import PhoneButton from "@/components/ui/PhoneButton";
import SectionBadge from "@/components/ui/SectionBadge";

interface PricingAndCtaSectionProps {
  visibleSections: Record<string, boolean>;
  onOpenModal: () => void;
}

const plans = [
  {
    name: "Почасовая аренда",
    price: "от 2 500 ₽/час",
    features: [
      "Манипулятор от 5 до 10 тонн",
      "Оператор в стоимости",
      "Минимальный заказ — 4 часа",
      "Подача в течение 1 часа",
    ],
    highlight: false,
  },
  {
    name: "Корпоративный",
    price: "По договору",
    features: [
      "Техника от 5 до 20 тонн",
      "Приоритетная подача",
      "Персональный менеджер",
      "Закрывающие документы",
    ],
    highlight: true,
  },
];

const PricingAndCtaSection = ({ visibleSections, onOpenModal }: PricingAndCtaSectionProps) => {
  return (
    <>
      {/* Pricing */}
      <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex justify-center mb-4">
              <SectionBadge>Тарифы</SectionBadge>
            </div>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные цены
              </span>
            </h2>
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
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-4 sm:p-6 md:p-8 lg:p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-2xl mb-1 sm:mb-2">{plan.name}</h3>
                      <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-accent mb-4 sm:mb-8">{plan.price}</p>
                      <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-2 sm:gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-xs sm:text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={onOpenModal}
                      className={`w-full px-5 py-3 sm:py-4 rounded-xl font-semibold transition-all text-sm ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.highlight ? "Связаться с нами" : "Заказать технику"}
                    </button>
                  </div>
                </div>
              );
            })}
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