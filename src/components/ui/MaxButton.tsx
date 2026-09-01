import Icon from "@/components/ui/icon";
import { MAX_LINK } from "@/data/contacts";
import { reachGoal } from "@/lib/metrika";

interface MaxButtonProps {
  place?: string;
  compact?: boolean;
  className?: string;
}

const MaxButton = ({ place = "header", compact = false, className = "" }: MaxButtonProps) => (
  <a
    href={MAX_LINK}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => reachGoal("max_click", { place })}
    aria-label="Написать нам в MAX"
    title="Написать в MAX"
    className={`inline-flex items-center gap-2 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-colors shadow-lg shadow-[#8B5CF6]/30 active:scale-95 ${
      compact ? "w-10 h-10 justify-center" : "px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm"
    } ${className}`}
  >
    <Icon name="MessageSquare" size={compact ? 18 : 16} className="text-white shrink-0" />
    {!compact && <span className="hidden sm:inline">MAX</span>}
  </a>
);

export default MaxButton;
