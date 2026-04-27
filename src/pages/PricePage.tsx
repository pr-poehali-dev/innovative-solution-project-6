import { useEffect } from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import Icon from "@/components/ui/icon";

const trucks = [
  { name: "ISUZU 5т + КМУ", perHour: "2 200 ₽" },
  { name: "FAW J6 + КМУ DONGYANG 1966", perHour: "3 500 ₽" },
  { name: "КАМАЗ 65115 + КМУ HANGIL", perHour: "2 800 ₽" },
  { name: "FAW + КМУ DongYang", perHour: "3 000 ₽" },
  { name: "Renault Lander + КМУ", perHour: "3 200 ₽" },
  { name: "Hyundai Gold + КМУ 8т", perHour: "3 200 ₽" },
  { name: "КАМАЗ 43118 + Kanglim вездеход", perHour: "3 500 ₽" },
  { name: "JCB 3CX", perHour: "2 400 ₽" },
  { name: "JCB 4CX", perHour: "2 700 ₽" },
];

const PricePage = () => {
  useEffect(() => {
    document.title = "Прайс-лист — ООО «Фаворит» Нижний Новгород";
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen text-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .price-page { background: white !important; color: black !important; }
          .price-page * { color: black !important; border-color: #999 !important; }
          .price-header { background: #111 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .price-header * { color: white !important; }
        }
      `}</style>

      <div className="price-page max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="price-header rounded-2xl border border-accent/30 bg-gradient-to-br from-black/60 to-background/80 backdrop-blur-sm p-5 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <BrandLogo />
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-accent/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Телефон
              </span>
              <a href="tel:+79601883084" className="text-white font-black text-lg sm:text-2xl tabular-nums">
                +7 960 188-30-84
              </a>
              <span className="text-muted-foreground text-xs sm:text-sm">
                Нижний Новгород · с 7:00 до 22:00
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
              Прайс-лист на аренду техники
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Тарифы за час работы. Стоимость километра — рассчитывается в зависимости от машины и маршрута.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="no-print inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-black shadow-lg shadow-accent/30 active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
          >
            <Icon name="Printer" size={18} />
            Печать / Сохранить PDF
          </button>
        </div>

        <div className="rounded-2xl border border-accent/20 overflow-hidden bg-black/30 backdrop-blur-sm">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-accent/15 text-accent">
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-display font-black uppercase tracking-wider text-xs sm:text-sm">
                  Техника
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-display font-black uppercase tracking-wider text-xs sm:text-sm text-center">
                  Цена / час
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-display font-black uppercase tracking-wider text-xs sm:text-sm text-center">
                  Цена / км
                </th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((t, i) => (
                <tr
                  key={t.name}
                  className={`border-t border-accent/10 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">{t.name}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center font-bold text-accent tabular-nums">
                    {t.perHour}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-muted-foreground tabular-nums">
                    —
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
          <div className="rounded-xl border border-accent/15 bg-black/20 p-4">
            <div className="font-bold text-accent mb-1 uppercase tracking-wider text-[11px]">
              Условия
            </div>
            Минимальный заказ — 4 часа. Подача техники оплачивается отдельно по тарифу за километр.
          </div>
          <div className="rounded-xl border border-accent/15 bg-black/20 p-4">
            <div className="font-bold text-accent mb-1 uppercase tracking-wider text-[11px]">
              Реквизиты
            </div>
            ООО «Фаворит» · Нижний Новгород · работаем с 2015 года
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Цены действительны на момент запроса. Точную стоимость уточняйте по телефону.
        </div>
      </div>
    </div>
  );
};

export default PricePage;