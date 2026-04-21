import Icon from "@/components/ui/icon";

interface FeaturesSectionProps {
  visibleSections: Record<string, boolean>;
}

const FeaturesSection = ({ visibleSections }: FeaturesSectionProps) => {
  const features = [
    {
      icon: "Clock",
      iconBg: "from-amber-400 to-orange-500",
      title: "Подача от 1 часа",
      desc: "Оперативно реагируем на заявки и подаём технику в кратчайшие сроки по Нижнему Новгороду",
    },
    {
      icon: "Truck",
      iconBg: "from-blue-400 to-blue-600",
      title: "Подбор под задачу",
      desc: "Подберём манипулятор с платформой нужных габаритов и грузоподъёмностью от 5 до 20 тонн",
    },
    {
      icon: "Shield",
      iconBg: "from-green-400 to-emerald-600",
      title: "Работаем официально",
      desc: "Заключаем договор, предоставляем все закрывающие документы для юридических лиц",
    },
    {
      icon: "MapPin",
      iconBg: "from-red-400 to-rose-600",
      title: "Весь Нижний Новгород",
      desc: "Работаем на стройках, складах и производствах — выезжаем в любой район города и область",
    },
    {
      icon: "HardHat",
      iconBg: "from-yellow-400 to-amber-600",
      title: "Опытные операторы",
      desc: "Профессиональные машинисты с допуском, опытом от 5 лет и всеми необходимыми разрешениями",
    },
    {
      icon: "Phone",
      iconBg: "from-purple-400 to-violet-600",
      title: "Консультация бесплатно",
      desc: "Позвоните — поможем выбрать технику, рассчитаем стоимость и согласуем время подачи",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-32 px-4 sm:px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Почему выбирают нас
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((item, i) => {
            const isVisible = visibleSections["features"];
            return (
              <div
                key={i}
                className={`group p-5 sm:p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={item.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;