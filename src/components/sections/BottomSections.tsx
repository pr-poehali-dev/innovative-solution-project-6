import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import OrderModal from "@/components/ui/OrderModal";

interface BottomSectionsProps {
  visibleSections: Record<string, boolean>;
}

const BottomSections = ({ visibleSections }: BottomSectionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const steps = [
    {
      step: "01",
      icon: "PhoneCall",
      iconBg: "from-blue-400 to-blue-600",
      title: "Оставьте заявку",
      desc: "Позвоните или заполните форму на сайте. Уточните объём работ, адрес и время подачи техники.",
    },
    {
      step: "02",
      icon: "ClipboardCheck",
      iconBg: "from-amber-400 to-orange-500",
      title: "Согласуем условия",
      desc: "Подберём подходящий манипулятор, рассчитаем стоимость и заключим договор. Всё быстро и прозрачно.",
    },
    {
      step: "03",
      icon: "Truck",
      iconBg: "from-green-400 to-emerald-600",
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
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* How it works */}
      <section id="how" className="py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-10 sm:mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как это работает
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((item, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon name={item.icon} size={26} className="text-white" />
                    </div>
                    <div className="text-5xl sm:text-6xl font-black text-accent/10 leading-none">{item.step}</div>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-2xl mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-32 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-10 sm:mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные цены
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
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
                    className={`relative p-6 sm:p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl mb-2">{plan.name}</h3>
                      <p className="text-3xl sm:text-4xl font-black text-accent mb-6 sm:mb-8">{plan.price}</p>
                      <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className={`w-full px-6 py-3.5 sm:py-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${
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
      <section id="cta" className="py-16 sm:py-32 px-4 sm:px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-5 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нужен манипулятор?
            </span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 font-light max-w-2xl mx-auto">
            Позвоните прямо сейчас — ответим сразу, подберём технику и согласуем время подачи.
          </p>

          {/* Большая кнопка звонка */}
          <a
            href="tel:+79601883084"
            className="group inline-flex items-center gap-4 px-10 sm:px-14 py-5 sm:py-6 bg-gradient-to-r from-accent to-accent/90 text-black rounded-2xl hover:shadow-2xl hover:shadow-accent/50 transition-all font-black text-2xl sm:text-3xl mx-auto animate-pulse hover:animate-none"
          >
            <span className="text-3xl sm:text-4xl">📞</span>
            <span className="text-red-600">+7 960 188-30-84</span>
          </a>

          <p className="text-muted-foreground text-sm mt-5">Работаем без выходных · Подача от 1 часа</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш адрес</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как нас найти
              </span>
            </h2>
          </div>

          <div className="relative border border-accent/20 rounded-2xl sm:rounded-3xl bg-card/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
            <div className="relative grid lg:grid-cols-2 gap-0">

              {/* Левая часть — информация */}
              <div className="p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 border border-accent/30 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent text-sm font-semibold">Работаем без выходных</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl mb-2 text-white">
                    Аренда манипуляторов<br />от компании ФАВОРИТ
                  </h3>
                  <p className="text-muted-foreground mt-4 text-base">
                    📍 Нижний Новгород,<br />Шуваловский проезд, 7
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">Выезжаем по всему городу и области</p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="tel:+79601883084"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-accent/40 transition-all"
                  >
                    📞 +7 960 188-30-84
                  </a>
                  <a
                    href="https://yandex.ru/maps/?pt=43.848988,56.270596&z=17&text=Аренда+манипуляторов+от+компании+ФАВОРИТ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 rounded-xl text-white font-medium hover:bg-accent/10 transition-all text-sm"
                  >
                    🗺️ Открыть в Яндекс.Картах
                  </a>
                </div>
              </div>

              {/* Правая часть — карта Яндекс */}
              <div className="relative h-64 lg:h-auto min-h-[320px] overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=43.848988,56.270596&z=17&l=map&pt=43.848988,56.270596,pm2rdl"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта — ООО Фаворит"
                  className="absolute inset-0 w-full h-full"
                />
                {/* Плашка поверх карты */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-card/90 backdrop-blur-sm border border-accent/30 rounded-xl px-4 py-3 pointer-events-none">
                  <p className="text-white font-bold text-sm">Аренда манипуляторов от компании ФАВОРИТ</p>
                  <p className="text-accent text-xs mt-0.5">📍 Шуваловский проезд, 7 · Нижний Новгород</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-8 sm:py-12 px-4 sm:px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <p className="text-center md:text-left">© 2026 ООО Фаворит — Аренда манипуляторов в Нижнем Новгороде</p>
          <a href="https://webmaster.yandex.ru/siteinfo/?site=https://фаварит.рф" target="_blank" rel="noopener noreferrer">
            <img width="88" height="31" alt="Яндекс.Метрика" style={{borderRadius: '8px'}} src="https://yandex.ru/cycounter?https://фаварит.рф&theme=light&lang=ru" />
          </a>
          <div className="flex gap-5 sm:gap-8 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-white transition-colors">Условия</a>
            <a href="#" className="hover:text-white transition-colors">О компании</a>
            <a href="#" className="hover:text-white transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BottomSections;