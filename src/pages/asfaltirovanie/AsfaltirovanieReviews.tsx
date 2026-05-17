import Icon from "@/components/ui/icon";

const reviews = [
  {
    name: "Сергей Михайлов",
    company: "УК «Жилкомфорт»",
    avatar: "СМ",
    text: "Заказывали асфальтирование двора 1 200 м² в центре Нижнего Новгорода. Работу выполнили за 3 дня, уложились в смету, разметку нанесли аккуратно. Жители довольны — рекомендую.",
    rating: 5,
    service: "Двор жилого дома",
    area: "1 200 м²",
    highlight: "Уложились в смету и срок",
  },
  {
    name: "Александр Петров",
    company: "ТЦ «Меридиан»",
    avatar: "АП",
    text: "Положили асфальт на парковке торгового центра — 3 500 м². Качество отличное: за зиму ни одной трещины, выдержало большие нагрузки от фур. Гарантию дали 3 года.",
    rating: 5,
    service: "Парковка ТЦ",
    area: "3 500 м²",
    highlight: "За зиму ни одной трещины",
  },
  {
    name: "Дмитрий Куликов",
    company: "Частный клиент",
    avatar: "ДК",
    text: "Сделали подъездную дорогу к коттеджу 180 м². Замерщик приехал в день обращения, цену озвучили сразу, через неделю всё уже было готово. Аккуратно сделали примыкание к воротам.",
    rating: 5,
    service: "Подъезд к коттеджу",
    area: "180 м²",
    highlight: "Сделали за неделю",
  },
  {
    name: "Игорь Васильев",
    company: "ООО «Промсклад»",
    avatar: "ИВ",
    text: "Промплощадку 8 700 м² заасфальтировали под ключ. Работали в две смены, чтобы не останавливать наш склад. Молодцы — техника серьёзная, операторы опытные.",
    rating: 5,
    service: "Промышленная площадка",
    area: "8 700 м²",
    highlight: "Работали в две смены",
  },
  {
    name: "Елена Соколова",
    company: "ТСЖ «Уют»",
    avatar: "ЕС",
    text: "Провели ямочный ремонт во дворе — 420 м² заплаток. Раньше делали другие — через год снова ямы. Здесь технология другая, фрезеруют края, теперь держится отлично.",
    rating: 5,
    service: "Ямочный ремонт",
    area: "420 м²",
    highlight: "Технология с фрезерованием",
  },
  {
    name: "Михаил Орлов",
    company: "АО «АгроПром»",
    avatar: "МО",
    text: "Заасфальтировали подъездную дорогу к нашему складу в Городце — 5 200 м². Документы все по белой, НДС, ЭДО, договор. Для юр. лиц — лучше не найти в области.",
    rating: 5,
    service: "Загородная дорога",
    area: "5 200 м²",
    highlight: "Документы для юр. лиц",
  },
];

const AsfaltirovanieReviews = () => {
  return (
    <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs sm:text-sm font-bold mb-4">
            <Icon name="Star" size={14} className="fill-amber-500 text-amber-500" />
            Отзывы клиентов
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3">
            <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Что говорят о наших работах
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Реальные отзывы заказчиков об асфальтировании в Нижнем Новгороде и области
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="relative p-5 sm:p-6 rounded-2xl bg-white/95 border border-amber-200 shadow-lg shadow-amber-200/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-300/40 transition-all flex flex-col"
            >
              <Icon
                name="Quote"
                size={32}
                className="absolute top-4 right-4 text-amber-300/40"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-amber-400/30 flex-shrink-0">
                  {r.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900 truncate">
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {r.company}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon
                    key={k}
                    name="Star"
                    size={14}
                    className="fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-4 flex-1">
                {r.text}
              </p>

              <div className="pt-3 border-t border-amber-100 flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1 text-slate-600">
                  <Icon name="Briefcase" size={12} className="text-amber-600" />
                  <span className="truncate">{r.service}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-700 whitespace-nowrap">
                  <Icon name="Ruler" size={12} />
                  {r.area}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border border-amber-300">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm sm:text-base">
            <Icon name="ThumbsUp" size={20} className="text-amber-600" />
            Хотите оказаться в этом списке? Закажите выезд замерщика — бесплатно
          </div>
          <a
            href="tel:+79601690990"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/40 hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
          >
            <Icon name="Phone" size={16} />
            +7 (960) 169-09-90
          </a>
        </div>
      </div>
    </section>
  );
};

export default AsfaltirovanieReviews;
