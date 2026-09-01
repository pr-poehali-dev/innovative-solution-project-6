// Безопасная отправка целей в Яндекс.Метрику.
// Работает даже если скрипт метрики ещё не загрузился или пользователь блокирует трекеры.

const COUNTER_ID = 108703358;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string, params?: Record<string, unknown>) => void;
  }
}

export type MetrikaGoal =
  | "phone_click"         // Клик по кнопке/ссылке с телефоном (главная цель — 150₽)
  | "order_modal_open"    // Открыта модалка «Заказать» (микро — 50₽)
  | "callback_modal_open" // Открыта модалка «Перезвоните мне» (микро — 50₽)
  | "order_sent"          // ★ Успешно отправлена заявка через OrderModal (★ 500₽)
  | "callback_sent"       // ★ Успешно отправлена заявка обратного звонка (★ 400₽)
  | "hero_lead_sent"      // ★ Успешно отправлена заявка из формы в Hero (★ 500₽)
  | "calc_order"          // Клиент нажал «Заказать» в калькуляторе (★ 400₽)
  | "calc_opened"         // Пользователь открыл/использовал калькулятор (микро — 30₽)
  | "whatsapp_click"      // Клик по WhatsApp (★ 200₽)
  | "telegram_click"      // Клик по Telegram (★ 200₽)
  | "max_click"           // Клик по мессенджеру MAX (★ 200₽)
  | "fleet_view"          // Просмотр карточки техники / переход на /truck (50₽)
  | "scroll_75"           // Глубокий скролл (вовлечённость 30₽)
  | "long_session";       // Сессия 60+ секунд (вовлечённость 30₽)

export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(COUNTER_ID, "reachGoal", goal, params);
    }
  } catch {
    // Тихо игнорируем ошибки, чтобы не ломать UX
  }
}