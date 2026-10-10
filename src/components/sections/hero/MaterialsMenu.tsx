import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { HEADER_MENU_CATEGORIES } from "@/data/materials";

export const materialHref = (c: (typeof HEADER_MENU_CATEGORIES)[number]) =>
  "href" in c && c.href ? c.href : `/stroymaterialy/${c.slug}`;

export const MATERIALS_MAIN_HREF = HEADER_MENU_CATEGORIES[0] ? materialHref(HEADER_MENU_CATEGORIES[0]) : "/stroymaterialy";
export const MATERIALS_HAS_DROPDOWN = HEADER_MENU_CATEGORIES.length > 1;

const MaterialsMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => MATERIALS_HAS_DROPDOWN && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={MATERIALS_MAIN_HREF}
        className="group relative inline-flex items-center gap-1.5 py-1.5 px-3 -mx-1 rounded-lg border border-accent/35 bg-accent/10 hover:bg-accent/15 hover:border-accent/60 shadow-[0_0_14px_rgba(232,168,32,0.18)] whitespace-nowrap transition-all hover:-translate-y-0.5"
      >
        <Icon
          name="Package"
          size={14}
          className="text-accent/70 group-hover:text-accent transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        />
        <span
          className="font-bold bg-gradient-to-b from-[#fff3c4] via-[#f5d680] to-[#d9a441] bg-clip-text text-transparent group-hover:from-white group-hover:via-[#ffe9a8] group-hover:to-[#f5d680] transition-all"
          style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}
        >
          Стройматериалы
        </span>
        {MATERIALS_HAS_DROPDOWN && (
          <Icon
            name="ChevronDown"
            size={13}
            className={`text-accent/70 transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`}
          />
        )}
      </a>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
          <div className="w-64 rounded-2xl border border-accent/40 bg-[#0e1420] shadow-2xl shadow-black/80 p-2">
            {HEADER_MENU_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={materialHref(c)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-accent/10 transition-all"
              >
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={15} className="text-accent" />
                </span>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsMenu;
