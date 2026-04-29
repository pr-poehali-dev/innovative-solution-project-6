import { useRef, useState, useEffect } from "react";
import { toJpeg } from "html-to-image";
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
  const cardRef = useRef<HTMLDivElement>(null);
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
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.98,
        backgroundColor: "#0a0a0a",
        pixelRatio: 2,
        cacheBust: true,
      });
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

  const renderTable = (rows: string[][]) => (
    <table className="w-full border-collapse" style={{ borderRadius: 12, overflow: "hidden" }}>
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
                color: "rgba(255,255,255,0.6)",
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

      {/* Карточка с пульсирующей подсветкой */}
      <div className="max-w-[640px] mx-auto relative">
        <div
          className="emerald-pulse absolute -inset-1 rounded-2xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)" }}
        />
        <div
          className="relative rounded-2xl p-[1.5px]"
          style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.85) 0%, rgba(16,185,129,0.3) 50%, rgba(13,148,136,0.85) 100%)" }}
        >
          <div
            ref={cardRef}
            className="rounded-2xl p-5 sm:p-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #111113 50%, #0a0a0a 100%)",
              fontFamily: "Manrope, system-ui, sans-serif",
            }}
          >
            {/* Декоративное свечение в углах */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "rgba(45,212,191,0.18)", filter: "blur(60px)" }} />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "rgba(16,185,129,0.12)", filter: "blur(60px)" }} />

            {/* Шапка с логотипом */}
            <div className="relative flex items-center justify-between gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(45,212,191,0.2)" }}>
              <div>
                <div className="text-[10px] font-black tracking-[0.2em] mb-1" style={{ color: "#5eead4" }}>
                  ООО «ФАВОРИТ»
                </div>
                <div className="text-[11px] text-white/50">аренда манипуляторов · Нижний Новгород</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-white/50">Сайт</div>
                <div className="text-sm font-bold" style={{ color: "#f5d060" }}>
                  фаварит.рф
                </div>
              </div>
            </div>

            {/* Заголовок 1 */}
            <div className="relative mb-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)" }}>
                <Icon name="Truck" size={12} style={{ color: "#5eead4" }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#5eead4" }}>Карточка техники</span>
              </div>
              <h1
                className="font-black text-2xl sm:text-3xl bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #fff 0%, #5eead4 100%)", letterSpacing: "0.02em" }}
              >
                FAW J6P-390 + КМУ
              </h1>
            </div>

            {/* Таблица характеристик */}
            <div className="relative mb-5">{renderTable(truck.rows)}</div>

            {/* Фото машины */}
            <div className="relative mb-5 rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(45,212,191,0.3)", boxShadow: "0 8px 24px rgba(45,212,191,0.15)" }}>
              {photoData ? (
                <img
                  src={photoData}
                  alt="FAW J6P-390 манипулятор"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              ) : (
                <div className="w-full flex items-center justify-center text-white/40 text-sm" style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.03)" }}>
                  {photoError ? "Не удалось загрузить фото" : "Загрузка фото…"}
                </div>
              )}
            </div>

            {/* Заголовок 2 */}
            <div className="relative mb-3 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2" style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.3)" }}>
                <Icon name="UserCheck" size={12} style={{ color: "#5eead4" }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#5eead4" }}>Карточка водителя</span>
              </div>
            </div>

            {/* Таблица водителя */}
            <div className="relative mb-5">{renderTable(driver.rows)}</div>

            {/* Подвал с контактами */}
            <div className="relative pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ borderTop: "1px solid rgba(45,212,191,0.2)" }}>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: "rgba(45,212,191,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(45,212,191,0.15)", border: "1px solid rgba(45,212,191,0.4)" }}>
                  <Icon name="Phone" size={14} style={{ color: "#5eead4" }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">Телефон</div>
                  <div className="text-sm font-bold text-white">+7 960 188-30-84</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: "rgba(245,208,96,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,208,96,0.15)", border: "1px solid rgba(245,208,96,0.4)" }}>
                  <Icon name="Globe" size={14} style={{ color: "#f5d060" }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">Сайт</div>
                  <div className="text-sm font-bold" style={{ color: "#f5d060" }}>фаварит.рф</div>
                </div>
              </div>
            </div>
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
