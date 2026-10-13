import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";
import { trucks } from "@/components/sections/calculator/data";
import { DELIVERY_CITIES } from "@/components/brickShop/deliveryCities";
import { tripCost, roundTo } from "@/lib/deliveryPricing";
import type { Material } from "@/data/materials";
import { MAX_LINK } from "@/data/contacts";
import MaxIcon from "@/components/ui/MaxIcon";
import { MAX_GRADIENT } from "@/components/ui/MaxButton";
import { reachGoal } from "@/lib/metrika";
import { toast } from "sonner";
import SlingerNotice, { SLINGER_TEXT } from "@/components/materials/SlingerNotice";


type Kind = {
  id: "road" | "walk";
  match: string;
  title: string;
  size: string;
  perPallet: number;
  packs: number[];
  pieceKg: number;
  fallbackPrice: number;
};

const KINDS: Kind[] = [
  { id: "road", match: "дорожн", title: "Дорожный", size: "1000×300×150", perPallet: 12, packs: [12], pieceKg: 120, fallbackPrice: 500 },
  { id: "walk", match: "тротуар", title: "Тротуарный", size: "1000×200×80", perPallet: 40, packs: [30, 40], pieceKg: 40, fallbackPrice: 210 },
];

const PALLET_KG = 25;

const manipulators = trucks.filter((t) => t.category === "Манипулятор");

const tonsOf = (capacity: string) => {
  const m = capacity.match(/[\d.,]+/);
  return m ? parseFloat(m[0].replace(",", ".")) : 5;
};

const priceOf = (s?: string) => parseFloat((s || "").replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

const tripsWord = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "рейс";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "рейса";
  return "рейсов";
};

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

type Props = { items: Material[] };

const BordyurCalculator = ({ items }: Props) => {
  const [kindId, setKindId] = useState<Kind["id"]>("road");
  const [mode, setMode] = useState<"pcs" | "pallets">("pcs");
  const [qty, setQty] = useState(50);
  const [cityName, setCityName] = useState(DELIVERY_CITIES[0].name);
  const [pickedTruck, setPickedTruck] = useState<string | null>(null);
  const [showAllTrucks, setShowAllTrucks] = useState(false);

  const baseKind = KINDS.find((k) => k.id === kindId) || KINDS[0];
  const [packByKind, setPackByKind] = useState<Record<string, number>>({});
  const perPallet = packByKind[baseKind.id] || baseKind.perPallet;
  const kind = useMemo(() => ({ ...baseKind, perPallet }), [baseKind, perPallet]);
  const city = DELIVERY_CITIES.find((c) => c.name === cityName) || DELIVERY_CITIES[0];

  const unitPrice = useMemo(() => {
    const item = items.find((m) => m.name.toLowerCase().includes(kind.match));
    return priceOf(item?.price) || kind.fallbackPrice;
  }, [items, kind.match, kind.fallbackPrice]);

  const pallets = mode === "pallets" ? Math.max(1, qty) : Math.max(1, Math.ceil(qty / kind.perPallet));
  const pieces = mode === "pallets" ? pallets * kind.perPallet : Math.max(1, qty);
  const palletT = (kind.perPallet * kind.pieceKg + PALLET_KG) / 1000;
  const totalT = (pieces * kind.pieceKg + pallets * PALLET_KG) / 1000;
  const materialTotal = pieces * unitPrice;

  const options = useMemo(
    () =>
      manipulators
        .map((t) => {
          const cap = tonsOf(t.capacity);
          const perTrip = Math.max(1, Math.floor(cap / palletT));
          const trips = Math.ceil(pallets / perTrip);
          const cost = roundTo(tripCost(city.km, cap, t.price)) * trips;
          return { t, cap, perTrip, trips, cost };
        })
        .sort((a, b) => a.trips - b.trips || a.cost - b.cost),
    [palletT, pallets, city],
  );

  const best = options[0];
  const chosen = options.find((o) => o.t.name === pickedTruck) || best;
  const total = materialTotal + chosen.cost;

  const sendToMax = async () => {
    reachGoal("max_click", { place: "bordyur_calc" });
    let copied = false;
    try {
      await navigator.clipboard.writeText(calcText);
      copied = true;
    } catch {
      copied = false;
    }
    if (copied) toast.success("Расчёт скопирован — вставьте его в чат MAX");
    else toast("Откроется чат MAX — напишите нам, и мы всё посчитаем");
  };

  const step = mode === "pallets" ? 1 : kind.perPallet;
  const setSafeQty = (v: number) => setQty(Math.max(1, Math.min(100000, Math.round(v) || 1)));

  const calcText = useMemo(() => {
    const lines = [
      "Здравствуйте! Расчёт бордюра с сайта:",
      `Бордюр ${kind.title.toLowerCase()} ${kind.size} — ${pieces} шт (${pallets} подд. по ${kind.perPallet} шт)`,
      `Вес: ~${totalT.toFixed(1)} т`,
      `Материал: ${fmt(materialTotal)} ₽`,
      `Машина: ${chosen.t.short} (${chosen.t.capacity}), рейсов: ${chosen.trips}`,
      `Адрес: ${city.name} (${city.km} км), доставка: ${fmt(chosen.cost)} ₽`,
      `Итого: ${fmt(total)} ₽`,
      SLINGER_TEXT,
    ];
    return lines.join("\n");
  }, [kind, pieces, pallets, totalT, materialTotal, chosen, city, total]);

  return (
    <section id="bordyur-calc" className="w-full px-3 sm:px-6 lg:px-10 pb-12 scroll-mt-24">
      <div className="rounded-3xl border border-accent/25 bg-card/50 overflow-hidden">
        <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-accent/10 bg-gradient-to-r from-accent/15 to-transparent flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
            <Icon name="Calculator" size={22} className="text-accent" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Калькулятор бордюра с доставкой</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Поддоны, вес и подходящий манипулятор — считаем сразу</p>
          </div>
        </div>

        <div className="p-3.5 sm:p-8 grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8">
          <div className="space-y-7">
            <div>
              <p className="text-sm font-bold text-white mb-3">1. Какой бордюр</p>
              <div className="grid grid-cols-2 gap-3">
                {KINDS.map((k) => {
                  const active = k.id === kindId;
                  const item = items.find((m) => m.name.toLowerCase().includes(k.match));
                  const p = priceOf(item?.price) || k.fallbackPrice;
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => {
                        setKindId(k.id);
                        setPickedTruck(null);
                      }}
                      className={`text-left rounded-2xl border-2 p-2.5 sm:p-4 transition-all flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center ${
                        active ? "border-accent bg-accent/10" : "border-white/10 bg-card/60 hover:border-accent/50"
                      }`}
                    >
                      {item?.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full h-24 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0" />
                      )}
                      <span className="min-w-0">
                        <span className="block font-black text-white text-sm sm:text-base">{k.title}</span>
                        <span className="block text-xs text-muted-foreground">{k.size} мм</span>
                        <span className="block text-accent font-black text-base mt-1 whitespace-nowrap">{fmt(p)} ₽/шт</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {baseKind.packs.length > 1 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground mr-1">Упаковка поддона:</span>
                  {baseKind.packs.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        if (mode === "pallets") setQty(Math.max(1, Math.ceil(pieces / n)));
                        setPackByKind((prev) => ({ ...prev, [baseKind.id]: n }));
                        setPickedTruck(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                        perPallet === n
                          ? "border-accent bg-accent text-black"
                          : "border-white/15 bg-card/60 text-white/80 hover:border-accent/60"
                      }`}
                    >
                      {n} шт на поддоне
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                На поддоне {kind.perPallet} шт · 1 шт ≈ {kind.pieceKg} кг · поддон ≈ {palletT.toFixed(2).replace(".", ",")} т
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <p className="text-sm font-bold text-white">2. Сколько нужно</p>
                <div className="inline-flex rounded-xl border border-white/10 p-1 bg-black/20">
                  {([
                    ["pcs", "Штуки / метры"],
                    ["pallets", "Поддоны"],
                  ] as const).map(([m, label]) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        if (m === mode) return;
                        setQty(m === "pallets" ? pallets : pallets * kind.perPallet);
                        setMode(m);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        mode === m ? "bg-accent text-black" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSafeQty(qty - step)}
                  className="w-12 h-12 rounded-xl border border-white/15 bg-card/60 hover:border-accent/60 flex items-center justify-center text-white"
                  aria-label="Меньше"
                >
                  <Icon name="Minus" size={18} />
                </button>
                <div className="relative flex-1 min-w-0">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={qty}
                    onChange={(e) => setSafeQty(Number(e.target.value))}
                    className="w-full h-12 rounded-xl border border-white/15 bg-black/30 px-3 sm:px-4 pr-20 sm:pr-24 text-lg font-black text-white focus:outline-none focus:border-accent"
                  />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground pointer-events-none">
                    {mode === "pallets" ? "поддонов" : "шт / пог. м"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSafeQty(qty + step)}
                  className="w-12 h-12 rounded-xl border border-white/15 bg-card/60 hover:border-accent/60 flex items-center justify-center text-white"
                  aria-label="Больше"
                >
                  <Icon name="Plus" size={18} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  ["Поддонов", `${pallets}`],
                  ["Штук", `${pieces}`],
                  ["Вес", `≈ ${totalT.toFixed(1).replace(".", ",")} т`],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-black/25 border border-white/10 px-3 py-2">
                    <p className="text-[11px] text-muted-foreground">{l}</p>
                    <p className="text-white font-black">{v}</p>
                  </div>
                ))}
              </div>
              {mode === "pcs" && pieces % kind.perPallet !== 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Неполный поддон — последний поддон будет на {pieces % kind.perPallet} шт
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-white mb-3">3. Куда везти</p>
              <select
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="w-full h-12 rounded-xl border border-white/15 bg-black/30 px-4 text-white focus:outline-none focus:border-accent"
              >
                {DELIVERY_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-zinc-900">
                    {c.name} · {c.km} км
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm font-bold text-white mb-3">4. Какой манипулятор отвезёт</p>
              <div className="space-y-2">
                {options.map((o, idx) => {
                  const active = o.t.name === chosen.t.name;
                  if (!showAllTrucks && idx >= 3 && !active) return null;
                  const isBest = o.t.name === best.t.name;
                  return (
                    <button
                      key={o.t.name}
                      type="button"
                      onClick={() => setPickedTruck(o.t.name)}
                      className={`w-full text-left rounded-2xl border-2 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 transition-all ${
                        active ? "border-accent bg-accent/10" : "border-white/10 bg-card/60 hover:border-accent/50"
                      }`}
                    >
                      <img src={o.t.image} alt={o.t.name} loading="lazy" className="w-16 h-12 sm:w-24 sm:h-16 rounded-lg sm:rounded-xl object-cover shrink-0" />
                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-white text-sm">{o.t.short}</span>
                          {isBest && (
                            <span className="px-2 py-0.5 rounded-full bg-accent text-black text-[10px] font-black uppercase">Оптимально</span>
                          )}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {o.t.capacity} · до {o.perTrip} подд.<span className="hidden sm:inline"> за рейс · стрела {o.t.boom}</span>
                        </span>
                        <span className={`block text-xs mt-0.5 font-semibold ${o.trips === 1 ? "text-emerald-400" : "text-amber-300"}`}>
                          {o.trips === 1 ? "Увезёт за 1 рейс" : `Нужно ${o.trips} ${tripsWord(o.trips)}`}
                        </span>
                      </span>
                      <span className="text-right shrink-0">
                        <span className="block text-white font-black text-sm">{fmt(o.cost)} ₽</span>
                        <span className="block text-[11px] text-muted-foreground">{o.trips > 1 ? `${fmt(o.cost / o.trips)} ₽ × ${o.trips}` : "за рейс"}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {options.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAllTrucks((v) => !v)}
                  className="mt-2 w-full h-11 rounded-xl border border-accent/40 text-sm font-bold text-white inline-flex items-center justify-center gap-2 hover:bg-accent/10"
                >
                  {showAllTrucks ? "Свернуть" : `Показать все машины (${options.length})`}
                  <Icon name="ChevronDown" size={16} className={`text-accent transition-transform ${showAllTrucks ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/10 to-black/30 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-wider text-accent font-bold mb-4">Ваш расчёт</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {kind.title} × {pieces} шт
                </span>
                <span className="text-white font-bold whitespace-nowrap">{fmt(materialTotal)} ₽</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Поддонов / вес</span>
                <span className="text-white font-bold whitespace-nowrap">
                  {pallets} · {totalT.toFixed(1).replace(".", ",")} т
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  Доставка {chosen.t.short}
                  {chosen.trips > 1 ? `, ${chosen.trips} ${tripsWord(chosen.trips)}` : ""}
                </span>
                <span className="text-white font-bold whitespace-nowrap">{fmt(chosen.cost)} ₽</span>
              </div>
              <SlingerNotice />
            </div>
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-xs text-muted-foreground">Итого</p>
              <p className="text-3xl font-black text-accent leading-tight">{fmt(total)} ₽</p>
              <p className="text-[11px] text-muted-foreground mt-1">Предварительный расчёт, точную цену подтвердит менеджер</p>
            </div>
            <div className="mt-5 grid gap-2">
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={sendToMax}
                className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-white font-black text-sm hover:brightness-110 transition-all"
                style={{ background: MAX_GRADIENT, boxShadow: "0 4px 20px rgba(124,58,237,0.45)" }}
              >
                <MaxIcon size={22} className="text-white shrink-0" />
                Отправить расчёт в MAX
              </a>
              <p className="text-[11px] text-muted-foreground text-center -mt-0.5">
                Расчёт скопируется — просто вставьте его в чат
              </p>
              <a
                href={`tel:${MATERIALS_PHONE}`}
                className="inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-accent/40 text-white font-bold text-sm hover:bg-accent/10 transition-all"
              >
                <Icon name="Phone" size={16} className="text-accent" />
                {MATERIALS_PHONE_LABEL}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BordyurCalculator;
