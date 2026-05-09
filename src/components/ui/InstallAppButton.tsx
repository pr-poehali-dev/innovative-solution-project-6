import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import Icon from "@/components/ui/icon";
import { openDownloadModal } from "@/components/ui/OfflineDownloadModal";

interface InstallAppButtonProps {
  className?: string;
  iconOnly?: boolean;
}

const InstallAppButton = ({ className = "", iconOnly = false }: InstallAppButtonProps) => {
  const { installed } = useInstallPrompt();

  if (installed) return null;

  return (
    <button
      type="button"
      onClick={openDownloadModal}
      aria-label="Скачать сайт — работает без интернета"
      title="Скачать сайт — работает без интернета"
      className={`group relative inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/70 transition-all text-white font-semibold ${
        iconOnly ? "w-9 h-9 justify-center p-0" : "px-2.5 py-1.5 text-xs"
      } ${className}`}
    >
      <Icon name="Download" size={iconOnly ? 15 : 13} className="text-accent shrink-0" />
      {!iconOnly && <span className="font-bold whitespace-nowrap">Скачать</span>}
    </button>
  );
};

export default InstallAppButton;
