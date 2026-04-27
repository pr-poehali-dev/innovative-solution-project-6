import { useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import CallbackModal from "@/components/ui/CallbackModal";
import ShareButton from "@/components/ui/ShareButton";
import { navLinks } from "./heroData";

const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo />
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="font-semibold transition-colors hover:opacity-80" style={{ color: "#e8a820", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}>{link.label}</a>
            ))}
          </nav>
          <div className="flex gap-2 sm:gap-3 items-center">
            {/* Поделиться сайтом */}
            <ShareButton
              iconOnly
              menuAlign="right"
              title="ООО Фаворит — аренда манипуляторов и спецтехники в Нижнем Новгороде"
              text="Аренда манипуляторов и экскаваторов-погрузчиков в Нижнем Новгороде. ООО Фаворит, +7 960 188-30-84"
              url="https://фаварит.рф"
            />

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
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setCallbackOpen(true); }}
              className="mt-1 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-accent/40 bg-accent/5 text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={16} className="text-accent" />
              Заказать обратный звонок
            </button>
          </div>
        )}
      </header>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
};

export default HeroHeader;