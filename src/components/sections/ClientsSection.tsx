const clients = [
  {
    name: "ЛУКОЙЛ",
    industry: "Нефтяная компания",
    logo: "🛢️",
    color: "from-red-500/20 to-red-600/10",
    border: "border-red-500/20",
    text: "Выполняли подъём и монтаж оборудования на производственных объектах в Нижегородской области. Техника подавалась точно в срок, все работы выполнены без замечаний по технике безопасности.",
    contact: "Служба материально-технического обеспечения",
  },
  {
    name: "ГАЗ",
    industry: "Автомобильный завод",
    logo: "🏭",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    text: "Регулярно заказываем манипуляторы для разгрузки крупногабаритных комплектующих на территории завода. Ценим оперативность и профессионализм операторов — работаем уже более двух лет.",
    contact: "Отдел логистики и снабжения",
  },
  {
    name: "Нижегородский водоканал",
    industry: "ЖКХ и инфраструктура",
    logo: "💧",
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    text: "Привлекаем технику для монтажа трубопроводов и установки насосного оборудования. Манипулятор с длинной стрелой незаменим при работах в стеснённых городских условиях.",
    contact: "Производственно-технический отдел",
  },
  {
    name: "Нижегородская сетевая компания",
    industry: "Электроэнергетика",
    logo: "⚡",
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
    text: "Используем манипуляторы при монтаже опор ЛЭП и трансформаторных подстанций. Техника всегда в исправном состоянии, операторы имеют все необходимые допуски для работы вблизи энергообъектов.",
    contact: "Отдел капитального строительства",
  },
  {
    name: "Волга-Девелопмент",
    industry: "Жилое строительство",
    logo: "🏗️",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
    text: "Сотрудничаем при строительстве жилых комплексов в Нижнем Новгороде. Манипуляторы ООО Фаворит незаменимы на стадии монтажа металлоконструкций и подъёма стройматериалов на высоту.",
    contact: "Технический директор",
  },
  {
    name: "X5 Retail Group",
    industry: "Ритейл / Логистика",
    logo: "🏪",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    text: "Заказываем технику для оснащения распределительных центров и торговых объектов в регионе. Быстрая подача и чёткое соблюдение графика — именно то, что нам нужно при сжатых сроках открытия магазинов.",
    contact: "Региональный менеджер по развитию",
  },
];

const ClientsSection = () => {
  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наши клиенты</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нам доверяют
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Среди наших клиентов — крупнейшие предприятия и организации Нижегородской области
          </p>
        </div>

        {/* Логотипы-бейджи */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-20">
          {clients.map((client, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border ${client.border} bg-gradient-to-r ${client.color} backdrop-blur-sm`}
            >
              <span className="text-xl sm:text-2xl">{client.logo}</span>
              <span className="font-bold text-white text-sm sm:text-base">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Карточки с отзывами */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {clients.map((client, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between p-5 sm:p-7 border ${client.border} rounded-2xl bg-gradient-to-br ${client.color} hover:brightness-110 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{client.logo}</div>
                  <div>
                    <p className="font-black text-white text-base leading-tight">{client.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">{client.industry}</p>
                  </div>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">"{client.text}"</p>
              </div>
              <div className="border-t border-white/10 pt-4 mt-5">
                <p className="text-white/40 text-xs">{client.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
