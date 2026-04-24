import { useState, useMemo } from "react";
import { generateSitemapXml, buildSitemapEntries } from "@/lib/sitemapData";
import Icon from "@/components/ui/icon";

const SitemapSourcePage = () => {
  const xml = useMemo(() => generateSitemapXml(), []);
  const entries = useMemo(() => buildSitemapEntries(), []);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <meta name="robots" content="noindex, nofollow" />
      <title>Актуальный Sitemap — служебная страница</title>

      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            📍 Актуальный sitemap.xml
          </h1>
          <p className="text-muted-foreground text-sm">
            Эта страница автоматически собирает sitemap из всех данных сайта (техника, города, статьи, страницы). 
            Обновляется сама при изменении данных.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl border border-accent/25 bg-card/40">
            <div className="text-accent text-2xl font-black">{entries.length}</div>
            <div className="text-muted-foreground text-xs">URL всего</div>
          </div>
          <div className="p-4 rounded-xl border border-accent/25 bg-card/40">
            <div className="text-accent text-2xl font-black">
              {entries.filter((e) => e.loc.includes("/tehnika/")).length}
            </div>
            <div className="text-muted-foreground text-xs">Техники</div>
          </div>
          <div className="p-4 rounded-xl border border-accent/25 bg-card/40">
            <div className="text-accent text-2xl font-black">
              {entries.filter((e) => e.loc.includes("/gorod/")).length}
            </div>
            <div className="text-muted-foreground text-xs">Городов</div>
          </div>
          <div className="p-4 rounded-xl border border-accent/25 bg-card/40">
            <div className="text-accent text-2xl font-black">
              {entries.filter((e) => e.loc.includes("/blog/")).length}
            </div>
            <div className="text-muted-foreground text-xs">Статей</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 transition-opacity"
          >
            <Icon name={copied ? "Check" : "Copy"} size={16} />
            {copied ? "Скопировано!" : "Скопировать XML"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-accent/10 text-white font-semibold text-sm hover:bg-accent/20 transition-colors"
          >
            <Icon name="Download" size={16} />
            Скачать sitemap.xml
          </button>
        </div>

        <div className="rounded-2xl border border-accent/20 bg-black/40 overflow-hidden">
          <div className="px-4 py-2 border-b border-accent/20 bg-black/40 flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-mono">sitemap.xml</span>
            <span className="text-accent text-xs">
              {xml.length.toLocaleString()} символов
            </span>
          </div>
          <pre className="p-4 overflow-auto text-xs text-white/80 font-mono max-h-[70vh]">
            {xml}
          </pre>
        </div>

        <div className="mt-6 p-4 rounded-xl border border-accent/30 bg-accent/5 text-sm text-white/80">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white mb-1">Как использовать</div>
              <div className="text-muted-foreground">
                Эта страница показывает <b>всегда актуальный</b> sitemap на основе реальных данных.
                Чтобы обновить публичный <code className="text-accent">/sitemap.xml</code> — скажи Юре:
                «обнови sitemap». Страница закрыта от индексации поисковиками (noindex).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapSourcePage;
