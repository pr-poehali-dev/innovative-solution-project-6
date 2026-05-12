import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

type Weather = {
  temp: number;
  code: number;
  wind: number;
  daily: { day: string; tMin: number; tMax: number; code: number }[];
};

const codeToEmoji = (code: number): { emoji: string; label: string } => {
  if (code === 0) return { emoji: "☀️", label: "Ясно" };
  if (code === 1) return { emoji: "🌤", label: "Малооблачно" };
  if (code === 2) return { emoji: "⛅", label: "Облачно" };
  if (code === 3) return { emoji: "☁️", label: "Пасмурно" };
  if (code <= 48) return { emoji: "🌫", label: "Туман" };
  if (code <= 57) return { emoji: "🌦", label: "Морось" };
  if (code <= 67) return { emoji: "🌧", label: "Дождь" };
  if (code <= 77) return { emoji: "🌨", label: "Снег" };
  if (code <= 82) return { emoji: "⛈", label: "Ливень" };
  if (code <= 86) return { emoji: "❄️", label: "Снегопад" };
  return { emoji: "🌩", label: "Гроза" };
};

const workAdvice = (code: number, wind: number): { text: string; tone: "ok" | "warn" } => {
  if (code >= 95) return { text: "Гроза — работа люльки невозможна", tone: "warn" };
  if (wind >= 15) return { text: "Сильный ветер — люлька ограничена", tone: "warn" };
  if (code >= 71 && code <= 77) return { text: "Снег — закладывайте +15 мин на дорогу", tone: "warn" };
  if (code >= 61 && code <= 67) return { text: "Дождь — грунт может быть мягким", tone: "warn" };
  return { text: "Погода для работ техники подходит", tone: "ok" };
};

const dayName = (iso: string, short = false) => {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return short ? "Сег" : "Сегодня";
  const tom = new Date();
  tom.setDate(today.getDate() + 1);
  if (d.toDateString() === tom.toDateString()) return short ? "Завт" : "Завтра";
  return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()];
};

const WeatherWidget = () => {
  const [w, setW] = useState<Weather | null>(null);
  const [err, setErr] = useState(false);
  const [range, setRange] = useState<3 | 7>(3);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=56.3287&longitude=44.002&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow&forecast_days=7";
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
      <section className="py-4 sm:py-10 bg-black/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 animate-pulse h-20 sm:h-32" />
        </div>
      </section>
    );
  }

  const current = codeToEmoji(w.code);
  const advice = workAdvice(w.code, w.wind);

  return (
    <section className="py-4 sm:py-10 bg-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-sky-950/40 via-black/60 to-accent/5 backdrop-blur-sm overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          {/* МОБИЛЬНАЯ компактная версия */}
          <div className="sm:hidden">
            <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/10">
              <span className="text-3xl leading-none drop-shadow-[0_2px_8px_rgba(245,208,96,0.3)]">{current.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-display font-black text-white leading-none">
                    {w.temp > 0 ? "+" : ""}{w.temp}°
                  </span>
                  <span className="text-[11px] text-white/70 truncate">{current.label}</span>
                </div>
                <div className="text-[10px] text-white/50 mt-0.5 flex items-center gap-1">
                  <span>Нижний Новгород</span>
                  <span className="text-white/30">·</span>
                  <span>ветер {w.wind} м/с</span>
                </div>
              </div>
            </div>
            {/* Переключатель 3/7 на мобиле */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-black/20">
              <span className="text-[9px] uppercase tracking-wider text-white/50 font-semibold">Прогноз</span>
              <div className="inline-flex p-0.5 rounded-md bg-white/5 border border-white/10">
                <button
                  onClick={() => setRange(3)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                    range === 3 ? "bg-accent text-black" : "text-white/60"
                  }`}
                >
                  3 дня
                </button>
                <button
                  onClick={() => setRange(7)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                    range === 7 ? "bg-accent text-black" : "text-white/60"
                  }`}
                >
                  7 дней
                </button>
              </div>
            </div>
            {range === 3 ? (
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {w.daily.slice(0, 3).map((d, i) => {
                  const ic = codeToEmoji(d.code);
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5 py-2 px-1">
                      <div className="text-[10px] font-semibold text-white/60 uppercase">{d.day}</div>
                      <span className="text-xl leading-none">{ic.emoji}</span>
                      <div className="text-[11px] text-white leading-none">
                        <span className="font-bold">{d.tMax > 0 ? "+" : ""}{d.tMax}°</span>
                        <span className="text-white/40"> {d.tMin > 0 ? "+" : ""}{d.tMin}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-7 divide-x divide-white/10">
                {w.daily.slice(0, 7).map((d, i) => {
                  const ic = codeToEmoji(d.code);
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5 py-2 px-0.5">
                      <div className="text-[9px] font-semibold text-white/60 uppercase">{d.day}</div>
                      <span className="text-base leading-none">{ic.emoji}</span>
                      <div className="text-[9px] text-white leading-none text-center">
                        <div className="font-bold">{d.tMax > 0 ? "+" : ""}{d.tMax}°</div>
                        <div className="text-white/40">{d.tMin > 0 ? "+" : ""}{d.tMin}°</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 ${
                advice.tone === "warn"
                  ? "bg-amber-500/10 text-amber-200"
                  : "bg-green-500/10 text-green-200"
              }`}
            >
              <Icon name={advice.tone === "warn" ? "AlertCircle" : "CheckCircle2"} size={11} />
              <span className="text-[10px] font-medium leading-tight">{advice.text}</span>
            </div>
          </div>

          {/* ДЕСКТОПНАЯ версия */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-[auto_1fr] gap-6 p-6">
              <div className="flex items-center gap-4 pr-6 border-r border-white/10">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl drop-shadow-[0_4px_12px_rgba(245,208,96,0.4)]">{current.emoji}</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">
                    Нижний Новгород · сейчас
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-black text-white leading-none">
                      {w.temp > 0 ? "+" : ""}{w.temp}°
                    </span>
                    <span className="text-base text-white/70">{current.label}</span>
                  </div>
                  <div className="text-xs text-white/60 mt-2 flex items-center gap-1.5">
                    <span className="inline-block w-1 h-1 rounded-full bg-accent" />
                    ветер {w.wind} м/с
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">Прогноз погоды</span>
                  <div className="inline-flex p-1 rounded-lg bg-white/5 border border-white/10">
                    <button
                      onClick={() => setRange(3)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                        range === 3 ? "bg-accent text-black shadow" : "text-white/60 hover:text-white"
                      }`}
                    >
                      3 дня
                    </button>
                    <button
                      onClick={() => setRange(7)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                        range === 7 ? "bg-accent text-black shadow" : "text-white/60 hover:text-white"
                      }`}
                    >
                      7 дней
                    </button>
                  </div>
                </div>
                <div className={`grid gap-2 sm:gap-3 ${range === 3 ? "grid-cols-3" : "grid-cols-7"}`}>
                  {w.daily.slice(0, range).map((d, i) => {
                    const ic = codeToEmoji(d.code);
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-white/[0.07] transition-colors"
                      >
                        <div className="text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wide">{d.day}</div>
                        <span className={`leading-none ${range === 3 ? "text-3xl" : "text-2xl"}`}>{ic.emoji}</span>
                        <div className={`text-white leading-tight text-center ${range === 3 ? "text-sm" : "text-xs"}`}>
                          <span className="font-bold text-accent">{d.tMax > 0 ? "+" : ""}{d.tMax}°</span>
                          <span className="text-white/40"> / {d.tMin > 0 ? "+" : ""}{d.tMin}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-6 py-2.5 border-t ${
                advice.tone === "warn"
                  ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
                  : "border-green-400/20 bg-green-500/10 text-green-200"
              }`}
            >
              <Icon name={advice.tone === "warn" ? "AlertCircle" : "CheckCircle2"} size={14} />
              <span className="text-xs font-medium">{advice.text}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;