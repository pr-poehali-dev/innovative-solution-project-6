import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/icon";

type Engine = "yandex" | "google";

type Measurement = {
  date: string;
  position: number;
  engine: Engine;
};

type Query = {
  id: string;
  text: string;
  measurements: Measurement[];
};

const STORAGE_KEY = "seoPositions_v1";

const DEFAULT_QUERIES: Query[] = [
  { id: "q1", text: "аренда манипулятора нижний новгород", measurements: [] },
  { id: "q2", text: "манипулятор нижний новгород", measurements: [] },
  { id: "q3", text: "услуги манипулятора нн", measurements: [] },
  { id: "q4", text: "аренда крана манипулятора нижний новгород", measurements: [] },
  { id: "q5", text: "манипулятор с люлькой нижний новгород", measurements: [] },
];

const todayIso = () => new Date().toISOString().split("T")[0];

const loadQueries = (): Query[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_QUERIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_QUERIES;
  } catch {
    return DEFAULT_QUERIES;
  }
};

const saveQueries = (queries: Query[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  } catch {
    /* ignore */
  }
};

const positionColor = (pos: number) => {
  if (pos <= 3) return "text-emerald-500";
  if (pos <= 10) return "text-amber-500";
  if (pos <= 20) return "text-orange-500";
  return "text-red-500";
};

const positionBg = (pos: number) => {
  if (pos <= 3) return "bg-emerald-500/10 border-emerald-500/30";
  if (pos <= 10) return "bg-amber-500/10 border-amber-500/30";
  if (pos <= 20) return "bg-orange-500/10 border-orange-500/30";
  return "bg-red-500/10 border-red-500/30";
};

const Sparkline = ({ data }: { data: Measurement[] }) => {
  if (data.length < 2) {
    return (
      <div className="h-10 flex items-center text-xs text-muted-foreground">
        Нужно ≥2 измерений для графика
      </div>
    );
  }
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const positions = sorted.map((m) => m.position);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const step = sorted.length > 1 ? w / (sorted.length - 1) : 0;

  const points = sorted
    .map((m, i) => {
      const x = i * step;
      const y = ((m.position - min) / range) * (h - 8) + 4;
      return `${x},${y}`;
    })
    .join(" ");

  const trend =
    sorted[0].position > sorted[sorted.length - 1].position ? "up" : "down";

  return (
    <div className="flex items-center gap-2">
      <svg width={w} height={h} className="overflow-visible">
        <polyline
          fill="none"
          stroke={trend === "up" ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)"}
          strokeWidth="2"
          points={points}
        />
        {sorted.map((m, i) => {
          const x = i * step;
          const y = ((m.position - min) / range) * (h - 8) + 4;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={trend === "up" ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)"}
            />
          );
        })}
      </svg>
      <Icon
        name={trend === "up" ? "TrendingUp" : "TrendingDown"}
        size={16}
        className={trend === "up" ? "text-emerald-500" : "text-red-500"}
      />
    </div>
  );
};

const PositionTracker = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [editingQuery, setEditingQuery] = useState<string | null>(null);
  const [inputPos, setInputPos] = useState<{ [key: string]: string }>({});
  const [inputEngine, setInputEngine] = useState<{ [key: string]: Engine }>({});

  useEffect(() => {
    setQueries(loadQueries());
  }, []);

  const updateQueries = (next: Query[]) => {
    setQueries(next);
    saveQueries(next);
  };

  const addQuery = () => {
    const text = newQuery.trim();
    if (!text) return;
    const next: Query[] = [
      ...queries,
      { id: `q${Date.now()}`, text, measurements: [] },
    ];
    updateQueries(next);
    setNewQuery("");
  };

  const removeQuery = (id: string) => {
    if (!confirm("Удалить запрос и всю историю замеров?")) return;
    updateQueries(queries.filter((q) => q.id !== id));
  };

  const addMeasurement = (queryId: string) => {
    const pos = Number(inputPos[queryId]);
    const engine = inputEngine[queryId] || "yandex";
    if (!pos || pos < 1 || pos > 200) {
      alert("Введи позицию от 1 до 200");
      return;
    }
    const next = queries.map((q) => {
      if (q.id !== queryId) return q;
      const filtered = q.measurements.filter(
        (m) => !(m.date === todayIso() && m.engine === engine),
      );
      return {
        ...q,
        measurements: [
          ...filtered,
          { date: todayIso(), position: pos, engine },
        ],
      };
    });
    updateQueries(next);
    setInputPos((prev) => ({ ...prev, [queryId]: "" }));
  };

  const getLatest = (q: Query, engine: Engine): Measurement | null => {
    const filtered = q.measurements.filter((m) => m.engine === engine);
    if (filtered.length === 0) return null;
    return filtered.sort((a, b) => b.date.localeCompare(a.date))[0];
  };

  const getChange = (q: Query, engine: Engine): number | null => {
    const filtered = q.measurements
      .filter((m) => m.engine === engine)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (filtered.length < 2) return null;
    const first = filtered[0].position;
    const last = filtered[filtered.length - 1].position;
    return first - last;
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(queries, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-positions-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          updateQueries(data);
          alert("Импорт успешен!");
        }
      } catch {
        alert("Ошибка чтения файла");
      }
    };
    reader.readAsText(file);
  };

  const stats = useMemo(() => {
    let topThree = 0;
    let topTen = 0;
    let withData = 0;
    queries.forEach((q) => {
      const yandex = getLatest(q, "yandex");
      if (yandex) {
        withData++;
        if (yandex.position <= 3) topThree++;
        else if (yandex.position <= 10) topTen++;
      }
    });
    return { topThree, topTen, withData, total: queries.length };
  }, [queries]);

  return (
    <div className="rounded-2xl bg-card border overflow-hidden">
      <div className="p-5 sm:p-6 border-b bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
        <div className="flex items-start justify-between gap-3 flex-col sm:flex-row">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Icon name="LineChart" size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-display font-bold text-foreground">
                Динамика позиций
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Раз в неделю проверяй позиции в поиске и записывай сюда — увидишь рост на графике
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/70 transition-colors"
              title="Скачать данные в JSON"
            >
              <Icon name="Download" size={12} />
              Экспорт
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/70 transition-colors cursor-pointer">
              <Icon name="Upload" size={12} />
              Импорт
              <input
                type="file"
                accept="application/json"
                onChange={importJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-lg p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-500">
              {stats.topThree}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">в ТОП-3</div>
          </div>
          <div className="rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/30 text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-500">
              {stats.topTen}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">в ТОП-10</div>
          </div>
          <div className="rounded-lg p-2.5 bg-muted/30 border text-center">
            <div className="text-xl sm:text-2xl font-black text-foreground">
              {stats.withData}/{stats.total}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">с замерами</div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3">
        {queries.map((q) => {
          const yandex = getLatest(q, "yandex");
          const google = getLatest(q, "google");
          const yandexChange = getChange(q, "yandex");
          const googleChange = getChange(q, "google");
          const isEditing = editingQuery === q.id;

          return (
            <div key={q.id} className="rounded-xl border bg-background/50 overflow-hidden">
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-1">Запрос</div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-foreground break-words">
                      {q.text}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <a
                      href={`https://yandex.ru/search/?text=${encodeURIComponent(q.text)}&lr=47`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/30 hover:bg-red-500/20"
                      title="Проверить в Яндексе (регион НН)"
                    >
                      <Icon name="Search" size={11} />
                      Яндекс
                    </a>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(q.text)}&gl=ru`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/30 hover:bg-blue-500/20"
                      title="Проверить в Google"
                    >
                      <Icon name="Search" size={11} />
                      Google
                    </a>
                    <button
                      onClick={() => removeQuery(q.id)}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                      title="Удалить запрос"
                    >
                      <Icon name="Trash2" size={11} />
                    </button>
                  </div>
                </div>

                {/* Latest positions */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className={`rounded-lg p-2.5 border ${yandex ? positionBg(yandex.position) : "bg-muted/20"}`}>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Яндекс
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className={`text-xl sm:text-2xl font-black ${yandex ? positionColor(yandex.position) : "text-muted-foreground"}`}>
                        {yandex ? `#${yandex.position}` : "—"}
                      </div>
                      {yandexChange !== null && yandexChange !== 0 && (
                        <div className={`text-[10px] sm:text-xs font-bold flex items-center gap-0.5 ${yandexChange > 0 ? "text-emerald-500" : "text-red-500"}`}>
                          <Icon name={yandexChange > 0 ? "ArrowUp" : "ArrowDown"} size={10} />
                          {Math.abs(yandexChange)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`rounded-lg p-2.5 border ${google ? positionBg(google.position) : "bg-muted/20"}`}>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Google
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className={`text-xl sm:text-2xl font-black ${google ? positionColor(google.position) : "text-muted-foreground"}`}>
                        {google ? `#${google.position}` : "—"}
                      </div>
                      {googleChange !== null && googleChange !== 0 && (
                        <div className={`text-[10px] sm:text-xs font-bold flex items-center gap-0.5 ${googleChange > 0 ? "text-emerald-500" : "text-red-500"}`}>
                          <Icon name={googleChange > 0 ? "ArrowUp" : "ArrowDown"} size={10} />
                          {Math.abs(googleChange)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sparkline */}
                {q.measurements.length > 0 && (
                  <div className="mb-3 p-2 rounded-lg bg-muted/20">
                    <div className="text-[10px] text-muted-foreground mb-1">Динамика (Яндекс)</div>
                    <Sparkline data={q.measurements.filter((m) => m.engine === "yandex")} />
                  </div>
                )}

                {/* Add measurement */}
                <button
                  onClick={() => setEditingQuery(isEditing ? null : q.id)}
                  className="w-full text-xs font-semibold text-accent hover:text-accent/80 py-1 transition-colors flex items-center justify-center gap-1"
                >
                  <Icon name={isEditing ? "ChevronUp" : "Plus"} size={12} />
                  {isEditing ? "Скрыть" : "Записать новую позицию"}
                </button>

                {isEditing && (
                  <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-dashed">
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setInputEngine((prev) => ({ ...prev, [q.id]: "yandex" }))}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          (inputEngine[q.id] || "yandex") === "yandex"
                            ? "bg-red-500/20 text-red-600 border border-red-500/40"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Яндекс
                      </button>
                      <button
                        onClick={() => setInputEngine((prev) => ({ ...prev, [q.id]: "google" }))}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          inputEngine[q.id] === "google"
                            ? "bg-blue-500/20 text-blue-600 border border-blue-500/40"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Google
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={inputPos[q.id] || ""}
                        onChange={(e) =>
                          setInputPos((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Позиция (1-200)"
                        className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm"
                      />
                      <button
                        onClick={() => {
                          addMeasurement(q.id);
                          setEditingQuery(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90"
                      >
                        Сохранить
                      </button>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2">
                      Дата автоматом: <strong>{todayIso()}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add new query */}
        <div className="rounded-xl border border-dashed p-3 sm:p-4">
          <div className="text-xs text-muted-foreground mb-2 font-semibold">
            Добавить новый запрос для отслеживания
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addQuery()}
              placeholder="например: манипулятор 5 тонн нижний новгород"
              className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm"
            />
            <button
              onClick={addQuery}
              disabled={!newQuery.trim()}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
            >
              <Icon name="Plus" size={14} />
              Добавить
            </button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
          <strong className="text-blue-600">Как пользоваться:</strong> раз в
          неделю (например, по понедельникам) кликай на «Яндекс» рядом с каждым
          запросом — откроется поиск Яндекса с регионом «Нижний Новгород».
          Найди свой сайт в выдаче, посчитай позицию (с учётом рекламы — не считай!),
          нажми «Записать новую позицию» и введи цифру. Через 2-3 недели увидишь рост на графике.
        </div>
      </div>
    </div>
  );
};

export default PositionTracker;
