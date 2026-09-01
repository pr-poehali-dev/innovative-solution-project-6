import { ReactNode } from "react";

type Tone = "deep" | "soft" | "warm" | "tech" | "spotlight" | "transparent";
type Pattern =
  | "gears"        // шестерёнки
  | "crane"        // силуэт крана + стрела
  | "rivets"       // заклёпки на металле
  | "blueprint"    // чертёж со схемой манипулятора
  | "tracks"       // следы протекторов
  | "warning"      // строительная лента + знаки
  | "pipes"        // трубы / арматура
  | "cargo"        // контейнеры / стропы
  | "none";

interface SectionBackdropProps {
  children: ReactNode;
  tone?: Tone;
  pattern?: Pattern;
  className?: string;
}

/**
 * Декоративная подложка для секций в стиле спецтехники.
 * Не влияет на SEO-контент — это чисто визуальный wrapper.
 */
const SectionBackdrop = ({
  children,
  tone = "deep",
  pattern = "none",
  className = "",
}: SectionBackdropProps) => {
  // === Базовые фоны по тональностям (с лёгким металлическим оттенком) ===
  const toneStyles: Record<Tone, string> = {
    deep:
      "bg-[linear-gradient(180deg,hsl(220,15%,28%)_0%,hsl(220,15%,22%)_50%,hsl(220,15%,28%)_100%)]",
    soft:
      "bg-[linear-gradient(180deg,hsl(220,15%,28%)_0%,hsl(220,15%,34%)_50%,hsl(220,15%,28%)_100%)]",
    warm:
      "bg-[linear-gradient(135deg,hsl(220,15%,28%)_0%,hsl(38,18%,26%)_50%,hsl(220,15%,28%)_100%)]",
    tech:
      "bg-[linear-gradient(135deg,hsl(220,15%,28%)_0%,hsl(210,20%,22%)_50%,hsl(220,15%,28%)_100%)]",
    spotlight: "bg-background",
    transparent: "",
  };

  // === ПАТТЕРНЫ — все на тему спецтехники ===
  const renderPattern = () => {
    // === Шестерёнки (зубчатые колёса) ===
    if (pattern === "gears") {
      return (
        <>
          {/* Большая шестерёнка слева сверху */}
          <svg
            className="absolute -top-16 -left-16 w-72 h-72 opacity-[0.07] pointer-events-none"
            viewBox="0 0 200 200"
            aria-hidden="true"
            style={{ animation: "gear-spin 60s linear infinite" }}
          >
            <g fill="rgba(245,208,96,1)">
              <path d="M100 20 L110 20 L113 35 L125 28 L132 36 L125 48 L138 55 L138 67 L125 70 L132 82 L125 90 L113 83 L110 98 L100 98 L97 83 L85 90 L78 82 L85 70 L72 67 L72 55 L85 48 L78 36 L85 28 L97 35 Z" />
              <circle cx="100" cy="59" r="14" fill="none" stroke="rgba(245,208,96,1)" strokeWidth="3" />
              <circle cx="100" cy="59" r="5" />
            </g>
          </svg>

          {/* Малая шестерёнка справа снизу */}
          <svg
            className="absolute -bottom-12 -right-12 w-56 h-56 opacity-[0.06] pointer-events-none"
            viewBox="0 0 200 200"
            aria-hidden="true"
            style={{ animation: "gear-spin 90s linear infinite reverse" }}
          >
            <g fill="rgba(245,208,96,1)">
              <path d="M100 20 L110 20 L113 35 L125 28 L132 36 L125 48 L138 55 L138 67 L125 70 L132 82 L125 90 L113 83 L110 98 L100 98 L97 83 L85 90 L78 82 L85 70 L72 67 L72 55 L85 48 L78 36 L85 28 L97 35 Z" />
              <circle cx="100" cy="59" r="14" fill="none" stroke="rgba(245,208,96,1)" strokeWidth="3" />
              <circle cx="100" cy="59" r="5" />
            </g>
          </svg>

          {/* Маленькая шестерёнка в центре справа */}
          <svg
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-32 opacity-[0.05] pointer-events-none hidden md:block"
            viewBox="0 0 200 200"
            aria-hidden="true"
            style={{ animation: "gear-spin 45s linear infinite" }}
          >
            <g fill="rgba(245,208,96,1)">
              <path d="M100 20 L110 20 L113 35 L125 28 L132 36 L125 48 L138 55 L138 67 L125 70 L132 82 L125 90 L113 83 L110 98 L100 98 L97 83 L85 90 L78 82 L85 70 L72 67 L72 55 L85 48 L78 36 L85 28 L97 35 Z" />
              <circle cx="100" cy="59" r="14" fill="none" stroke="rgba(245,208,96,1)" strokeWidth="3" />
            </g>
          </svg>
        </>
      );
    }

    // === Силуэт крана-манипулятора со стрелой и крюком ===
    if (pattern === "crane") {
      return (
        <>
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="craneFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(245,208,96,1)" />
                <stop offset="100%" stopColor="rgba(245,208,96,0.3)" />
              </linearGradient>
            </defs>
            {/* База / шасси грузовика */}
            <g stroke="url(#craneFade)" strokeWidth="2.5" fill="none">
              {/* Кабина */}
              <rect x="100" y="280" width="140" height="80" rx="4" />
              <rect x="120" y="295" width="50" height="35" rx="2" />
              {/* Платформа */}
              <rect x="240" y="290" width="380" height="70" />
              {/* Колёса */}
              <circle cx="150" cy="370" r="22" />
              <circle cx="150" cy="370" r="10" />
              <circle cx="280" cy="370" r="22" />
              <circle cx="280" cy="370" r="10" />
              <circle cx="450" cy="370" r="22" />
              <circle cx="450" cy="370" r="10" />
              <circle cx="540" cy="370" r="22" />
              <circle cx="540" cy="370" r="10" />
              {/* Стрела-манипулятор: основание */}
              <rect x="380" y="220" width="50" height="70" />
              {/* Гидравлическая стрела (зигзаг) */}
              <path d="M 405 220 L 405 160 L 600 100 L 750 130 L 920 90" strokeWidth="3" />
              {/* Соединения стрелы */}
              <circle cx="405" cy="160" r="6" />
              <circle cx="600" cy="100" r="6" />
              <circle cx="750" cy="130" r="6" />
              {/* Трос */}
              <line x1="920" y1="90" x2="920" y2="250" strokeDasharray="4 4" />
              {/* Крюк */}
              <path d="M 905 250 L 920 270 L 935 250 L 935 240 M 920 270 L 920 280" strokeWidth="2.5" />
              {/* Опоры (аутригеры) */}
              <line x1="280" y1="320" x2="240" y2="380" />
              <line x1="600" y1="320" x2="640" y2="380" />
            </g>
          </svg>

          {/* Маленький дублирующий силуэт справа */}
          <svg
            className="absolute -bottom-4 right-0 w-60 h-32 opacity-[0.05] pointer-events-none"
            viewBox="0 0 600 200"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="3" fill="none">
              <path d="M 100 150 L 100 80 L 300 40 L 450 60 L 500 30" />
              <circle cx="100" cy="80" r="5" />
              <circle cx="300" cy="40" r="5" />
              <circle cx="450" cy="60" r="5" />
              <line x1="500" y1="30" x2="500" y2="100" strokeDasharray="4 4" />
            </g>
          </svg>
        </>
      );
    }

    // === Заклёпки на металлическом листе ===
    if (pattern === "rivets") {
      return (
        <>
          {/* Заклёпки по периметру + металлический лист */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(245,208,96,1) 1.5px, rgba(245,208,96,0.4) 2.5px, transparent 3px)",
              backgroundSize: "60px 60px",
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%), linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%), linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
            aria-hidden="true"
          />
          {/* Металлические "швы" */}
          <div
            className="absolute inset-x-0 top-8 h-px opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, rgba(245,208,96,0.8), transparent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-8 h-px opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, rgba(245,208,96,0.8), transparent)" }}
            aria-hidden="true"
          />
        </>
      );
    }

    // === Чертёж — техническая схема ===
    if (pattern === "blueprint") {
      return (
        <>
          {/* Сетка чертежа */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,208,96,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,208,96,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)",
            }}
            aria-hidden="true"
          />
          {/* Схема манипулятора со значками */}
          <svg
            className="absolute top-8 left-8 w-40 h-32 opacity-[0.12] pointer-events-none hidden md:block"
            viewBox="0 0 400 300"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="2" fill="none">
              {/* Размерные линии */}
              <line x1="50" y1="50" x2="350" y2="50" strokeDasharray="4 4" />
              <line x1="50" y1="40" x2="50" y2="60" />
              <line x1="350" y1="40" x2="350" y2="60" />
              <text x="180" y="42" fill="rgba(245,208,96,1)" fontSize="14" fontFamily="monospace">12000mm</text>
              {/* Силуэт */}
              <path d="M 80 200 L 80 120 L 200 80 L 320 100 L 340 140" strokeWidth="3" />
              <circle cx="80" cy="120" r="6" />
              <circle cx="200" cy="80" r="6" />
              <circle cx="320" cy="100" r="6" />
              <rect x="60" y="200" width="280" height="40" />
              <circle cx="120" cy="260" r="20" />
              <circle cx="280" cy="260" r="20" />
            </g>
          </svg>
          {/* Угловая метка */}
          <svg
            className="absolute bottom-6 right-6 w-24 h-24 opacity-[0.1] pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="1.5" fill="none">
              <rect x="5" y="5" width="90" height="90" />
              <line x1="5" y1="30" x2="95" y2="30" />
              <line x1="5" y1="55" x2="95" y2="55" />
              <text x="10" y="22" fill="rgba(245,208,96,1)" fontSize="8" fontFamily="monospace">FAVORIT</text>
              <text x="10" y="48" fill="rgba(245,208,96,1)" fontSize="6" fontFamily="monospace">KMU-1234</text>
              <text x="10" y="72" fill="rgba(245,208,96,1)" fontSize="6" fontFamily="monospace">NN-2026</text>
            </g>
          </svg>
        </>
      );
    }

    // === Следы протекторов (шин) ===
    if (pattern === "tracks") {
      return (
        <>
          {/* Двойная дорожка следов */}
          <div
            className="absolute inset-y-0 left-[15%] w-12 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 4px, transparent 4px, transparent 16px)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              transform: "rotate(-3deg)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-[25%] w-12 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 4px, transparent 4px, transparent 16px)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              transform: "rotate(-3deg)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-[15%] w-12 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 4px, transparent 4px, transparent 16px)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              transform: "rotate(3deg)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-[25%] w-12 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 4px, transparent 4px, transparent 16px)",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              transform: "rotate(3deg)",
            }}
            aria-hidden="true"
          />
        </>
      );
    }

    // === Строительные знаки + лента ===
    if (pattern === "warning") {
      return (
        <>
          {/* Жёлто-чёрная лента сверху */}
          <div
            className="absolute inset-x-0 top-0 h-3 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 14px, transparent 14px, transparent 28px)",
              backgroundSize: "56px 100%",
              animation: "warning-tape-scroll 4s linear infinite",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-3 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(245,208,96,1) 0px, rgba(245,208,96,1) 14px, transparent 14px, transparent 28px)",
              backgroundSize: "56px 100%",
              animation: "warning-tape-scroll 4s linear infinite reverse",
            }}
            aria-hidden="true"
          />
          {/* Знак "стройка" (треугольник с восклицательным знаком) */}
          <svg
            className="absolute top-8 left-8 w-24 h-24 opacity-[0.09] pointer-events-none hidden md:block"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="3" fill="none">
              <path d="M 50 10 L 90 85 L 10 85 Z" />
              <line x1="50" y1="35" x2="50" y2="60" strokeWidth="4" />
              <circle cx="50" cy="72" r="2" fill="rgba(245,208,96,1)" />
            </g>
          </svg>
          {/* Знак "тяжёлая техника" */}
          <svg
            className="absolute bottom-8 right-8 w-24 h-24 opacity-[0.09] pointer-events-none hidden md:block"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="2.5" fill="none">
              <circle cx="50" cy="50" r="42" />
              <rect x="25" y="40" width="35" height="20" />
              <circle cx="32" cy="65" r="6" />
              <circle cx="55" cy="65" r="6" />
              <line x1="60" y1="45" x2="75" y2="35" strokeWidth="3" />
            </g>
          </svg>
        </>
      );
    }

    // === Трубы / арматура ===
    if (pattern === "pipes") {
      return (
        <>
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="3" fill="none" strokeLinecap="round">
              {/* Трубопровод сверху */}
              <path d="M -20 80 L 200 80 L 230 110 L 230 180 L 260 210 L 500 210 L 530 180 L 530 110 L 560 80 L 1220 80" />
              {/* Стыки */}
              <circle cx="230" cy="110" r="4" fill="rgba(245,208,96,1)" />
              <circle cx="230" cy="180" r="4" fill="rgba(245,208,96,1)" />
              <circle cx="530" cy="110" r="4" fill="rgba(245,208,96,1)" />
              <circle cx="530" cy="180" r="4" fill="rgba(245,208,96,1)" />
              {/* Фланцы */}
              <line x1="200" y1="70" x2="200" y2="90" strokeWidth="6" />
              <line x1="560" y1="70" x2="560" y2="90" strokeWidth="6" />

              {/* Нижняя труба */}
              <path d="M -20 320 L 400 320 L 430 290 L 700 290 L 730 320 L 1220 320" />
              <circle cx="430" cy="290" r="4" fill="rgba(245,208,96,1)" />
              <circle cx="730" cy="290" r="4" fill="rgba(245,208,96,1)" />
            </g>
          </svg>
        </>
      );
    }

    // === Контейнеры / стропы (грузы) ===
    if (pattern === "cargo") {
      return (
        <>
          {/* Контейнеры внизу */}
          <svg
            className="absolute -bottom-2 left-0 right-0 w-full h-32 opacity-[0.07] pointer-events-none"
            viewBox="0 0 1200 100"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="2" fill="none">
              {/* Ряд контейнеров */}
              <rect x="50" y="50" width="120" height="50" />
              <line x1="60" y1="60" x2="60" y2="90" />
              <line x1="160" y1="60" x2="160" y2="90" />
              <rect x="190" y="30" width="120" height="70" />
              <line x1="200" y1="40" x2="200" y2="90" />
              <line x1="300" y1="40" x2="300" y2="90" />
              <rect x="330" y="50" width="100" height="50" />
              <rect x="450" y="20" width="140" height="80" />
              <line x1="460" y1="30" x2="460" y2="90" />
              <line x1="580" y1="30" x2="580" y2="90" />
              <rect x="610" y="55" width="110" height="45" />
              <rect x="740" y="35" width="130" height="65" />
              <rect x="890" y="50" width="100" height="50" />
              <rect x="1010" y="25" width="140" height="75" />
            </g>
          </svg>
          {/* Крюк со стропами сверху */}
          <svg
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-32 opacity-[0.09] pointer-events-none hidden md:block"
            viewBox="0 0 100 120"
            aria-hidden="true"
          >
            <g stroke="rgba(245,208,96,1)" strokeWidth="2" fill="none">
              {/* Линия троса */}
              <line x1="50" y1="0" x2="50" y2="35" strokeWidth="2.5" />
              {/* Перекладина */}
              <line x1="20" y1="35" x2="80" y2="35" strokeWidth="3" />
              {/* Стропы */}
              <line x1="20" y1="35" x2="30" y2="80" />
              <line x1="80" y1="35" x2="70" y2="80" />
              {/* Крюк */}
              <path d="M 50 50 L 50 75 Q 50 90 35 90 Q 25 90 25 78" strokeWidth="3" />
            </g>
          </svg>
        </>
      );
    }

    return null;
  };

  return (
    <div className={`section-backdrop relative isolate overflow-hidden ${toneStyles[tone]} ${className}`}>
      {/* Декоративный паттерн спецтехники */}
      {renderPattern()}

      {/* Spotlight */}
      {tone === "spotlight" && (
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] h-[400px] pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(245,208,96,0.18) 0%, rgba(245,208,96,0.05) 30%, transparent 65%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Угловые золотые свечения */}
      {tone !== "transparent" && tone !== "spotlight" && (
        <>
          <div
            className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245,208,96,0.25), transparent 60%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(232,168,32,0.2), transparent 60%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Тонкие линии-границы (металлические швы) */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SectionBackdrop;