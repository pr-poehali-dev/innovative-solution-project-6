export const MAX_FILES = 5;
export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 МБ на файл — для длинных видео с телефона
export const IMAGE_MAX_DIMENSION = 1920; // макс. сторона при сжатии фото
export const IMAGE_QUALITY = 0.82;
export const IMAGE_COMPRESS_THRESHOLD = 800 * 1024; // фото меньше 800 КБ не сжимаем

export type MediaItem = {
  id: string;
  file: File;
  previewUrl: string;
  kind: "image" | "video";
  uploadStatus: "pending" | "uploading" | "done" | "error";
  uploadedUrl?: string;
  errorText?: string;
  originalSize?: number;
  finalSize?: number;
  uploadProgress?: number;
};

export const fileToBase64 = (file: File | Blob): Promise<string> =>
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

/**
 * Сжимает фото в браузере: уменьшает размер до IMAGE_MAX_DIMENSION
 * по большей стороне и конвертирует в JPEG. Видео не трогает.
 * Если что-то пошло не так — возвращает исходный файл.
 */
export const compressImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }
    // Не сжимаем мелкие файлы и анимированные GIF
    if (file.size < IMAGE_COMPRESS_THRESHOLD || file.type === "image/gif") {
      resolve(file);
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const { width, height } = img;
        const maxSide = Math.max(width, height);
        const scale = maxSide > IMAGE_MAX_DIMENSION ? IMAGE_MAX_DIMENSION / maxSide : 1;
        const targetW = Math.round(width * scale);
        const targetH = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, targetW, targetH);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (!blob || blob.size >= file.size) {
              // если после сжатия стало больше — оставляем оригинал
              resolve(file);
              return;
            }
            const newName = file.name.replace(/\.(png|webp|heic|heif|bmp|tiff?|jpeg|jpg)$/i, "") + ".jpg";
            resolve(new File([blob], newName, { type: "image/jpeg", lastModified: Date.now() }));
          },
          "image/jpeg",
          IMAGE_QUALITY
        );
      } catch {
        URL.revokeObjectURL(url);
        resolve(file);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
