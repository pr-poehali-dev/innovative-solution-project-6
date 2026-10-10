import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "@/components/sections/hero/heroData";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";
import { reachGoal } from "@/lib/metrika";
import type { DeliveryInfo } from "./BrickCalculator";
import { type Brick, PALLET_SIZE, formatTons, priceText, palletsFor } from "./brickUtils";

export type CartLine = { brick: Brick; qty: number };

interface BrickCheckoutProps {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  delivery?: DeliveryInfo;
}

const BrickCheckout = ({ open, onClose, lines, setQty, remove, clear, delivery }: BrickCheckoutProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!open) return null;

  const totalQty = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.brick.priceNum, 0);
  const pallets = lines.reduce((s, l) => s + palletsFor(l.qty), 0);
  const weight = lines.reduce((s, l) => s + palletsFor(l.qty) * l.brick.palletWeight, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || lines.length === 0) return;
    setStatus("loading");
    const list = lines
      .map((l) => `${l.brick.name} — ${l.qty} шт (${palletsFor(l.qty)} под., ${formatTons(palletsFor(l.qty) * l.brick.palletWeight)})`)
      .join("; ");
    const comment = [
      `ЗАКАЗ КИРПИЧА: ${list}`,
      `Кирпич: ${totalQty} шт, ${pallets} поддонов, вес ${formatTons(weight)}${total > 0 ? `, ${priceText(total)}` : ""}`,
      delivery &&
        `Доставка: ${delivery.city}, ${delivery.km} км, манипулятор ${delivery.truck}, рейсов ${delivery.trips} — ${priceText(delivery.cost)}`,
      delivery && total > 0 && `ИТОГО с доставкой: ${priceText(total + delivery.cost)}`,
      address && `Адрес: ${address}`,
    ]
      .filter(Boolean)
      .join(" · ");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          comment,
          media: [],
          brickOrder: {
            items: lines.map((l) => ({
              name: l.brick.name,
              price: l.brick.priceNum,
              qty: l.qty,
              packs: palletsFor(l.qty),
              weightKg: palletsFor(l.qty) * l.brick.palletWeight,
              sum: l.qty * l.brick.priceNum,
            })),
            bricksTotal: total,
            delivery: delivery ? { ...delivery, rate: 120 } : null,
            address,
          },
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reachGoal("order_sent", { place: "brick_shop", total, pallets });
      clear();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-[#0e1420] border-l border-accent/30 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-accent/20">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} className="text-accent" />
            <h2 className="text-lg font-black text-white">Корзина</h2>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Закрыть">
            <Icon name="X" size={20} className="text-white" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} className="text-accent" />
            </div>
            <p className="text-xl font-black text-white mb-2">Заказ принят!</p>
            <p className="text-sm text-muted-foreground mb-6">Перезвоним в течение 5 минут, уточним наличие и посчитаем доставку манипулятором.</p>
            <button type="button" onClick={() => { setStatus("idle"); onClose(); }} className="px-6 py-3 rounded-xl bg-accent text-black font-bold">
              Хорошо
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {lines.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingCart" size={40} className="text-accent/30 mx-auto mb-3" />
                  <p className="text-white font-bold">Корзина пуста</p>
                  <p className="text-sm text-muted-foreground">Выберите кирпич в каталоге</p>
                </div>
              ) : (
                lines.map((l) => (
                  <div key={l.brick.id} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    {l.brick.imageUrl && <img src={l.brick.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white leading-tight mb-1">{l.brick.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {l.qty} шт · {palletsFor(l.qty)} под. · <span className="text-accent font-bold">{formatTons(palletsFor(l.qty) * l.brick.palletWeight)}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setQty(l.brick.id, l.qty - PALLET_SIZE)} className="w-7 h-7 rounded-lg border border-accent/30 flex items-center justify-center text-white" aria-label="Минус поддон">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-xs text-white w-16 text-center">{palletsFor(l.qty)} поддон</span>
                        <button type="button" onClick={() => setQty(l.brick.id, l.qty + PALLET_SIZE)} className="w-7 h-7 rounded-lg border border-accent/30 flex items-center justify-center text-white" aria-label="Плюс поддон">
                          <Icon name="Plus" size={14} />
                        </button>
                        <button type="button" onClick={() => remove(l.brick.id)} className="ml-auto w-7 h-7 rounded-lg hover:bg-red-500/20 flex items-center justify-center" aria-label="Удалить">
                          <Icon name="Trash2" size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <form onSubmit={submit} className="border-t border-accent/20 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{totalQty.toLocaleString("ru-RU")} шт · {pallets} под. · {formatTons(weight)}</span>
                  <span className="text-xl font-black text-accent">{priceText(total)}</span>
                </div>
                {delivery ? (
                  <div className="text-sm space-y-1 -mt-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка: {delivery.city}, {delivery.trips} рейс.</span>
                      <span className="text-white font-bold">{priceText(delivery.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Итого</span>
                      <span className="text-white font-black">{priceText(total + delivery.cost)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-muted-foreground -mt-2">Стоимость доставки посчитаем по адресу</p>
                )}
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя или компания" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-accent" />
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-accent" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес доставки (необязательно)" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-accent" />
                {status === "error" && (
                  <p className="text-xs text-red-400">Не удалось отправить. Позвоните: <a href={`tel:${MATERIALS_PHONE}`} className="underline">{MATERIALS_PHONE_LABEL}</a></p>
                )}
                <button type="submit" disabled={status === "loading"} className="w-full h-12 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-black inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  <Icon name={status === "loading" ? "Loader2" : "Send"} size={18} className={status === "loading" ? "animate-spin" : ""} />
                  Оформить заказ
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrickCheckout;
