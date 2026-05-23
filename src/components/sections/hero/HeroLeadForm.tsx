import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "./heroData";
import LeadFormFields from "./leadForm/LeadFormFields";
import MediaAttach from "./leadForm/MediaAttach";
import SubmitButton from "./leadForm/SubmitButton";
import { useMediaUploader } from "./leadForm/useMediaUploader";

const HeroLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cargo, setCargo] = useState("");
  const [fromAddr, setFromAddr] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    media,
    mediaError,
    setMediaError,
    fileInputRef,
    handleFilesPicked,
    retryUpload,
    removeMedia,
    resetMedia,
  } = useMediaUploader();

  const resetForm = () => {
    setName("");
    setPhone("");
    setCargo("");
    setFromAddr("");
    setToAddr("");
    resetMedia();
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
              <LeadFormFields
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                fromAddr={fromAddr}
                setFromAddr={setFromAddr}
                toAddr={toAddr}
                setToAddr={setToAddr}
                cargo={cargo}
                setCargo={setCargo}
              />

              {/* Прикрепить фото/видео объекта */}
              <MediaAttach
                media={media}
                mediaError={mediaError}
                fileInputRef={fileInputRef}
                onFilesPicked={handleFilesPicked}
                onRetry={retryUpload}
                onRemove={removeMedia}
              />

              <SubmitButton status={status} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLeadForm;
