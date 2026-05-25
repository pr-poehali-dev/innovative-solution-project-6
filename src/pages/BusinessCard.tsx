import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";

const TRUCK_IMG =
  "https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/2f4102ac-af01-48a9-8eda-03807a4783a7.jpg";

const SPECS = [
  { icon: "ArrowUpRight", label: "Стрела", value: "г/п 8 тонн" },
  { icon: "Ruler", label: "Вылет стрелы", value: "20 метров" },
  { icon: "Truck", label: "Борт", value: "г/п 35 т, длина 10 м" },
  { icon: "Users", label: "Доп. оборудование", value: "Люлька (автовышка)" },
  { icon: "CreditCard", label: "Форма оплаты", value: "Любая · НДС · ЭДО" },
];

const BusinessCard = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Визитка ООО «Фаворит» — Аренда манипулятора в Нижнем Новгороде";
  }, []);

  const handleSavePhone = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Фаворит — Аренда манипулятора",
      "ORG:ООО «Фаворит»",
      "TITLE:Аренда манипулятора и спецтехники",
      "TEL;TYPE=CELL,VOICE:+79601883084",
      "TEL;TYPE=WORK,VOICE:+79601690990",
      "EMAIL:Avrora.888@bk.ru",
      "ADR;TYPE=WORK:;;Шуваловский проезд, 7;Нижний Новгород;;603035;Россия",
      "URL:https://фаварит.рф",
      "NOTE:Манипулятор 8т · Стрела 20м · Борт 35т 10м · Люлька · 24/7",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "favorit-manipulyator.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    reachGoal("phone_click", { source: "vcard_save" });
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+79601883084");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-3 py-6 sm:py-10"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(232,168,32,0.15) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Сама визитка */}
        <div
          className="relative rounded-3xl p-[2px] shadow-2xl shadow-amber-500/30"
          style={{
            background:
              "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
          }}
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 overflow-hidden">
            {/* Декоративные пятна */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-amber-700/20 blur-3xl pointer-events-none" />

            {/* Шапка */}
            <div className="relative px-5 pt-6 pb-4 text-center">
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Работаем 24/7
              </div>
              <h1
                className="text-2xl sm:text-3xl font-black text-white mb-1 leading-tight"
                style={{
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.04em",
                }}
              >
                Аренда манипулятора
              </h1>
              <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-widest">
                Нижний Новгород · ООО «Фаворит»
              </p>
            </div>

            {/* Фото техники */}
            <div className="relative mx-4 rounded-2xl overflow-hidden border border-accent/30">
              <img
                src={TRUCK_IMG}
                alt="Манипулятор FAW 8 тонн"
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/70 font-bold">
                    Наша техника
                  </div>
                  <div className="text-sm font-black text-white">
                    FAW J6P-380 + DongYang
                  </div>
                </div>
                <div
                  className="text-[10px] px-2 py-1 rounded-full font-black text-black"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  }}
                >
                  8 т
                </div>
              </div>
            </div>

            {/* Характеристики */}
            <div className="relative px-5 py-5">
              <ul className="space-y-2.5">
                {SPECS.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-start gap-3 pb-2.5 border-b border-accent/15 last:border-0 last:pb-0"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={s.icon} size={13} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-white/55 font-bold">
                        {s.label}
                      </div>
                      <div className="text-sm text-white font-bold leading-snug">
                        {s.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Телефон — главный CTA */}
            <div className="relative px-4 pb-4">
              <a
                href="tel:+79601883084"
                onClick={() => reachGoal("phone_click", { source: "vcard" })}
                className="group relative block w-full rounded-2xl overflow-hidden shadow-xl shadow-amber-500/40 active:scale-[0.98] transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <div className="relative px-5 py-4 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/15 flex items-center justify-center">
                    <Icon
                      name="Phone"
                      size={20}
                      className="text-black animate-pulse"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-widest text-black/70 font-black">
                      Позвонить
                    </div>
                    <div
                      className="text-xl font-black text-black tabular-nums leading-tight"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      +7 (960) 188-30-84
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Нижняя строка */}
            <div className="relative px-5 pb-5 flex items-center justify-between gap-2 text-[10px] text-white/55">
              <span className="inline-flex items-center gap-1">
                <Icon name="Globe" size={11} className="text-accent" />
                фаварит.рф
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="MapPin" size={11} className="text-accent" />
                Шуваловский пр., 7
              </span>
            </div>
          </div>
        </div>

        {/* Действия под визиткой */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleSavePhone}
            className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-accent/40 bg-white/[0.04] text-accent text-xs font-bold hover:bg-accent/10 transition-all"
          >
            <Icon name="UserPlus" size={14} />
            В контакты
          </button>
          <button
            type="button"
            onClick={handleCopyPhone}
            className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white/85 text-xs font-bold hover:bg-white/10 transition-all"
          >
            <Icon name={copied ? "Check" : "Copy"} size={14} />
            {copied ? "Скопировано" : "Скопировать"}
          </button>
        </div>

        {/* Второй номер */}
        <a
          href="tel:+79601690990"
          onClick={() => reachGoal("phone_click", { source: "vcard_second" })}
          className="mt-2.5 flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
              <Icon name="Construction" size={14} className="text-accent" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/55 font-bold">
                Асфальтирование
              </div>
              <div className="text-sm text-white font-black tabular-nums">
                +7 (960) 169-09-90
              </div>
            </div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-accent" />
        </a>

        {/* Возврат на сайт */}
        <a
          href="/"
          className="mt-4 flex items-center justify-center gap-1.5 text-white/55 text-xs hover:text-accent transition-colors"
        >
          <Icon name="ArrowLeft" size={12} />
          На главную сайта
        </a>
      </div>
    </div>
  );
};

export default BusinessCard;
