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
    question: "Чем отличается аренда манипулятора от услуг манипулятора?",
    answer:
      "Аренда манипулятора и услуги манипулятора — это одно и то же: вы получаете технику с оператором на нужное количество часов или дней. Мы не сдаём технику без водителя — каждым нашим манипулятором управляет квалифицированный оператор с опытом 5+ лет. Это безопасно для вашего груза и снимает с вас ответственность за технику.",
  },
  {
    question: "Сколько стоит аренда и услуги манипулятора в Нижнем Новгороде?",
    answer:
      "Стоимость услуг манипулятора в Нижнем Новгороде — от 1500 ₽/час с оператором. Минимальный заказ — 4 часа. Цена зависит от грузоподъёмности и типа техники: ISUZU 5т — от 2200 ₽/час, КАМАЗ 65115 — 2800 ₽/час, FAW + КМУ DongYang — 3000 ₽/час, КАМАЗ 43118 вездеход — 3500 ₽/час. Для корпоративных клиентов и постоянных заказчиков — индивидуальные тарифы по договору со скидкой.",
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
    <section className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>

      {/* Декоративные световые пятна */}
      <div className="hidden lg:block absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none animate-pulse" />
      <div
        className="hidden lg:block absolute top-2/3 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-14">
          <div className="flex justify-center mb-4">
            <SectionBadge>Частые вопросы</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Отвечаем на вопросы об аренде манипулятора
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Собрали ответы на самые частые вопросы клиентов об услугах манипулятора в Нижнем Новгороде
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="group relative"
              >
                {/* Внешнее свечение при открытии */}
                {isOpen && (
                  <div
                    className="absolute -inset-0.5 rounded-2xl pointer-events-none opacity-70 emerald-pulse"
                    style={{
                      background:
                        "linear-gradient(135deg, #5eead4 0%, rgba(94,234,212,0.4) 50%, #fbbf24 100%)",
                    }}
                  />
                )}

                {/* Градиентная рамка */}
                <div
                  className="relative rounded-2xl p-[1.5px] transition-all duration-300"
                  style={{
                    background: isOpen
                      ? "linear-gradient(135deg, rgba(94,234,212,0.9) 0%, rgba(94,234,212,0.25) 50%, rgba(251,191,36,0.8) 100%)"
                      : "linear-gradient(135deg, rgba(94,234,212,0.25) 0%, rgba(255,255,255,0.06) 50%, rgba(94,234,212,0.15) 100%)",
                  }}
                >
                  <div className="relative rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
                    {/* Внутреннее свечение в углу */}
                    <div
                      className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                      style={{
                        background: "rgba(94,234,212,0.18)",
                        opacity: isOpen ? 1 : 0.4,
                      }}
                    />

                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="relative w-full flex items-center justify-between gap-3 sm:gap-5 p-4 sm:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Номер вопроса */}
                        <div className="relative flex-shrink-0">
                          <div
                            className="absolute inset-0 rounded-xl blur-md opacity-60 transition-opacity duration-500"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(94,234,212,0.5) 0%, transparent 70%)",
                              opacity: isOpen ? 1 : 0.4,
                            }}
                          />
                          <div
                            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                            style={{
                              background: isOpen
                                ? "linear-gradient(135deg, rgba(94,234,212,0.28) 0%, rgba(94,234,212,0.12) 100%)"
                                : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                              border: isOpen
                                ? "1.5px solid rgba(94,234,212,0.55)"
                                : "1.5px solid rgba(255,255,255,0.1)",
                              boxShadow: isOpen
                                ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 14px rgba(94,234,212,0.3)"
                                : "inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                          >
                            <Icon
                              name="HelpCircle"
                              size={18}
                              style={{ color: isOpen ? "#5eead4" : "rgba(255,255,255,0.5)" }}
                            />
                          </div>
                        </div>

                        <h3
                          className="font-display font-bold text-sm sm:text-base lg:text-lg leading-snug transition-colors duration-300"
                          style={{
                            color: isOpen ? "#fff" : "rgba(255,255,255,0.92)",
                          }}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Стрелка раскрытия */}
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isOpen
                            ? "linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)"
                            : "rgba(255,255,255,0.06)",
                          color: isOpen ? "#0a0a0a" : "rgba(255,255,255,0.6)",
                          border: isOpen ? "none" : "1px solid rgba(255,255,255,0.1)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          boxShadow: isOpen ? "0 4px 14px rgba(94,234,212,0.4)" : "none",
                        }}
                      >
                        <Icon name="ChevronDown" size={18} />
                      </div>
                    </button>

                    {/* Ответ */}
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">
                          {/* Разделительная линия */}
                          <div
                            className="h-px w-full mb-4 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent 0%, rgba(94,234,212,0.4) 50%, transparent 100%)",
                            }}
                          />
                          <div className="pl-[52px] sm:pl-[64px]">
                            <p className="text-muted-foreground text-sm sm:text-base lg:text-[15px] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Блок «Не нашли ответ» */}
        <div className="relative mt-8 sm:mt-12 group">
          <div
            className="absolute -inset-0.5 rounded-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 emerald-pulse"
            style={{
              background:
                "linear-gradient(135deg, #fbbf24 0%, rgba(251,191,36,0.4) 50%, #5eead4 100%)",
            }}
          />
          <div
            className="relative rounded-2xl p-[1.5px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.25) 50%, rgba(94,234,212,0.7) 100%)",
            }}
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black p-6 sm:p-8 text-center overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(251,191,36,0.18)" }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(94,234,212,0.15)" }}
              />

              <div className="relative">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(251,191,36,0.28) 0%, rgba(251,191,36,0.12) 100%)",
                      border: "1.5px solid rgba(251,191,36,0.55)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 14px rgba(251,191,36,0.3)",
                    }}
                  >
                    <Icon name="MessageCircleQuestion" size={22} style={{ color: "#fbbf24" }} />
                  </div>
                </div>
                <h3 className="font-display font-black text-lg sm:text-2xl text-white mb-2">
                  Не нашли ответ на свой вопрос?
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-5 max-w-md mx-auto">
                  Позвоните — диспетчер ответит на любые вопросы и поможет подобрать технику
                </p>
                <div className="flex justify-center items-center">
                  <a
                    href="tel:+79601883084"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:scale-105 transition-transform duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                      color: "#111",
                    }}
                  >
                    <Icon name="Phone" size={18} />
                    +7 960 188-30-84
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;