import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

const useCases = [
  {
    icon: "Building2",
    title: "Строительство",
    tag: "Высотные работы",
    desc: "Подъём и монтаж металлоконструкций, балок, плит перекрытий. Подача стройматериалов на этажи — кирпич, блоки, мешки с раствором. Установка колонн, ферм и кровельных элементов.",
    examples: ["Монтаж каркасов зданий", "Подача материалов на высоту", "Установка лестничных маршей"],
    color: { main: "#5eead4", soft: "rgba(45,212,191," },
  },
  {
    icon: "Zap",
    title: "Энергетика и связь",
    tag: "ЛЭП и вышки",
    desc: "Установка опор ЛЭП и освещения, монтаж трансформаторных подстанций. Подъём антенн и вышек сотовой связи. Замена кабельных барабанов.",
    examples: ["Монтаж опор ЛЭП", "Установка трансформаторов", "Подъём антенных мачт"],
    color: { main: "#fbbf24", soft: "rgba(251,191,36," },
  },
  {
    icon: "Droplets",
    title: "ЖКХ и водоснабжение",
    tag: "Трубопроводы",
    desc: "Монтаж трубопроводов большого диаметра, установка насосных станций и канализационных люков. Замена секций теплотрасс в траншеях.",
    examples: ["Укладка труб в траншеи", "Монтаж насосных станций", "Замена тепловых сетей"],
    color: { main: "#60a5fa", soft: "rgba(96,165,250," },
  },
  {
    icon: "Factory",
    title: "Промышленность",
    tag: "Тяжёлое оборудование",
    desc: "Перемещение тяжёлого оборудования внутри и снаружи цехов. Монтаж станков и производственных линий. Погрузка и разгрузка металлопроката, труб, листового металла.",
    examples: ["Монтаж производственных линий", "Перемещение станков", "Разгрузка металлопроката"],
    color: { main: "#f87171", soft: "rgba(248,113,113," },
  },
  {
    icon: "Warehouse",
    title: "Логистика и склады",
    tag: "Разгрузка и хранение",
    desc: "Разгрузка фур и контейнеров с нестандартным грузом. Перемещение крупногабаритных паллет. Работа на складах с ограниченным въездом.",
    examples: ["Разгрузка контейнеров", "Перемещение паллет", "Работа в стеснённых условиях"],
    color: { main: "#a78bfa", soft: "rgba(167,139,250," },
  },
  {
    icon: "TreePine",
    title: "Лесная и деревообработка",
    tag: "Пиломатериалы",
    desc: "Погрузка и штабелирование круглого леса, пиломатериалов и деревянных конструкций. Доставка и монтаж деревянных домокомплектов, каркасов и ферм.",
    examples: ["Погрузка пиломатериалов", "Монтаж деревянных домов", "Штабелирование леса"],
    color: { main: "#34d399", soft: "rgba(52,211,153," },
  },
  {
    icon: "Truck",
    title: "Нефть и газ",
    tag: "Нефтегазовый сектор",
    desc: "Монтаж оборудования на нефтегазовых объектах: ёмкости, сепараторы, насосы. Перемещение труб большого диаметра. Работа на удалённых и труднодоступных площадках.",
    examples: ["Монтаж ёмкостей и сепараторов", "Укладка газопровода", "Работа на промыслах"],
    color: { main: "#fb923c", soft: "rgba(251,146,60," },
  },
  {
    icon: "Home",
    title: "Частное строительство",
    tag: "Загородные дома",
    desc: "Монтаж сборных домов и фундаментных блоков. Подъём кровельных материалов. Установка ворот, заборных секций, бассейнов и септиков.",
    examples: ["Монтаж фундаментных блоков", "Установка септиков", "Подъём кровли и ворот"],
    color: { main: "#22d3ee", soft: "rgba(34,211,238," },
  },
  {
    icon: "ShoppingCart",
    title: "Ритейл и торговля",
    tag: "ТЦ и магазины",
    desc: "Оснащение торговых центров и магазинов: монтаж вывесок, климатического оборудования, кровельных конструкций. Разгрузка торгового оборудования при открытии новых объектов.",
    examples: ["Монтаж вывесок и рекламы", "Установка кондиционеров", "Разгрузка при открытии"],
    color: { main: "#f472b6", soft: "rgba(244,114,182," },
  },
];

const UseCasesSection = () => {
  return (
    <section id="usecases" className="py-16 sm:py-32 px-4 sm:px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge>Области применения</SectionBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Где нужен манипулятор
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Манипулятор с платформой решает задачи там, где кран не проедет, а вручную — не поднять
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {useCases.map((item, i) => {
            const c = item.color.main;
            const s = item.color.soft;
            return (
              <div key={i} className="group relative transition-transform duration-500 hover:-translate-y-1.5">
                {/* Внешнее свечение с пульсацией — индивидуальный цвет */}
                <div
                  className="emerald-pulse absolute -inset-0.5 rounded-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${c} 0%, ${s}0.4) 50%, ${c} 100%)`,
                    animationDelay: `${(i % 3) * 0.5}s`,
                  }}
                />

                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px] h-full"
                  style={{ background: `linear-gradient(135deg, ${s}0.85) 0%, ${s}0.2) 50%, ${s}0.7) 100%)` }}
                >
                  <div className="relative h-full flex flex-col p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Внутреннее свечение в углу */}
                    <div
                      className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
                      style={{ background: `${s}0.18)` }}
                    />

                    {/* Большой номер на фоне */}
                    <div
                      className="absolute -bottom-6 -right-2 font-display font-black text-[120px] leading-none pointer-events-none select-none opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500"
                      style={{ color: c }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Верхняя строка — иконка + тег категории */}
                    <div className="relative flex items-start justify-between mb-5">
                      <div className="relative shrink-0">
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
                          <Icon name={item.icon} size={24} style={{ color: c }} />
                        </div>
                      </div>

                      <span
                        className="relative text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{
                          color: c,
                          background: `${s}0.1)`,
                          border: `1px solid ${s}0.3)`,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Заголовок — крупнее на ПК */}
                    <h3
                      className="relative font-display font-black text-xl sm:text-2xl bg-clip-text text-transparent mb-3 leading-tight"
                      style={{ backgroundImage: `linear-gradient(135deg, #fff 0%, ${c} 100%)` }}
                    >
                      {item.title}
                    </h3>

                    {/* Цветная разделительная линия */}
                    <div
                      className="relative h-px w-12 mb-4 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c} 0%, transparent 100%)` }}
                    />

                    {/* Описание — крупнее и читабельнее на ПК */}
                    <p className="relative text-white/75 text-sm sm:text-[15px] leading-relaxed mb-5">
                      {item.desc}
                    </p>

                    {/* Список примеров с разделителем сверху */}
                    <div
                      className="relative pt-4 mt-auto"
                      style={{ borderTop: `1px dashed ${s}0.2)` }}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2.5">
                        Типовые задачи
                      </div>
                      <ul className="space-y-2">
                        {item.examples.map((ex, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/70">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: c, boxShadow: `0 0 8px ${s}0.7)` }}
                            />
                            {ex}
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

export default UseCasesSection;
