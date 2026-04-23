import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import OrderModal from "@/components/ui/OrderModal";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";


interface BottomSectionsProps {
  visibleSections: Record<string, boolean>;
}

const REQUISITES_TEXT = `Общество с ограниченной ответственностью «ФАВОРИТ»
ООО «ФАВОРИТ»
ИНН: 5250077990 / КПП: 525001001
ОГРН: 1235200013531
Юридический адрес: 607657, Нижегородская область, Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13
Р/с: 40702810316020000009
Банк: АО «АЛЬФА-БАНК»
К/с: 30101810200000000593
БИК: 044525593
Директор: Мкртчян Саргис Варужанович, действующий на основании Устава`;

const BottomSections = ({ visibleSections }: BottomSectionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyRequisites = () => {
    navigator.clipboard.writeText(REQUISITES_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>Реквизиты ООО ФАВОРИТ</title>
  <style>
    @page { size: A4; margin: 20mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12pt; color: #111; }
    .header { text-align: center; margin-bottom: 24px; }
    .header img { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; }
    .header h1 { font-size: 15pt; font-weight: bold; margin-bottom: 4px; }
    .header p { font-size: 10pt; color: #666; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    tr { border-bottom: 1px solid #e5e5e5; }
    td { padding: 8px 6px; vertical-align: top; }
    td:first-child { font-size: 9pt; color: #888; width: 38%; white-space: nowrap; }
    td:last-child { font-size: 11pt; font-weight: 500; }
    .divider { border-top: 2px solid #ddd; margin: 12px 0; }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp" alt="Фаворит"/>
    <h1>ООО «ФАВОРИТ»</h1>
    <p>Реквизиты организации</p>
  </div>
  <table>
    <tr><td>Полное название</td><td>Общество с ограниченной ответственностью «ФАВОРИТ»</td></tr>
    <tr><td>Сокращённое название</td><td>ООО «ФАВОРИТ»</td></tr>
    <tr><td>ИНН / КПП</td><td>5250077990 / 525001001</td></tr>
    <tr><td>ОГРН</td><td>1235200013531</td></tr>
    <tr><td>Юридический адрес</td><td>607657, Нижегородская область, Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13</td></tr>
    <tr><td>Расчётный счёт</td><td>40702810316020000009</td></tr>
    <tr><td>Банк</td><td>АО «АЛЬФА-БАНК»</td></tr>
    <tr><td>Корр. счёт</td><td>30101810200000000593</td></tr>
    <tr><td>БИК</td><td>044525593</td></tr>
  </table>
  <div class="divider"></div>
  <table>
    <tr><td>Директор</td><td>Мкртчян Саргис Варужанович, действующий на основании Устава</td></tr>
  </table>
</body>
</html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };
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
      <section id="how" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как это работает
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {steps.map((item, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative flex sm:flex-col items-start gap-4 p-4 sm:p-0 border sm:border-0 border-accent/10 rounded-2xl sm:rounded-none bg-card/30 sm:bg-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 sm:mb-4 flex-shrink-0">
                    <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon name={item.icon} size={22} className="text-white" />
                    </div>
                    <div className="text-4xl sm:text-6xl font-black text-accent/10 leading-none sm:block hidden">{item.step}</div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-2xl mb-1 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные цены
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {plans.map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "sm:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-5 sm:p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-2xl mb-1 sm:mb-2">{plan.name}</h3>
                      <p className="text-2xl sm:text-4xl font-black text-accent mb-4 sm:mb-8">{plan.price}</p>
                      <ul className="space-y-2 sm:space-y-4 mb-5 sm:mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-2 sm:gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-xs sm:text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className={`w-full px-5 py-3 sm:py-4 rounded-xl font-semibold transition-all text-sm ${
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
      <section id="cta" className="py-12 sm:py-24 px-4 sm:px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нужен манипулятор?
            </span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground mb-6 sm:mb-10 font-light max-w-2xl mx-auto">
            Позвоните прямо сейчас — ответим сразу, подберём технику и согласуем время подачи.
          </p>

          <PhoneButton size="lg" className="mx-auto" />

          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 sm:px-5 sm:py-3 bg-red-600/15 border border-red-500/40 rounded-2xl">
            <span className="text-lg sm:text-xl animate-pulse">🔥</span>
            <p className="text-red-400 font-bold text-xs sm:text-base">Скидка 10% на первый заказ — при звонке прямо сейчас!</p>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-3 sm:mt-4">Работаем без выходных · Подача от 1 часа</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш адрес</span>
            <div className="flex flex-col items-center gap-3 mt-3">
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
                <img
                  src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp"
                  alt="Фаворит герб"
                  className="w-12 h-12 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl object-cover logo-glow"
                />
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                  <h2
                    className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 40%, #fdeea0 60%, #c8850a 80%, #f0c040 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Как нас найти
                  </h2>
                  <p
                    className="text-xs sm:text-sm tracking-widest uppercase"
                    style={{ color: "#a07010", letterSpacing: "0.2em" }}
                  >
                    Аренда манипуляторов от компании Фаворит
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Блок с контактами */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col gap-2 sm:col-span-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-semibold">Работаем без выходных</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-xl text-white">
                Работаем по всему Нижнему Новгороду и области
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                📍 Нижний Новгород, Шуваловский проезд, 7
              </p>
              <p className="text-muted-foreground text-xs">Выезжаем по всему городу и области</p>
            </div>
            <div className="flex flex-col sm:flex-col gap-2 sm:col-span-2 sm:justify-end">
              <PhoneButton size="lg" className="rounded-2xl w-full" />
              <a
                href="tel:+79601690990"
                className="inline-flex items-center justify-center gap-4 px-10 sm:px-14 py-5 sm:py-6 border rounded-2xl font-bold text-2xl sm:text-3xl w-full transition-all"
                style={{ color: "#e8a820", borderColor: "#e8a820", background: "rgba(232,168,32,0.08)", fontFamily: "'Cinzel', serif", animation: "goldPulse 1.2s ease-in-out infinite" }}
              >
                📞 +7 960 169-09-90
              </a>

              <a
                href="https://yandex.ru/maps/org/195468245032/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-accent/30 rounded-xl text-white font-medium hover:bg-accent/10 transition-all text-sm w-full"
              >
                <span className="text-accent">★</span>
                Оставить отзыв на Яндекс.Картах
              </a>
            </div>
          </div>

          {/* Реквизиты */}
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 p-5 sm:p-8 mb-5 shadow-2xl" style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(232,168,32,0.06) 100%)" }}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/40 flex items-center justify-center shadow-lg">
                  <Icon name="BadgeCheck" size={22} className="text-accent" />
                </div>
                <div>
                  <div className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Официальные реквизиты</div>
                  <div
                    className="text-lg sm:text-2xl font-black"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #fdeea0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ООО «ФАВОРИТ»
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyRequisites}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-xs font-semibold text-white"
                >
                  <Icon name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-green-400" : "text-accent"} />
                  {copied ? "Скопировано" : "Скопировать"}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-xs font-semibold text-white"
                >
                  <Icon name="Download" size={14} className="text-accent" />
                  PDF
                </button>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "Building2", label: "Полное название", value: "Общество с ограниченной ответственностью «ФАВОРИТ»", full: true },
                { icon: "Hash", label: "ИНН / КПП", value: "5250077990 / 525001001" },
                { icon: "FileBadge", label: "ОГРН", value: "1235200013531" },
                { icon: "MapPin", label: "Юридический адрес", value: "607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13", full: true },
                { icon: "CreditCard", label: "Расчётный счёт", value: "40702810316020000009" },
                { icon: "Landmark", label: "Банк", value: "АО «АЛЬФА-БАНК»" },
                { icon: "Wallet", label: "Корр. счёт", value: "30101810200000000593" },
                { icon: "Fingerprint", label: "БИК", value: "044525593" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 transition-all ${item.full ? "sm:col-span-2" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon name={item.icon} size={16} className="text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold text-sm sm:text-base break-words">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Карта */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: "300px" }}>
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
      <footer className="border-t border-accent/10 py-6 sm:py-12 px-4 sm:px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col items-center md:items-start gap-1">
            <BrandLogo size="sm" />
            <p className="text-center md:text-left mt-1">© 2015 — Аренда манипуляторов в Нижнем Новгороде</p>
          </div>
          <a href="https://webmaster.yandex.ru/siteinfo/?site=https://фаварит.рф" target="_blank" rel="noopener noreferrer">
            <img width="88" height="31" alt="Яндекс.Метрика" style={{borderRadius: '8px'}} src="https://yandex.ru/cycounter?https://фаварит.рф&theme=light&lang=ru" />
          </a>
          <div className="flex gap-4 sm:gap-8 flex-wrap justify-center">
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