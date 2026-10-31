import { SHOP_PUBLIC } from "@/data/shopVisibility";
export const SUBMIT_URL = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

export const WEBP_BASE = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm";
export const BUCKET_BASE = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/wm";

// fullSrc — прямой URL к оригинальному файлу (используется когда WebP-конвертация ещё не готова)
export const slides: { id: string; alt: string; fullSrc?: string; mobileSrc?: string; position?: string }[] = [
  {
    id: "df8d23ad-2b19-4a5c-bfef-8403f404cab9",
    alt: "FAW КМУ DongYang",
    fullSrc: "/img/hero-1.webp",
    mobileSrc: "/img/hero-1-m.webp",
  },
  {
    id: "faw-soosan",
    alt: "FAW J6P + КМУ SOOSAN SCS746L",
    fullSrc: "/img/hero/faw-soosan-clean.webp",
  },
  { id: "b646729f-a106-46bf-b7e4-abf0fe1c4983", alt: "КАМАЗ 65115 КМУ HANGIL", fullSrc: "/img/hero/b646729f-a106-46bf-b7e4-abf0fe1c4983.webp" },
  { id: "861dfbdb-0341-4b64-ac9b-f77e5a4fa99d", alt: "КАМАЗ 43118 вездеход КМУ Kanglim", fullSrc: "/img/hero/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.webp" },
  {
    id: "106c30cf-02d3-4b99-ac02-47e7404652e2",
    alt: "Hyundai Gold с КМУ HIAB 190TM 8 тонн / 22 м",
    fullSrc: "/img/hero/106c30cf-02d3-4b99-ac02-47e7404652e2.webp",
  },
  {
    id: "660a8623-ee67-4819-a414-68b954548e0b",
    alt: "Hino 500 с КМУ Kanglim KS1256G-II 7 тонн / 19 м",
    fullSrc: "/img/hero/660a8623-ee67-4819-a414-68b954548e0b.webp",
  },
  { id: "96f657e8-7741-4d2b-b428-ca560b0047fb", alt: "Работа манипулятора на объекте", fullSrc: "/img/hero/96f657e8-7741-4d2b-b428-ca560b0047fb.webp" },
  { id: "0c5ebbe2-cc38-4284-81fb-4721e3e53eaa", alt: "Манипулятор на стройке", fullSrc: "/img/hero/0c5ebbe2-cc38-4284-81fb-4721e3e53eaa.webp" },
  { id: "ad03fa64-abbe-491a-85cc-f51f79cefc0a", alt: "Перевозка торгового павильона по городу", fullSrc: "/img/hero/ad03fa64-abbe-491a-85cc-f51f79cefc0a.webp" },
  { id: "f96d4e3d-b06a-4cab-818e-ba49896791b5", alt: "Работа автовышки на объектах РЖД", fullSrc: "/img/hero/f96d4e3d-b06a-4cab-818e-ba49896791b5.webp" },
  { id: "e8b0e860-8ca1-40df-8600-4d28597aa247", alt: "КамАЗ с манипулятором DY", fullSrc: "/img/hero/e8b0e860-8ca1-40df-8600-4d28597aa247.webp" },
];

export const manipulatorLinks = [
  { href: "#features", label: "Преимущества", icon: "Award" },
  { href: "#fleet", label: "Техника", icon: "Truck" },
  { href: "#usecases", label: "Услуги", icon: "Wrench" },
  { href: "#how", label: "Как это работает", icon: "Route" },
];

export const navLinks = [
  ...(SHOP_PUBLIC ? [{ href: "/stroymaterialy", label: "Стройматериалы", icon: "Package" }] : []),
  { href: "/asfaltirovanie", label: "Асфальтирование", icon: "Construction" },
  { href: "#manipulator", label: "Манипулятор", icon: "Truck" },
  { href: "/blog", label: "Блог", icon: "BookOpen" },
];