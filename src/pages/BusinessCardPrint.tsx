import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Icon from "@/components/ui/icon";

const TRUCK_BG =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/73b61b9b-fb51-49fc-9c20-38a29cdb7c04.jpg";

const LOGO =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp";

const BusinessCardPrint = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    document.title = "Визитка для печати 90×50 мм — ООО «Фаворит»";
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    setDownloadError("");
    try {
      // Высокое разрешение — для печати и для красоты в галерее телефона
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      // Если устройство поддерживает Web Share API + файлы — открываем нативное меню «Сохранить в фото»
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "favorit-vizitka.png", { type: "image/png" });

        const navAny = navigator as Navigator & {
          canShare?: (data: { files: File[] }) => boolean;
          share?: (data: { files?: File[]; title?: string; text?: string }) => Promise<void>;
        };

        if (navAny.canShare && navAny.share && navAny.canShare({ files: [file] })) {
          await navAny.share({
            files: [file],
            title: "Визитка ООО Фаворит",
            text: "Аренда манипулятора +7 (960) 188-30-84",
          });
          setDownloading(false);
          return;
        }
      } catch {
        // ничего страшного — упадём на обычную загрузку файлом
      }

      // Обычное скачивание (десктоп и старые мобильные браузеры)
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "favorit-vizitka.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Не удалось сохранить";
      setDownloadError(msg);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* Стили только для печати: A4, без полей браузера, ровно по визитке */}
      <style>{`
        @page {
          size: 100mm 60mm;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
          }
          .print-hide { display: none !important; }
          .print-card-wrapper {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            min-height: auto !important;
          }
          .print-card {
            box-shadow: none !important;
            margin: 5mm !important;
          }
        }
      `}</style>

      <div
        className="print-card-wrapper min-h-screen flex flex-col items-center justify-center gap-6 py-8 px-4"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232,168,32,0.1) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)",
        }}
      >
        {/* Панель управления (только на экране) */}
        <div className="print-hide w-full max-w-2xl flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href="/vizitka"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-accent/40 bg-white/[0.04] text-accent text-sm font-bold hover:bg-accent/10 transition-all"
            >
              <Icon name="ArrowLeft" size={14} />
              К онлайн-визитке
            </a>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-black text-sm shadow-xl shadow-amber-500/40 active:scale-[0.98] transition-transform disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              {downloading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Готовлю картинку…
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} />
                  Скачать на телефон
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-white/[0.04] text-accent text-sm font-bold hover:bg-accent/10 transition-all"
            >
              <Icon name="Printer" size={16} />
              Распечатать
            </button>
          </div>

          {downloadError && (
            <p className="text-red-400 text-xs text-center">
              Ошибка: {downloadError}. Попробуйте ещё раз или сделайте скриншот.
            </p>
          )}

          <p className="text-white/55 text-[11px] text-center leading-snug">
            На iPhone и Android откроется меню «Поделиться» — выберите «Сохранить в фото».
            На компьютере картинка сохранится в папку «Загрузки».
          </p>
        </div>

        {/* Инструкция для типографии (только на экране) */}
        <div className="print-hide w-full max-w-2xl rounded-2xl border border-accent/20 bg-white/[0.03] p-4 text-xs sm:text-sm text-white/75 leading-relaxed">
          <div className="font-black text-accent mb-1.5 uppercase tracking-wider text-xs">
            Для печати в типографии
          </div>
          <ul className="space-y-1 text-white/70">
            <li>• <span className="text-white font-bold">Размер визитки:</span> 90×50 мм (стандарт)</li>
            <li>• <span className="text-white font-bold">Размер макета с вылетами:</span> 94×54 мм</li>
            <li>• <span className="text-white font-bold">Чёрные уголки</span> — обрезные метки. Бумага режется по ним.</li>
            <li>• Бумага: матовый картон 300 г/м² или мелованный 350 г/м²</li>
            <li>• Печать: полноцветная CMYK 4+0 (с одной стороны) или 4+4 (двусторонняя)</li>
          </ul>
        </div>

        {/* САМА ВИЗИТКА — точные размеры в миллиметрах */}
        <div
          ref={cardRef}
          className="print-card relative bg-white"
          style={{
            width: "94mm",
            height: "54mm",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Обрезные метки по углам */}
          <CutMark className="absolute top-0 left-0" rotation={0} />
          <CutMark className="absolute top-0 right-0" rotation={90} />
          <CutMark className="absolute bottom-0 right-0" rotation={180} />
          <CutMark className="absolute bottom-0 left-0" rotation={270} />

          {/* Полезная зона визитки 90×50 мм — отступ 2 мм со всех сторон (вылет) */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: "2mm",
              left: "2mm",
              right: "2mm",
              bottom: "2mm",
            }}
          >
            {/* Фоновое фото с манипулятором */}
            <img
              src={TRUCK_BG}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Тёмный градиент поверх фото для читаемости */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Золотая тонкая рамка */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                border: "0.5mm solid",
                borderImage:
                  "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%) 1",
              }}
            />

            {/* Верхний бейдж */}
            <div className="absolute top-[2mm] left-1/2 -translate-x-1/2">
              <div
                className="px-[2mm] py-[0.5mm] rounded-full text-[6pt] font-black uppercase tracking-widest text-black whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  letterSpacing: "0.12em",
                }}
              >
                АРЕНДА МАНИПУЛЯТОРОВ · 24/7
              </div>
            </div>

            {/* Телефон — главный акцент */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{ top: "13mm" }}
            >
              <div
                className="text-white font-black leading-none whitespace-nowrap"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "20pt",
                  textShadow:
                    "0 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(232,168,32,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                +7 (960) 188-30-84
              </div>
              <div
                className="text-accent font-black uppercase mt-[1mm]"
                style={{
                  fontSize: "5.5pt",
                  letterSpacing: "0.3em",
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
              >
                ЗВОНИТЕ ПРЯМО СЕЙЧАС
              </div>
            </div>

            {/* Нижняя плашка с логотипом и услугой */}
            <div className="absolute bottom-[2mm] left-[2mm] right-[2mm] flex items-end justify-between gap-[2mm]">
              <div>
                <div
                  className="text-white font-black uppercase leading-tight"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9pt",
                    letterSpacing: "0.06em",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  ООО «Фаворит»
                </div>
                <div
                  className="text-white/85 font-bold"
                  style={{
                    fontSize: "5.5pt",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    marginTop: "0.5mm",
                  }}
                >
                  Манипулятор · Стрела 20 м · 8 т
                </div>
                <div
                  className="text-accent font-bold mt-[0.5mm]"
                  style={{
                    fontSize: "5pt",
                    letterSpacing: "0.08em",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  ФАВАРИТ.РФ · НИЖНИЙ НОВГОРОД
                </div>
              </div>

              {/* Логотип компании */}
              <div
                className="flex items-center justify-center rounded-md"
                style={{
                  width: "11mm",
                  height: "11mm",
                  background:
                    "linear-gradient(135deg, rgba(245,208,96,0.95) 0%, rgba(232,168,32,0.9) 50%, rgba(200,133,10,0.95) 100%)",
                  padding: "1mm",
                }}
              >
                <img
                  src={LOGO}
                  alt="ООО Фаворит"
                  className="w-full h-full object-contain"
                  style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Размерная подпись (только на экране) */}
        <div className="print-hide text-white/55 text-xs text-center">
          Размер визитки: <span className="text-accent font-bold">90×50 мм</span> ·
          Макет с вылетами: <span className="text-accent font-bold">94×54 мм</span>
        </div>

        {/* Вторая визитка с асфальтированием (только на экране — для предпросмотра) */}
        <div className="print-hide w-full max-w-2xl pt-2">
          <div className="text-center text-white/70 text-xs mb-3">
            Хочешь вторую визитку для асфальтирования?
            Сделаю отдельную страницу <span className="text-accent">/vizitka/print-asfalt</span>
          </div>
        </div>
      </div>
    </>
  );
};

interface CutMarkProps {
  className?: string;
  rotation: number;
}

const CutMark = ({ className = "", rotation }: CutMarkProps) => (
  <div
    className={className}
    style={{
      width: "6mm",
      height: "6mm",
      transform: `rotate(${rotation}deg)`,
      pointerEvents: "none",
    }}
  >
    {/* Г-образная метка реза в углу */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "6mm",
        height: "0.15mm",
        background: "#000",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "0.15mm",
        height: "6mm",
        background: "#000",
      }}
    />
  </div>
);

export default BusinessCardPrint;