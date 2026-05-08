import { Link, Navigate, useParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { articles, getArticleBySlug, type ArticleBlock } from "@/data/articles";

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

const renderBlock = (block: ArticleBlock, idx: number) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={idx} className="text-2xl sm:text-3xl font-black text-white mt-8 sm:mt-10 mb-3 sm:mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-lg sm:text-xl font-bold text-white mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-accent pl-5 py-2 my-5 italic text-white/85 bg-accent/5 rounded-r-xl"
        >
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={idx} className="my-4 space-y-2">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/85 text-base leading-relaxed">
              <Icon name="Check" size={18} className="text-accent flex-shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="my-4 space-y-3 list-none counter-reset-[step]">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/85 text-base leading-relaxed">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm font-bold">
                {i + 1}
              </span>
              <span className="flex-1 pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "p":
    default:
      return (
        <p key={idx} className="text-white/85 text-base sm:text-lg leading-relaxed my-4">
          {block.text}
        </p>
      );
  }
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [callbackOpen, setCallbackOpen] = useState(false);
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background page-enter">
      <title>{article.seoTitle}</title>
      <meta name="description" content={article.seoDesc} />
      <meta name="keywords" content={article.seoKeywords} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="фаварит.рф" />
      <meta property="og:title" content={article.seoTitle} />
      <meta property="og:description" content={article.seoDesc} />
      <meta property="og:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:secure_url" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.seoTitle} />
      <meta name="twitter:description" content={article.seoDesc} />
      <meta name="twitter:image" content="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg" />
      <link rel="canonical" href={`https://фаварит.рф/blog/${article.slug}`} />

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

      <article className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Блог", to: "/blog" },
              { label: article.title },
            ]}
          />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mt-4 mb-5">
            {article.tag}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight mb-5">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Calendar" size={14} />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Clock" size={14} />
              {article.readMinutes} мин чтения
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-8 bg-zinc-900">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1200"
              height="675"
            />
          </div>

          <div>{article.blocks.map(renderBlock)}</div>

          {/* CTA — позвонить после статьи */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
              <Icon name="Phone" size={26} className="text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Нужна консультация?</h3>
              <p className="text-muted-foreground text-sm">Подберём технику под вашу задачу за 5 минут.</p>
            </div>
            <PhoneButton size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </article>

      {/* Похожие статьи */}
      {related.length > 0 && (
        <section className="pb-16 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Читайте также</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-accent/20 bg-card/40 hover:border-accent/60 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                      src={a.cover}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width="500"
                      height="320"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-3">
                      {a.title}
                    </h3>
                    <span className="text-accent text-xs font-semibold inline-flex items-center gap-1">
                      Читать <Icon name="ArrowRight" size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default BlogArticle;