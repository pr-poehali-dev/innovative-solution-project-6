import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import OrderModal from "@/components/ui/OrderModal";
import SectionBadge from "@/components/ui/SectionBadge";

const trucks = [
  // ── Манипуляторы ──
  {
    badge: "КМУ DongYang",
    title: "FAW + КМУ DongYang",
    slug: "faw-kmu-dongyoung",
    price: "3 000 ₽/час с НДС",
    count: 2,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/df8d23ad-2b19-4a5c-bfef-8403f404cab9.webp",
    alt: "FAW КМУ DongYang",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 17 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Ширина кузова", value: "до 2,45 м" },
      { label: "Длина кузова", value: "до 8 м" },
      { label: "Вылет стрелы", value: "до 21 м" },
      { label: "Корзина монтажная", value: "Люлька ✓" },
    ],
  },
  {
    badge: "КМУ HANGIL",
    title: "КАМАЗ 65115 + КМУ HANGIL",
    slug: "kamaz-65115-hangil",
    price: "2 800 ₽/час с НДС",
    count: 3,
    tag: { label: "Хит заказов", icon: "Flame", color: "from-orange-500 to-red-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/b646729f-a106-46bf-b7e4-abf0fe1c4983.webp",
    alt: "КАМАЗ 65115 КМУ HANGIL",
    specs: [
      { label: "Грузоподъёмность платформы", value: "до 12 т" },
      { label: "Грузоподъёмность стрелы", value: "до 7 т" },
      { label: "Ширина кузова", value: "до 2,40 м" },
      { label: "Длина кузова", value: "до 6,5 м" },
      { label: "Вылет стрелы", value: "до 19 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
  },
  {
    badge: "КМУ Kanglim",
    title: "КАМАЗ 43118 + КМУ Kanglim",
    slug: "kamaz-43118-kanglim",
    price: "3 500 ₽/час с НДС",
    count: 2,
    tag: { label: "Популярно", icon: "TrendingUp", color: "from-blue-500 to-indigo-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.webp",
    alt: "КАМАЗ 43118 КМУ Kanglim вездеход",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 10 т" },
      { label: "Грузоподъёмность стрелы", value: "до 7 т" },
      { label: "Ширина кузова", value: "до 2,45 м" },
      { label: "Длина кузова", value: "до 6,20 м" },
      { label: "Вылет стрелы", value: "до 23 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
  },
  {
    badge: "DONGYANG + Бур",
    title: "FAW J6 + КМУ DONGYANG 1966",
    slug: "faw-j6-dongyang-1966",
    price: "3 500 ₽/час с НДС",
    count: 1,
    tag: { label: "Эксклюзив", icon: "Crown", color: "from-purple-500 to-pink-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/cb1469ab-3878-4eea-9eac-9ce6f4129301.webp",
    alt: "FAW J6 кран-манипулятор DONGYANG 1966 с буром",
    specs: [
      { label: "Грузоподъёмность шасси", value: "до 20 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Вылет стрелы", value: "до 22 м" },
      { label: "Полная масса", value: "35 100 кг" },
      { label: "Буровая установка", value: "Бур ✓" },
      { label: "Корзина монтажная", value: "Люлька ✓" },
    ],
  },
  {
    badge: "КМУ 8т",
    title: "RENAULT LANDER + КМУ",
    slug: "renault-lander-kmu",
    price: "3 200 ₽/час с НДС",
    count: 2,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/72811b07-39fb-476d-9b0a-6a3f31285de9.webp",
    alt: "Renault Lander манипулятор КМУ",
    specs: [
      { label: "Грузоподъёмность автомобиля", value: "до 15 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Максимальная рабочая высота", value: "до 20 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
  },
  {
    badge: "КМУ HIAB 8т · Стрела 22м",
    title: "Hyundai Gold + КМУ HIAB 190TM",
    slug: "hyundai-gold-kmu-8t",
    price: "3 200 ₽/час с НДС",
    count: 1,
    tag: { label: "Длинная стрела", icon: "MoveUpRight", color: "from-sky-500 to-blue-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/106c30cf-02d3-4b99-ac02-47e7404652e2.jpg",
    alt: "Hyundai Gold КМУ HIAB 190TM 8 тонн",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 10 т" },
      { label: "Грузоподъёмность КМУ", value: "до 8 т" },
      { label: "Длина стрелы (вылет)", value: "до 22 м" },
      { label: "Размер платформы", value: "6,0 × 2,45 м" },
      { label: "Тип КМУ", value: "Тросовый" },
      { label: "Колёсная формула", value: "6×4" },
    ],
  },
  {
    badge: "КМУ Kanglim 7т · Тросовый",
    title: "Hino 500 + КМУ Kanglim KS1256G-II",
    slug: "hino-500-kmu-7t",
    price: "2 700 ₽/час с НДС",
    count: 1,
    tag: { label: "Универсал", icon: "Truck", color: "from-amber-500 to-orange-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/660a8623-ee67-4819-a414-68b954548e0b.jpg",
    alt: "Hino 500 КМУ Kanglim KS1256G-II 7 тонн",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 6 т" },
      { label: "Грузоподъёмность КМУ", value: "до 7 т" },
      { label: "Длина стрелы (вылет)", value: "до 19 м" },
      { label: "Размер платформы", value: "6,85 × 2,45 м" },
      { label: "Тип КМУ", value: "Тросовый" },
      { label: "Двигатель", value: "Дизель 260 л.с." },
    ],
  },
  {
    badge: "КМУ 3т",
    title: "ISUZU 5т + КМУ",
    slug: "isuzu-5t-kmu",
    price: "2 200 ₽/час с НДС",
    count: 2,
    tag: { label: "Выгодная цена", icon: "BadgePercent", color: "from-emerald-500 to-green-600" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/4bb58aab-783b-43b6-8d89-ee519e570e09.webp",
    alt: "ISUZU 5т КМУ",
    specs: [
      { label: "Грузоподъёмность платформы", value: "до 5 т" },
      { label: "Грузоподъёмность стрелы", value: "до 3 т" },
      { label: "Ширина кузова", value: "до 2,30 м" },
      { label: "Длина кузова", value: "до 5,5 м" },
      { label: "Вылет стрелы", value: "до 8,5 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
  },
  // ── Экскаваторы-погрузчики ──
  {
    badge: "Экскаватор-погрузчик",
    title: "Экскаватор-погрузчик JCB 4CX",
    slug: "jcb-4cx",
    price: "2 700 ₽/час с НДС",
    count: 2,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/29fc9d6a-adfb-4899-9119-3136ce0cb7d4.webp",
    alt: "Экскаватор-погрузчик JCB 4CX",
    specs: [
      { label: "Макс. глубина копания", value: "5,58 м" },
      { label: "Масса", value: "8,758 т" },
      { label: "Объём заднего ковша", value: "0,3 м³" },
      { label: "Объём погрузочного ковша", value: "1,1 м³" },
      { label: "Навесное оборудование", value: "Есть" },
    ],
  },
  {
    badge: "Экскаватор-погрузчик",
    title: "Экскаватор-погрузчик JCB 3CX",
    slug: "jcb-3cx",
    price: "2 400 ₽/час с НДС",
    count: 1,
    tag: { label: "Новинка", icon: "Sparkles", color: "from-cyan-500 to-blue-500" },
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/761d840a-c678-4fee-a5eb-4531b7ca7d17.webp",
    alt: "Экскаватор-погрузчик JCB 3CX",
    specs: [
      { label: "Макс. глубина копания", value: "4,24 м" },
      { label: "Масса", value: "8,136 т" },
      { label: "Объём заднего ковша", value: "0,3 м³" },
      { label: "Объём погрузочного ковша", value: "1 м³" },
      { label: "Навесное оборудование", value: "Есть" },
    ],
  },
];

// Вспомогательная функция — склонение слова "единица" по числу
const pluralizeUnits = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "единица";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "единицы";
  return "единиц";
};

const orderItems = [
  { icon: "Weight", iconBg: "from-blue-400 to-blue-600", text: "Вес груза" },
  { icon: "Scaling", iconBg: "from-purple-400 to-violet-600", text: "Размеры груза" },
  { icon: "MapPin", iconBg: "from-green-400 to-emerald-600", text: "Место загрузки" },
  { icon: "MapPinOff", iconBg: "from-red-400 to-rose-600", text: "Место разгрузки" },
  { icon: "MessageSquare", iconBg: "from-amber-400 to-orange-500", text: "Нюансы погрузки/разгрузки" },
  { icon: "CalendarClock", iconBg: "from-cyan-400 to-blue-500", text: "Удобное время подачи" },
];

const FleetSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState("");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);

  const openModal = (truckTitle: string) => {
    setSelectedTruck(truckTitle);
    setModalOpen(true);
  };

  return (
    <section id="fleet" className="py-16 sm:py-32 px-4 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} truckName={selectedTruck} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <div className="flex justify-center mb-4">
            <SectionBadge>Наш парк</SectionBadge>
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Наша техника
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью КМУ под вашу задачу
          </p>
        </div>

        {trucks.map((truck, idx) => {
          const tag = (truck as typeof truck & { tag?: { label: string; icon: string; color: string } }).tag;
          return (
          <div key={idx} className={`relative border border-accent/20 rounded-2xl sm:rounded-3xl bg-card/50 overflow-hidden ${idx < trucks.length - 1 ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
            {/* Угловой "лейбл-флажок" — на десктопе, на мобилке вынесен под фото */}
            {tag && (
              <div className={`hidden lg:flex absolute top-0 right-0 z-20 items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${tag.color} text-white text-[10px] sm:text-sm font-black uppercase tracking-wider shadow-xl rounded-bl-xl sm:rounded-bl-2xl`}>
                <Icon name={tag.icon} size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="whitespace-nowrap">{tag.label}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent pointer-events-none" />
            <div className={`relative grid gap-0 ${truck.image ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
              {truck.image && (
                <div className="relative lg:hidden overflow-hidden bg-white/5">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: truck.image, alt: truck.alt, title: truck.title })}
                    className="block w-full group"
                    aria-label={`Открыть фото ${truck.title} на весь экран`}
                  >
                    <img
                      src={truck.image}
                      alt={truck.alt}
                      className="w-full object-contain h-64 sm:h-80 md:h-[420px] group-active:scale-[0.98] transition-transform"
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="600"
                    />
                    <div className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      <Icon name="Maximize2" size={16} className="text-white" />
                    </div>
                  </button>
                  {/* Информационный блок ПОД фото — больше не перекрывает машину */}
                  <div className="px-4 py-3 bg-gradient-to-b from-transparent to-black/40">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="inline-block px-2.5 py-1 bg-accent/90 rounded-full text-black text-[10px] font-bold tracking-widest uppercase shadow-lg">
                        {truck.badge}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/90 text-black text-[10px] font-bold tracking-widest uppercase shadow-lg">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                          <span className="relative rounded-full w-1.5 h-1.5 bg-white" />
                        </span>
                        В наличии
                      </div>
                      {tag && (
                        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${tag.color} text-white text-[10px] font-bold tracking-widest uppercase shadow-lg`}>
                          <Icon name={tag.icon} size={11} />
                          {tag.label}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-black text-lg text-white leading-tight">{truck.title}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <p className="text-accent font-bold text-sm">{truck.price}</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-accent text-[11px] font-bold">
                        <Icon name="Truck" size={11} />
                        В парке: {truck.count} {pluralizeUnits(truck.count)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 md:p-8 lg:p-14">
                <div className="hidden lg:flex items-center gap-3 mb-4 sm:mb-6 flex-wrap">
                  <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-semibold tracking-widest uppercase">
                    {truck.badge}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/40 text-accent text-xs font-bold">
                    <Icon name="Truck" size={13} />
                    В парке: {truck.count} {pluralizeUnits(truck.count)}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs font-bold">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                      <span className="relative rounded-full w-2 h-2 bg-green-400" />
                    </span>
                    В наличии
                  </div>
                </div>
                <h3 className="hidden lg:block font-display font-black text-xl sm:text-3xl lg:text-4xl mb-2">{truck.title}</h3>
                <p className="hidden lg:block text-accent font-bold text-lg sm:text-xl mb-5 sm:mb-8">{truck.price}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-8">
                  {truck.specs.map((spec, i) => (
                    <div key={i} className="bg-background/40 rounded-xl p-3 sm:p-4 border border-accent/10">
                      <p className="text-muted-foreground text-[11px] sm:text-xs mb-1 leading-tight">{spec.label}</p>
                      <p className="font-bold text-white text-sm sm:text-base">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button onClick={() => openModal(truck.title)} className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-accent/40 transition-all">
                    Заказать
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                  <a
                    href="tel:+79601883084"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 bg-green-500/15 border border-green-500/40 text-green-400 rounded-full font-semibold text-sm hover:bg-green-500/25 hover:border-green-500/60 transition-all"
                  >
                    <Icon name="Phone" size={16} />
                    Позвонить
                  </a>
                  <Link to={`/tehnika/${truck.slug}`} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 border border-accent/30 rounded-full font-semibold text-sm hover:border-accent/60 hover:bg-accent/5 transition-all">
                    Подробнее
                  </Link>
                </div>
              </div>

              {truck.image && (
                <div className="relative hidden lg:block" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={truck.image}
                    alt={truck.alt}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="900"
                  />
                </div>
              )}
            </div>
          </div>
          );
        })}

        {/* What to tell us */}
        <div className="border border-accent/10 rounded-2xl bg-accent/5 p-5 sm:p-10">
          <h3 className="font-display font-bold text-lg sm:text-2xl mb-4 sm:mb-6 text-center">Что сообщить при заказе</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 bg-background/30 rounded-xl p-3 sm:p-4 border border-accent/10 hover:border-accent/30 transition-colors">
                <div className={`w-9 h-9 bg-gradient-to-br ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon name={item.icon} size={16} className="text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-4 sm:mt-6 text-sm">
            Позвоните нам — специалист выслушает пожелания, уточнит объём работ и подберёт подходящую технику
          </p>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Закрыть"
          >
            <Icon name="X" size={20} className="text-white" />
          </button>
          <div className="absolute top-4 left-4 right-20 text-white/90 text-sm sm:text-base font-semibold truncate">
            {lightbox.title}
          </div>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs">
            Нажмите вне фото, чтобы закрыть
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetSection;