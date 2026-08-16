import { Link } from "react-router-dom";
import SectionBadge from "@/components/ui/SectionBadge";
import Icon from "@/components/ui/icon";
import { priceRows, terms } from "./pricing/priceData";

const PricingTableSection = () => {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Прайс-лист на аренду манипулятора в Нижнем Новгороде",
    itemListElement: priceRows
      .filter((r) => r.price !== "по запросу")
      .map((r, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: r.title,
        price: r.price.replace(/[^\d]/g, ""),
        priceCurrency: "RUB",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: r.price.replace(/[^\d]/g, ""),
          priceCurrency: "RUB",
          unitCode: "HUR",
          valueAddedTaxIncluded: true,
        },
        availability: "https://schema.org/InStock",
        url: `https://фаварит.рф/tehnika/${r.slug}`,
      })),
  };

  return (
    <section id="prices" className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <script type="application/ld+json">{JSON.stringify(offerJsonLd)}</script>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-14">
          <SectionBadge>Прайс-лист 2026</SectionBadge>
          <h2 className="mt-4 text-2xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Цены на аренду техники
            </span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-white/70">
            Стоимость указана за час работы вместе с оператором и включает НДС 22%. Топливо, подача
            в черте Нижнего Новгорода и работа стропальщика уже в цене — доплат на объекте нет.
          </p>
        </div>

        {/* Таблица цен */}
        <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-accent/60 via-accent/20 to-accent/50">
          <div className="rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm sm:text-base">
                <caption className="sr-only">
                  Прайс-лист на аренду манипулятора и спецтехники в Нижнем Новгороде
                </caption>
                <thead>
                  <tr className="border-b border-accent/25 bg-accent/10">
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase text-[11px] sm:text-xs tracking-widest text-accent">
                      Техника
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase text-[11px] sm:text-xs tracking-widest text-accent">
                      Грузоподъёмность
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase text-[11px] sm:text-xs tracking-widest text-accent">
                      Вылет стрелы
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase text-[11px] sm:text-xs tracking-widest text-accent">
                      Мин. заказ
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase text-[11px] sm:text-xs tracking-widest text-accent text-right">
                      Цена с НДС
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((r) => (
                    <tr
                      key={r.slug}
                      className="border-b border-white/5 last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <Link
                          to={`/tehnika/${r.slug}`}
                          className="font-bold text-white hover:text-accent transition-colors"
                        >
                          {r.title}
                        </Link>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-white/70">{r.capacity}</td>
                      <td className="px-4 sm:px-6 py-4 text-white/70">{r.boom}</td>
                      <td className="px-4 sm:px-6 py-4 text-white/70">{r.minOrder}</td>
                      <td className="px-4 sm:px-6 py-4 text-right font-black text-accent whitespace-nowrap">
                        {r.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-5 bg-accent/5 border-t border-accent/20">
              <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">
                Точную стоимость посчитаем по вашей задаче — цена может быть ниже при заказе
                от 8 часов или на длительный срок.
              </p>
              <a
                href="tel:+79601883084"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-black transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                <Icon name="Phone" size={18} />
                Узнать цену: +7 960 188-30-84
</a>
            </div>
          </div>
        </div>

        {/* Условия работы */}
        <h3 className="mt-12 sm:mt-16 mb-6 sm:mb-8 text-center text-xl sm:text-3xl font-display font-black tracking-tight text-white">
          Условия работы и оплаты
        </h3>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl p-[1.5px] bg-gradient-to-br from-accent/50 via-accent/15 to-accent/40 h-full"
            >
              <div className="h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Icon name={t.icon} size={20} className="text-accent" />
                  </span>
                  <h4 className="font-black text-white text-base sm:text-lg leading-tight">
                    {t.title}
                  </h4>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTableSection;
