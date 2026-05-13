import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const INDEXNOW_URL = "https://functions.poehali.dev/20b064f2-7534-47ab-8a1e-ff6e58aee9b9";
const SITE_ORIGIN = "https://фаварит.рф";
const SITE_ORIGIN_PUNY = "https://xn--80aafz3bni.xn--p1ai";

const buildGoogleInspectUrl = (pageUrl: string) => {
  return `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(
    SITE_ORIGIN_PUNY + "/",
  )}&id=${encodeURIComponent(pageUrl)}`;
};

const buildYandexCheckUrl = (pageUrl: string) => {
  return `https://webmaster.yandex.ru/site/${encodeURIComponent(
    SITE_ORIGIN_PUNY,
  )}:443/indexing/reindex/?url=${encodeURIComponent(pageUrl)}`;
};

const AdminReindex = () => {
  type ReindexResult = {
    ok: boolean;
    sent: number;
    yandex: number;
    bing: number;
    indexnowOrg: number;
    raw: string;
  };
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReindexResult | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${SITE_ORIGIN}/sitemap.xml`)
      .then((r) => r.text())
      .then((xml) => {
        const matches = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
          (m) => m[1],
        );
        setSitemapUrls(matches);
      })
      .catch(() => setSitemapUrls([]));
  }, []);

  const filteredUrls = sitemapUrls.filter((u) =>
    u.toLowerCase().includes(search.toLowerCase()),
  );

  const performRequest = async (body: Record<string, unknown>) => {
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(INDEXNOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      setResult({
        ok: !!data.success,
        sent: data.sent_urls || 0,
        yandex: data.yandex_status || 0,
        bing: data.bing_status || 0,
        indexnowOrg: data.indexnow_org_status || 0,
        raw: JSON.stringify(data, null, 2),
      });
    } catch (e: unknown) {
      setResult({
        ok: false,
        sent: 0,
        yandex: 0,
        bing: 0,
        indexnowOrg: 0,
        raw: String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  const sendAll = () => performRequest({ all: true });
  const sendOne = () => {
    if (!customUrl.trim()) return;
    performRequest({ urls: [customUrl.trim()] });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Icon name="Search" size={32} />
          Переиндексация в поисковых системах
        </h1>
        <p className="text-muted-foreground mb-8">
          Отправляет страницы сайта в Яндекс, Bing и IndexNow.org одним кликом.
          Для Google — прямые ссылки на ручную проверку в Search Console.
        </p>

        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Отправить весь сайт</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Прочитает sitemap.xml и отправит все страницы в Яндекс одним запросом.
          </p>
          <button
            onClick={sendAll}
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Icon name="Loader2" size={18} className="animate-spin" /> : <Icon name="Send" size={18} />}
            Переиндексировать сайт
          </button>
        </div>

        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Отправить одну страницу</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Удобно после публикации новой статьи или правки страницы.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://xn--80aafz3bni.xn--p1ai/blog/новая-статья"
              className="flex-1 px-4 py-3 bg-background border rounded-lg"
            />
            <button
              onClick={sendOne}
              disabled={loading || !customUrl.trim()}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              Отправить
            </button>
          </div>
        </div>

        {result && (
          <div
            className={`border rounded-xl p-6 ${
              result.ok ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon name={result.ok ? "CheckCircle2" : "XCircle"} size={22} />
              <span className="font-semibold">
                {result.ok ? "Готово ✓" : "Ошибка"}
              </span>
            </div>
            <p className="text-sm mb-3">
              Отправлено URL: <strong>{result.sent}</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg p-3 bg-background/50 border">
                <div className="text-xs text-muted-foreground mb-1">Яндекс</div>
                <div className="font-mono font-bold flex items-center gap-1.5">
                  <Icon
                    name={[200, 202].includes(result.yandex) ? "CheckCircle2" : "AlertCircle"}
                    size={14}
                    className={[200, 202].includes(result.yandex) ? "text-green-500" : "text-amber-500"}
                  />
                  {result.yandex || "—"}
                </div>
              </div>
              <div className="rounded-lg p-3 bg-background/50 border">
                <div className="text-xs text-muted-foreground mb-1">Bing</div>
                <div className="font-mono font-bold flex items-center gap-1.5">
                  <Icon
                    name={[200, 202].includes(result.bing) ? "CheckCircle2" : "AlertCircle"}
                    size={14}
                    className={[200, 202].includes(result.bing) ? "text-green-500" : "text-amber-500"}
                  />
                  {result.bing || "—"}
                </div>
              </div>
              <div className="rounded-lg p-3 bg-background/50 border">
                <div className="text-xs text-muted-foreground mb-1">IndexNow.org</div>
                <div className="font-mono font-bold flex items-center gap-1.5">
                  <Icon
                    name={[200, 202].includes(result.indexnowOrg) ? "CheckCircle2" : "AlertCircle"}
                    size={14}
                    className={[200, 202].includes(result.indexnowOrg) ? "text-green-500" : "text-amber-500"}
                  />
                  {result.indexnowOrg || "—"}
                </div>
              </div>
            </div>
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Полный ответ сервера
              </summary>
              <pre className="text-xs mt-2 p-3 bg-background/50 rounded overflow-auto">{result.raw}</pre>
            </details>
          </div>
        )}

        <div className="bg-card border rounded-xl p-6 mt-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="ExternalLink" size={20} />
            Ручная отправка в Google и Яндекс
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Google не поддерживает IndexNow. Для срочной переиндексации в Google
            используй Search Console — клик по «Google» откроет проверку URL с
            кнопкой «Запросить индексирование». «Яндекс» — то же самое в
            Webmaster.
          </p>

          <div className="mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск страницы (например: jcb, manipulyator, gorod)..."
              className="w-full px-4 py-2 bg-background border rounded-lg text-sm"
            />
          </div>

          <div className="text-xs text-muted-foreground mb-2">
            Найдено страниц: <strong>{filteredUrls.length}</strong> из{" "}
            {sitemapUrls.length}
          </div>

          <div className="max-h-[500px] overflow-y-auto border rounded-lg divide-y">
            {filteredUrls.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground text-center">
                {sitemapUrls.length === 0
                  ? "Загружаю sitemap.xml..."
                  : "Ничего не найдено"}
              </div>
            )}
            {filteredUrls.map((url) => {
              const path = url.replace(SITE_ORIGIN, "").replace(SITE_ORIGIN_PUNY, "") || "/";
              return (
                <div
                  key={url}
                  className="flex items-center justify-between gap-2 p-2 hover:bg-muted/30 transition-colors text-sm"
                >
                  <code className="flex-1 truncate text-xs sm:text-sm" title={path}>
                    {path}
                  </code>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <a
                      href={buildGoogleInspectUrl(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
                      title="Открыть в Google Search Console"
                    >
                      <Icon name="ExternalLink" size={11} />
                      Google
                    </a>
                    <a
                      href={buildYandexCheckUrl(url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                      title="Открыть в Яндекс.Вебмастере"
                    >
                      <Icon name="ExternalLink" size={11} />
                      Яндекс
                    </a>
                    <button
                      onClick={() => {
                        setCustomUrl(url);
                        performRequest({ urls: [url] });
                      }}
                      disabled={loading}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors disabled:opacity-50"
                      title="Отправить через IndexNow"
                    >
                      <Icon name="Zap" size={11} />
                      IndexNow
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs text-muted-foreground">
              <strong className="text-blue-600">Совет:</strong> в Google
              Search Console после клика на «Google» нажми кнопку «ЗАПРОСИТЬ
              ИНДЕКСИРОВАНИЕ» — это самый быстрый способ показать Google
              изменения. Лимит: ~10 страниц в день на проект.
            </p>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>Адрес страницы: <code>/admin/reindex</code> — сохрани в закладки.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReindex;