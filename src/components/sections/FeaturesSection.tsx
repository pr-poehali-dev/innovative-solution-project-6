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
      tag: "Документы",
      desc: "Обеспечиваем юридическую чистоту сделки и предоставляем полный пакет закрывающих документов. Работаем через систему электронного документооборота (Диадок/СБИС).",
      color: { main: "#5eead4", soft: "rgba(45,212,191," },
    },
    {
      icon: "Truck",
      title: "Собственный автопарк — 15 машин",
      tag: "Свой парк",
      desc: "Вы работаете напрямую с собственником, что исключает переплаты агентских комиссий. 15 единиц техники грузоподъёмностью от 5 до 20 тонн поставлены на учёт в Ростехнадзоре и имеют все необходимые разрешения.",
      color: { main: "#fbbf24", soft: "rgba(251,191,36," },
    },
    {
      icon: "RefreshCw",
      title: "Гарантия оперативной замены",
      tag: "Без простоев",
      desc: "В случае технической неисправности обязуемся заменить технику на аналогичную в течение 3–5 часов. Ваши процессы не встанут из-за поломки одной машины.",
      color: { main: "#60a5fa", soft: "rgba(96,165,250," },
    },
    {
      icon: "Clock",
      title: "Подача от 1 часа",
      tag: "Скорость",
      desc: "Оперативно реагируем на заявки и подаём технику в кратчайшие сроки по Нижнему Новгороду и области. Работаем без выходных и праздников.",
      color: { main: "#f87171", soft: "rgba(248,113,113," },
    },
    {
      icon: "HardHat",
      title: "Опытные операторы",
      tag: "Профессионалы",
      desc: "Профессиональные машинисты с допуском и опытом от 5 лет. Все необходимые разрешения и удостоверения в наличии.",
      color: { main: "#a78bfa", soft: "rgba(167,139,250," },
    },
    {
      icon: "MapPin",
      title: "Весь Нижний Новгород и область",
      tag: "География",
      desc: "Работаем на стройках, складах и производствах — выезжаем в любой район города и Нижегородской области.",
      color: { main: "#34d399", soft: "rgba(52,211,153," },
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
            const c = item.color.main;
            const s = item.color.soft;
            return (
              <div
                key={i}
                className={`group relative transition-all duration-700 hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Внешнее свечение — индивидуальный цвет */}
                <div
                  className="emerald-pulse absolute -inset-0.5 rounded-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${c} 0%, ${s}0.4) 50%, ${c} 100%)`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />

                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px]"
                  style={{ background: `linear-gradient(135deg, ${s}0.9) 0%, ${s}0.25) 50%, ${s}0.8) 100%)` }}
                >
                  <div className="relative flex items-start gap-4 sm:gap-5 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Внутреннее свечение в углу */}
                    <div
                      className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
                      style={{ background: `${s}0.2)` }}
                    />

                    {/* Большой номер на фоне */}
                    <div
                      className="absolute -bottom-6 -right-2 font-display font-black text-[120px] leading-none pointer-events-none select-none opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500"
                      style={{ color: c }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Иконка с подсветкой */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="absolute inset-0 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle, ${s}0.6) 0%, transparent 70%)` }}
                      />
                      <div
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${s}0.28) 0%, ${s}0.12) 100%)`,
                          border: `1.5px solid ${s}0.55)`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 14px ${s}0.3)`,
                        }}
                      >
                        <Icon name={item.icon} size={20} className="sm:!w-6 sm:!h-6" style={{ color: c }} />
                      </div>
                    </div>

                    <div className="relative flex-1 min-w-0">
                      {/* Верхняя строка — заголовок + бейдж */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          className="font-black text-base sm:text-lg lg:text-xl bg-clip-text text-transparent leading-tight"
                          style={{ backgroundImage: `linear-gradient(135deg, #fff 0%, ${c} 100%)` }}
                        >
                          {item.title}
                        </h3>
                        <span
                          className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
                          style={{
                            color: c,
                            background: `${s}0.1)`,
                            border: `1px solid ${s}0.3)`,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Цветная разделительная линия */}
                      <div
                        className="h-px w-12 mb-3 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${c} 0%, transparent 100%)` }}
                      />

                      <p className="text-white/75 text-sm sm:text-base leading-relaxed">{item.desc}</p>
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
