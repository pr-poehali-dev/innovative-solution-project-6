import Icon from "@/components/ui/icon";

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
      @media print { body { padding: 20px; } }
    </style></head>
    <body>${html}</body></html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 300);
};

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
    <tr><th>Email</th><td>960188@list.ru</td></tr>
    <tr><th>Телефон</th><td>+7 960 188-30-84, +7 960 169-09-90</td></tr>
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
  <div class="footer">
    Документ сформирован автоматически с сайта фаварит.рф. Для получения карточки предприятия с подписью и печатью обратитесь по телефону +7 960 188-30-84.
  </div>
`;

const priceHtml = `
  <h1>ПРАЙС-ЛИСТ НА АРЕНДУ ТЕХНИКИ</h1>
  <p style="text-align:center;font-size:13px;color:#666;">ООО «ФАВОРИТ» · Нижний Новгород · +7 960 188-30-84</p>

  <h2>Манипуляторы (КМУ)</h2>
  <table>
    <tr><th>Техника</th><th>Грузоподъёмность</th><th>Стрела</th><th>Цена, ₽/час</th></tr>
    <tr><td>ISUZU 5т + КМУ</td><td>до 5 т</td><td>до 8,5 м</td><td>2 200 ₽</td></tr>
    <tr><td>FAW J6 + DONGYANG 1966</td><td>до 8 т</td><td>до 19 м, люлька</td><td>2 600 ₽</td></tr>
    <tr><td>КАМАЗ 65115 + КМУ HANGIL</td><td>до 12 т</td><td>до 19 м</td><td>2 800 ₽</td></tr>
    <tr><td>FAW + КМУ DongYang</td><td>до 17 т</td><td>до 21 м, люлька</td><td>3 000 ₽</td></tr>
    <tr><td>Renault Lander + КМУ</td><td>до 10 т</td><td>до 18 м</td><td>3 200 ₽</td></tr>
    <tr><td>Hyundai Gold + КМУ 8т</td><td>до 8 т</td><td>до 18 м</td><td>3 200 ₽</td></tr>
    <tr><td>КАМАЗ 43118 + Kanglim вездеход</td><td>до 10 т</td><td>до 23 м, 6×6</td><td>3 500 ₽</td></tr>
  </table>

  <h2>Экскаваторы-погрузчики</h2>
  <table>
    <tr><th>Техника</th><th>Глубина копания</th><th>Цена, ₽/час</th></tr>
    <tr><td>JCB 3CX</td><td>до 5,4 м</td><td>1 800 ₽</td></tr>
    <tr><td>JCB 4CX</td><td>до 6,0 м</td><td>2 000 ₽</td></tr>
  </table>

  <h2>Условия аренды</h2>
  <ul>
    <li>Минимальный заказ — 4 часа работы техники</li>
    <li>Оператор включён в стоимость</li>
    <li>Подача техники — от 1 часа</li>
    <li>Работа без выходных, с 7:00 до 22:00</li>
    <li>Цены указаны с НДС 20%</li>
    <li>Для юр. лиц — безналичный расчёт, договор, закрывающие документы</li>
    <li>Для постоянных клиентов — индивидуальные тарифы</li>
  </ul>

  <div class="footer">
    Цены актуальны на дату формирования документа. Точную стоимость уточняйте у диспетчера: +7 960 188-30-84. Сайт: фаварит.рф
  </div>
`;

const DocumentsBlock = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
      <button
        type="button"
        onClick={() => printDoc("Карточка предприятия", cardHtml)}
        className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/15 hover:border-accent/60 transition-all text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
          <Icon name="Building2" size={16} className="text-accent" />
        </div>
        <div className="flex flex-col leading-tight min-w-0 flex-1">
          <span className="text-accent/80 text-[10px] font-bold uppercase tracking-wider">PDF · Реквизиты</span>
          <span className="text-white font-bold text-sm">Карточка предприятия</span>
        </div>
        <Icon name="Download" size={14} className="text-accent/60 group-hover:text-accent transition-colors flex-shrink-0" />
      </button>

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
    </div>
  );
};

export default DocumentsBlock;