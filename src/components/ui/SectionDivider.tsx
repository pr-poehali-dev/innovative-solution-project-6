import Icon from "@/components/ui/icon";

type Variant = "wave" | "glow" | "stripes" | "diamond" | "crane";

interface SectionDividerProps {
  variant?: Variant;
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ variant = "glow", flip = false, className = "" }: SectionDividerProps) => {
  // === Вариант 1: WAVE — мягкая волна с золотым отблеском ===
  if (variant === "wave") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "80px", transform: flip ? "scaleY(-1)" : undefined }}
        aria-hidden="true"
      >
        {/* Базовый градиент-фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
        {/* SVG волна */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245, 208, 96, 0)" />
              <stop offset="50%" stopColor="rgba(245, 208, 96, 0.4)" />
              <stop offset="100%" stopColor="rgba(245, 208, 96, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C300,10 600,70 1200,40 L1200,40 L0,40 Z"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="1.5"
          />
        </svg>
        {/* Центральная точка-акцент */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_20px_rgba(245,208,96,0.8)]" />
        </div>
      </div>
    );
  }

  // === Вариант 2: GLOW — мягкое золотое свечение по центру ===
  if (variant === "glow") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "100px" }}
        aria-hidden="true"
      >
        {/* Радиальное свечение */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,208,96,0.15) 0%, rgba(245,208,96,0.05) 35%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Тонкая линия с градиентом */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        {/* Центральный «бриллиант» */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent/60" />
          <div className="w-2 h-2 rotate-45 bg-accent shadow-[0_0_12px_rgba(245,208,96,0.8)]" />
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent/60" />
        </div>
      </div>
    );
  }

  // === Вариант 3: STRIPES — строительные полосы (брендовые) ===
  if (variant === "stripes") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "60px" }}
        aria-hidden="true"
      >
        {/* Жёлто-чёрные диагональные полосы — символ стройки */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(245,208,96,0.6) 0px, rgba(245,208,96,0.6) 14px, transparent 14px, transparent 28px)",
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        {/* Тонкие линии сверху и снизу */}
        <div className="absolute left-0 right-0 top-[calc(50%-13px)] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute left-0 right-0 top-[calc(50%+13px)] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    );
  }

  // === Вариант 4: DIAMOND — три бриллианта с линиями ===
  if (variant === "diamond") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "90px" }}
        aria-hidden="true"
      >
        {/* Фоновое свечение */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[120px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.08), transparent 70%)",
            filter: "blur(15px)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
          <span className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-accent/50" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-accent/40" />
            <span className="w-2.5 h-2.5 rotate-45 bg-accent shadow-[0_0_10px_rgba(245,208,96,0.7)]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-accent/40" />
          </div>
          <span className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>
    );
  }

  // === Вариант 5: CRANE — с иконкой манипулятора (брендовый) ===
  if (variant === "crane") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "100px" }}
        aria-hidden="true"
      >
        {/* Радиальное свечение */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[180px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.12), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-5">
          <span className="w-12 sm:w-32 h-px bg-gradient-to-r from-transparent to-accent/50" />
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,208,96,0.25)]">
              <Icon name="Construction" size={18} className="text-accent" />
            </div>
            {/* Орбита-точки */}
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent/70" />
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent/70" />
          </div>
          <span className="w-12 sm:w-32 h-px bg-gradient-to-l from-transparent to-accent/50" />
        </div>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
