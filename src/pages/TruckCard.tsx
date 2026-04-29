import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import Icon from "@/components/ui/icon";

const truck = {
  photo: "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/9a8c51fb-cb86-4fcc-b454-3abff0f7a6c9.jpg",
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

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.98,
        backgroundColor: "#ffffff",
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

  return (
    <div className="min-h-screen bg-zinc-100 py-6 px-4">
      <div className="max-w-[600px] mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-lg disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #0d9488 100%)" }}
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-zinc-700 text-sm bg-white border border-zinc-200 hover:bg-zinc-50"
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
      </div>

      <div ref={cardRef} className="max-w-[600px] mx-auto bg-white p-5 sm:p-7" style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Заголовок 1 */}
        <h1 className="text-center font-black text-2xl sm:text-3xl tracking-wide mb-4 text-zinc-800" style={{ letterSpacing: "0.05em" }}>
          КАРТОЧКА МАНИПУЛЯТОРА
        </h1>

        {/* Таблица характеристик */}
        <table className="w-full border-collapse mb-6" style={{ border: "1px solid #d4d4d8" }}>
          <tbody>
            {truck.rows.map(([label, value], i) => (
              <tr key={i}>
                <td
                  className="text-sm sm:text-[15px] text-zinc-800"
                  style={{
                    border: "1px solid #d4d4d8",
                    padding: "10px 12px",
                    background: "#fdf6e3",
                    width: "45%",
                    verticalAlign: "middle",
                  }}
                >
                  {label}
                </td>
                <td
                  className="text-sm sm:text-[15px] text-zinc-800 text-center font-medium"
                  style={{
                    border: "1px solid #d4d4d8",
                    padding: "10px 12px",
                    background: "#fdf6e3",
                    verticalAlign: "middle",
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Фото машины */}
        <div className="mb-6">
          <img
            src={truck.photo}
            alt="FAW J6P-390 манипулятор"
            crossOrigin="anonymous"
            className="w-full h-auto rounded"
            style={{ display: "block" }}
          />
        </div>

        {/* Заголовок 2 */}
        <h2 className="text-center font-black text-xl sm:text-2xl tracking-wide mb-4 text-zinc-800" style={{ letterSpacing: "0.05em" }}>
          КАРТОЧКА ВОДИТЕЛЯ
        </h2>

        {/* Таблица водителя */}
        <table className="w-full border-collapse mb-3" style={{ border: "1px solid #d4d4d8" }}>
          <tbody>
            {driver.rows.map(([label, value], i) => (
              <tr key={i}>
                <td
                  className="text-sm sm:text-[15px] text-zinc-800"
                  style={{
                    border: "1px solid #d4d4d8",
                    padding: "10px 12px",
                    background: "#fdf6e3",
                    width: "45%",
                    verticalAlign: "middle",
                  }}
                >
                  {label}
                </td>
                <td
                  className="text-sm sm:text-[15px] text-zinc-800 text-center font-medium"
                  style={{
                    border: "1px solid #d4d4d8",
                    padding: "10px 12px",
                    background: "#fdf6e3",
                    verticalAlign: "middle",
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Подвал */}
        <p className="text-center text-xs text-zinc-500 mt-5 pt-3 border-t border-zinc-200">
          ООО «ФАВОРИТ» · фаварит.рф · +7 960 188-30-84
        </p>
      </div>
    </div>
  );
};

export default TruckCard;
