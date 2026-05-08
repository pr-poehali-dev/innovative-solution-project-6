import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import Icon from "@/components/ui/icon";

interface InstallAppButtonProps {
  className?: string;
  iconOnly?: boolean;
}

const InstallAppButton = ({ className = "", iconOnly = false }: InstallAppButtonProps) => {
  const { canInstall, install } = useInstallPrompt();
  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={install}
      aria-label="Установить приложение — работает без интернета"
      title="Установить приложение — работает без интернета"
      className={`group relative inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-white font-semibold ${
        iconOnly ? "w-10 h-10 justify-center p-0" : "pl-3 sm:pl-4 pr-3 sm:pr-4 py-1.5 text-xs sm:text-sm"
      } ${className}`}
    >
      <Icon name="Download" size={iconOnly ? 16 : 14} className="text-accent shrink-0" />
      {!iconOnly && (
        <span className="flex flex-col leading-tight items-start">
          <span className="font-bold whitespace-nowrap">Установить</span>
          <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-accent/80 whitespace-nowrap">
            Работает без интернета
          </span>
        </span>
      )}
      {iconOnly && (
        <span className="absolute top-full right-0 mt-1.5 px-2 py-1 rounded-md bg-black/90 border border-accent/30 text-[10px] font-medium text-accent whitespace-nowrap opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none transition-opacity">
          Работает без интернета
        </span>
      )}
    </button>
  );
};

export default InstallAppButton;