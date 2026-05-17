import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const AsphaltPromoSection = () => {
  return (
    <section
      id="asfaltirovanie-promo"
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a1208 0%, #2a1d0a 50%, #1a1208 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4">
            <Icon name="Sparkles" size={14} />
            Новая услуга
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tighter mb-4">
            <Link
              to="/asfaltirovanie"
              className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent hover:underline"
            >
              Асфальтирование в Нижнем Новгороде
            </Link>
          </h2>
          <p className="text-amber-100/80 text-sm sm:text-lg max-w-2xl mx-auto">
            Укладка асфальта под ключ от <strong className="text-amber-300">450 ₽/м²</strong> · Дворы, парковки, дороги, ямочный ремонт · Гарантия до 3 лет
          </p>
        </div>

        <nav
          aria-label="Услуги асфальтирования"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {[
            {
              h: "Асфальтирование дворов",
              icon: "Home",
              desc: "Жилые комплексы и придомовые территории",
            },
            {
              h: "Асфальтирование парковок",
              icon: "Car",
              desc: "Открытые стоянки от 100 до 10 000 м²",
            },
            {
              h: "Укладка асфальта",
              icon: "Milestone",
              desc: "Дороги, подъезды, промплощадки",
            },
            {
              h: "Ямочный ремонт",
              icon: "Wrench",
              desc: "Восстановление повреждённого покрытия",
            },
          ].map((s) => (
            <Link
              key={s.h}
              to="/asfaltirovanie"
              className="group p-4 sm:p-5 rounded-2xl bg-white/5 border border-amber-500/20 hover:bg-white/10 hover:border-amber-400/60 hover:-translate-y-1 transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/30">
                <Icon name={s.icon} size={20} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white mb-1">
                {s.h}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/60 leading-snug">
                {s.desc}
              </p>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/asfaltirovanie"
            className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-sm sm:text-base shadow-xl shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 hover:scale-105 transition-all overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <Icon name="ArrowRight" size={18} className="relative" />
            <span className="relative">Перейти к асфальтированию</span>
          </Link>
          <a
            href="tel:+79601690990"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold border-2 border-amber-400/50 text-amber-300 text-sm sm:text-base hover:bg-amber-400/10 hover:border-amber-400 transition-all"
          >
            <Icon name="Phone" size={18} />
            +7 (960) 169-09-90
          </a>
        </div>

        <div className="sr-only">
          <h3>Асфальтирование Нижний Новгород цена</h3>
          <h3>Асфальтирование под ключ Нижегородская область</h3>
          <h3>Укладка асфальта во дворах и парковках</h3>
          <h3>Ямочный ремонт асфальтового покрытия</h3>
          <p>
            Компания «Фаворит» выполняет асфальтирование в Нижнем Новгороде и Нижегородской области
            под ключ. Услуги асфальтирования: укладка асфальта, ремонт дворов, асфальтирование
            парковок и промышленных площадок, ямочный ремонт. Стоимость работ от 450 рублей за
            квадратный метр. Гарантия на работы до 3 лет.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AsphaltPromoSection;
