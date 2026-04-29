import { useState } from "react";
import Icon from "@/components/ui/icon";

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
  const lineH = 18;

  const rowHeights: number[] = [];
  for (const [label, value] of rows) {
    ctx.font = "500 13px Arial, sans-serif";
    const labelLines = wrapText(ctx, label, labelW - padX * 2);
    ctx.font = "700 14px Arial, sans-serif";
    const valueLines = wrapText(ctx, value, valueW - padX * 2);
    const maxLines = Math.max(labelLines.length, valueLines.length);
    rowHeights.push(maxLines * lineH + padY * 2);
  }
  const totalH = rowHeights.reduce((a, b) => a + b, 0);

  ctx.strokeStyle = "rgba(45,212,191,0.3)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.stroke();

  ctx.save();
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.clip();

  let curY = y;
  for (let i = 0; i < rows.length; i++) {
    const [label, value] = rows[i];
    const h = rowHeights[i];

    ctx.fillStyle = "rgba(45,212,191,0.07)";
    ctx.fillRect(x, curY, labelW, h);
    ctx.fillStyle = "rgba(16,185,129,0.04)";
    ctx.fillRect(x + labelW, curY, valueW, h);

    if (i < rows.length - 1) {
      ctx.strokeStyle = "rgba(45,212,191,0.18)";
      ctx.beginPath();
      ctx.moveTo(x, curY + h);
      ctx.lineTo(x + width, curY + h);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(45,212,191,0.18)";
    ctx.beginPath();
    ctx.moveTo(x + labelW, curY);
    ctx.lineTo(x + labelW, curY + h);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "500 13px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const labelLines = wrapText(ctx, label, labelW - padX * 2);
    labelLines.forEach((ln, j) => {
      ctx.fillText(ln, x + padX, curY + padY + j * lineH);
    });

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 14px Arial, sans-serif";
    ctx.textAlign = "center";
    const valueLines = wrapText(ctx, value, valueW - padX * 2);
    valueLines.forEach((ln, j) => {
      ctx.fillText(ln, x + labelW + valueW / 2, curY + padY + j * lineH);
    });

    curY += h;
  }
  ctx.restore();
  return totalH;
};

const TruckCard = () => {
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

      // Шапка
      ctx.fillStyle = "#5eead4";
      ctx.font = "900 11px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ООО «ФАВОРИТ»", padding, cy);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("аренда манипуляторов · Нижний Новгород", padding, cy + 18);

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "right";
      ctx.font = "400 11px Arial, sans-serif";
      ctx.fillText("Сайт", W - padding, cy);
      ctx.fillStyle = "#f5d060";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("фаварит.рф", W - padding, cy + 16);

      cy += 44;
      ctx.strokeStyle = "rgba(45,212,191,0.25)";
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

      // Таблица техники
      const t1H = drawTable(ctx, truckRows, padding, cy, innerW);
      cy += t1H + 18;

      // Бейдж водителя
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

      // Таблица водителя
      const t2H = drawTable(ctx, driverRows, padding, cy, innerW);
      cy += t2H + 18;

      // Контакты
      ctx.strokeStyle = "rgba(45,212,191,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
      cy += 14;

      const colW = (innerW - 10) / 2;
      const cardH = 56;

      // Директор
      ctx.fillStyle = "rgba(245,208,96,0.07)";
      drawRoundedRect(ctx, padding, cy, colW, cardH, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(245,208,96,0.3)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, padding, cy, colW, cardH, 10);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "700 9px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("ДИРЕКТОР", padding + 14, cy + 10);
      ctx.fillStyle = "#f5d060";
      ctx.font = "700 16px Arial, sans-serif";
      ctx.fillText("+7 960 169-09-90", padding + 14, cy + 26);

      // Диспетчер
      const col2X = padding + colW + 10;
      ctx.fillStyle = "rgba(45,212,191,0.07)";
      drawRoundedRect(ctx, col2X, cy, colW, cardH, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(45,212,191,0.3)";
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, col2X, cy, colW, cardH, 10);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "700 9px Arial, sans-serif";
      ctx.fillText("ДИСПЕТЧЕР", col2X + 14, cy + 10);
      ctx.fillStyle = "#fff";
      ctx.font = "700 16px Arial, sans-serif";
      ctx.fillText("+7 960 188-30-84", col2X + 14, cy + 26);

      cy += cardH + 10;

      // Сайт
      ctx.fillStyle = "rgba(45,212,191,0.07)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.fill();
      ctx.strokeStyle = "rgba(45,212,191,0.3)";
      drawRoundedRect(ctx, padding, cy, innerW, 36, 10);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "500 11px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Подробнее на сайте:", padding + 14, cy + 12);
      ctx.fillStyle = "#f5d060";
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
      <div className="max-w-[640px] mx-auto mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-black text-sm shadow-xl disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #10b981 100%)", boxShadow: "0 8px 24px rgba(45,212,191,0.4)" }}
        >
          {downloading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Готовлю файл...
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

      {/* Предпросмотр */}
      <div className="max-w-[640px] mx-auto" style={{ background: "#0a0a0a", border: "2px solid rgba(45,212,191,0.5)", borderRadius: 16, padding: 28, fontFamily: "Arial, sans-serif" }}>
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

        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#5eead4" }}>
            Карточка водителя
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>{renderTable(driverRows)}</div>

        {/* Контакты директора и диспетчера */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(45,212,191,0.25)", marginBottom: 10 }}>
          <div style={{ padding: 12, borderRadius: 10, background: "rgba(245,208,96,0.07)", border: "1px solid rgba(245,208,96,0.3)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Директор</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f5d060", marginTop: 6 }}>+7 960 169-09-90</div>
          </div>
          <div style={{ padding: 12, borderRadius: 10, background: "rgba(45,212,191,0.07)", border: "1px solid rgba(45,212,191,0.3)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Диспетчер</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginTop: 6 }}>+7 960 188-30-84</div>
          </div>
        </div>

        <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(45,212,191,0.07)", border: "1px solid rgba(45,212,191,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Подробнее на сайте:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#f5d060" }}>фаварит.рф</span>
        </div>
      </div>

      <p className="max-w-[640px] mx-auto mt-4 text-center text-xs text-white/40">
        Карточка техники в фирменном стиле · отправляйте клиентам в WhatsApp / Telegram
      </p>
    </div>
  );
};

export default TruckCard;
