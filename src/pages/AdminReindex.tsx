import { useState } from "react";
import Icon from "@/components/ui/icon";

const INDEXNOW_URL = "https://functions.poehali.dev/20b064f2-7534-47ab-8a1e-ff6e58aee9b9";

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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Icon name="Search" size={32} />
          Переиндексация в Яндексе
        </h1>
        <p className="text-muted-foreground mb-8">
          Отправляет страницы сайта в Яндекс через IndexNow. Поисковик узнаёт об изменениях за минуты вместо дней.
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

        <div className="mt-8 text-xs text-muted-foreground">
          <p>Адрес страницы: <code>/admin/reindex</code> — сохрани в закладки.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReindex;