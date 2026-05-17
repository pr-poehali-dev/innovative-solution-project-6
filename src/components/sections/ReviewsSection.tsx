import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";

const reviews = [
  {
    name: "Андрей Соколов",
    company: "ООО СтройМонтаж",
    text: "Заказывали манипулятор для монтажа металлоконструкций. Техника пришла вовремя, оператор профессиональный — сделали всё быстро и аккуратно. Работаем с Фаворитом уже второй год.",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "АС",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/19ab5009-37ca-42d0-b9f3-c1f6b74e290c.webp",
    highlight: "Техника пришла вовремя",
  },
  {
    name: "Дмитрий Карпов",
    company: "ИП Карпов",
    text: "Перевозили оборудование на склад. Нужен был манипулятор с длинной стрелой — подобрали нужную машину за 20 минут. Цена честная, документы предоставили сразу.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "ДК",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/e3e14a4e-5bfe-45fd-8cfc-6d1589d3262e.webp",
    highlight: "Подобрали машину за 20 минут",
  },
  {
    name: "Сергей Михайлов",
    company: "Частный клиент",
    text: "Помогли разгрузить контейнер на даче — место неудобное, но оператор справился без проблем. Очень доволен, рекомендую!",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "СМ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/68667517-3b40-4b10-8674-0b0eb82a9c5c.webp",
    highlight: "Справились в неудобном месте",
  },
  {
    name: "Николай Фёдоров",
    company: "ЗАО ПромСтрой",
    text: "Сотрудничаем уже больше трёх лет. Всегда надёжно, техника в хорошем состоянии, операторы опытные. Особенно ценим быструю подачу — всегда выручают в сжатые сроки.",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "НФ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/e49db8a8-9035-4ef9-9c76-c2db01b8dd7e.webp",
    highlight: "Сотрудничаем больше 3 лет",
  },
  {
    name: "Алексей Громов",
    company: "ООО МегаСтрой НН",
    text: "Поднимали и устанавливали сборные конструкции на высоте. Оператор чётко отработал, никаких нареканий. Заключили постоянный договор.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "АГ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/f0982a1e-44fd-4ba3-b340-393993a622ca.webp",
    highlight: "Заключили постоянный договор",
  },
  {
    name: "Виктор Зайцев",
    company: "ТД Лесторг",
    text: "Перегружали пиломатериалы. Приехали в срок, сделали быстро, не повредили груз. Цена соответствует качеству. Буду обращаться ещё.",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "ВЗ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ee3f5ad8-86c4-404c-b18b-232de7c965e8.webp",
    highlight: "Груз не повреждён",
  },
  {
    name: "Павел Орлов",
    company: "ООО ТрансЛогистик",
    text: "Обращаемся регулярно — перевозим крупногабаритное оборудование. Всегда чёткая координация, водители опытные. Никаких задержек и накладок за всё время сотрудничества.",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "ПО",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/4711159a-7e16-4915-ae94-0f3c69b2fb90.webp",
    highlight: "Никаких задержек",
  },
  {
    name: "Игорь Васильев",
    company: "ООО СкладСервис",
    text: "Разгружали крупную партию металлоконструкций на складе. Работали быстро и аккуратно, всё разложили точно по местам. Оператор — настоящий профессионал. Рекомендую без сомнений.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "ИВ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/33168f2b-e3a9-4ac5-913d-a52d840fc0a1.webp",
    highlight: "Всё разложили точно по местам",
  },
  {
    name: "Елена Смирнова",
    company: "ООО АрхСтрой НН",
    text: "Искала надёжного подрядчика для стройки — коллеги посоветовали Фаворит. Не пожалела: техника чистая, оператор вежливый, документы оформили без вопросов. Теперь только к ним.",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "ЕС",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/f64d1322-b01f-476d-870f-539fd9cb034e.webp",
    highlight: "Теперь только к ним",
  },
  {
    name: "Максим Куликов",
    company: "ИП Куликов",
    text: "Заказывал манипулятор для переезда производственного цеха. Всё сделали за один день — думал, уйдёт минимум два. Цена оказалась ниже, чем у конкурентов. Отличная работа!",
    rating: 5,
    service: "FAW + КМУ DongYang",
    avatar: "МК",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/9b5b1160-2886-4dfc-b7f6-875c0835e442.webp",
    highlight: "Сделали за один день",
  },
  {
    name: "Роман Тихонов",
    company: "СМУ-7 Нижний Новгород",
    text: "Работаем с Фаворитом на нескольких объектах одновременно. Всегда выручают с техникой в последний момент. Диспетчеры на связи круглосуточно — это очень важно при нашем темпе работы.",
    rating: 5,
    service: "КАМАЗ 43118 + КМУ Kanglim",
    avatar: "РТ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/05076928-b099-40b3-9e2c-9ab67b8f0a31.webp",
    highlight: "Выручают в последний момент",
  },
  {
    name: "Олег Беляев",
    company: "ЗАО НижегородМеталл",
    text: "Сотрудничаем уже пять лет. За это время ни разу не подвели — ни по срокам, ни по качеству. Техника всегда исправна, операторы знают своё дело. Это редкость на рынке.",
    rating: 5,
    service: "КАМАЗ 65115 + КМУ HANGIL",
    avatar: "ОБ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/a977bc9c-20e3-4dbd-a71f-a6d563803d74.webp",
    highlight: "Пять лет без единого срыва",
  },
  {
    name: "Александр Петров",
    company: "ТЦ «Меридиан»",
    text: "Заказывали асфальтирование парковки 3 500 м² у торгового центра. Положили за 4 дня, разметку нанесли аккуратно. За зиму ни одной трещины — выдержало нагрузки от фур. Гарантия 3 года.",
    rating: 5,
    service: "Асфальтирование парковки",
    avatar: "АП",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/19ab5009-37ca-42d0-b9f3-c1f6b74e290c.webp",
    highlight: "За зиму ни одной трещины",
  },
  {
    name: "Сергей Михайлов",
    company: "УК «Жилкомфорт»",
    text: "Делали асфальтирование двора 1 200 м² в центре Нижнего Новгорода. Уложились в смету и срок, разметка ровная, бордюры на месте. Жители благодарят. Будем работать ещё.",
    rating: 5,
    service: "Асфальтирование двора",
    avatar: "СМ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/68667517-3b40-4b10-8674-0b0eb82a9c5c.webp",
    highlight: "Уложились в смету и срок",
  },
  {
    name: "Игорь Васильев",
    company: "ООО «Промсклад»",
    text: "Заасфальтировали промплощадку 8 700 м² под ключ. Работали в две смены, чтобы не останавливать наш склад. Документы по белой, НДС, ЭДО. Качество отличное, рекомендую для крупных объектов.",
    rating: 5,
    service: "Промышленная площадка",
    avatar: "ИВ",
    photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/33168f2b-e3a9-4ac5-913d-a52d840fc0a1.webp",
    highlight: "Работали в две смены",
  },
];

type FilterId = "all" | "manipulator" | "asphalt";

const getCategory = (r: (typeof reviews)[number]): "manipulator" | "asphalt" => {
  const txt = `${r.service} ${r.text} ${r.highlight}`.toLowerCase();
  return txt.includes("асфальт") || txt.includes("парковк") || txt.includes("двор")
    ? "asphalt"
    : "manipulator";
};

const filters: { id: FilterId; label: string; icon: string }[] = [
  { id: "all", label: "Все", icon: "LayoutGrid" },
  { id: "manipulator", label: "Манипулятор", icon: "Truck" },
  { id: "asphalt", label: "Асфальтирование", icon: "Sparkles" },
];

const ReviewsSection = () => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<FilterId>("all");
  const [swipeDelta, setSwipeDelta] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => getCategory(r) === filter);

  const step = 3;
  const pages = Math.max(1, Math.ceil(filtered.length / step));
  const prev = () => setActive((p) => (p - 1 + pages) % pages);
  const next = () => setActive((p) => (p + 1) % pages);

  const visible = filtered.slice(active * step, active * step + step);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isSwiping.current = false;
    setSwipeDelta(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (!isSwiping.current) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        isSwiping.current = true;
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        startX.current = null;
        return;
      }
    }
    if (isSwiping.current) {
      setSwipeDelta(dx);
    }
  };

  const onTouchEnd = () => {
    if (isSwiping.current) {
      const threshold = 60;
      if (swipeDelta < -threshold) next();
      else if (swipeDelta > threshold) prev();
    }
    setSwipeDelta(0);
    startX.current = null;
    startY.current = null;
    isSwiping.current = false;
  };

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Шапка */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <div className="flex sm:justify-start justify-center mb-4">
              <SectionBadge>Отзывы</SectionBadge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Что говорят клиенты
              </span>
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">★</span>
                ))}
              </div>
              <span className="text-white font-bold text-lg">5.0</span>
              <span className="text-muted-foreground text-sm">на основе {reviews.length} отзывов</span>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-xl">
              Более 5 000 выполненных заказов — работаем с частными лицами, ИП и крупными предприятиями
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {filters.map((f) => {
                const isActive = filter === f.id;
                const count =
                  f.id === "all"
                    ? reviews.length
                    : reviews.filter((r) => getCategory(r) === f.id).length;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFilter(f.id);
                      setActive(0);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105"
                        : "bg-white/5 text-white/80 border border-accent/20 hover:bg-white/10 hover:border-accent/40"
                    }`}
                  >
                    <Icon name={f.icon} size={14} />
                    <span>{f.label}</span>
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/25" : "bg-accent/20 text-accent"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Счётчик + кнопки */}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-xs sm:text-sm tabular-nums">
              <span className="text-white font-bold">{active + 1}</span> / {pages}
            </span>
            <button
              onClick={prev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
            >
              <Icon name="ChevronLeft" size={16} className="sm:!w-[18px] sm:!h-[18px]" />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-accent/20 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center text-white"
            >
              <Icon name="ChevronRight" size={16} className="sm:!w-[18px] sm:!h-[18px]" />
            </button>
          </div>
        </div>

        {/* Подсказка про свайп — только мобильные */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-3 text-muted-foreground text-xs">
          <Icon name="ChevronLeft" size={12} />
          <span>Листайте отзывы пальцем</span>
          <Icon name="ChevronRight" size={12} />
        </div>

        {/* Карточки */}
        <div
          className="grid md:grid-cols-3 gap-4 sm:gap-6 transition-transform md:transition-none"
          style={{
            transform: swipeDelta !== 0 ? `translateX(${swipeDelta * 0.4}px)` : undefined,
            touchAction: "pan-y",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {visible.map((review, i) => {
            const palette = [
              {
                accent: "from-cyan-400 to-teal-500",
                accentText: "text-cyan-300",
                accentBg: "bg-cyan-500/10",
                accentBorder: "border-cyan-500/40",
                cardBorder: "border-cyan-500/30",
                glow: "rgba(34,211,238,0.15)",
              },
              {
                accent: "from-amber-400 to-orange-500",
                accentText: "text-amber-300",
                accentBg: "bg-amber-500/10",
                accentBorder: "border-amber-500/40",
                cardBorder: "border-amber-500/30",
                glow: "rgba(251,191,36,0.15)",
              },
              {
                accent: "from-emerald-400 to-green-500",
                accentText: "text-emerald-300",
                accentBg: "bg-emerald-500/10",
                accentBorder: "border-emerald-500/40",
                cardBorder: "border-emerald-500/30",
                glow: "rgba(16,185,129,0.15)",
              },
            ][i % 3];

            return (
              <article
                key={`${active}-${i}`}
                className={`relative overflow-hidden flex flex-col justify-between p-5 sm:p-7 rounded-2xl border ${palette.cardBorder} bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:scale-[1.01]`}
              >
                {/* Декоративный градиент в углу */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ background: palette.glow }}
                />

                {/* Огромная фоновая кавычка */}
                <div
                  className="absolute -bottom-8 right-2 text-[180px] font-serif leading-none text-white/[0.04] pointer-events-none select-none"
                >
                  "
                </div>

                <div className="relative">
                  {/* Шапка: иконка + бейдж highlight */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${palette.accentBg} border ${palette.accentBorder} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon name="Quote" size={20} className={palette.accentText} />
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${palette.accentBg} border ${palette.accentBorder} ${palette.accentText} text-[10px] font-black tracking-widest text-right`}
                    >
                      <Icon name="CircleCheck" size={11} />
                      <span className="line-clamp-1">{review.highlight}</span>
                    </div>
                  </div>

                  {/* Звёзды */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span
                        key={j}
                        className="text-yellow-400 text-base drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
                    {review.text}
                  </p>

                  {/* Разделитель */}
                  <div
                    className={`h-px mb-4 bg-gradient-to-r ${palette.accent} opacity-30`}
                  />

                  {/* Автор */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full border-2 ${palette.accentBorder} overflow-hidden flex-shrink-0 ${palette.accentBg}`}
                    >
                      {review.photo ? (
                        <img
                          src={review.photo}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width="48"
                          height="48"
                        />
                      ) : (
                        <span
                          className={`w-full h-full flex items-center justify-center ${palette.accentText} text-xs font-bold`}
                        >
                          {review.avatar}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm leading-tight">{review.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">
                        {review.company}
                      </p>
                    </div>
                  </div>

                  {/* Техника */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${palette.accentBg} border ${palette.accentBorder}`}
                  >
                    <Icon name="Truck" size={12} className={palette.accentText} />
                    <span className={`${palette.accentText} text-xs font-semibold`}>
                      {review.service}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Точки навигации */}
        <div className="flex justify-center gap-1 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Страница отзывов ${i + 1} из ${pages}`}
              aria-current={i === active ? "true" : undefined}
              className="p-3 group"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-accent" : "w-2 bg-accent/20 group-hover:bg-accent/40"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;