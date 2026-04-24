// Безопасная отправка целей в Яндекс.Метрику.
// Работает даже если скрипт метрики ещё не загрузился или пользователь блокирует трекеры.

const COUNTER_ID = 108703358;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string, params?: Record<string, unknown>) => void;
  }
}

export type MetrikaGoal =
  | "phone_click"         // Клик по кнопке/ссылке с телефоном
  | "order_modal_open"    // Открыта модалка «Заказать»
  | "callback_modal_open" // Открыта модалка «Перезвоните мне»
  | "order_sent"          // Успешно отправлена заявка через OrderModal
  | "callback_sent"       // Успешно отправлена заявка обратного звонка
  | "calc_order"          // Клиент нажал «Заказать» в калькуляторе
  | "whatsapp_click"      // Клик по WhatsApp
  | "telegram_click";     // Клик по Telegram

export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(COUNTER_ID, "reachGoal", goal, params);
    }
  } catch {
    // Тихо игнорируем ошибки, чтобы не ломать UX
  }
}
