import Icon from "@/components/ui/icon";
import type { Measurement } from "./positionTrackerUtils";

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

export default Sparkline;
