import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

type Weather = {
  temp: number;
  code: number;
  wind: number;
  daily: { day: string; tMin: number; tMax: number; code: number }[];
};

const codeToIcon = (code: number): { icon: string; label: string } => {
  if (code === 0) return { icon: "Sun", label: "Ясно" };
  if (code <= 3) return { icon: "CloudSun", label: "Облачно" };
  if (code <= 48) return { icon: "CloudFog", label: "Туман" };
  if (code <= 57) return { icon: "CloudDrizzle", label: "Морось" };
  if (code <= 67) return { icon: "CloudRain", label: "Дождь" };
  if (code <= 77) return { icon: "CloudSnow", label: "Снег" };
  if (code <= 82) return { icon: "CloudRainWind", label: "Ливень" };
  if (code <= 86) return { icon: "Snowflake", label: "Снегопад" };
  return { icon: "CloudLightning", label: "Гроза" };
};

const workAdvice = (code: number, wind: number): { text: string; tone: "ok" | "warn" } => {
  if (code >= 95) return { text: "Гроза — работа люльки невозможна", tone: "warn" };
  if (wind >= 15) return { text: "Сильный ветер — люлька ограничена", tone: "warn" };
  if (code >= 71 && code <= 77) return { text: "Снег — закладывайте +15 мин на дорогу", tone: "warn" };
  if (code >= 61 && code <= 67) return { text: "Дождь — грунт может быть мягким", tone: "warn" };
  return { text: "Погода для работ техники подходит", tone: "ok" };
};

const dayName = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Сегодня";
  const tom = new Date();
  tom.setDate(today.getDate() + 1);
  if (d.toDateString() === tom.toDateString()) return "Завтра";
  return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()];
};

const WeatherWidget = () => {
  const [w, setW] = useState<Weather | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=56.3287&longitude=44.002&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow&forecast_days=4";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const daily = (data.daily?.time || []).map((t: string, i: number) => ({
          day: dayName(t),
          tMin: Math.round(data.daily.temperature_2m_min[i]),
          tMax: Math.round(data.daily.temperature_2m_max[i]),
          code: data.daily.weather_code[i],
        }));
        setW({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          wind: Math.round(data.current.wind_speed_10m),
          daily,
        });
      })
      .catch(() => setErr(true));
  }, []);

  if (err || !w) {
    return (
      <section className="py-6 sm:py-10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 animate-pulse h-24" />
        </div>
      </section>
    );
  }

  const current = codeToIcon(w.code);
  const advice = workAdvice(w.code, w.wind);

  return (
    <section className="py-6 sm:py-10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-black/60 via-black/40 to-accent/5 backdrop-blur-sm overflow-hidden">
          <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 p-4 sm:p-6">
            {/* Сейчас */}
            <div className="flex items-center gap-3 sm:gap-4 sm:pr-6 sm:border-r sm:border-white/10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Icon name={current.icon} size={32} className="text-accent" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 font-semibold mb-0.5">
                  Нижний Новгород · сейчас
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white leading-none">
                    {w.temp > 0 ? "+" : ""}{w.temp}°
                  </span>
                  <span className="text-sm text-white/70">{current.label}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-white/60 mt-1 flex items-center gap-1">
                  <Icon name="Wind" size={11} /> ветер {w.wind} м/с
                </div>
              </div>
            </div>

            {/* Прогноз 4 дня */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {w.daily.slice(0, 4).map((d, i) => {
                const ic = codeToIcon(d.code);
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-[10px] sm:text-xs font-semibold text-white/80">{d.day}</div>
                    <Icon name={ic.icon} size={22} className="text-accent" />
                    <div className="text-[11px] sm:text-sm text-white leading-tight text-center">
                      <span className="font-bold">{d.tMax > 0 ? "+" : ""}{d.tMax}°</span>
                      <span className="text-white/50"> / {d.tMin > 0 ? "+" : ""}{d.tMin}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Совет для клиента */}
          <div
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 border-t ${
              advice.tone === "warn"
                ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
                : "border-green-400/20 bg-green-500/10 text-green-200"
            }`}
          >
            <Icon name={advice.tone === "warn" ? "AlertTriangle" : "CheckCircle2"} size={14} />
            <span className="text-[11px] sm:text-xs font-medium">{advice.text}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
