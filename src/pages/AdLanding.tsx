import { useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import CallbackModal from "@/components/ui/CallbackModal";
import { reachGoal } from "@/lib/metrika";

const benefits = [
  { icon: "Clock", title: "Подача за 60 минут", text: "Дежурная машина в любой район Нижнего Новгорода" },
  { icon: "BadgeRussianRuble", title: "От 1 900 ₽/час", text: "Фиксированный тариф, оператор включён" },
  { icon: "Truck", title: "15 машин в парке", text: "До 20 тонн, стрела 23 м, люлька, бур" },
  { icon: "ShieldCheck", title: "Работаем с НДС", text: "Договор, УПД, ЭДО для юр. лиц" },
];

const trustBadges = [
  { icon: "Star", text: "10+ лет на рынке" },
  { icon: "Users", text: "Опытные операторы" },
  { icon: "MapPin", text: "Весь Нижний Новгород и область" },
  { icon: "Calendar", text: "Без выходных" },
];

const AdLanding = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const openCallback = () => {
    reachGoal("ad_callback_open");
    setCallbackOpen(true);
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>Аренда манипулятора в Нижнем Новгороде — звоните, подадим за 60 минут</title>
      <meta name="description" content="Аренда манипулятора в Нижнем Новгороде от 1900 ₽/час. Подача за 60 минут, оператор включён, работаем с НДС. Звоните +7 960 188-30-84." />
      <meta name="robots" content="noindex, nofollow" />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      {/* Header — только логотип и телефон, без меню */}
      <header className="fixed top-0 w-full bg-background/90 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <BrandLogo compact />
          <PhoneButton size="sm" />
        </div>
      </header>

      {/* Hero — главный экран с оффером и звонком */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-white text-sm font-medium">Сейчас на линии — примем заявку за 2 минуты</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Аренда манипулятора в Нижнем Новгороде
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
              от 1 900 ₽/час</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground mb-7 sm:mb-9 leading-relaxed max-w-2xl mx-auto">
            Подадим технику за 60 минут в любой район города. Оператор с опытом 10+ лет включён в стоимость. Работаем без выходных, с НДС.
          </p>

          {/* Главные кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch mb-4">
            <PhoneButton size="lg" className="w-full sm:w-auto" />
            <button
              type="button"
              onClick={openCallback}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-6 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-white font-bold text-base sm:text-xl whitespace-nowrap"
            >
              <Icon name="MessageCircle" size={20} className="text-accent" />
              Заказать звонок
            </button>
          </div>

          <p className="text-sm text-muted-foreground/70">
            Или позвоните прямо сейчас — ответим сразу и подберём технику под вашу задачу
          </p>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-accent/5 border-y border-accent/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl border border-accent/15 bg-card/30 text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-3">
                <Icon name={b.icon} size={20} className="text-accent" />
              </div>
              <div className="text-white font-bold text-sm sm:text-base mb-1">{b.title}</div>
              <div className="text-muted-foreground text-xs sm:text-sm leading-snug">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Доверие */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4">
          {trustBadges.map((t, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent/20 bg-card/30">
              <Icon name={t.icon} size={16} className="text-accent" />
              <span className="text-white text-sm font-medium">{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Нижний CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Нужен манипулятор сегодня?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-7 max-w-xl mx-auto">
            Позвоните — дежурный менеджер примет заявку за 2 минуты и подаст технику за час.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch">
            <PhoneButton size="lg" className="w-full sm:w-auto" />
            <button
              type="button"
              onClick={openCallback}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-6 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-all text-white font-bold text-base sm:text-xl whitespace-nowrap"
            >
              <Icon name="MessageCircle" size={20} className="text-accent" />
              Заказать звонок
            </button>
          </div>
        </div>
      </section>

      <footer className="py-6 px-4 text-center text-xs text-muted-foreground/60 border-t border-accent/10">
        ООО «Фаворит» · Аренда манипулятора в Нижнем Новгороде · +7 960 188-30-84
</footer>
    </div>
  );
};

export default AdLanding;
