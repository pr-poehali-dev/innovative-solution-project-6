import MaxIcon from "@/components/ui/MaxIcon";
import { MAX_LINK } from "@/data/contacts";
import { reachGoal } from "@/lib/metrika";

interface MaxButtonProps {
  place?: string;
  compact?: boolean;
  className?: string;
}

const GRADIENT = "linear-gradient(135deg, #3B82F6 0%, #7C3AED 55%, #A855F7 100%)";

const MaxButton = ({ place = "header", compact = false, className = "" }: MaxButtonProps) => (
  <a
    href={MAX_LINK}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => reachGoal("max_click", { place })}
    aria-label="Написать нам в MAX"
    title="Написать в MAX"
    className={`inline-flex items-center justify-center rounded-full text-white shadow-lg shadow-[#7C3AED]/40 hover:shadow-[#7C3AED]/60 hover:brightness-110 active:scale-95 transition-all ${
      compact ? "w-10 h-10 sm:w-11 sm:h-11" : "gap-2 px-4 py-2.5 font-black text-sm"
    } ${className}`}
    style={{ background: GRADIENT }}
  >
    <MaxIcon size={compact ? 22 : 20} className="text-white shrink-0" />
    {!compact && <span>Написать в MAX</span>}
  </a>
);

export default MaxButton;
