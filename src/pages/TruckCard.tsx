import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_PHOTO_URL = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/a2338211-12bc-4ec4-8d21-b22ac64d6d1b.jpg";

const truckRows: [string, string][] = [
  ["Машина (марка ТС)", "FAW J6P-390"],
  ["Гос. номер", "А479ХО252"],
  ["Колёсная формула", "6×4"],
  ["Стрела", "Грузоподъёмность: 8т, длина 20м"],
  ["Борт", "Грузоподъёмность: 35т, длина 8м"],
  ["Высота платформы", "1,4 м"],
  ["Доп. оборудование", "Монтажная Люлька"],
];

const driverRows: [string, string][] = [
  ["ФИО", "Никифоров Александр Николаевич"],
  ["Год рождения", "07.02.1988"],
  ["Паспорт", "2413 708777"],
  ["В/у", "99 39 140170"],
];

// === Helpers для рисования ===
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

// Перенос длинных строк по ширине
const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const drawTable = (
  ctx: CanvasRenderingContext2D,
  rows: [string, string][],
  x: number,
  y: number,
  width: number
): number => {
  const labelW = width * 0.45;
  const valueW = width - labelW;
  const padX = 14;
  const padY = 12;
  const rowGap = 0;
  const lineH = 18;

  // Сначала рассчитаем высоты строк
  const rowHeights: number[] = [];
  for (const [label, value] of rows) {
    ctx.font = "500 13px Arial, sans-serif";
    const labelLines = wrapText(ctx, label, labelW - padX * 2);
    ctx.font = "700 14px Arial, sans-serif";
    const valueLines = wrapText(ctx, value, valueW - padX * 2);
    const maxLines = Math.max(labelLines.length, valueLines.length);
    rowHeights.push(maxLines * lineH + padY * 2);
  }
  const totalH = rowHeights.reduce((a, b) => a + b + rowGap, 0);

  // Внешняя обводка
  ctx.strokeStyle = "rgba(45,212,191,0.3)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.stroke();

  // Клипуем для скруглённых углов
  ctx.save();
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.clip();

  let curY = y;
  for (let i = 0; i < rows.length; i++) {
    const [label, value] = rows[i];
    const h = rowHeights[i];

    // Фон левой ячейки
    ctx.fillStyle = "rgba(45,212,191,0.07)";
    ctx.fillRect(x, curY, labelW, h);
    // Фон правой
    ctx.fillStyle = "rgba(16,185,129,0.04)";
    ctx.fillRect(x + labelW, curY, valueW, h);

    // Разделитель снизу
    if (i < rows.length - 1) {
      ctx.strokeStyle = "rgba(45,212,191,0.18)";
      ctx.beginPath();
      ctx.moveTo(x, curY + h);
      ctx.lineTo(x + width, curY + h);
      ctx.stroke();
    }
    // Вертикальный разделитель
    ctx.strokeStyle = "rgba(45,212,191,0.18)";
    ctx.beginPath();
    ctx.moveTo(x + labelW, curY);
    ctx.lineTo(x + labelW, curY + h);
    ctx.stroke();

    // Label
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "500 13px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const labelLines = wrapText(ctx, label, labelW - padX * 2);
    labelLines.forEach((ln, j) => {
      ctx.fillText(ln, x + padX, curY + padY + j * lineH);
    });

    // Value
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 14px Arial, sans-serif";
    ctx.textAlign = "center";
    const valueLines = wrapText(ctx, value, valueW - padX * 2);
    valueLines.forEach((ln, j) => {
      ctx.fillText(ln, x + labelW + valueW / 2, curY + padY + j * lineH);
    });

    curY += h + rowGap;
  }
  ctx.restore();
  return totalH;
};

const TruckCard = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setPhotoLoaded(true);
    img.onerror = () => setPhotoError(true);
    img.src = TRUCK_PHOTO_URL;
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // === Рендеринг через нативный Canvas API ===
      const W = 720; // ширина итоговой картинки (logical)
      const padding = 28;
      const innerW = W - padding * 2;

      // Загружаем фото
      const photo = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Не удалось загрузить фото"));
        img.src = TRUCK_PHOTO_URL;
      });

      // Расчёт высот блоков (создадим временный canvas для измерения)
      const measure = document.createElement("canvas");
      const mctx = measure.getContext("2d")!;

      // Шапка
      const headerH = 68;
      // Бейдж + заголовок (техника)
      const titleBlock1 = 80;
      // Таблица техники — измеряем
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
      // Фото
      const photoBoxH = (innerW * photo.naturalHeight) / photo.naturalWidth + 8;
      // Бейдж водителя
      const titleBlock2 = 44;
      // Таблица водителя
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
      // Контакты
      const contactsH = 80;

      const gaps = 18 * 6;
      const H =
        padding * 2 +
        headerH +
        titleBlock1 +
        tbl1H +
        photoBoxH +
        titleBlock2 +
        tbl2H +
        contactsH +
        gaps;

      // Главный canvas (с retina x2)
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);

      // Фон
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#0a0a0a");
      bgGrad.addColorStop(0.5, "#18181b");
      bgGrad.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Рамка карточки
      ctx.strokeStyle = "rgba(45,212,191,0.5)";
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, 6, 6, W - 12, H - 12, 16);
      ctx.stroke();

      let cy = padding;

      // === Шапка ===
      // Левая часть
      ctx.fillStyle = "#5eead4";
      ctx.font = "900 11px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ООО «ФАВОРИТ»", padding, cy);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("аренда манипуляторов · Нижний Новгород", padding, cy + 18);

      // Правая часть
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "right";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("Сайт", W - padding, cy);
      ctx.fillStyle = "#f5d060";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("фаварит.рф", W - padding, cy + 16);

      cy += 44;
      // Разделитель
      ctx.strokeStyle = "rgba(45,212,191,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 18;

      // === Бейдж + заголовок 1 ===
      const badge1Text = "КАРТОЧКА ТЕХНИКИ";
      ctx.font = "700 10px Arial, sans-serif";
      const b1w = ctx.measureText(badge1Text).width + 24;
      ctx.fillStyle = "rgba(45,212,191,0.12)";
      drawRoundedRect(ctx, W / 2 - b1w / 2, cy, b1w, 22, 11);
      ctx.fill();
      ctx.strokeStyle = "rgba(45,212,191,0.4)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, W / 2 - b1w / 2, cy, b1w, 22, 11);
      ctx.stroke();
      ctx.fillStyle = "#5eead4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badge1Text, W / 2, cy + 11);
      cy += 32;

      ctx.fillStyle = "#fff";
      ctx.font = "900 26px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("FAW J6P-390 + КМУ", W / 2, cy);
      cy += 38;

      // === Таблица техники ===
      const t1H = drawTable(ctx, truckRows, padding, cy, innerW);
      cy += t1H + 18;

      // === Фото ===
      const photoX = padding;
      const photoW = innerW;
      const photoH = (photoW * photo.naturalHeight) / photo.naturalWidth;
      // Рамка
      ctx.strokeStyle = "rgba(45,212,191,0.4)";
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, photoX, cy, photoW, photoH + 8, 10);
      ctx.stroke();
      // Картинка с клипом
      ctx.save();
      drawRoundedRect(ctx, photoX + 4, cy + 4, photoW - 8, photoH, 6);
      ctx.clip();
      ctx.drawImage(photo, photoX + 4, cy + 4, photoW - 8, photoH);
      ctx.restore();
      cy += photoH + 8 + 18;

      // === Бейдж водителя ===
      const badge2Text = "КАРТОЧКА ВОДИТЕЛЯ";
      ctx.font = "700 10px Arial, sans-serif";
      const b2w = ctx.measureText(badge2Text).width + 24;
      ctx.fillStyle = "rgba(45,212,191,0.12)";
      drawRoundedRect(ctx, W / 2 - b2w / 2, cy, b2w, 22, 11);
      ctx.fill();
      ctx.strokeStyle = "rgba(45,212,191,0.4)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, W / 2 - b2w / 2, cy, b2w, 22, 11);
      ctx.stroke();
      ctx.fillStyle = "#5eead4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badge2Text, W / 2, cy + 11);
      cy += 32;

      // === Таблица водителя ===
      const t2H = drawTable(ctx, driverRows, padding, cy, innerW);
      cy += t2H + 18;

      // === Контакты ===
      ctx.strokeStyle = "rgba(45,212,191,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 14;

      const contactW = (innerW - 10) / 2;
      const contactH = 50;

      // Телефон
      ctx.fillStyle = "rgba(45,212,191,0.08)";
      drawRoundedRect(ctx, padding, cy, contactW, contactH, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "500 9px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ТЕЛЕФОН", padding + 14, cy + 10);
      ctx.fillStyle = "#fff";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("+7 960 188-30-84", padding + 14, cy + 24);

      // Сайт
      const siteX = padding + contactW + 10;
      ctx.fillStyle = "rgba(245,208,96,0.08)";
      drawRoundedRect(ctx, siteX, cy, contactW, contactH, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "500 9px Arial, sans-serif";
      ctx.fillText("САЙТ", siteX + 14, cy + 10);
      ctx.fillStyle = "#f5d060";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("фаварит.рф", siteX + 14, cy + 24);

      // === Скачивание ===
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

  // Стили для таблицы предпросмотра
  const renderTable = (rows: [string, string][]) => (
    <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(45,212,191,0.3)" }}>
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i}>
            <td
              style={{
                padding: "11px 14px",
                background: "rgba(45,212,191,0.07)",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(45,212,191,0.18)" : "none",
                borderRight: "1px solid rgba(45,212,191,0.18)",
                width: "45%",
                verticalAlign: "middle",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              {label}
            </td>
            <td
              style={{
                padding: "11px 14px",
                background: "rgba(16,185,129,0.04)",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(45,212,191,0.18)" : "none",
                verticalAlign: "middle",
                fontSize: 14,
                color: "#fff",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #18181b 50%, #0a0a0a 100%)" }}>
      {/* Кнопки управления */}
      <div className="max-w-[640px] mx-auto mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleDownload}
          disabled={downloading || !photoLoaded}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-black text-sm shadow-xl disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #10b981 100%)", boxShadow: "0 8px 24px rgba(45,212,191,0.4)" }}
        >
          {downloading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Готовлю файл...
            </>
          ) : !photoLoaded ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              {photoError ? "Ошибка загрузки фото" : "Загружаю фото..."}
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white/80 text-sm border border-white/15 hover:bg-white/5"
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
      </div>

      {/* Предпросмотр карточки */}
      <div ref={previewRef} className="max-w-[640px] mx-auto" style={{ background: "#0a0a0a", border: "2px solid rgba(45,212,191,0.5)", borderRadius: 16, padding: 28, fontFamily: "Arial, sans-serif" }}>
        {/* Шапка */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(45,212,191,0.25)" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 4, color: "#5eead4", marginBottom: 4 }}>ООО «ФАВОРИТ»</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>аренда манипуляторов · Нижний Новгород</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Сайт</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5d060" }}>фаварит.рф</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#5eead4", marginBottom: 12 }}>
            Карточка техники
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0 }}>FAW J6P-390 + КМУ</h1>
        </div>

        <div style={{ marginBottom: 20 }}>{renderTable(truckRows)}</div>

        <div style={{ marginBottom: 20, borderRadius: 10, border: "2px solid rgba(45,212,191,0.4)", padding: 4, background: "#0a0a0a" }}>
          {photoLoaded ? (
            <img src={TRUCK_PHOTO_URL} alt="FAW J6P-390" style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }} />
          ) : (
            <div style={{ width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
              {photoError ? "Не удалось загрузить фото" : "Загрузка фото…"}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#5eead4" }}>
            Карточка водителя
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>{renderTable(driverRows)}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(45,212,191,0.25)" }}>
          <div style={{ padding: 10, borderRadius: 10, background: "rgba(45,212,191,0.07)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>Телефон</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 4 }}>+7 960 188-30-84</div>
          </div>
          <div style={{ padding: 10, borderRadius: 10, background: "rgba(245,208,96,0.07)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>Сайт</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5d060", marginTop: 4 }}>фаварит.рф</div>
          </div>
        </div>
      </div>

      <p className="max-w-[640px] mx-auto mt-4 text-center text-xs text-white/40">
        Карточка техники в фирменном стиле · отправляйте клиентам в WhatsApp / Telegram
      </p>
    </div>
  );
};

export default TruckCard;
