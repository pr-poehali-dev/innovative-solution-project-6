import { ArrowRight } from "lucide-react";

interface BottomSectionsProps {
  visibleSections: Record<string, boolean>;
}

const BottomSections = ({ visibleSections }: BottomSectionsProps) => {
  const steps = [
    {
      step: "01",
      title: "Оставьте заявку",
      desc: "Позвоните или заполните форму на сайте. Уточните объём работ, адрес и время подачи техники.",
    },
    {
      step: "02",
      title: "Согласуем условия",
      desc: "Подберём подходящий манипулятор, рассчитаем стоимость и заключим договор. Всё быстро и прозрачно.",
    },
    {
      step: "03",
      title: "Техника на объекте",
      desc: "Оператор приедет в назначенное время. Выполним работы качественно и в срок, подпишем акт.",
    },
  ];

  const plans = [
    {
      name: "Почасовая аренда",
      price: "от 2 500 ₽/час",
      features: [
        "Манипулятор от 5 до 10 тонн",
        "Оператор в стоимости",
        "Минимальный заказ — 4 часа",
        "Подача в течение 1 часа",
      ],
      highlight: false,
    },
    {
      name: "Корпоративный",
      price: "По договору",
      features: [
        "Техника от 5 до 20 тонн",
        "Приоритетная подача",
        "Персональный менеджер",
        "Закрывающие документы",
      ],
      highlight: true,
    },
  ];

  return (
    <>
      {/* How it works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как это работает
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="text-8xl font-black text-accent/10 mb-4 leading-none">{item.step}</div>
                  <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные цены
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                      <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.highlight ? "Связаться с нами" : "Заказать технику"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нужен манипулятор?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Оставьте заявку прямо сейчас — перезвоним в течение 15 минут и согласуем все детали.
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto">
            Оставить заявку
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш адрес</span>
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как нас найти
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">Нижний Новгород, Шуваловский проезд, 7</p>
            <div className="mt-6 inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="px-6 py-3 bg-accent/10 border border-accent/20 rounded-full text-white font-semibold text-lg">
                Аренда манипуляторов
              </div>
              <a href="tel:+79601883084" className="px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-bold text-lg hover:shadow-lg hover:shadow-accent/40 transition-all">
                +7 960 188-30-84
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-accent/10 h-[450px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=Нижний+Новгород+Шуваловский+проезд+7&z=16&l=map"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Карта — ООО Фаворит"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 ООО Фаворит — Аренда манипуляторов в Нижнем Новгороде</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Условия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              О компании
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BottomSections;