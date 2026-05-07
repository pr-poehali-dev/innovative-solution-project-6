import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
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
          <nav className="hidden md:flex gap-8 lg:gap-10 text-sm font-medium">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="font-semibold transition-colors hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ color: "#f5d680", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2 sm:gap-3 items-center">
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
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <PhoneButton size="sm" className="mt-2 w-full justify-center rounded-xl" />
          </div>
        )}
      </header>
    </>
  );
};

export default HeroHeader;