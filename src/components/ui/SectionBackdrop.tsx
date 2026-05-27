import { ReactNode } from "react";

type Tone = "deep" | "soft" | "warm" | "tech" | "spotlight" | "transparent";

interface SectionBackdropProps {
  children: ReactNode;
  tone?: Tone;
  pattern?: "grid" | "dots" | "diagonal" | "none";
  className?: string;
}

/**
 * Декоративная подложка для секций — даёт визуальный ритм страницы.
 * НЕ влияет на SEO-контент внутри — это чисто визуальный wrapper.
 */
const SectionBackdrop = ({
  children,
  tone = "deep",
  pattern = "none",
  className = "",
}: SectionBackdropProps) => {
  // === Базовые фоны по тональностям ===
  const toneStyles: Record<Tone, string> = {
    // DEEP — глубокий тёмный (как ночное небо)
    deep: "bg-gradient-to-b from-background via-[hsl(220,15%,22%)] to-background",
    // SOFT — мягкий светлый (приподнятая секция)
    soft: "bg-gradient-to-b from-background via-[hsl(220,15%,32%)] to-background",
    // WARM — тёплый с золотым отливом
    warm: "bg-gradient-to-br from-background via-[hsl(40,20%,26%)]/40 to-background",
    // TECH — холодный сине-серый (для техники)
    tech: "bg-gradient-to-br from-background via-[hsl(200,18%,24%)] to-background",
    // SPOTLIGHT — с эффектом прожектора
    spotlight: "bg-background",
    // TRANSPARENT — без фона
    transparent: "",
  };

  // === Декоративные паттерны ===
  const patternEl = () => {
    if (pattern === "grid") {
      return (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,208,96,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,208,96,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
          }}
          aria-hidden="true"
        />
      );
    }
    if (pattern === "dots") {
      return (
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(245,208,96,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      );
    }
    if (pattern === "diagonal") {
      return (
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(245,208,96,0.6) 0px, rgba(245,208,96,0.6) 1px, transparent 1px, transparent 18px)",
          }}
          aria-hidden="true"
        />
      );
    }
    return null;
  };

  return (
    <div className={`relative isolate ${toneStyles[tone]} ${className}`}>
      {/* Паттерн */}
      {patternEl()}

      {/* Spotlight — мягкое пятно света сверху */}
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

      {/* Угловые акценты — золотые подсветки в углах */}
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

      {/* Тонкие линии-границы по краям секции */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SectionBackdrop;
