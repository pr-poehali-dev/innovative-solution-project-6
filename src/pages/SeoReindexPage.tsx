import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  INDEXNOW_URL,
  SITE_PUNY,
  buildGroups,
  checklist,
  yandexReindexUrl,
} from "@/components/seo-reindex/reindexData";

type SendState = {
  status: "idle" | "loading" | "done" | "error";
  sent: number;
  yandex: number;
  bing: number;
  message: string;
};

const initialState: SendState = {
  status: "idle",
  sent: 0,
  yandex: 0,
  bing: 0,
  message: "",
};

const SeoReindexPage = () => {
  const groups = useMemo(() => buildGroups(), []);
  const total = useMemo(() => groups.reduce((s, g) => s + g.urls.length, 0), [groups]);
  const [state, setState] = useState<SendState>(initialState);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [oneUrl, setOneUrl] = useState("");

  const send = async (body: Record<string, unknown>) => {
    setState({ ...initialState, status: "loading" });
    try {
      const r = await fetch(INDEXNOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      const ok = !!data.success;
      setState({
        status: ok ? "done" : "error",
        sent: data.sent_urls || 0,
        yandex: data.yandex_status || 0,
        bing: data.bing_status || 0,
        message: ok
          ? "Страницы приняты поисковиками в очередь на переобход"
          : "Поисковик не принял запрос — попробуйте ещё раз через пару минут",
      });
    } catch {
      setState({
        ...initialState,
        status: "error",
        message: "Не удалось связаться с сервисом. Проверьте интернет и повторите.",
      });
    }
  };

  const sendAll = () => send({ all: true });
  const sendGroup = (urls: string[]) => send({ urls });
  const sendOne = () => {
    const u = oneUrl.trim();
    if (!u) return;
    send({ urls: [u.startsWith("http") ? u : `${SITE_PUNY}${u.startsWith("/") ? u : `/${u}`}`] });
  };

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16 px-4">
      <meta name="robots" content="noindex, nofollow" />
      <title>Переобход страниц в поисковиках — служебная страница</title>

      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-accent transition-colors mb-6"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3 flex items-center gap-3">
            <Icon name="RefreshCw" size={32} className="text-accent" />
            Переобход страниц в поисковиках
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl">
            После любого изменения сайта отправьте страницы на переобход — Яндекс и Bing быстрее
            увидят новые цены, тексты и фото. Обычно робот приходит в течение 1–3 дней.
          </p>
        </div>

        {/* Главная кнопка */}
        <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-accent/60 via-accent/20 to-accent/50 mb-6">
          <div className="rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-black text-white mb-1">
                  Отправить весь сайт
                </h2>
                <p className="text-sm text-white/60">
                  Будет отправлено {total} страниц: главная, услуги, техника, города, статьи.
                </p>
              </div>
              <button
                onClick={sendAll}
                disabled={state.status === "loading"}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-black transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                }}
              >
                {state.status === "loading" ? (
                  <Icon name="Loader2" size={18} className="animate-spin" />
                ) : (
                  <Icon name="Send" size={18} />
                )}
                Отправить всё
              </button>
            </div>

            {state.status !== "idle" && state.status !== "loading" && (
              <div
                className={`mt-5 rounded-xl border p-4 ${
                  state.status === "done"
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-red-500/40 bg-red-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    name={state.status === "done" ? "CircleCheck" : "CircleAlert"}
                    size={20}
                    className={state.status === "done" ? "text-emerald-400" : "text-red-400"}
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{state.message}</p>
                    {state.status === "done" && (
                      <p className="text-xs text-white/60 mt-1">
                        Отправлено страниц: {state.sent}. Яндекс ответил кодом {state.yandex}, Bing —{" "}
                        {state.bing}. Коды 200 и 202 означают, что всё принято.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Одна страница */}
        <div className="rounded-2xl border border-accent/25 bg-card/40 p-6 mb-6">
          <h2 className="text-lg font-black text-white mb-1">Отправить одну страницу</h2>
          <p className="text-sm text-white/60 mb-4">
            Удобно после правки конкретной страницы. Можно вставить полный адрес или просто путь,
            например /tehnika/faw-kmu-dongyoung
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={oneUrl}
              onChange={(e) => setOneUrl(e.target.value)}
              placeholder="/tehnika/faw-kmu-dongyoung"
              className="flex-1 px-4 py-3 bg-background border border-accent/25 rounded-xl text-white placeholder:text-white/35 focus:outline-none focus:border-accent/60"
            />
            <button
              onClick={sendOne}
              disabled={state.status === "loading" || !oneUrl.trim()}
              className="px-6 py-3 rounded-xl font-bold bg-accent/15 border border-accent/40 text-accent hover:bg-accent/25 transition-colors disabled:opacity-50"
            >
              Отправить
            </button>
          </div>
        </div>

        {/* Группы страниц */}
        <div className="rounded-2xl border border-accent/25 bg-card/40 p-6 mb-6">
          <h2 className="text-lg font-black text-white mb-1">Отправить по разделам</h2>
          <p className="text-sm text-white/60 mb-4">
            Меняли только цены на технику или добавили статью — отправьте нужный раздел, не трогая
            остальное.
          </p>
          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g.key} className="rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-white/[0.03]">
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Icon name={g.icon} size={18} className="text-accent" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">{g.title}</p>
                    <p className="text-xs text-white/50">{g.urls.length} страниц</p>
                  </div>
                  <button
                    onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
                    className="shrink-0 px-3 py-2 rounded-lg text-xs font-bold text-white/70 hover:text-accent transition-colors"
                  >
                    {openGroup === g.key ? "Скрыть" : "Список"}
                  </button>
                  <button
                    onClick={() => sendGroup(g.urls)}
                    disabled={state.status === "loading"}
                    className="shrink-0 px-4 py-2 rounded-lg text-xs font-black bg-accent/15 border border-accent/40 text-accent hover:bg-accent/25 transition-colors disabled:opacity-50"
                  >
                    Отправить
                  </button>
                </div>
                {openGroup === g.key && (
                  <div className="p-4 space-y-1.5 max-h-72 overflow-y-auto border-t border-white/10">
                    {g.urls.map((u) => (
                      <div key={u} className="flex items-center gap-2 text-xs">
                        <a
                          href={u}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 truncate text-white/60 hover:text-accent transition-colors"
                        >
                          {u.replace(/^https?:\/\/[^/]+/, "") || "/"}
                        </a>
                        <a
                          href={yandexReindexUrl(u)}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-accent/70 hover:text-accent"
                          title="Открыть в Яндекс.Вебмастере"
                        >
                          <Icon name="ExternalLink" size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Чек-лист */}
        <div className="rounded-2xl border border-accent/25 bg-card/40 p-6 mb-6">
          <h2 className="text-lg font-black text-white mb-4">Что делать после изменений сайта</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {checklist.map((c, i) => (
              <div key={c.title} className="flex gap-3">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-black text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{c.title}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Полезные ссылки */}
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href={`https://webmaster.yandex.ru/site/${encodeURIComponent(SITE_PUNY)}:443/indexing/reindex/`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-accent/25 bg-card/40 hover:border-accent/60 transition-colors"
          >
            <Icon name="Search" size={20} className="text-accent shrink-0" />
            <span className="text-sm font-bold text-white">Яндекс.Вебмастер</span>
          </a>
          <Link
            to="/sitemap-source"
            className="flex items-center gap-3 p-4 rounded-xl border border-accent/25 bg-card/40 hover:border-accent/60 transition-colors"
          >
            <Icon name="FileText" size={20} className="text-accent shrink-0" />
            <span className="text-sm font-bold text-white">Свежий sitemap.xml</span>
          </Link>
          <Link
            to="/seo"
            className="flex items-center gap-3 p-4 rounded-xl border border-accent/25 bg-card/40 hover:border-accent/60 transition-colors"
          >
            <Icon name="LayoutDashboard" size={20} className="text-accent shrink-0" />
            <span className="text-sm font-bold text-white">SEO-панель</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeoReindexPage;
