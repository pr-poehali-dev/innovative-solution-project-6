import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchMaterials } from "@/data/materials";
import { type Brick, isPopular, popularRank, priceText, toBrick, PALLET_SIZE } from "@/components/brickShop/brickUtils";

const shortName = (b: Brick) => {
  const n = b.name.toLowerCase();
  if (n.includes("жёлт") || n.includes("желт")) return "Жёлтый пустотелый";
  return b.hollow ? "Белый пустотелый" : "Белый полнотелый";
};

const PopularBricks = ({ className = "" }: { className?: string }) => {
  const [items, setItems] = useState<Brick[]>([]);

  useEffect(() => {
    fetchMaterials()
      .then((list) =>
        setItems(
          list
            .filter((m) => m.category === "kirpich")
            .map(toBrick)
            .filter(isPopular)
            .sort((a, b) => popularRank(a) - popularRank(b))
            .slice(0, 3),
        ),
      )
      .catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Flame" size={18} className="text-orange-400" />
        <p className="text-white font-black text-base sm:text-lg">Хиты продаж</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((b) => (
          <Link
            key={b.id}
            to="/stroymaterialy/kirpich"
            className="group flex items-center gap-3 rounded-2xl bg-white/[0.08] border border-white/15 hover:border-amber-400/60 hover:bg-amber-400/[0.07] p-3 transition-all hover:-translate-y-0.5"
          >
            <div className="relative w-24 h-20 lg:w-28 lg:h-24 shrink-0 rounded-xl bg-white overflow-hidden">
              {b.imageUrl && (
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[9px] sm:text-[10px] font-black uppercase">
                <Icon name="Flame" size={10} />
                Хит
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm leading-tight">{shortName(b)}</p>
              <p className="text-white/60 text-xs mt-0.5">
                Полуторный {b.grade} · {PALLET_SIZE} шт/уп.
              </p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <div>
                  <p className="text-amber-300 font-black text-lg leading-none">{priceText(b.palletPrice)}</p>
                  <p className="text-white/55 text-[11px] mt-1">за упаковку</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400 text-black text-xs font-black group-hover:bg-amber-300 transition-colors">
                  Купить
                  <Icon name="ArrowRight" size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularBricks;
