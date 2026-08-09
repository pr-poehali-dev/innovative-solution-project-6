import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { MATERIAL_CATEGORIES } from "@/data/materials";

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
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a
        href="/stroymaterialy"
        className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        style={{ color: "#f5d680", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
      >
        Стройматериалы
        <Icon
          name="ChevronDown"
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </a>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
          <div className="w-64 rounded-2xl border border-accent/30 bg-background/98 backdrop-blur-2xl shadow-2xl shadow-black/60 p-2">
            {MATERIAL_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`/stroymaterialy?cat=${c.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-accent/10 transition-all"
              >
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={15} className="text-accent" />
                </span>
                {c.label}
              </a>
            ))}
            <a
              href="/stroymaterialy"
              className="flex items-center justify-center gap-2 mt-2 mx-1 mb-1 px-3 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              Весь каталог
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsMenu;
