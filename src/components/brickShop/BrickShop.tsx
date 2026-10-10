import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";
import type { Material } from "@/data/materials";
import BrickCard from "./BrickCard";
import BrickCalculator, { type DeliveryInfo } from "./BrickCalculator";
import BrickCheckout, { type CartLine } from "./BrickCheckout";
import { type BrickFormat, type PurposeId, FORMAT_LABEL, PALLET_SIZE, PURPOSES, formatTons, priceText, matchesPurpose, toBrick } from "./brickUtils";

interface BrickShopProps {
  items: Material[];
  loading: boolean;
}

type SortId = "cheap" | "expensive" | "grade";

const CART_KEY = "favorit_brick_cart_v1";
const CART_TTL = 14 * 24 * 60 * 60 * 1000;

type SavedCart = { items: { id: number; qty: number }[]; delivery?: DeliveryInfo; ts: number };

const readSaved = (): SavedCart | null => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedCart;
    if (!data?.items?.length || Date.now() - (data.ts || 0) > CART_TTL) {
      localStorage.removeItem(CART_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const BrickShop = ({ items, loading }: BrickShopProps) => {
  const bricks = useMemo(() => items.map(toBrick), [items]);
  const [purpose, setPurpose] = useState<PurposeId>("all");
  const [format, setFormat] = useState<BrickFormat | "all">("all");
  const [sort, setSort] = useState<SortId>("cheap");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const formats = (Object.keys(FORMAT_LABEL) as BrickFormat[]).filter((f) => bricks.some((b) => b.format === f));
  const purposes = PURPOSES.filter((p) => p.id === "all" || bricks.some((b) => matchesPurpose(b, p.id)));
  const hasPrices = bricks.some((b) => b.priceNum > 0);

  const visible = useMemo(() => {
    const list = bricks.filter((b) => matchesPurpose(b, purpose) && (format === "all" || b.format === format));
    return [...list].sort((a, b) => {
      if (sort === "expensive") return b.priceNum - a.priceNum;
      if (sort === "grade") return parseInt(b.grade.slice(1) || "0") - parseInt(a.grade.slice(1) || "0");
      return a.priceNum - b.priceNum;
    });
  }, [bricks, purpose, format, sort]);

  const [delivery, setDelivery] = useState<DeliveryInfo | undefined>();
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored || !bricks.length) return;
    const saved = readSaved();
    if (saved) {
      const lines = saved.items
        .map((it) => {
          const brick = bricks.find((b) => b.id === it.id);
          return brick && it.qty > 0 ? { brick, qty: Math.ceil(it.qty / PALLET_SIZE) * PALLET_SIZE } : null;
        })
        .filter((l): l is CartLine => l !== null);
      if (lines.length) {
        setCart(lines);
        if (saved.delivery) setDelivery(saved.delivery);
        setToast("Ваша корзина сохранена");
      }
    }
    setRestored(true);
  }, [bricks, restored]);

  useEffect(() => {
    if (!restored) return;
    try {
      if (!cart.length) {
        localStorage.removeItem(CART_KEY);
        return;
      }
      const data: SavedCart = { items: cart.map((l) => ({ id: l.brick.id, qty: l.qty })), delivery, ts: Date.now() };
      localStorage.setItem(CART_KEY, JSON.stringify(data));
    } catch {
      /* хранилище недоступно — корзина просто не сохранится */
    }
  }, [cart, delivery, restored]);

  const addToCart = (brick: CartLine["brick"], qty: number) => {
    setCart((prev) => {
      const found = prev.find((l) => l.brick.id === brick.id);
      if (found) return prev.map((l) => (l.brick.id === brick.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { brick, qty }];
    });
    setToast(`${brick.hollow ? "Пустотелый" : "Полнотелый"} · ${Math.ceil(qty / PALLET_SIZE)} уп. добавлено`);
  };

  const goCalc = () => {
    setCartOpen(false);
    setTimeout(() => document.getElementById("brick-calc")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const setQty = (id: number, qty: number) =>
    setCart((prev) => (qty <= 0 ? prev.filter((l) => l.brick.id !== id) : prev.map((l) => (l.brick.id === id ? { ...l, qty } : l))));

  const cartQty = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.qty * l.brick.priceNum, 0);
  const prices = bricks.map((b) => b.priceNum).filter((v) => v > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const cartWeight = cart.reduce((s, l) => s + (l.qty / PALLET_SIZE) * l.brick.palletWeight, 0);

  const chip = (active: boolean) =>
    `shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
      active ? "bg-accent text-black border-accent" : "bg-card/40 text-white border-accent/20 hover:border-accent/60"
    }`;

  return (
    <div id="shop" className="scroll-mt-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {[
          { icon: "Tag", value: minPrice ? `от ${minPrice} ₽` : "По запросу", label: minPrice ? "за штуку" : "цена за 5 минут" },
          { icon: "Package", value: `${PALLET_SIZE} шт`, label: "в упаковке" },
          { icon: "Truck", value: "от 1 поддона", label: "доставка манипулятором" },
          { icon: "ShieldCheck", value: "ГОСТ 379-2015", label: "сертифицировано" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-accent/20 bg-card/40 p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
            <Icon name={s.icon} size={22} className="text-accent shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-black leading-tight text-sm sm:text-base">{s.value}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-accent/20 bg-card/30 p-4 mb-6 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Для чего кирпич</p>
          <div className="flex gap-2 overflow-x-auto sm:flex-wrap scrollbar-none -mx-1 px-1">
            {purposes.map((p) => (
              <button key={p.id} type="button" onClick={() => setPurpose(p.id)} className={chip(purpose === p.id)}>
                <Icon name={p.icon} size={14} />
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:justify-between">
          {formats.length > 1 ? (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Формат</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setFormat("all")} className={chip(format === "all")}>Любой</button>
              {formats.map((f) => (
                <button key={f} type="button" onClick={() => setFormat(f)} className={chip(format === f)}>
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>
          </div>
          ) : <div />}
          {hasPrices && (
          <label className="flex items-center gap-2 text-sm">
            <Icon name="ArrowUpDown" size={16} className="text-accent" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="rounded-xl border border-accent/25 bg-[#4a5260] px-3 py-2 text-white font-semibold outline-none focus:border-accent"
            >
              <option value="cheap">Сначала дешёвые</option>
              <option value="expensive">Сначала дорогие</option>
              <option value="grade">По прочности</option>
            </select>
          </label>
          )}
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
              onAdd={(brick, pallets) => addToCart(brick, pallets * PALLET_SIZE)}
            />
          ))}
        </div>
      )}

      {bricks.length > 0 && (
        <div id="brick-calc" className="mt-10 sm:mt-12 scroll-mt-20">
          <BrickCalculator
            bricks={bricks}
            onAdd={(b, q, d) => {
              addToCart(b, q);
              if (d) setDelivery(d);
            }}
          />
        </div>
      )}

      {cart.length > 0 && !cartOpen && <div className="h-24" />}

      {cart.length > 0 && !cartOpen && createPortal(
        <div className="fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4 pointer-events-none">
          {toast && (
            <div className="mx-auto max-w-md mb-2 rounded-xl bg-emerald-500 text-black font-bold text-sm px-4 py-2.5 flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-bottom-2">
              <Icon name="CheckCircle" size={18} />
              {toast}
            </div>
          )}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="pointer-events-auto mx-auto w-full max-w-md flex items-center gap-3 rounded-2xl bg-gradient-to-r from-accent to-accent/85 text-black px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.45)] active:scale-[0.98] transition-transform"
          >
            <span className="relative w-11 h-11 rounded-xl bg-black/15 flex items-center justify-center shrink-0">
              <Icon name="ShoppingCart" size={22} />
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-black text-accent text-[11px] font-black flex items-center justify-center">
                {cart.length}
              </span>
            </span>
            <span className="flex-1 text-left leading-tight">
              <span className="block text-[11px] font-bold opacity-75">
                В корзине {Math.ceil(cartQty / PALLET_SIZE)} уп. · {cartQty.toLocaleString("ru-RU")} шт
              </span>
              <span className="block text-lg font-black">{cartTotal > 0 ? priceText(cartTotal) : formatTons(cartWeight)}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-black text-accent px-3 py-2.5 text-sm font-black">
              Корзина
              <Icon name="ChevronRight" size={16} />
            </span>
          </button>
        </div>,
        document.body,
      )}

      <BrickCheckout
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        setQty={setQty}
        remove={(id) => setQty(id, 0)}
        clear={() => {
          setCart([]);
          setDelivery(undefined);
        }}
        delivery={delivery}
        onCalc={goCalc}
      />
    </div>
  );
};

export default BrickShop;
