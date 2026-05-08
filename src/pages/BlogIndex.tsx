import { Link } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { articles } from "@/data/articles";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const BlogIndex = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);



  const title = "Блог о манипуляторах и спецтехнике в Нижнем Новгороде | Фаворит";
  const description =
    "Статьи о выборе и аренде манипуляторов, ценах, кейсах и сравнениях. Полезные материалы от экспертов компании Фаворит в Нижнем Новгороде.";

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <link rel="canonical" href="https://фаварит.рф/blog" />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo compact />
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5"
              aria-label="Заказать обратный звонок"
            >
              <Icon name="MessageCircle" size={18} className="text-accent" />
            </button>
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Блог" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Блог</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Полезные статьи об аренде манипуляторов
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Практические советы, цены, кейсы и разбор типовых задач. Материалы обновляются регулярно — подписывайтесь, чтобы не пропустить.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-accent/20 bg-card/40 hover:border-accent/60 hover:bg-accent/5 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-accent text-[11px] font-bold uppercase tracking-widest">
                    {article.tag}
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {formatDate(article.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {article.readMinutes} мин чтения
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-white leading-tight mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{article.excerpt}</p>

                  <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm">
                    Читать статью
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
              <Icon name="Phone" size={26} className="text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Нужен манипулятор сейчас?</h3>
              <p className="text-muted-foreground text-sm">
                Звоните — подберём технику и рассчитаем стоимость за 5 минут.
              </p>
            </div>
            <PhoneButton size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default BlogIndex;