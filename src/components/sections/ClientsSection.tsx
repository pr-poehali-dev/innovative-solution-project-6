const clients = [
  { name: "ЛУКОЙЛ", color: "#e8001d" },
  { name: "ГАЗ", color: "#003087" },
  { name: "Нижегородский водоканал", color: "#0077b6" },
  { name: "Нижегородская\nсетевая компания", color: "#f5a623" },
  { name: "Волга-Девелопмент", color: "#e05c1a" },
  { name: "X5 Retail Group", color: "#e2001a" },
  { name: "Нижфарм", color: "#00843d" },
  { name: "Сибур", color: "#003f7f" },
  { name: "Металлист НН", color: "#444" },
  { name: "ТД Нижегородский", color: "#8b0000" },
  { name: "АрхСтрой НН", color: "#2d6a4f" },
  { name: "РЖД", color: "#e21a1a" },
];

const ClientsSection = () => {
  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-14">
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Партнёры</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Наши заказчики
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl">
            Среди наших клиентов — крупнейшие предприятия и организации Нижегородской области
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {clients.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white rounded-2xl px-4 py-6 sm:py-8 min-h-[90px] sm:min-h-[110px] hover:scale-105 transition-transform duration-200 cursor-default"
            >
              <span
                className="font-black text-center text-sm sm:text-base leading-tight whitespace-pre-line"
                style={{ color: client.color }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
