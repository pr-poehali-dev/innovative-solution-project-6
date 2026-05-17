import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import PositionTrackerHeader from "./PositionTrackerHeader";
import PositionTrackerQueryItem from "./PositionTrackerQueryItem";
import {
  type Engine,
  type Query,
  loadQueries,
  saveQueries,
  todayIso,
  getLatest,
} from "./positionTrackerUtils";

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
      <PositionTrackerHeader
        stats={stats}
        onExport={exportJson}
        onImport={importJson}
      />

      <div className="p-4 sm:p-6 space-y-3">
        {queries.map((q) => (
          <PositionTrackerQueryItem
            key={q.id}
            q={q}
            isEditing={editingQuery === q.id}
            inputPos={inputPos}
            inputEngine={inputEngine}
            onToggleEdit={setEditingQuery}
            onRemove={removeQuery}
            onSetInputPos={setInputPos}
            onSetInputEngine={setInputEngine}
            onAddMeasurement={addMeasurement}
          />
        ))}

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
