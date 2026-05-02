import { useEffect, useState } from "react";
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

const OPEN_HOUR = 7;
const CLOSE_HOUR = 22;

const getStatus = () => {
  const now = new Date();
  const hour = now.getHours();
  const online = hour >= OPEN_HOUR && hour < CLOSE_HOUR;

  if (online) {
    return { online: true, timeLeft: "" };
  }

  const openDate = new Date(now);
  if (hour >= CLOSE_HOUR) {
    openDate.setDate(openDate.getDate() + 1);
  }
  openDate.setHours(OPEN_HOUR, 0, 0, 0);

  const diffMs = openDate.getTime() - now.getTime();
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let timeLeft = "";
  if (hours > 0 && minutes > 0) timeLeft = `${hours} ч ${minutes} мин`;
  else if (hours > 0) timeLeft = `${hours} ч`;
  else timeLeft = `${minutes} мин`;

  return { online: false, timeLeft };
};

const BrandLogo = ({ to = "/", size = "md" }: BrandLogoProps) => {
  const imgSize = size === "sm" ? "w-9 h-9 sm:w-12 sm:h-12" : "w-14 h-14 sm:w-20 sm:h-20";
  const titleSize = size === "sm" ? "text-base sm:text-xl" : "text-xl sm:text-3xl";

  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const tick = () => setStatus(getStatus());
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="flex items-center gap-2 flex-wrap">
          <span className="block text-[9px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.25em] uppercase" style={{ color: "#c8a020" }}>Компания</span>
          {status.online ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/40" title="Работаем сейчас — звоните">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-1.5 h-1.5 bg-green-400" />
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-green-400">Онлайн</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/10 border border-white/20" title={`Откроемся через ${status.timeLeft}. Работаем с 7:00 до 22:00`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white/70">Оффлайн</span>
            </span>
          )}
        </div>
        {!status.online && status.timeLeft && (
          <span className="block text-[9px] sm:text-[10px] font-semibold mt-0.5" style={{ color: "#e8a820" }}>
            Откроемся через {status.timeLeft}
          </span>
        )}
        <span className={`font-black drop-shadow-lg ${titleSize}`} style={goldText}>
          ООО Фаворит
        </span>
        <span className="block text-[9px] sm:text-xs tracking-widest uppercase" style={{ color: "#f0c860", letterSpacing: "0.18em" }}>Надёжная аренда манипуляторов</span>
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