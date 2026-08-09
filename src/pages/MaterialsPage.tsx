import { lazy, useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { fetchMaterials, MATERIAL_CATEGORIES, type Material } from "@/data/materials";

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

  const visible = useMemo(
    () => (activeCat === "all" ? items : items.filter((i) => i.category === activeCat)),
    [items, activeCat],
  );

  const title = "Стройматериалы в Нижнем Новгороде — кирпич, блоки, бетон, бытовки | Фаворит";
  const description =
    "Продажа стройматериалов в Нижнем Новгороде: силикатный кирпич, газосиликатные блоки, плиты, цемент, пиломатериалы, асфальт и бетон, бордюр и брусчатка, бытовки и контейнеры. Доставка манипулятором. ☎ +7 960 188-30-84";
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
          <SectionBadge icon="Package">Каталог</SectionBadge>
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCat("all")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
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
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
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
                        <button
                          onClick={() => setCallbackOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-bold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
                        >
                          <Icon name="Phone" size={14} />
                          Заказать
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

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