import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const INDEXNOW_URL = "https://functions.poehali.dev/20b064f2-7534-47ab-8a1e-ff6e58aee9b9";
const ADMIN_PASSWORD = "favorit2026";
const AUTH_KEY = "admin_reindex_auth";

const AdminReindex = () => {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; sent: number; status: number; raw: string }>(null);
  const [customUrl, setCustomUrl] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPwInput("");
  };

  const sendAll = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(INDEXNOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      const data = await r.json();
      setResult({
        ok: !!data.success,
        sent: data.sent_urls || 0,
        status: data.yandex_status || r.status,
        raw: data.response || JSON.stringify(data),
      });
    } catch (e: unknown) {
      setResult({ ok: false, sent: 0, status: 0, raw: String(e) });
    } finally {
      setLoading(false);
    }
  };

  const sendOne = async () => {
    if (!customUrl.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(INDEXNOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: [customUrl.trim()] }),
      });
      const data = await r.json();
      setResult({
        ok: !!data.success,
        sent: data.sent_urls || 0,
        status: data.yandex_status || r.status,
        raw: data.response || JSON.stringify(data),
      });
    } catch (e: unknown) {
      setResult({ ok: false, sent: 0, status: 0, raw: String(e) });
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form
          onSubmit={tryLogin}
          className="bg-card border rounded-xl p-8 w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Lock" size={28} />
            <h1 className="text-2xl font-bold">Вход в админку</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Введите пароль для доступа к переиндексации.
          </p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => {
              setPwInput(e.target.value);
              setPwError(false);
            }}
            placeholder="Пароль"
            autoFocus
            className={`w-full px-4 py-3 bg-background border rounded-lg mb-3 ${
              pwError ? "border-red-500" : ""
            }`}
          />
          {pwError && (
            <p className="text-sm text-red-500 mb-3">Неверный пароль</p>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Icon name="Search" size={32} />
            Переиндексация в Яндексе
          </h1>
          <button
            onClick={logout}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>
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
            <div className="flex items-center gap-2 mb-2">
              <Icon name={result.ok ? "CheckCircle2" : "XCircle"} size={22} />
              <span className="font-semibold">
                {result.ok ? "Готово!" : "Ошибка"}
              </span>
            </div>
            <p className="text-sm">
              Отправлено URL: <strong>{result.sent}</strong>
              <br />
              Статус Яндекса: <strong>{result.status}</strong>
              {result.ok && " (принято в обработку)"}
            </p>
            <pre className="text-xs mt-3 p-3 bg-background/50 rounded overflow-auto">{result.raw}</pre>
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