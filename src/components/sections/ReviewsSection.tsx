const reviews = [
  {
    name: "Андрей Соколов",
    company: "ООО СтройМонтаж",
    text: "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год.",
    rating: 5,
    service: "FAW + КМУ DongYang",
  },
  {
    name: "Дмитрий Карпов",
    company: "ИП Карпов",
    text: "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
  },
  {
    name: "Сергей Михайлов",
    company: "Частный клиент",
    text: "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
  },
  {
    name: "Николай Фёдоров",
    company: "ЗАО ПромСтрой",
    text: "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки.",
    rating: 5,
    service: "FAW + КМУ DongYang",
  },
  {
    name: "Алексей Громов",
    company: "ООО МегаСтрой НН",
    text: "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
  },
  {
    name: "Виктор Зайцев",
    company: "ТД Лесторг",
    text: "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё.",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-32 px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Отзывы</span>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Что говорят клиенты
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Более 5 000 выполненных заказов — работаем с частными лицами, ИП и крупными предприятиями
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="flex flex-col justify-between p-8 border border-accent/10 hover:border-accent/30 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300">
              <div>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">"{review.text}"</p>
              </div>
              <div>
                <div className="border-t border-accent/10 pt-5">
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-muted-foreground text-xs mt-1">{review.company}</p>
                  <div className="mt-3 inline-block px-3 py-1 bg-accent/10 rounded-full text-accent text-xs">
                    {review.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
