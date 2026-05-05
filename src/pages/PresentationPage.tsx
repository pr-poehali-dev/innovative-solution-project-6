import { useEffect } from "react";
import Icon from "@/components/ui/icon";

const PresentationPage = () => {
  useEffect(() => {
    document.title = "Презентация компании — ИП Мкртчян С.В.";
  }, []);

  const handlePrint = () => window.print();

  const okvedAdditional = [
    { code: "41.20", name: "Строительство жилых и нежилых зданий" },
    { code: "42.11", name: "Строительство автомобильных дорог и автомагистралей" },
    { code: "43.11", name: "Разборка и снос зданий" },
    { code: "43.11.2", name: "Разборка и снос участков автомобильных дорог" },
    { code: "43.11.9", name: "Разборка и снос прочих сооружений" },
    { code: "43.12", name: "Подготовка строительной площадки" },
    { code: "43.12.1", name: "Расчистка территории строительной площадки" },
    {
      code: "43.12.2",
      name: "Производство дренажных работ на сельскохозяйственных землях, землях лесных территорий, а также на строительных площадках",
    },
    { code: "43.31", name: "Производство штукатурных работ" },
    {
      code: "43.32.1",
      name: "Установка дверей (кроме автоматических и вращающихся), окон, дверных и оконных рам из дерева или прочих материалов",
    },
    {
      code: "43.32.3",
      name: "Производство работ по внутренней отделке зданий (включая потолки, раздвижные и съемные перегородки и т.д.)",
    },
    { code: "43.34", name: "Производство малярных и стекольных работ" },
    { code: "43.34.1", name: "Производство малярных работ" },
    { code: "43.34.2", name: "Производство стекольных работ" },
    { code: "43.91", name: "Производство кровельных работ" },
    { code: "77.12", name: "Аренда и лизинг грузовых транспортных средств" },
  ];

  const services = [
    { icon: "Truck", title: "Аренда манипулятора", desc: "Грузоподъёмность до 7 тонн, стрела до 20 м" },
    { icon: "Building2", title: "Строительные работы", desc: "Полный цикл от подготовки до отделки" },
    { icon: "Hammer", title: "Демонтаж и снос", desc: "Зданий, сооружений, дорожных участков" },
    { icon: "Home", title: "Отделочные работы", desc: "Малярные, штукатурные, кровельные, стекольные" },
    { icon: "Wrench", title: "Установка конструкций", desc: "Двери, окна, перегородки, потолки" },
    { icon: "Pickaxe", title: "Земляные работы", desc: "Расчистка, подготовка, дренаж участков" },
  ];

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-page { page-break-after: always; }
          .print-page:last-child { page-break-after: auto; }
          .print-bg { background: white !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 print-bg">
        {/* Кнопка печати */}
        <div className="no-print sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-[210mm] mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700">
              <Icon name="FileText" size={20} />
              <span className="font-medium">Презентация компании</span>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              <Icon name="Printer" size={18} />
              Печать / PDF
            </button>
          </div>
        </div>

        <div className="max-w-[210mm] mx-auto px-6 py-8 print:px-0 print:py-0">
          {/* СТРАНИЦА 1 */}
          <div className="print-page bg-white rounded-2xl shadow-lg print:shadow-none overflow-hidden mb-8 print:mb-0 print:rounded-none">
            {/* Шапка */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white p-10 print:p-8">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />
              <div className="relative">
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
                <h1 className="text-4xl font-bold leading-tight mb-3 print:text-3xl">
                  Аренда манипулятора и
                  <br />
                  строительные услуги
                </h1>
                <p className="text-slate-300 text-lg max-w-xl">
                  Полный цикл строительных работ в Нижнем Новгороде и области
                </p>
              </div>
            </div>

            {/* Реквизиты */}
            <div className="p-10 print:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900">Реквизиты компании</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <RequisiteCard icon="User" label="Руководитель" value="Мкртчян Саргис Варужанович" full />
                <RequisiteCard icon="MapPin" label="Юридический адрес" value="Нижегородская область, Кстовский р-н, деревня Новая Деревня, бульвар Солнечный, д. 5" full />
                <RequisiteCard icon="Hash" label="ИНН" value="525014349358" />
                <RequisiteCard icon="Briefcase" label="Форма" value="ИП" />
                <RequisiteCard icon="CreditCard" label="Расчётный счёт" value="40802810529050015990" full />
                <RequisiteCard icon="Banknote" label="Валюта счёта" value="RUR (российский рубль)" full />
                <RequisiteCard icon="Building" label="Банк" value='ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"' full />
                <RequisiteCard icon="BarcodeIcon" label="БИК" value="042202824" />
                <RequisiteCard icon="Wallet" label="Корр. счёт" value="30101810200000000824" />
              </div>

              {/* Контакты */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Phone" size={20} className="text-orange-600" />
                  <h3 className="font-bold text-slate-900">Контактная информация</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Телефон</div>
                    <div className="font-semibold text-slate-900 text-base">+7 (XXX) XXX-XX-XX</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Регион работы</div>
                    <div className="font-semibold text-slate-900 text-base">Нижний Новгород и область</div>
                  </div>
                </div>
              </div>

              {/* Подвал страницы 1 */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>© ИП Мкртчян С. В.</div>
                <div>Страница 1 из 2</div>
              </div>
            </div>
          </div>

          {/* СТРАНИЦА 2 */}
          <div className="print-page bg-white rounded-2xl shadow-lg print:shadow-none overflow-hidden print:rounded-none">
            <div className="p-10 print:p-8">
              {/* Услуги */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-7 bg-orange-500 rounded-full" />
                  <h2 className="text-2xl font-bold text-slate-900">Направления деятельности</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {services.map((s) => (
                    <div
                      key={s.title}
                      className="border border-slate-200 rounded-xl p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={s.icon} size={20} className="text-orange-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 mb-1">{s.title}</div>
                          <div className="text-sm text-slate-600">{s.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ОКВЭД */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-7 bg-orange-500 rounded-full" />
                  <h2 className="text-2xl font-bold text-slate-900">Коды ОКВЭД</h2>
                </div>

                {/* Основной */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-5 mb-5 text-white shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2">
                      <div className="text-xs uppercase tracking-wider opacity-80">Основной</div>
                      <div className="text-2xl font-bold">43.39</div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-lg leading-snug">
                        Производство прочих отделочных и завершающих работ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Доп. коды */}
                <div className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  Дополнительные коды
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {okvedAdditional.map((o) => (
                    <div
                      key={o.code}
                      className="flex items-start gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-mono font-bold text-orange-600 text-sm min-w-[60px]">
                        {o.code}
                      </div>
                      <div className="text-sm text-slate-800 leading-snug">{o.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Подвал страницы 2 */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <div className="bg-slate-900 text-white rounded-xl p-6 text-center">
                  <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                    Готовы к сотрудничеству
                  </div>
                  <div className="text-xl font-bold mb-1">
                    Свяжитесь с нами для расчёта стоимости
                  </div>
                  <div className="text-slate-400 text-sm">
                    Работаем с физическими и юридическими лицами · Безналичный расчёт · НДС не облагается
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
    </>
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
    className={`border border-slate-200 rounded-lg p-4 hover:border-orange-300 transition-colors ${
      full ? "col-span-2" : ""
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={16} className="text-slate-600" fallback="Info" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
        <div className="font-semibold text-slate-900 text-sm break-words">{value}</div>
      </div>
    </div>
  </div>
);

export default PresentationPage;
