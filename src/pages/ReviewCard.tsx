import { useState } from "react";
import Icon from "@/components/ui/icon";

const YANDEX_URL = "https://yandex.ru/search/?text=фаварит.рф+отзывы";
const PHONE_DISPLAY = "+7 960 188-30-84";
const PHONE_TEL = "+79601883084";

const SHARE_TEXT =
  "Здравствуйте! Спасибо, что выбрали ООО «ФАВОРИТ». Будем благодарны за честный отзыв о нашей работе. Оставить отзыв на Яндексе: " +
  YANDEX_URL;

const ReviewCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Не удалось скопировать. Скопируйте текст вручную.");
    }
  };

  const wa = `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(YANDEX_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`;

  return (
    <div
      className="min-h-screen py-6 px-4"
      style={{
        background: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0fdfa 100%)",
      }}
    >
      {/* Кнопки управления */}
      <div className="max-w-[520px] mx-auto mb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
        <button
          onClick={handleCopy}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
            boxShadow: "0 8px 24px rgba(13,148,136,0.4)",
          }}
        >
          <Icon name={copied ? "Check" : "Copy"} size={16} />
          {copied ? "Скопировано!" : "Скопировать текст"}
        </button>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-sm"
          style={{ background: "#25D366" }}
        >
          <Icon name="MessageCircle" size={16} />
          Ватсап
        </a>
        <a
          href={tg}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm shadow-sm"
          style={{ background: "#229ED9" }}
        >
          <Icon name="Send" size={16} />
          Телеграм
        </a>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-700 text-sm bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </a>
      </div>

      {/* Превью карточки */}
      <div
        className="max-w-[520px] mx-auto rounded-2xl overflow-hidden border-2"
        style={{
          borderColor: "rgba(13,148,136,0.55)",
          background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f0fdfa 100%)",
          boxShadow: "0 20px 60px rgba(13,148,136,0.15)",
        }}
      >
        {/* Шапка */}
        <div className="px-7 pt-7 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-black tracking-wider text-teal-700">
              ООО «ФАВОРИТ»
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              аренда манипуляторов · Нижний Новгород
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Сайт</div>
            <div className="text-[14px] font-bold text-amber-700 mt-1">фаварит.рф</div>
          </div>
        </div>

        <div className="mx-7 mt-4 border-t" style={{ borderColor: "rgba(13,148,136,0.3)" }} />

        {/* Бейдж */}
        <div className="flex justify-center mt-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider"
            style={{
              background: "rgba(45,212,191,0.2)",
              border: "1px solid rgba(13,148,136,0.5)",
              color: "#0d9488",
            }}
          >
            <Icon name="Star" size={12} />
            СПАСИБО ЗА ВАШ ВЫБОР
          </div>
        </div>

        {/* Заголовок */}
        <h1
          className="text-center font-black text-slate-900 mt-5 px-6 leading-tight"
          style={{ fontSize: "26px" }}
        >
          Оставьте отзыв
          <br />о нашей работе
        </h1>

        {/* Текст благодарности */}
        <div className="px-7 mt-4 text-center">
          <p className="text-[14px] text-slate-600 leading-relaxed">
            Ваш честный отзыв — лучшая благодарность для нашей команды
            и помощь другим клиентам в выборе.
          </p>
        </div>

        {/* Звёзды */}
        <div className="flex justify-center gap-2 mt-5 text-3xl">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} role="img" aria-label="star">
              ⭐
            </span>
          ))}
        </div>

        {/* Кнопка Яндекс */}
        <div className="px-7 mt-6">
          <a
            href={YANDEX_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-transform active:scale-[0.98] hover:scale-[1.01]"
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              borderColor: "rgba(180,83,9,0.45)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/80 shadow-sm"
                style={{ color: "#b45309" }}
              >
                <Icon name="Star" size={22} />
              </div>
              <div>
                <div
                  className="text-[10px] font-bold tracking-wider uppercase"
                  style={{ color: "#b45309" }}
                >
                  Оставить отзыв
                </div>
                <div className="text-[16px] font-black" style={{ color: "#b45309" }}>
                  на Яндексе
                </div>
              </div>
            </div>
            <Icon name="ArrowRight" size={22} style={{ color: "#b45309" }} />
          </a>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            Откроется поиск Яндекса по запросу «фаварит.рф»
          </p>
        </div>

        {/* Контакт */}
        <div
          className="mx-7 my-6 border-t pt-5"
          style={{ borderColor: "rgba(13,148,136,0.3)" }}
        >
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center justify-between rounded-xl px-5 py-4 border"
            style={{
              background: "rgba(45,212,191,0.25)",
              borderColor: "rgba(13,148,136,0.5)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 shadow-sm text-teal-700">
                <Icon name="Phone" size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-teal-800 uppercase">
                  Связаться с нами
                </div>
                <div className="text-[16px] font-black text-slate-900">
                  {PHONE_DISPLAY}
                </div>
              </div>
            </div>
            <Icon name="ArrowRight" size={20} className="text-teal-700" />
          </a>

          <div
            className="mt-3 rounded-xl px-4 py-2.5 border flex items-center justify-between"
            style={{
              background: "rgba(45,212,191,0.18)",
              borderColor: "rgba(13,148,136,0.4)",
            }}
          >
            <span className="text-[11px] font-medium text-slate-600">
              Подробнее на сайте:
            </span>
            <span className="text-[13px] font-bold text-amber-700">фаварит.рф</span>
          </div>
        </div>
      </div>

      <p className="max-w-[520px] mx-auto mt-4 text-center text-xs text-slate-500">
        Откройте на телефоне клиента или отправьте через WhatsApp / Telegram
      </p>
    </div>
  );
};

export default ReviewCard;