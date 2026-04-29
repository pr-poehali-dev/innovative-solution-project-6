import Icon from "@/components/ui/icon";
import { cities, Truck } from "./data";

type Props = {
  hours: number;
  setHours: (h: number) => void;
  cityIdx: number;
  setCityIdx: (i: number) => void;
  cityListOpen: boolean;
  setCityListOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  citySearch: string;
  setCitySearch: (s: string) => void;
  customCity: string;
  setCustomCity: (s: string) => void;
  withRigger: boolean;
  setWithRigger: (b: boolean) => void;
  showCheck: boolean;
  setShowCheck: (b: boolean | ((p: boolean) => boolean)) => void;
  truck: Truck;
  baseTotal: number;
  citySurcharge: number;
  riggerPrice: number;
  finalTotal: number;
  cityLabel: string;
  isCustomCity: boolean;
  city: { name: string; hours: number };
  onOrder: () => void;
};

const CalculatorOptionsAndTotal = ({
  hours,
  setHours,
  cityIdx,
  setCityIdx,
  cityListOpen,
  setCityListOpen,
  citySearch,
  setCitySearch,
  customCity,
  setCustomCity,
  withRigger,
  setWithRigger,
  showCheck,
  setShowCheck,
  truck,
  baseTotal,
  citySurcharge,
  riggerPrice,
  finalTotal,
  cityLabel,
  isCustomCity,
  city,
  onOrder,
}: Props) => {
  return (
    <>
      {/* Шаг 3: Часы */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-accent text-black text-[10px] font-black flex items-center justify-center">3</span>
          Сколько часов нужна техника?
        </p>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} className="text-accent" />
            <span>Часов работы</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-accent font-black text-2xl sm:text-3xl tabular-nums">{hours}</span>
            <span className="text-accent/70 text-sm">ч</span>
          </div>
        </div>
        <input
          type="range"
          min={4}
          max={24}
          step={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[hsl(var(--accent))]"
          style={{
            background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) ${((hours - 4) / 20) * 100}%, hsl(var(--accent) / 0.2) 100%)`,
          }}
        />
        <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
          <span>4 ч</span>
          <span>8 ч</span>
          <span>16 ч</span>
          <span>24 ч</span>
        </div>

        <div className="flex gap-2 mt-3">
          {[4, 8, 12, 24].map((h) => (
            <button
              key={h}
              onClick={() => setHours(h)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                hours === h
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-background/40 border border-accent/10 text-muted-foreground hover:border-accent/30"
              }`}
            >
              {h} ч
            </button>
          ))}
        </div>
      </div>

      {/* Город */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
          <Icon name="MapPin" size={14} className="text-accent" />
          Куда подать технику?
          <span className="ml-auto text-[10px] text-muted-foreground/70 font-normal hidden sm:inline">
            выезд по тарифу техники
          </span>
        </p>

        {/* Текущий выбор + поиск */}
        <button
          type="button"
          onClick={() => setCityListOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 p-3 rounded-xl border-2 border-accent/40 bg-accent/10 hover:border-accent transition-all"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="MapPin" size={16} className="text-accent flex-shrink-0" />
            <div className="min-w-0 text-left">
              <p className="text-xs text-muted-foreground leading-none mb-1">Город подачи</p>
              <p className="text-sm font-bold text-white truncate">{cityLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-black tabular-nums ${
              isCustomCity ? "text-amber-300" : citySurcharge === 0 ? "text-emerald-400" : "text-accent"
            }`}>
              {isCustomCity ? "по запросу" : citySurcharge === 0 ? "бесплатно" : `+${citySurcharge.toLocaleString("ru")} ₽`}
            </span>
            <Icon name={cityListOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-accent" />
          </div>
        </button>

        {/* Быстрые чипы — топ 6 ближайших */}
        {!cityListOpen && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setCityIdx(i)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  cityIdx === i
                    ? "bg-accent text-black"
                    : "bg-background/40 border border-accent/20 text-muted-foreground hover:border-accent/50 hover:text-white"
                }`}
              >
                {cities[i].name}
              </button>
            ))}
            <button
              onClick={() => setCityListOpen(true)}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/40 border border-accent/20 text-accent hover:border-accent transition-all"
            >
              ещё {cities.length - 6}+
            </button>
          </div>
        )}

        {/* Раскрывающийся список с поиском */}
        {cityListOpen && (
          <div className="mt-2 rounded-xl border-2 border-accent/20 bg-background/60 overflow-hidden">
            <div className="p-2 border-b border-accent/10">
              <div className="relative">
                <Icon name="Search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Поиск города…"
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-background/60 border border-accent/20 focus:border-accent text-sm text-white placeholder:text-muted-foreground/50 outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-[240px] overflow-y-auto custom-scroll">
              {cities
                .map((c, i) => ({ c, i }))
                .filter(({ c }) =>
                  c.name.toLowerCase().includes(citySearch.toLowerCase().trim())
                )
                .map(({ c, i }) => {
                  const surcharge = Math.round(c.hours * truck.price);
                  const isOther = c.name === "Другой город";
                  const selected = cityIdx === i;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setCityIdx(i);
                        setCityListOpen(false);
                        setCitySearch("");
                      }}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left border-b border-accent/5 last:border-0 transition-colors ${
                        selected ? "bg-accent/15" : "hover:bg-accent/5"
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        {selected && <Icon name="Check" size={12} className="text-accent flex-shrink-0" strokeWidth={3} />}
                        <span className={`text-xs font-semibold truncate ${selected ? "text-white" : "text-foreground/80"}`}>
                          {c.name}
                        </span>
                      </span>
                      <span className={`text-[11px] font-bold tabular-nums flex-shrink-0 ${
                        isOther ? "text-amber-300" : c.hours === 0 ? "text-emerald-400" : "text-accent/80"
                      }`}>
                        {isOther
                          ? "по запросу"
                          : c.hours === 0
                          ? "бесплатно"
                          : `+${surcharge.toLocaleString("ru")} ₽`}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {isCustomCity && (
          <div className="mt-3">
            <label className="block">
              <span className="text-[11px] text-muted-foreground mb-1.5 block">Введите название города или адрес</span>
              <input
                type="text"
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                placeholder="Например: Лысково, Сергач, посёлок Афонино"
                className="w-full px-3 py-2.5 rounded-lg bg-background/40 border-2 border-accent/20 focus:border-accent text-sm text-white placeholder:text-muted-foreground/50 outline-none transition-colors"
              />
            </label>
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
              <Icon name="Info" size={10} className="text-accent" />
              Стоимость выезда уточните у менеджера
            </p>
          </div>
        )}
      </div>

      {/* Доп. услуги */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 font-medium flex items-center gap-2">
          <Icon name="PlusCircle" size={14} className="text-accent" />
          Дополнительные опции
        </p>
        <div className="grid grid-cols-1 gap-2">
          <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
            withRigger ? "border-accent bg-accent/10" : "border-accent/10 bg-background/30 hover:border-accent/30"
          }`}>
            <input type="checkbox" checked={withRigger} onChange={(e) => setWithRigger(e.target.checked)} className="sr-only" />
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
              withRigger ? "bg-accent border-accent" : "border-accent/40"
            }`}>
              {withRigger && <Icon name="Check" size={12} className="text-black" strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Icon name="HardHat" size={12} className="text-accent" />
                Стропальщик
              </p>
              <p className="text-[10px] text-muted-foreground">Помощь со строповкой груза</p>
            </div>
            <span className="text-xs font-black text-accent">+2 500 ₽/ч</span>
          </label>
        </div>
      </div>

      {/* Чек */}
      <button
        type="button"
        onClick={() => setShowCheck((v) => !v)}
        className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-accent transition-colors mb-3"
      >
        <span className="flex items-center gap-1.5">
          <Icon name="ReceiptText" size={12} />
          Детальный чек
        </span>
        <Icon name={showCheck ? "ChevronUp" : "ChevronDown"} size={14} />
      </button>
      {showCheck && (
        <div className="mb-4 p-3 rounded-lg bg-background/40 border border-accent/10 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{truck.short} × {hours} ч</span>
            <span className="font-bold tabular-nums">{baseTotal.toLocaleString("ru")} ₽</span>
          </div>
          {citySurcharge > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Выезд в «{cityLabel}» ({city.hours} ч × {truck.price.toLocaleString("ru")} ₽)</span>
              <span className="font-bold tabular-nums">+{citySurcharge.toLocaleString("ru")} ₽</span>
            </div>
          )}
          {isCustomCity && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Выезд в «{cityLabel}»</span>
              <span className="font-bold tabular-nums text-amber-300">по запросу</span>
            </div>
          )}
          {withRigger && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стропальщик × {hours} ч</span>
              <span className="font-bold tabular-nums">+{riggerPrice.toLocaleString("ru")} ₽</span>
            </div>
          )}
          <div className="flex justify-between pt-1.5 border-t border-accent/10 text-accent">
            <span className="font-bold">Итого</span>
            <span className="font-black tabular-nums">{finalTotal.toLocaleString("ru")} ₽</span>
          </div>
        </div>
      )}

      {/* Итог */}
      <div className="border-t border-accent/10 pt-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
          <div className="flex-1">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1 flex items-center gap-1.5">
              <Icon name="Calculator" size={12} className="text-accent" />
              Итоговая стоимость
            </p>
            <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent tabular-nums">
              {finalTotal.toLocaleString("ru")} ₽
            </p>
            <p className="text-muted-foreground text-xs mt-1.5">
              {truck.price.toLocaleString("ru")} ₽/час × {hours} ч · с НДС · Нал/Безнал
            </p>
          </div>

          <button
            onClick={onOrder}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-accent via-amber-400 to-accent text-black rounded-xl font-black text-sm sm:text-base hover:shadow-2xl hover:shadow-accent/40 transition-all overflow-hidden active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <span className="relative flex flex-col items-start leading-tight">
              <span className="text-[10px] opacity-70 font-bold tracking-wider">ЗАКАЗАТЬ ЗА</span>
              <span className="text-base sm:text-lg">{finalTotal.toLocaleString("ru")} ₽</span>
            </span>
            <Icon name="ArrowRight" size={18} className="relative group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-5 pt-5 border-t border-accent/10 text-[11px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Icon name="ShieldCheck" size={12} className="text-accent" /> Договор
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="UserCheck" size={12} className="text-accent" /> Оператор включён
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Zap" size={12} className="text-accent" /> Подача от 1 часа
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="CreditCard" size={12} className="text-accent" /> Нал/безнал/карта
          </span>
        </div>
      </div>
    </>
  );
};

export default CalculatorOptionsAndTotal;
