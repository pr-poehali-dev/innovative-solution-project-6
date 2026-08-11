import { lazy, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import NotFound from "@/pages/NotFound";
import { fetchMaterials, MATERIAL_CATEGORIES, type Material } from "@/data/materials";
import { MATERIAL_SEO_PAGES, getMaterialSeoPage } from "@/data/materialsSeo";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const MaterialCategoryPage = () => {
  const { slug } = useParams();
  const page = getMaterialSeoPage(slug);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(
    () => (page ? items.filter((i) => i.category === page.cat) : []),
    [items, page],
  );

  if (!page) return <NotFound />;

  const pageUrl = `https://фаварит.рф/stroymaterialy/${page.slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={page.keywords.join(", ")} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={pageUrl} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

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
            <PhoneButton size="sm" className="rounded-xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Стройматериалы", to: "/stroymaterialy" },
              { label: page.h1, to: `/stroymaterialy/${page.slug}` },
            ]}
          />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <SectionBadge>Каталог</SectionBadge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mt-4 mb-4">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              {page.h1}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm sm:text-base mb-6">{page.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <PhoneButton size="md" className="rounded-xl justify-center" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-bold text-white"
            >
              <Icon name="Calculator" size={15} className="text-accent" />
              Рассчитать стоимость
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.advantages.map((a) => (
              <div key={a.title} className="rounded-2xl border border-accent/15 bg-card/40 p-5">
                <Icon name={a.icon} size={22} className="text-accent mb-3" />
                <p className="text-white font-bold mb-1 text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-card/40 border border-accent/10 animate-pulse" />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 border border-accent/10 rounded-2xl bg-card/30">
              <Icon name="PackageOpen" size={44} className="text-accent/50 mx-auto mb-4" />
              <p className="text-lg font-bold text-white mb-2">Позиции уточняются</p>
              <p className="text-muted-foreground text-sm mb-6">
                Позвоните — назовём актуальные цены и наличие на складе.
              </p>
              <PhoneButton size="md" className="rounded-xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((m) => (
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
                        <Icon name="Package" size={48} className="text-accent/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
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
                        href={`tel:${MATERIALS_PHONE}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-bold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all whitespace-nowrap"
                      >
                        <Icon name="Phone" size={14} />
                        Позвонить
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Частые вопросы</h2>
          <div className="space-y-3">
            {page.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-accent/15 bg-card/40 p-5">
                <p className="text-white font-bold mb-2">{f.q}</p>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="rounded-2xl border border-accent/10 bg-card/20 p-6 space-y-3">
            {page.seoText.map((t) => (
              <p key={t.slice(0, 30)} className="text-sm text-muted-foreground leading-relaxed">
                {t}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {page.keywords.map((k) => (
                <span
                  key={k}
                  className="text-xs px-3 py-1.5 rounded-full border border-accent/20 bg-background/40 text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-xl font-black text-white mb-4">Другие материалы с доставкой</h2>
          <div className="flex flex-wrap gap-2">
            {MATERIAL_SEO_PAGES.filter((p) => p.slug !== page.slug).map((p) => {
              const cat = MATERIAL_CATEGORIES.find((c) => c.slug === p.cat);
              return (
                <Link
                  key={p.slug}
                  to={`/stroymaterialy/${p.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-card/40 text-sm font-semibold text-white hover:border-accent/60 hover:text-accent transition-colors"
                >
                  <Icon name={cat?.icon || "Package"} size={14} className="text-accent" />
                  {cat?.label || p.slug}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Посчитаем заказ с доставкой</h2>
          <p className="text-muted-foreground mb-6">
            Назовите объём — назовём цену вместе с доставкой и разгрузкой манипулятором.
          </p>
          <PhoneButton size="lg" className="rounded-2xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
        </section>
      </main>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default MaterialCategoryPage;
