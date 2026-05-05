import Icon from "@/components/ui/icon";
import TruckCardPreview from "./truckCard/TruckCardPreview";
import { useTruckCardDownload } from "./truckCard/useTruckCardDownload";

const TruckCard = () => {
  const { downloading, handleDownload } = useTruckCardDownload();

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
    </div>
  );
};

export default TruckCard;
