import { RefObject } from "react";
import Icon from "@/components/ui/icon";
import { MAX_FILES, MediaItem } from "./mediaUtils";

type Props = {
  media: MediaItem[];
  mediaError: string;
  fileInputRef: RefObject<HTMLInputElement>;
  onFilesPicked: (files: FileList | null) => void;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
};

const MediaAttach = ({ media, mediaError, fileInputRef, onFilesPicked, onRetry, onRemove }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => onFilesPicked(e.target.files)}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 h-11 sm:h-10 rounded-lg border border-dashed border-accent/50 bg-white/[0.04] text-accent text-sm font-semibold hover:bg-accent/10 hover:border-accent transition-all active:scale-[0.99]"
      >
        <Icon name="Paperclip" size={16} />
        <span>
          {media.length > 0
            ? `Прикреплено ${media.length} из ${MAX_FILES}`
            : "Прикрепить фото или видео объекта"}
        </span>
      </button>

      {media.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
          {media.map((m) => (
            <div
              key={m.id}
              className="relative aspect-square rounded-lg overflow-hidden border border-white/20 bg-black/40 group/media"
            >
              {m.kind === "image" ? (
                <img src={m.previewUrl} alt={m.file.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/80 bg-gradient-to-br from-zinc-800 to-black">
                  <Icon name="Video" size={22} className="text-accent" />
                  <span className="text-[9px] mt-1 px-1 line-clamp-1">{m.file.name}</span>
                </div>
              )}

              {/* Оверлей статуса загрузки */}
              {m.uploadStatus === "uploading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 text-white">
                  <Icon name="Loader2" size={20} className="animate-spin text-accent" />
                  <span className="text-[10px] mt-1 uppercase tracking-wider font-bold">
                    {typeof m.uploadProgress === "number" ? `${m.uploadProgress}%` : "Загрузка"}
                  </span>
                </div>
              )}
              {m.uploadStatus === "error" && (
                <button
                  type="button"
                  onClick={() => onRetry(m.id)}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/85 text-white hover:bg-red-800/90 transition-colors p-1"
                  title={m.errorText || "Ошибка"}
                >
                  <Icon name="RotateCw" size={18} />
                  <span className="text-[9px] mt-1 uppercase tracking-wider">Повторить</span>
                </button>
              )}
              {m.uploadStatus === "done" && (
                <>
                  <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-emerald-500/95 border border-white/40 flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                  {m.kind === "image" && m.originalSize && m.finalSize && m.finalSize < m.originalSize * 0.9 && (
                    <div className="absolute top-1 left-7 px-1.5 py-0.5 rounded-full bg-accent/95 text-black text-[9px] font-black uppercase tracking-wider shadow">
                      −{Math.round((1 - m.finalSize / m.originalSize) * 100)}%
                    </div>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={() => onRemove(m.id)}
                aria-label="Удалить файл"
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Icon name="X" size={12} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-medium uppercase tracking-wider">
                {m.kind === "video" ? "Видео" : "Фото"}
              </div>
            </div>
          ))}
        </div>
      )}

      {mediaError && (
        <p className="text-amber-400 text-[11px] leading-snug">{mediaError}</p>
      )}
      <p className="text-[10px] text-white/40 leading-snug text-center">
        До {MAX_FILES} файлов, по 500 МБ. Фото сжимаются автоматически — заявка отправится быстрее.
      </p>
    </div>
  );
};

export default MediaAttach;
