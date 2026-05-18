import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const priceList = [
  { type: "Асфальтирование двора (от 500 м²)", price: "от 650 ₽/м²" },
  { type: "Асфальтирование парковки (от 1 000 м²)", price: "от 550 ₽/м²" },
  { type: "Асфальтирование дороги (от 2 000 м²)", price: "от 480 ₽/м²" },
  { type: "Промышленная площадка (от 5 000 м²)", price: "от 450 ₽/м²" },
  { type: "Подъезд к дому, коттеджу", price: "от 750 ₽/м²" },
  { type: "Ямочный ремонт асфальта", price: "от 850 ₽/м²" },
];

const services = [
  {
    h: "Асфальтирование под ключ в Нижнем Новгороде",
    text: "Выполняем полный цикл работ: геодезия и замеры, демонтаж старого покрытия, подготовка основания, отсыпка щебня и песка, укладка асфальтобетона горячим способом, укатка катком. Используем асфальт марки М2 и М3 по ГОСТ 9128-2013.",
  },
  {
    h: "Асфальтирование дворов и придомовых территорий",
    text: "Благоустройство дворов жилых домов в Нижнем Новгороде: ремонт и укладка нового асфальта, парковочные карманы, подходы к подъездам, пешеходные дорожки. Работаем с УК, ТСЖ и застройщиками по безналу с НДС.",
  },
  {
    h: "Асфальтирование парковок и стоянок",
    text: "Обустройство парковок для торговых центров, бизнес-центров, складов, АЗС. Площади от 100 до 10 000 м². Нанесение разметки, установка бордюров, водоотведение, гарантия на покрытие до 3 лет.",
  },
  {
    h: "Укладка асфальта на дороги и подъезды",
    text: "Асфальтирование автомобильных дорог IV-V категории, подъездных путей к промышленным объектам, частным домам и коттеджам. Толщина покрытия от 4 до 12 см в зависимости от нагрузки.",
  },
  {
    h: "Ямочный ремонт асфальтового покрытия",
    text: "Локальный ремонт повреждений: заделка ям, трещин, выбоин. Применяем технологию горячего ремонта с фрезерованием краёв. Минимальный объём заказа — от 50 м². Работаем круглый сезон апрель–октябрь.",
  },
  {
    h: "Цена асфальтирования за м² в Нижнем Новгороде",
    text: "Стоимость работ начинается от 450 ₽ за квадратный метр при больших объёмах. Финальная цена зависит от состояния основания, толщины покрытия, удалённости объекта от Нижнего Новгорода и сроков выполнения работ. Просчитайте смету в онлайн-калькуляторе.",
  },
];

const AsphaltSeoText = () => {
  return (
    <section
      className="relative py-12 sm:py-20 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(20,12,4,0.6) 0%, rgba(30,18,6,0.95) 50%, rgba(20,12,4,0.6) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4">
            <Icon name="Info" size={14} />
            Информация об услугах
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tighter mb-3">
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Асфальтирование в Нижнем Новгороде и области
            </span>
          </h2>
          <p className="text-amber-100/70 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            ООО «Фаворит» выполняет асфальтирование любых объектов — от частного двора до промышленной площадки в 10 000 м². Работаем по Нижнему Новгороду, Дзержинску, Кстово, Арзамасу, Богородску, Городцу и всей Нижегородской области.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-12">
          {services.map((s, i) => (
            <Link
              key={i}
              to="/asfaltirovanie"
              className={`group relative p-5 sm:p-6 rounded-2xl transition-all ${
                i === 0
                  ? "bg-gradient-to-br from-amber-500/15 to-orange-500/10 border-2 border-amber-400/40 hover:border-amber-300 hover:from-amber-500/25 hover:to-orange-500/20"
                  : "bg-white/5 border border-amber-500/20 hover:bg-white/10 hover:border-amber-400/50"
              }`}
            >
              {i === 0 && (
                <div className="absolute -top-3 left-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-amber-500/40">
                  <Icon name="Sparkles" size={10} />
                  Новая услуга
                </div>
              )}
              <h3 className="font-display font-bold text-base sm:text-lg text-amber-100 mb-2 group-hover:text-amber-300 transition">
                {s.h}
              </h3>
              <p className="text-amber-100/70 text-sm leading-relaxed">
                {s.text}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-400 group-hover:gap-2 transition-all">
                Подробнее <Icon name="ArrowRight" size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5 sm:p-8 mb-6">
          <h3 className="font-display font-black text-lg sm:text-2xl text-amber-100 mb-4 flex items-center gap-2">
            <Icon name="BadgeRussianRuble" size={22} className="text-amber-400" />
            Цены на асфальтирование за квадратный метр
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {priceList.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/30 border border-amber-500/15"
              >
                <span className="text-sm sm:text-base text-amber-100/90">
                  {p.type}
                </span>
                <span className="text-sm sm:text-base font-black text-amber-300 whitespace-nowrap">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs sm:text-sm text-amber-100/60 leading-relaxed">
            Указаны базовые цены при объёме работ от 500 м². Финальная стоимость рассчитывается по смете после выезда замерщика — бесплатно в течение 1 дня.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/asfaltirovanie"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-sm sm:text-base shadow-xl shadow-amber-500/40 hover:scale-105 transition-all"
          >
            <Icon name="Calculator" size={18} />
            Рассчитать стоимость
          </Link>
          <a
            href="tel:+79601690990"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold border-2 border-amber-400/50 text-amber-300 text-sm sm:text-base hover:bg-amber-400/10 transition-all"
          >
            <Icon name="Phone" size={18} />
            +7 (960) 169-09-90
          </a>
        </div>

        <div className="sr-only">
          <h3>Асфальтирование цена за м2 Нижний Новгород</h3>
          <h3>Заказать асфальтирование под ключ</h3>
          <h3>Укладка асфальта в Нижегородской области</h3>
          <h3>Асфальтирование Дзержинск Кстово Арзамас Богородск</h3>
          <p>
            Заказать асфальтирование в Нижнем Новгороде у компании ООО «Фаворит» можно по
            телефону +7 (960) 169-09-90. Выполняем укладку асфальта, асфальтирование
            дворов, парковок, дорог, ямочный ремонт. Гарантия до 3 лет. Работаем
            круглогодично в сезон, безналичный расчёт с НДС, договор, ЭДО для юр. лиц.
            Бесплатный выезд замерщика и просчёт сметы.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AsphaltSeoText;