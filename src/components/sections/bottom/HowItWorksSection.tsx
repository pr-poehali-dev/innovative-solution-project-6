import Icon from "@/components/ui/icon";

interface HowItWorksSectionProps {
  visibleSections: Record<string, boolean>;
}

const steps = [
  {
    step: "01",
    icon: "PhoneCall",
    iconBg: "from-blue-400 to-blue-600",
    title: "Оставьте заявку",
    desc: "Позвоните или заполните форму на сайте. Уточните объём работ, адрес и время подачи техники.",
  },
  {
    step: "02",
    icon: "ClipboardCheck",
    iconBg: "from-amber-400 to-orange-500",
    title: "Согласуем условия",
    desc: "Подберём подходящий манипулятор, рассчитаем стоимость и заключим договор. Всё быстро и прозрачно.",
  },
  {
    step: "03",
    icon: "Truck",
    iconBg: "from-green-400 to-emerald-600",
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
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Как это работает
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          {steps.map((item, i) => {
            const isVisible = visibleSections["how"];
            return (
              <div
                key={i}
                className={`relative flex sm:flex-col items-start gap-4 p-4 sm:p-0 border sm:border-0 border-accent/10 rounded-2xl sm:rounded-none bg-card/30 sm:bg-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex items-center gap-3 sm:gap-4 sm:mb-4 flex-shrink-0">
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon name={item.icon} size={22} className="text-white" />
                  </div>
                  <div className="text-4xl sm:text-6xl font-black text-accent/10 leading-none sm:block hidden">{item.step}</div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-2xl mb-1 sm:mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">{item.desc}</p>
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
