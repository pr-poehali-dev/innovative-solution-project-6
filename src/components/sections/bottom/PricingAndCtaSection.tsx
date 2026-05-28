import PhoneButton from "@/components/ui/PhoneButton";

interface PricingAndCtaSectionProps {
  visibleSections: Record<string, boolean>;
  onOpenModal: () => void;
}

const PricingAndCtaSection = ({ visibleSections }: PricingAndCtaSectionProps) => {
  return (
    <>
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
