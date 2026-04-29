import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const BANNER_URL = func2url.banner;

const AdBanner = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(BANNER_URL + "?t=" + Date.now());
        if (!res.ok) throw new Error("HTTP " + res.status);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
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
    };
  }, []);

  const handleDownload = () => {
    if (!blobUrl) return;
    const link = document.createElement("a");
    link.download = "favorit-yandex-ads.jpg";
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
          Скачать JPG
        </button>

        <div className="mt-8 text-sm text-slate-400 space-y-2">
          <p>· Размер совпадает с оригиналом фото</p>
          <p>· Формат JPG — подходит для Яндекс Директ</p>
          <p>· Логотип и телефон уже наложены</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
