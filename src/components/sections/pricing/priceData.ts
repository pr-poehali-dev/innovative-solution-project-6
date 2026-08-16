export type PriceRow = {
  slug: string;
  title: string;
  capacity: string;
  boom: string;
  price: string;
  minOrder: string;
};

export const priceRows: PriceRow[] = [
  {
    slug: "isuzu-5t-kmu",
    title: "ISUZU 5 т + КМУ",
    capacity: "5 т / стрела 3 т",
    boom: "до 12 м",
    price: "2 700 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "jcb-3cx",
    title: "Экскаватор-погрузчик JCB 3CX",
    capacity: "ковш 0,3 м³",
    boom: "копание 4,24 м",
    price: "3 000 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "avtokran-galichanin-25t",
    title: "Автокран Галичанин КС-55713",
    capacity: "25 т",
    boom: "до 21,7 м",
    price: "3 100 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "hino-500-kmu-7t",
    title: "Hino 500 + КМУ Kanglim",
    capacity: "6 т / стрела 7 т",
    boom: "до 19 м",
    price: "3 300 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "jcb-4cx",
    title: "Экскаватор-погрузчик JCB 4CX",
    capacity: "ковш 0,3 м³",
    boom: "копание 5,58 м",
    price: "3 300 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "kamaz-65115-hangil",
    title: "КАМАЗ 65115 + КМУ HANGIL",
    capacity: "12 т / стрела 7 т",
    boom: "до 19 м",
    price: "3 500 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "faw-kmu-dongyoung",
    title: "FAW + КМУ DongYang",
    capacity: "17 т / стрела 8 т",
    boom: "до 21 м",
    price: "3 700 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "hyundai-gold-kmu-8t",
    title: "Hyundai Gold + КМУ HIAB 190TM",
    capacity: "10 т / стрела 8 т",
    boom: "до 22 м",
    price: "4 000 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "renault-lander-kmu",
    title: "RENAULT LANDER + КМУ",
    capacity: "15 т / стрела 8 т",
    boom: "до 20 м",
    price: "4 000 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "kamaz-43118-kanglim",
    title: "КАМАЗ 43118 вездеход + Kanglim",
    capacity: "10 т / стрела 7 т",
    boom: "до 23 м",
    price: "4 300 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "faw-j6-dongyang-1966",
    title: "FAW J6 + DONGYANG 1966 с буром",
    capacity: "17 т / стрела 8 т",
    boom: "до 22 м",
    price: "4 300 ₽/час",
    minOrder: "4 часа",
  },
  {
    slug: "dlinnomer-maz",
    title: "МАЗ длинномер с полуприцепом",
    capacity: "20 т / кузов 13,6 м",
    boom: "без КМУ",
    price: "по запросу",
    minOrder: "рейс",
  },
];

export const terms = [
  {
    icon: "FileSignature",
    title: "Договор и закрывающие документы",
    text: "Работаем с юр. лицами и ИП по договору. Даём счёт, акт, УПД, путевой лист. Подключены к ЭДО — Диадок, СБИС. Физлицам — договор-заявка и чек.",
  },
  {
    icon: "Receipt",
    title: "Оплата: наличные, карта, безнал с НДС",
    text: "Цены указаны с НДС 22% — сумма в счёте совпадает с той, что назвали по телефону. Для постоянных клиентов — оплата по факту с отсрочкой до 7 дней.",
  },
  {
    icon: "ShieldCheck",
    title: "Гарантия подачи и замены техники",
    text: "Подаём машину в согласованное время. Если техника вышла из строя на объекте — бесплатно меняем на аналогичную в течение 3–5 часов, простой не оплачивается.",
  },
  {
    icon: "BadgeCheck",
    title: "Допуски, страховка, аттестация",
    text: "Вся техника проходит ТО и имеет разрешения Ростехнадзора. Операторы аттестованы, стаж 10+ лет. Ответственность и груз застрахованы.",
  },
  {
    icon: "Clock",
    title: "Минимальный заказ и подача",
    text: "Минимальный заказ — 4 часа работы. Подача техники от 1 часа по Нижнему Новгороду. Время в пути к объекту в черте города не оплачивается.",
  },
  {
    icon: "MapPin",
    title: "Выезд по области",
    text: "Работаем по всей Нижегородской области: Дзержинск, Кстово, Бор, Арзамас, Богородск, Балахна. В радиусе 30 км наценки за километраж нет.",
  },
];
