import { useState } from "react";
import { drawRoundedRect, wrapText } from "@/pages/truckCard/canvasHelpers";

interface Args {
  yandexUrl: string;
  phoneDisplay: string;
}

export const useReviewCardDownload = ({ yandexUrl: _yandexUrl, phoneDisplay }: Args) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const W = 720;
      const padding = 28;
      const innerW = W - padding * 2;

      const measure = document.createElement("canvas");
      const mctx = measure.getContext("2d")!;

      // Высота описания
      mctx.font = "400 16px Arial, sans-serif";
      const descLines = wrapText(
        mctx,
        "Ваш честный отзыв — лучшая благодарность для нашей команды и помощь другим клиентам в выборе.",
        innerW - 40,
      );
      const descH = descLines.length * 22;

      const headerH = 68;
      const badgeH = 32;
      const titleH = 80;
      const starsH = 50;
      const yandexBtnH = 86;
      const captionH = 26;
      const phoneH = 70;
      const siteRowH = 44;
      const gaps = 18 * 6;

      const H =
        padding * 2 +
        headerH +
        badgeH +
        titleH +
        descH +
        starsH +
        yandexBtnH +
        captionH +
        phoneH +
        siteRowH +
        gaps;

      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);

      // Светлый фон
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#f0fdfa");
      bgGrad.addColorStop(0.5, "#f8fafc");
      bgGrad.addColorStop(1, "#f0fdfa");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Рамка карточки
      ctx.strokeStyle = "rgba(13,148,136,0.55)";
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, 6, 6, W - 12, H - 12, 16);
      ctx.stroke();

      let cy = padding;

      // Шапка
      ctx.fillStyle = "#0d9488";
      ctx.font = "900 12px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ООО «ФАВОРИТ»", padding, cy);
      ctx.fillStyle = "#64748b";
      ctx.font = "400 12px Arial, sans-serif";
      ctx.fillText("аренда манипуляторов · Нижний Новгород", padding, cy + 20);

      ctx.fillStyle = "#64748b";
      ctx.textAlign = "right";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("Сайт", W - padding, cy);
      ctx.fillStyle = "#b45309";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("фаварит.рф", W - padding, cy + 18);

      cy += 46;
      ctx.strokeStyle = "rgba(13,148,136,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 18;

      // Бейдж
      const badgeText = "СПАСИБО ЗА ВАШ ВЫБОР";
      ctx.font = "700 11px Arial, sans-serif";
      const bw = ctx.measureText(badgeText).width + 28;
      ctx.fillStyle = "rgba(45,212,191,0.2)";
      drawRoundedRect(ctx, W / 2 - bw / 2, cy, bw, 24, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, W / 2 - bw / 2, cy, bw, 24, 12);
      ctx.stroke();
      ctx.fillStyle = "#0d9488";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badgeText, W / 2, cy + 12);
      cy += 36;

      // Заголовок
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 30px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Оставьте отзыв", W / 2, cy);
      ctx.fillText("о нашей работе", W / 2, cy + 36);
      cy += 80;

      // Описание
      ctx.fillStyle = "#475569";
      ctx.font = "400 15px Arial, sans-serif";
      ctx.textAlign = "center";
      descLines.forEach((ln, i) => {
        ctx.fillText(ln, W / 2, cy + i * 22);
      });
      cy += descH + 18;

      // Звёзды
      ctx.font = "400 36px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⭐ ⭐ ⭐ ⭐ ⭐", W / 2, cy);
      cy += 50;

      // Кнопка Яндекса
      const btnH = 70;
      const btnGrad = ctx.createLinearGradient(padding, cy, padding, cy + btnH);
      btnGrad.addColorStop(0, "#fef3c7");
      btnGrad.addColorStop(1, "#fde68a");
      ctx.fillStyle = btnGrad;
      drawRoundedRect(ctx, padding, cy, innerW, btnH, 14);
      ctx.fill();
      ctx.strokeStyle = "rgba(180,83,9,0.55)";
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, padding, cy, innerW, btnH, 14);
      ctx.stroke();

      // Иконка-кружок со звездой
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(padding + 30, cy + btnH / 2, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#b45309";
      ctx.font = "400 22px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", padding + 30, cy + btnH / 2 + 1);

      ctx.fillStyle = "#b45309";
      ctx.textAlign = "left";
      ctx.font = "700 11px Arial, sans-serif";
      ctx.fillText("ОСТАВИТЬ ОТЗЫВ", padding + 64, cy + 22);
      ctx.font = "900 18px Arial, sans-serif";
      ctx.fillText("на Яндексе", padding + 64, cy + 46);

      // Стрелка
      ctx.fillStyle = "#b45309";
      ctx.font = "700 22px Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("→", W - padding - 18, cy + btnH / 2);

      cy += btnH + 6;

      // Подпись
      ctx.fillStyle = "#64748b";
      ctx.font = "400 12px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Откроется поиск Яндекса по запросу «фаварит.рф»", W / 2, cy);
      cy += 26;

      // Разделитель
      ctx.strokeStyle = "rgba(13,148,136,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 18;

      // Карточка телефона
      const phoneCardH = 58;
      ctx.fillStyle = "rgba(45,212,191,0.25)";
      drawRoundedRect(ctx, padding, cy, innerW, phoneCardH, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, padding, cy, innerW, phoneCardH, 12);
      ctx.stroke();

      ctx.fillStyle = "#0f766e";
      ctx.font = "700 10px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("СВЯЗАТЬСЯ С НАМИ", padding + 18, cy + 12);
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 18px Arial, sans-serif";
      ctx.fillText(phoneDisplay, padding + 18, cy + 30);

      cy += phoneCardH + 12;

      // Полоска с сайтом
      ctx.fillStyle = "rgba(45,212,191,0.18)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.4)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.stroke();
      ctx.fillStyle = "#475569";
      ctx.font = "500 12px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Подробнее на сайте:", padding + 14, cy + 12);
      ctx.fillStyle = "#b45309";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("фаварит.рф", W - padding - 14, cy + 11);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.download = "favorit-otzyv.jpg";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert("Ошибка при сохранении: " + (e as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, handleDownload };
};
