import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { DELIVERY_CITIES } from "./deliveryCities";
import { type Brick, PALLET_SIZE, WALL_THICKNESS, priceText, palletsFor } from "./brickUtils";
import {
  type DeliveryInfo,
  type Mode,
  type Shape,
  type ThicknessId,
  DOOR_M2,
  GATE_M2,
  LOCAL_KM,
  MANIPULATORS,
  PRESETS,
  RESERVE,
  Step,
  WINDOW_M2,
  fmt,
  num,
} from "./calculatorParts";
import BrickBuildSteps from "./BrickBuildSteps";
import BrickPacksStep from "./BrickPacksStep";
import BrickCalcSummary from "./BrickCalcSummary";
import { tripCost, roundTo } from "@/lib/deliveryPricing";

export type { DeliveryInfo } from "./calculatorParts";

interface BrickCalculatorProps {
  bricks: Brick[];
  onAdd: (brick: Brick, qty: number, delivery?: DeliveryInfo) => void;
}

const BrickCalculator = ({ bricks, onAdd }: BrickCalculatorProps) => {
  const [mode, setMode] = useState<Mode>("build");
  const [brickId, setBrickId] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const [preset, setPreset] = useState("house");
  const [shape, setShape] = useState<Shape>("box");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [height, setHeight] = useState("3");
  const [windows, setWindows] = useState(6);
  const [doors, setDoors] = useState(2);
  const [gates, setGates] = useState(0);
  const [thickness, setThickness] = useState<ThicknessId>("1.5");

  const [packs, setPacks] = useState(1);
  const [city, setCity] = useState(DELIVERY_CITIES[0].name);
  const [distance, setDistance] = useState(String(DELIVERY_CITIES[0].km));
  const [truckTons, setTruckTons] = useState<number | null>(null);

  const selected = bricks.find((b) => b.id === brickId) || bricks[0];
  const format = selected?.format || "oneHalf";

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPreset(id);
    setShape(p.shape);
    setLength(String(p.length));
    setWidth(String(p.width));
    setHeight(String(p.height));
    setWindows(p.windows);
    setDoors(p.doors);
    setGates(p.gates);
    setThickness(p.thickness);
  };

  const build = useMemo(() => {
    const L = num(length);
    const W = num(width);
    const H = num(height);
    const perimeter = shape === "box" ? 2 * (L + W) : L;
    const wallArea = perimeter * H;
    const openings = windows * WINDOW_M2 + doors * DOOR_M2 + gates * GATE_M2;
    const area = Math.max(0, wallArea - openings);
    const t = WALL_THICKNESS.find((w) => w.id === thickness)!;
    const perM2 = t.perM2[format];
    const net = area * perM2;
    const qty = Math.ceil((net * RESERVE) / 10) * 10;
    const pallets = palletsFor(qty);
    return { perimeter, wallArea, openings, area, perM2, net, qty, pallets, orderQty: pallets * PALLET_SIZE, t };
  }, [length, width, height, shape, windows, doors, gates, thickness, format]);

  const packQty = packs * PALLET_SIZE;

  const pallets = mode === "build" ? build.pallets : packs;
  const orderQty = mode === "build" ? build.orderQty : packQty;
  const weight = selected ? pallets * selected.palletWeight : 0;
  const total = selected ? orderQty * selected.priceNum : 0;
  const km = num(distance);
  const palletKg = selected?.palletWeight || 1680;
  const perTripOf = (tons: number) => Math.floor((tons * 1000) / palletKg);
  const tripsOf = (tons: number) => (pallets > 0 && perTripOf(tons) > 0 ? Math.ceil(pallets / perTripOf(tons)) : 0);
  const usable = MANIPULATORS.filter((t) => perTripOf(t.tons) > 0);
  const bestTruck = usable.reduce<(typeof MANIPULATORS)[number] | undefined>((best, t) => {
    if (!best) return t;
    const a = tripsOf(t.tons);
    const b = tripsOf(best.tons);
    return a < b || (a === b && t.tons < best.tons) ? t : best;
  }, undefined);
  const truck = usable.find((t) => t.tons === truckTons) || bestTruck;
  const perTrip = truck ? perTripOf(truck.tons) : 0;
  const trips = truck ? tripsOf(truck.tons) : 0;
  const isLocal = km > 0 && km <= LOCAL_KM;
  const delivery = isLocal || !truck ? 0 : roundTo(tripCost(km, truck.tons, truck.price)) * trips;
  const grandTotal = total + delivery;
  const deliveryText = km <= 0 ? "—" : isLocal ? "Рассчитаем по телефону" : priceText(delivery);

  const handleAdd = () => {
    if (!selected || orderQty === 0) return;
    onAdd(
      selected,
      orderQty,
      km > 0 && truck
        ? { city: city === "other" ? "Другой адрес" : city, km, truck: `${fmt(truck.tons)} т`, trips, cost: delivery, local: isLocal }
        : undefined,
    );
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card/70 to-black/10 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
            <Icon name="Calculator" size={22} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Калькулятор кирпича</h2>
            <p className="text-sm text-muted-foreground">Посчитайте сами — сколько кирпича и упаковок нужно</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-black/15 border border-white/10 sm:w-[420px]">
          {[
            { id: "build" as Mode, label: "По размерам постройки", icon: "Home" },
            { id: "packs" as Mode, label: "По упаковкам", icon: "Package" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                mode === m.id ? "bg-accent text-black" : "text-white/80 hover:text-white"
              }`}
            >
              <Icon name={m.icon} size={15} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5">
        <div className="space-y-4 min-w-0">
          {bricks.length > 0 && (
            <Step n={1} title="Выберите кирпич">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bricks.map((b) => {
                  const active = selected?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBrickId(b.id)}
                      className={`flex items-center gap-3 rounded-xl border p-2 text-left transition-all ${
                        active ? "border-accent bg-accent/15" : "border-white/10 bg-black/10 hover:border-accent/50"
                      }`}
                    >
                      <span className="w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden">
                        {b.imageUrl && <img src={b.imageUrl} alt="" className="w-full h-full object-contain p-1" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-black text-white">{b.hollow ? "Пустотелый" : "Полнотелый"}</span>
                        <span className="block text-[11px] text-muted-foreground">
                          {b.grade} · {b.priceNum > 0 ? `${b.priceNum.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽/шт` : "цена по запросу"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>
          )}

          {mode === "build" ? (
            <BrickBuildSteps
              preset={preset}
              applyPreset={applyPreset}
              shape={shape}
              setShape={setShape}
              length={length}
              setLength={setLength}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              perimeter={build.perimeter}
              windows={windows}
              setWindows={setWindows}
              doors={doors}
              setDoors={setDoors}
              gates={gates}
              setGates={setGates}
              thickness={thickness}
              setThickness={setThickness}
            />
          ) : (
            <BrickPacksStep packs={packs} setPacks={setPacks} packQty={packQty} format={format} />
          )}
        </div>

        <BrickCalcSummary
          mode={mode}
          build={build}
          selected={selected}
          pallets={pallets}
          orderQty={orderQty}
          weight={weight}
          total={total}
          city={city}
          setCity={setCity}
          distance={distance}
          setDistance={setDistance}
          setTruckTons={setTruckTons}
          usable={usable}
          truck={truck}
          bestTruck={bestTruck}
          perTripOf={perTripOf}
          palletKg={palletKg}
          perTrip={perTrip}
          trips={trips}
          km={km}
          isLocal={isLocal}
          deliveryText={deliveryText}
          grandTotal={grandTotal}
          done={done}
          handleAdd={handleAdd}
        />
      </div>
    </div>
  );
};

export default BrickCalculator;
