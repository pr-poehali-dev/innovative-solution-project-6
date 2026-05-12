import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const notifications = [
  { name: "Иван", district: "Канавино", truck: "манипулятор 5 тонн", time: "2 минуты назад" },
  { name: "Алексей", district: "Автозаводский район", truck: "КАМАЗ 10 тонн", time: "7 минут назад" },
  { name: "Сергей", district: "Сормово", truck: "манипулятор с люлькой", time: "12 минут назад" },
  { name: "Дмитрий", district: "Нижегородский район", truck: "FAW 7 тонн", time: "18 минут назад" },
  { name: "Андрей", district: "Дзержинск", truck: "манипулятор 20 тонн", time: "23 минуты назад" },
  { name: "Михаил", district: "Бор", truck: "КАМАЗ со стрелой 23 м", time: "31 минута назад" },
  { name: "Николай", district: "Кстово", truck: "манипулятор 3 тонны", time: "38 минут назад" },
  { name: "Олег", district: "Приокский район", truck: "манипулятор с буром", time: "45 минут назад" },
  { name: "Павел", district: "Московский район", truck: "КАМАЗ 15 тонн", time: "52 минуты назад" },
  { name: "Виктор", district: "Ленинский район", truck: "манипулятор 5 тонн", time: "1 час назад" },
];

const OrderNotifications = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;

    const firstShow = setTimeout(() => setVisible(true), 8000);

    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 600);
    }, 14000);

    return () => {
      clearTimeout(firstShow);
      clearInterval(cycle);
    };
  }, [closed]);

  if (closed) return null;

  const n = notifications[index];

  return (
    <div
      className={`fixed left-3 sm:left-6 bottom-3 sm:bottom-6 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-sm transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-2xl border border-accent/30 bg-black/85 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent/15 flex items-center justify-center">
          <Icon name="Truck" size={20} className="text-accent" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-black animate-pulse" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Icon name="CheckCircle2" size={12} className="text-green-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-green-400">Новый заказ</span>
          </div>
          <div className="text-xs sm:text-sm text-white leading-snug">
            <span className="font-bold">{n.name}</span>
            <span className="text-white/70"> из </span>
            <span className="font-semibold">{n.district}</span>
          </div>
          <div className="text-[11px] sm:text-xs text-white/70 leading-snug mt-0.5">
            заказал <span className="text-accent font-medium">{n.truck}</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-white/40 mt-1 flex items-center gap-1">
            <Icon name="Clock" size={10} />
            {n.time}
          </div>
        </div>
        <button
          onClick={() => setClosed(true)}
          aria-label="Закрыть"
          className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrderNotifications;
