import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchMaterials, type Material } from "@/data/materials";
import { BRICK_COLORS, brickColor, isPopular, priceText, toBrick, PALLET_SIZE } from "@/components/brickShop/brickUtils";
import { packInfo, parseNum } from "@/components/blockShop/blockUtils";
import { money } from "@/lib/money";

type Item = {
  id: number;
  title: string;
  sub: string;
  price: string;
  per: string;
  total?: string;
  totalPer?: string;
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
    price: money(b.priceNum),
    per: "за шт",
    total: priceText(b.palletPrice),
    totalPer: `за уп. ${PALLET_SIZE} шт`,
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
  const unit = parseNum(m.price);
  let total: string | undefined;
  let totalPer: string | undefined;
  if (m.category === "bloki" && unit > 0) {
    const pack = packInfo(m);
    total = money(unit * pack.m3);
    totalPer = `за уп. ${pack.m3.toLocaleString("ru-RU")} м³`;
  } else {
    const mm = (m.description || "").match(/поддоне\s*(\d+)\s*шт\s*[—-]\s*([\d\s\u00a0]+)\s*₽/i);
    if (mm) {
      total = money(Number(mm[2].replace(/[\s\u00a0]/g, "")));
      totalPer = `за поддон ${mm[1]} шт`;
    }
  }
  return {
    id: m.id,
    title,
    sub: m.category === "plity" ? "Доставка и укладка манипулятором" : `${SHORT[m.category] || ""} ${size} мм`.trim(),
    price: unit > 0 ? money(unit) : m.price,
    per: `за ${m.unit}`,
    total,
    totalPer,
    image: m.category === "bordyur" ? "/img/bordyur-wm.jpg" : m.imageUrl,
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
      <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1.5">
        <div className="min-w-0">
          <p className="text-amber-300 font-black text-base leading-none whitespace-nowrap">{it.price}</p>
          <p className="text-white/55 text-[12px] mt-1 whitespace-nowrap">{it.per}</p>
        </div>
        {it.total && (
          <div className="min-w-0 pl-3 border-l border-white/15">
            <p className="text-white font-black text-base leading-none whitespace-nowrap">{it.total}</p>
            <p className="text-white/55 text-[12px] mt-1 whitespace-nowrap">{it.totalPer}</p>
          </div>
        )}
        <span className="ml-auto shrink-0 hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400 text-black group-hover:bg-amber-300 transition-colors" aria-label="Купить">
          <Icon name="ArrowRight" size={16} />
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