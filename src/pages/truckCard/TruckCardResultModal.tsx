import Icon from "@/components/ui/icon";
import { FILE_NAME } from "./useTruckCardDownload";

type Props = {
  url: string;
  onClose: () => void;
};

const TruckCardResultModal = ({ url, onClose }: Props) => (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="my-8 w-full max-w-[560px] rounded-2xl bg-white p-5 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-slate-900">Карточка готова</h2>
          <p className="mt-1 text-xs text-slate-500">
            Файл уже должен был сохраниться в папку «Загрузки». Если нет — нажмите кнопку ниже
            или сохраните картинку правым кликом.
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Закрыть"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      <img
        src={url}
        alt="Карточка техники FAW J6P-390"
        className="w-full rounded-xl border border-slate-200 shadow-sm"
      />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={url}
          download={FILE_NAME}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)" }}
        >
          <Icon name="Download" size={16} />
          Сохранить на компьютер
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          <Icon name="ExternalLink" size={16} />
          Открыть в новой вкладке
        </a>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-400">
        На телефоне: удерживайте картинку и выберите «Сохранить изображение»
      </p>
    </div>
  </div>
);

export default TruckCardResultModal;
