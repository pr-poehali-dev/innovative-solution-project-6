import Icon from "@/components/ui/icon";

const MaterialsMenu = () => (
  <a
    href="/stroymaterialy/kirpich"
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
  </a>
);

export default MaterialsMenu;
