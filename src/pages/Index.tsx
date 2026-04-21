import { useEffect, useState } from "react";
import { ArrowRight, Truck, Clock, Shield, Wrench, MapPin, Phone } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              ООО Фаворит
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Преимущества
            </a>
            <a href="#fleet" className="text-muted-foreground hover:text-white transition-colors">
              Техника
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <a href="tel:+79601883084" className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all flex items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 960 188-30-84
            </a>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Заказать
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Background animation" className="w-auto h-3/4 object-contain opacity-60" />
        </div>
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  Аренда и услуги манипуляторов в Нижнем Новгороде
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Манипуляторы
                </span>
                <br />
                <span className="text-accent">в аренду</span>
                <br />
                <span className="text-white/70 text-4xl lg:text-5xl">в Нижнем Новгороде</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Оставьте заявку или позвоните — мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью под вашу задачу.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Посмотреть технику
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">15+</div>
                  <p className="text-sm text-white/60">Единиц техники</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">5 000+</div>
                  <p className="text-sm text-white/60">Выполненных заказов</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">10 лет</div>
                  <p className="text-sm text-white/60">На рынке</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <img
                src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/3e17f3de-6d26-4fad-89a9-f87178d73779.jpg"
                alt="Манипулятор в работе"
                className="w-full h-full object-contain rounded-3xl drop-shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Почему выбирают нас
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Clock",
                title: "Подача от 1 часа",
                desc: "Оперативно реагируем на заявки и подаём технику в кратчайшие сроки по Нижнему Новгороду",
              },
              {
                icon: "Truck",
                title: "Подбор под задачу",
                desc: "Подберём манипулятор с платформой нужных габаритов и грузоподъёмностью от 5 до 20 тонн",
              },
              {
                icon: "Shield",
                title: "Работаем официально",
                desc: "Заключаем договор, предоставляем все закрывающие документы для юридических лиц",
              },
              {
                icon: "MapPin",
                title: "Весь Нижний Новгород",
                desc: "Работаем на стройках, складах и производствах — выезжаем в любой район города и область",
              },
              {
                icon: "Wrench",
                title: "Опытные операторы",
                desc: "Профессиональные машинисты с допуском, опытом от 5 лет и всеми необходимыми разрешениями",
              },
              {
                icon: "Phone",
                title: "Консультация бесплатно",
                desc: "Позвоните — поможем выбрать технику, рассчитаем стоимость и согласуем время подачи",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-6 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш парк</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Наша техника
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью КМУ под вашу задачу
            </p>
          </div>

          {/* Truck Card 1 — FAW */}
          <div className="relative border border-accent/20 rounded-3xl bg-card/50 overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
            <div className="relative grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-semibold tracking-widest uppercase mb-6">
                  КМУ DongYang
                </div>
                <h3 className="font-display font-black text-3xl lg:text-4xl mb-2">FAW + КМУ DongYang</h3>
                <p className="text-accent font-bold text-xl mb-8">3 000 ₽/час с НДС</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Грузоподъёмность кузова", value: "до 17 т" },
                    { label: "Грузоподъёмность стрелы", value: "до 8 т" },
                    { label: "Ширина кузова", value: "до 2,45 м" },
                    { label: "Длина кузова", value: "до 8 м" },
                    { label: "Вылет стрелы", value: "до 21 м" },
                    { label: "Корзина монтажная", value: "Люлька ✓" },
                  ].map((spec, i) => (
                    <div key={i} className="bg-background/40 rounded-xl p-4 border border-accent/10">
                      <p className="text-muted-foreground text-xs mb-1">{spec.label}</p>
                      <p className="font-bold text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <a href="tel:+79601883084" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-semibold hover:shadow-xl hover:shadow-accent/40 transition-all">
                  Заказать этот манипулятор
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </a>
              </div>

              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg"
                  alt="FAW КМУ DongYang"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent lg:block hidden" />
              </div>
            </div>
          </div>

          {/* Truck Card 2 — КАМАЗ */}
          <div className="relative border border-accent/20 rounded-3xl bg-card/50 overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
            <div className="relative grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-semibold tracking-widest uppercase mb-6">
                  КМУ HANGIL
                </div>
                <h3 className="font-display font-black text-3xl lg:text-4xl mb-2">КАМАЗ 65115 + КМУ HANGIL</h3>
                <p className="text-accent font-bold text-xl mb-8">2 800 ₽/час с НДС</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Грузоподъёмность платформы", value: "до 12 т" },
                    { label: "Грузоподъёмность стрелы", value: "до 7 т" },
                    { label: "Ширина кузова", value: "до 2,40 м" },
                    { label: "Длина кузова", value: "до 6,5 м" },
                    { label: "Вылет стрелы", value: "до 19 м" },
                    { label: "Тип кузова", value: "Бортовой" },
                  ].map((spec, i) => (
                    <div key={i} className="bg-background/40 rounded-xl p-4 border border-accent/10">
                      <p className="text-muted-foreground text-xs mb-1">{spec.label}</p>
                      <p className="font-bold text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <a href="tel:+79601883084" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-semibold hover:shadow-xl hover:shadow-accent/40 transition-all">
                  Заказать этот манипулятор
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </a>
              </div>

              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg"
                  alt="КАМАЗ 65115 КМУ HANGIL"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent lg:block hidden" />
              </div>
            </div>
          </div>

          {/* What to tell us */}
          <div className="border border-accent/10 rounded-2xl bg-accent/5 p-10">
            <h3 className="font-display font-bold text-2xl mb-6 text-center">Что сообщить при заказе</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "Package", text: "Вес груза" },
                { icon: "Maximize", text: "Размеры груза" },
                { icon: "MapPin", text: "Место загрузки" },
                { icon: "MapPin", text: "Место разгрузки" },
                { icon: "MessageSquare", text: "Нюансы погрузки/разгрузки" },
                { icon: "Phone", text: "Удобное время подачи" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-background/30 rounded-xl p-4 border border-accent/10">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={16} className="text-accent" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">
              Позвоните нам — специалист выслушает пожелания, уточнит объём работ и подберёт подходящую технику
            </p>
          </div>
        </div>
      </section>

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
            {[
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
            ].map((item, i) => {
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
            {[
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
            ].map((plan, i) => {
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
    </div>
  );
};

export default Index;