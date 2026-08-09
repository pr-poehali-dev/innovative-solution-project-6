import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { trucks, cities } from "@/components/sections/calculator/data";

const MIN_HOURS = 4;

const deliveryTrucks = trucks.filter((t) => t.category === "Манипулятор");

type Cargo = { id: string; label: string; palletLabel: string; weight: number; price: number };

const cargos: Cargo[] = [
  { id: "bordyur", label: "Бордюр 1000×300×150", palletLabel: "12 шт", weight: 1.6, price: 6000 },
  { id: "kirpich", label: "Кирпич силикатный", palletLabel: "336 шт", weight: 1.4, price: 6050 },
  { id: "bloki", label: "Газосиликатный блок D500", palletLabel: "1,8 м³", weight: 0.95, price: 7020 },
  { id: "cement", label: "Цемент М500", palletLabel: "30 мешков", weight: 1.5, price: 14400 },
  { id: "other", label: "Другой материал", palletLabel: "поддон", weight: 1.5, price: 0 },
];

const DeliveryCalculator = () => {
  const [truckIdx, setTruckIdx] = useState(2);
  const [cityName, setCityName] = useState(cities[0].name);
  const [hours, setHours] = useState(MIN_HOURS);
  const [cargoId, setCargoId] = useState(cargos[0].id);
  const [pallets, setPallets] = useState(4);

  const truck = deliveryTrucks[truckIdx];
  const city = useMemo(
    () => cities.find((c) => c.name === cityName) || cities[0],
    [cityName],
  );
  const cargo = useMemo(() => cargos.find((c) => c.id === cargoId) || cargos[0], [cargoId]);

  const truckTons = useMemo(() => {
    const m = truck.capacity.match(/[\d.,]+/);
    return m ? parseFloat(m[0].replace(",", ".")) : 5;
  }, [truck]);

  const cargoWeight = +(pallets * cargo.weight).toFixed(1);
  const palletsPerTrip = Math.max(1, Math.floor(truckTons / cargo.weight));
  const trips = Math.ceil(pallets / palletsPerTrip);

  const baseTotal = truck.price * hours * trips;
  const citySurcharge = Math.round(city.hours * truck.price) * trips;
  const total = baseTotal + citySurcharge;
  const materialsTotal = cargo.price * pallets;

  const fmt = (n: number) => n.toLocaleString("ru-RU");

  const waLink = useMemo(() => {
    const lines = [
      "Здравствуйте! Расчёт с сайта:",
      `Материал: ${cargo.label} — ${pallets} подд. (${cargo.palletLabel} / поддон)`,
      `Вес груза: ~${cargoWeight} т, рейсов: ${trips}`,
      `Машина: ${truck.short} (${truck.capacity}), ${hours} ч`,
      `Адрес: ${city.name}`,
      `Доставка: ${fmt(total)} ₽`,
      materialsTotal > 0 ? `Материал: ${fmt(materialsTotal)} ₽` : "",
      materialsTotal > 0 ? `Итого: ${fmt(materialsTotal + total)} ₽` : "",
    ].filter(Boolean);
    return `https://wa.me/79601883084?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [cargo, pallets, cargoWeight, trips, truck, hours, city, total, materialsTotal]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="rounded-3xl border border-accent/20 bg-card/40 overflow-hidden">
        <div className="px-5 sm:px-8 py-6 border-b border-accent/10 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
              <Icon name="Calculator" size={22} className="text-accent" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Калькулятор доставки материалов
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Выберите машину и город — рассчитаем стоимость доставки
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8 grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-7">
            <div>
              <p className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Icon name="Truck" size={16} className="text-accent" />
                Выберите машину
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {deliveryTrucks.map((t, i) => {
                  const active = i === truckIdx;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setTruckIdx(i)}
                      className={`text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                        active
                          ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                          : "border-accent/10 bg-card/40 hover:border-accent/40"
                      }`}
                    >
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-white truncate">{t.short}</span>
                        <span className="block text-xs text-muted-foreground">
                          {t.capacity} · стрела {t.boom}
                        </span>
                        <span className="block text-xs font-bold text-accent mt-0.5">
                          {fmt(t.price)} ₽/час
                        </span>
                      </span>
                      {active && (
                        <Icon name="CircleCheck" size={18} className="text-accent ml-auto shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="Package" size={16} className="text-accent" />
                  Что везём
                </label>
                <select
                  value={cargoId}
                  onChange={(e) => setCargoId(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-card/60 border border-accent/20 text-white text-sm focus:border-accent outline-none"
                >
                  {cargos.map((c) => (
                    <option key={c.id} value={c.id} className="bg-background">
                      {c.label} ({c.palletLabel} / поддон)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="Layers" size={16} className="text-accent" />
                  Сколько поддонов
                </label>
                <div className="flex items-center gap-2 h-12">
                  <button
                    onClick={() => setPallets((p) => Math.max(1, p - 1))}
                    className="w-12 h-12 rounded-xl border border-accent/20 bg-card/60 text-accent font-black text-lg hover:border-accent transition-colors"
                    aria-label="Меньше поддонов"
                  >
                    −
                  </button>
                  <div className="flex-1 h-12 rounded-xl bg-card/60 border border-accent/20 flex items-center justify-center text-white font-black">
                    {pallets} шт
                  </div>
                  <button
                    onClick={() => setPallets((p) => Math.min(40, p + 1))}
                    className="w-12 h-12 rounded-xl border border-accent/20 bg-card/60 text-accent font-black text-lg hover:border-accent transition-colors"
                    aria-label="Больше поддонов"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Вес груза ≈ {cargoWeight} т · войдёт {palletsPerTrip} подд. за рейс
                </p>
              </div>

              <div>
                <label className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  Куда везём
                </label>
                <select
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-card/60 border border-accent/20 text-white text-sm focus:border-accent outline-none"
                >
                  {cities.map((c) => (
                    <option key={c.name} value={c.name} className="bg-background">
                      {c.name}
                      {c.hours > 0 ? ` (+${fmt(Math.round(c.hours * truck.price))} ₽)` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-accent" />
                  Время работы: {hours} ч
                </label>
                <div className="flex items-center gap-2 h-12">
                  <button
                    onClick={() => setHours((h) => Math.max(MIN_HOURS, h - 1))}
                    className="w-12 h-12 rounded-xl border border-accent/20 bg-card/60 text-accent font-black text-lg hover:border-accent transition-colors"
                    aria-label="Меньше"
                  >
                    −
                  </button>
                  <div className="flex-1 h-12 rounded-xl bg-card/60 border border-accent/20 flex items-center justify-center text-white font-black">
                    {hours} ч
                  </div>
                  <button
                    onClick={() => setHours((h) => Math.min(12, h + 1))}
                    className="w-12 h-12 rounded-xl border border-accent/20 bg-card/60 text-accent font-black text-lg hover:border-accent transition-colors"
                    aria-label="Больше"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Минимальный заказ — {MIN_HOURS} часа</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-5 flex flex-col h-fit lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-4">Расчёт доставки</p>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {pallets} подд. · {cargoWeight} т
                </span>
                <span className="text-white font-bold whitespace-nowrap">
                  {trips} {trips === 1 ? "рейс" : trips < 5 ? "рейса" : "рейсов"}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {truck.short} × {hours} ч{trips > 1 ? ` × ${trips}` : ""}
                </span>
                <span className="text-white font-bold whitespace-nowrap">{fmt(baseTotal)} ₽</span>
              </div>
              {citySurcharge > 0 && (
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Выезд: {city.name}</span>
                  <span className="text-white font-bold whitespace-nowrap">+{fmt(citySurcharge)} ₽</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-accent/20">
              <p className="text-xs text-muted-foreground mb-1">Итого доставка</p>
              <p className="text-3xl font-black text-accent leading-none">{fmt(total)} ₽</p>
              {materialsTotal > 0 && (
                <div className="mt-3 pt-3 border-t border-accent/10 space-y-1">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Материал ({pallets} подд.)</span>
                    <span className="text-white font-bold whitespace-nowrap">{fmt(materialsTotal)} ₽</span>
                  </div>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="font-bold text-white">Всё вместе</span>
                    <span className="text-accent font-black whitespace-nowrap">
                      {fmt(materialsTotal + total)} ₽
                    </span>
                  </div>
                </div>
              )}
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-black font-black text-sm hover:shadow-lg hover:shadow-[#25D366]/30 transition-all"
            >
              <Icon name="MessageCircle" size={18} />
              Отправить расчёт в WhatsApp
            </a>
            <a
              href="tel:+79601883084"
              className="mt-2.5 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-black text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              <Icon name="Phone" size={16} />
              Позвонить: +7 960 188-30-84
            </a>
            <p className="text-[11px] text-muted-foreground text-center mt-2.5">
              Расчёт предварительный — точную цену назовём по телефону
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCalculator;