import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const BANNER_URL = func2url.banner;

const VARIANTS = [
  { id: "1", title: "Вариант 1", desc: "Лого сверху, телефон снизу" },
  { id: "2", title: "Вариант 2", desc: "Телефон крупно сверху, лого снизу" },
];

const AdBanner = () => {
  const [variant, setVariant] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BANNER_URL}?v=${variant}&t=${Date.now()}`);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        createdUrl = url;
        if (!active) {
          URL.revokeObjectURL(url);
          return;
        }
        setBlobUrl(url);
        setImgSrc(url);
        setLoading(false);
      } catch (e) {
        console.error(e);
        if (active) {
          setError("Не удалось сгенерировать баннер");
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [variant]);

  const handleDownload = () => {
    if (!blobUrl) return;
    const link = document.createElement("a");
    link.download = `favorit-yandex-ads-v${variant}.jpg`;
    link.href = blobUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black mb-2">
            Баннер для Яндекс Рекламы
          </h1>
          <p className="text-slate-400 text-sm">
            Твоё фото с логотипом ООО Фаворит и телефоном
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              className={`text-left p-4 rounded-xl border transition ${
                variant === v.id
                  ? "border-amber-400 bg-amber-500/10"
                  : "border-slate-700 bg-slate-800 hover:border-slate-500"
              }`}
            >
              <div className="font-black text-lg flex items-center gap-2">
                {variant === v.id && (
                  <Icon
                    name="CheckCircle2"
                    size={20}
                    className="text-amber-400"
                  />
                )}
                {v.title}
              </div>
              <div className="text-sm text-slate-400 mt-1">{v.desc}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-800 rounded-2xl p-3 md:p-5 border border-slate-700 mb-5 min-h-[200px]">
          {loading && (
            <div className="aspect-video flex flex-col items-center justify-center text-slate-400 gap-3">
              <Icon name="Loader2" size={32} className="animate-spin" />
              <span className="text-sm">Готовлю баннер...</span>
            </div>
          )}
          {error && (
            <div className="aspect-video flex items-center justify-center text-red-400">
              {error}
            </div>
          )}
          {imgSrc && !loading && !error && (
            <img
              src={imgSrc}
              alt="Рекламный баннер"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={loading || !!error || !blobUrl}
          className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-black px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition"
        >
          <Icon name="Download" size={22} />
          Скачать JPG (Вариант {variant})
        </button>

        <div className="mt-8 text-sm text-slate-400 space-y-2">
          <p>· Размер совпадает с оригиналом фото</p>
          <p>· Формат JPG — подходит для Яндекс Директ</p>
          <p>· Скачай оба варианта для A/B-теста в рекламе</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
