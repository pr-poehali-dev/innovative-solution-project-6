import Icon from "@/components/ui/icon";

type Stat = { icon: string; value: string; label: string };

const StatTiles = ({ items, className = "" }: { items: Stat[]; className?: string }) => (
  <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 ${className}`}>
    {items.map((s) => (
      <div
        key={s.label}
        className="rounded-2xl border border-accent/20 bg-card/40 px-2 py-3 sm:p-4 flex flex-col items-center justify-center text-center gap-1.5 min-w-0"
      >
        <span className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
          <Icon name={s.icon} size={16} />
        </span>
        <p className="w-full text-[13.5px] sm:text-[15px] font-black text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {s.value}
        </p>
        <p className="w-full text-[11.5px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">{s.label}</p>
      </div>
    ))}
  </div>
);

export default StatTiles;
