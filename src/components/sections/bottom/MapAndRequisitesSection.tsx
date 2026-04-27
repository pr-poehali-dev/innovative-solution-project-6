import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import SectionBadge from "@/components/ui/SectionBadge";
import DocumentsBlock from "@/components/ui/DocumentsBlock";

interface MapAndRequisitesSectionProps {
  copied: boolean;
  onCopyRequisites: () => void;
  onDownloadPdf: () => void;
  onOpenEmailModal: () => void;
}

const requisitesItems = [
  { icon: "Building2", label: "Полное название", value: "Общество с ограниченной ответственностью «ФАВОРИТ»", full: true },
  { icon: "Hash", label: "ИНН / КПП", value: "5250077990 / 525001001" },
  { icon: "FileBadge", label: "ОГРН", value: "1235200013531" },
  { icon: "MapPin", label: "Юридический адрес", value: "607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13", full: true },
  { icon: "CreditCard", label: "Расчётный счёт", value: "40702810316020000009" },
  { icon: "Landmark", label: "Банк", value: "АО «АЛЬФА-БАНК»" },
  { icon: "Wallet", label: "Корр. счёт", value: "30101810200000000593" },
  { icon: "Fingerprint", label: "БИК", value: "044525593" },
];

const MapAndRequisitesSection = ({
  copied,
  onCopyRequisites,
  onDownloadPdf,
  onOpenEmailModal,
}: MapAndRequisitesSectionProps) => {
  return (
    <>
      {/* Map Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <div className="flex justify-center mb-4">
              <SectionBadge>Наш адрес</SectionBadge>
            </div>
            <div className="flex flex-col items-center gap-3 mt-3">
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
                <img
                  src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp"
                  alt="Фаворит герб"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl object-cover logo-glow"
                />
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                  <h2
                    className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 40%, #fdeea0 60%, #c8850a 80%, #f0c040 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Как нас найти
                  </h2>
                  <p
                    className="text-xs sm:text-sm tracking-widest uppercase"
                    style={{ color: "#a07010", letterSpacing: "0.2em" }}
                  >
                    Аренда манипуляторов от компании Фаворит
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Блок с контактами */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col gap-2 sm:col-span-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-semibold">Работаем без выходных</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-xl text-white">
                Работаем по всему Нижнему Новгороду и области
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                📍 Нижний Новгород, Шуваловский проезд, 7
              </p>
              <p className="text-muted-foreground text-xs">Выезжаем по всему городу и области</p>
            </div>
            <div className="flex flex-col sm:flex-col gap-2 sm:col-span-2 sm:justify-end">
              <PhoneButton size="lg" className="rounded-2xl w-full" />
              <a
                href="tel:+79601690990"
                className="inline-flex items-center justify-center gap-4 px-10 sm:px-14 py-5 sm:py-6 border rounded-2xl font-bold text-lg sm:text-2xl md:text-3xl w-full transition-all"
                style={{ color: "#e8a820", borderColor: "#e8a820", background: "rgba(232,168,32,0.08)", fontFamily: "'Cinzel', serif", animation: "goldPulse 1.2s ease-in-out infinite" }}
              >
                📞 +7 960 169-09-90
              </a>
            </div>
          </div>

          {/* Реквизиты */}
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 p-5 sm:p-8 mb-5 shadow-2xl" style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(232,168,32,0.06) 100%)" }}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/40 flex items-center justify-center shadow-lg">
                  <Icon name="BadgeCheck" size={22} className="text-accent" />
                </div>
                <div>
                  <div className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Официальные реквизиты</div>
                  <div
                    className="text-lg sm:text-2xl font-black"
                    style={{
                      background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #fdeea0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ООО «ФАВОРИТ»
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onCopyRequisites}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-xs font-semibold text-white"
                >
                  <Icon name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-green-400" : "text-accent"} />
                  {copied ? "Скопировано" : "Скопировать"}
                </button>
                <button
                  onClick={onDownloadPdf}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-xs font-semibold text-white"
                >
                  <Icon name="Download" size={14} className="text-accent" />
                  PDF
                </button>
                <button
                  onClick={onOpenEmailModal}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-xs font-semibold text-white"
                >
                  <Icon name="Mail" size={14} className="text-accent" />
                  На email
                </button>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requisitesItems.map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 transition-all ${item.full ? "sm:col-span-2" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon name={item.icon} size={16} className="text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold text-sm sm:text-base break-words">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Документы для клиентов */}
            <div className="relative mt-5 pt-5 border-t border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="FileDown" size={14} className="text-accent" />
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-widest" style={{ color: "#e8a820" }}>
                  Документы для клиентов
                </h3>
              </div>
              <DocumentsBlock />
            </div>

          </div>

          {/* Карта */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ minHeight: "300px", height: "300px" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad4a56098b0cf87fda42b842d643c95a74c726e9616eafe64e9ea35dc809ded31&lang=ru_RU&scroll=true"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Карта — ООО Фаворит"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Блок с кнопкой отзыва — под картой */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-accent/30 p-5 sm:p-6 mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(232,168,32,0.08) 100%)" }}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

            <div className="relative flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center flex-shrink-0">
                <Icon name="Star" size={22} className="text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Нам важно ваше мнение</div>
                <div className="text-white font-bold text-base sm:text-lg leading-tight">Поделитесь опытом работы с нами</div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-snug mt-1 hidden sm:block">
                  Оставьте отзыв на Яндекс.Картах — это помогает другим клиентам сделать правильный выбор.
                </p>
              </div>
            </div>

            <a
              href="https://yandex.ru/maps/org/195468245032/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all w-full sm:w-auto flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)", color: "#1a1a1a" }}
            >
              <Icon name="Star" size={16} />
              Оставить отзыв на Яндекс.Картах
            </a>
          </div>
        </div>
      </section>

    </>
  );
};

export default MapAndRequisitesSection;