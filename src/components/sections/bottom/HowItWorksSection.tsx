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
    badge: "1 МИНУТА",
    desc: "Позвоните или заполните форму на сайте. Уточните объём работ, адрес и время подачи техники.",
    list: ["Звонок или форма", "Что и куда везти", "Желаемое время"],
    accent: "from-cyan-400 to-teal-500",
    accentText: "text-cyan-300",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/40",
    bullet: "bg-cyan-400",
    iconBg: "rgba(34,211,238,0.18)",
    iconBorder: "rgba(34,211,238,0.5)",
    iconColor: "#67e8f9",
    glow: "rgba(34,211,238,0.5)",
    border: "rgba(34,211,238,0.85)",
    shadow: "rgba(34,211,238,0.3)",
  },
  {
    step: "02",
    icon: "ClipboardCheck",
    title: "Согласуем условия",
    badge: "ДО 15 МИНУТ",
    desc: "Подберём подходящий манипулятор, рассчитаем стоимость и заключим договор. Всё быстро и прозрачно.",
    list: ["Подбор техники", "Расчёт стоимости", "Договор и документы"],
    accent: "from-amber-400 to-orange-500",
    accentText: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/40",
    bullet: "bg-amber-400",
    iconBg: "rgba(251,191,36,0.18)",
    iconBorder: "rgba(251,191,36,0.5)",
    iconColor: "#fcd34d",
    glow: "rgba(251,191,36,0.5)",
    border: "rgba(251,191,36,0.85)",
    shadow: "rgba(251,191,36,0.3)",
  },
  {
    step: "03",
    icon: "Truck",
    title: "Техника на объекте",
    badge: "ОТ 1 ЧАСА",
    desc: "Оператор приедет в назначенное время. Выполним работы качественно и в срок, подпишем акт.",
    list: ["Подача от 1 часа", "Опытный оператор", "Акт по факту"],
    accent: "from-emerald-400 to-green-500",
    accentText: "text-emerald-300",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/40",
    bullet: "bg-emerald-400",
    iconBg: "rgba(45,212,191,0.18)",
    iconBorder: "rgba(45,212,191,0.5)",
    iconColor: "#5eead4",
    glow: "rgba(45,212,191,0.5)",
    border: "rgba(45,212,191,0.85)",
    shadow: "rgba(16,185,129,0.3)",
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
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Как это работает
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Три простых шага — от заявки до техники на объекте
          </p>
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
                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px] h-full"
                  style={{
                    background: `linear-gradient(135deg, ${item.border} 0%, ${item.border.replace("0.85", "0.25")} 50%, ${item.border} 100%)`,
                  }}
                >
                  <div className="relative h-full p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Большая цифра шага в углу */}
                    <div
                      className="absolute -bottom-2 -right-2 text-7xl sm:text-8xl font-black leading-none pointer-events-none select-none text-white/[0.05]"
                    >
                      {item.step}
                    </div>

                    {/* Свечение в углу */}
                    <div
                      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-500"
                      style={{ background: item.glow.replace("0.5", "0.18") }}
                    />

                    <div className="relative">
                      {/* Шапка: иконка + бейдж времени */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.iconBg} 0%, ${item.iconBg.replace("0.18", "0.08")} 100%)`,
                            border: `1.5px solid ${item.iconBorder}`,
                            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px ${item.shadow}`,
                          }}
                        >
                          <Icon name={item.icon} size={22} style={{ color: item.iconColor }} />
                        </div>
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${item.accentBg} border ${item.accentBorder} ${item.accentText} text-[10px] font-black tracking-widest`}
                        >
                          <Icon name="Clock" size={11} />
                          {item.badge}
                        </div>
                      </div>

                      <h3
                        className="font-display font-black text-base sm:text-lg md:text-xl lg:text-2xl mb-3 leading-tight"
                        style={{ color: "#fff" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Разделитель */}
                      <div
                        className={`h-px mb-3 bg-gradient-to-r ${item.accent} opacity-30`}
                      />

                      {/* Список */}
                      <div className="text-[10px] font-bold tracking-widest text-white/50 mb-2">
                        ЧТО ВКЛЮЧЕНО
                      </div>
                      <ul className="space-y-1.5">
                        {item.list.map((li, k) => (
                          <li key={k} className="flex items-center gap-2 text-sm text-white/85">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.bullet} flex-shrink-0`} />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
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
