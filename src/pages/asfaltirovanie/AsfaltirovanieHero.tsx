import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ASPHALT_IMG, PHONE, PHONE_TEL } from "./asfaltirovanieData";

const AsfaltirovanieHero = () => {
  return (
    <>
      {/* Header */}
      <header className="relative px-4 sm:px-6 py-4 border-b border-amber-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold text-sm transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105 transition-all"
          >
            <Icon name="Phone" size={14} />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
        </div>
      </header>

      {/* Hero — фото на всю ширину + плашка с заголовком поверх */}
      <section className="relative z-10">
        <div className="relative w-full">
          <img
            src={ASPHALT_IMG}
            alt="Асфальтирование Нижний Новгород — наши работы"
            className="block w-screen max-w-full h-auto object-cover"
            loading="eager"
          />

          {/* Плашка с ценой в правом верхнем углу */}
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 lg:top-10 lg:right-10">
            <div className="bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl shadow-amber-900/50 border-2 border-white/40">
              <div className="text-[9px] sm:text-xs text-white/90 font-black uppercase tracking-wider drop-shadow">
                Цена работ
              </div>
              <div className="flex items-baseline gap-1 text-white drop-shadow-lg">
                <span className="text-[10px] sm:text-sm font-bold">от</span>
                <span className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                  450
                </span>
                <span className="text-xs sm:text-base font-black">₽/м²</span>
              </div>
            </div>
          </div>

          {/* Бейдж скидки в левом верхнем углу */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 lg:top-10 lg:left-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-red-600/95 backdrop-blur-md border-2 border-red-400/60 shadow-2xl">
              <span className="text-sm sm:text-lg animate-pulse">🔥</span>
              <span className="text-white font-black text-[9px] sm:text-sm tracking-wider whitespace-nowrap">
                СКИДКА 15%
              </span>
            </div>
          </div>

          {/* Большой баннер с заголовком и кнопкой — поверх нижней части фото */}
          <div className="absolute inset-x-0 bottom-0">
            {/* Лёгкий градиент только снизу — фон под текстом */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-3 sm:px-6 pb-3 sm:pb-8 lg:pb-12">
              <h1 className="text-lg sm:text-4xl lg:text-6xl font-display font-black tracking-tighter mb-1.5 sm:mb-3 leading-[1.05] drop-shadow-2xl">
                <span className="bg-gradient-to-r from-white via-white to-accent/70 bg-clip-text text-transparent">
                  Асфальтирование в Нижнем Новгороде
                </span>
              </h1>

              <p className="text-[11px] sm:text-lg lg:text-xl text-white/90 mb-2.5 sm:mb-6 max-w-3xl drop-shadow-lg">
                Укладка асфальта под ключ от{" "}
                <span className="text-accent font-black">450 ₽/м²</span> · Гарантия до 3 лет · Бесплатный замер
              </p>

              <div className="flex flex-row gap-2 sm:gap-3">
                <a
                  href={PHONE_TEL}
                  className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-white overflow-hidden hover:shadow-2xl hover:shadow-amber-500/60 transition-all text-xs sm:text-lg flex-shrink-0 drop-shadow"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <Icon
                    name="Phone"
                    size={14}
                    className="relative animate-pulse sm:hidden"
                  />
                  <Icon
                    name="Phone"
                    size={20}
                    className="relative animate-pulse hidden sm:inline-block"
                  />
                  <span className="relative">{PHONE}</span>
                </a>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold bg-black/60 backdrop-blur-md border-2 border-accent/40 text-white hover:bg-accent/15 hover:border-accent transition-all text-xs sm:text-base"
                >
                  <Icon name="Calculator" size={14} className="sm:hidden" />
                  <Icon name="Calculator" size={18} className="hidden sm:inline-block" />
                  <span className="hidden sm:inline">Рассчитать стоимость</span>
                  <span className="sm:hidden">Калькулятор</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ниже — статистика */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {[
              { v: "12+", l: "лет на рынке" },
              { v: "850+", l: "объектов сдано" },
              { v: "3 года", l: "гарантия" },
              { v: "24/7", l: "приём заявок" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 border border-amber-200 shadow-lg shadow-amber-200/30 p-4 sm:p-5 text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-300/40 transition-all"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-black bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider font-bold mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AsfaltirovanieHero;
