import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import { useEffect, useState } from "react";

const SUBMIT_URL = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
}

const slides = [
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg",
    alt: "FAW КМУ DongYang",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/861dfbdb-0341-4b64-ac9b-f77e5a4fa99d.jpg",
    alt: "КАМАЗ 43118 вездеход КМУ Kanglim",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/b646729f-a106-46bf-b7e4-abf0fe1c4983.jpg",
    alt: "КАМАЗ 65115 КМУ HANGIL",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/96f657e8-7741-4d2b-b428-ca560b0047fb.jpg",
    alt: "Работа манипулятора на объекте",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/0c5ebbe2-cc38-4284-81fb-4721e3e53eaa.jpg",
    alt: "Манипулятор на стройке",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/ad03fa64-abbe-491a-85cc-f51f79cefc0a.jpg",
    alt: "Перевозка торгового павильона по городу",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/f96d4e3d-b06a-4cab-818e-ba49896791b5.jpg",
    alt: "Работа автовышки на объектах РЖД",
  },
  {
    url: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/e8b0e860-8ca1-40df-8600-4d28597aa247.jpg",
    alt: "КамАЗ с манипулятором DY",
  },
];

const navLinks = [
  { href: "#features", label: "Преимущества" },
  { href: "#fleet", label: "Техника" },
  { href: "#usecases", label: "Услуги" },
  { href: "#how", label: "Как это работает" },
  { href: "#pricing", label: "Тарифы" },
];

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cargo, setCargo] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment: cargo }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setCargo("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
            <button className="hidden sm:block px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-bold rounded-full transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #f5d060, #e8a820, #c8850a)", color: "#1a1a1a", fontFamily: "'Cinzel', serif" }}>
              Заказать
            </button>
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

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Слайдер фото */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Затемнение */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />

        {/* Точки-индикаторы */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-32">
          <div className={`max-w-2xl transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-4 sm:mb-8 inline-block">
              <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                Аренда и услуги манипуляторов в Нижнем Новгороде
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black leading-tight mb-5 sm:mb-8 tracking-tighter">
              <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                Манипуляторы
              </span>
              <br />
              <span className="text-accent">в аренду</span>
              <br />
              <span className="text-white/70 text-xl sm:text-3xl lg:text-5xl">в Нижнем Новгороде</span>
            </h1>
            <p className="text-sm sm:text-xl text-white/80 leading-relaxed mb-7 sm:mb-10 max-w-full sm:max-w-xl font-light">
              Оставьте заявку или позвоните — мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью под вашу задачу.
            </p>
            <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12 flex-col sm:flex-row">
              <a href="#fleet" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-base sm:text-lg text-white text-center">
                Посмотреть технику
              </a>
            </div>

            {/* Форма заявки */}
            {status === "success" ? (
              <div className="bg-accent/10 border border-accent/30 rounded-2xl px-6 py-5 flex items-center gap-3">
                <Icon name="CheckCircle" size={22} className="text-accent shrink-0" />
                <div>
                  <p className="font-semibold text-white">Заявка принята!</p>
                  <p className="text-sm text-white/60">Мы перезвоним вам в ближайшее время.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Что перевозим? (например: металлоконструкции, оборудование, стройматериалы)"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-black rounded-xl font-semibold text-sm flex items-center gap-2 justify-center hover:shadow-lg hover:shadow-accent/40 transition-all disabled:opacity-60 shrink-0"
                >
                  {status === "loading" ? "Отправка..." : (
                    <>Оставить заявку <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" /></>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-400 text-xs mt-1 sm:col-span-3">Ошибка отправки, попробуйте ещё раз.</p>
                )}
              </form>
            )}
            <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">15+</div>
                <p className="text-xs sm:text-sm text-white/60">Единиц техники</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">5 000+</div>
                <p className="text-xs sm:text-sm text-white/60">Выполненных заказов</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">10 лет</div>
                <p className="text-xs sm:text-sm text-white/60">На рынке</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;