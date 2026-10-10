import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import type { Material } from "@/data/materials";
import BrickCard from "./BrickCard";
import BrickCalculator from "./BrickCalculator";
import BrickCheckout, { type CartLine } from "./BrickCheckout";
import { type BrickFormat, type PurposeId, FORMAT_LABEL, PURPOSES, formatRub, matchesPurpose, toBrick } from "./brickUtils";

interface BrickShopProps {
  items: Material[];
  loading: boolean;
}

type SortId = "cheap" | "expensive" | "grade";

const BrickShop = ({ items, loading }: BrickShopProps) => {
  const bricks = useMemo(() => items.map(toBrick), [items]);
  const [purpose, setPurpose] = useState<PurposeId>("all");
  const [format, setFormat] = useState<BrickFormat | "all">("all");
  const [sort, setSort] = useState<SortId>("cheap");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visible = useMemo(() => {
    const list = bricks.filter((b) => matchesPurpose(b, purpose) && (format === "all" || b.format === format));
    return [...list].sort((a, b) => {
      if (sort === "expensive") return b.priceNum - a.priceNum;
      if (sort === "grade") return parseInt(b.grade.slice(1) || "0") - parseInt(a.grade.slice(1) || "0");
      return a.priceNum - b.priceNum;
    });
  }, [bricks, purpose, format, sort]);

  const addToCart = (brick: CartLine["brick"], qty: number) => {
    setCart((prev) => {
      const found = prev.find((l) => l.brick.id === brick.id);
      if (found) return prev.map((l) => (l.brick.id === brick.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { brick, qty }];
    });
  };

  const setQty = (id: number, qty: number) =>
    setCart((prev) => (qty <= 0 ? prev.filter((l) => l.brick.id !== id) : prev.map((l) => (l.brick.id === id ? { ...l, qty } : l))));

  const cartQty = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.qty * l.brick.priceNum, 0);
  const minPrice = bricks.length ? Math.min(...bricks.map((b) => b.priceNum)) : 0;

  const chip = (active: boolean) =>
    `shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
      active ? "bg-accent text-black border-accent" : "bg-card/40 text-white border-accent/20 hover:border-accent/60"
    }`;

  return (
    <div id="shop" className="scroll-mt-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: "Tag", value: minPrice ? `от ${minPrice} ₽` : "—", label: "за штуку" },
          { icon: "Layers", value: `${bricks.length}`, label: "видов в наличии" },
          { icon: "Truck", value: "от 1 поддона", label: "доставка манипулятором" },
          { icon: "ShieldCheck", value: "ГОСТ 379-2015", label: "сертифицировано" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-accent/20 bg-card/40 p-4 flex items-center gap-3">
            <Icon name={s.icon} size={22} className="text-accent shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-black leading-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-accent/20 bg-card/30 p-4 mb-6 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Для чего кирпич</p>
          <div className="flex gap-2 overflow-x-auto sm:flex-wrap scrollbar-none -mx-1 px-1">
            {PURPOSES.map((p) => (
              <button key={p.id} type="button" onClick={() => setPurpose(p.id)} className={chip(purpose === p.id)}>
                <Icon name={p.icon} size={14} />
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Формат</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setFormat("all")} className={chip(format === "all")}>Любой</button>
              {(Object.keys(FORMAT_LABEL) as BrickFormat[]).map((f) => (
                <button key={f} type="button" onClick={() => setFormat(f)} className={chip(format === f)}>
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Icon name="ArrowUpDown" size={16} className="text-accent" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="rounded-xl border border-accent/25 bg-[#0e1420] px-3 py-2 text-white font-semibold outline-none focus:border-accent"
            >
              <option value="cheap">Сначала дешёвые</option>
              <option value="expensive">Сначала дорогие</option>
              <option value="grade">По прочности</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 rounded-2xl bg-card/40 border border-accent/10 animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-14 border border-accent/10 rounded-2xl bg-card/30">
          <Icon name="SearchX" size={40} className="text-accent/50 mx-auto mb-3" />
          <p className="text-white font-bold mb-1">Под такие условия ничего нет</p>
          <button type="button" onClick={() => { setPurpose("all"); setFormat("all"); }} className="text-accent text-sm underline">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((b) => (
            <BrickCard
              key={b.id}
              brick={b}
              inCart={cart.find((l) => l.brick.id === b.id)?.qty || 0}
              onAdd={(brick, pallets) => addToCart(brick, pallets * 240)}
            />
          ))}
        </div>
      )}

      {bricks.length > 0 && (
        <div className="mt-12">
          <BrickCalculator bricks={bricks} onAdd={addToCart} />
        </div>
      )}

      {cart.length > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-accent to-accent/80 text-black font-black shadow-[0_10px_40px_rgba(232,168,32,0.5)] hover:scale-105 transition-transform"
        >
          <span className="relative">
            <Icon name="ShoppingCart" size={22} />
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-black text-accent text-[11px] flex items-center justify-center">
              {cart.length}
            </span>
          </span>
          <span className="text-sm">{cartQty.toLocaleString("ru-RU")} шт · {formatRub(cartTotal)}</span>
          <span className="text-sm underline">Оформить</span>
        </button>
      )}

      <BrickCheckout
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        setQty={setQty}
        remove={(id) => setQty(id, 0)}
        clear={() => setCart([])}
      />
    </div>
  );
};

export default BrickShop;
