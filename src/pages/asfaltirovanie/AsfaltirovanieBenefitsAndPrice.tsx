import Icon from "@/components/ui/icon";
import { benefits, priceList, PHONE, PHONE_TEL } from "./asfaltirovanieData";

const AsfaltirovanieBenefitsAndPrice = () => {
  return (
    <>
      {/* Benefits */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Почему выбирают нас
            </span>
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Делаем асфальтирование с 2013 года. За плечами — дороги, парковки и
            промплощадки в Нижнем Новгороде и области.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group p-5 sm:p-6 rounded-2xl bg-white/90 border border-amber-200 shadow-lg shadow-amber-200/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-300/50 hover:border-amber-400 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Icon name={b.icon} size={22} className="text-white drop-shadow" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-slate-900">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price list */}
      <section
        id="price"
        className="relative z-10 px-4 sm:px-6 py-12 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,243,220,0.6) 0%, rgba(255,236,200,0.8) 50%, rgba(255,243,220,0.6) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 shadow-lg shadow-amber-400/30 mb-4">
              <Icon name="Tag" size={14} className="text-white" />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Прайс-лист
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3">
              <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
                Цены на асфальтирование
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Финальная цена зависит от объёма, состояния основания и удалённости
              объекта. Точная смета — после бесплатного выезда замерщика.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {priceList.map((item, i) => (
              <div
                key={i}
                className={`relative group p-5 sm:p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                  item.popular
                    ? "border-amber-400 bg-gradient-to-br from-amber-100 via-white to-orange-100 shadow-xl shadow-amber-400/30"
                    : "border-amber-200 bg-white/90 shadow-lg shadow-amber-200/30 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-300/40"
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black tracking-wider shadow-lg shadow-orange-400/40">
                    ★ ПОПУЛЯРНОЕ
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/40 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={22} className="text-white drop-shadow" />
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl mb-1 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  {item.subtitle}
                </p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xs text-slate-500 font-semibold">от</span>
                  <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {item.price}
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {item.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-amber-200/70 pt-3">
                  <Icon
                    name="Info"
                    size={11}
                    className="inline text-amber-600 mr-1 -mt-0.5"
                  />
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white/90 border border-amber-300 shadow-lg shadow-amber-200/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/40 flex items-center justify-center flex-shrink-0">
                  <Icon name="Calculator" size={20} className="text-white drop-shadow" />
                </div>
                <div>
                  <div className="font-display font-bold text-base sm:text-lg text-slate-900">
                    Нужна точная цена для вашего объекта?
                  </div>
                  <p className="text-sm text-slate-600">
                    Расскажите про объёмы — посчитаем за 15 минут
                  </p>
                </div>
              </div>
              <a
                href={PHONE_TEL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/40 hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
              >
                <Icon name="Phone" size={16} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AsfaltirovanieBenefitsAndPrice;
