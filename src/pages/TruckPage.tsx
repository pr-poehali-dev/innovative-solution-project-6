import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import OrderModal from "@/components/ui/OrderModal";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import PriceCalculator from "@/components/ui/PriceCalculator";

const trucks: Record<string, {
  title: string;
  badge: string;
  price: string;
  priceNum: number;
  image: string;
  alt: string;
  description: string;
  specs: { label: string; value: string }[];
  useCases: string[];
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
}> = {
  "faw-kmu-dongyoung": {
    title: "FAW + КМУ DongYang",
    badge: "КМУ DongYang",
    price: "3 000 ₽/час с НДС",
    priceNum: 3000,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg",
    alt: "Аренда FAW с КМУ DongYang в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду манипулятор FAW с КМУ DongYang — надёжную спецтехнику для погрузки, разгрузки и монтажа в Нижнем Новгороде и области. Грузоподъёмность кузова до 17 тонн, вылет стрелы до 21 метра и монтажная люлька делают эту машину незаменимой для работ на высоте. Оптимальный выбор для строительных, промышленных и логистических задач.",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 17 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Ширина кузова", value: "до 2,45 м" },
      { label: "Длина кузова", value: "до 8 м" },
      { label: "Вылет стрелы", value: "до 21 м" },
      { label: "Монтажная корзина", value: "Люлька ✓" },
    ],
    useCases: [
      "Монтаж металлоконструкций и кровли",
      "Подъём оборудования на высоту",
      "Разгрузка крупногабаритных грузов",
      "Работы с люлькой на высоте до 21 м",
      "Строительство промышленных объектов",
    ],
    seoTitle: "Аренда FAW + КМУ DongYang в Нижнем Новгороде — от 3000 ₽/час | ООО Фаворит",
    seoDesc: "Аренда манипулятора FAW с КМУ DongYang в Нижнем Новгороде. Грузоподъёмность до 17т, вылет стрелы до 21м, люлька. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда манипулятора FAW DongYang Нижний Новгород, манипулятор с люлькой аренда НН, FAW КМУ DongYang цена, аренда крана манипулятора 17 тонн, манипулятор вылет стрелы 21 метр, аренда спецтехники Нижний Новгород, манипулятор с монтажной корзиной аренда",
  },
  "kamaz-65115-hangil": {
    title: "КАМАЗ 65115 + КМУ HANGIL",
    badge: "КМУ HANGIL",
    price: "2 800 ₽/час с НДС",
    priceNum: 2800,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/b646729f-a106-46bf-b7e4-abf0fe1c4983.jpg",
    alt: "Аренда КАМАЗ 65115 с КМУ HANGIL в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду манипулятор КАМАЗ 65115 с КМУ HANGIL — проверенную спецтехнику для погрузки, разгрузки и транспортировки грузов в Нижнем Новгороде и области. Грузоподъёмность платформы до 12 тонн и вылет стрелы до 19 метров обеспечивают высокую эффективность на строительных и промышленных объектах.",
    specs: [
      { label: "Грузоподъёмность платформы", value: "до 12 т" },
      { label: "Грузоподъёмность стрелы", value: "до 7 т" },
      { label: "Ширина кузова", value: "до 2,40 м" },
      { label: "Длина кузова", value: "до 6,5 м" },
      { label: "Вылет стрелы", value: "до 19 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
    useCases: [
      "Доставка и разгрузка строительных материалов",
      "Монтаж конструкций до 7 тонн",
      "Перевозка тяжёлых грузов до 12 тонн",
      "Работы на строительных площадках",
      "Погрузо-разгрузочные работы на складах",
    ],
    seoTitle: "Аренда КАМАЗ 65115 + КМУ HANGIL в Нижнем Новгороде — от 2800 ₽/час | ООО Фаворит",
    seoDesc: "Аренда манипулятора КАМАЗ 65115 с КМУ HANGIL в Нижнем Новгороде. Грузоподъёмность до 12т, вылет стрелы до 19м. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда КАМАЗ 65115 манипулятор Нижний Новгород, КАМАЗ с КМУ HANGIL аренда НН, манипулятор 12 тонн аренда, аренда бортового манипулятора Нижний Новгород, КАМАЗ манипулятор цена час, аренда спецтехники НН недорого",
  },
  "kamaz-43118-kanglim": {
    title: "КАМАЗ 43118 + КМУ Kanglim",
    badge: "КМУ Kanglim · Вездеход",
    price: "3 500 ₽/час с НДС",
    priceNum: 3500,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.jpg",
    alt: "Аренда КАМАЗ 43118 вездеход с КМУ Kanglim в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду полноприводный манипулятор-вездеход КАМАЗ 43118 с КМУ Kanglim в Нижнем Новгороде и области. Максимальный вылет стрелы 23 метра — самый большой в нашем парке. Идеальный выбор для работ на бездорожье, труднодоступных объектах и при монтаже на большой высоте.",
    specs: [
      { label: "Грузоподъёмность кузова", value: "до 10 т" },
      { label: "Грузоподъёмность стрелы", value: "до 7 т" },
      { label: "Ширина кузова", value: "до 2,45 м" },
      { label: "Длина кузова", value: "до 6,20 м" },
      { label: "Вылет стрелы", value: "до 23 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
    useCases: [
      "Работа на бездорожье и труднодоступных объектах",
      "Монтаж на максимальной высоте (до 23 м)",
      "Строительство в удалённых районах",
      "Работы в условиях бездорожья",
      "Монтаж опор ЛЭП и связи",
    ],
    seoTitle: "Аренда КАМАЗ 43118 вездеход + КМУ Kanglim в Нижнем Новгороде — от 3500 ₽/час | ООО Фаворит",
    seoDesc: "Аренда манипулятора-вездехода КАМАЗ 43118 с КМУ Kanglim в Нижнем Новгороде. Вылет стрелы до 23м, полный привод. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда КАМАЗ 43118 вездеход Нижний Новгород, манипулятор полный привод аренда НН, КМУ Kanglim аренда, манипулятор вылет стрелы 23 метра, аренда вездехода с краном НН, манипулятор для бездорожья аренда Нижегородская область",
  },
  "faw-j6-dongyang-1966": {
    title: "FAW J6 + КМУ DONGYANG 1966",
    badge: "DONGYANG + Бур",
    price: "3 500 ₽/час с НДС",
    priceNum: 3500,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/cb1469ab-3878-4eea-9eac-9ce6f4129301.jpeg",
    alt: "Аренда FAW J6 с КМУ DONGYANG 1966 и буром в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду кран-манипулятор DONGYANG 1966 с буром на шасси FAW J6 в Нижнем Новгороде и области. Грузоподъёмность шасси до 20 тонн, стрелы до 8 тонн, вылет до 22 метров. Оснащён буровой установкой и монтажной люлькой — универсальная машина для строительных, монтажных и буровых работ.",
    specs: [
      { label: "Грузоподъёмность шасси", value: "до 20 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Вылет стрелы", value: "до 22 м" },
      { label: "Полная масса", value: "35 100 кг" },
      { label: "Буровая установка", value: "Бур ✓" },
      { label: "Корзина монтажная", value: "Люлька ✓" },
    ],
    useCases: [
      "Бурение свай и столбов",
      "Монтаж опор ЛЭП и заборов",
      "Подъём и монтаж конструкций до 8 т",
      "Работы с люлькой на высоте до 22 м",
      "Разгрузка и перемещение тяжёлых грузов до 20 т",
    ],
    seoTitle: "Аренда FAW J6 + КМУ DONGYANG 1966 с буром в Нижнем Новгороде — от 3500 ₽/час | ООО Фаворит",
    seoDesc: "Аренда кран-манипулятора DONGYANG 1966 с буром на FAW J6 в Нижнем Новгороде. Грузоподъёмность до 20т, вылет стрелы до 22м, люлька, бур. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда манипулятора с буром Нижний Новгород, FAW J6 DONGYANG 1966 аренда, кран манипулятор с буровой установкой НН, аренда манипулятора 20 тонн, бурение свай аренда техники Нижний Новгород, манипулятор с люлькой и буром аренда",
  },
  "renault-lander-kmu": {
    title: "RENAULT LANDER + КМУ",
    badge: "КМУ 8т",
    price: "3 200 ₽/час с НДС",
    priceNum: 3200,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/72811b07-39fb-476d-9b0a-6a3f31285de9.jpg",
    alt: "Аренда RENAULT LANDER с КМУ в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду манипулятор RENAULT LANDER — надёжную и универсальную спецтехнику для погрузки, разгрузки и транспортировки грузов в Нижнем Новгороде и области. Высокая грузоподъёмность до 15 тонн, мощная КМУ на 8 тонн и максимальная рабочая высота 20 метров делают этот манипулятор идеальным выбором для строительных, логистических и коммунальных задач.",
    specs: [
      { label: "Грузоподъёмность автомобиля", value: "до 15 т" },
      { label: "Грузоподъёмность стрелы", value: "до 8 т" },
      { label: "Максимальная рабочая высота", value: "до 20 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
    useCases: [
      "Подъём и монтаж тяжёлых конструкций",
      "Разгрузка крупногабаритных грузов до 15 т",
      "Строительные и монтажные работы на высоте",
      "Перевозка и установка оборудования",
      "Работы на промышленных объектах",
    ],
    seoTitle: "Аренда RENAULT LANDER + КМУ в Нижнем Новгороде — от 3200 ₽/час | ООО Фаворит",
    seoDesc: "Аренда манипулятора RENAULT LANDER с КМУ в Нижнем Новгороде. Грузоподъёмность до 15т, высота подъёма до 20м. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда RENAULT LANDER манипулятор Нижний Новгород, Рено Лендер с КМУ аренда НН, манипулятор 15 тонн аренда Нижний Новгород, аренда манипулятора высота 20 метров, Renault с краном аренда, аренда спецтехники манипулятор НН",
  },
  "jcb-4cx": {
    title: "Экскаватор-погрузчик JCB 4CX",
    badge: "Экскаватор-погрузчик",
    price: "2 700 ₽/час с НДС",
    priceNum: 2700,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/29fc9d6a-adfb-4899-9119-3136ce0cb7d4.jpg",
    alt: "Аренда экскаватора-погрузчика JCB 4CX в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду экскаватор-погрузчик JCB 4CX в Нижнем Новгороде и области. Универсальная машина применяется в коммунальной и строительной сфере: погрузка и выгрузка материалов (гравий, песок, щебень, строительный мусор), перемещение техники и оборудования по площадке, расчистка и планировка территории, копка траншей и котлованов, разработка и трамбовка грунтов.\n\nМашина эффективна в любых погодных условиях. Все наши JCB 4CX оснащены навесным оборудованием: узкий ковш 40 см, стандартный ковш 60 см, широкий ковш 80 см, гидромолот (для разрушения мёрзлого грунта, бетона, асфальта и скальных пород).\n\nВся техника является собственностью ООО «Фаворит», находится в отличном техническом состоянии и обслуживается опытными квалифицированными операторами.",
    specs: [
      { label: "Макс. глубина копания", value: "5,58 м" },
      { label: "Масса", value: "8,758 т" },
      { label: "Объём заднего ковша", value: "0,3 м³" },
      { label: "Объём погрузочного ковша", value: "1,1 м³" },
      { label: "Навесное оборудование", value: "Есть" },
    ],
    useCases: [
      "Рытьё траншей и котлованов",
      "Погрузка и перемещение сыпучих материалов",
      "Земляные работы на стройплощадках",
      "Коммунальные и дорожные работы",
      "Работы в стеснённых условиях",
    ],
    seoTitle: "Аренда экскаватора-погрузчика JCB 4CX в Нижнем Новгороде — от 2400 ₽/час | ООО Фаворит",
    seoDesc: "Аренда JCB 4CX в Нижнем Новгороде. Глубина копания 5,58 м, ковш 1,1 м³, навесное оборудование. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда JCB 4CX Нижний Новгород, экскаватор погрузчик ДжСБ 4СХ аренда НН, аренда экскаватора погрузчика Нижний Новгород, JCB с гидромолотом аренда, копка траншей аренда техники НН, аренда экскаватора с гидромолотом Нижегородская область",
  },
  "jcb-3cx": {
    title: "Экскаватор-погрузчик JCB 3CX",
    badge: "Экскаватор-погрузчик",
    price: "2 400 ₽/час с НДС",
    priceNum: 2400,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/761d840a-c678-4fee-a5eb-4531b7ca7d17.png",
    alt: "Аренда экскаватора-погрузчика JCB 3CX в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду экскаватор-погрузчик JCB 3CX в Нижнем Новгороде и области. Компактная и манёвренная машина для коммунальных и строительных работ: погрузка и выгрузка материалов, расчистка территории, копка траншей и котлованов глубиной до 4,24 м, разработка и трамбовка грунтов.\n\nВсе наши JCB 3CX оснащены навесным оборудованием: узкий ковш 40 см, стандартный ковш 60 см, широкий ковш 80 см, гидромолот для разрушения мёрзлого грунта, бетона и асфальта.\n\nВся техника является собственностью ООО «Фаворит», находится в отличном техническом состоянии и обслуживается опытными квалифицированными операторами.",
    specs: [
      { label: "Макс. глубина копания", value: "4,24 м" },
      { label: "Масса", value: "8,136 т" },
      { label: "Объём заднего ковша", value: "0,3 м³" },
      { label: "Объём погрузочного ковша", value: "1 м³" },
      { label: "Навесное оборудование", value: "Есть" },
    ],
    useCases: [
      "Рытьё траншей и котлованов до 4,24 м",
      "Погрузка и перемещение сыпучих материалов",
      "Земляные работы на стройплощадках",
      "Коммунальные и дорожные работы",
      "Работы в стеснённых условиях",
    ],
    seoTitle: "Аренда экскаватора-погрузчика JCB 3CX в Нижнем Новгороде — от 2400 ₽/час | ООО Фаворит",
    seoDesc: "Аренда JCB 3CX в Нижнем Новгороде. Глубина копания 4,24 м, ковш 1 м³, навесное оборудование. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда JCB 3CX Нижний Новгород, экскаватор погрузчик ДжСБ 3СХ аренда НН, аренда компактного экскаватора Нижний Новгород, JCB 3CX с гидромолотом аренда, рытьё котлована аренда техники НН, аренда экскаватора погрузчика недорого Нижний Новгород",
  },
  "isuzu-5t-kmu": {
    title: "ISUZU 5т + КМУ",
    badge: "КМУ 3т",
    price: "2 200 ₽/час с НДС",
    priceNum: 2200,
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/4bb58aab-783b-43b6-8d89-ee519e570e09.jpg",
    alt: "Аренда ISUZU 5т с КМУ в Нижнем Новгороде",
    description: "Компания «Фаворит» предлагает в аренду компактный манипулятор ISUZU 5т с КМУ в Нижнем Новгороде и области. Манёвренная машина грузоподъёмностью до 5 тонн идеально подходит для работы в стеснённых условиях — во дворах, на узких улицах и небольших объектах. Самый доступный вариант в нашем парке для небольших задач.",
    specs: [
      { label: "Грузоподъёмность платформы", value: "до 5 т" },
      { label: "Грузоподъёмность стрелы", value: "до 3 т" },
      { label: "Ширина кузова", value: "до 2,30 м" },
      { label: "Длина кузова", value: "до 5,5 м" },
      { label: "Вылет стрелы", value: "до 8,5 м" },
      { label: "Тип кузова", value: "Бортовой" },
    ],
    useCases: [
      "Работа во дворах и на узких улицах",
      "Доставка мебели и оборудования",
      "Небольшие монтажные работы",
      "Разгрузка в стеснённых условиях",
      "Перевозка грузов до 5 тонн",
    ],
    seoTitle: "Аренда ISUZU 5т + КМУ в Нижнем Новгороде — от 2200 ₽/час | ООО Фаворит",
    seoDesc: "Аренда компактного манипулятора ISUZU 5т в Нижнем Новгороде. Грузоподъёмность до 5т, вылет стрелы до 8,5м. Звоните: +7 960 188-30-84.",
    seoKeywords: "аренда манипулятора ISUZU 5 тонн Нижний Новгород, компактный манипулятор аренда НН, ISUZU с КМУ аренда, маленький манипулятор аренда Нижний Новгород, манипулятор для двора аренда, аренда манипулятора недорого НН",
  },
};

export default function TruckPage() {
  const { slug } = useParams<{ slug: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const [calcSummary, setCalcSummary] = useState("");
  const truck = slug ? trucks[slug] : null;

  if (!truck) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-2xl font-bold mb-4">Техника не найдена</p>
        <Link to="/" className="text-accent hover:underline">← На главную</Link>
      </div>
    );
  }

  return (
    <>
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} truckName={truck.title} calcSummary={calcSummary} />
      <title>{truck.seoTitle}</title>
      <meta name="description" content={truck.seoDesc} />
      <meta name="keywords" content={truck.seoKeywords} />
      <meta property="og:title" content={truck.seoTitle} />
      <meta property="og:description" content={truck.seoDesc} />
      <meta property="og:image" content={truck.image} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": truck.title,
        "description": truck.seoDesc,
        "image": truck.image,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "RUB",
          "price": truck.priceNum,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": truck.priceNum,
            "priceCurrency": "RUB",
            "unitText": "час"
          },
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "LocalBusiness",
            "name": "ООО Фаворит",
            "telephone": "+79601883084",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Нижний Новгород",
              "addressRegion": "Нижегородская область",
              "addressCountry": "RU"
            }
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "12",
          "bestRating": "5",
          "worstRating": "1"
        }
      })}</script>

      {/* Хедер */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <BrandLogo size="sm" />
          <PhoneButton size="sm" className="rounded-xl" />
        </div>
      </header>

      <main className="pt-20 pb-16 min-h-screen">
        {/* Хлебные крошки */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-sm text-muted-foreground flex gap-1 sm:gap-2 items-center flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Главная</Link>
          <span>/</span>
          <Link to="/#fleet" className="hover:text-white transition-colors">Наша техника</Link>
          <span>/</span>
          <span className="text-white">{truck.title}</span>
        </div>

        {/* Основной блок */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 items-start">
            {/* Фото */}
            <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square bg-card/50 border border-accent/10">
              <img
                src={truck.image}
                alt={truck.alt}
                className="w-full h-full object-contain"
                width="1200"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute top-4 left-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
                {truck.badge}
              </div>
            </div>

            {/* Инфо */}
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
                <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                  {truck.title}
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-black text-accent mb-4 sm:mb-6">{truck.price}</p>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex w-full sm:w-auto items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-accent/40 transition-all text-base sm:text-lg mb-6 sm:mb-8"
              >
                <Icon name="Phone" size={20} />
                Заказать — +7 960 188-30-84
              </button>

              {/* Характеристики */}
              <div className="border border-accent/10 rounded-2xl overflow-hidden bg-card/30">
                <div className="px-5 py-3 border-b border-accent/10 bg-accent/5">
                  <span className="text-sm font-semibold text-accent uppercase tracking-widest">Характеристики</span>
                </div>
                <div className="divide-y divide-accent/10">
                  {truck.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center px-5 py-3 text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <PriceCalculator pricePerHour={truck.priceNum} onOrder={(result) => {
            setCalcSummary(`${result.hours} ч × ${result.shifts} дн. × ${result.pricePerHour.toLocaleString("ru-RU")} ₽/ч = ${result.total.toLocaleString("ru-RU")} ₽`);
            setModalOpen(true);
          }} />
        </section>

        {/* Описание */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="border border-accent/10 rounded-2xl bg-card/30 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Info" size={18} className="text-accent" />
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">О технике</span>
            </div>
            <div className="text-foreground/80 leading-relaxed text-base sm:text-lg space-y-4 whitespace-pre-line">{truck.description}</div>
          </div>
        </section>

        {/* Применение */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6">
            Где применяется
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {truck.useCases.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-accent/10 rounded-xl bg-card/30">
                <Icon name="CheckCircle" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Другая техника */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl sm:text-3xl font-black tracking-tighter mb-6">Другая техника</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(trucks)
              .filter(([s]) => s !== slug)
              .map(([s, t]) => (
                <Link
                  key={s}
                  to={`/tehnika/${s}`}
                  className="block p-4 border border-accent/10 rounded-xl bg-card/30 hover:border-accent/30 hover:bg-card/60 transition-all group"
                >
                  <img src={t.image} alt={t.alt} className="w-full aspect-video object-cover rounded-lg mb-3" />
                  <p className="font-semibold text-sm group-hover:text-accent transition-colors">{t.title}</p>
                  <p className="text-accent text-sm font-bold mt-1">{t.price}</p>
                </Link>
              ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4">Нужен {truck.title}?</h2>
          <p className="text-muted-foreground mb-6">Позвоните прямо сейчас — подача от 1 часа, работаем без выходных.</p>
          <a
            href="tel:+79601883084"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-black font-black px-10 py-5 rounded-2xl hover:shadow-2xl hover:shadow-accent/40 transition-all text-2xl"
          >
            <span className="text-2xl">📞</span>
            <span className="text-red-600">+7 960 188-30-84</span>
          </a>
        </section>
      </main>
    </>
  );
}