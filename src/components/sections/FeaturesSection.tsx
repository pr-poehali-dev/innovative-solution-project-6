import Icon from "@/components/ui/icon";

interface FeaturesSectionProps {
  visibleSections: Record<string, boolean>;
}

const FeaturesSection = ({ visibleSections }: FeaturesSectionProps) => {
  const features = [
    {
      icon: "Clock",
      title: "Подача от 1 часа",
      desc: "Оперативно реагируем на заявки и подаём технику в кратчайшие сроки по Нижнему Новгороду",
    },
    {
      icon: "Truck",
      title: "Подбор под задачу",
      desc: "Подберём манипулятор с платформой нужных габаритов и грузоподъёмностью от 5 до 20 тонн",
    },
    {
      icon: "Shield",
      title: "Работаем официально",
      desc: "Заключаем договор, предоставляем все закрывающие документы для юридических лиц",
    },
    {
      icon: "MapPin",
      title: "Весь Нижний Новгород",
      desc: "Работаем на стройках, складах и производствах — выезжаем в любой район города и область",
    },
    {
      icon: "Wrench",
      title: "Опытные операторы",
      desc: "Профессиональные машинисты с допуском, опытом от 5 лет и всеми необходимыми разрешениями",
    },
    {
      icon: "Phone",
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
                <div className="w-11 h-11 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 sm:mb-6 transition-colors">
                  <Icon name={item.icon} size={20} className="text-accent" />
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