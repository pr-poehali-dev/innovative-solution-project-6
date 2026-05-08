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
      aria-label="Установить приложение"
      title="Установить приложение"
      className={`inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-white font-semibold ${
        iconOnly ? "w-10 h-10 justify-center p-0" : "px-3 sm:px-4 py-2 text-xs sm:text-sm"
      } ${className}`}
    >
      <Icon name="Download" size={iconOnly ? 16 : 14} className="text-accent" />
      {!iconOnly && <span className="whitespace-nowrap">Установить</span>}
    </button>
  );
};

export default InstallAppButton;
