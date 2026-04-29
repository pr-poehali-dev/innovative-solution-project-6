export type Truck = {
  name: string;
  short: string;
  price: number;
  category: "Манипулятор" | "Экскаватор";
  capacity: string;
  boom?: string;
  highlight?: string;
  image: string;
};

export const trucks: Truck[] = [
  { name: "ISUZU 5т + КМУ", short: "ISUZU 5т", price: 2200, category: "Манипулятор", capacity: "до 5 т", boom: "8,5 м", highlight: "Выгодная цена", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/4bb58aab-783b-43b6-8d89-ee519e570e09.webp" },
  { name: "Hino 500 + КМУ Kanglim KS1256G-II", short: "Hino 500", price: 2700, category: "Манипулятор", capacity: "до 6 т", boom: "19 м", highlight: "Универсал", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/660a8623-ee67-4819-a414-68b954548e0b.webp" },
  { name: "КАМАЗ 65115 + КМУ HANGIL", short: "КАМАЗ 65115", price: 2800, category: "Манипулятор", capacity: "до 12 т", boom: "19 м", highlight: "Хит заказов", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/b646729f-a106-46bf-b7e4-abf0fe1c4983.webp" },
  { name: "FAW + КМУ DongYang", short: "FAW DongYang", price: 3000, category: "Манипулятор", capacity: "до 17 т", boom: "21 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/df8d23ad-2b19-4a5c-bfef-8403f404cab9.webp" },
  { name: "Hyundai Gold + КМУ HIAB 190TM", short: "Hyundai Gold", price: 3200, category: "Манипулятор", capacity: "до 10 т", boom: "22 м", highlight: "Длинная стрела", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/106c30cf-02d3-4b99-ac02-47e7404652e2.webp" },
  { name: "RENAULT LANDER + КМУ", short: "Renault Lander", price: 3200, category: "Манипулятор", capacity: "до 15 т", boom: "20 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/72811b07-39fb-476d-9b0a-6a3f31285de9.webp" },
  { name: "КАМАЗ 43118 + КМУ Kanglim", short: "КАМАЗ 43118", price: 3500, category: "Манипулятор", capacity: "до 10 т", boom: "23 м", highlight: "Вездеход", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.webp" },
  { name: "FAW J6 + КМУ DONGYANG 1966", short: "FAW J6 + Бур", price: 3500, category: "Манипулятор", capacity: "до 20 т", boom: "22 м", highlight: "Эксклюзив · Бур", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/cb1469ab-3878-4eea-9eac-9ce6f4129301.webp" },
  { name: "Экскаватор-погрузчик JCB 3CX", short: "JCB 3CX", price: 2400, category: "Экскаватор", capacity: "8,1 т", boom: "копание 4,24 м", highlight: "Новинка", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/761d840a-c678-4fee-a5eb-4531b7ca7d17.webp" },
  { name: "Экскаватор-погрузчик JCB 4CX", short: "JCB 4CX", price: 2700, category: "Экскаватор", capacity: "8,8 т", boom: "копание 5,58 м", image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm/29fc9d6a-adfb-4899-9119-3136ce0cb7d4.webp" },
];

export const categories = ["Все", "Манипулятор", "Экскаватор"] as const;
export type Category = (typeof categories)[number];

export const tasks: { id: string; label: string; icon: string; suggested: number[] }[] = [
  { id: "any", label: "Любая задача", icon: "Sparkles", suggested: [] },
  { id: "build", label: "Стройка / разгрузка", icon: "Hammer", suggested: [2, 3, 6] },
  { id: "long", label: "Длинные грузы", icon: "MoveHorizontal", suggested: [3, 6, 7] },
  { id: "heavy", label: "Тяжёлые до 20 т", icon: "Anchor", suggested: [3, 7] },
  { id: "dig", label: "Копать / грунт", icon: "Construction", suggested: [8, 9] },
  { id: "tower", label: "Высотные работы", icon: "Building2", suggested: [4, 5, 7] },
];

// Выезд в города области = N часов работы по тарифу выбранной техники (туда-обратно)
export const cities: { name: string; hours: number }[] = [
  { name: "Нижний Новгород", hours: 0 },
  { name: "Бор", hours: 0.5 },
  { name: "Кстово", hours: 0.5 },
  { name: "Дзержинск", hours: 1 },
  { name: "Богородск", hours: 1 },
  { name: "Балахна", hours: 1 },
  { name: "Афонино", hours: 0.5 },
  { name: "Новинки", hours: 0.5 },
  { name: "Заволжье", hours: 1.5 },
  { name: "Городец", hours: 1.5 },
  { name: "Павлово", hours: 1.5 },
  { name: "Ворсма", hours: 1.5 },
  { name: "Семёнов", hours: 1.5 },
  { name: "Володарск", hours: 1 },
  { name: "Большое Мурашкино", hours: 1.5 },
  { name: "Перевоз", hours: 2 },
  { name: "Лысково", hours: 2 },
  { name: "Чкаловск", hours: 2 },
  { name: "Арзамас", hours: 2 },
  { name: "Сергач", hours: 2.5 },
  { name: "Княгинино", hours: 2 },
  { name: "Бутурлино", hours: 2 },
  { name: "Гагино", hours: 2.5 },
  { name: "Большое Болдино", hours: 3 },
  { name: "Лукоянов", hours: 3 },
  { name: "Шатки", hours: 2.5 },
  { name: "Первомайск", hours: 3.5 },
  { name: "Дивеево", hours: 3 },
  { name: "Саров", hours: 3.5 },
  { name: "Ардатов", hours: 2.5 },
  { name: "Выкса", hours: 2.5 },
  { name: "Кулебаки", hours: 2.5 },
  { name: "Навашино", hours: 3 },
  { name: "Сосновское", hours: 2 },
  { name: "Вача", hours: 2 },
  { name: "Дальнее Константиново", hours: 1.5 },
  { name: "Воротынец", hours: 2.5 },
  { name: "Спасское", hours: 2 },
  { name: "Сокольское", hours: 2.5 },
  { name: "Ковернино", hours: 2 },
  { name: "Красные Баки", hours: 2.5 },
  { name: "Варнавино", hours: 3 },
  { name: "Ветлуга", hours: 3.5 },
  { name: "Воскресенское", hours: 2.5 },
  { name: "Тонкино", hours: 3.5 },
  { name: "Тоншаево", hours: 4 },
  { name: "Шаранга", hours: 4 },
  { name: "Шахунья", hours: 3.5 },
  { name: "Урень", hours: 3 },
  { name: "Уразовка (Краснооктябрьский)", hours: 3 },
  { name: "Пильна", hours: 3 },
  { name: "Сеченово", hours: 3 },
  { name: "Вад", hours: 1.5 },
  { name: "Другой город", hours: 0 },
];
