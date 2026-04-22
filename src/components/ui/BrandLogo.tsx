import { Link } from "react-router-dom";

const LOGO_URL = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/files/70f37e87-7308-44c5-ba56-e221771fff69.jpg";

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
  const imgSize = size === "sm" ? "w-10 h-10" : "w-14 h-14 sm:w-16 sm:h-16";
  const titleSize = size === "sm" ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl";

  const content = (
    <div className="flex items-center gap-3">
      <img
        src={LOGO_URL}
        alt="Фаворит герб"
        className={`${imgSize} flex-shrink-0 rounded-xl object-cover`}
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#c8a020" }}>Компания</span>
        <span className={`font-black drop-shadow-lg ${titleSize}`} style={goldText}>
          ООО Фаворит
        </span>
        <span className="text-xs tracking-widest uppercase" style={{ color: "#a07010", letterSpacing: "0.2em" }}>Аренда манипуляторов</span>
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
