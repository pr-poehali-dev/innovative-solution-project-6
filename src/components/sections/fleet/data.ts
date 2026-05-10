export type TruckTag = { label: string; icon: string; color: string };

export type TruckSpec = { label: string; value: string };

export type Truck = {
  badge: string;
  title: string;
  slug: string;
  price: string;
  count: number;
  tag?: TruckTag;
  image: string;
  alt: string;
  specs: TruckSpec[];
  images?: string[];
};

export const trucks: Truck[] = [
  // ── Манипуляторы ──
  {
    badge: "КМУ DongYang",
    title: "FAW + КМУ DongYang",
    slug: "faw-kmu-dongyoung",
    price: "3 000 ₽/час с НДС",
    count: 2,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/df8d23ad-2b19-4a5c-bfef-8403f404cab9.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/b646729f-a106-46bf-b7e4-abf0fe1c4983.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/cb1469ab-3878-4eea-9eac-9ce6f4129301.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/72811b07-39fb-476d-9b0a-6a3f31285de9.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/106c30cf-02d3-4b99-ac02-47e7404652e2.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/660a8623-ee67-4819-a414-68b954548e0b.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/4bb58aab-783b-43b6-8d89-ee519e570e09.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/29fc9d6a-adfb-4899-9119-3136ce0cb7d4.webp",
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
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/761d840a-c678-4fee-a5eb-4531b7ca7d17.webp",
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
export const pluralizeUnits = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "единица";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "единицы";
  return "единиц";
};

export const orderItems = [
  { icon: "Weight", iconBg: "from-blue-400 to-blue-600", text: "Вес груза" },
  { icon: "Scaling", iconBg: "from-purple-400 to-violet-600", text: "Размеры груза" },
  { icon: "MapPin", iconBg: "from-green-400 to-emerald-600", text: "Место загрузки" },
  { icon: "MapPinOff", iconBg: "from-red-400 to-rose-600", text: "Место разгрузки" },
  { icon: "MessageSquare", iconBg: "from-amber-400 to-orange-500", text: "Нюансы погрузки/разгрузки" },
  { icon: "CalendarClock", iconBg: "from-cyan-400 to-blue-500", text: "Удобное время подачи" },
];
