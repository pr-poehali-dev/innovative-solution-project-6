import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PopularBricks from "@/components/sections/PopularBricks";

const CATEGORIES = [
  { to: "/stroymaterialy/kirpich", icon: "Blocks", title: "Кирпич силикатный", text: "Белый и цветной, М-150", hit: true },
  { to: "/stroymaterialy/bloki", icon: "Box", title: "Газосиликатные блоки", text: "D500–D600, тёплые стены" },
  { to: "/stroymaterialy/bordyur", icon: "LayoutGrid", title: "Бордюр", text: "Дорожный и тротуарный" },
  { to: "/stroymaterialy/plity", icon: "Layers", title: "Плиты перекрытия и ФБС блоки", text: "Доставка и укладка" },
  { to: "/stroymaterialy/keramicheskiy-oblicovochnyy", icon: "Sparkles", title: "Кирпич керамический облицовочный", text: "Для красивого фасада" },
  { to: "/stroymaterialy/keramicheskiy", icon: "Blocks", title: "Кирпич керамический", text: "Рядовой полнотелый и пустотелый" },
  { to: "/stroymaterialy/betonnye-kolca", icon: "Circle", title: "Бетонные кольца", text: "Для колодцев и септиков" },
];

const PERKS = [
  { icon: "Truck", text: "Своя доставка" },
  { icon: "Construction", text: "Разгрузка краном" },
  { icon: "Package", text: "От 1 поддона" },
];

const Heading = () => (
  <>
    <span className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[12.5px] sm:text-xs font-bold uppercase tracking-widest">
      <Icon name="Warehouse" size={14} />
      Наш магазин
    </span>

    <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight">
      Всё для строительства{" "}
      <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
        дома
      </span>
    </h2>

    <p className="mt-4 text-white/85 text-sm sm:text-base max-w-lg">
      Мы не только возим грузы — мы продаём стройматериалы. Купите кирпич, блоки и всё
      для стройки в одном месте и получите доставку нашим манипулятором прямо на участок.
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      {PERKS.map((p) => (
        <span
          key={p.text}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/85 text-xs sm:text-sm"
        >
          <Icon name={p.icon} fallback="Check" size={15} className="text-amber-300" />
          {p.text}
        </span>
      ))}
    </div>
  </>
);

const Buttons = () => (
  <div className="flex flex-col sm:flex-row gap-3">
    <Link
      to="/stroymaterialy"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-black transition-transform hover:scale-[1.03]"
      style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
    >
      <Icon name="ShoppingCart" size={18} />
      Перейти в магазин
    </Link>
    <a
      href="tel:+79601883084"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Icon name="Phone" size={18} />
      Рассчитать на мой дом
    </a>
  </div>
);

const Photo = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <img
      src="/img/brick-favorit-hero8.jpg"
      alt="Силикатный кирпич в магазине Фаворит"
      loading="lazy"
      decoding="async"
      width="1360"
      height="768"
      className="absolute inset-0 w-full h-full object-cover object-[80%_center]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#4a4130] lg:via-transparent lg:via-20%" />
    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-1/4 rounded-2xl bg-black/70 backdrop-blur-md border border-amber-400/40 px-4 py-3">
      <div className="text-[12.5px] uppercase tracking-widest text-white/60">Кирпич</div>
      <div className="text-2xl sm:text-3xl font-black text-amber-300 leading-none mt-1">
        от 6.400 т.р<span className="text-sm text-white/70 font-bold"> / уп.</span>
      </div>
    </div>
  </div>
);

const Categories = ({ className = "" }: { className?: string }) => (
  <div className={`relative grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 w-full ${className}`}>
    {CATEGORIES.map((c) => (
      <Link
        key={c.title}
        to={c.to}
        className="group relative rounded-2xl bg-white/[0.08] border border-white/15 hover:border-amber-400/60 hover:bg-amber-400/[0.07] p-4 transition-all hover:-translate-y-0.5"
      >
        {c.hit && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-400 text-black text-[11px] font-black uppercase">
            Хит
          </span>
        )}
        <span className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-3">
          <Icon name={c.icon} fallback="Package" size={20} className="text-amber-300" />
        </span>
        <div className="font-bold text-white text-sm leading-tight">{c.title}</div>
        <div className="text-white/70 text-xs mt-1 leading-snug">{c.text}</div>
        <Icon
          name="MoveUpRight"
          size={16}
          className="absolute bottom-3 right-3 text-white/30 group-hover:text-amber-300 transition-colors"
        />
      </Link>
    ))}
  </div>
);

const BuildShopSection = () => (
  <section className="py-8 sm:py-12" aria-label="Магазин стройматериалов">
    <div className="w-full">
      <div className="relative overflow-hidden border-y border-amber-400/30 bg-gradient-to-br from-[#5a4e38] via-[#4a4130] to-[#3a3428] shadow-2xl shadow-black/30">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        {/* Телефон и планшет: заголовок → фото → товары → кнопки */}
        <div className="relative lg:hidden">
          <div className="p-6 sm:p-10 flex flex-col">
            <Heading />
          </div>
          <Photo className="aspect-[16/9]" />
          <PopularBricks className="px-4 pt-5 sm:px-6 sm:pt-6" />
          <Categories className="p-4 sm:p-6" />
          <div className="px-4 pb-6 sm:px-6 sm:pb-8">
            <Buttons />
          </div>
        </div>

        {/* Компьютер: текст и кнопки слева, фото справа, товары снизу */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-[5fr_7fr]">
            <div className="p-14 xl:pl-[max(3.5rem,calc((100vw-1280px)/2))] flex flex-col justify-center">
              <Heading />
              <div className="mt-7">
                <Buttons />
              </div>
            </div>
            <Photo className="min-h-[480px]" />
          </div>
          <PopularBricks className="border-t border-white/10 pt-6 px-14" />
          <Categories className="p-6 px-14" />
        </div>
      </div>
    </div>
  </section>
);

export default BuildShopSection;