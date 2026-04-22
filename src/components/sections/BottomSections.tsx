import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import OrderModal from "@/components/ui/OrderModal";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";

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
          <PhoneButton size="lg" className="mx-auto" />

          <div className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-red-600/15 border border-red-500/40 rounded-2xl">
            <span className="text-xl animate-pulse">🔥</span>
            <p className="text-red-400 font-bold text-sm sm:text-base">Скидка 10% на первый заказ — при звонке прямо сейчас!</p>
          </div>
          <p className="text-muted-foreground text-sm mt-4">Работаем без выходных · Подача от 1 часа</p>
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

          {/* Блок с контактами */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-3 sm:col-span-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-semibold">Работаем без выходных</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                Аренда манипуляторов<br />от компании ФАВОРИТ
              </h3>
              <p className="text-muted-foreground text-sm">
                📍 Нижний Новгород,<br />Шуваловский проезд, 7
              </p>
              <p className="text-muted-foreground text-xs">Выезжаем по всему городу и области</p>
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 justify-end">
              <PhoneButton size="md" className="rounded-xl w-full sm:w-auto" />
              <a
                href="https://yandex.ru/maps/?pt=43.851408,56.274653&z=17&text=Шуваловский+канал+7+Нижний+Новгород"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-accent/30 rounded-xl text-white font-medium hover:bg-accent/10 transition-all text-sm w-full sm:w-auto"
              >
                🗺️ Открыть в Яндекс.Картах
              </a>
            </div>
          </div>

          {/* Карта */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: "700px" }}>
            <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad4a56098b0cf87fda42b842d643c95a74c726e9616eafe64e9ea35dc809ded31&width=100%25&height=720&lang=ru_RU&scroll=true" />
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad4a56098b0cf87fda42b842d643c95a74c726e9616eafe64e9ea35dc809ded31&lang=ru_RU&scroll=true"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Карта — ООО Фаворит"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-8 sm:py-12 px-4 sm:px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col items-center md:items-start gap-1">
            <BrandLogo size="sm" />
            <p className="text-center md:text-left mt-1">© 2015 — Аренда манипуляторов в Нижнем Новгороде</p>
          </div>
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