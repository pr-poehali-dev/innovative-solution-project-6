import { lazy, useState } from "react";
import Icon from "@/components/ui/icon";
import SectionBadge from "@/components/ui/SectionBadge";
import PhoneButton from "@/components/ui/PhoneButton";
import BrandLogo from "@/components/ui/BrandLogo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CallbackModal from "@/components/ui/CallbackModal";
import LazySection from "@/components/LazySection";

const SiteFooter = lazy(() => import("@/components/sections/SiteFooter"));

const YANDEX_PROFILE_URL = "https://yandex.ru/profile/-/CPGZ78ll";
const YANDEX_REVIEW_URL = "https://yandex.ru/profile/-/CPGZ78ll?add-review=true";

const ReviewsPage = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const title = "Отзывы клиентов об ООО Фаворит — аренда манипуляторов в Нижнем Новгороде";
  const description =
    "Реальные отзывы клиентов ООО Фаворит на Яндекс.Картах. Аренда манипуляторов в Нижнем Новгороде — оценка 5.0, более 6 отзывов от проверенных пользователей.";

  return (
    <div className="min-h-screen bg-background">
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href="https://фаварит.рф/otzyvy" />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex justify-between items-center">
          <BrandLogo />
          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm font-semibold text-white"
            >
              <Icon name="MessageCircle" size={14} className="text-accent" />
              Перезвоните мне
            </button>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-full border border-accent/40 bg-accent/5"
              aria-label="Заказать обратный звонок"
            >
              <Icon name="MessageCircle" size={18} className="text-accent" />
            </button>
            <PhoneButton size="sm" className="hidden sm:inline-flex" />
            <PhoneButton iconOnly className="flex sm:hidden" />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Отзывы" }]} />

          <div className="flex justify-start mb-4 mt-2">
            <SectionBadge>Отзывы клиентов</SectionBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Что говорят о нас клиенты
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            Настоящие отзывы от реальных заказчиков на Яндекс.Картах — без фильтрации и редактирования. Каждый отзыв оставлен после выполненной работы.
          </p>

          {/* Рейтинг — крупная карточка */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-7 rounded-2xl border border-accent/30 bg-accent/5">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="Star" size={26} className="text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-black text-white tabular-nums">5.0</span>
                <span className="text-muted-foreground text-sm">из 5</span>
              </div>
            </div>
            <div className="h-px w-full sm:w-px sm:h-14 bg-accent/20" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-white font-bold text-lg">6+ отзывов</span>
              <span className="text-muted-foreground text-sm">на Яндекс.Картах</span>
            </div>
            <div className="h-px w-full sm:w-px sm:h-14 bg-accent/20" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-white font-bold text-lg">Проверенные</span>
              <span className="text-muted-foreground text-sm">только реальные клиенты</span>
            </div>
          </div>
        </div>
      </section>

      {/* ВИДЖЕТ ЯНДЕКС.КАРТ С ОТЗЫВАМИ */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-accent/25 bg-card/40 shadow-2xl">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-accent/20 bg-black/30">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm sm:text-base">Отзывы на Яндекс.Картах</div>
                <div className="text-muted-foreground text-xs">ООО Фаворит · Нижний Новгород</div>
              </div>
              <a
                href={YANDEX_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-accent text-xs font-semibold hover:underline"
              >
                Открыть в Яндексе
                <Icon name="ExternalLink" size={12} />
              </a>
            </div>

            <iframe
              src="https://yandex.ru/maps-reviews-widget/-/CPGZ78ll?comments"
              title="Отзывы об ООО Фаворит на Яндекс.Картах"
              className="w-full bg-white"
              style={{ height: 800, border: 0 }}
              loading="lazy"
            />
          </div>

          <p className="text-center text-muted-foreground text-xs mt-4">
            Виджет автоматически обновляется при появлении новых отзывов на Яндекс.Картах
          </p>
        </div>
      </section>

      {/* БЛОК «ОСТАВИТЬ ОТЗЫВ» */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card/40 to-transparent p-6 sm:p-10">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon name="Heart" size={12} />
                  Для наших клиентов
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white mb-3">
                  Работали с нами? <span className="text-accent">Оставьте отзыв!</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
                  Ваш отзыв на Яндекс.Картах — это главная награда для нашей команды. Он помогает другим клиентам сделать правильный выбор, а нам — стать ещё лучше.
                </p>

                <ul className="space-y-2 text-sm text-white/80 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>Займёт не больше 1 минуты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>Нужен только аккаунт Яндекса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>После отзыва — <span className="text-accent font-semibold">скидка 5% на следующий заказ</span></span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <a
                  href={YANDEX_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform min-w-[260px]"
                  style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
                >
                  <Icon name="Star" size={20} className="text-black fill-black" />
                  <span className="text-black font-black text-base sm:text-lg">Оставить отзыв</span>
                  <Icon name="ArrowRight" size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={YANDEX_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 transition-colors text-white font-semibold text-sm"
                >
                  <Icon name="MapPin" size={16} className="text-accent" />
                  Посмотреть на Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR-КОД ДЛЯ ВОДИТЕЛЕЙ И МЕНЕДЖЕРОВ */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-accent/25 bg-card/40 p-6 sm:p-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
                <Icon name="QrCode" size={12} />
                Для водителей и менеджеров
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white mb-3">
              QR-код для быстрого сбора отзывов
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
              Распечатайте этот QR-код и положите в каждую машину. После выполнения работы показывайте клиенту — он сканирует камерой телефона и сразу попадает на форму отзыва. Без диктовки ссылок, без поиска в интернете.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center">
              {/* QR-код */}
              <div className="mx-auto md:mx-0 flex flex-col items-center gap-3">
                <div className="relative p-5 bg-white rounded-2xl shadow-2xl">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(YANDEX_REVIEW_URL)}&margin=0&ecc=M`}
                    alt="QR-код для отзыва на Яндекс.Картах"
                    width="280"
                    height="280"
                    className="block w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg border-2 border-accent/30">
                      <Icon name="Star" size={28} className="text-accent fill-accent" />
                    </div>
                  </div>
                </div>

                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(YANDEX_REVIEW_URL)}&margin=2&ecc=M&format=png`}
                  download="QR-otzyv-favorit.png"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 transition-colors text-accent font-semibold text-sm"
                >
                  <Icon name="Download" size={16} />
                  Скачать QR для печати
                </a>
              </div>

              {/* Инструкция */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="ListChecks" size={20} className="text-accent" />
                  Как пользоваться
                </h3>

                <ol className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 text-accent font-black text-sm flex items-center justify-center flex-shrink-0">1</span>
                    <div>
                      <div className="text-white font-semibold text-sm">Скачайте QR-код</div>
                      <div className="text-muted-foreground text-xs mt-0.5">Кнопка слева — PNG в высоком качестве для печати</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 text-accent font-black text-sm flex items-center justify-center flex-shrink-0">2</span>
                    <div>
                      <div className="text-white font-semibold text-sm">Распечатайте в формате А5 или А6</div>
                      <div className="text-muted-foreground text-xs mt-0.5">Заламинируйте, чтобы не боялся дождя и грязи</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 text-accent font-black text-sm flex items-center justify-center flex-shrink-0">3</span>
                    <div>
                      <div className="text-white font-semibold text-sm">Положите в каждую машину</div>
                      <div className="text-muted-foreground text-xs mt-0.5">В папку с документами или на приборную панель</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 text-accent font-black text-sm flex items-center justify-center flex-shrink-0">4</span>
                    <div>
                      <div className="text-white font-semibold text-sm">Показывайте клиенту после работы</div>
                      <div className="text-muted-foreground text-xs mt-0.5">«Наведите камеру — оставьте отзыв за минуту, будет скидка 5% на следующий заказ»</div>
                    </div>
                  </li>
                </ol>

                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Icon name="Lightbulb" size={14} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="text-accent font-semibold">Совет:</span> клиент сканирует QR → сразу попадает в форму отзыва на Яндекс.Картах. Не нужно диктовать адрес, искать компанию, регистрироваться — всё в 2 касания.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA СНИЗУ — ЗВОНОК */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
              <Icon name="Phone" size={26} className="text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Хотите стать нашим клиентом?</h3>
              <p className="text-muted-foreground text-sm">
                Звоните — подберём технику и рассчитаем стоимость за 5 минут.
              </p>
            </div>
            <PhoneButton size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      <LazySection>
        <SiteFooter />
      </LazySection>
    </div>
  );
};

export default ReviewsPage;