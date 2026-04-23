import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import { useEffect, useRef, useState } from "react";

const SUBMIT_URL = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
}

const WEBP_BASE = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp";

const slides: { id: string; alt: string }[] = [
  { id: "df8d23ad-2b19-4a5c-bfef-8403f404cab9", alt: "FAW КМУ DongYang" },
  { id: "861dfbdb-0341-4b64-ac9b-f77e5a4fa99d", alt: "КАМАЗ 43118 вездеход КМУ Kanglim" },
  { id: "b646729f-a106-46bf-b7e4-abf0fe1c4983", alt: "КАМАЗ 65115 КМУ HANGIL" },
  { id: "96f657e8-7741-4d2b-b428-ca560b0047fb", alt: "Работа манипулятора на объекте" },
  { id: "0c5ebbe2-cc38-4284-81fb-4721e3e53eaa", alt: "Манипулятор на стройке" },
  { id: "ad03fa64-abbe-491a-85cc-f51f79cefc0a", alt: "Перевозка торгового павильона по городу" },
  { id: "f96d4e3d-b06a-4cab-818e-ba49896791b5", alt: "Работа автовышки на объектах РЖД" },
  { id: "e8b0e860-8ca1-40df-8600-4d28597aa247", alt: "КамАЗ с манипулятором DY" },
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
  const touchStartX = useRef<number | null>(null);

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
      <section id="hero" className="relative lg:min-h-screen lg:flex lg:items-center overflow-hidden">

        {/* Мобильный и планшетный слайдер — премиум-карточка с рамкой и бликами */}
        <div className="relative lg:hidden w-full pt-20 pb-6 px-3 sm:px-6 md:px-10 bg-gradient-to-b from-background via-background to-black/80">
          {/* Декор — размытые золотые круги */}
          <div className="absolute top-16 -left-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -right-10 w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            {/* Бейдж над фото */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg shadow-accent/30"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                  <span className="relative rounded-full w-2 h-2 bg-white" />
                </span>
                <span className="text-black text-[11px] sm:text-sm font-black uppercase tracking-widest">Наш автопарк</span>
              </div>
              <div className="text-white text-sm sm:text-base font-mono tabular-nums font-bold">
                <span className="text-accent">{String(current + 1).padStart(2, "0")}</span>
                <span className="text-white/50"> / {String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Карточка с фото */}
            <div className="relative rounded-3xl p-[2px]" style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.6) 0%, rgba(232,168,32,0.1) 40%, rgba(232,168,32,0.05) 60%, rgba(232,168,32,0.5) 100%)" }}>
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const startX = touchStartX.current;
                if (startX === null) return;
                const endX = e.changedTouches[0].clientX;
                const diff = endX - startX;
                if (Math.abs(diff) > 40) {
                  if (diff < 0) setCurrent((prev) => (prev + 1) % slides.length);
                  else setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
                }
                touchStartX.current = null;
              }}
            >
              {/* Сетка-узор на фоне */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(232,168,32,0.3) 1px, transparent 0)", backgroundSize: "20px 20px" }} />

              {slides.map((slide, i) => {
                const isActive = i === current;
                const shouldRender = isActive || i === 0;
                if (!shouldRender) return null;
                const src800 = `${WEBP_BASE}/w800/${slide.id}.webp`;
                const src1600 = `${WEBP_BASE}/w1600/${slide.id}.webp`;
                return (
                  <div
                    key={i}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                  >
                    <img
                      src={src1600}
                      srcSet={`${src800} 800w, ${src1600} 1600w`}
                      sizes="100vw"
                      alt={slide.alt}
                      className="w-full h-full object-contain object-center drop-shadow-2xl"
                      width="1600"
                      height="900"
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "low"}
                      decoding="async"
                    />
                  </div>
                );
              })}

              {/* Блик сверху */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              {/* Стрелки навигации */}
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-90 transition-transform z-10"
                aria-label="Предыдущий слайд"
              >
                <Icon name="ChevronLeft" size={18} className="text-white" />
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-90 transition-transform z-10"
                aria-label="Следующий слайд"
              >
                <Icon name="ChevronRight" size={18} className="text-white" />
              </button>

              {/* Подпись слайда */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p key={current} className="text-white text-sm font-semibold text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {slides[current].alt}
                </p>
              </div>
            </div>
          </div>

          {/* Прогресс-полоска + точки */}
          <div className="relative mt-4 px-1">
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                key={current}
                className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-full"
                style={{ animation: "heroProgress 4s linear forwards" }}
              />
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Перейти к слайду ${i + 1} из ${slides.length}`}
                  aria-current={i === current ? "true" : undefined}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
          </div>
          <style>{`@keyframes heroProgress { from { width: 0% } to { width: 100% } }`}</style>
        </div>

        {/* Десктопный слайдер — фон на весь экран */}
        {slides.map((slide, i) => {
          const isActive = i === current;
          const shouldRender = isActive || i === 0;
          if (!shouldRender) return null;
          const src800 = `${WEBP_BASE}/w800/${slide.id}.webp`;
          const src1600 = `${WEBP_BASE}/w1600/${slide.id}.webp`;
          return (
            <div
              key={i}
              className={`hidden lg:block absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={src1600}
                srcSet={`${src800} 800w, ${src1600} 1600w`}
                sizes="100vw"
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                width="1600"
                height="900"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
              />
            </div>
          );
        })}

        {/* Затемнение — только для десктопа */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10 z-10" />

        {/* Точки-индикаторы — десктоп */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-0 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Перейти к слайду ${i + 1} из ${slides.length}`}
              aria-current={i === current ? "true" : undefined}
              className="p-3 group"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/40 group-hover:bg-white/70"}`}
              />
            </button>
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 lg:pt-32 pb-16 sm:pb-32">
          <div className={`max-w-2xl transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-4 sm:mb-8 inline-block">
              <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                Аренда и услуги манипуляторов в Нижнем Новгороде
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-5 sm:mb-8 tracking-tighter">
              <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">Манипуляторы </span>
              <span className="text-accent">в аренду </span>
              <span className="text-white/70">в Нижнем Новгороде</span>
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
              <form onSubmit={handleSubmit} className="bg-transparent border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
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

          <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10 mt-8">
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