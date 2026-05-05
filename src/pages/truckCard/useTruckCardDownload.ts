import { useState } from "react";
import { drawRoundedRect, drawTable, wrapText } from "./canvasHelpers";
import { driverRows, truckRows } from "./truckCardData";

export const useTruckCardDownload = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const W = 720;
      const padding = 28;
      const innerW = W - padding * 2;

      const measure = document.createElement("canvas");
      const mctx = measure.getContext("2d")!;

      const headerH = 68;
      const titleBlock1 = 80;
      const tbl1H = (() => {
        let total = 0;
        for (const [label, value] of truckRows) {
          mctx.font = "500 13px Arial, sans-serif";
          const ll = wrapText(mctx, label, innerW * 0.45 - 28).length;
          mctx.font = "700 14px Arial, sans-serif";
          const vl = wrapText(mctx, value, innerW * 0.55 - 28).length;
          total += Math.max(ll, vl) * 18 + 24;
        }
        return total;
      })();
      const titleBlock2 = 44;
      const tbl2H = (() => {
        let total = 0;
        for (const [label, value] of driverRows) {
          mctx.font = "500 13px Arial, sans-serif";
          const ll = wrapText(mctx, label, innerW * 0.45 - 28).length;
          mctx.font = "700 14px Arial, sans-serif";
          const vl = wrapText(mctx, value, innerW * 0.55 - 28).length;
          total += Math.max(ll, vl) * 18 + 24;
        }
        return total;
      })();
      const contactsH = 130;

      const gaps = 18 * 5;
      const H =
        padding * 2 +
        headerH +
        titleBlock1 +
        tbl1H +
        titleBlock2 +
        tbl2H +
        contactsH +
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
      ctx.font = "900 11px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ООО «ФАВОРИТ»", padding, cy);
      ctx.fillStyle = "#64748b";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("аренда манипуляторов · Нижний Новгород", padding, cy + 18);

      ctx.fillStyle = "#64748b";
      ctx.textAlign = "right";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("Сайт", W - padding, cy);
      ctx.fillStyle = "#b45309";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("фаварит.рф", W - padding, cy + 16);

      cy += 44;
      ctx.strokeStyle = "rgba(13,148,136,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 18;

      // Бейдж + заголовок 1
      const badge1Text = "КАРТОЧКА ТЕХНИКИ";
      ctx.font = "700 10px Arial, sans-serif";
      const b1w = ctx.measureText(badge1Text).width + 24;
      ctx.fillStyle = "rgba(45,212,191,0.2)";
      drawRoundedRect(ctx, W / 2 - b1w / 2, cy, b1w, 22, 11);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, W / 2 - b1w / 2, cy, b1w, 22, 11);
      ctx.stroke();
      ctx.fillStyle = "#0d9488";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badge1Text, W / 2, cy + 11);
      cy += 32;

      ctx.fillStyle = "#0f172a";
      ctx.font = "900 26px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("FAW J6P-390 + КМУ", W / 2, cy);
      cy += 38;

      // Таблица техники
      const t1H = drawTable(ctx, truckRows, padding, cy, innerW);
      cy += t1H + 18;

      // Бейдж водителя
      const badge2Text = "КАРТОЧКА ВОДИТЕЛЯ";
      ctx.font = "700 10px Arial, sans-serif";
      const b2w = ctx.measureText(badge2Text).width + 24;
      ctx.fillStyle = "rgba(45,212,191,0.2)";
      drawRoundedRect(ctx, W / 2 - b2w / 2, cy, b2w, 22, 11);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, W / 2 - b2w / 2, cy, b2w, 22, 11);
      ctx.stroke();
      ctx.fillStyle = "#0d9488";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badge2Text, W / 2, cy + 11);
      cy += 32;

      // Таблица водителя
      const t2H = drawTable(ctx, driverRows, padding, cy, innerW);
      cy += t2H + 18;

      // Контакты
      ctx.strokeStyle = "rgba(13,148,136,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 14;

      const colW = (innerW - 10) / 2;
      const cardH = 56;

      // Директор
      ctx.fillStyle = "rgba(252,211,77,0.25)";
      drawRoundedRect(ctx, padding, cy, colW, cardH, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(180,83,9,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, padding, cy, colW, cardH, 10);
      ctx.stroke();
      ctx.fillStyle = "#92400e";
      ctx.font = "700 9px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ДИРЕКТОР", padding + 14, cy + 10);
      ctx.fillStyle = "#b45309";
      ctx.font = "700 16px Arial, sans-serif";
      ctx.fillText("+7 960 169-09-90", padding + 14, cy + 26);

      // Водитель
      const col2X = padding + colW + 10;
      ctx.fillStyle = "rgba(45,212,191,0.25)";
      drawRoundedRect(ctx, col2X, cy, colW, cardH, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.5)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, col2X, cy, colW, cardH, 10);
      ctx.stroke();
      ctx.fillStyle = "#0f766e";
      ctx.font = "700 9px Arial, sans-serif";
      ctx.fillText("ВОДИТЕЛЬ", col2X + 14, cy + 10);
      ctx.fillStyle = "#0f172a";
      ctx.font = "700 16px Arial, sans-serif";
      ctx.fillText("+7 960 188-30-84", col2X + 14, cy + 26);

      cy += cardH + 10;

      // Сайт
      ctx.fillStyle = "rgba(45,212,191,0.18)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(13,148,136,0.4)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.stroke();
      ctx.fillStyle = "#475569";
      ctx.font = "500 11px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Подробнее на сайте:", padding + 14, cy + 12);
      ctx.fillStyle = "#b45309";
      ctx.font = "700 13px Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("фаварит.рф", W - padding - 14, cy + 11);

      // Скачивание
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.download = "kartochka-faw-j6p-390.jpg";
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
