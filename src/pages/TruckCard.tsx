import { useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import TruckCardPreview from "./truckCard/TruckCardPreview";
import TruckCardResultModal from "./truckCard/TruckCardResultModal";
import { useTruckCardDownload } from "./truckCard/useTruckCardDownload";

const ACCESS_CODE = "favorit2024";

const TruckCard = () => {
  const { downloading, handleDownload, resultUrl, closeResult } = useTruckCardDownload();
  const [searchParams] = useSearchParams();
  const hasAccess = searchParams.get("code") === ACCESS_CODE;

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0fdfa 100%)" }}>
        <Icon name="Lock" size={48} className="text-teal-600 mb-4" />
        <h1 className="text-xl font-bold text-slate-800 mb-2">Доступ закрыт</h1>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          Эта страница доступна только по защищённой ссылке.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-lg"
          style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)" }}
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0fdfa 100%)" }}>
      <div className="max-w-[640px] mx-auto mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-xl disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)", boxShadow: "0 8px 24px rgba(13,148,136,0.4)" }}
        >
          {downloading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Готовлю файл...
            </>
          ) : (
            <>
              <Icon name="Download" size={16} />
              Скачать как JPG
            </>
          )}
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-700 text-sm bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
      </div>

      {/* Предпросмотр */}
      <TruckCardPreview />

      <p className="max-w-[640px] mx-auto mt-4 text-center text-xs text-slate-500">
        Карточка техники в фирменном стиле · отправляйте клиентам в WhatsApp / Telegram
      </p>

      {resultUrl && <TruckCardResultModal url={resultUrl} onClose={closeResult} />}
    </div>
  );
};

export default TruckCard;