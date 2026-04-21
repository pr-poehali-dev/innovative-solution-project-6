import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              ООО Фаворит
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Преимущества
            </a>
            <a href="#fleet" className="text-muted-foreground hover:text-white transition-colors">
              Техника
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <a href="tel:+79601883084" className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all flex items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 960 188-30-84
            </a>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Заказать
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Фото на весь экран */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/df8d23ad-2b19-4a5c-bfef-8403f404cab9.jpg"
            alt="Манипулятор FAW КМУ DongYang"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-32">
          <div
            className={`max-w-2xl transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="mb-8 inline-block">
              <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                Аренда и услуги манипуляторов в Нижнем Новгороде
              </span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
              <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                Манипуляторы
              </span>
              <br />
              <span className="text-accent">в аренду</span>
              <br />
              <span className="text-white/70 text-4xl lg:text-5xl">в Нижнем Новгороде</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
              Оставьте заявку или позвоните — мы подберём правильный манипулятор с платформой необходимых габаритов и нужной грузоподъёмностью под вашу задачу.
            </p>
            <div className="flex gap-4 mb-12 flex-col sm:flex-row">
              <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                Оставить заявку
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                Посмотреть технику
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-accent mb-2">15+</div>
                <p className="text-sm text-white/60">Единиц техники</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">5 000+</div>
                <p className="text-sm text-white/60">Выполненных заказов</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">10 лет</div>
                <p className="text-sm text-white/60">На рынке</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;