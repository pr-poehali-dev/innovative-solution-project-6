import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PositionTracker from "@/components/seo-dashboard/PositionTracker";

const SITE_ORIGIN = "https://фаварит.рф";
const SITE_PUNY = "https://xn--80aafz3bni.xn--p1ai";

const sections = [
  {
    title: "Яндекс.Вебмастер",
    icon: "Search",
    color: "from-red-500 to-rose-600",
    description: "Основной инструмент для контроля индексации в Яндексе",
    links: [
      {
        label: "Главная страница сайта",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/dashboard/`,
        icon: "LayoutDashboard",
      },
      {
        label: "Региональность (Нижний Новгород)",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/info/region/`,
        icon: "MapPin",
      },
      {
        label: "Переобход страниц",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/indexing/reindex/`,
        icon: "RefreshCw",
      },
      {
        label: "Файлы Sitemap",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/indexing/sitemap/`,
        icon: "FileText",
      },
      {
        label: "Поисковые запросы",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/search-queries/popular/`,
        icon: "TrendingUp",
      },
      {
        label: "Удаление страниц",
        url: `https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/tools/del-url/`,
        icon: "Trash2",
      },
    ],
  },
  {
    title: "Google Search Console",
    icon: "Globe",
    color: "from-blue-500 to-indigo-600",
    description: "Контроль индексации в Google",
    links: [
      {
        label: "Главная (Performance)",
        url: `https://search.google.com/search-console?resource_id=${encodeURIComponent(SITE_PUNY + "/")}`,
        icon: "LayoutDashboard",
      },
      {
        label: "Проверка URL",
        url: `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE_PUNY + "/")}`,
        icon: "Search",
      },
      {
        label: "Sitemap",
        url: `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_PUNY + "/")}`,
        icon: "FileText",
      },
      {
        label: "Покрытие",
        url: `https://search.google.com/search-console/index?resource_id=${encodeURIComponent(SITE_PUNY + "/")}`,
        icon: "CheckCircle2",
      },
    ],
  },
  {
    title: "Яндекс.Бизнес и Карты",
    icon: "Building2",
    color: "from-amber-500 to-orange-600",
    description: "Карточка организации, отзывы, регион",
    links: [
      {
        label: "Яндекс.Бизнес — кабинет",
        url: "https://yandex.ru/sprav/",
        icon: "Briefcase",
      },
      {
        label: "Карточка на Яндекс.Картах",
        url: "https://yandex.ru/maps/?text=ООО+Фаворит+Нижний+Новгород",
        icon: "Map",
      },
    ],
  },
  {
    title: "Каталоги и отзовики",
    icon: "Star",
    color: "from-emerald-500 to-green-600",
    description: "Зарегистрируйся для роста ссылочной массы",
    links: [
      { label: "2ГИС — Добавить организацию", url: "https://account.2gis.com/add-firm", icon: "Plus" },
      { label: "Zoon.ru — Добавить компанию", url: "https://zoon.ru/add-company/", icon: "Plus" },
      { label: "Flamp.ru", url: "https://flamp.ru/", icon: "Plus" },
      { label: "Yell.ru", url: "https://www.yell.ru/", icon: "Plus" },
      { label: "Avito — Услуги", url: "https://www.avito.ru/dobavit_obyavlenie", icon: "Plus" },
      { label: "Юла", url: "https://youla.ru/", icon: "Plus" },
      { label: "Профи.ру", url: "https://profi.ru/", icon: "Plus" },
      { label: "YouDo", url: "https://youdo.com/", icon: "Plus" },
    ],
  },
  {
    title: "Валидаторы и проверка",
    icon: "ShieldCheck",
    color: "from-purple-500 to-pink-600",
    description: "Проверка разметки и скорости сайта",
    links: [
      {
        label: "Яндекс — валидатор микроразметки",
        url: `https://webmaster.yandex.ru/tools/microtest/?url=${encodeURIComponent(SITE_ORIGIN)}`,
        icon: "Code",
      },
      {
        label: "Google — Rich Results Test",
        url: `https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_ORIGIN)}`,
        icon: "Sparkles",
      },
      {
        label: "PageSpeed Insights (скорость)",
        url: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_ORIGIN)}`,
        icon: "Gauge",
      },
      {
        label: "Schema.org Validator",
        url: `https://validator.schema.org/#url=${encodeURIComponent(SITE_ORIGIN)}`,
        icon: "FileCheck",
      },
    ],
  },
];

const SeoDashboard = () => {
  const [sitemapCount, setSitemapCount] = useState<number | null>(null);
  const [lastReindex, setLastReindex] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${SITE_ORIGIN}/sitemap.xml`)
      .then((r) => r.text())
      .then((xml) => {
        const matches = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g));
        setSitemapCount(matches.length);
      })
      .catch(() => setSitemapCount(0));

    const last = localStorage.getItem("lastReindexTs");
    if (last) {
      const date = new Date(Number(last));
      setLastReindex(
        new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date),
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <title>SEO-панель управления | Фаворит</title>
        <meta name="robots" content="noindex, nofollow" />

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-3">
            <Icon name="Bookmark" size={14} className="text-accent" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-accent">
              Сохрани в закладки
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black mb-3 flex items-center gap-3">
            <Icon name="Rocket" size={36} className="text-accent" />
            SEO-панель управления
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Всё для контроля поискового продвижения в одном месте: переиндексация, аналитика, проверка разметки, регистрации в каталогах.
          </p>
          <div className="mt-3 text-sm">
            <code className="px-2 py-1 rounded bg-muted text-accent font-mono">{SITE_ORIGIN}/seo</code>
            <span className="text-muted-foreground"> — адрес этой страницы</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30">
            <Icon name="FileText" size={20} className="text-accent mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              {sitemapCount ?? "..."}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Страниц в sitemap</div>
          </div>
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30">
            <Icon name="MapPin" size={20} className="text-emerald-500 mb-2" />
            <div className="text-base sm:text-xl font-black text-foreground">Нижний Новгород</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Регион в Яндексе</div>
          </div>
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
            <Icon name="Zap" size={20} className="text-blue-500 mb-2" />
            <div className="text-base sm:text-xl font-black text-foreground">3 системы</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Яндекс + Bing + IndexNow</div>
          </div>
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
            <Icon name="Clock" size={20} className="text-purple-500 mb-2" />
            <div className="text-sm sm:text-base font-black text-foreground">
              {lastReindex || "Ещё не было"}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Последняя переиндексация</div>
          </div>
        </div>

        {/* Main action: reindex */}
        <Link
          to="/admin/reindex"
          className="block mb-8 group"
        >
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-accent via-accent/90 to-amber-600 hover:from-accent/95 hover:to-amber-700 transition-all shadow-xl shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5">
            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/15 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={28} className="text-black" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black/70 mb-1">
                  Главное действие
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-black mb-1">
                  Переиндексировать сайт сейчас
                </h2>
                <p className="text-sm text-black/80">
                  Отправит все {sitemapCount ?? "30"} страниц в Яндекс, Bing, IndexNow.org одним кликом
                </p>
              </div>
              <Icon name="ArrowRight" size={28} className="text-black flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Position Tracker */}
        <div className="mb-8">
          <PositionTracker />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl bg-card border overflow-hidden">
              <div className="p-5 sm:p-6 border-b">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon name={section.icon} size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-display font-bold text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {section.links.map((link, idx) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 sm:p-4 hover:bg-muted/30 transition-colors group ${
                      idx >= 2 ? "sm:border-t" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                      <Icon name={link.icon} size={14} className="text-muted-foreground group-hover:text-accent" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {link.label}
                    </span>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground/50 group-hover:text-accent transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cheatsheet */}
        <div className="mt-8 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
          <h3 className="text-base sm:text-lg font-display font-bold mb-3 flex items-center gap-2">
            <Icon name="Lightbulb" size={18} className="text-amber-500" />
            Что делать каждую неделю для роста позиций
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Понедельник:</strong> переиндексировать сайт через кнопку выше</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Среда:</strong> проверить «Поисковые запросы» в Вебмастере — какие фразы растут</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Пятница:</strong> ответить на новые отзывы в Яндекс.Картах</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Раз в месяц:</strong> добавить 2-3 новых отзыва в Я.Картах от реальных клиентов (цель — 30+)</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Раз в месяц:</strong> зарегистрироваться в 1-2 новых каталогах из списка выше</span>
            </li>
          </ul>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            Эта страница не индексируется в поиске. Только для внутреннего использования.
          </p>
          <p className="mt-1">
            Сохрани в закладки: <code className="px-1.5 py-0.5 rounded bg-muted">⌘+D</code> (Mac) или <code className="px-1.5 py-0.5 rounded bg-muted">Ctrl+D</code> (Windows)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeoDashboard;