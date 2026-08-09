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
        className="group relative inline-flex items-center gap-1.5 py-1.5 whitespace-nowrap transition-all hover:-translate-y-0.5"
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
        <Icon
          name="ChevronDown"
          size={13}
          className={`text-accent/70 transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`}
        />
        <span
          className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-300 ${open ? "w-full" : "w-0 group-hover:w-full"}`}
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
            <div className="my-2 mx-1 border-t border-accent/15" />

            <a
              href="/asfaltirovanie"
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 transition-all"
            >
              <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Icon name="Hammer" size={15} className="text-white" />
              </span>
              Асфальтирование
              <span className="ml-auto px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-black tracking-wider">
                NEW
              </span>
            </a>

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