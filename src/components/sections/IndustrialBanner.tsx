import Icon from "@/components/ui/icon";

interface IndustrialBannerProps {
  /** Маленький лейбл сверху (например "СОБСТВЕННЫЙ ПАРК") */
  eyebrow?: string;
  /** Главный заголовок — первая часть (белая) */
  titleStart: string;
  /** Главный заголовок — вторая часть (золотая) */
  titleAccent: string;
  /** Подпись под заголовком (опционально) */
  subtitle?: string;
  /** URL фонового изображения. По умолчанию — фото техники */
  imageUrl?: string;
  /** Высота баннера (по умолчанию средняя) */
  size?: "sm" | "md" | "lg";
  /** Иконка слева от лейбла (lucide name) */
  icon?: string;
  /** Действие при клике (опционально) */
  onClick?: () => void;
  /** Ссылка-якорь (опционально) */
  href?: string;
  /** ID секции для якоря */
  id?: string;
}

const DEFAULT_IMAGE =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/b030b7fd-d2de-459a-ae3c-2dc72f394346.png";

const IndustrialBanner = ({
  eyebrow = "СОБСТВЕННЫЙ ПАРК",
  titleStart,
  titleAccent,
  subtitle,
  imageUrl = DEFAULT_IMAGE,
  size = "md",
  icon = "Truck",
  onClick,
  href,
  id,
}: IndustrialBannerProps) => {
  const heights = {
    sm: "h-[200px] sm:h-[240px]",
    md: "h-[260px] sm:h-[320px] md:h-[360px]",
    lg: "h-[340px] sm:h-[420px] md:h-[480px]",
  };

  const titleSizes = {
    sm: "text-3xl sm:text-4xl md:text-5xl",
    md: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    lg: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  };

  const Wrapper = href ? "a" : ("section" as const);
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      id={id}
      onClick={onClick}
      {...wrapperProps}
      className={`relative block w-full overflow-hidden ${heights[size]} group cursor-${
        href || onClick ? "pointer" : "default"
      }`}
      aria-label={`${titleStart} ${titleAccent}`}
    >
      {/* === Фоновое изображение === */}
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
      />

      {/* === Тёмное затемнение (основное) === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,20,30,0.75) 0%, rgba(15,20,30,0.55) 50%, rgba(15,20,30,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* === Боковые виньетки (затемнение по краям) === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,20,30,0.85) 0%, transparent 30%, transparent 70%, rgba(15,20,30,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* === Тёплый золотой свет в центре (имитация солнца) === */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,208,96,0.25) 0%, rgba(245,208,96,0.08) 30%, transparent 65%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* === Жёлто-чёрная индустриальная лента сверху === */}
      <div
        className="absolute top-0 inset-x-0 h-1.5 opacity-80 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f5d060 0px, #f5d060 14px, rgba(15,20,30,0.9) 14px, rgba(15,20,30,0.9) 28px)",
          backgroundSize: "56px 100%",
          animation: "warning-tape-scroll 4s linear infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-1.5 opacity-80 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f5d060 0px, #f5d060 14px, rgba(15,20,30,0.9) 14px, rgba(15,20,30,0.9) 28px)",
          backgroundSize: "56px 100%",
          animation: "warning-tape-scroll 4s linear infinite reverse",
        }}
        aria-hidden="true"
      />

      {/* === Угловые декоративные «уголки» (как на технической рамке) === */}
      <span className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-accent/60 pointer-events-none" aria-hidden="true" />
      <span className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-accent/60 pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent/60 pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-accent/60 pointer-events-none" aria-hidden="true" />

      {/* === Контент === */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Eyebrow с иконкой */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4 opacity-90">
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-white/60" />
          {icon && <Icon name={icon} size={16} className="text-white/80" />}
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-white/90 uppercase">
            {eyebrow}
          </span>
          {icon && <Icon name={icon} size={16} className="text-white/80" />}
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-white/60" />
        </div>

        {/* Главный заголовок */}
        <h2
          className={`${titleSizes[size]} font-black uppercase tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]`}
        >
          <span className="text-white">{titleStart} </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, #ffe890 0%, #f5d060 50%, #e8a820 100%)",
            }}
          >
            {titleAccent}
          </span>
        </h2>

        {/* Подпись */}
        {subtitle && (
          <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {subtitle}
          </p>
        )}

        {/* Декоративная линия снизу с ромбом */}
        <div className="mt-5 sm:mt-6 flex items-center gap-3 opacity-80">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-accent/60 to-accent" />
          <span className="w-2 h-2 rotate-45 bg-accent shadow-[0_0_12px_rgba(245,208,96,0.9)]" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-accent/60 to-accent" />
        </div>
      </div>

      {/* === Бегущий блик при наведении === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 -left-1/4 w-1/3 h-full opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
            transform: "skewX(-15deg)",
            animation: "divider-shimmer 2.5s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>
    </Wrapper>
  );
};

export default IndustrialBanner;
