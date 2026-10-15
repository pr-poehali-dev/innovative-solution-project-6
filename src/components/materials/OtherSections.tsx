import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  { to: "/stroymaterialy/kirpich", title: "Кирпич силикатный", text: "Белый и цветной, М-150", image: "/img/hub-silikat.jpg" },
  { to: "/stroymaterialy/bloki", title: "Газосиликатные блоки", text: "D500–D600, 4 размера", image: "/img/hub-bloki.jpg" },
  { to: "/stroymaterialy/bordyur", title: "Бордюр", text: "Дорожный и тротуарный", image: "/img/hub-bordyur.jpg" },
  { to: "/stroymaterialy/pilomaterialy", title: "Пиломатериалы", text: "Доска, брус, вагонка", image: "/img/hub-pilomaterialy.jpg" },
  { to: "/stroymaterialy/plity", title: "Плиты перекрытия и ФБС", text: "С укладкой манипулятором", image: "/img/hub-plity.jpg?v=2" },
  { to: "/stroymaterialy/keramicheskiy-oblicovochnyy", title: "Облицовочный кирпич", text: "Для красивого фасада", image: "/img/hub-oblic.jpg?v=2" },
  { to: "/stroymaterialy/keramicheskiy", title: "Керамический кирпич", text: "Полнотелый и пустотелый", image: "/img/hub-keram.jpg?v=2" },
  { to: "/stroymaterialy/betonnye-kolca", title: "Бетонные кольца", text: "Для колодцев и септиков", image: "/img/hub-kolca.jpg" },
];

const OtherSections = ({ current }: { current: string }) => {
  const items = SECTIONS.filter((s) => s.to !== `/stroymaterialy/${current}`);

  return (
    <div className="mt-10">
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-2xl font-black text-white">Другие стройматериалы</h2>
        <Link to="/stroymaterialy" className="shrink-0 inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline">
          Все
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group shrink-0 w-[44%] sm:w-auto snap-start rounded-2xl overflow-hidden border border-white/10 bg-card/60 hover:border-accent/70 transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3">
              <p className="text-white font-bold text-sm leading-tight">{s.title}</p>
              <p className="text-muted-foreground text-xs mt-1">{s.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherSections;
