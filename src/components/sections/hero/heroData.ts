export const SUBMIT_URL = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

export const WEBP_BASE = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp";
export const BUCKET_BASE = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket";

// fullSrc — прямой URL к оригинальному файлу (используется когда WebP-конвертация ещё не готова)
export const slides: { id: string; alt: string; fullSrc?: string }[] = [
  { id: "df8d23ad-2b19-4a5c-bfef-8403f404cab9", alt: "FAW КМУ DongYang" },
  { id: "861dfbdb-0341-4b64-ac9b-f77e5a4fa99d", alt: "КАМАЗ 43118 вездеход КМУ Kanglim" },
  { id: "b646729f-a106-46bf-b7e4-abf0fe1c4983", alt: "КАМАЗ 65115 КМУ HANGIL" },
  {
    id: "106c30cf-02d3-4b99-ac02-47e7404652e2",
    alt: "Hyundai Gold с КМУ HIAB 190TM 8 тонн / 22 м",
    fullSrc: `${BUCKET_BASE}/106c30cf-02d3-4b99-ac02-47e7404652e2.jpg`,
  },
  {
    id: "660a8623-ee67-4819-a414-68b954548e0b",
    alt: "Hino 500 с КМУ Kanglim KS1256G-II 7 тонн / 19 м",
    fullSrc: `${BUCKET_BASE}/660a8623-ee67-4819-a414-68b954548e0b.jpg`,
  },
  { id: "96f657e8-7741-4d2b-b428-ca560b0047fb", alt: "Работа манипулятора на объекте" },
  { id: "0c5ebbe2-cc38-4284-81fb-4721e3e53eaa", alt: "Манипулятор на стройке" },
  { id: "ad03fa64-abbe-491a-85cc-f51f79cefc0a", alt: "Перевозка торгового павильона по городу" },
  { id: "f96d4e3d-b06a-4cab-818e-ba49896791b5", alt: "Работа автовышки на объектах РЖД" },
  { id: "e8b0e860-8ca1-40df-8600-4d28597aa247", alt: "КамАЗ с манипулятором DY" },
];

export const navLinks = [
  { href: "#features", label: "Преимущества" },
  { href: "#fleet", label: "Техника" },
  { href: "#usecases", label: "Услуги" },
  { href: "#how", label: "Как это работает" },
  { href: "#pricing", label: "Тарифы" },
  { href: "/blog", label: "Блог" },
];