import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface ContractModalProps {
  open: boolean;
  onClose: () => void;
}

interface ContractData {
  contractNumber: string;
  date: string;
  tenantName: string;
  tenantInn: string;
  tenantKpp: string;
  tenantOgrn: string;
  tenantAddress: string;
  tenantAccount: string;
  tenantBank: string;
  tenantPhone: string;
  tenantSignatory: string;
  technique: string;
  workAddress: string;
  totalSum: string;
}

const today = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};

const monthName = (m: number) => {
  return [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ][m];
};

const formatDateLong = (iso: string) => {
  if (!iso) return "«___» __________ 20___ г.";
  const m = iso.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return iso;
  return `«${m[1]}» ${monthName(parseInt(m[2], 10) - 1)} ${m[3]} г.`;
};

const initial = (): ContractData => ({
  contractNumber: "",
  date: today(),
  tenantName: "",
  tenantInn: "",
  tenantKpp: "",
  tenantOgrn: "",
  tenantAddress: "",
  tenantAccount: "",
  tenantBank: "",
  tenantPhone: "",
  tenantSignatory: "",
  technique: "Манипулятор с экипажем (по согласованию)",
  workAddress: "",
  totalSum: "согласно прайс-листу",
});

const fld = (v: string, placeholder = "_______________________________") =>
  v && v.trim() ? v.trim() : placeholder;

const ContractModal = ({ open, onClose }: ContractModalProps) => {
  const [data, setData] = useState<ContractData>(initial);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");

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

  const buildHtml = () => `
    <h1 style="text-align:center;font-size:16pt;margin-bottom:8px;">ДОГОВОР АРЕНДЫ ТЕХНИКИ С ЭКИПАЖЕМ № ${fld(data.contractNumber, "___")}</h1>
    <p style="text-align:center;font-size:11pt;margin-bottom:18px;">г. Нижний Новгород · ${formatDateLong(data.date)}</p>

    <p><b>Общество с ограниченной ответственностью «ФАВОРИТ»</b> (ИНН 5250077990, ОГРН 1235200013531), именуемое в дальнейшем «Арендодатель», в лице директора, действующего на основании Устава, с одной стороны, и <b>${fld(data.tenantName)}</b>, в лице ${fld(data.tenantSignatory, "_______________________________")}, именуемый(ая) в дальнейшем «Арендатор», с другой стороны, заключили настоящий договор о нижеследующем:</p>

    <h2>1. Предмет договора</h2>
    <p>1.1. Арендодатель предоставляет Арендатору во временное владение и пользование транспортное средство с экипажем — <b>${fld(data.technique)}</b> для выполнения работ Арендатора по адресу: <b>${fld(data.workAddress, "_______________________________")}</b>.</p>
    <p>1.2. Арендодатель своими силами оказывает услуги по управлению техникой и её технической эксплуатации.</p>

    <h2>2. Стоимость и порядок оплаты</h2>
    <p>2.1. Стоимость аренды — <b>${fld(data.totalSum, "согласно действующему прайс-листу")}</b>.</p>
    <p>2.2. Минимальный заказ — 4 часа работы техники.</p>
    <p>2.3. Оплата производится наличными, переводом на расчётный счёт или картой. Для юр. лиц — по безналичному расчёту с НДС 22%.</p>
    <p>2.4. Закрывающие документы: акт выполненных работ, счёт-фактура, УПД (Диадок/СБИС).</p>

    <h2>3. Права и обязанности сторон</h2>
    <p>3.1. <b>Арендодатель обязуется:</b></p>
    <ul>
      <li>Подать исправную технику в согласованное время и место;</li>
      <li>Обеспечить квалифицированного оператора;</li>
      <li>Нести расходы по содержанию техники, ГСМ и страхованию;</li>
      <li>Соблюдать требования безопасности при выполнении работ.</li>
    </ul>
    <p>3.2. <b>Арендатор обязуется:</b></p>
    <ul>
      <li>Своевременно оплачивать услуги;</li>
      <li>Обеспечить условия для подъезда и работы техники;</li>
      <li>Не использовать технику для перевозки запрещённых грузов;</li>
      <li>Подписать акт выполненных работ по окончании смены.</li>
    </ul>

    <h2>4. Ответственность сторон</h2>
    <p>4.1. За несвоевременную оплату Арендатор уплачивает пени 0,1% от суммы задолженности за каждый день просрочки.</p>
    <p>4.2. Стороны освобождаются от ответственности при форс-мажоре.</p>

    <h2>5. Срок действия и прочие условия</h2>
    <p>5.1. Договор вступает в силу с момента подписания и действует до полного исполнения сторонами своих обязательств.</p>
    <p>5.2. Все споры решаются путём переговоров, а в случае недостижения согласия — в Арбитражном суде Нижегородской области.</p>
    <p>5.3. Договор составлен в 2-х экземплярах, имеющих равную юридическую силу.</p>

    <h2>6. Реквизиты сторон</h2>
    <table style="width:100%;border-collapse:collapse;margin-top:10px;">
      <tr>
        <td style="vertical-align:top;width:50%;padding:6px;border:1px solid #999;">
          <p><b>Арендодатель:</b></p>
          <p>ООО «ФАВОРИТ»</p>
          <p>ИНН 5250077990 / КПП 525001001</p>
          <p>ОГРН 1235200013531</p>
          <p>607657, Нижегородская обл., г. Кстово, 6-й м-он, д. 2, оф. 13</p>
          <p>Р/с 40702810316020000009</p>
          <p>АО «АЛЬФА-БАНК»</p>
          <p>К/с 30101810200000000593, БИК 044525593</p>
          <p>Тел.: +7 (960) 169-09-90</p>
          <p style="margin-top:30px;border-top:1px solid #000;padding-top:4px;">Директор ___________________ / ___________ /</p>
        </td>
        <td style="vertical-align:top;width:50%;padding:6px;border:1px solid #999;">
          <p><b>Арендатор:</b></p>
          <p>${fld(data.tenantName)}</p>
          <p>ИНН ${fld(data.tenantInn, "_____________")} / КПП ${fld(data.tenantKpp, "___________")}</p>
          <p>ОГРН ${fld(data.tenantOgrn, "____________________________")}</p>
          <p>Адрес: ${fld(data.tenantAddress, "__________________________")}</p>
          <p>Р/с ${fld(data.tenantAccount, "_____________________________")}</p>
          <p>Банк: ${fld(data.tenantBank, "____________________________")}</p>
          <p>Тел.: ${fld(data.tenantPhone, "_____________________________")}</p>
          <p style="margin-top:30px;border-top:1px solid #000;padding-top:4px;">Подпись ___________________ / ${fld(data.tenantSignatory, "___________")} /</p>
        </td>
      </tr>
    </table>
  `;

  const buildFullHtml = () => `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<title>Договор аренды техники — ООО ФАВОРИТ</title>
<style>
  @page { size: A4; margin: 18mm; }
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; padding: 20px; max-width: 800px; margin: 0 auto; background: #fff; }
  h1 { text-align: center; font-size: 16pt; margin-bottom: 8px; }
  h2 { font-size: 13pt; margin-top: 18px; margin-bottom: 6px; }
  p { margin: 4px 0; }
  ul { padding-left: 20px; margin: 6px 0; }
  table { border-collapse: collapse; }
  td, th { border: 1px solid #999; padding: 6px; vertical-align: top; }
  .actions { position: fixed; top: 12px; right: 12px; display: flex; gap: 8px; z-index: 100; background: #fff; padding: 6px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .actions button { padding: 8px 14px; background: #e8a820; color: #000; border: 0; border-radius: 8px; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 13px; }
  .actions button.secondary { background: #eee; color: #333; }
  @media print { .actions { display: none !important; } body { padding: 0; } }
</style>
</head>
<body>
<div class="actions">
  <button onclick="window.print()">Печать / PDF</button>
</div>
${buildHtml()}
<script>setTimeout(function(){ try { window.print(); } catch(e) {} }, 500);</script>
</body>
</html>`;

  const handlePrint = () => {
    // Способ 1: печать через скрытый iframe — работает везде, без popup-блокировки
    try {
      const existing = document.getElementById("contract-print-frame");
      if (existing) existing.remove();

      const iframe = document.createElement("iframe");
      iframe.id = "contract-print-frame";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.style.opacity = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error("no iframe doc");

      doc.open();
      doc.write(buildFullHtml());
      doc.close();

      const trigger = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          /* fallback ниже */
        }
      };
      // Дать время на загрузку шрифтов и таблиц
      setTimeout(trigger, 500);
    } catch (e) {
      // Запасной способ: скачать как HTML-файл (открывается и печатается в PDF в любом браузере)
      handleDownload();
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([buildFullHtml()], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Договор-аренды-техники-${data.contractNumber || "шаблон"}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      alert("Не удалось скачать договор. Попробуйте другой браузер.");
    }
  };

  const handleSend = async () => {
    if (sending) return;
    if (!data.tenantName.trim() || !data.tenantPhone.trim()) {
      alert("Заполните хотя бы наименование арендатора и телефон");
      return;
    }
    setSending(true);
    setSendStatus("idle");
    try {
      const res = await fetch(
        "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "contract", ...data }),
        }
      );
      if (res.ok) {
        setSendStatus("success");
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  const set = <K extends keyof ContractData>(key: K, value: ContractData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg bg-background/60 border border-accent/20 focus:border-accent/60 focus:outline-none text-white text-sm transition-colors";
  const labelCls = "text-[11px] font-bold uppercase tracking-wider text-accent/80 mb-1 block";

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
              <h2 className="text-white font-display font-bold text-base sm:text-lg truncate">
                Договор аренды техники
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center"
            aria-label="Закрыть"
          >
            <Icon name="X" size={16} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">
          <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 mb-5 text-sm text-white/85 flex gap-3">
            <Icon name="Info" size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <p>
              Заполните поля — договор сформируется автоматически. Можно оставить пустыми, тогда останутся прочерки. Нажмите «Скачать PDF» — откроется готовый документ для печати или сохранения в PDF.
            </p>
          </div>

          <h3 className="font-display font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Icon name="Building2" size={14} className="text-accent" />
            Данные арендатора
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="sm:col-span-2">
              <label className={labelCls}>Наименование / ФИО</label>
              <input
                className={inputCls}
                placeholder='ООО «Стройка» или Иванов Иван Иванович'
                value={data.tenantName}
                onChange={(e) => set("tenantName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>ИНН</label>
              <input
                className={inputCls}
                placeholder="5250000000"
                value={data.tenantInn}
                onChange={(e) => set("tenantInn", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>КПП (для юр. лиц)</label>
              <input
                className={inputCls}
                placeholder="525001001"
                value={data.tenantKpp}
                onChange={(e) => set("tenantKpp", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>ОГРН / ОГРНИП</label>
              <input
                className={inputCls}
                placeholder="1235200000000"
                value={data.tenantOgrn}
                onChange={(e) => set("tenantOgrn", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Телефон</label>
              <input
                className={inputCls}
                placeholder="+7 ___ ___-__-__"
                value={data.tenantPhone}
                onChange={(e) => set("tenantPhone", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Юридический адрес</label>
              <input
                className={inputCls}
                placeholder="г. Нижний Новгород, ул. ..., д. ..."
                value={data.tenantAddress}
                onChange={(e) => set("tenantAddress", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Расчётный счёт</label>
              <input
                className={inputCls}
                placeholder="40702810000000000000"
                value={data.tenantAccount}
                onChange={(e) => set("tenantAccount", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Банк</label>
              <input
                className={inputCls}
                placeholder="АО «...», БИК ..."
                value={data.tenantBank}
                onChange={(e) => set("tenantBank", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Подписант (ФИО)</label>
              <input
                className={inputCls}
                placeholder="Иванов И.И."
                value={data.tenantSignatory}
                onChange={(e) => set("tenantSignatory", e.target.value)}
              />
            </div>
          </div>

          <h3 className="font-display font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Icon name="ClipboardList" size={14} className="text-accent" />
            Параметры аренды
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>№ договора</label>
              <input
                className={inputCls}
                placeholder="123"
                value={data.contractNumber}
                onChange={(e) => set("contractNumber", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Дата (ДД.ММ.ГГГГ)</label>
              <input
                className={inputCls}
                placeholder={today()}
                value={data.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Техника</label>
              <input
                className={inputCls}
                placeholder="КАМАЗ 65115 + КМУ HANGIL"
                value={data.technique}
                onChange={(e) => set("technique", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Адрес работ</label>
              <input
                className={inputCls}
                placeholder="г. Нижний Новгород, ул. ..."
                value={data.workAddress}
                onChange={(e) => set("workAddress", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Стоимость</label>
              <input
                className={inputCls}
                placeholder="2 800 ₽/час с НДС или согласно прайс-листу"
                value={data.totalSum}
                onChange={(e) => set("totalSum", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Статус отправки */}
        {sendStatus !== "idle" && (
          <div
            className={`px-5 sm:px-7 py-3 text-sm font-semibold flex items-center gap-2 ${
              sendStatus === "success"
                ? "bg-emerald-500/10 border-t border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-t border-red-500/30 text-red-300"
            }`}
          >
            <Icon
              name={sendStatus === "success" ? "CircleCheck" : "TriangleAlert"}
              size={16}
            />
            {sendStatus === "success"
              ? "Договор отправлен директору на Avrora.888@bk.ru. Скоро с вами свяжутся."
              : "Не удалось отправить. Скачайте договор и отправьте вручную или позвоните."}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 px-5 sm:px-7 py-4 border-t border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
          <button
            type="button"
            onClick={() => {
              setData(initial());
              setSendStatus("idle");
            }}
            className="sm:flex-shrink-0 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            Очистить
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="sm:flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 text-white text-sm font-semibold transition-colors"
          >
            <Icon name="Download" size={16} className="text-accent" />
            Скачать
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="sm:flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 text-white text-sm font-semibold transition-colors"
          >
            <Icon name="Printer" size={16} className="text-accent" />
            Печать / PDF
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-black font-bold text-sm shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-wait"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
          >
            <Icon name={sending ? "Loader2" : "Send"} size={16} className={sending ? "animate-spin" : ""} />
            {sending ? "Отправляем..." : "Отправить директору"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;