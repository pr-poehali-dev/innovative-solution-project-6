import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import BrandLogo from "@/components/ui/BrandLogo";
import CallbackModal from "@/components/ui/CallbackModal";
import InstallAppButton from "@/components/ui/InstallAppButton";
import { cities } from "@/data/cities";

const trucks = [
  { slug: "faw-kmu-dongyoung", label: "FAW + КМУ DongYang" },
  { slug: "kamaz-65115-hangil", label: "КАМАЗ 65115 + HANGIL" },
  { slug: "kamaz-43118-kanglim", label: "КАМАЗ 43118 вездеход" },
  { slug: "faw-j6-dongyang-1966", label: "FAW J6 + DONGYANG 1966" },
  { slug: "renault-lander-kmu", label: "Renault Lander + КМУ" },
  { slug: "isuzu-5t-kmu", label: "ISUZU 5т + КМУ" },
  { slug: "jcb-4cx", label: "JCB 4CX" },
  { slug: "jcb-3cx", label: "JCB 3CX" },
];

const sections = [
  { href: "/arenda-manipulyatora-nizhny-novgorod", label: "Аренда манипулятора НН" },
  { href: "/uslugi-manipulyatora", label: "Услуги манипулятора" },
  { href: "/manipulyator-s-lyulkoy", label: "Манипулятор с люлькой" },
  { href: "/#fleet", label: "Наша техника" },
  { href: "/#usecases", label: "Виды работ" },
  { href: "/#pricing", label: "Тарифы" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
];

interface CollapsibleColumnProps {
  icon: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleColumn = ({ icon, title, defaultOpen = false, children }: CollapsibleColumnProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-accent/10 md:border-b-0 md:pb-0 pb-3">
      {/* Кнопка — только на мобильных */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden w-full flex items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <h3 className="font-display font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#e8a820" }}>
          <Icon name={icon} size={14} />
          {title}
        </h3>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-accent/70" />
      </button>
      {/* Статичный заголовок — на планшете и десктопе */}
      <div className="hidden md:block mb-4">
        <h3 className="font-display font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#e8a820" }}>
          <Icon name={icon} size={14} />
          {title}
        </h3>
        <div className="mt-2 h-px w-10 bg-gradient-to-r from-accent/80 to-transparent" />
      </div>
      {/* Контент */}
      <div className={`${open ? "block" : "hidden"} md:block pb-3 md:pb-0`}>
        {children}
      </div>
    </div>
  );
};

const LinkItem = ({ label }: { label: string }) => (
  <span className="inline-flex items-start gap-1.5 leading-snug">
    <span className="text-accent/70 group-hover:text-accent group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">›</span>
    <span className="group-hover:text-accent transition-colors duration-200">{label}</span>
  </span>
);

const SiteFooter = () => {
  const [callbackOpen, setCallbackOpen] = useState(false);
  return (
    <footer id="contacts" className="relative border-t border-accent/20 bg-gradient-to-b from-background to-black">
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Верхний блок с колонками */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* Колонка 1 — О компании (всегда видна полностью) */}
          <div className="md:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" />
            <p className="text-white/80 text-sm leading-relaxed mt-3 sm:mt-4 mb-4 max-w-md border-l-2 border-accent/60 pl-3 italic">
              <strong className="text-accent not-italic">фаварит.рф</strong> — манипуляторы в Нижнем Новгороде. Свой автопарк <span className="text-white not-italic">·</span> опытные операторы <span className="text-white not-italic">·</span> с 2015 года.
            </p>

            {/* Крупные кнопки звонка */}
            <div className="flex flex-col gap-2.5 mb-4">
              <a
                href="tel:+79601883084"
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/15 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={16} className="text-black sm:!w-[18px] sm:!h-[18px]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-black/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Позвонить</span>
                  <span className="text-black font-black text-base sm:text-lg tabular-nums">+7 960 188-30-84</span>
                </div>
              </a>
              <a
                href="tel:+79601690990"
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/10 transition-colors"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="PhoneCall" size={16} className="text-accent sm:!w-[18px] sm:!h-[18px]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-accent/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Директор</span>
                  <span className="text-white font-black text-base sm:text-lg tabular-nums">+7 960 169-09-90</span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-dashed border-accent/40 bg-transparent hover:border-accent/70 hover:bg-accent/5 transition-all text-left"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={16} className="text-accent sm:!w-[18px] sm:!h-[18px]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-accent/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Не можете позвонить?</span>
                  <span className="text-white font-bold text-sm sm:text-base">Заказать обратный звонок</span>
                </div>
              </button>
            </div>

            {/* Email и адрес */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:Avrora.888@bk.ru"
                className="inline-flex items-center gap-2 text-white/85 text-sm hover:text-accent transition-colors break-all"
              >
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={12} className="text-accent" />
                </div>
                Avrora.888@bk.ru
              </a>
              <div className="inline-flex items-start gap-2 text-white/85 text-sm">
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={12} className="text-accent" />
                </div>
                <span className="mt-1">Нижний Новгород,<br className="sm:hidden" /> Шуваловский проезд, 7</span>
              </div>
              <div className="inline-flex items-center gap-2 text-white/85 text-sm">
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={12} className="text-accent" />
                </div>
                <span>Работаем без выходных · с 7:00 до 22:00</span>
              </div>
            </div>
          </div>

          {/* Колонка 2 — Разделы сайта */}
          <CollapsibleColumn icon="Layout" title="Разделы сайта">
            <ul className="space-y-2 sm:space-y-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-white/80 text-sm hover:text-accent transition-colors group"
                  >
                    <LinkItem label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleColumn>

          {/* Колонка 3 — Города (компактные чипы) */}
          <CollapsibleColumn icon="MapPin" title="Города работы">
            <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30">
              <Icon name="CheckCircle2" size={11} />
              {cities.length} городов области
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/gorod/${c.slug}`}
                  title={`Манипулятор в ${c.nameIn}`}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent/[0.06] border border-accent/20 text-[11px] sm:text-xs text-white/80 hover:bg-accent/15 hover:border-accent/50 hover:text-accent transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </CollapsibleColumn>

          {/* Колонка 4 — Техника */}
          <CollapsibleColumn icon="Truck" title="Наш автопарк">
            <ul className="space-y-2 sm:space-y-2.5">
              {trucks.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/tehnika/${t.slug}`}
                    className="text-white/80 text-sm hover:text-accent transition-colors group"
                  >
                    <LinkItem label={t.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleColumn>
        </div>
      </div>

      {/* Установить приложение */}
      <div className="border-t border-accent/15 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-black shadow-lg"
                style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
              >
                Ф
              </div>
              <div className="text-center sm:text-left">
                <div className="text-white font-bold text-sm sm:text-base mb-0.5">
                  Установите «Фаворит» на телефон
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
                  Открытие одним касанием · работает без интернета · быстрый звонок
                </p>
              </div>
            </div>
            <InstallAppButton className="!px-4 !py-2.5 !text-sm" />
          </div>
        </div>
      </div>

      {/* Дисклеймер — не публичная оферта */}
      <div className="border-t border-accent/15 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-white/85 text-center leading-relaxed flex items-start sm:items-center justify-center gap-2">
            <Icon name="Info" size={14} className="text-accent flex-shrink-0 mt-0.5 sm:mt-0" />
            <span>
              Обращаем ваше внимание, что сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой.
            </span>
          </p>
        </div>
      </div>

      {/* Нижняя полоска */}
      <div className="border-t border-accent/15 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-xs sm:text-sm text-white/85 flex flex-col items-center gap-2">
          <p className="text-center leading-relaxed font-medium">
            © 2015–2026 ООО «Фаворит» — аренда манипуляторов<br className="sm:hidden" /> в Нижнем Новгороде и области
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacy" className="text-accent hover:text-accent/80 underline-offset-4 hover:underline transition-colors font-semibold">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;