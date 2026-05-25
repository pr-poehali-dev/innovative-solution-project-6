import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

type DayForecast = {
  day: string;
  tMin: number;
  tMax: number;
  code: number;
  weekend: boolean;
  windMax: number;
  gust: number;
};

type Weather = {
  temp: number;
  code: number;
  wind: number;
  gust: number;
  sunrise: string;
  sunset: string;
  daily: DayForecast[];
};

type AdviceLevel = "ok" | "warn" | "danger";
type Advice = { level: AdviceLevel; text: string; short: string; emoji: string };

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

// Светофор условий для работы манипулятора по ГОСТ 12.3.020-80
// Красный: работа запрещена; Жёлтый: ограничения; Зелёный: норма
const workAdvice = (code: number, wind: number, gust: number, tMin: number): Advice => {
  // ОПАСНО (красный)
  if (code >= 95) return { level: "danger", text: "Гроза — работа со стрелой запрещена по ГОСТ", short: "Опасно: гроза", emoji: "⛔" };
  if (gust >= 18 || wind >= 15) return { level: "danger", text: `Опасный ветер ${gust} м/с — работа стрелы запрещена`, short: "Опасный ветер", emoji: "⛔" };
  if (tMin <= -25) return { level: "danger", text: "Мороз ниже −25° — гидравлика техники работает с риском", short: "Сильный мороз", emoji: "❄️" };
  if (code >= 82 && code <= 86) return { level: "danger", text: "Ливень/снегопад — выезд возможен, но люлька запрещена", short: "Сильные осадки", emoji: "⚠️" };

  // ОСТОРОЖНО (жёлтый)
  if (wind >= 10 || gust >= 12) return { level: "warn", text: `Сильный ветер ${wind} м/с — высотные работы с осторожностью`, short: "Сильный ветер", emoji: "💨" };
  if (code >= 71 && code <= 77) return { level: "warn", text: "Снег — закладывайте +15 мин на дорогу, гололёд возможен", short: "Снег", emoji: "🌨" };
  if (code >= 61 && code <= 67) return { level: "warn", text: "Дождь — грунт размокает, нужна техника-вездеход", short: "Дождь", emoji: "🌧" };
  if (code >= 45 && code <= 48) return { level: "warn", text: "Туман — видимость снижена, осторожнее на дороге", short: "Туман", emoji: "🌫" };
  if (tMin <= -15) return { level: "warn", text: "Мороз — берём подогретые стропы, время выезда +20 мин", short: "Мороз", emoji: "🥶" };

  // ИДЕАЛЬНО (зелёный)
  return { level: "ok", text: "Идеальные условия для работы манипулятора", short: "Идеально", emoji: "✅" };
};

// Форматирует время вида "2026-05-25T05:23" → "05:23"
const formatTime = (iso: string): string => {
  if (!iso) return "—";
  const part = iso.split("T")[1];
  return part ? part.slice(0, 5) : "—";
};

// Сколько часов светового дня
const calcDaylight = (sunrise: string, sunset: string): string => {
  if (!sunrise || !sunset) return "—";
  const r = new Date(sunrise);
  const s = new Date(sunset);
  const diff = (s.getTime() - r.getTime()) / 1000 / 60;
  const h = Math.floor(diff / 60);
  const m = Math.round(diff % 60);
  return `${h} ч ${m} мин`;
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
      "https://api.open-meteo.com/v1/forecast?latitude=56.3287&longitude=44.002&current=temperature_2m,weather_code,wind_speed_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset&timezone=Europe%2FMoscow&forecast_days=7";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const daily: DayForecast[] = (data.daily?.time || []).map((t: string, i: number) => {
          const dow = new Date(t).getDay();
          return {
            day: dayName(t),
            tMin: Math.round(data.daily.temperature_2m_min[i]),
            tMax: Math.round(data.daily.temperature_2m_max[i]),
            code: data.daily.weather_code[i],
            weekend: dow === 0 || dow === 6,
            windMax: Math.round(data.daily.wind_speed_10m_max?.[i] ?? 0),
            gust: Math.round(data.daily.wind_gusts_10m_max?.[i] ?? 0),
          };
        });
        setW({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          wind: Math.round(data.current.wind_speed_10m),
          gust: Math.round(data.current.wind_gusts_10m ?? 0),
          sunrise: data.daily.sunrise?.[0] ?? "",
          sunset: data.daily.sunset?.[0] ?? "",
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
  const todayTMin = w.daily[0]?.tMin ?? w.temp;
  const advice = workAdvice(w.code, w.wind, w.gust, todayTMin);
  const sunriseTime = formatTime(w.sunrise);
  const sunsetTime = formatTime(w.sunset);
  const daylight = calcDaylight(w.sunrise, w.sunset);

  // Цвета для светофора условий
  const levelColors: Record<AdviceLevel, { ring: string; bg: string; text: string; dot: string }> = {
    ok: { ring: "border-emerald-400/40", bg: "bg-emerald-500/15", text: "text-emerald-300", dot: "bg-emerald-400" },
    warn: { ring: "border-amber-400/40", bg: "bg-amber-500/15", text: "text-amber-300", dot: "bg-amber-400" },
    danger: { ring: "border-red-400/40", bg: "bg-red-500/15", text: "text-red-300", dot: "bg-red-400" },
  };

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
                <div className="text-[10px] text-white/55 mt-0.5 flex items-center gap-1 flex-wrap">
                  <span>Нижний Новгород</span>
                  <span className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-0.5">
                    <Icon name="Wind" size={9} className="text-accent" />
                    {w.wind}{w.gust > w.wind ? `–${w.gust}` : ""} м/с
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-0.5">
                    <Icon name="Sunset" size={9} className="text-accent" />
                    {sunsetTime}
                  </span>
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
                  const dayAdvice = workAdvice(d.code, d.windMax, d.gust, d.tMin);
                  const c = levelColors[dayAdvice.level];
                  return (
                    <div
                      key={i}
                      className={`relative flex flex-col items-center gap-0.5 py-2 px-1 ${
                        d.weekend ? "bg-accent/[0.08]" : ""
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-1.5 h-1.5 rounded-full ${c.dot} shadow-[0_0_6px_currentColor]`} title={dayAdvice.short} />
                      {d.weekend && (
                        <Icon name="Star" size={8} className="absolute top-1 right-1 text-accent fill-accent" />
                      )}
                      <div className={`text-[10px] font-semibold uppercase ${d.weekend ? "text-accent" : "text-white/60"}`}>{d.day}</div>
                      <span className="text-xl leading-none">{ic.emoji}</span>
                      <div className="text-[11px] text-white leading-none">
                        <span className={`font-bold ${d.weekend ? "text-accent" : ""}`}>{d.tMax > 0 ? "+" : ""}{d.tMax}°</span>
                        <span className="text-white/40"> {d.tMin > 0 ? "+" : ""}{d.tMin}°</span>
                      </div>
                      <div className="inline-flex items-center gap-0.5 text-[9px] text-white/55 leading-none mt-0.5">
                        <Icon name="Wind" size={7} className="text-accent/70" />
                        {d.windMax}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-7 divide-x divide-white/10">
                {w.daily.slice(0, 7).map((d, i) => {
                  const ic = codeToEmoji(d.code);
                  const dayAdvice = workAdvice(d.code, d.windMax, d.gust, d.tMin);
                  const c = levelColors[dayAdvice.level];
                  return (
                    <div
                      key={i}
                      className={`relative flex flex-col items-center gap-0.5 py-2 px-0.5 ${
                        d.weekend ? "bg-accent/[0.08]" : ""
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-1.5 h-1.5 rounded-full ${c.dot} shadow-[0_0_6px_currentColor]`} title={dayAdvice.short} />
                      <div className={`text-[9px] font-semibold uppercase ${d.weekend ? "text-accent" : "text-white/60"}`}>{d.day}</div>
                      <span className="text-base leading-none">{ic.emoji}</span>
                      <div className="text-[9px] text-white leading-none text-center">
                        <div className={`font-bold ${d.weekend ? "text-accent" : ""}`}>{d.tMax > 0 ? "+" : ""}{d.tMax}°</div>
                        <div className="text-white/40">{d.tMin > 0 ? "+" : ""}{d.tMin}°</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Доп. строка: восход / закат / световой день */}
            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/5 bg-black/30">
              <div className="flex items-center justify-center gap-1 py-1.5 text-[10px] text-white/70">
                <Icon name="Sunrise" size={11} className="text-accent" />
                <span className="font-bold text-white">{sunriseTime}</span>
              </div>
              <div className="flex items-center justify-center gap-1 py-1.5 text-[10px] text-white/70">
                <Icon name="Sunset" size={11} className="text-accent" />
                <span className="font-bold text-white">{sunsetTime}</span>
              </div>
              <div className="flex items-center justify-center gap-1 py-1.5 text-[10px] text-white/70">
                <Icon name="Sun" size={11} className="text-accent" />
                <span className="font-bold text-white">{daylight}</span>
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 border-t ${levelColors[advice.level].bg} ${levelColors[advice.level].text} ${levelColors[advice.level].ring}`}
            >
              <span className="text-xs">{advice.emoji}</span>
              <span className="text-[10px] font-bold leading-tight">{advice.text}</span>
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
                  <div className="text-xs text-white/65 mt-2 flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Wind" size={12} className="text-accent" />
                      <span className="font-bold text-white">{w.wind}</span>
                      {w.gust > w.wind && (
                        <span className="text-white/55">/ порывы {w.gust}</span>
                      )}
                      <span> м/с</span>
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Sunrise" size={12} className="text-accent" />
                      <span className="font-bold text-white">{sunriseTime}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Sunset" size={12} className="text-accent" />
                      <span className="font-bold text-white">{sunsetTime}</span>
                    </span>
                  </div>
                  <div className="text-[10px] text-white/45 mt-1 inline-flex items-center gap-1">
                    <Icon name="Sun" size={10} className="text-accent/70" />
                    Световой день: <span className="text-white/70 font-bold">{daylight}</span>
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
                    const dayAdvice = workAdvice(d.code, d.windMax, d.gust, d.tMin);
                    const c = levelColors[dayAdvice.level];
                    return (
                      <div
                        key={i}
                        title={dayAdvice.text}
                        className={`relative flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 rounded-xl border transition-colors ${
                          d.weekend
                            ? "bg-gradient-to-br from-accent/15 to-accent/5 border-accent/40 hover:border-accent/60"
                            : "bg-white/5 border-white/10 hover:border-accent/30 hover:bg-white/[0.07]"
                        }`}
                      >
                        {/* Светофор условий — точка статуса */}
                        <span
                          className={`absolute top-1.5 left-1.5 w-2 h-2 rounded-full ${c.dot} shadow-[0_0_8px_currentColor]`}
                          aria-label={dayAdvice.short}
                        />
                        {d.weekend && (
                          <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-[8px] font-bold uppercase tracking-wider leading-none">
                            <Icon name="Star" size={8} className="fill-accent" />
                            вых
                          </span>
                        )}
                        <div className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${d.weekend ? "text-accent" : "text-white/70"}`}>{d.day}</div>
                        <span className={`leading-none ${range === 3 ? "text-3xl" : "text-2xl"}`}>{ic.emoji}</span>
                        <div className={`text-white leading-tight text-center ${range === 3 ? "text-sm" : "text-xs"}`}>
                          <span className="font-bold text-accent">{d.tMax > 0 ? "+" : ""}{d.tMax}°</span>
                          <span className="text-white/40"> / {d.tMin > 0 ? "+" : ""}{d.tMin}°</span>
                        </div>
                        {/* Ветер с порывами */}
                        <div className={`inline-flex items-center gap-0.5 text-[10px] ${c.text} leading-none mt-0.5 font-bold`}>
                          <Icon name="Wind" size={10} />
                          {d.windMax}{d.gust > d.windMax + 2 ? `–${d.gust}` : ""} м/с
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-between gap-3 px-6 py-3 border-t ${levelColors[advice.level].bg} ${levelColors[advice.level].ring} ${levelColors[advice.level].text}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 border border-white/15">
                  <span className="text-base">{advice.emoji}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest font-black opacity-75 leading-none mb-0.5">
                    Условия для манипулятора
                  </div>
                  <div className="text-xs sm:text-sm font-bold leading-tight truncate">
                    {advice.text}
                  </div>
                </div>
              </div>
              {advice.level === "ok" && (
                <a
                  href="tel:+79601883084"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black text-black shadow-md active:scale-95 transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  }}
                >
                  <Icon name="Phone" size={12} />
                  Заказать
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;