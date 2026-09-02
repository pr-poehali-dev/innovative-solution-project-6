import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import BrandLogo from "@/components/ui/BrandLogo";
import CallbackModal from "@/components/ui/CallbackModal";
import { cities } from "@/data/cities";
import { MAX_LINK } from "@/data/contacts";
import MaxIcon from "@/components/ui/MaxIcon";
import { MAX_GRADIENT } from "@/components/ui/MaxButton";
import { reachGoal } from "@/lib/metrika";

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
  { href: "/manipulyator-s-bur", label: "Манипулятор с буром" },
  { href: "/arenda-manipulyatora-3-tonny", label: "Манипулятор 3 тонны" },
  { href: "/arenda-manipulyatora-5-tonn", label: "Манипулятор 5 тонн" },
  { href: "/arenda-manipulyatora-7-tonn", label: "Манипулятор 7 тонн" },
  { href: "/#fleet", label: "Наша техника" },
  { href: "/#usecases", label: "Виды работ" },
  { href: "/#pricing", label: "Тарифы" },
  { href: "/stroymaterialy", label: "Стройматериалы" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/nashi-raboty", label: "Наши работы" },
  { href: "/pogoda", label: "Погода для работ" },
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
      {/* Кнопка-заголовок — теперь и на мобильных, и на десктопе */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-3 md:py-2 md:mb-2 text-left group"
        aria-expanded={open}
      >
        <h3
          className="font-display font-black text-sm uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors"
          style={{ color: "#e8a820" }}
        >
          <Icon name={icon} size={14} />
          {title}
        </h3>
        <Icon
          name={open ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-accent/70 group-hover:text-accent transition-all"
        />
      </button>

      {/* Декоративная полоска под заголовком — только на десктопе */}
      <div className="hidden md:block mb-3 h-px w-10 bg-gradient-to-r from-accent/80 to-transparent" />

      {/* Контент — теперь сворачиваемый на любом размере */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-3 md:pb-0">{children}</div>
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

      {/* Быстрые ссылки — дубль микроразметки SiteNavigationElement для поисковиков */}
      <nav
        aria-label="Быстрые ссылки сайта"
        className="border-b border-accent/15 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,12,4,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(20,12,4,0.6) 100%)",
        }}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-[11px] sm:text-xs uppercase tracking-widest text-accent font-black flex items-center gap-2">
              <Icon name="Compass" size={14} className="text-accent" />
              Быстрая навигация
            </h2>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-[10px] text-accent/90 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              8 разделов
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            {[
              { href: "/#fleet", icon: "Truck", title: "Парк техники", desc: "15 машин 3–17 т", badge: "ТОП" },
              { href: "/#pricing", icon: "BadgeRussianRuble", title: "Цены", desc: "От 1900 ₽/час", badge: null },
              { href: "/#calculator", icon: "Calculator", title: "Калькулятор", desc: "Расчёт за минуту", badge: null },
              { href: "/otzyvy", icon: "Star", title: "Отзывы", desc: "4.9 на Я.Картах", badge: null },
              { href: "/manipulyator-s-lyulkoy", icon: "ArrowUpFromLine", title: "С люлькой", desc: "Работы на высоте", badge: null },
              { href: "/stroymaterialy", icon: "Package", title: "Стройматериалы", desc: "Кирпич, блоки, бетон", badge: "NEW" },
              { href: "/blog", icon: "BookOpen", title: "Блог", desc: "Полезные статьи", badge: null },
              { href: "#contacts", icon: "Phone", title: "Контакты", desc: "+7 960 188-30-84", badge: null },
            ].map((item) => {
              const isExternal = item.href.startsWith("/") && !item.href.startsWith("/#");
              const content = (
                <>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none rounded-2xl" />
                  <span className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-accent/15 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  {item.badge && (
                    <span
                      className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black text-black tracking-wider z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}

                  <div className="relative flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2.5">
                    <div
                      className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(232,168,32,0.25)",
                      }}
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        className="text-black"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-white text-[13px] sm:text-sm leading-tight mb-0.5 group-hover:text-accent transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-white/65 leading-snug font-medium truncate">
                        {item.desc}
                      </div>
                    </div>
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="text-accent/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all sm:hidden flex-shrink-0"
                    />
                  </div>
                </>
              );
              const cls =
                "group relative block p-3 sm:p-3.5 rounded-2xl border border-accent/20 hover:border-accent/60 transition-all active:scale-[0.97] overflow-hidden shadow-lg shadow-black/20";
              const style = {
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(232,168,32,0.05) 50%, rgba(255,255,255,0.04) 100%)",
              };
              return isExternal ? (
                <Link key={item.href} to={item.href} className={cls} style={style}>
                  {content}
                </Link>
              ) : (
                <a key={item.href} href={item.href} className={cls} style={style}>
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Верхний блок с колонками */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* Колонка 1 — Логотип + сворачиваемые контакты */}
          <div className="md:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" />
            <p className="text-white/80 text-sm leading-relaxed mt-3 sm:mt-4 mb-4 max-w-md border-l-2 border-accent/60 pl-3 italic">
              <strong className="text-accent not-italic">фаварит.рф</strong> — манипуляторы в Нижнем Новгороде. Свой автопарк <span className="text-white not-italic">·</span> опытные операторы <span className="text-white not-italic">·</span> с 2015 года.
            </p>

            <CollapsibleColumn icon="Phone" title="Контакты и связь">
              {/* Крупные кнопки звонка */}
              <div className="flex flex-col gap-2.5 mb-4">
                <a
                  href="tel:+79601883084"
                  onClick={() => reachGoal("phone_click", { place: "footer_main" })}
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
                  onClick={() => reachGoal("phone_click", { place: "footer_director" })}
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

                <a
                  href={MAX_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => reachGoal("max_click", { place: "footer" })}
                  className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 transition-colors"
                >
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: MAX_GRADIENT,
                      boxShadow: "0 4px 18px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
                    }}
                  >
                    <MaxIcon size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[#c4b5fd] text-[10px] sm:text-xs font-bold uppercase tracking-wider">Мы в MAX</span>
                    <span className="text-white font-black text-sm sm:text-base">Написать в мессенджер</span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    reachGoal("callback_modal_open", { place: "footer" });
                    setCallbackOpen(true);
                  }}
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
            </CollapsibleColumn>
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
              {cities.map((c) => {
                const isMain = c.slug === "nizhny-novgorod";
                return (
                  <Link
                    key={c.slug}
                    to={`/gorod/${c.slug}`}
                    title={`Манипулятор в ${c.nameIn}`}
                    rel={isMain ? undefined : "nofollow"}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] sm:text-xs transition-all ${
                      isMain
                        ? "bg-accent/15 border-accent/50 text-accent font-bold hover:bg-accent/25"
                        : "bg-accent/[0.06] border-accent/20 text-white/80 hover:bg-accent/15 hover:border-accent/50 hover:text-accent"
                    }`}
                  >
                    {c.name}
                  </Link>
                );
              })}
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