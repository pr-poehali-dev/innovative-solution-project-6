import Icon from "@/components/ui/icon";
import { DELIVERY_CITIES } from "./deliveryCities";
import { type Brick, PALLET_SIZE, WALL_THICKNESS, formatTons, priceText } from "./brickUtils";
import { type Manipulator, type Mode, NumField, Row, fmt } from "./calculatorParts";
import SlingerNotice from "@/components/materials/SlingerNotice";

interface BuildResult {
  wallArea: number;
  openings: number;
  area: number;
  perM2: number;
  qty: number;
  orderQty: number;
  t: (typeof WALL_THICKNESS)[number];
}

interface BrickCalcSummaryProps {
  mode: Mode;
  build: BuildResult;
  selected: Brick | undefined;
  pallets: number;
  orderQty: number;
  weight: number;
  total: number;
  city: string;
  setCity: (v: string) => void;
  distance: string;
  setDistance: (v: string) => void;
  setTruckTons: (v: number | null) => void;
  usable: Manipulator[];
  truck: Manipulator | undefined;
  bestTruck: Manipulator | undefined;
  perTripOf: (tons: number) => number;
  palletKg: number;
  perTrip: number;
  trips: number;
  km: number;
  isLocal: boolean;
  deliveryText: string;
  grandTotal: number;
  done: boolean;
  handleAdd: () => void;
}

const BrickCalcSummary = ({
  mode,
  build,
  selected,
  pallets,
  orderQty,
  weight,
  total,
  city,
  setCity,
  distance,
  setDistance,
  setTruckTons,
  usable,
  truck,
  bestTruck,
  perTripOf,
  palletKg,
  perTrip,
  trips,
  km,
  isLocal,
  deliveryText,
  grandTotal,
  done,
  handleAdd,
}: BrickCalcSummaryProps) => (
  <div className="min-w-0 w-full lg:sticky lg:top-24 self-start rounded-2xl border border-accent/40 bg-black/10 p-5 shadow-[0_0_40px_rgba(232,168,32,0.08)]">
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Итог расчёта</p>

    <div className="rounded-xl bg-accent/10 border border-accent/30 p-4 text-center mb-4">
      <p className="text-xs text-muted-foreground">Нужно заказать</p>
      <p className="text-4xl font-black text-accent leading-tight">
        {pallets} <span className="text-xl">уп.</span>
      </p>
      <p className="text-sm text-white font-bold">{orderQty.toLocaleString("ru-RU")} шт кирпича</p>
    </div>

    {mode === "build" && (
      <div className="space-y-2 text-sm mb-4">
        <Row label="Площадь стен" value={`${fmt(build.wallArea)} м²`} />
        <Row label="Минус окна, двери, ворота" value={`− ${fmt(build.openings)} м²`} />
        <Row label="Площадь кладки" value={`${fmt(build.area)} м²`} strong />
        <Row label={`Кирпича на 1 м² (${build.t.label.toLowerCase()})`} value={`${build.perM2} шт`} />
        <Row label="Нужно с запасом 5%" value={`${build.qty.toLocaleString("ru-RU")} шт`} strong />
        <p className="text-[11px] text-muted-foreground pt-1">
          Округлили до целых упаковок по {PALLET_SIZE} шт — останется {(build.orderQty - build.qty).toLocaleString("ru-RU")} шт в запас
        </p>
      </div>
    )}

    <div className="space-y-2 text-sm pt-3 border-t border-white/10">
      <Row label="Вес" value={selected ? formatTons(weight) : "—"} />
      <Row label="Цена упаковки" value={selected ? priceText(selected.palletPrice) : "—"} />
    </div>

    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <Icon name="Truck" size={16} className="text-accent" />
        <span className="text-sm font-bold text-white">Доставка манипулятором</span>
      </div>
      <label className="block mb-3">
        <span className="text-xs text-muted-foreground">Город или посёлок</span>
        <div className="mt-1 relative">
          <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
          <select
            value={city}
            onChange={(e) => {
              const c = DELIVERY_CITIES.find((x) => x.name === e.target.value);
              setCity(e.target.value);
              if (c) setDistance(String(c.km));
            }}
            className="w-full appearance-none rounded-xl border border-accent/25 bg-[#4a5260] pl-9 pr-9 py-2.5 text-[15px] text-white font-bold outline-none truncate focus:border-accent"
          >
            {DELIVERY_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} · {c.km} км
              </option>
            ))}
            <option value="other">Другой адрес — введу километры</option>
          </select>
          <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </label>
      <NumField
        label="Расстояние до объекта"
        value={distance}
        onChange={(v) => {
          setDistance(v);
          const c = DELIVERY_CITIES.find((x) => x.name === city);
          if (c && String(c.km) !== v) setCity("other");
        }}
        suffix="км"
        hint="Можно поправить, если объект дальше или ближе"
      />
      <p className="text-xs text-muted-foreground mt-3 mb-1.5">Грузоподъёмность манипулятора</p>
      <div className="grid grid-cols-3 gap-1.5">
        {usable.map((t) => {
          const active = truck?.tons === t.tons;
          return (
            <button
              key={t.tons}
              type="button"
              onClick={() => setTruckTons(t.tons)}
              className={`relative rounded-lg border px-1.5 py-2 text-center transition-all ${
                active ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"
              }`}
            >
              {bestTruck?.tons === t.tons && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 rounded-full bg-accent text-black text-[9px] font-black whitespace-nowrap">
                  выгодно
                </span>
              )}
              <span className="block text-sm font-black text-white">{fmt(t.tons)} т</span>
              <span className="block text-[10px] text-muted-foreground">{perTripOf(t.tons)} уп./рейс</span>
            </button>
          );
        })}
      </div>
      <div className="space-y-2 text-sm mt-3">
        <Row label="Вес груза" value={formatTons(pallets * palletKg)} />
        <Row label="Везём за рейс" value={truck ? `${perTrip} уп. (${formatTons(perTrip * palletKg)})` : "—"} />
        <Row label="Рейсов манипулятора" value={km > 0 ? `${trips}` : "—"} />
        <Row label="Доставка" value={isLocal ? "по телефону" : deliveryText} />
      </div>
      {isLocal && (
        <p className="mt-2 text-[11px] text-accent">По городу и ближайшим районам — назовём лучшую цену при звонке</p>
      )}
      <SlingerNotice className="mt-3" />
    </div>

    <div className="mt-4 pt-4 border-t border-accent/20 space-y-2 text-sm">
      <Row label="Кирпич" value={priceText(total)} />
      <Row label="Доставка" value={isLocal ? "по телефону" : deliveryText} />
    </div>
    <div className="mt-3 flex justify-between items-end">
      <span className="text-white font-bold leading-tight">{isLocal || km <= 0 ? "Итого без доставки" : "Итого"}</span>
      <span className="text-2xl sm:text-3xl font-black text-accent whitespace-nowrap">{priceText(grandTotal)}</span>
    </div>

    <button
      type="button"
      disabled={!selected || orderQty === 0}
      onClick={handleAdd}
      className={`mt-5 w-full h-12 rounded-xl font-black inline-flex items-center justify-center gap-2 transition-all disabled:opacity-40 ${
        done ? "bg-emerald-500 text-black" : "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
      }`}
    >
      <Icon name={done ? "Check" : "ShoppingCart"} size={18} />
      {done ? "Добавлено в корзину" : `Добавить ${pallets} уп. в корзину`}
    </button>
  </div>
);

export default BrickCalcSummary;
