import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchMaterials, type Material } from "@/data/materials";
import { BRICK_COLORS, brickColor, isPopular, priceText, toBrick, PALLET_SIZE } from "@/components/brickShop/brickUtils";

type Item = {
  id: number;
  title: string;
  sub: string;
  price: string;
  per: string;
  image: string;
  to: string;
  hit?: boolean;
};

const brickItem = (m: Material): Item | null => {
  if (!/336 шт/.test(m.description || "")) return null;
  const b = toBrick(m);
  const color = BRICK_COLORS.find((c) => c.id === brickColor(b.name))?.label || "Белый";
  return {
    id: m.id,
    title: `${color} ${b.hollow ? "пустотелый" : "полнотелый"}`,
    sub: `Кирпич полуторный ${b.grade} · ${PALLET_SIZE} шт/уп.`,
    price: priceText(b.palletPrice),
    per: "за упаковку",
    image: m.imageUrl,
    to: "/stroymaterialy/kirpich",
    hit: isPopular(b),
  };
};

const SHORT: Record<string, string> = { bloki: "Газоблок", bordyur: "Бордюр", plity: "Плита" };

const otherItem = (m: Material): Item => {
  const size = m.name.match(/\d{3,4}×\d{2,4}×\d{2,4}/)?.[0] || "";
  const density = m.name.match(/D\d{3}/)?.[0] || "";
  const title =
    m.category === "bloki"
      ? `Газоблок ${density}`
      : m.category === "bordyur"
        ? m.name.split(" ").slice(0, 2).join(" ")
        : m.name;
  return {
    id: m.id,
    title,
    sub: m.category === "plity" ? "Доставка и укладка манипулятором" : `${SHORT[m.category] || ""} ${size} мм`.trim(),
    price: m.price,
    per: `за ${m.unit}`,
    image: m.imageUrl,
    to: `/stroymaterialy/${m.category}`,
  };
};

const ORDER = ["kirpich", "bloki", "bordyur", "plity"];

const Card = ({ it }: { it: Item }) => (
  <Link
    to={it.to}
    className="group w-[290px] sm:w-[340px] shrink-0 flex items-center gap-3 rounded-2xl bg-white/[0.08] border border-white/15 hover:border-amber-400/60 hover:bg-amber-400/[0.07] p-3 transition-colors"
  >
    <div className="relative w-24 h-20 lg:w-28 lg:h-24 shrink-0 rounded-xl bg-white overflow-hidden">
      {it.image && (
        <img
          src={it.image}
          alt={it.title}
          loading="lazy"
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="flex items-center gap-1.5 text-white font-black text-sm leading-tight">
        <span className="truncate">{it.title}</span>
        {it.hit && (
          <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[11px] font-black uppercase">
            <Icon name="Flame" size={10} />
            Хит
          </span>
        )}
      </p>
      <p className="text-white/60 text-xs mt-0.5 truncate">{it.sub}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-amber-300 font-black text-lg leading-none whitespace-nowrap">{it.price}</p>
          <p className="text-white/55 text-[12.5px] mt-1">{it.per}</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400 text-black text-xs font-black group-hover:bg-amber-300 transition-colors">
          Купить
          <Icon name="ArrowRight" size={13} />
        </span>
      </div>
    </div>
  </Link>
);

const PopularBricks = ({ className = "" }: { className?: string }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchMaterials()
      .then((list) => {
        const res: Item[] = [];
        ORDER.forEach((cat) => {
          list
            .filter((m) => m.category === cat && m.inStock && m.imageUrl)
            .forEach((m) => {
              const it = cat === "kirpich" ? brickItem(m) : otherItem(m);
              if (it) res.push(it);
            });
        });
        const hits = res.filter((i) => i.hit);
        setItems([...hits, ...res.filter((i) => !i.hit)]);
      })
      .catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Flame" size={18} className="text-orange-400" />
        <p className="text-white font-black text-base sm:text-lg">Хиты продаж</p>
      </div>
      <div className="marquee-mask overflow-hidden -mx-4 sm:-mx-6 lg:mx-0">
        <div
          className="marquee-track flex w-max"
          style={{ animationDuration: `${items.length * 5}s` }}
        >
          {[...items, ...items].map((it, i) => (
            <div key={`${it.id}-${i}`} className="pr-3" aria-hidden={i >= items.length}>
              <Card it={it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularBricks;