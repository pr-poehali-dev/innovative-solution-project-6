import { useState } from "react";
import Icon from "@/components/ui/icon";
import ContractModal from "@/components/ui/ContractModal";

const printDoc = (title: string, html: string) => {
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(`
    <html><head><title>${title} — ООО ФАВОРИТ</title>
    <style>
      body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; color: #000; }
      h1 { text-align: center; font-size: 18px; margin-bottom: 24px; }
      h2 { font-size: 14px; margin-top: 18px; border-bottom: 1px solid #999; padding-bottom: 4px; }
      table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
      th, td { border: 1px solid #999; padding: 6px 8px; text-align: left; }
      th { background: #f0f0f0; }
      p, li { font-size: 13px; }
      .row { display: flex; justify-content: space-between; gap: 30px; margin-top: 14px; }
      .col { flex: 1; }
      .label { color: #666; font-size: 11px; text-transform: uppercase; }
      .value { font-weight: bold; }
      .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #999; font-size: 11px; color: #666; }
      .qr-block { display: flex; gap: 24px; margin-top: 24px; padding: 16px; border: 1px solid #999; border-radius: 8px; align-items: center; justify-content: center; flex-wrap: wrap; }
      .qr-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
      .qr-item img { width: 110px; height: 110px; border: 1px solid #ddd; }
      .qr-item .qr-label { font-size: 11px; color: #333; font-weight: bold; text-align: center; }
      .qr-item .qr-sub { font-size: 10px; color: #666; text-align: center; }
      @media print { body { padding: 20px; } .qr-block { page-break-inside: avoid; } }
    </style></head>
    <body>${html}</body></html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 300);
};

const QR_API = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=";
const qrPhone = `${QR_API}${encodeURIComponent("tel:+79601690990")}`;
const qrSite = `${QR_API}${encodeURIComponent("https://фаварит.рф")}`;
const qrEmail = `${QR_API}${encodeURIComponent("mailto:Avrora.888@bk.ru")}`;

const qrBlockHtml = `
  <div class="qr-block">
    <div class="qr-item">
      <img src="${qrPhone}" alt="QR Телефон" />
      <div class="qr-label">Позвонить</div>
      <div class="qr-sub">+7 960 169-09-90</div>
    </div>
    <div class="qr-item">
      <img src="${qrSite}" alt="QR Сайт" />
      <div class="qr-label">Открыть сайт</div>
      <div class="qr-sub">фаварит.рф</div>
    </div>
    <div class="qr-item">
      <img src="${qrEmail}" alt="QR Email" />
      <div class="qr-label">Написать на email</div>
      <div class="qr-sub">Avrora.888@bk.ru</div>
    </div>
  </div>
`;

const cardHtml = `
  <h1>КАРТОЧКА ПРЕДПРИЯТИЯ</h1>
  <p style="text-align:center;font-size:13px;color:#666;">Действительна на дату выдачи</p>
  <h2>Реквизиты организации</h2>
  <table>
    <tr><th style="width:40%">Полное наименование</th><td>Общество с ограниченной ответственностью «ФАВОРИТ»</td></tr>
    <tr><th>Сокращённое наименование</th><td>ООО «ФАВОРИТ»</td></tr>
    <tr><th>ИНН</th><td>5250077990</td></tr>
    <tr><th>КПП</th><td>525001001</td></tr>
    <tr><th>ОГРН</th><td>1235200013531</td></tr>
    <tr><th>Юридический адрес</th><td>607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13</td></tr>
    <tr><th>Фактический адрес</th><td>г. Нижний Новгород, Шуваловский проезд, 7</td></tr>
    <tr><th>Email</th><td>Avrora.888@bk.ru</td></tr>
    <tr><th>Телефон</th><td>+7 960 169-09-90</td></tr>
    <tr><th>Сайт</th><td>https://фаварит.рф</td></tr>
  </table>
  <h2>Банковские реквизиты</h2>
  <table>
    <tr><th style="width:40%">Расчётный счёт</th><td>40702810316020000009</td></tr>
    <tr><th>Банк</th><td>АО «АЛЬФА-БАНК»</td></tr>
    <tr><th>Корреспондентский счёт</th><td>30101810200000000593</td></tr>
    <tr><th>БИК</th><td>044525593</td></tr>
  </table>
  <h2>Деятельность</h2>
  <p>Аренда манипуляторов и спецтехники с экипажем. Работа с НДС, полный электронный документооборот (Диадок/СБИС), договор для юридических лиц, закрывающие документы (УПД, акт, счёт-фактура).</p>
  <h2>Быстрая связь · QR-коды</h2>
  ${qrBlockHtml}
  <div class="footer">
    Документ сформирован автоматически с сайта фаварит.рф. Для получения карточки предприятия с подписью и печатью обратитесь по телефону +7 960 169-09-90.
  </div>
`;

const priceHtml = `
  <h1>ПРАЙС-ЛИСТ НА АРЕНДУ ТЕХНИКИ</h1>
  <p style="text-align:center;font-size:13px;color:#666;">ООО «ФАВОРИТ» · Нижний Новгород · +7 960 169-09-90</p>

  <h2>Манипуляторы (КМУ) · цены с НДС 22%</h2>
  <table>
    <tr><th>Техника</th><th>Грузоподъёмность</th><th>Стрела</th><th>1 час</th><th>Смена (8 ч)</th><th>Сутки (24 ч)</th></tr>
    <tr><td>ISUZU 5т + КМУ</td><td>до 5 т</td><td>до 8,5 м</td><td>2 200 ₽</td><td>16 720 ₽</td><td>44 880 ₽</td></tr>
    <tr><td>FAW J6 + DONGYANG 1966</td><td>до 8 т</td><td>до 19 м, люлька</td><td>2 600 ₽</td><td>19 760 ₽</td><td>53 040 ₽</td></tr>
    <tr><td>КАМАЗ 65115 + КМУ HANGIL</td><td>до 12 т</td><td>до 19 м</td><td>2 800 ₽</td><td>21 280 ₽</td><td>57 120 ₽</td></tr>
    <tr><td>FAW + КМУ DongYang</td><td>до 17 т</td><td>до 21 м, люлька</td><td>3 000 ₽</td><td>22 800 ₽</td><td>61 200 ₽</td></tr>
    <tr><td>Renault Lander + КМУ</td><td>до 10 т</td><td>до 18 м</td><td>3 200 ₽</td><td>24 320 ₽</td><td>65 280 ₽</td></tr>
    <tr><td>Hyundai Gold + КМУ 8т</td><td>до 8 т</td><td>до 18 м</td><td>3 200 ₽</td><td>24 320 ₽</td><td>65 280 ₽</td></tr>
    <tr><td>КАМАЗ 43118 + Kanglim вездеход</td><td>до 10 т</td><td>до 23 м, 6×6</td><td>3 500 ₽</td><td>26 600 ₽</td><td>71 400 ₽</td></tr>
  </table>
  <p style="font-size:11px;color:#666;margin-top:6px;">
    Смена (8 ч) — скидка 5%. Сутки (24 ч) — скидка 15%. Для постоянных клиентов — индивидуальные тарифы.
  </p>

  <h2>Экскаваторы-погрузчики · цены с НДС 22%</h2>
  <table>
    <tr><th>Техника</th><th>Глубина копания</th><th>1 час</th><th>Смена (8 ч)</th><th>Сутки (24 ч)</th></tr>
    <tr><td>JCB 3CX</td><td>до 5,4 м</td><td>1 800 ₽</td><td>13 680 ₽</td><td>36 720 ₽</td></tr>
    <tr><td>JCB 4CX</td><td>до 6,0 м</td><td>2 000 ₽</td><td>15 200 ₽</td><td>40 800 ₽</td></tr>
  </table>

  <h2>Цены без НДС (база)</h2>
  <table>
    <tr><th>Техника</th><th>1 час</th><th>Смена (8 ч)</th><th>Сутки (24 ч)</th></tr>
    <tr><td>ISUZU 5т + КМУ</td><td>1 800 ₽</td><td>13 700 ₽</td><td>36 790 ₽</td></tr>
    <tr><td>FAW J6 + DONGYANG 1966</td><td>2 130 ₽</td><td>16 200 ₽</td><td>43 480 ₽</td></tr>
    <tr><td>КАМАЗ 65115 + КМУ HANGIL</td><td>2 300 ₽</td><td>17 440 ₽</td><td>46 820 ₽</td></tr>
    <tr><td>FAW + КМУ DongYang</td><td>2 460 ₽</td><td>18 690 ₽</td><td>50 160 ₽</td></tr>
    <tr><td>Renault Lander + КМУ</td><td>2 620 ₽</td><td>19 930 ₽</td><td>53 510 ₽</td></tr>
    <tr><td>Hyundai Gold + КМУ 8т</td><td>2 620 ₽</td><td>19 930 ₽</td><td>53 510 ₽</td></tr>
    <tr><td>КАМАЗ 43118 + Kanglim вездеход</td><td>2 870 ₽</td><td>21 800 ₽</td><td>58 520 ₽</td></tr>
    <tr><td>JCB 3CX</td><td>1 480 ₽</td><td>11 210 ₽</td><td>30 100 ₽</td></tr>
    <tr><td>JCB 4CX</td><td>1 640 ₽</td><td>12 460 ₽</td><td>33 440 ₽</td></tr>
  </table>

  <h2>Дополнительные услуги · цены с НДС 22%</h2>
  <table>
    <tr><th>Услуга</th><th>Стоимость</th></tr>
    <tr><td>Подача техники по Нижнему Новгороду (в пределах города)</td><td>бесплатно</td></tr>
    <tr><td>Выезд за пределы города (Нижегородская обл.)</td><td>от 50 ₽/км</td></tr>
    <tr><td>Работа в выходные / праздничные дни</td><td>+10% к тарифу</td></tr>
    <tr><td>Ночные работы (с 22:00 до 7:00)</td><td>+25% к тарифу</td></tr>
    <tr><td>Срочная подача (менее 1 часа)</td><td>+500 ₽ к смене</td></tr>
    <tr><td>Простой техники по вине заказчика</td><td>50% от тарифа/час</td></tr>
    <tr><td>Работа с люлькой (монтажная корзина)</td><td>+300 ₽/час</td></tr>
    <tr><td>Перевес груза / нестандартный груз</td><td>по согласованию</td></tr>
    <tr><td>Сопровождение крупногабаритных грузов</td><td>от 1 500 ₽/час</td></tr>
  </table>
  <p style="font-size:11px;color:#666;margin-top:6px;">
    Все услуги выполняются с опытным оператором. Аренда техники без оператора не предоставляется.
  </p>

  <h2>Условия аренды</h2>
  <ul>
    <li>Минимальный заказ — 4 часа работы техники</li>
    <li>Оператор включён в стоимость</li>
    <li>Подача техники — от 1 часа</li>
    <li>Работа без выходных, с 7:00 до 22:00</li>
    <li>Цены указаны с НДС 22%</li>
    <li>Для юр. лиц — безналичный расчёт, договор, закрывающие документы</li>
    <li>Для постоянных клиентов — индивидуальные тарифы</li>
  </ul>

  <h2>Быстрый заказ · QR-коды</h2>
  ${qrBlockHtml}

  <div class="footer">
    Цены актуальны на дату формирования документа. Точную стоимость уточняйте у диспетчера: +7 960 169-09-90. Сайт: фаварит.рф
  </div>
`;

const DocumentsBlock = () => {
  const [contractOpen, setContractOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
      <button
        type="button"
        onClick={() => printDoc("Прайс-лист", priceHtml)}
        className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
          <Icon name="ListChecks" size={16} className="text-accent" />
        </div>
        <div className="flex flex-col leading-tight min-w-0 flex-1">
          <span className="text-accent/80 text-[10px] font-bold uppercase tracking-wider">PDF · Цены</span>
          <span className="text-white font-bold text-sm">Прайс-лист на технику</span>
        </div>
        <Icon name="Download" size={14} className="text-accent/60 group-hover:text-accent transition-colors flex-shrink-0" />
      </button>

      <button
        type="button"
        onClick={() => setContractOpen(true)}
        className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
          <Icon name="FileText" size={16} className="text-accent" />
        </div>
        <div className="flex flex-col leading-tight min-w-0 flex-1">
          <span className="text-accent/80 text-[10px] font-bold uppercase tracking-wider">PDF · Договор</span>
          <span className="text-white font-bold text-sm">Договор аренды техники</span>
        </div>
        <Icon name="Download" size={14} className="text-accent/60 group-hover:text-accent transition-colors flex-shrink-0" />
      </button>

      <ContractModal open={contractOpen} onClose={() => setContractOpen(false)} />
    </div>
  );
};

export default DocumentsBlock;