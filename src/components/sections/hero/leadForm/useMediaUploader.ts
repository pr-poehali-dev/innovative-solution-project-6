import { useRef, useState } from "react";
import { SUBMIT_URL } from "../heroData";
import {
  MAX_FILES,
  MAX_FILE_SIZE,
  MediaItem,
  compressImage,
  fileToBase64,
} from "./mediaUtils";

export const useMediaUploader = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaError, setMediaError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Загрузка файла одним запросом (для маленьких файлов и фото).
   * Возвращает URL или null.
   */
  const uploadSingle = async (file: File): Promise<string | null> => {
    const dataB64 = await fileToBase64(file);
    const res = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "upload-media",
        filename: file.name,
        mime: file.type,
        data: dataB64,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && json.url) return json.url;
    throw new Error(json.error || "Ошибка загрузки");
  };

  /**
   * Чанковая загрузка тяжёлых файлов (видео). Режет файл на куски ~1.5 МБ
   * и шлёт каждый отдельным запросом — обходит лимит шлюза на размер body.
   */
  const uploadChunked = async (
    file: File,
    onProgress: (percent: number) => void
  ): Promise<string | null> => {
    const CHUNK_SIZE = 1_500_000; // ~1.5 МБ бинарных = ~2 МБ base64 — стабильно проходит шлюз

    // 1. Резервируем сессию
    const startRes = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chunk-start",
        filename: file.name,
        mime: file.type,
      }),
    });
    const startJson = (await startRes.json().catch(() => ({}))) as {
      sessionId?: string;
      error?: string;
    };
    if (!startRes.ok || !startJson.sessionId) {
      throw new Error(startJson.error || "Не удалось начать загрузку");
    }
    const sessionId = startJson.sessionId;

    // 2. Грузим чанки последовательно
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const blob = file.slice(start, end);
      const b64 = await fileToBase64(blob);
      const partRes = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chunk-part",
          sessionId,
          partNumber: i + 1,
          data: b64,
        }),
      });
      const partJson = (await partRes.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!partRes.ok || !partJson.ok) {
        throw new Error(partJson.error || `Сбой части ${i + 1}/${totalChunks}`);
      }
      onProgress(Math.round(((i + 1) / totalChunks) * 100));
    }

    // 3. Финиш — сервер склеит чанки в один файл
    const finishRes = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chunk-finish",
        sessionId,
        totalParts: totalChunks,
        mime: file.type,
        filename: file.name,
      }),
    });
    const finishJson = (await finishRes.json().catch(() => ({}))) as { url?: string; error?: string };
    if (!finishRes.ok || !finishJson.url) {
      throw new Error(finishJson.error || "Не удалось собрать файл");
    }
    return finishJson.url;
  };

  const uploadOne = async (item: MediaItem) => {
    setMedia((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, uploadStatus: "uploading", errorText: undefined } : x))
    );
    try {
      // Сжимаем фото перед загрузкой (видео не трогаем)
      const fileForUpload = item.kind === "image" ? await compressImage(item.file) : item.file;

      // Файлы >2 МБ грузим чанками (не упрёмся в лимит body шлюза).
      // Видео всегда идут чанками независимо от размера.
      const HEAVY_THRESHOLD = 2 * 1024 * 1024;
      let url: string | null;
      if (item.kind === "video" || fileForUpload.size > HEAVY_THRESHOLD) {
        url = await uploadChunked(fileForUpload, (percent) => {
          setMedia((prev) =>
            prev.map((x) => (x.id === item.id ? { ...x, uploadProgress: percent } : x))
          );
        });
      } else {
        url = await uploadSingle(fileForUpload);
      }

      if (url) {
        setMedia((prev) =>
          prev.map((x) =>
            x.id === item.id
              ? {
                  ...x,
                  uploadStatus: "done",
                  uploadedUrl: url || undefined,
                  finalSize: fileForUpload.size,
                  uploadProgress: 100,
                }
              : x
          )
        );
      } else {
        throw new Error("Пустой ответ сервера");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Сбой сети при загрузке";
      setMedia((prev) =>
        prev.map((x) =>
          x.id === item.id ? { ...x, uploadStatus: "error", errorText: msg } : x
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
        setMediaError(`Файл "${file.name}" больше 500 МБ — уменьшите его или отправьте отдельно`);
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
        originalSize: file.size,
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

  const resetMedia = () => {
    media.forEach((m) => URL.revokeObjectURL(m.previewUrl));
    setMedia([]);
    setMediaError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    media,
    mediaError,
    setMediaError,
    fileInputRef,
    handleFilesPicked,
    retryUpload,
    removeMedia,
    resetMedia,
  };
};
