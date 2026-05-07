import { lazy, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";
import { reviews, reviewSchema } from "@/data/reviews";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const YANDEX_PROFILE_URL = "https://yandex.ru/profile/-/CPGZ78ll";
const YANDEX_REVIEW_URL = "https://yandex.ru/profile/-/CPGZ78ll?add-review=true";

const ReviewsPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const title = "Отзывы клиентов о компании Фаворит — аренда манипуляторов в Нижнем Новгороде";
  const description =
    "Реальные отзывы клиентов компании Фаворит на Яндекс.Картах. Аренда манипуляторов в Нижнем Новгороде — оценка 5.0, более 6 отзывов от проверенных пользователей.";
  const pageUrl = "https://фаварит.рф/otzyvy";

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://фаварит.рф/" },
      { "@type": "ListItem", position: 2, name: "Отзывы", item: pageUrl },
    ],
  };

  const reviewsLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://фаварит.рф/#organization",
    name: "ООО Фаворит",
    url: "https://фаварит.рф/",
    telephone: "+79601883084",
    image: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/080c960a-deba-4a1e-bd38-56544f276a69.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Кстово",
      addressRegion: "Нижегородская область",
      addressCountry: "RU",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviewSchema,
  };

  return (
    <div className="min-h-screen bg-background">
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
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="ru_RU" />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>
      <script type="application/ld+json">{JSON.stringify(reviewsLd)}</script>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo compact />
          <div className="flex gap-2 sm:gap-3 items-center">
            <a
              href="#leave-review"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("leave-review")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md shadow-accent/30 active:scale-[0.98] transition-transform text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)", color: "#000" }}
            >
              <Icon name="Star" size={14} className="fill-black" />
              Оставить отзыв
            </a>
            <a
              href="#leave-review"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("leave-review")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-label="Оставить отзыв"
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full shadow-md shadow-accent/30"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <Icon name="Star" size={18} className="fill-black text-black" />
            </a>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Отзывы" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Отзывы клиентов</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Что говорят о нас клиенты
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            Настоящие отзывы от реальных заказчиков на Яндекс.Картах — без фильтрации и редактирования. Каждый отзыв оставлен после выполненной работы.
          </p>

          {/* Рейтинг — крупная карточка */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-7 rounded-2xl border border-accent/30 bg-accent/5">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="Star" size={26} className="text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-black text-white tabular-nums">5.0</span>
                <span className="text-muted-foreground text-sm">из 5</span>
              </div>
            </div>
            <div className="h-px w-full sm:w-px sm:h-14 bg-accent/20" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-white font-bold text-lg">{reviews.length}+ отзывов</span>
              <span className="text-muted-foreground text-sm">от реальных клиентов</span>
            </div>
            <div className="h-px w-full sm:w-px sm:h-14 bg-accent/20" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-white font-bold text-lg">Проверенные</span>
              <span className="text-muted-foreground text-sm">только реальные клиенты</span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <a
              href="#leave-review"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("leave-review")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
            >
              <Icon name="Star" size={18} className="text-black fill-black" />
              <span className="text-black font-black text-sm sm:text-base">Оставить отзыв</span>
              <Icon name="ArrowDown" size={16} className="text-black group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* КАРТОЧКИ ОТЗЫВОВ */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-1">
                Развёрнутые отзывы клиентов
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Истории заказов от компаний и частных клиентов — без сокращений
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
              <Icon name="ShieldCheck" size={14} className="text-accent" />
              <span className="text-xs font-semibold text-white">Все отзывы — реальные</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {reviews.map((r) => {
              const date = new Date(r.date);
              const dateStr = date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const initials = r.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("");
              return (
                <article
                  key={r.name + r.date}
                  className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl border border-accent/20 bg-card/40 hover:border-accent/40 hover:bg-card/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-sm">{initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm truncate">{r.name}</div>
                      <div className="text-muted-foreground text-xs">{dateStr}</div>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Icon key={i} name="Star" size={12} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed">{r.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* БЛОК «ОСТАВИТЬ ОТЗЫВ» */}
      <section id="leave-review" className="pb-16 sm:pb-24 px-4 sm:px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card/40 to-transparent p-6 sm:p-10">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon name="Heart" size={12} />
                  Для наших клиентов
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white mb-3">
                  Работали с нами? <span className="text-accent">Оставьте отзыв!</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
                  Ваш отзыв на Яндекс.Картах — это главная награда для нашей команды. Он помогает другим клиентам сделать правильный выбор, а нам — стать ещё лучше.
                </p>

                <ul className="space-y-2 text-sm text-white/80 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>Займёт не больше 1 минуты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>Нужен только аккаунт Яндекса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>После отзыва — <span className="text-accent font-semibold">скидка 5% на следующий заказ</span></span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <a
                  href={YANDEX_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform min-w-[260px]"
                  style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
                >
                  <Icon name="Star" size={20} className="text-black fill-black" />
                  <span className="text-black font-black text-base sm:text-lg">Оставить отзыв</span>
                  <Icon name="ArrowRight" size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={YANDEX_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-colors text-white font-semibold text-sm"
                >
                  <Icon name="MapPin" size={16} className="text-accent" />
                  Посмотреть на Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA СНИЗУ — ЗВОНОК */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
              <Icon name="Phone" size={26} className="text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Хотите стать нашим клиентом?</h3>
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

export default ReviewsPage;