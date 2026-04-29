import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Icon from "@/components/ui/icon";

const TRUCK_PHOTO_URL = "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/a2338211-12bc-4ec4-8d21-b22ac64d6d1b.jpg";

const truck = {
  photo: TRUCK_PHOTO_URL,
  rows: [
    ["Машина (марка ТС)", "FAW J6P-390"],
    ["Гос. номер", "А479ХО252"],
    ["Колёсная формула", "6×4"],
    ["Стрела", "Грузоподъёмность: 8т, длина выстрела 20м"],
    ["Борт", "Грузоподъёмность: 35т, длина 8м"],
    ["Высота платформы", "1,4 м"],
    ["Доп. оборудование", "Монтажная Люлька"],
  ],
};

const driver = {
  rows: [
    ["ФИО", "Никифоров Александр Николаевич"],
    ["Год рождения", "07.02.1988"],
    ["Паспорт", "2413 708777"],
    ["В/у", "99 39 140170"],
  ],
};

const TruckCard = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [photoData, setPhotoData] = useState<string>("");
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    fetch(TRUCK_PHOTO_URL, { mode: "cors" })
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setPhotoData(reader.result as string);
        reader.onerror = () => setPhotoError(true);
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        setPhotoData(TRUCK_PHOTO_URL);
        setPhotoError(true);
      });
  }, []);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    if (!photoData) {
      alert("Подождите, фото ещё загружается...");
      return;
    }
    setDownloading(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
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

  // Стили для таблицы — простые, без blur и градиентов на тексте
  const renderTable = (rows: string[][]) => (
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

  // Карточка для рендера в JPG — без blur, без пульсаций, без градиентного текста
  const renderCard = () => (
    <div
      style={{
        width: 640,
        background: "#0a0a0a",
        border: "2px solid rgba(45,212,191,0.5)",
        borderRadius: 16,
        padding: 28,
        fontFamily: "Manrope, Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Шапка */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(45,212,191,0.25)" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 4, color: "#5eead4", marginBottom: 4 }}>
            ООО «ФАВОРИТ»
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>аренда манипуляторов · Нижний Новгород</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Сайт</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#f5d060" }}>фаварит.рф</div>
        </div>
      </div>

      {/* Бейдж + заголовок */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(45,212,191,0.12)",
            border: "1px solid rgba(45,212,191,0.4)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5eead4",
            marginBottom: 12,
          }}
        >
          Карточка техники
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.02em" }}>
          FAW J6P-390 + КМУ
        </h1>
      </div>

      {/* Таблица техники */}
      <div style={{ marginBottom: 20 }}>{renderTable(truck.rows)}</div>

      {/* Фото */}
      <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", border: "2px solid rgba(45,212,191,0.4)" }}>
        {photoData ? (
          <img src={photoData} alt="FAW J6P-390" style={{ width: "100%", height: "auto", display: "block" }} />
        ) : (
          <div style={{ width: "100%", aspectRatio: "16/9", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            {photoError ? "Не удалось загрузить фото" : "Загрузка фото…"}
          </div>
        )}
      </div>

      {/* Бейдж водителя */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(45,212,191,0.12)",
            border: "1px solid rgba(45,212,191,0.4)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5eead4",
          }}
        >
          Карточка водителя
        </div>
      </div>

      {/* Таблица водителя */}
      <div style={{ marginBottom: 20 }}>{renderTable(driver.rows)}</div>

      {/* Контакты */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(45,212,191,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, background: "rgba(45,212,191,0.07)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(45,212,191,0.18)", border: "1px solid rgba(45,212,191,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
            ☎
          </div>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>Телефон</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>+7 960 188-30-84</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, background: "rgba(245,208,96,0.07)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(245,208,96,0.18)", border: "1px solid rgba(245,208,96,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
            🌐
          </div>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>Сайт</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5d060" }}>фаварит.рф</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #18181b 50%, #0a0a0a 100%)" }}>
      {/* Кнопки управления */}
      <div className="max-w-[640px] mx-auto mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleDownload}
          disabled={downloading || !photoData}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-black text-sm shadow-xl disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #10b981 100%)", boxShadow: "0 8px 24px rgba(45,212,191,0.4)" }}
        >
          {downloading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Готовлю файл...
            </>
          ) : !photoData ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Загружаю фото...
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

      {/* Видимая карточка для просмотра */}
      <div className="max-w-[640px] mx-auto">
        <div ref={captureRef}>{renderCard()}</div>
      </div>

      <p className="max-w-[640px] mx-auto mt-4 text-center text-xs text-white/40">
        Карточка техники в фирменном стиле · отправляйте клиентам в WhatsApp / Telegram
      </p>
    </div>
  );
};

export default TruckCard;
