import Icon from "@/components/ui/icon";

type Stats = {
  topThree: number;
  topTen: number;
  withData: number;
  total: number;
};

interface PositionTrackerHeaderProps {
  stats: Stats;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PositionTrackerHeader = ({
  stats,
  onExport,
  onImport,
}: PositionTrackerHeaderProps) => {
  return (
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
            onClick={onExport}
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
              onChange={onImport}
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
  );
};

export default PositionTrackerHeader;
