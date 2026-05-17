import Icon from "@/components/ui/icon";
import Sparkline from "./PositionTrackerSparkline";
import {
  type Engine,
  type Query,
  getLatest,
  getChange,
  positionBg,
  positionColor,
  todayIso,
} from "./positionTrackerUtils";

interface PositionTrackerQueryItemProps {
  q: Query;
  isEditing: boolean;
  inputPos: { [key: string]: string };
  inputEngine: { [key: string]: Engine };
  onToggleEdit: (id: string | null) => void;
  onRemove: (id: string) => void;
  onSetInputPos: (
    updater: (prev: { [key: string]: string }) => { [key: string]: string },
  ) => void;
  onSetInputEngine: (
    updater: (prev: { [key: string]: Engine }) => { [key: string]: Engine },
  ) => void;
  onAddMeasurement: (queryId: string) => void;
}

const PositionTrackerQueryItem = ({
  q,
  isEditing,
  inputPos,
  inputEngine,
  onToggleEdit,
  onRemove,
  onSetInputPos,
  onSetInputEngine,
  onAddMeasurement,
}: PositionTrackerQueryItemProps) => {
  const yandex = getLatest(q, "yandex");
  const google = getLatest(q, "google");
  const yandexChange = getChange(q, "yandex");
  const googleChange = getChange(q, "google");

  return (
    <div className="rounded-xl border bg-background/50 overflow-hidden">
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
              onClick={() => onRemove(q.id)}
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
          onClick={() => onToggleEdit(isEditing ? null : q.id)}
          className="w-full text-xs font-semibold text-accent hover:text-accent/80 py-1 transition-colors flex items-center justify-center gap-1"
        >
          <Icon name={isEditing ? "ChevronUp" : "Plus"} size={12} />
          {isEditing ? "Скрыть" : "Записать новую позицию"}
        </button>

        {isEditing && (
          <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-dashed">
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => onSetInputEngine((prev) => ({ ...prev, [q.id]: "yandex" }))}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  (inputEngine[q.id] || "yandex") === "yandex"
                    ? "bg-red-500/20 text-red-600 border border-red-500/40"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Яндекс
              </button>
              <button
                onClick={() => onSetInputEngine((prev) => ({ ...prev, [q.id]: "google" }))}
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
                  onSetInputPos((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                placeholder="Позиция (1-200)"
                className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm"
              />
              <button
                onClick={() => {
                  onAddMeasurement(q.id);
                  onToggleEdit(null);
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
};

export default PositionTrackerQueryItem;
