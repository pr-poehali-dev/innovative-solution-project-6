import Icon from "@/components/ui/icon";

const goldStyle = {
  color: "#000",
  borderColor: "#e8a820",
  background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
  animation: "goldPulse 1.2s ease-in-out infinite",
  fontFamily: "'Cinzel', serif",
  boxShadow: "0 4px 14px rgba(232,168,32,0.4)",
};

const goldStyleOutline = {
  color: "#e8a820",
  borderColor: "#e8a820",
  background: "rgba(232,168,32,0.08)",
  animation: "goldPulse 1.2s ease-in-out infinite",
  fontFamily: "'Cinzel', serif",
};

interface PhoneButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}

const PhoneButton = ({ className = "", size = "md", iconOnly = false }: PhoneButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm gap-2 whitespace-nowrap",
    md: "px-5 py-2.5 text-sm gap-2 whitespace-nowrap",
    lg: "px-10 sm:px-14 py-5 sm:py-6 text-2xl sm:text-3xl gap-4",
  };

  if (iconOnly) {
    return (
      <a
        href="tel:+79601883084"
        className={`inline-flex items-center justify-center gap-1.5 px-3 h-10 border-2 rounded-full font-black text-sm active:scale-95 transition-transform ${className}`}
        style={goldStyle}
        aria-label="Позвонить +7 960 188-30-84"
      >
        <Icon name="Phone" size={16} />
        <span>Звонок</span>
      </a>
    );
  }

  return (
    <a
      href="tel:+79601883084"
      className={`inline-flex items-center justify-center border rounded-full font-bold ${sizeClasses[size]} ${className}`}
      style={goldStyleOutline}
    >
      <Icon name="Phone" size={16} />
      +7 960 188-30-84
    </a>
  );
};

export default PhoneButton;