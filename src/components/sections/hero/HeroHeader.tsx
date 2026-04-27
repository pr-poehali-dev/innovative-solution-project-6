import { useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import ShareButton from "@/components/ui/ShareButton";
import ContractModal from "@/components/ui/ContractModal";
import { navLinks } from "./heroData";

const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);

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
            {/* Договор */}
            <button
              type="button"
              onClick={() => setContractOpen(true)}
              title="Договор аренды техники"
              className="group relative flex w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all"
              aria-label="Договор аренды"
            >
              <Icon name="FileText" size={18} className="text-accent" />
              <span className="pointer-events-none absolute top-full mt-2 right-0 px-3 py-1.5 rounded-lg bg-black/90 border border-accent/30 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-50">
                Скачать договор аренды
              </span>
            </button>

            {/* Поделиться сайтом */}
            <ShareButton
              iconOnly
              menuAlign="right"
              tooltip="Отправить ссылку на сайт"
              title="ООО Фаворит — аренда манипуляторов и спецтехники в Нижнем Новгороде"
              text="Аренда манипуляторов и экскаваторов-погрузчиков в Нижнем Новгороде. ООО Фаворит, +7 960 188-30-84. Сайт: https://фаварит.рф"
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
          </div>
        )}
      </header>
      <ContractModal open={contractOpen} onClose={() => setContractOpen(false)} />
    </>
  );
};

export default HeroHeader;