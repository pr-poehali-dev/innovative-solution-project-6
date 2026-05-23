import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "./heroData";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 МБ на файл (видео могут быть тяжёлыми)

type MediaItem = {
  id: string;
  file: File;
  previewUrl: string;
  kind: "image" | "video";
  uploadStatus: "pending" | "uploading" | "done" | "error";
  uploadedUrl?: string;
  errorText?: string;
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result имеет вид "data:<mime>;base64,XXXX" — отрезаем префикс
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const HeroLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cargo, setCargo] = useState("");
  const [fromAddr, setFromAddr] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaError, setMediaError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadOne = async (item: MediaItem) => {
    setMedia((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, uploadStatus: "uploading", errorText: undefined } : x))
    );
    try {
      const dataB64 = await fileToBase64(item.file);
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "upload-media",
          filename: item.file.name,
          mime: item.file.type,
          data: dataB64,
        }),
      });
      const json = await res.json().catch(() => ({} as { url?: string; error?: string }));
      if (res.ok && json.url) {
        setMedia((prev) =>
          prev.map((x) => (x.id === item.id ? { ...x, uploadStatus: "done", uploadedUrl: json.url } : x))
        );
      } else {
        setMedia((prev) =>
          prev.map((x) =>
            x.id === item.id
              ? { ...x, uploadStatus: "error", errorText: json.error || "Не удалось загрузить" }
              : x
          )
        );
      }
    } catch {
      setMedia((prev) =>
        prev.map((x) =>
          x.id === item.id
            ? { ...x, uploadStatus: "error", errorText: "Сбой сети при загрузке" }
            : x
        )
      );
    }
  };

  const handleFilesPicked = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMediaError("");
    const next: MediaItem[] = [...media];
    const justAdded: MediaItem[] = [];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_FILES) {
        setMediaError(`Можно прикрепить не больше ${MAX_FILES} файлов`);
        break;
      }
      if (file.size > MAX_FILE_SIZE) {
        setMediaError(`Файл "${file.name}" больше 50 МБ — уменьшите его или отправьте отдельно`);
        continue;
      }
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) {
        setMediaError("Можно прикреплять только фото или видео");
        continue;
      }
      const item: MediaItem = {
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        kind: isVideo ? "video" : "image",
        uploadStatus: "pending",
      };
      next.push(item);
      justAdded.push(item);
    }
    setMedia(next);
    // Сразу запускаем фоновую загрузку каждого файла по одному
    justAdded.forEach((it) => {
      void uploadOne(it);
    });
  };

  const retryUpload = (id: string) => {
    const item = media.find((m) => m.id === id);
    if (item) void uploadOne(item);
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((m) => m.id !== id);
    });
    setMediaError("");
  };

  const resetForm = () => {
    media.forEach((m) => URL.revokeObjectURL(m.previewUrl));
    setName("");
    setPhone("");
    setCargo("");
    setFromAddr("");
    setToAddr("");
    setMedia([]);
    setMediaError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const stillUploading = media.some((m) => m.uploadStatus === "uploading" || m.uploadStatus === "pending");
    if (stillUploading) {
      setMediaError("Дождитесь окончания загрузки файлов");
      return;
    }

    setStatus("loading");
    setMediaError("");
    try {
      const commentParts = [
        cargo && `Груз: ${cargo}`,
        fromAddr && `Откуда: ${fromAddr}`,
        toAddr && `Куда: ${toAddr}`,
      ].filter(Boolean);

      // К форме прикрепляем только успешно загруженные файлы — ссылки уже в S3
      const mediaPayload = media
        .filter((m) => m.uploadStatus === "done" && m.uploadedUrl)
        .map((m) => ({
          url: m.uploadedUrl,
          name: m.file.name,
          mime: m.file.type,
          kind: m.kind,
          size: m.file.size,
        }));

      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          comment: commentParts.join(" · "),
          media: mediaPayload,
        }),
      });
      if (res.ok) {
        setStatus("success");
        resetForm();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative rounded-2xl p-[2px] overflow-hidden" style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}>
        <div className="bg-background rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircle" size={22} className="text-accent" />
          </div>
          <div>
            <p className="font-black text-white text-base flex items-center gap-1.5">Заявка принята <Icon name="Sparkles" size={16} className="text-accent" /></p>
            <p className="text-xs text-white/70">Перезвоним в ближайшие 5 минут.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" id="order">
      {/* Мягкое золотое свечение */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-30 blur-md pointer-events-none animate-pulse"
        style={{ background: "linear-gradient(135deg, #e8a820 0%, transparent 50%, #e8a820 100%)" }}
      />

      {/* Золотая рамка-градиент */}
      <div className="relative rounded-2xl p-[1.5px]" style={{ background: "linear-gradient(135deg, rgba(245,208,96,0.9) 0%, rgba(232,168,32,0.3) 50%, rgba(232,168,32,0.8) 100%)" }}>
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black p-3.5 sm:p-4 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-[11px] text-white/60 mb-2 leading-snug text-center">
              Перезвоним за 5 минут · рассчитаем цену · подберём технику
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
              <div className="flex flex-col sm:flex-row gap-1.5">
                <div className="relative flex-1">
                  <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Имя или компания"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-white placeholder:text-white/50 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="relative flex-1">
                  <Icon name="Phone" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Телефон +7 (___) ___-__-__"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-1.5">
                <div className="relative flex-1">
                  <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Откуда (адрес погрузки)"
                    value={fromAddr}
                    onChange={e => setFromAddr(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="relative flex-1">
                  <Icon name="Flag" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Куда (адрес разгрузки)"
                    value={toAddr}
                    onChange={e => setToAddr(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>
              <div className="relative">
                <Icon name="Package" size={14} className="absolute left-3 top-3 text-accent/70 pointer-events-none" />
                <textarea
                  rows={2}
                  placeholder="Что везём (груз, вес, размеры, подъездные пути для техники)"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none leading-snug"
                />
              </div>

              {/* Прикрепить фото/видео объекта */}
              <div className="flex flex-col gap-1.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => handleFilesPicked(e.target.files)}
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
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                            <Icon name="Loader2" size={20} className="animate-spin text-accent" />
                            <span className="text-[9px] mt-1 uppercase tracking-wider">Загрузка</span>
                          </div>
                        )}
                        {m.uploadStatus === "error" && (
                          <button
                            type="button"
                            onClick={() => retryUpload(m.id)}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/85 text-white hover:bg-red-800/90 transition-colors p-1"
                            title={m.errorText || "Ошибка"}
                          >
                            <Icon name="RotateCw" size={18} />
                            <span className="text-[9px] mt-1 uppercase tracking-wider">Повторить</span>
                          </button>
                        )}
                        {m.uploadStatus === "done" && (
                          <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-emerald-500/95 border border-white/40 flex items-center justify-center">
                            <Icon name="Check" size={12} className="text-white" />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => removeMedia(m.id)}
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
                  До {MAX_FILES} файлов, по 50 МБ. Загружаются сразу — отправите, когда все будут готовы.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative mt-0.5 w-full px-5 h-12 sm:h-11 rounded-lg font-black text-base sm:text-base flex items-center gap-2 justify-center transition-all disabled:opacity-60 active:scale-[0.98] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  color: "#000",
                  boxShadow: "0 4px 18px rgba(232,168,32,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.03em",
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                {status === "loading" ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="relative">Отправка...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Оставить заявку</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">Ошибка отправки, попробуйте ещё раз или позвоните.</p>
              )}

              <p className="text-[10px] text-white/50 text-center leading-snug mt-0.5">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" target="_blank" rel="noopener" className="text-accent/80 hover:text-accent hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLeadForm;