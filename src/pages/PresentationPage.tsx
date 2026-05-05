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
              Аренда манипулятора и
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

              <div className="grid grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.title} className="border border-slate-200 rounded-xl p-4">
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

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900">Коды ОКВЭД</h2>
              </div>

              <div
                style={{ background: "linear-gradient(90deg, #F97316 0%, #F59E0B 100%)" }}
                className="rounded-xl p-5 mb-5 text-white shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <div className="text-xs uppercase tracking-wider opacity-90">Основной</div>
                    <div className="text-2xl font-bold">43.39</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-lg leading-snug">
                      Производство прочих отделочных и завершающих работ
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Дополнительные коды
              </div>
              <div className="grid grid-cols-1 gap-2">
                {okvedAdditional.map((o) => (
                  <div
                    key={o.code}
                    className="flex items-start gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div className="font-mono font-bold text-orange-600 text-sm min-w-[60px]">
                      {o.code}
                    </div>
                    <div className="text-sm text-slate-800 leading-snug">{o.name}</div>
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
  <div className={`border border-slate-200 rounded-lg p-4 ${full ? "col-span-2" : ""}`}>
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={16} className="text-slate-600" fallback="Info" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
        <div className="font-bold text-slate-900 text-sm break-words">{value}</div>
      </div>
    </div>
  </div>
);

export default PresentationPage;