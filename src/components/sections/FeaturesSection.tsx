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

        <div className="flex flex-col gap-4 sm:gap-5 max-w-3xl mx-auto">
          {features.map((item, i) => {
            const isVisible = visibleSections["features"];
            return (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Внешнее изумрудно-бирюзовое свечение с пульсацией */}
                <div
                  className="emerald-pulse absolute -inset-0.5 rounded-2xl pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)", animationDelay: `${i * 0.4}s` }}
                />

                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px]"
                  style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.9) 0%, rgba(16,185,129,0.3) 50%, rgba(13,148,136,0.85) 100%)" }}
                >
                  <div className="relative flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Внутреннее свечение в углу */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none group-hover:bg-emerald-400/35 transition-colors duration-500" />

                    {/* Иконка с подсветкой */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="absolute inset-0 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.6) 0%, transparent 70%)" }}
                      />
                      <div
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(45,212,191,0.25) 0%, rgba(13,148,136,0.15) 100%)",
                          border: "1.5px solid rgba(45,212,191,0.5)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(16,185,129,0.3)",
                        }}
                      >
                        <Icon name={item.icon} size={20} className="sm:!w-6 sm:!h-6" style={{ color: "#5eead4" }} />
                      </div>
                    </div>

                    <div className="relative">
                      <h3
                        className="font-black text-sm sm:text-base lg:text-lg mb-1.5 bg-clip-text text-transparent"
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

export default FeaturesSection;