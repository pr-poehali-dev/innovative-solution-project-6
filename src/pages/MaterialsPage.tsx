import { lazy, useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import DeliveryCalculator from "@/components/materials/DeliveryCalculator";
import { fetchMaterials, MATERIAL_CATEGORIES, CATEGORY_BANNERS, type Material } from "@/data/materials";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const MaterialsPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string>(
    () => new URLSearchParams(window.location.search).get("cat") || "all",
  );

  useEffect(() => {
    fetchMaterials()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const usedCategories = useMemo(() => {
    const present = new Set(items.map((i) => i.category));
    return MATERIAL_CATEGORIES.filter((c) => present.has(c.slug));
  }, [items]);

  const banner = CATEGORY_BANNERS[activeCat];

  const visible = useMemo(
    () => (activeCat === "all" ? items : items.filter((i) => i.category === activeCat)),
    [items, activeCat],
  );

  const title = "Стройматериалы в Нижнем Новгороде — кирпич, блоки, бетон, бытовки | Фаворит";
  const description =
    "Продажа стройматериалов в Нижнем Новгороде: силикатный кирпич, газосиликатные блоки, плиты, цемент, пиломатериалы, асфальт и бетон, бордюр, бытовки и контейнеры. Доставка манипулятором. ☎ +7 960 188-30-84";
  const pageUrl = "https://фаварит.рф/stroymaterialy";

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={pageUrl} />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
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
            <PhoneButton size="sm" className="rounded-xl" />
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Стройматериалы", to: "/stroymaterialy" },
            ]}
          />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <SectionBadge>Каталог</SectionBadge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mt-4 mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Стройматериалы в Нижнем Новгороде
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm sm:text-base">
            Продаём и доставляем стройматериалы собственным транспортом — манипуляторами и самосвалами.
            Работаем с юр. лицами по договору, НДС, ЭДО. Уточняйте наличие и цены по телефону.
          </p>
        </section>

        {usedCategories.length > 0 && (
          <section className="sticky top-[68px] z-40 bg-[#0e1420] border-y border-accent/15 sm:border-0 sm:bg-transparent sm:static mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-0">
              <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-none -mx-1 px-1 snap-x">
                <button
                  onClick={() => setActiveCat("all")}
                  className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${
                    activeCat === "all"
                      ? "bg-accent text-black border-accent"
                      : "bg-card/40 text-white border-accent/20 hover:border-accent/60"
                  }`}
                >
                  Все товары
                </button>
                {usedCategories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setActiveCat(c.slug)}
                    className={`shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${
                      activeCat === c.slug
                        ? "bg-accent text-black border-accent"
                        : "bg-card/40 text-white border-accent/20 hover:border-accent/60"
                    }`}
                  >
                    <Icon name={c.icon} size={14} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {banner && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
            <div className="rounded-2xl overflow-hidden border border-accent/25 bg-card/40">
              <div className="relative w-full bg-black">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/90 to-transparent pointer-events-none" />
              </div>

              <div className="p-5 sm:p-8 lg:p-10">
                <SectionBadge>Категория</SectionBadge>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-4 mb-2 leading-tight">
                  {banner.title}
                </h2>
                <p className="text-accent font-bold text-sm sm:text-base mb-4">{banner.subtitle}</p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                  {banner.text}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {banner.bullets.map((b) => (
                    <div
                      key={b.title}
                      className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-accent/15"
                    >
                      <span className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                        <Icon name={b.icon} fallback="Check" size={17} className="text-accent" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-white leading-tight">
                          {b.title}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                          {b.text}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <PhoneButton size="md" className="rounded-xl justify-center" />
                  <button
                    type="button"
                    onClick={() => setCallbackOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-bold text-white"
                  >
                    <Icon name="Calculator" size={15} className="text-accent" />
                    Рассчитать стоимость
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-card/40 border border-accent/10 animate-pulse" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-20 border border-accent/10 rounded-2xl bg-card/30">
              <Icon name="PackageOpen" size={48} className="text-accent/50 mx-auto mb-4" />
              <p className="text-lg font-bold text-white mb-2">Каталог пока пуст</p>
              <p className="text-muted-foreground text-sm mb-6">
                Позвоните — подберём материалы и назовём актуальные цены.
              </p>
              <PhoneButton size="md" className="rounded-xl" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((m) => {
                const cat = MATERIAL_CATEGORIES.find((c) => c.slug === m.category);
                return (
                  <article
                    key={m.id}
                    className="group rounded-2xl overflow-hidden border border-accent/10 bg-card/30 hover:border-accent/40 transition-all flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-card/60 overflow-hidden">
                      {m.imageUrl ? (
                        <img
                          src={m.imageUrl}
                          alt={m.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name={cat?.icon || "Package"} size={48} className="text-accent/30" />
                        </div>
                      )}
                      {!m.inStock && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold">
                          Под заказ
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {cat && (
                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                          {cat.label}
                        </span>
                      )}
                      <h2 className="text-lg font-black text-white mb-2 leading-tight">{m.name}</h2>
                      {m.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{m.description}</p>
                      )}
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t border-accent/10">
                        <div>
                          <p className="text-xl font-black text-accent leading-none">{m.price}</p>
                          {m.unit && <p className="text-xs text-muted-foreground mt-1">за {m.unit}</p>}
                        </div>
                        <a
                          href="tel:+79601883084"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-bold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all whitespace-nowrap"
                        >
                          <Icon name="Phone" size={14} />
                          Позвонить
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <DeliveryCalculator />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Нужны материалы с доставкой?</h2>
          <p className="text-muted-foreground mb-6">
            Привезём на объект своим манипулятором — разгрузим точно в месте укладки.
          </p>
          <PhoneButton size="lg" className="rounded-2xl" />
        </section>
      </main>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default MaterialsPage;