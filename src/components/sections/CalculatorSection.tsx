import { useState, useMemo, useEffect } from "react";
import OrderModal from "@/components/ui/OrderModal";
import { trucks, tasks, cities, Category } from "./calculator/data";
import CalculatorHeader from "./calculator/CalculatorHeader";
import CalculatorTaskAndTruck from "./calculator/CalculatorTaskAndTruck";
import CalculatorOptionsAndTotal from "./calculator/CalculatorOptionsAndTotal";

const CalculatorSection = () => {
  const [activeCat, setActiveCat] = useState<Category>("Все");
  const [taskId, setTaskId] = useState("any");
  const [truckIdx, setTruckIdx] = useState(0);
  const [hours, setHours] = useState(4);
  const [cityIdx, setCityIdx] = useState(0);
  const [customCity, setCustomCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityListOpen, setCityListOpen] = useState(false);
  const [truckListOpen, setTruckListOpen] = useState(false);
  const [withRigger, setWithRigger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCat === "Все" ? trucks : trucks.filter((t) => t.category === activeCat);
    const t = tasks.find((x) => x.id === taskId);
    if (t && t.suggested.length > 0) {
      list = list.filter((tr) => t.suggested.includes(trucks.indexOf(tr)));
    }
    return list;
  }, [activeCat, taskId]);

  useEffect(() => {
    if (!filtered.find((t) => trucks.indexOf(t) === truckIdx) && filtered.length > 0) {
      setTruckIdx(trucks.indexOf(filtered[0]));
    }
  }, [filtered, truckIdx]);

  const truck = trucks[truckIdx];
  const baseTotal = truck.price * hours;
  const city = cities[cityIdx];
  const isCustomCity = city.name === "Другой город";
  const cityLabel = isCustomCity && customCity.trim() ? customCity.trim() : city.name;
  const citySurcharge = Math.round(city.hours * truck.price);
  const riggerPrice = withRigger ? 1500 * Math.max(hours, 4) : 0;
  const finalTotal = baseTotal + citySurcharge + riggerPrice;

  const minPrice = Math.min(...trucks.map((t) => t.price));
  const maxPrice = Math.max(...trucks.map((t) => t.price));

  // Сохраняем расчёт калькулятора для автоподстановки в договор
  useEffect(() => {
    try {
      const summary = {
        technique: truck.name,
        hours,
        city: cityLabel,
        withRigger,
        totalSum: `${finalTotal.toLocaleString("ru")} ₽ (${truck.name}, ${hours} ч, ${cityLabel}${withRigger ? ", со стропальщиком" : ""})`,
        workAddress: cityLabel && cityLabel !== "Нижний Новгород" ? cityLabel : "",
        savedAt: Date.now(),
      };
      localStorage.setItem("favorit:calc", JSON.stringify(summary));
    } catch {
      /* ignore */
    }
  }, [truck.name, hours, cityLabel, withRigger, finalTotal]);

  const stepsDone = [
    truck ? 1 : 0,
    hours > 4 || hours === 4 ? 1 : 0,
    cityIdx >= 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        truckName={`${truck.name} · ${hours} ч · ${cityLabel}${withRigger ? " · стропальщик" : ""} · Итого: ${finalTotal.toLocaleString("ru")} ₽`}
        title="Получить расчёт"
        submitLabel="Получить расчёт"
      />

      <div className="max-w-5xl mx-auto relative">
        <CalculatorHeader minPrice={minPrice} maxPrice={maxPrice} stepsDone={stepsDone} />

        <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-br from-accent/40 via-accent/10 to-accent/40">
          <div className="border-0 rounded-2xl sm:rounded-3xl bg-card/80 backdrop-blur-sm p-5 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <CalculatorTaskAndTruck
                taskId={taskId}
                setTaskId={setTaskId}
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                truckIdx={truckIdx}
                setTruckIdx={setTruckIdx}
                truckListOpen={truckListOpen}
                setTruckListOpen={setTruckListOpen}
                filtered={filtered}
                truck={truck}
              />

              <CalculatorOptionsAndTotal
                hours={hours}
                setHours={setHours}
                cityIdx={cityIdx}
                setCityIdx={setCityIdx}
                cityListOpen={cityListOpen}
                setCityListOpen={setCityListOpen}
                citySearch={citySearch}
                setCitySearch={setCitySearch}
                customCity={customCity}
                setCustomCity={setCustomCity}
                withRigger={withRigger}
                setWithRigger={setWithRigger}
                showCheck={showCheck}
                setShowCheck={setShowCheck}
                truck={truck}
                baseTotal={baseTotal}
                citySurcharge={citySurcharge}
                riggerPrice={riggerPrice}
                finalTotal={finalTotal}
                cityLabel={cityLabel}
                isCustomCity={isCustomCity}
                city={city}
                onOrder={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Точная стоимость рассчитывается индивидуально · Минимальный заказ 4 часа
        </p>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: hsl(var(--accent) / 0.3); border-radius: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: hsl(var(--accent) / 0.5); }
      `}</style>
    </section>
  );
};

export default CalculatorSection;