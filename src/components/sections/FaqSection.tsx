import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

const faqs = [
  {
    question: "Где заказать услуги манипулятора в Нижнем?",
    answer:
      "Услуги манипулятора в Нижнем Новгороде оказывает ООО «Фаворит» — собственный парк из 15 единиц техники, опытные операторы, работа без выходных. Закажите услуги манипулятора по телефону +7 960 188-30-84 или через форму на сайте — диспетчер согласует время и подаст технику от 1 часа.",
  },
  {
    question: "Сколько стоят услуги манипулятора в Нижнем Новгороде?",
    answer:
      "Стоимость услуг манипулятора в Нижнем Новгороде — от 1800 ₽/час с оператором. Цена аренды манипулятора зависит от грузоподъёмности: 5т — 2200 ₽/час, 10т — 2800 ₽/час, 17т — 3500 ₽/час. Минимальный заказ — 4 часа. Для постоянных клиентов и крупных заказов действуют скидки.",
  },
  {
    question: "Чем отличается аренда манипулятора от услуг манипулятора?",
    answer:
      "Аренда манипулятора и услуги манипулятора — это одно и то же: вы получаете технику с оператором на нужное количество часов или дней. Мы не сдаём технику без водителя — каждым нашим манипулятором управляет квалифицированный оператор с опытом 5+ лет. Это безопасно для вашего груза и снимает с вас ответственность за технику.",
  },
  {
    question: "Сколько стоит аренда манипулятора в Нижнем Новгороде?",
    answer:
      "Стоимость аренды манипулятора — от 1800 ₽/час с оператором. Минимальный заказ — 4 часа. Цена зависит от грузоподъёмности и типа техники: ISUZU 5т — от 2200 ₽/час, КАМАЗ 65115 — 2800 ₽/час, FAW + КМУ DongYang — 3000 ₽/час, КАМАЗ 43118 вездеход — 3500 ₽/час. Для корпоративных клиентов — индивидуальные тарифы по договору.",
  },
  {
    question: "Как быстро подаётся манипулятор?",
    answer:
      "Подача манипулятора от 1 часа по Нижнему Новгороду и ближайшим пригородам. Работаем без выходных и праздников. Оставьте заявку на сайте или позвоните — диспетчер сразу уточнит адрес и согласует время.",
  },
  {
    question: "Какой манипулятор выбрать для моей задачи?",
    answer:
      "Для подъёма и перевозки грузов до 5т подойдёт ISUZU + КМУ, до 10т — КАМАЗ 43118 + Kanglim (полный привод — вездеход), до 12т — КАМАЗ 65115 + HANGIL, до 17т с вылетом стрелы до 21м — FAW + КМУ DongYang. Для работы на высоте есть модели с монтажной люлькой, для установки свай — манипулятор с буровой установкой. Бесплатно проконсультируем и подберём технику.",
  },
  {
    question: "Есть ли манипулятор с люлькой?",
    answer:
      "Да. На FAW + КМУ DongYang и FAW J6 + DONGYANG 1966 предусмотрена монтажная люлька (корзина). Подходит для работ на высоте: монтаж рекламных конструкций, обслуживание фасадов, работы на опорах ЛЭП и РЖД, высотный монтаж металлоконструкций.",
  },
  {
    question: "Работаете ли вы с юридическими лицами и НДС?",
    answer:
      "Да, работаем с юридическими лицами по договору, с НДС и полным электронным документооборотом (Диадок/СБИС). Предоставляем закрывающие документы: акт выполненных работ, счёт-фактура, УПД. Возможна безналичная оплата и оплата картой.",
  },
  {
    question: "В каких городах Нижегородской области работаете?",
    answer:
      "Работаем по всему Нижнему Новгороду и Нижегородской области: Кстово, Дзержинск, Богородск, Бор, Арзамас, Павлово, Балахна, Городец и другие населённые пункты. Выезд за пределы города рассчитывается отдельно — уточняйте у диспетчера.",
  },
  {
    question: "Можно ли арендовать манипулятор на длительный срок?",
    answer:
      "Да. Сдаём манипулятор посуточно и на длительный срок с закреплённым оператором. Для постоянных клиентов — персональный менеджер, приоритетная подача техники и индивидуальные условия. Заключим договор на регулярное обслуживание ваших объектов.",
  },
  {
    question: "Что должно быть указано при заказе манипулятора?",
    answer:
      "Чтобы мы подобрали нужную технику, сообщите: вес и габариты груза, адреса загрузки и разгрузки, нюансы погрузки (заезд, подъездные пути), удобное время подачи. Чем точнее информация — тем быстрее мы подберём правильный манипулятор и рассчитаем стоимость.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <SectionBadge>Частые вопросы</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Отвечаем на вопросы об аренде манипулятора
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Собрали ответы на самые частые вопросы клиентов об услугах манипулятора в Нижнем Новгороде
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-accent/50 bg-accent/5 shadow-lg shadow-accent/10"
                    : "border-accent/15 bg-card/40 hover:border-accent/30"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? "bg-accent/20 border border-accent/40" : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <Icon name="HelpCircle" size={16} className={isOpen ? "text-accent" : "text-white/60"} />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug pt-1">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen ? "bg-accent text-black rotate-180" : "bg-white/5 text-white/60"
                    }`}
                  >
                    <Icon name="ChevronDown" size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 animate-in fade-in slide-in-from-top-1 duration-300">
                    <div className="pl-11 sm:pl-12">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 text-center p-5 sm:p-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent">
          <p className="text-white text-sm sm:text-base mb-3">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="tel:+79601883084"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-accent/30"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)", color: "#111" }}
          >
            <Icon name="Phone" size={16} />
            Позвонить: +7 960 188-30-84
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;