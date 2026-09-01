import MaxIcon from "@/components/ui/MaxIcon";
import { MAX_LINK } from "@/data/contacts";
import { reachGoal } from "@/lib/metrika";

interface MaxButtonProps {
  place?: string;
  compact?: boolean;
  className?: string;
}

export const MAX_GRADIENT =
  "linear-gradient(135deg, #22D3EE 0%, #3B82F6 35%, #7C3AED 70%, #D946EF 100%)";

const MaxButton = ({ place = "header", compact = false, className = "" }: MaxButtonProps) => (
  <a
    href={MAX_LINK}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => reachGoal("max_click", { place })}
    aria-label="Написать нам в MAX"
    title="Написать в MAX"
    className={`group relative inline-flex items-center justify-center rounded-full text-white transition-all active:scale-95 hover:brightness-110 ${
      compact ? "w-10 h-10 sm:w-11 sm:h-11" : "gap-2.5 px-5 py-3 font-black text-sm"
    } ${className}`}
    style={{
      background: MAX_GRADIENT,
      boxShadow: "0 4px 20px rgba(124,58,237,0.55), 0 0 0 1px rgba(255,255,255,0.15) inset",
    }}
  >
    <span
      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ boxShadow: "0 0 26px 4px rgba(168,85,247,0.55)" }}
    />
    <MaxIcon size={compact ? 26 : 22} className="relative text-white shrink-0" />
    {!compact && <span className="relative">Написать в MAX</span>}
  </a>
);

export default MaxButton;