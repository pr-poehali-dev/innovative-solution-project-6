import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  { to: "/stroymaterialy", label: "Все материалы", icon: "LayoutGrid" },
  { to: "/stroymaterialy/kirpich", label: "Кирпич силикатный", icon: "Blocks" },
  { to: "/stroymaterialy/bloki", label: "Газоблоки", icon: "Package" },
  { to: "/stroymaterialy/bordyur", label: "Бордюр", icon: "RectangleHorizontal" },
  { to: "/stroymaterialy/plity", label: "Плиты и ФБС", icon: "Layers" },
  { to: "/stroymaterialy/keramicheskiy-oblicovochnyy", label: "Облицовочный кирпич", icon: "Sparkles" },
  { to: "/stroymaterialy/keramicheskiy", label: "Керамический кирпич", icon: "BrickWall" },
  { to: "/stroymaterialy/betonnye-kolca", label: "Бетонные кольца", icon: "Circle" },
  { to: "/asfaltirovanie", label: "Асфальтирование", icon: "Truck" },
];

const MaterialsNav = () => {
  const { pathname } = useLocation();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <nav aria-label="Разделы стройматериалов" className="border-t border-accent/10">
      <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-10 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((it) => {
          const active = pathname.replace(/\/$/, "") === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              ref={active ? activeRef : undefined}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                active
                  ? "bg-accent text-black shadow-lg shadow-accent/30"
                  : "border border-accent/25 bg-card/50 text-white hover:border-accent/70 hover:text-accent"
              }`}
            >
              <Icon name={it.icon} size={15} className={active ? "text-black" : "text-accent"} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MaterialsNav;
