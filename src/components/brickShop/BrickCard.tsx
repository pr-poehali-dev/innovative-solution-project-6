import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Brick, FORMAT_LABEL, PALLET_SIZE, priceText } from "./brickUtils";

interface BrickCardProps {
  brick: Brick;
  inCart: number;
  onAdd: (brick: Brick, pallets: number) => void;
}

const BrickCard = ({ brick, inCart, onAdd }: BrickCardProps) => {
  const [pallets, setPallets] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(brick, pallets);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const tags = [
    FORMAT_LABEL[brick.format],
    brick.facing ? "Лицевой" : "Рядовой",
  ];

  return (
    <article className="group rounded-2xl overflow-hidden border border-accent/15 bg-card/40 hover:border-accent/50 hover:shadow-[0_10px_40px_rgba(232,168,32,0.12)] transition-all flex flex-col">
      <div className="relative aspect-[4/3] bg-white overflow-hidden">
        {brick.imageUrl ? (
          <img
            src={brick.imageUrl}
            alt={brick.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 pb-14 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Blocks" size={48} className="text-accent/30" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {brick.grade && (
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-accent text-xs font-black border border-accent/40">
              {brick.grade}
            </span>
          )}
          {brick.facing && (
            <span className="px-2.5 py-1 rounded-full bg-accent text-black text-xs font-black">Для фасада</span>
          )}
        </div>
        <span
          className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur ${
            brick.inStock ? "bg-emerald-600 text-white" : "bg-black/70 text-white"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${brick.inStock ? "bg-white" : "bg-white/60"}`} />
          {brick.inStock ? "В наличии" : "Под заказ"}
        </span>
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center gap-2.5 px-3 py-2 rounded-xl text-white shadow-lg ${
            brick.hollow ? "bg-sky-700" : "bg-zinc-800"
          }`}
        >
          <Icon name={brick.hollow ? "CircleDashed" : "Square"} size={20} className="shrink-0" />
          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-wide">{brick.hollow ? "Пустотелый" : "Полнотелый"}</p>
            <p className="text-[11px] text-white/80">
              {brick.hollow ? "С отверстиями — легче и теплее" : "Сплошной — максимальная прочность"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-black text-white mb-2 leading-tight">{brick.name}</h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/75">
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-muted-foreground">Размер</p>
            <p className="text-white font-semibold">{brick.size}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-muted-foreground">В упаковке</p>
            <p className="text-white font-semibold">{PALLET_SIZE} шт</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2 col-span-2 flex items-center justify-between">
            <p className="text-muted-foreground">Вес поддона</p>
            <p className="text-white font-semibold">{brick.palletWeight.toLocaleString("ru-RU")} кг</p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className={`${brick.priceNum > 0 ? "text-2xl" : "text-lg"} font-black text-accent leading-none`}>
                {brick.priceNum > 0 ? brick.price : "Цена по запросу"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{brick.priceNum > 0 ? `за ${brick.unit || "шт"}` : "назовём за 5 минут"}</p>
            </div>
            {brick.priceNum > 0 && (
              <div className="text-right">
                <p className="text-sm font-bold text-white">{priceText(brick.palletPrice)}</p>
                <p className="text-xs text-muted-foreground">за упаковку {PALLET_SIZE} шт</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-accent/30 bg-black/15">
              <button
                type="button"
                onClick={() => setPallets((p) => Math.max(1, p - 1))}
                className="w-9 h-10 flex items-center justify-center text-white hover:text-accent"
                aria-label="Меньше поддонов"
              >
                <Icon name="Minus" size={16} />
              </button>
              <div className="w-12 text-center leading-none">
                <p className="text-white font-black">{pallets}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">поддон</p>
              </div>
              <button
                type="button"
                onClick={() => setPallets((p) => Math.min(99, p + 1))}
                className="w-9 h-10 flex items-center justify-center text-white hover:text-accent"
                aria-label="Больше поддонов"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all ${
                added
                  ? "bg-emerald-500 text-black"
                  : "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
              }`}
            >
              <Icon name={added ? "Check" : "ShoppingCart"} size={16} />
              {added ? "Добавлено" : "В корзину"}
            </button>
          </div>
          {inCart > 0 && (
            <p className="text-xs text-accent mt-2 text-center">В корзине: {inCart} шт</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default BrickCard;
