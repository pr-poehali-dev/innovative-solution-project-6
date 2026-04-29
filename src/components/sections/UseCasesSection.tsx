import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

const useCases = [
  {
    icon: "Building2",
    title: "Строительство",
    desc: "Подъём и монтаж металлоконструкций, балок, плит перекрытий. Подача стройматериалов на этажи — кирпич, блоки, мешки с раствором. Установка колонн, ферм и кровельных элементов.",
    examples: ["Монтаж каркасов зданий", "Подача материалов на высоту", "Установка лестничных маршей"],
  },
  {
    icon: "Zap",
    title: "Энергетика и связь",
    desc: "Установка опор ЛЭП и освещения, монтаж трансформаторных подстанций. Подъём антенн и вышек сотовой связи. Замена кабельных барабанов.",
    examples: ["Монтаж опор ЛЭП", "Установка трансформаторов", "Подъём антенных мачт"],
  },
  {
    icon: "Droplets",
    title: "ЖКХ и водоснабжение",
    desc: "Монтаж трубопроводов большого диаметра, установка насосных станций и канализационных люков. Замена секций теплотрасс в траншеях.",
    examples: ["Укладка труб в траншеи", "Монтаж насосных станций", "Замена тепловых сетей"],
  },
  {
    icon: "Factory",
    title: "Промышленность",
    desc: "Перемещение тяжёлого оборудования внутри и снаружи цехов. Монтаж станков и производственных линий. Погрузка и разгрузка металлопроката, труб, листового металла.",
    examples: ["Монтаж производственных линий", "Перемещение станков", "Разгрузка металлопроката"],
  },
  {
    icon: "Warehouse",
    title: "Логистика и склады",
    desc: "Разгрузка фур и контейнеров с нестандартным грузом. Перемещение крупногабаритных паллет. Работа на складах с ограниченным въездом.",
    examples: ["Разгрузка контейнеров", "Перемещение паллет", "Работа в стеснённых условиях"],
  },
  {
    icon: "TreePine",
    title: "Лесная и деревообработка",
    desc: "Погрузка и штабелирование круглого леса, пиломатериалов и деревянных конструкций. Доставка и монтаж деревянных домокомплектов, каркасов и ферм.",
    examples: ["Погрузка пиломатериалов", "Монтаж деревянных домов", "Штабелирование леса"],
  },
  {
    icon: "Truck",
    title: "Нефть и газ",
    desc: "Монтаж оборудования на нефтегазовых объектах: ёмкости, сепараторы, насосы. Перемещение труб большого диаметра. Работа на удалённых и труднодоступных площадках.",
    examples: ["Монтаж ёмкостей и сепараторов", "Укладка газопровода", "Работа на промыслах"],
  },
  {
    icon: "Home",
    title: "Частное строительство",
    desc: "Монтаж сборных домов и фундаментных блоков. Подъём кровельных материалов. Установка ворот, заборных секций, бассейнов и септиков.",
    examples: ["Монтаж фундаментных блоков", "Установка септиков", "Подъём кровли и ворот"],
  },
  {
    icon: "ShoppingCart",
    title: "Ритейл и торговля",
    desc: "Оснащение торговых центров и магазинов: монтаж вывесок, климатического оборудования, кровельных конструкций. Разгрузка торгового оборудования при открытии новых объектов.",
    examples: ["Монтаж вывесок и рекламы", "Установка кондиционеров", "Разгрузка при открытии"],
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {useCases.map((item, i) => (
            <div key={i} className="group relative">
              {/* Внешнее изумрудно-бирюзовое свечение с пульсацией */}
              <div
                className="emerald-pulse absolute -inset-0.5 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)", animationDelay: `${(i % 3) * 0.5}s` }}
              />

              {/* Градиентная рамка */}
              <div
                className="relative rounded-2xl p-[1.5px] h-full"
                style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.85) 0%, rgba(16,185,129,0.25) 50%, rgba(13,148,136,0.8) 100%)" }}
              >
                <div className="relative h-full flex flex-col p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                  {/* Внутреннее свечение в углу */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none group-hover:bg-emerald-400/30 transition-colors duration-500" />

                  <div className="relative flex items-center gap-3 mb-4">
                    {/* Иконка с подсветкой */}
                    <div className="relative shrink-0">
                      <div
                        className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.6) 0%, transparent 70%)" }}
                      />
                      <div
                        className="relative w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(45,212,191,0.25) 0%, rgba(13,148,136,0.15) 100%)",
                          border: "1.5px solid rgba(45,212,191,0.5)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(16,185,129,0.25)",
                        }}
                      >
                        <Icon name={item.icon} size={20} style={{ color: "#5eead4" }} />
                      </div>
                    </div>
                    <h3
                      className="font-display font-black text-lg bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(135deg, #fff 0%, #5eead4 100%)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="relative text-white/70 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <ul className="relative space-y-1.5 mt-auto">
                    {item.examples.map((ex, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#5eead4", boxShadow: "0 0 6px rgba(94,234,212,0.6)" }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;