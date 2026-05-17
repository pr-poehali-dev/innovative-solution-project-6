import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import OfflineStatusDot from "@/components/ui/OfflineStatusDot";
import { navLinks } from "./heroData";

const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 w-full bg-background/95 lg:bg-background/85 backdrop-blur-2xl border-b border-accent/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] z-50 transition-all duration-300 ${scrolled ? "bg-background/98 lg:bg-background/95" : ""}`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-300 ${scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-5"}`}>
          <BrandLogo compact={scrolled} />
          <nav className="hidden md:flex gap-8 lg:gap-10 text-sm font-medium items-center">
            {navLinks.map(link => {
              const isAsphalt = link.href === "/asfaltirovanie";
              if (isAsphalt) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/60 hover:scale-105 transition-all animate-pulse"
                    style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
                  >
                    <Icon name="Sparkles" size={14} className="text-white drop-shadow" />
                    <span className="relative">{link.label}</span>
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-black tracking-wider shadow-md whitespace-nowrap">
                      NEW
                    </span>
                  </a>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-semibold transition-colors hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ color: "#f5d680", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="flex gap-2 sm:gap-3 items-center">
            <OfflineStatusDot />
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />

            {/* Бургер — только мобайл */}
            <button
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="md:hidden border-t border-accent/10 bg-background/95 backdrop-blur-2xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => {
              const isAsphalt = link.href === "/asfaltirovanie";
              if (isAsphalt) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative py-3 px-4 rounded-xl text-sm font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 animate-pulse"
                  >
                    <Icon name="Sparkles" size={16} className="text-white drop-shadow" />
                    <span>{link.label}</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black tracking-wider shadow-md">
                      NEW
                    </span>
                  </a>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-2 pt-3 border-t border-accent/10 flex flex-col gap-2" onClick={() => setMenuOpen(false)}>
              <PhoneButton size="sm" className="w-full justify-center rounded-xl" />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeroHeader;