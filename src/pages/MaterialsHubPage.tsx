import { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import CallbackModal from "@/components/ui/CallbackModal";
import MaxButton from "@/components/ui/MaxButton";
import LazySection from "@/components/LazySection";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const SECTIONS = [
  { to: "/stroymaterialy/kirpich", title: "Кирпич силикатный", text: "Белый и цветной, М-150, Борский завод", image: "/img/hub-silikat.jpg", tag: "Хит продаж" },
  { to: "/stroymaterialy/bloki", title: "Газосиликатные блоки", text: "D500–D600, 4 размера, с доставкой", image: "/img/hub-bloki.jpg" },
  { to: "/stroymaterialy/bordyur", title: "Бордюр", text: "Дорожный и тротуарный, поддонами", image: "/img/hub-bordyur.jpg" },
  { to: "/stroymaterialy/plity", title: "Плиты перекрытия и ФБС блоки", text: "Доставка и укладка манипулятором", image: "/img/hub-plity.jpg?v=2" },
  { to: "/stroymaterialy/keramicheskiy-oblicovochnyy", title: "Кирпич керамический облицовочный", text: "Для красивого и долговечного фасада", image: "/img/hub-oblic.jpg?v=2" },
  { to: "/stroymaterialy/keramicheskiy", title: "Кирпич керамический", text: "Рядовой полнотелый и пустотелый", image: "/img/hub-keram.jpg?v=2" },
  { to: "/stroymaterialy/betonnye-kolca", title: "Бетонные кольца", text: "Для колодцев и септиков, с установкой", image: "/img/hub-kolca.jpg" },
];

const MaterialsHubPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "Стройматериалы с доставкой манипулятором — Нижний Новгород | Фаворит";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background page-enter">
      <meta
        name="description"
        content="Стройматериалы с доставкой манипулятором в Нижнем Новгороде: силикатный и керамический кирпич, газосиликатные блоки, бордюр, плиты перекрытия, ФБС, бетонные кольца. ☎ +7 960 188-30-84"
      />
      <link rel="canonical" href="https://фаварит.рф/stroymaterialy" />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
          <BrandLogo size="sm" compact />
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <MaxButton place="header_materials_hub" compact />
            <PhoneButton size="sm" className="rounded-xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
          </div>
        </div>
      </header>

      <main className="shop-light pt-24 sm:pt-28 pb-16">
        <section className="w-full px-4 sm:px-6 lg:px-10 pt-4">
          <div className="relative mb-8 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card/40 to-transparent px-5 py-8 sm:px-10 sm:py-12 overflow-hidden text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#d9a441]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] text-[#f5d680]" style={{ fontFamily: "'Cinzel', serif" }}>
                от компании
              </span>
              <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#d9a441]" />
            </div>
            <h1 className="relative leading-[1.05]">
              <span className="block text-3xl sm:text-5xl font-black tracking-tight text-white">Стройматериалы</span>
              <span
                className="block mt-2 text-4xl sm:text-6xl font-bold bg-gradient-to-b from-[#fff3c4] via-[#f5d680] to-[#d9a441] bg-clip-text text-transparent drop-shadow-[0_4px_18px_rgba(232,168,32,0.35)]"
                style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}
              >
                «Фаворит»
              </span>
            </h1>
            <p className="relative mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Выберите, что вам нужно — привезём своим манипулятором и выгрузим прямо на объект
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
            {SECTIONS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-2xl overflow-hidden border border-accent/20 bg-card/40 hover:border-accent/60 hover:shadow-[0_10px_40px_rgba(232,168,32,0.15)] hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-5 flex items-center gap-3 flex-1">
                  <div className="flex-1 min-w-0">
                    {s.tag && (
                      <span className="mb-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-black uppercase">
                        <Icon name="Flame" size={12} />
                        {s.tag}
                      </span>
                    )}
                    <h2 className="text-lg font-black text-white leading-tight">{s.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
                  </div>
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-accent text-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="ArrowRight" size={20} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-accent/30 bg-card/60 px-6 pt-6 sm:px-8 sm:pt-8 flex flex-col md:flex-row md:items-center gap-5 overflow-hidden">
            <div className="flex-1 pb-2 md:pb-8 text-center md:text-left">
              <div className="inline-block mb-3 px-4 py-2 rounded-2xl bg-white text-zinc-900 text-sm font-bold shadow-lg">
                Звоните — всё посчитаю и привезу!
              </div>
              <p className="text-2xl font-black text-white mb-1">Не нашли нужное?</p>
              <p className="text-muted-foreground mb-5">Позвоните или напишите — подберём материал и посчитаем доставку за 5 минут</p>
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <PhoneButton size="md" className="rounded-xl justify-center" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
                <MaxButton place="materials_hub_bottom" className="justify-center !px-4 !py-2.5 !gap-2 !text-sm !font-bold" />
              </div>
            </div>
            <img
              src="/img/builder-toon-white.webp"
              alt="Строитель Фаворит"
              loading="lazy"
              className="w-36 sm:w-48 h-auto self-center md:self-end drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
            />
          </div>
        </section>
      </main>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default MaterialsHubPage;