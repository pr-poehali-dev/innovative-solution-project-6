import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Icon from "@/components/ui/icon";

const PresentationPage = () => {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    document.title = "Презентация компании — ИП Мкртчян С.В.";
  }, []);

  const handleDownloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current) return;
    setGenerating(true);
    try {
      const opts = {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      };

      const canvas1 = await html2canvas(page1Ref.current, opts);
      const canvas2 = await html2canvas(page2Ref.current, opts);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const img1 = canvas1.toDataURL("image/jpeg", 0.95);
      const img2 = canvas2.toDataURL("image/jpeg", 0.95);

      pdf.addImage(img1, "JPEG", 0, 0, pageW, pageH);
      pdf.addPage();
      pdf.addImage(img2, "JPEG", 0, 0, pageW, pageH);

      pdf.save("Презентация_ИП_Мкртчян.pdf");
    } catch (e) {
      console.error("PDF error", e);
      alert("Не удалось создать PDF. Попробуйте ещё раз.");
    } finally {
      setGenerating(false);
    }
  };

  const directions = [
    { icon: "Truck", color: "orange", title: "Аренда манипулятора", desc: "До 7 тонн, стрела до 20 м" },
    { icon: "Forklift", color: "amber", title: "Аренда экскаватора", desc: "Колёсные и гусеничные", fallback: "Truck" },
    { icon: "Tractor", color: "yellow", title: "Аренда погрузчика", desc: "Фронтальные и мини-погрузчики", fallback: "Truck" },
    { icon: "Truck", color: "stone", title: "Самосвалы и тонары", desc: "Перевозка сыпучих грузов" },
    { icon: "Construction", color: "orange", title: "Строительство зданий", desc: "Жилые и нежилые — полный цикл" },
    { icon: "Building2", color: "amber", title: "Строительство ангаров", desc: "Каркасные и промышленные здания" },
    { icon: "Route", color: "stone", title: "Строительство дорог", desc: "Автомобильные дороги и магистрали" },
    { icon: "Layers", color: "stone", title: "Асфальтирование", desc: "Укладка асфальта, ямочный ремонт" },
    { icon: "Hammer", color: "red", title: "Разборка и снос зданий", desc: "Демонтаж зданий и сооружений" },
    { icon: "TrafficCone", color: "rose", title: "Снос дорожных участков", desc: "Разборка участков автодорог" },
    { icon: "Wrecking-ball", color: "red", title: "Снос прочих сооружений", desc: "Заборы, павильоны, фундаменты", fallback: "Hammer" },
    { icon: "Shovel", color: "yellow", title: "Земляные работы", desc: "Котлованы, траншеи, планировка", fallback: "Pickaxe" },
    { icon: "Bulldozer", color: "amber", title: "Подготовка площадки", desc: "Расчистка территории под застройку", fallback: "Truck" },
    { icon: "TreePine", color: "green", title: "Расчистка территории", desc: "Спил деревьев, корчевание пней" },
    { icon: "Sprout", color: "green", title: "Дренажные работы", desc: "Отвод грунтовых вод, мелиорация" },
    { icon: "Trees", color: "emerald", title: "Благоустройство", desc: "Озеленение, газоны, малые формы" },
    { icon: "SquareStack", color: "stone", title: "Укладка тротуаров", desc: "Брусчатка, плитка, бордюры", fallback: "Layers" },
    { icon: "Fence", color: "amber", title: "Установка ограждений", desc: "Заборы, ворота, калитки", fallback: "DoorClosed" },
    { icon: "Home", color: "cyan", title: "Кровельные работы", desc: "Монтаж и ремонт крыш" },
    { icon: "PaintRoller", color: "blue", title: "Штукатурные работы", desc: "Внутренние и фасадные" },
    { icon: "Brush", color: "pink", title: "Малярные работы", desc: "Покраска стен, потолков, фасадов" },
    { icon: "Square", color: "cyan", title: "Стекольные работы", desc: "Остекление окон, витрин, перегородок" },
    { icon: "DoorOpen", color: "indigo", title: "Установка окон и дверей", desc: "Дверные и оконные конструкции" },
    { icon: "LayoutPanelTop", color: "violet", title: "Внутренняя отделка", desc: "Потолки, перегородки, отделка" },
    { icon: "Wrench", color: "stone", title: "Сантехнические работы", desc: "Монтаж труб, водопровода, канализации" },
    { icon: "Zap", color: "yellow", title: "Электромонтаж", desc: "Прокладка кабеля, освещение" },
    { icon: "Thermometer", color: "red", title: "Утепление зданий", desc: "Фасадов, кровли, фундамента" },
    { icon: "Hammer", color: "orange", title: "Фундаментные работы", desc: "Заливка, армирование, гидроизоляция" },
    { icon: "Boxes", color: "amber", title: "Бетонные работы", desc: "Стяжки, перекрытия, опалубка" },
    { icon: "Truck", color: "orange", title: "Аренда грузового транспорта", desc: "Доставка стройматериалов" },
  ];

  const services = [
    { icon: "Truck", title: "Аренда и услуги спецтехники", desc: "Манипуляторы, экскаваторы, самосвалы" },
    { icon: "Building2", title: "Строительные работы", desc: "Полный цикл от подготовки до отделки" },
    { icon: "Hammer", title: "Демонтаж и снос", desc: "Зданий, сооружений, дорожных участков" },
    { icon: "Trees", title: "Благоустройство", desc: "Озеленение, тротуары, малые формы" },
    { icon: "Layers", title: "Асфальтирование", desc: "Укладка асфальта, ямочный ремонт дорог" },
    { icon: "Home", title: "Отделочные работы", desc: "Малярные, штукатурные, кровельные" },
    { icon: "Wrench", title: "Установка конструкций", desc: "Двери, окна, перегородки, потолки" },
    { icon: "Pickaxe", title: "Земляные работы", desc: "Расчистка, подготовка, дренаж участков" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Управление */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-[210mm] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <Icon name="FileText" size={20} />
            <span className="font-medium">Презентация компании</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={generating}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            {generating ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />
                Создаём PDF...
              </>
            ) : (
              <>
                <Icon name="Download" size={18} />
                Скачать PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto px-6 py-8">
        {/* СТРАНИЦА 1 */}
        <div
          ref={page1Ref}
          style={{ width: "210mm", minHeight: "297mm" }}
          className="bg-white shadow-lg overflow-hidden mb-8"
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #7C2D12 100%)",
            }}
            className="text-white p-10 relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-orange-300 font-semibold">
                  Индивидуальный предприниматель
                </div>
                <div className="text-2xl font-bold">Мкртчян С. В.</div>
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-3">
              Услуги спецтехники и
              <br />
              строительные услуги
            </h1>
            <p className="text-slate-300 text-lg max-w-xl">
              Полный цикл строительных работ в Нижнем Новгороде и области
            </p>
          </div>

          <div className="p-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-7 bg-orange-500 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-900">
                Реквизиты компании
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <RequisiteCard icon="User" label="Руководитель" value="Мкртчян Саргис Варужанович" full />
              <RequisiteCard icon="MapPin" label="Юридический адрес" value="Нижегородская область, Кстовский р-н, деревня Новая Деревня, бульвар Солнечный, д. 5" full />
              <RequisiteCard icon="Hash" label="ИНН" value="525014349358" />
              <RequisiteCard icon="Briefcase" label="Форма" value="ИП" />
              <RequisiteCard icon="CreditCard" label="Расчётный счёт" value="40802810529050015990" full />
              <RequisiteCard icon="Banknote" label="Валюта счёта" value="RUR (российский рубль)" full />
              <RequisiteCard icon="Building" label="Банк" value='ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"' full />
              <RequisiteCard icon="Barcode" label="БИК" value="042202824" />
              <RequisiteCard icon="Wallet" label="Корр. счёт" value="30101810200000000824" />
            </div>

            {/* Почему выбирают нас */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900">Почему выбирают нас</h2>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { value: "10+", label: "лет опыта", icon: "Award" },
                  { value: "500+", label: "проектов", icon: "CheckCircle2" },
                  { value: "24/7", label: "на связи", icon: "Clock" },
                  { value: "100%", label: "договор", icon: "FileCheck2" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3 text-center text-white shadow-md"
                    style={{ background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)" }}
                  >
                    <Icon name={s.icon} size={20} className="text-white/90 mx-auto mb-1" />
                    <div className="text-2xl font-black leading-none">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-90 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Truck", title: "Свой автопарк", desc: "Спецтехника без посредников" },
                  { icon: "UserCheck", title: "Опытные операторы", desc: "Сертифицированные специалисты" },
                  { icon: "Wallet", title: "Прозрачные цены", desc: "Без скрытых доплат и наценок" },
                  { icon: "Shield", title: "Гарантия качества", desc: "Договор и ответственность" },
                  { icon: "Zap", title: "Выезд в день заявки", desc: "Реагируем быстро, без задержек" },
                  { icon: "Building2", title: "Работа с юрлицами", desc: "Безналичный расчёт, документы" },
                ].map((a) => (
                  <div
                    key={a.title}
                    className="flex items-start gap-3 px-4 py-3 bg-gradient-to-br from-white to-orange-50/30 border border-slate-200 rounded-xl"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)" }}
                    >
                      <Icon name={a.icon} size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900 leading-tight">{a.title}</div>
                      <div className="text-xs text-slate-500 leading-snug mt-0.5">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(90deg, #FFF7ED 0%, #FEF3C7 100%)",
                border: "1px solid #FED7AA",
              }}
              className="rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Phone" size={20} className="text-orange-600" />
                <h3 className="font-bold text-slate-900">Контактная информация</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500 mb-1 uppercase text-xs tracking-wide">Телефон</div>
                  <div className="font-bold text-slate-900 text-lg">+7 (960) 169-09-90</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1 uppercase text-xs tracking-wide">Регион работы</div>
                  <div className="font-bold text-slate-900 text-lg">Нижний Новгород и область</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>© ИП Мкртчян С. В.</div>
              <div>Страница 1 из 2</div>
            </div>
          </div>
        </div>

        {/* СТРАНИЦА 2 */}
        <div
          ref={page2Ref}
          style={{ width: "210mm", minHeight: "297mm" }}
          className="bg-white shadow-lg overflow-hidden"
        >
          <div className="p-10">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900">Направления деятельности</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="border border-slate-200 rounded-xl p-4 bg-gradient-to-br from-white to-orange-50/30 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)" }}
                      >
                        <Icon name={s.icon} size={22} className="text-white" fallback="Sparkles" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 mb-1 leading-tight">{s.title}</div>
                        <div className="text-xs text-slate-600 leading-snug">{s.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900">Все направления деятельности</h2>
              </div>

              <div
                style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)" }}
                className="rounded-xl p-5 mb-5 text-white shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center justify-center">
                    <Icon name="Star" size={28} className="text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-xs uppercase tracking-wider opacity-90 mb-1">Основное направление</div>
                    <div className="font-bold text-lg leading-snug">
                      Отделочные и завершающие работы
                    </div>
                    <div className="text-sm opacity-90 mt-0.5">
                      Производство прочих отделочных и завершающих работ
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Icon name="ListChecks" size={16} className="text-orange-500" />
                Дополнительные направления
              </div>
              <div className="grid grid-cols-2 gap-2">
                {directions.map((d) => (
                  <div
                    key={d.title}
                    className="flex items-start gap-2.5 px-3 py-2 bg-gradient-to-br from-white to-orange-50/30 border border-slate-200 rounded-lg hover:border-orange-300 hover:shadow-sm transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)" }}
                    >
                      <Icon
                        name={d.icon}
                        size={16}
                        className="text-white"
                        fallback={d.fallback || "Wrench"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-slate-900 leading-tight">{d.title}</div>
                      <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200">
              <div className="bg-slate-900 text-white rounded-xl p-6 text-center">
                <div className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">
                  Готовы к сотрудничеству
                </div>
                <div className="text-xl font-bold mb-1">Свяжитесь с нами для расчёта стоимости</div>
                <div className="text-slate-400 text-sm">
                  Работаем с физическими и юридическими лицами · Безналичный расчёт
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <div>© ИП Мкртчян С. В.</div>
                <div>Страница 2 из 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequisiteCard = ({
  icon,
  label,
  value,
  full,
}: {
  icon: string;
  label: string;
  value: string;
  full?: boolean;
}) => (
  <div
    className={`border border-slate-200 rounded-xl p-4 bg-gradient-to-br from-white to-orange-50/30 hover:shadow-md transition-shadow ${full ? "col-span-2" : ""}`}
  >
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{ background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)" }}
      >
        <Icon name={icon} size={18} className="text-white" fallback="Info" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
        <div className="font-bold text-slate-900 text-sm break-words">{value}</div>
      </div>
    </div>
  </div>
);

export default PresentationPage;