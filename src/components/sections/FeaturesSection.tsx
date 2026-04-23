import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

interface FeaturesSectionProps {
  visibleSections: Record<string, boolean>;
}

const FeaturesSection = ({ visibleSections }: FeaturesSectionProps) => {
  const features = [
    {
      icon: "FileText",
      title: "Работа с НДС и полный ЭДО",
      desc: "Обеспечиваем юридическую чистоту сделки и предоставляем полный пакет закрывающих документов. Работаем через систему электронного документооборота (Диадок/СБИС).",
    },
    {
      icon: "Truck",
      title: "Собственный автопарк",
      desc: "Вы работаете напрямую с собственником, что исключает переплаты агентских комиссий. Вся техника поставлена на учёт в Ростехнадзоре и имеет все необходимые разрешения.",
    },
    {
      icon: "RefreshCw",
      title: "Гарантия оперативной замены",
      desc: "В случае технической неисправности обязуемся заменить технику на аналогичную в течение 3–5 часов. Ваши процессы не встанут из-за поломки одной машины.",
    },
    {
      icon: "Clock",
      title: "Подача от 1 часа",
      desc: "Оперативно реагируем на заявки и подаём технику в кратчайшие сроки по Нижнему Новгороду и области. Работаем без выходных и праздников.",
    },
    {
      icon: "HardHat",
      title: "Опытные операторы",
      desc: "Профессиональные машинисты с допуском и опытом от 5 лет. Все необходимые разрешения и удостоверения в наличии.",
    },
    {
      icon: "MapPin",
      title: "Весь Нижний Новгород и область",
      desc: "Работаем на стройках, складах и производствах — выезжаем в любой район города и Нижегородской области.",
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-8 sm:mb-14 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center mb-4">
            <SectionBadge>Преимущества</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Почему выбирают нас
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl mx-auto">
          {features.map((item, i) => {
            const isVisible = visibleSections["features"];
            return (
              <div
                key={i}
                className={`flex items-start gap-4 sm:gap-5 p-5 sm:p-6 border border-accent/40 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg hover:border-accent/70 hover:bg-white/15 hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(232,168,32,0.12)", border: "1.5px solid rgba(232,168,32,0.3)" }}
                >
                  <Icon name={item.icon} size={24} style={{ color: "#e8a820" }} />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;