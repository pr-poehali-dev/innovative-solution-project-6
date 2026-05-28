import { useEffect } from "react";
import { reachGoal } from "@/lib/metrika";

/**
 * Глобальный трекер вовлечённости для Яндекс.Метрики.
 * Отправляет цели:
 * - scroll_75: пользователь прокрутил 75% страницы (1 раз за сессию)
 * - long_session: пользователь провёл на сайте 60+ секунд (1 раз за сессию)
 *
 * Эти микро-цели помогают алгоритмам Директа обучаться
 * на качественной аудитории, а не только на горячих лидах.
 */
const EngagementTracker = () => {
  useEffect(() => {
    let scrollSent = false;
    let sessionSent = false;

    const handleScroll = () => {
      if (scrollSent) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = (scrollTop / docHeight) * 100;
      if (percent >= 75) {
        scrollSent = true;
        reachGoal("scroll_75", { percent: Math.round(percent) });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const sessionTimer = window.setTimeout(() => {
      if (!sessionSent) {
        sessionSent = true;
        reachGoal("long_session", { seconds: 60 });
      }
    }, 60000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(sessionTimer);
    };
  }, []);

  return null;
};

export default EngagementTracker;
