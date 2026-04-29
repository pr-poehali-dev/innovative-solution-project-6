import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

interface HowItWorksSectionProps {
  visibleSections: Record<string, boolean>;
}

const steps = [
  {
    step: "01",
    icon: "PhoneCall",
    title: "Оставьте заявку",
    desc: "Позвоните или заполните форму на сайте. Уточните объём работ, адрес и время подачи техники.",
  },
  {
    step: "02",
    icon: "ClipboardCheck",
    title: "Согласуем условия",
    desc: "Подберём подходящий манипулятор, рассчитаем стоимость и заключим договор. Всё быстро и прозрачно.",
  },
  {
    step: "03",
    icon: "Truck",
    title: "Техника на объекте",
    desc: "Оператор приедет в назначенное время. Выполним работы качественно и в срок, подпишем акт.",
  },
];

const HowItWorksSection = ({ visibleSections }: HowItWorksSectionProps) => {
  return (
    <section id="how" className="py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center mb-4">
            <SectionBadge>Процесс</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Как это работает
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((item, i) => {
            const isVisible = visibleSections["how"];
            return (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Внешнее изумрудно-бирюзовое свечение */}
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-30 group-hover:opacity-90 blur-md transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)" }}
                />

                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px] h-full"
                  style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.85) 0%, rgba(16,185,129,0.25) 50%, rgba(13,148,136,0.8) 100%)" }}
                >
                  <div className="relative h-full p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Большая цифра шага в углу */}
                    <div
                      className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 text-7xl sm:text-9xl font-black leading-none pointer-events-none select-none"
                      style={{
                        background: "linear-gradient(135deg, rgba(94,234,212,0.18) 0%, rgba(16,185,129,0.05) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.step}
                    </div>

                    {/* Свечение в углу */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none group-hover:bg-emerald-400/30 transition-colors duration-500" />

                    <div className="relative">
                      {/* Иконка с подсветкой */}
                      <div className="relative inline-flex mb-4">
                        <div
                          className="absolute inset-0 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.6) 0%, transparent 70%)" }}
                        />
                        <div
                          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, rgba(45,212,191,0.25) 0%, rgba(13,148,136,0.15) 100%)",
                            border: "1.5px solid rgba(45,212,191,0.5)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(16,185,129,0.3)",
                          }}
                        >
                          <Icon name={item.icon} size={22} style={{ color: "#5eead4" }} />
                        </div>
                      </div>

                      <h3
                        className="font-display font-black text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 bg-clip-text text-transparent"
                        style={{ backgroundImage: "linear-gradient(135deg, #fff 0%, #5eead4 100%)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;