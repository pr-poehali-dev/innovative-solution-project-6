import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const trucks = [
  {
    badge: "КМУ DongYang",
    title: "FAW + КМУ DongYang",
    slug: "faw-kmu-dongyoung",
    price: "3 000 ₽/час с НДС",
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/b646729f-a106-46bf-b7e4-abf0fe1c4983.jpg",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.jpg",
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
    badge: "КМУ 3т",
    title: "ISUZU 5т + КМУ",
    slug: "isuzu-5t-kmu",
    price: "2 200 ₽/час с НДС",
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/4bb58aab-783b-43b6-8d89-ee519e570e09.jpg",
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
];

const orderItems = [
  { icon: "Weight", iconBg: "from-blue-400 to-blue-600", text: "Вес груза" },
  { icon: "Scaling", iconBg: "from-purple-400 to-violet-600", text: "Размеры груза" },
  { icon: "MapPin", iconBg: "from-green-400 to-emerald-600", text: "Место загрузки" },
  { icon: "MapPinOff", iconBg: "from-red-400 to-rose-600", text: "Место разгрузки" },
  { icon: "MessageSquare", iconBg: "from-amber-400 to-orange-500", text: "Нюансы погрузки/разгрузки" },
  { icon: "CalendarClock", iconBg: "from-cyan-400 to-blue-500", text: "Удобное время подачи" },
];

const FleetSection = () => {
  return (
    <section id="fleet" className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-20">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш парк</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Наша техника
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью КМУ под вашу задачу
          </p>
        </div>

        {trucks.map((truck, idx) => (
          <div key={idx} className={`relative border border-accent/20 rounded-2xl sm:rounded-3xl bg-card/50 overflow-hidden ${idx < trucks.length - 1 ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
            <div className={`relative grid gap-0 ${truck.image ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
              {truck.image && (
                <div className="relative h-[60vw] min-h-56 max-h-80 lg:hidden overflow-hidden">
                  <img
                    src={truck.image}
                    alt={truck.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-block px-2.5 py-0.5 bg-accent/30 backdrop-blur-sm rounded-full text-accent text-xs font-semibold tracking-widest uppercase mb-2">
                      {truck.badge}
                    </div>
                    <h3 className="font-display font-black text-xl text-white leading-tight">{truck.title}</h3>
                    <p className="text-accent font-bold text-base mt-0.5">{truck.price}</p>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-10 lg:p-14">
                <div className="hidden lg:inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6">
                  {truck.badge}
                </div>
                <h3 className="hidden lg:block font-display font-black text-xl sm:text-3xl lg:text-4xl mb-2">{truck.title}</h3>
                <p className="hidden lg:block text-accent font-bold text-lg sm:text-xl mb-5 sm:mb-8">{truck.price}</p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-5 sm:mb-8">
                  {truck.specs.map((spec, i) => (
                    <div key={i} className="bg-background/40 rounded-xl p-3 sm:p-4 border border-accent/10">
                      <p className="text-muted-foreground text-xs mb-1">{spec.label}</p>
                      <p className="font-bold text-white text-sm sm:text-base">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="tel:+79601883084" className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-accent/40 transition-all">
                    Заказать
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </a>
                  <Link to={`/tehnika/${truck.slug}`} className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 rounded-full font-semibold text-sm hover:border-accent/60 hover:bg-accent/5 transition-all">
                    Подробнее
                  </Link>
                </div>
              </div>

              {truck.image && (
                <div className="relative h-52 sm:h-72 lg:h-auto items-center justify-center hidden lg:flex">
                  <img
                    src={truck.image}
                    alt={truck.alt}
                    className="w-full h-full object-contain p-3 sm:p-4"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* What to tell us */}
        <div className="border border-accent/10 rounded-2xl bg-accent/5 p-5 sm:p-10">
          <h3 className="font-display font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center">Что сообщить при заказе</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
    </section>
  );
};

export default FleetSection;