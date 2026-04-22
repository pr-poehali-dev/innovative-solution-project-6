import { useState } from "react";
import Icon from "@/components/ui/icon";

const reviews = [
  {
    name: "Андрей Соколов",
    company: "ООО СтройМонтаж",
    text: "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год.",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "АС",
    highlight: "Техника пришла вовремя",
  },
  {
    name: "Дмитрий Карпов",
    company: "ИП Карпов",
    text: "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "ДК",
    highlight: "Подобрали машину за 20 минут",
  },
  {
    name: "Сергей Михайлов",
    company: "Частный клиент",
    text: "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "СМ",
    highlight: "Справились в неудобном месте",
  },
  {
    name: "Николай Фёдоров",
    company: "ЗАО ПромСтрой",
    text: "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки.",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "НФ",
    highlight: "Сотрудничаем больше 3 лет",
  },
  {
    name: "Алексей Громов",
    company: "ООО МегаСтрой НН",
    text: "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "АГ",
    highlight: "Заключили постоянный договор",
  },
  {
    name: "Виктор Зайцев",
    company: "ТД Лесторг",
    text: "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё.",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "ВЗ",
    highlight: "Груз не повреждён",
  },
];

const ReviewsSection = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setActive((p) => (p + 1) % reviews.length);

  const visible = [
    reviews[(active) % reviews.length],
    reviews[(active + 1) % reviews.length],
    reviews[(active + 2) % reviews.length],
  ];

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Шапка */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Отзывы</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Что говорят клиенты
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl">
              Более 5 000 выполненных заказов — работаем с частными лицами, ИП и крупными предприятиями
            </p>
          </div>

          {/* Счётчик + кнопки */}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm tabular-nums">
              <span className="text-white font-bold">{active + 1}</span> / {reviews.length}
            </span>
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Карточки */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {visible.map((review, i) => (
            <div
              key={`${active}-${i}`}
              className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                i === 0
                  ? "border-accent/40 bg-accent/10 shadow-[0_0_30px_-5px_rgba(var(--accent-rgb),0.2)]"
                  : "border-accent/10 bg-card/40 opacity-70"
              }`}
            >
              {/* Цитата + текст */}
              <div>
                <div className="text-accent text-4xl font-serif leading-none mb-3 opacity-60">"</div>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-5">{review.text}</p>

                {/* Ключевой момент */}
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="CheckCircle" size={14} className="text-accent flex-shrink-0" />
                  <span className="text-accent text-xs font-medium">{review.highlight}</span>
                </div>
              </div>

              {/* Автор */}
              <div className="border-t border-accent/10 pt-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 truncate">{review.company}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-accent text-sm">★</span>
                  ))}
                </div>
              </div>

              {/* Техника */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full">
                <Icon name="Truck" size={12} className="text-accent" />
                <span className="text-accent text-xs">{review.service}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Точки навигации */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-accent" : "w-2 bg-accent/20 hover:bg-accent/40"
              }`}
            />
          ))}
        </div>

        {/* Кнопка отзыва на Яндекс.Картах */}
        <div className="flex justify-center mt-10">
          <a
            href="https://yandex.ru/maps/org/195468245032/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 rounded-xl text-white font-medium hover:bg-accent/10 hover:border-accent/60 transition-all text-sm"
          >
            <span className="text-accent">★</span>
            Оставить отзыв на Яндекс.Картах
          </a>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;