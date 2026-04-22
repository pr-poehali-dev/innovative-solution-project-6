const goldStyle = {
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
    sm: "px-3 py-2 text-xs gap-1.5 whitespace-nowrap",
    md: "px-5 py-2.5 text-sm gap-2 whitespace-nowrap",
    lg: "px-10 sm:px-14 py-5 sm:py-6 text-2xl sm:text-3xl gap-4",
  };

  if (iconOnly) {
    return (
      <a
        href="tel:+79601883084"
        className={`flex items-center justify-center w-10 h-10 border rounded-full ${className}`}
        style={goldStyle}
      >
        📞
      </a>
    );
  }

  return (
    <a
      href="tel:+79601883084"
      className={`inline-flex items-center justify-center border rounded-full font-bold ${sizeClasses[size]} ${className}`}
      style={goldStyle}
    >
      📞 +7 960 188-30-84
    </a>
  );
};

export default PhoneButton;