import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface ContractModalProps {
  open: boolean;
  onClose: () => void;
}

const ContractModal = ({ open, onClose }: ContractModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    const printContents = document.getElementById("contract-printable")?.innerHTML;
    if (!printContents) return;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(`
      <html><head><title>Договор аренды техники — ООО ФАВОРИТ</title>
      <style>
        body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; color: #000; }
        h1 { text-align: center; font-size: 18px; margin-bottom: 24px; }
        h2 { font-size: 14px; margin-top: 20px; }
        p, li { font-size: 13px; }
        .row { display: flex; justify-content: space-between; gap: 40px; margin-top: 40px; }
        .col { flex: 1; }
        .sig { margin-top: 60px; border-top: 1px solid #000; padding-top: 4px; font-size: 12px; }
        ul { padding-left: 20px; }
        @media print { body { padding: 20px; } }
      </style></head>
      <body>${printContents}</body></html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-accent/30 rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-accent/20 bg-gradient-to-r from-accent/10 to-transparent">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center flex-shrink-0">
              <Icon name="FileText" size={18} className="text-accent" />
            </div>
            <div className="min-w-0">
              <div className="text-accent text-[10px] uppercase tracking-widest font-semibold">Документ</div>
              <h2 className="text-white font-display font-bold text-base sm:text-lg truncate">Типовой договор аренды</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 transition-all text-xs font-semibold text-white"
            >
              <Icon name="Printer" size={14} className="text-accent" />
              Печать / PDF
            </button>
            <button
              onClick={handlePrint}
              className="sm:hidden w-9 h-9 rounded-xl border border-accent/40 bg-accent/10 flex items-center justify-center"
              aria-label="Печать"
            >
              <Icon name="Printer" size={16} className="text-accent" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label="Закрыть"
            >
              <Icon name="X" size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 text-sm text-white/80 leading-relaxed">
          <div id="contract-printable">
            <h1 className="font-display font-black text-lg sm:text-xl text-white text-center mb-1">
              ДОГОВОР АРЕНДЫ ТЕХНИКИ С ЭКИПАЖЕМ № ___
            </h1>
            <p className="text-center text-muted-foreground text-xs mb-5">
              г. Нижний Новгород &nbsp;•&nbsp; «___» __________ 20___ г.
            </p>

            <p className="mb-4">
              <strong>Общество с ограниченной ответственностью «ФАВОРИТ»</strong> (ИНН 5250077990, ОГРН 1235200013531),
              именуемое в дальнейшем «Арендодатель», в лице директора, действующего на основании Устава, с одной стороны,
              и <strong>_________________________________</strong>, именуемый(ая) в дальнейшем «Арендатор»,
              с другой стороны, заключили настоящий договор о нижеследующем:
            </p>

            <h2 className="font-bold text-white mt-5 mb-2">1. Предмет договора</h2>
            <p>1.1. Арендодатель предоставляет Арендатору во временное владение и пользование транспортное средство с экипажем (манипулятор / спецтехнику) для выполнения работ Арендатора.</p>
            <p>1.2. Арендодатель своими силами оказывает услуги по управлению техникой и её технической эксплуатации.</p>

            <h2 className="font-bold text-white mt-5 mb-2">2. Стоимость и порядок оплаты</h2>
            <p>2.1. Стоимость аренды — согласно действующему прайс-листу (от 1800 ₽/час с НДС).</p>
            <p>2.2. Минимальный заказ — 4 часа работы техники.</p>
            <p>2.3. Оплата производится наличными, переводом на расчётный счёт или картой. Для юр. лиц — по безналичному расчёту с НДС 20%.</p>
            <p>2.4. Закрывающие документы: акт выполненных работ, счёт-фактура, УПД (Диадок/СБИС).</p>

            <h2 className="font-bold text-white mt-5 mb-2">3. Права и обязанности сторон</h2>
            <p>3.1. <strong>Арендодатель обязуется:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Подать исправную технику в согласованное время и место;</li>
              <li>Обеспечить квалифицированного оператора;</li>
              <li>Нести расходы по содержанию техники, ГСМ и страхованию;</li>
              <li>Соблюдать требования безопасности при выполнении работ.</li>
            </ul>
            <p className="mt-3">3.2. <strong>Арендатор обязуется:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Своевременно оплачивать услуги;</li>
              <li>Обеспечить условия для подъезда и работы техники;</li>
              <li>Не использовать технику для перевозки запрещённых грузов;</li>
              <li>Подписать акт выполненных работ по окончании смены.</li>
            </ul>

            <h2 className="font-bold text-white mt-5 mb-2">4. Ответственность сторон</h2>
            <p>4.1. За несвоевременную оплату Арендатор уплачивает пени 0,1% от суммы задолженности за каждый день просрочки.</p>
            <p>4.2. Стороны освобождаются от ответственности при форс-мажоре.</p>

            <h2 className="font-bold text-white mt-5 mb-2">5. Срок действия и прочие условия</h2>
            <p>5.1. Договор вступает в силу с момента подписания и действует до полного исполнения сторонами своих обязательств.</p>
            <p>5.2. Все споры решаются путём переговоров, а в случае недостижения согласия — в Арбитражном суде Нижегородской области.</p>
            <p>5.3. Договор составлен в 2-х экземплярах, имеющих равную юридическую силу.</p>

            <h2 className="font-bold text-white mt-5 mb-2">6. Реквизиты сторон</h2>
            <div className="row grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
              <div className="col">
                <p className="font-semibold text-white">Арендодатель:</p>
                <p>ООО «ФАВОРИТ»</p>
                <p>ИНН 5250077990 / КПП 525001001</p>
                <p>ОГРН 1235200013531</p>
                <p>607657, Нижегородская обл., г. Кстово, 6-й м-он, д. 2, оф. 13</p>
                <p>Р/с 40702810316020000009</p>
                <p>АО «АЛЬФА-БАНК»</p>
                <p>К/с 30101810200000000593, БИК 044525593</p>
                <p>Тел.: +7 960 188-30-84</p>
                <p className="sig mt-6 pt-2 border-t border-white/20 text-xs">Директор ___________________ / ___________ /</p>
              </div>
              <div className="col">
                <p className="font-semibold text-white">Арендатор:</p>
                <p>_______________________________</p>
                <p>ИНН _____________ / КПП ___________</p>
                <p>ОГРН ____________________________</p>
                <p>Адрес: __________________________</p>
                <p>Р/с _____________________________</p>
                <p>Банк: ___________________________</p>
                <p>К/с _____________________________</p>
                <p>БИК _____________________________</p>
                <p>Тел.: ___________________________</p>
                <p className="sig mt-6 pt-2 border-t border-white/20 text-xs">_______________________ / ___________ /</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 sm:px-7 py-4 border-t border-accent/20 bg-card flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Готовый договор пришлём на email после согласования заявки
          </p>
          <a
            href="tel:+79601883084"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/30"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)", color: "#111" }}
          >
            <Icon name="Phone" size={14} />
            Заказать договор: +7 960 188-30-84
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
