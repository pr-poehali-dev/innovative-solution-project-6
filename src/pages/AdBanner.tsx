import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_URL =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/0971f110-23ca-4559-bcb8-7e40f7137c27.jpg";
const LOGO_URL =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/a0ccaed0-3d0e-42c5-b307-61b76dc08802.png";

const PHONE = "+7 (960) 188-30-84";

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const renderBanner = async (canvas: HTMLCanvasElement) => {
  const photo = await loadImage(PHOTO_URL);
  const logo = await loadImage(LOGO_URL);

  const W = photo.naturalWidth;
  const H = photo.naturalHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(photo, 0, 0, W, H);

  // ===== Логотип слева сверху =====
  const logoMaxW = Math.round(W * 0.22);
  const logoRatio = logo.naturalHeight / logo.naturalWidth;
  const logoW = logoMaxW;
  const logoH = Math.round(logoW * logoRatio);
  const logoX = Math.round(W * 0.025);
  const logoY = Math.round(H * 0.04);

  // Фон под лого (тёмная плашка с тенью)
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 4;
  drawRoundedRect(ctx, logoX - 8, logoY - 8, logoW + 16, logoH + 16, 12);
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.fill();
  ctx.restore();
  ctx.drawImage(logo, logoX, logoY, logoW, logoH);

  // ===== Плашка с телефоном внизу =====
  const phoneBarH = Math.round(H * 0.16);
  const phoneBarY = H - phoneBarH;

  const grad = ctx.createLinearGradient(0, phoneBarY, 0, H);
  grad.addColorStop(0, "rgba(15, 23, 42, 0)");
  grad.addColorStop(0.4, "rgba(15, 23, 42, 0.85)");
  grad.addColorStop(1, "rgba(15, 23, 42, 0.95)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, phoneBarY, W, phoneBarH);

  // Акцентная полоса золотом
  const accentH = Math.max(4, Math.round(H * 0.004));
  ctx.fillStyle = "#d4a437";
  ctx.fillRect(0, phoneBarY, W, accentH);

  // Текст: подпись
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const captionFontSize = Math.round(H * 0.028);
  ctx.font = `700 ${captionFontSize}px Arial, sans-serif`;
  ctx.fillStyle = "#d4a437";
  const captionX = Math.round(W * 0.04);
  const captionY = phoneBarY + Math.round(phoneBarH * 0.32);
  ctx.fillText("АРЕНДА МАНИПУЛЯТОРОВ · НИЖНИЙ НОВГОРОД", captionX, captionY);

  // Телефон — справа крупно
  ctx.textAlign = "right";
  const phoneFontSize = Math.round(H * 0.075);
  ctx.font = `900 ${phoneFontSize}px Arial, sans-serif`;
  const phoneY = phoneBarY + Math.round(phoneBarH * 0.6);
  const phoneX = W - Math.round(W * 0.04);

  // Тень для телефона
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(PHONE, phoneX, phoneY);
  ctx.restore();

  // Иконка телефона перед номером
  const phoneTextW = ctx.measureText(PHONE).width;
  const iconSize = Math.round(phoneFontSize * 0.7);
  const iconX = phoneX - phoneTextW - iconSize - 14;
  const iconY = phoneY - iconSize / 2;

  // Круглая плашка под иконку
  ctx.fillStyle = "#d4a437";
  ctx.beginPath();
  ctx.arc(
    iconX + iconSize / 2,
    iconY + iconSize / 2,
    iconSize / 2 + 6,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Простая иконка телефона (трубка)
  ctx.save();
  ctx.translate(iconX + iconSize / 2, iconY + iconSize / 2);
  ctx.fillStyle = "#0f172a";
  ctx.font = `900 ${Math.round(iconSize * 0.9)}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("☎", 0, 2);
  ctx.restore();

  // Левая надпись "Звоните!"
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  const ctaFontSize = Math.round(H * 0.045);
  ctx.font = `900 ${ctaFontSize}px Arial, sans-serif`;
  const ctaY = phoneBarY + Math.round(phoneBarH * 0.65);
  ctx.fillText("ЗВОНИТЕ:", captionX, ctaY);
};

const AdBanner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (!canvasRef.current) return;
        await renderBanner(canvasRef.current);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить изображение");
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "favorit-yandex-ads.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
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

        <div className="bg-slate-800 rounded-2xl p-3 md:p-5 border border-slate-700 mb-5">
          {loading && (
            <div className="aspect-video flex items-center justify-center text-slate-400">
              <Icon name="Loader2" size={32} className="animate-spin" />
            </div>
          )}
          {error && (
            <div className="aspect-video flex items-center justify-center text-red-400">
              {error}
            </div>
          )}
          <canvas
            ref={canvasRef}
            className={`w-full h-auto rounded-lg ${loading || error ? "hidden" : "block"}`}
          />
        </div>

        <button
          onClick={handleDownload}
          disabled={loading || !!error}
          className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-black px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition"
        >
          <Icon name="Download" size={22} />
          Скачать JPG
        </button>

        <div className="mt-8 text-sm text-slate-400 space-y-2">
          <p>· Размер совпадает с оригиналом фото</p>
          <p>· Формат JPG — подходит для Яндекс Директ</p>
          <p>· Логотип, подпись и телефон наложены поверх фото</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
