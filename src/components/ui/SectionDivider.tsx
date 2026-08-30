import Icon from "@/components/ui/icon";

type Variant = "wave" | "glow" | "stripes" | "diamond" | "crane" | "neon" | "particles" | "blueprint" | "circuit" | "aurora";

interface SectionDividerProps {
  variant?: Variant;
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ variant = "glow", flip = false, className = "" }: SectionDividerProps) => {
  // === Вариант 1: WAVE — мягкая SVG-волна с движущимся отблеском ===
  if (variant === "wave") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "120px", transform: flip ? "scaleY(-1)" : undefined }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245, 208, 96, 0)" />
              <stop offset="50%" stopColor="rgba(245, 208, 96, 0.6)" />
              <stop offset="100%" stopColor="rgba(245, 208, 96, 0)" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245, 208, 96, 0)" />
              <stop offset="50%" stopColor="rgba(245, 208, 96, 0.25)" />
              <stop offset="100%" stopColor="rgba(245, 208, 96, 0)" />
            </linearGradient>
          </defs>
          <path d="M0,70 C200,30 400,90 600,60 C800,30 1000,80 1200,55 L1200,120 L0,120 Z" fill="url(#waveGrad2)" opacity="0.4" />
          <path d="M0,60 C300,20 600,80 1200,50" fill="none" stroke="url(#waveGrad1)" strokeWidth="2" />
          <path d="M0,60 C300,20 600,80 1200,50" fill="none" stroke="rgba(245, 208, 96, 0.15)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 overflow-hidden">
          <div className="divider-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 -m-3 rounded-full bg-accent/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_20px_rgba(245,208,96,0.9)]" />
        </div>
      </div>
    );
  }

  // === Вариант 2: GLOW — премиум-разделитель с орнаментом ===
  if (variant === "glow") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "120px" }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[280px] opacity-70"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245,208,96,0.18) 0%, rgba(245,208,96,0.06) 35%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div className="absolute left-1/2 top-[calc(50%-6px)] -translate-x-1/2 w-[80%] max-w-3xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute left-1/2 top-[calc(50%+6px)] -translate-x-1/2 w-[60%] max-w-2xl h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-accent/60" />
          <span className="w-1 h-1 rotate-45 bg-accent/40" />
          <span className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
          <div className="relative w-3 h-3 rotate-45 bg-accent shadow-[0_0_20px_rgba(245,208,96,1)] divider-spark">
            <span className="absolute inset-0 m-auto w-1 h-1 -rotate-45 bg-white/80" />
          </div>
          <span className="w-1.5 h-1.5 rotate-45 bg-accent/70" />
          <span className="w-1 h-1 rotate-45 bg-accent/40" />
          <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-accent/60" />
        </div>
      </div>
    );
  }

  // === Вариант 3: STRIPES — анимированная строительная лента ===
  if (variant === "stripes") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "90px" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent" />
        <div className="absolute left-0 right-0 top-[calc(50%-18px)] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 opacity-40 divider-tape-scroll"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(245,208,96,0.7) 0px, rgba(245,208,96,0.7) 14px, transparent 14px, transparent 28px)",
            backgroundSize: "56px 100%",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
        <div className="absolute left-0 right-0 top-[calc(50%+18px)] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-accent/40">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent divider-spark" />
            <span className="w-1 h-1 rounded-full bg-accent divider-spark" style={{ animationDelay: "0.3s" }} />
            <span className="w-1 h-1 rounded-full bg-accent divider-spark" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
      </div>
    );
  }

  // === Вариант 4: DIAMOND — премиум-бриллианты с орбитой ===
  if (variant === "diamond") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "130px" }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.12), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-accent/20 divider-rotate">
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(245,208,96,0.8)]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/60" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/80" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/60" />
        </div>
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-4">
          <span className="flex-1 max-w-[180px] h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/50" />
          <div className="w-24 flex-shrink-0" />
          <span className="flex-1 max-w-[180px] h-px bg-gradient-to-r from-accent/50 via-accent/30 to-transparent" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="w-2 h-2 rotate-45 bg-accent/50" />
          <div className="relative w-4 h-4 rotate-45 bg-gradient-to-br from-accent via-accent to-amber-600 shadow-[0_0_20px_rgba(245,208,96,0.9)]">
            <span className="absolute inset-0 m-auto w-1.5 h-1.5 -rotate-45 bg-white/90 rounded-sm" />
          </div>
          <div className="w-2 h-2 rotate-45 bg-accent/50" />
        </div>
      </div>
    );
  }

  // === Вариант 5: CRANE — иконка манипулятора с летящими частицами ===
  if (variant === "crane") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "130px" }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.15), transparent 70%)",
            filter: "blur(25px)",
          }}
        />
        <span className="absolute top-1/2 left-[10%] w-1 h-1 rounded-full bg-accent/60 divider-drift" style={{ animationDelay: "0s" }} />
        <span className="absolute top-[35%] left-[20%] w-0.5 h-0.5 rounded-full bg-accent/50 divider-drift" style={{ animationDelay: "1.5s" }} />
        <span className="absolute top-[60%] left-[15%] w-0.5 h-0.5 rounded-full bg-accent/70 divider-drift" style={{ animationDelay: "3s" }} />
        <span className="absolute top-[40%] right-[18%] w-1 h-1 rounded-full bg-accent/60 divider-drift" style={{ animationDelay: "0.8s", animationDirection: "reverse" }} />
        <span className="absolute top-1/2 right-[10%] w-0.5 h-0.5 rounded-full bg-accent/50 divider-drift" style={{ animationDelay: "2.2s", animationDirection: "reverse" }} />
        <span className="absolute top-[55%] right-[22%] w-1 h-1 rounded-full bg-accent/70 divider-drift" style={{ animationDelay: "4s", animationDirection: "reverse" }} />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-6">
          <span className="w-16 sm:w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/60" />
          <div className="relative">
            <div className="absolute inset-0 -m-2 rounded-full bg-accent/30" />
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent/30 via-accent/15 to-transparent border border-accent/50 flex items-center justify-center shadow-[0_0_30px_rgba(245,208,96,0.4)] backdrop-blur-sm divider-float">
              <Icon name="Construction" size={22} className="text-accent" />
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-accent/15 divider-rotate" style={{ animationDuration: "12s" }}>
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent shadow-[0_0_6px_rgba(245,208,96,0.8)]" />
            </span>
          </div>
          <span className="w-16 sm:w-32 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/60" />
        </div>
      </div>
    );
  }

  // === Вариант 6: NEON — неоновая лазерная линия ===
  if (variant === "neon") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "100px" }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl h-12 opacity-70"
          style={{
            background: "linear-gradient(to right, transparent, rgba(245,208,96,0.15), transparent)",
            filter: "blur(15px)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-1 rounded-full"
          style={{
            background: "linear-gradient(to right, transparent, #f5d060 20%, #ffe890 50%, #f5d060 80%, transparent)",
            boxShadow: "0 0 20px rgba(245,208,96,0.8), 0 0 40px rgba(245,208,96,0.4)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-px bg-white/90" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 overflow-hidden">
          <div className="divider-shimmer absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
        <span className="absolute left-[7.5%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_rgba(245,208,96,1)] divider-spark" />
        <span className="absolute right-[7.5%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_rgba(245,208,96,1)] divider-spark" style={{ animationDelay: "1s" }} />
      </div>
    );
  }

  // === Вариант 7: PARTICLES — звёздное поле с искрами ===
  if (variant === "particles") {
    const particles = [
      { left: "8%", top: "30%", size: "1px", delay: "0s", opacity: 0.5 },
      { left: "15%", top: "60%", size: "2px", delay: "0.4s", opacity: 0.7 },
      { left: "22%", top: "45%", size: "1px", delay: "0.8s", opacity: 0.4 },
      { left: "30%", top: "25%", size: "1.5px", delay: "1.2s", opacity: 0.6 },
      { left: "38%", top: "70%", size: "1px", delay: "1.6s", opacity: 0.5 },
      { left: "45%", top: "35%", size: "2px", delay: "2s", opacity: 0.8 },
      { left: "55%", top: "65%", size: "1.5px", delay: "0.2s", opacity: 0.6 },
      { left: "62%", top: "40%", size: "1px", delay: "0.6s", opacity: 0.5 },
      { left: "70%", top: "55%", size: "2px", delay: "1s", opacity: 0.7 },
      { left: "78%", top: "30%", size: "1px", delay: "1.4s", opacity: 0.4 },
      { left: "85%", top: "60%", size: "1.5px", delay: "1.8s", opacity: 0.6 },
      { left: "92%", top: "45%", size: "1px", delay: "2.2s", opacity: 0.5 },
    ];
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "120px" }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.08), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-accent divider-spark"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              boxShadow: `0 0 ${parseFloat(p.size) * 4}px rgba(245,208,96,0.9)`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-2xl h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <div className="w-2 h-2 rotate-45 bg-accent/60 shadow-[0_0_10px_rgba(245,208,96,0.6)]" />
          <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-white to-accent shadow-[0_0_20px_rgba(245,208,96,1)]" />
          <div className="w-2 h-2 rotate-45 bg-accent/60 shadow-[0_0_10px_rgba(245,208,96,0.6)]" />
        </div>
      </div>
    );
  }

  // === Вариант 8: BLUEPRINT — техническая сетка-чертёж ===
  if (variant === "blueprint") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "110px" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,208,96,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,208,96,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 110" preserveAspectRatio="none">
          <line x1="0" y1="55" x2="1200" y2="55" stroke="rgba(245,208,96,0.3)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="200" y1="40" x2="200" y2="70" stroke="rgba(245,208,96,0.5)" strokeWidth="1" />
          <line x1="400" y1="40" x2="400" y2="70" stroke="rgba(245,208,96,0.5)" strokeWidth="1" />
          <line x1="600" y1="35" x2="600" y2="75" stroke="rgba(245,208,96,0.7)" strokeWidth="1.5" />
          <line x1="800" y1="40" x2="800" y2="70" stroke="rgba(245,208,96,0.5)" strokeWidth="1" />
          <line x1="1000" y1="40" x2="1000" y2="70" stroke="rgba(245,208,96,0.5)" strokeWidth="1" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-accent/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(245,208,96,0.3)]"
          style={{ background: "radial-gradient(circle, rgba(245,208,96,0.15), transparent)" }}
        >
          <div className="absolute inset-2 rounded-full border border-accent/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/60" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/60" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(245,208,96,1)] divider-spark" />
        </div>
      </div>
    );
  }

  // === Вариант 9: CIRCUIT — техно-схема ===
  if (variant === "circuit") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "100px" }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[140px]"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.1), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="circuitGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245,208,96,0)" />
              <stop offset="50%" stopColor="rgba(245,208,96,0.7)" />
              <stop offset="100%" stopColor="rgba(245,208,96,0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0 50 L 350 50 L 380 30 L 480 30 L 510 50 L 690 50 L 720 70 L 820 70 L 850 50 L 1200 50"
            fill="none"
            stroke="url(#circuitGrad)"
            strokeWidth="1.5"
          />
          <circle cx="350" cy="50" r="3" fill="rgba(245,208,96,0.8)" />
          <circle cx="510" cy="50" r="3" fill="rgba(245,208,96,0.8)" />
          <circle cx="690" cy="50" r="3" fill="rgba(245,208,96,0.8)" />
          <circle cx="850" cy="50" r="3" fill="rgba(245,208,96,0.8)" />
        </svg>
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px overflow-hidden">
          <div className="divider-shimmer absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-accent to-transparent" style={{ filter: "blur(2px)" }} />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded border border-accent/60 bg-gradient-to-br from-accent/20 to-transparent backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(245,208,96,0.5)]">
          <span className="w-2 h-2 rounded-sm bg-accent divider-spark" />
          <span className="absolute -left-1 top-1 w-1 h-px bg-accent/60" />
          <span className="absolute -left-1 bottom-1 w-1 h-px bg-accent/60" />
          <span className="absolute -right-1 top-1 w-1 h-px bg-accent/60" />
          <span className="absolute -right-1 bottom-1 w-1 h-px bg-accent/60" />
        </div>
      </div>
    );
  }

  // === Вариант 10: AURORA — северное сияние ===
  if (variant === "aurora") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none ${className}`}
        style={{ height: "140px" }}
        aria-hidden="true"
      >
        <div
          className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[200px] opacity-60 divider-float"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.25), transparent 70%)",
            filter: "blur(40px)",
            animationDuration: "6s",
          }}
        />
        <div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[200px] opacity-60 divider-float"
          style={{
            background: "radial-gradient(ellipse, rgba(232,168,32,0.2), transparent 70%)",
            filter: "blur(40px)",
            animationDuration: "8s",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[140px] divider-float"
          style={{
            background: "radial-gradient(ellipse, rgba(245,208,96,0.18), transparent 60%)",
            filter: "blur(30px)",
            animationDuration: "10s",
            animationDelay: "0.5s",
          }}
        />
        <div className="absolute left-1/2 top-[calc(50%-3px)] -translate-x-1/2 w-[60%] max-w-2xl h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute left-1/2 top-[calc(50%+3px)] -translate-x-1/2 w-[40%] max-w-xl h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-3 h-3 rotate-45 bg-gradient-to-br from-white via-accent to-amber-500 shadow-[0_0_30px_rgba(245,208,96,1)]">
            <span className="absolute inset-0 m-auto w-1 h-1 -rotate-45 bg-white rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
