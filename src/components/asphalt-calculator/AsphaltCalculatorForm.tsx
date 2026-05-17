import Icon from "@/components/ui/icon";
import {
  type WorkType,
  type Thickness,
  type Base,
  type Extras,
  workOptions,
  thicknessOptions,
  baseOptions,
  fmt,
} from "./asphaltCalculatorData";

interface AsphaltCalculatorFormProps {
  light: boolean;
  work: WorkType;
  setWork: (w: WorkType) => void;
  length: number;
  setLength: (n: number) => void;
  width: number;
  setWidth: (n: number) => void;
  thickness: Thickness;
  setThickness: (t: Thickness) => void;
  base: Base;
  setBase: (b: Base) => void;
  extras: Extras;
  setExtras: React.Dispatch<React.SetStateAction<Extras>>;
  urgent: boolean;
  setUrgent: (b: boolean) => void;
  area: number;
}

const AsphaltCalculatorForm = ({
  light,
  work,
  setWork,
  length,
  setLength,
  width,
  setWidth,
  thickness,
  setThickness,
  base,
  setBase,
  extras,
  setExtras,
  urgent,
  setUrgent,
  area,
}: AsphaltCalculatorFormProps) => {
  return (
    <div
      className={`rounded-3xl border-2 p-5 sm:p-8 space-y-6 ${
        light
          ? "border-amber-300 bg-white/90 shadow-xl shadow-amber-300/30"
          : "border-accent/30 bg-card/60 backdrop-blur-sm"
      }`}
    >
      {/* Work type */}
      <div>
        <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
          1. Тип работ
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {workOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setWork(opt.id)}
              className={`group p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                work === opt.id
                  ? light
                    ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg shadow-amber-400/30"
                    : "border-accent bg-accent/15 shadow-lg shadow-accent/20"
                  : light
                    ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                    : "border-accent/20 bg-card/40 hover:border-accent/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon
                  name={opt.icon}
                  size={18}
                  className={
                    work === opt.id
                      ? light ? "text-orange-600" : "text-accent"
                      : light ? "text-slate-500" : "text-white/60"
                  }
                />
                <span className={`font-bold text-sm ${light ? "text-slate-900" : ""}`}>{opt.title}</span>
              </div>
              <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>
                {opt.subtitle}
              </div>
              <div className={`text-[11px] font-bold mt-1 ${light ? "text-orange-600" : "text-accent"}`}>
                от {opt.pricePerM2} ₽/м²
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
          2. Размеры участка
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className={`text-xs mb-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>Длина, м</div>
            <div className="relative">
              <input
                type="number"
                min={0}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none font-bold text-lg transition-colors ${
                  light
                    ? "bg-amber-50 border-amber-300 focus:border-amber-500 text-slate-900"
                    : "bg-black/40 border-accent/20 focus:border-accent text-white"
                }`}
              />
              <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${light ? "text-slate-500" : "text-muted-foreground"}`}>
                м
              </span>
            </div>
          </div>
          <div>
            <div className={`text-xs mb-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>Ширина, м</div>
            <div className="relative">
              <input
                type="number"
                min={0}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none font-bold text-lg transition-colors ${
                  light
                    ? "bg-amber-50 border-amber-300 focus:border-amber-500 text-slate-900"
                    : "bg-black/40 border-accent/20 focus:border-accent text-white"
                }`}
              />
              <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${light ? "text-slate-500" : "text-muted-foreground"}`}>
                м
              </span>
            </div>
          </div>
        </div>
        <div className={`mt-3 flex items-center justify-between px-4 py-2.5 rounded-xl border ${
          light
            ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300"
            : "bg-accent/10 border-accent/30"
        }`}>
          <span className={`text-xs sm:text-sm ${light ? "text-slate-700 font-semibold" : "text-muted-foreground"}`}>
            Площадь:
          </span>
          <span className={`font-black text-base sm:text-lg ${light ? "text-orange-600" : "text-accent"}`}>
            {fmt(area)} м²
          </span>
        </div>
      </div>

      {/* Thickness */}
      {work !== "patch" && (
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
            3. Толщина слоя асфальта
          </label>
          <div className="grid grid-cols-4 gap-2">
            {thicknessOptions.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setThickness(t.value)}
                className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                  thickness === t.value
                    ? light
                      ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600"
                      : "border-accent bg-accent/15 text-accent"
                    : light
                      ? "border-amber-200 bg-amber-50/50 hover:border-amber-400 text-slate-700"
                      : "border-accent/20 bg-card/40 hover:border-accent/50 text-white/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className={`text-[11px] mt-2 flex items-start gap-1.5 ${light ? "text-slate-600" : "text-muted-foreground"}`}>
            <Icon name="Info" size={11} className={`mt-0.5 flex-shrink-0 ${light ? "text-amber-600" : "text-accent"}`} />
            <span>
              4-5 см — для дворов и пешеходных зон. 7-10 см — для парковок и проездов грузовиков.
            </span>
          </p>
        </div>
      )}

      {/* Base */}
      {work !== "patch" && (
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
            4. Подготовка основания
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {baseOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBase(opt.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  base === opt.value
                    ? light
                      ? "border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100"
                      : "border-accent bg-accent/15"
                    : light
                      ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                      : "border-accent/20 bg-card/40 hover:border-accent/50"
                }`}
              >
                <div className={`font-bold text-sm mb-0.5 ${light ? "text-slate-900" : ""}`}>{opt.title}</div>
                <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>{opt.subtitle}</div>
                {opt.addPerM2 > 0 && (
                  <div className={`text-[11px] font-bold mt-1 ${light ? "text-orange-600" : "text-accent"}`}>
                    +{opt.addPerM2} ₽/м²
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extras */}
      <div>
        <label className={`block text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider ${light ? "text-slate-900" : "text-white/80"}`}>
          {work === "patch" ? "3. Дополнительно" : "5. Дополнительно"}
        </label>
        <div className="space-y-2">
          {[
            {
              key: "removal" as const,
              title: "Срезка старого асфальта",
              sub: "Фрезерование + вывоз",
              price: "+90 ₽/м²",
            },
            {
              key: "curb" as const,
              title: "Установка бордюров",
              sub: "По периметру участка",
              price: "+550 ₽/п.м",
            },
            {
              key: "marking" as const,
              title: "Дорожная разметка",
              sub: "Парковочные места и стрелки",
              price: "+35 ₽/м²",
            },
          ].map((item) => (
            <label
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                extras[item.key]
                  ? light
                    ? "border-amber-500 bg-gradient-to-r from-amber-100 to-orange-100"
                    : "border-accent bg-accent/10"
                  : light
                    ? "border-amber-200 bg-amber-50/50 hover:border-amber-400"
                    : "border-accent/20 bg-card/40 hover:border-accent/40"
              }`}
            >
              <input
                type="checkbox"
                checked={extras[item.key]}
                onChange={(e) =>
                  setExtras((p) => ({ ...p, [item.key]: e.target.checked }))
                }
                className="sr-only"
              />
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  extras[item.key]
                    ? light
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500"
                      : "bg-accent border-accent"
                    : light
                      ? "border-amber-400 bg-white"
                      : "border-accent/40 bg-transparent"
                }`}
              >
                {extras[item.key] && (
                  <Icon name="Check" size={14} className="text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm ${light ? "text-slate-900" : ""}`}>{item.title}</div>
                <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>{item.sub}</div>
              </div>
              <span className={`text-xs font-bold whitespace-nowrap ${light ? "text-orange-600" : "text-accent"}`}>
                {item.price}
              </span>
            </label>
          ))}

          <label
            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              urgent
                ? light ? "border-red-500 bg-red-50" : "border-red-500/60 bg-red-500/10"
                : light ? "border-amber-200 bg-amber-50/50 hover:border-amber-400" : "border-accent/20 bg-card/40 hover:border-accent/40"
            }`}
          >
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                urgent ? "bg-red-500 border-red-500" : light ? "border-amber-400 bg-white" : "border-accent/40 bg-transparent"
              }`}
            >
              {urgent && <Icon name="Check" size={14} className="text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-bold text-sm flex items-center gap-1.5 ${light ? "text-slate-900" : ""}`}>
                <span>🔥</span> Срочный заказ
              </div>
              <div className={`text-[11px] ${light ? "text-slate-600" : "text-muted-foreground"}`}>
                Выезд в течение 24 часов
              </div>
            </div>
            <span className={`text-xs font-bold whitespace-nowrap ${light ? "text-red-600" : "text-red-400"}`}>
              +15%
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AsphaltCalculatorForm;
