import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import MaxButton from "@/components/ui/MaxButton";
import { SUBMIT_URL } from "@/components/sections/hero/heroData";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";
import { reachGoal } from "@/lib/metrika";
import type { Material } from "@/data/materials";
import BrickPhotoViewer from "@/components/brickShop/BrickPhotoViewer";
import BlockCalc from "./BlockCalc";
import { m3, packInfo, parseNum, rub } from "./blockUtils";



interface BlockShopProps {
  items: Material[];
  loading: boolean;
}

const BlockCard = ({ item, onOrder, onPhoto }: { item: Material; onOrder: (packs: number) => void; onPhoto: () => void }) => {
  const [packs, setPacks] = useState(1);
  const price = parseNum(item.price);
  const pack = packInfo(item);
  const packPrice = price * pack.m3;
  const size = (item.description || "").match(/(\d{3})\s?[×x]\s?(\d{2,3})\s?[×x]\s?(\d{2,3})/);
  const bor = /бор/i.test(item.description || "");

  return (
    <article className="group rounded-2xl overflow-hidden border border-accent/15 bg-card/40 hover:border-accent/50 hover:shadow-[0_10px_40px_rgba(232,168,32,0.12)] transition-all flex flex-col">
      <button type="button" onClick={onPhoto} className="relative aspect-[4/3] bg-white overflow-hidden cursor-zoom-in">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <Icon name="Box" size={48} className="text-accent/30 mx-auto" />
        )}
        <span className="md:hidden absolute bottom-2 right-2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center">
          <Icon name="Maximize2" size={16} />
        </span>
      </button>

      <div className="flex items-center gap-2.5 px-4 py-2.5 text-white bg-zinc-800">
        <Icon name="Box" size={20} className="shrink-0" />
        <div className="leading-tight">
          <p className="text-sm font-black uppercase tracking-wide">Газосиликат</p>
          <p className="text-[12.5px] text-white/80">Лёгкий, тёплый, ровный</p>
        </div>
        {pack.density && (
          <span className="ml-auto px-2.5 py-1 rounded-full bg-black/40 text-accent text-xs font-black border border-accent/40">{pack.density}</span>
        )}
        <span
          className={`${pack.density ? "" : "ml-auto "}inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            item.inStock ? "bg-emerald-600 text-white" : "bg-black/40 text-white"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {item.inStock ? "В наличии" : "Под заказ"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {bor && (
          <div className="flex items-center gap-2.5 mb-3 -mt-1 px-3 py-2.5 rounded-xl bg-gradient-to-r from-accent/25 to-accent/5 border border-accent/50">
            <span className="w-9 h-9 shrink-0 rounded-lg bg-accent text-black flex items-center justify-center">
              <Icon name="Factory" size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-[12px] uppercase tracking-wider text-accent font-bold">Производство</p>
              <p className="text-base font-black text-white">г. Бор</p>
            </div>
          </div>
        )}
        <h3 className="text-lg font-black text-white mb-3 leading-tight">{item.name}</h3>
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-muted-foreground">Размер</p>
            <p className="text-white font-semibold">{size ? `${size[1]}×${size[2]}×${size[3]} мм` : "—"}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-muted-foreground">В упаковке</p>
            <p className="text-white font-semibold">{m3(pack.m3)}{pack.pcs > 0 && ` · ${pack.pcs} шт`}</p>
          </div>
          {pack.kg > 0 && (
            <div className="rounded-lg bg-white/5 p-2 col-span-2 flex items-center justify-between">
              <p className="text-muted-foreground">Вес поддона</p>
              <p className="text-white font-semibold">{pack.kg.toLocaleString("ru-RU")} кг</p>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-2xl font-black text-accent leading-none">{price > 0 ? rub(price) : "По запросу"}</p>
              <p className="text-xs text-muted-foreground mt-1">за {item.unit || "м³"}</p>
            </div>
            {price > 0 && (
              <div className="text-right">
                <p className="text-sm font-bold text-white">{rub(packPrice)}</p>
                <p className="text-xs text-muted-foreground">за упаковку {m3(pack.m3)}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-accent/30 bg-black/15">
              <button type="button" onClick={() => setPacks((p) => Math.max(1, p - 1))} className="w-11 h-12 flex items-center justify-center text-white hover:text-accent" aria-label="Меньше">
                <Icon name="Minus" size={16} />
              </button>
              <div className="w-12 text-center leading-none">
                <p className="text-white font-black">{packs}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">упак.</p>
              </div>
              <button type="button" onClick={() => setPacks((p) => Math.min(99, p + 1))} className="w-11 h-12 flex items-center justify-center text-white hover:text-accent" aria-label="Больше">
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onOrder(packs)}
              className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
            >
              <Icon name="ShoppingCart" size={16} />
              Заказать
            </button>
          </div>
          {price > 0 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {packs} уп. = {m3(packs * pack.m3)}{pack.pcs > 0 && ` (${packs * pack.pcs} шт)`} · {rub(packs * packPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

const OrderModal = ({ item, packs, onClose }: { item: Material; packs: number; onClose: () => void }) => {
  const [count, setCount] = useState(packs);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const price = parseNum(item.price);
  const pack = packInfo(item);
  const total = count * pack.m3 * price;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 6) return;
    setStatus("loading");
    const comment = [
      `ЗАКАЗ БЛОКОВ: ${item.name} — ${count} уп. (${m3(count * pack.m3)}${pack.pcs > 0 ? `, ${count * pack.pcs} шт` : ""}${pack.kg > 0 ? `, ${((count * pack.kg) / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} т` : ""})${price > 0 ? `, ${rub(total)}` : ""}`,
      address && `Адрес: ${address}`,
      "Доставка манипулятором",
    ]
      .filter(Boolean)
      .join(" · ");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), comment, media: [] }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      reachGoal("order_sent", { place: "block_shop", total, packs: count });
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full h-12 rounded-xl bg-black/25 border border-white/15 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent";

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md max-h-[100dvh] overflow-y-auto bg-[#2b313c] border border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white">Заказ блоков</h2>
          <button type="button" onClick={onClose} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Закрыть">
            <Icon name="X" size={22} className="text-white" />
          </button>
        </div>

        {status === "done" ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-5">
              <Icon name="Check" size={40} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white mb-2">Заказ отправлен!</p>
            <p className="text-muted-foreground mb-6">Перезвоним в течение 5 минут и подтвердим доставку.</p>
            <button type="button" onClick={onClose} className="w-full h-14 rounded-2xl bg-accent text-black text-lg font-black">
              Хорошо
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-black/20 p-3">
              {item.imageUrl && <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl bg-white object-contain p-1" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{m3(count * pack.m3)}{pack.pcs > 0 && ` · ${count * pack.pcs} шт`}{price > 0 && ` · ${rub(total)}`}</p>
              </div>
              <div className="flex items-center rounded-xl border border-accent/30">
                <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} className="w-9 h-10 flex items-center justify-center text-white" aria-label="Меньше">
                  <Icon name="Minus" size={16} />
                </button>
                <span className="w-7 text-center text-white font-black">{count}</span>
                <button type="button" onClick={() => setCount((c) => Math.min(99, c + 1))} className="w-9 h-10 flex items-center justify-center text-white" aria-label="Больше">
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>
            <input className={field} placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={field} placeholder="Телефон" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input className={field} placeholder="Адрес доставки (необязательно)" value={address} onChange={(e) => setAddress(e.target.value)} />
            {status === "error" && <p className="text-sm text-red-400">Не удалось отправить. Позвоните нам: {MATERIALS_PHONE_LABEL}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-accent/85 text-black text-lg font-black inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Icon name={status === "loading" ? "Loader2" : "Send"} size={20} className={status === "loading" ? "animate-spin" : ""} />
              Отправить заказ
            </button>
            <a href={`tel:${MATERIALS_PHONE}`} className="w-full h-12 rounded-2xl border border-accent/40 text-white font-bold inline-flex items-center justify-center gap-2">
              <Icon name="Phone" size={18} className="text-accent" />
              {MATERIALS_PHONE_LABEL}
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

const BlockShop = ({ items, loading }: BlockShopProps) => {
  const [order, setOrder] = useState<{ item: Material; packs: number } | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const withPhoto = useMemo(() => items.filter((i) => i.imageUrl), [items]);
  const main = items.find((i) => /600\s?[×x]\s?250\s?[×x]\s?300/.test(i.name)) || items[0];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: "Factory", value: "г. Бор", label: "производство" },
          { icon: "Package", value: "40–50 шт", label: "в упаковке" },
          { icon: "Thermometer", value: "Тёплые стены", label: "без мостиков холода" },
          { icon: "Truck", value: "Манипулятор", label: "разгрузка на объекте" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-accent/20 bg-card/40 p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
            <span className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
              <Icon name={s.icon} size={20} />
            </span>
            <div className="leading-tight min-w-0">
              <p className="text-sm sm:text-base font-black text-white">{s.value}</p>
              <p className="text-[12.5px] sm:text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-96 rounded-2xl bg-card/40 border border-accent/10 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-accent/10 rounded-2xl bg-card/30">
          <p className="text-lg font-bold text-white mb-4">Позиции уточняются — позвоните нам</p>
          <PhoneButton size="md" className="rounded-xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {items.map((it) => (
            <BlockCard
              key={it.id}
              item={it}
              onOrder={(packs) => setOrder({ item: it, packs })}
              onPhoto={() => setPhoto(Math.max(0, withPhoto.findIndex((p) => p.id === it.id)))}
            />
          ))}
        </div>
      )}

      {main && (
        <div className="mt-10">
          <BlockCalc items={items} onOrder={(item, packs) => setOrder({ item, packs })} />
        </div>
      )}

      {photo !== null && withPhoto[photo] && (
        <BrickPhotoViewer
          photos={withPhoto.map((p) => ({ src: p.imageUrl, alt: p.name, price: parseNum(p.price) > 0 ? `${p.price} за ${p.unit}` : undefined }))}
          index={photo}
          onIndexChange={setPhoto}
          onClose={() => setPhoto(null)}
        />
      )}

      {order && <OrderModal item={order.item} packs={order.packs} onClose={() => setOrder(null)} />}

      <div className="mt-10 rounded-3xl border border-accent/30 bg-card/60 px-6 pt-6 sm:px-8 sm:pt-8 flex flex-col md:flex-row md:items-center gap-5 overflow-hidden">
        <div className="flex-1 pb-2 md:pb-8 text-center md:text-left">
          <div className="inline-block mb-3 px-4 py-2 rounded-2xl bg-white text-zinc-900 text-sm font-bold shadow-lg">
            Звоните — всё посчитаю и привезу!
          </div>
          <p className="text-2xl font-black text-white mb-1">Остались вопросы?</p>
          <p className="text-muted-foreground mb-5">Позвоните или напишите — подберём блоки и посчитаем доставку за 5 минут</p>
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <PhoneButton size="md" className="rounded-xl justify-center" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
            <MaxButton place="block_shop_bottom" className="justify-center !px-4 !py-2.5 !gap-2 !text-sm !font-bold" />
          </div>
        </div>
        <img
          src="/img/builder-toon-white.webp"
          alt="Строитель Фаворит"
          loading="lazy"
          className="w-36 sm:w-48 h-auto self-center md:self-end drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
        />
      </div>
    </>
  );
};

export default BlockShop;