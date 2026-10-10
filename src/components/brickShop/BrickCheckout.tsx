import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  onCalc: () => void;
}

type Step = "cart" | "form" | "done";

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Корзина" },
  { id: "form", label: "Контакты" },
  { id: "done", label: "Готово" },
];

const BrickCheckout = ({ open, onClose, lines, setQty, remove, clear, delivery, onCalc }: BrickCheckoutProps) => {
  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const totalQty = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.brick.priceNum, 0);
  const pallets = lines.reduce((s, l) => s + palletsFor(l.qty), 0);
  const weight = lines.reduce((s, l) => s + palletsFor(l.qty) * l.brick.palletWeight, 0);
  const deliveryCost = delivery && !delivery.local ? delivery.cost : 0;
  const grand = total + deliveryCost;

  const close = () => {
    if (step !== "form") setStep("cart");
    onClose();
  };

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
        `Доставка: ${delivery.city}, ${delivery.km} км, манипулятор ${delivery.truck}, рейсов ${delivery.trips} — ${delivery.local ? "по городу, цену назвать при звонке" : priceText(delivery.cost)}`,
      delivery && !delivery.local && total > 0 && `ИТОГО с доставкой: ${priceText(total + delivery.cost)}`,
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
      setStatus("idle");
      setStep("done");
      reachGoal("order_sent", { place: "brick_shop", total, pallets });
      clear();
    } catch {
      setStatus("error");
    }
  };

  const stepIdx = STEPS.findIndex((s) => s.id === step);

  const summary = (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2 text-[15px]">
      <div className="flex justify-between gap-3">
        <span className="text-muted-foreground">
          Кирпич · {pallets} уп. · {formatTons(weight)}
        </span>
        <span className="text-white font-bold whitespace-nowrap">{priceText(total)}</span>
      </div>
      <div className="flex justify-between gap-3">
        <span className="text-muted-foreground">Доставка{delivery ? ` · ${delivery.city}` : ""}</span>
        <span className="text-white font-bold whitespace-nowrap text-right">
          {!delivery || delivery.local ? "по телефону" : priceText(delivery.cost)}
        </span>
      </div>
      <div className="flex justify-between items-end gap-3 pt-2 border-t border-white/10">
        <span className="text-white font-bold">{deliveryCost > 0 ? "Итого" : "Итого без доставки"}</span>
        <span className="text-2xl font-black text-accent whitespace-nowrap">{priceText(grand)}</span>
      </div>
    </div>
  );

  const inputCls =
    "mt-1 w-full h-14 rounded-xl border border-white/20 bg-white/5 px-4 text-base text-white outline-none focus:border-accent placeholder:text-white/30";

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full sm:max-w-md h-[100dvh] bg-[#2b313c] sm:border-l border-accent/30 flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            {step === "form" ? (
              <button type="button" onClick={() => setStep("cart")} className="inline-flex items-center gap-1.5 text-white font-bold py-2 pr-3">
                <Icon name="ArrowLeft" size={20} />
                Назад в корзину
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={22} className="text-accent" />
                <h2 className="text-xl font-black text-white">Корзина</h2>
              </div>
            )}
            <button
              type="button"
              onClick={close}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Закрыть"
            >
              <Icon name="X" size={22} className="text-white" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                <span
                  className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                    i <= stepIdx ? "bg-accent text-black" : "bg-white/10 text-white/50"
                  }`}
                >
                  {i < stepIdx ? <Icon name="Check" size={13} /> : i + 1}
                </span>
                <span className={`text-xs font-bold whitespace-nowrap ${i <= stepIdx ? "text-white" : "text-white/40"}`}>{s.label}</span>
                {i < STEPS.length - 1 && <span className={`flex-1 h-0.5 rounded ${i < stepIdx ? "bg-accent" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>
        </div>

        {step === "done" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-5">
              <Icon name="Check" size={40} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white mb-2">Заказ отправлен!</p>
            <p className="text-base text-muted-foreground mb-2">Перезвоним в течение 5 минут, подтвердим наличие и время доставки.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Срочно? Звоните:{" "}
              <a href={`tel:${MATERIALS_PHONE}`} className="text-accent font-bold">
                {MATERIALS_PHONE_LABEL}
              </a>
            </p>
            <button type="button" onClick={close} className="w-full max-w-xs h-14 rounded-2xl bg-accent text-black text-lg font-black">
              Хорошо
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <Icon name="ShoppingCart" size={56} className="text-accent/30 mb-4" />
            <p className="text-xl text-white font-black mb-1">Корзина пуста</p>
            <p className="text-muted-foreground mb-6">Выберите кирпич и нажмите «В корзину»</p>
            <button type="button" onClick={close} className="h-12 px-6 rounded-xl bg-accent text-black font-black">
              Выбрать кирпич
            </button>
          </div>
        ) : step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
              {lines.map((l) => {
                const packs = palletsFor(l.qty);
                return (
                  <div key={l.brick.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl bg-white shrink-0 overflow-hidden">
                        {l.brick.imageUrl && <img src={l.brick.imageUrl} alt="" className="w-full h-full object-contain p-1.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-black uppercase text-white ${
                            l.brick.hollow ? "bg-sky-700" : "bg-zinc-700"
                          }`}
                        >
                          {l.brick.hollow ? "Пустотелый" : "Полнотелый"}
                        </span>
                        <p className="text-[15px] font-bold text-white leading-snug mt-1">{l.brick.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {l.brick.priceNum > 0 ? `${l.brick.priceNum} ₽/шт · ` : ""}
                          {priceText(l.brick.palletPrice)} за упаковку
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.brick.id)}
                        className="w-10 h-10 -mr-1 -mt-1 rounded-xl hover:bg-red-500/20 flex items-center justify-center shrink-0"
                        aria-label="Удалить"
                      >
                        <Icon name="Trash2" size={18} className="text-red-400" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-xl border border-accent/40 bg-black/20">
                        <button
                          type="button"
                          onClick={() => setQty(l.brick.id, l.qty - PALLET_SIZE)}
                          className="w-12 h-12 flex items-center justify-center text-white"
                          aria-label="Минус упаковка"
                        >
                          <Icon name="Minus" size={18} />
                        </button>
                        <div className="w-14 text-center leading-tight">
                          <p className="text-lg font-black text-white">{packs}</p>
                          <p className="text-[10px] text-muted-foreground">упак.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty(l.brick.id, l.qty + PALLET_SIZE)}
                          className="w-12 h-12 flex items-center justify-center text-white"
                          aria-label="Плюс упаковка"
                        >
                          <Icon name="Plus" size={18} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-accent">{priceText(l.qty * l.brick.priceNum)}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.qty.toLocaleString("ru-RU")} шт · {formatTons(packs * l.brick.palletWeight)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!delivery && (
                <button
                  type="button"
                  onClick={onCalc}
                  className="w-full rounded-2xl border border-dashed border-accent/50 bg-accent/5 p-4 flex items-center gap-3 text-left"
                >
                  <Icon name="Truck" size={24} className="text-accent shrink-0" />
                  <span className="flex-1">
                    <span className="block text-white font-bold">Посчитать доставку</span>
                    <span className="block text-xs text-muted-foreground">Выберите город в калькуляторе</span>
                  </span>
                  <Icon name="ChevronRight" size={20} className="text-accent" />
                </button>
              )}
            </div>

            <div className="border-t border-white/10 p-4 space-y-3 bg-[#262b35] pb-[max(1rem,env(safe-area-inset-bottom))]">
              {summary}
              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-black text-lg font-black inline-flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={20} />
                Отправить заказ
              </button>
              <a
                href={`tel:${MATERIALS_PHONE}`}
                onClick={() => reachGoal("phone_click", { place: "brick_cart" })}
                className="w-full h-12 rounded-2xl border border-accent/50 bg-accent/5 text-white font-bold inline-flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={18} className="text-accent" />
                Позвонить {MATERIALS_PHONE_LABEL}
              </a>
            </div>
          </>
        ) : (
          <form onSubmit={submit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              <div>
                <p className="text-lg font-black text-white">Куда перезвонить?</p>
                <p className="text-sm text-muted-foreground">Перезвоним за 5 минут и подтвердим заказ. Предоплата не нужна.</p>
              </div>
              <label className="block">
                <span className="text-sm text-muted-foreground">Ваше имя или компания *</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Иван" className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Телефон *</span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 000-00-00"
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Адрес доставки</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                  placeholder={delivery ? `${delivery.city}, улица, дом` : "Город, улица, дом"}
                  className={inputCls}
                />
              </label>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold text-white mb-2">Ваш заказ</p>
                {lines.map((l) => (
                  <div key={l.brick.id} className="flex justify-between gap-3 text-sm py-1">
                    <span className="text-muted-foreground">
                      {l.brick.hollow ? "Пустотелый" : "Полнотелый"} · {palletsFor(l.qty)} уп. · {l.qty.toLocaleString("ru-RU")} шт
                    </span>
                    <span className="text-white font-bold whitespace-nowrap">{priceText(l.qty * l.brick.priceNum)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-4 space-y-3 bg-[#262b35] pb-[max(1rem,env(safe-area-inset-bottom))]">
              {summary}
              {status === "error" && (
                <p className="text-sm text-red-300">
                  Не удалось отправить. Позвоните:{" "}
                  <a href={`tel:${MATERIALS_PHONE}`} className="underline font-bold">
                    {MATERIALS_PHONE_LABEL}
                  </a>
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-black text-lg font-black inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Icon name={status === "loading" ? "Loader2" : "Send"} size={20} className={status === "loading" ? "animate-spin" : ""} />
                {status === "loading" ? "Отправляем…" : "Отправить заказ"}
              </button>
              <a
                href={`tel:${MATERIALS_PHONE}`}
                onClick={() => reachGoal("phone_click", { place: "brick_cart" })}
                className="w-full h-12 rounded-2xl border border-accent/50 bg-accent/5 text-white font-bold inline-flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={18} className="text-accent" />
                Позвонить {MATERIALS_PHONE_LABEL}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default BrickCheckout;
