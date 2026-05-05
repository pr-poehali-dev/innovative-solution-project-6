export const drawRoundedRect = (
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

export const wrapText = (
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

export const drawTable = (
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

  ctx.save();
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.clip();

  let curY = y;
  for (let i = 0; i < rows.length; i++) {
    const [label, value] = rows[i];
    const h = rowHeights[i];

    ctx.fillStyle = "rgba(45,212,191,0.18)";
    ctx.fillRect(x, curY, labelW, h);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(x + labelW, curY, valueW, h);

    if (i < rows.length - 1) {
      ctx.strokeStyle = "rgba(13,148,136,0.35)";
      ctx.beginPath();
      ctx.moveTo(x, curY + h);
      ctx.lineTo(x + width, curY + h);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(13,148,136,0.35)";
    ctx.beginPath();
    ctx.moveTo(x + labelW, curY);
    ctx.lineTo(x + labelW, curY + h);
    ctx.stroke();

    ctx.fillStyle = "#0f766e";
    ctx.font = "700 13px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const labelLines = wrapText(ctx, label, labelW - padX * 2);
    labelLines.forEach((ln, j) => {
      ctx.fillText(ln, x + padX, curY + padY + j * lineH);
    });

    ctx.fillStyle = "#1f2937";
    ctx.font = "700 14px Arial, sans-serif";
    ctx.textAlign = "center";
    const valueLines = wrapText(ctx, value, valueW - padX * 2);
    valueLines.forEach((ln, j) => {
      ctx.fillText(ln, x + labelW + valueW / 2, curY + padY + j * lineH);
    });

    curY += h;
  }
  ctx.restore();

  // Внешняя обводка
  ctx.strokeStyle = "rgba(13,148,136,0.45)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, x, y, width, totalH, 10);
  ctx.stroke();

  return totalH;
};
