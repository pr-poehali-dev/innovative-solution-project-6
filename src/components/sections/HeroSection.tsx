import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

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
];

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <div className="font-display font-bold text-xl sm:text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            ООО Фаворит
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">Преимущества</a>
            <a href="#fleet" className="text-muted-foreground hover:text-white transition-colors">Техника</a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">Как это работает</a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">Тарифы</a>
          </nav>
          <div className="flex gap-2 sm:gap-3">
            <a href="tel:+79601883084" className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 960 188-30-84
            </a>
            <a href="tel:+79601883084" className="flex sm:hidden w-10 h-10 border border-accent/40 rounded-full hover:bg-accent/10 transition-all items-center justify-center">
              <Icon name="Phone" size={16} className="text-accent" />
            </a>
            <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Заказать
            </button>
          </div>
        </div>
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
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black leading-tight mb-5 sm:mb-8 tracking-tighter">
              <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                Манипуляторы
              </span>
              <br />
              <span className="text-accent">в аренду</span>
              <br />
              <span className="text-white/70 text-2xl sm:text-3xl lg:text-5xl">в Нижнем Новгороде</span>
            </h1>
            <p className="text-base sm:text-xl text-white/80 leading-relaxed mb-7 sm:mb-10 max-w-xl font-light">
              Оставьте заявку или позвоните — мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью под вашу задачу.
            </p>
            <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-12 flex-row flex-wrap">
              <button className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-base sm:text-lg flex items-center gap-3 justify-center">
                Оставить заявку
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <a href="#fleet" className="px-6 sm:px-8 py-3.5 sm:py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-base sm:text-lg text-white text-center">
                Посмотреть технику
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10">
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