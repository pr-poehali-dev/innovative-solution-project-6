import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import MobileCallPopover from "@/components/ui/MobileCallPopover";
import BrandLogo from "@/components/ui/BrandLogo";
import OfflineStatusDot from "@/components/ui/OfflineStatusDot";
import MaterialsMenu from "./MaterialsMenu";
import { navLinks } from "./heroData";
import { MATERIAL_CATEGORIES } from "@/data/materials";

const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [matOpen, setMatOpen] = useState(false);
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
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3 lg:gap-6 transition-all duration-300 ${scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-5"}`}>
          <div className="min-w-0 shrink">
            <BrandLogo compact={scrolled} />
          </div>
          <nav className="hidden lg:flex gap-4 xl:gap-6 text-sm font-medium items-center shrink-0">
            {navLinks.map(link => {
              if (link.href === "/stroymaterialy") {
                return <MaterialsMenu key={link.href} />;
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex items-center gap-1.5 py-1.5 whitespace-nowrap transition-all hover:-translate-y-0.5"
                >
                  <Icon
                    name={link.icon}
                    size={14}
                    className="text-accent/70 group-hover:text-accent transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  />
                  <span
                    className="font-bold bg-gradient-to-b from-[#fff3c4] via-[#f5d680] to-[#d9a441] bg-clip-text text-transparent group-hover:from-white group-hover:via-[#ffe9a8] group-hover:to-[#f5d680] transition-all"
                    style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}
                  >
                    {link.label}
                  </span>
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 group-hover:w-full rounded-full bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-300" />
                </a>
              );
            })}
          </nav>
          <div className="flex gap-2 sm:gap-3 items-center shrink-0">
            <OfflineStatusDot />
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <MobileCallPopover className="flex sm:hidden" />

            {/* Бургер — только мобайл */}
            <button
              className="flex lg:hidden w-10 h-10 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="lg:hidden border-t border-accent/10 bg-background/95 backdrop-blur-2xl px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map(link => {
              if (link.href === "/stroymaterialy") {
                return (
                  <div key={link.href} className="rounded-xl bg-white/5 border border-accent/20 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMatOpen(prev => !prev)}
                      className="w-full py-3 px-4 flex items-center gap-2 text-sm font-bold text-white"
                    >
                      <Icon name="Package" size={16} className="text-accent" />
                      Стройматериалы
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-accent text-black text-[9px] font-black">
                        NEW
                      </span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className={`text-accent transition-transform ${matOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {matOpen && (
                      <div className="px-2 pb-2 flex flex-col gap-0.5">
                        {MATERIAL_CATEGORIES.map(c => (
                          <a
                            key={c.slug}
                            href={`/stroymaterialy?cat=${c.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-white/75 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Icon name={c.icon} size={14} className="text-accent shrink-0" />
                            {c.label}
                          </a>
                        ))}
                        <a
                          href="/asfaltirovanie"
                          onClick={() => setMenuOpen(false)}
                          className="mt-1 flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-white shadow-md"
                        >
                          <Icon name="Hammer" size={14} className="text-white shrink-0" />
                          Асфальтирование
                          <span className="ml-auto px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-black">
                            NEW
                          </span>
                        </a>
                        <a
                          href="/stroymaterialy"
                          onClick={() => setMenuOpen(false)}
                          className="mt-1 py-2.5 px-3 rounded-lg text-sm font-bold text-center bg-accent/15 text-accent"
                        >
                          Весь каталог →
                        </a>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-white/80 hover:text-white hover:bg-accent/10 border border-transparent hover:border-accent/25 transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center shrink-0 transition-colors">
                    <Icon name={link.icon} size={15} className="text-accent" />
                  </span>
                  <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}>
                    {link.label}
                  </span>
                  <Icon
                    name="ChevronRight"
                    size={15}
                    className="ml-auto text-accent/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  />
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