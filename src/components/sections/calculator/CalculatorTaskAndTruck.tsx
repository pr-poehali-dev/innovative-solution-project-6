import Icon from "@/components/ui/icon";
import { trucks, tasks, categories, Truck, Category } from "./data";

type Props = {
  taskId: string;
  setTaskId: (id: string) => void;
  activeCat: Category;
  setActiveCat: (c: Category) => void;
  truckIdx: number;
  setTruckIdx: (i: number) => void;
  truckListOpen: boolean;
  setTruckListOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  filtered: Truck[];
  truck: Truck;
};

const CalculatorTaskAndTruck = ({
  taskId,
  setTaskId,
  activeCat,
  setActiveCat,
  truckIdx,
  setTruckIdx,
  truckListOpen,
  setTruckListOpen,
  filtered,
  truck,
}: Props) => {
  return (
    <>
      {/* Шаг 1: Тип задачи */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">1</span>
          Какая у вас задача?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tasks.map((t) => (
            <button
              key={t.id}
              onClick={() => setTaskId(t.id)}
              className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                taskId === t.id
                  ? "border-accent bg-accent/15 text-white"
                  : "border-accent/10 bg-background/30 text-muted-foreground hover:border-accent/30"
              }`}
            >
              <Icon name={t.icon} size={18} className={taskId === t.id ? "text-accent" : "text-accent/60"} />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight text-center">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Категории фильтр */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = cat === "Все" ? trucks.length : trucks.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCat === cat
                    ? "bg-accent text-black shadow-lg shadow-accent/30"
                    : "bg-background/40 border border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[10px] ${activeCat === cat ? "text-black/60" : "text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Шаг 2: Выбор техники */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">2</span>
          Выберите технику
          {filtered.length < trucks.length && (
            <span className="ml-auto text-[11px] text-accent/80">Подобрано: {filtered.length}</span>
          )}
        </p>

        {/* Selected truck preview — кликабельный, открывает список */}
        <button
          type="button"
          onClick={() => setTruckListOpen((v) => !v)}
          className="w-full mb-2 p-3 rounded-xl border-2 border-accent/40 bg-gradient-to-r from-accent/10 to-transparent flex items-center gap-3 hover:border-accent transition-all text-left"
        >
          <img src={truck.image} alt={truck.short} className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-lg flex-shrink-0 bg-black/30" loading="lazy" decoding="async" width="80" height="64" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-accent font-bold tracking-wider mb-0.5">ВЫБРАНО</p>
            <p className="font-bold text-sm text-white truncate">{truck.name}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Icon name="Weight" size={10} />{truck.capacity}</span>
              {truck.boom && <span className="flex items-center gap-1"><Icon name="MoveUpRight" size={10} />{truck.boom}</span>}
              <span className="flex items-center gap-1 text-accent font-bold"><Icon name="Wallet" size={10} />{truck.price.toLocaleString("ru")} ₽/ч</span>
            </div>
          </div>
          <Icon name={truckListOpen ? "ChevronUp" : "ChevronDown"} size={18} className="text-accent flex-shrink-0" />
        </button>

        {/* Горизонтальная лента миниатюр */}
        {!truckListOpen && (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 custom-scroll snap-x">
            {filtered.map((t) => {
              const i = trucks.indexOf(t);
              const selected = truckIdx === i;
              return (
                <button
                  key={i}
                  onClick={() => setTruckIdx(i)}
                  className={`relative flex-shrink-0 w-[110px] snap-start rounded-lg border-2 overflow-hidden transition-all ${
                    selected
                      ? "border-accent shadow-lg shadow-accent/20"
                      : "border-accent/10 hover:border-accent/40"
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-black/30">
                    <img src={t.image} alt={t.short} className="w-full h-full object-cover" loading="lazy" decoding="async" width="160" height="120" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    {selected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                        <Icon name="Check" size={10} className="text-black" strokeWidth={3} />
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="font-bold text-[10px] text-white leading-tight truncate">{t.short}</p>
                      <p className="text-[10px] text-accent font-black leading-tight">{t.price.toLocaleString("ru")} ₽/ч</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Раскрывающийся полный список */}
        {truckListOpen && (
          <div className="rounded-xl border-2 border-accent/20 bg-background/60 overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto custom-scroll">
              {filtered.map((t) => {
                const i = trucks.indexOf(t);
                const selected = truckIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setTruckIdx(i);
                      setTruckListOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 text-left border-b border-accent/5 last:border-0 transition-colors ${
                      selected ? "bg-accent/15" : "hover:bg-accent/5"
                    }`}
                  >
                    <img src={t.image} alt={t.short} className="w-14 h-11 object-cover rounded-md flex-shrink-0 bg-black/30" loading="lazy" decoding="async" width="56" height="44" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${selected ? "text-white" : "text-foreground/90"}`}>{t.name}</p>
                      <div className="flex flex-wrap gap-x-2 text-[10px] text-muted-foreground">
                        <span>{t.capacity}</span>
                        {t.boom && <span>· {t.boom}</span>}
                        {t.highlight && <span className="text-accent">· {t.highlight}</span>}
                      </div>
                    </div>
                    <span className="text-xs font-black text-accent tabular-nums flex-shrink-0">
                      {t.price.toLocaleString("ru")} ₽/ч
                    </span>
                    {selected && <Icon name="Check" size={14} className="text-accent flex-shrink-0" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalculatorTaskAndTruck;