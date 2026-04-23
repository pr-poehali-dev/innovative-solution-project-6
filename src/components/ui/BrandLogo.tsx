import { Link } from "react-router-dom";

const LOGO_URL = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp";

const goldText = {
  background: "linear-gradient(135deg, #f5d060 0%, #e8a820 40%, #fdeea0 60%, #c8850a 80%, #f0c040 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  fontFamily: "'Cinzel', serif",
  letterSpacing: "0.08em",
};

interface BrandLogoProps {
  to?: string;
  size?: "sm" | "md";
}

const BrandLogo = ({ to = "/", size = "md" }: BrandLogoProps) => {
  const imgSize = size === "sm" ? "w-9 h-9 sm:w-12 sm:h-12" : "w-14 h-14 sm:w-20 sm:h-20";
  const titleSize = size === "sm" ? "text-base sm:text-xl" : "text-xl sm:text-3xl";

  const content = (
    <div className="flex items-center gap-3">
      <img
        src={LOGO_URL}
        alt="Фаворит герб"
        className={`${imgSize} flex-shrink-0 rounded-xl object-cover logo-glow`}
        width="80"
        height="80"
        decoding="async"
      />
      <div className="flex flex-col leading-tight">
        <span className="block text-[9px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.25em] uppercase" style={{ color: "#c8a020" }}>Компания</span>
        <span className={`font-black drop-shadow-lg ${titleSize}`} style={goldText}>
          ООО Фаворит
        </span>
        <span className="block text-[9px] sm:text-xs tracking-widest uppercase" style={{ color: "#a07010", letterSpacing: "0.18em" }}>Надёжная аренда манипуляторов</span>
      </div>
    </div>
  );

  return (
    <Link to={to} className="hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
};

export default BrandLogo;