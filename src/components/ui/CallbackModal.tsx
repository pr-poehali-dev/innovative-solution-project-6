import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../../backend/func2url.json";
import { reachGoal } from "@/lib/metrika";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
}

const CallbackModal = ({ open, onClose }: CallbackModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) reachGoal("callback_modal_open");
  }, [open]);

  if (!open) return null;

  const close = () => {
    if (status === "loading") return;
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setStatus("idle");
      setError("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 6) {
      setError("Укажите имя и телефон");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(func2url["submit-lead"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          comment: "Запрос обратного звонка из сайта",
        }),
      });
      if (!res.ok) throw new Error("Не удалось отправить заявку");
      setStatus("success");
      reachGoal("callback_sent");
      setTimeout(() => close(), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-accent/30 p-6 sm:p-8 shadow-2xl"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Закрыть"
        >
          <Icon name="X" size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/40 flex items-center justify-center">
            <Icon name="PhoneCall" size={22} className="text-accent" />
          </div>
          <div>
            <div className="text-accent text-xs font-semibold uppercase tracking-widest">Обратный звонок</div>
            <div className="text-white font-bold text-lg">Перезвоним вам</div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-5">
          Оставьте имя и телефон — перезвоним в течение 10 минут, уточним задачу и подберём технику.
        </p>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center mx-auto mb-3">
              <Icon name="Check" size={28} className="text-green-400" />
            </div>
            <p className="text-white font-bold text-base mb-1">Заявка принята!</p>
            <p className="text-muted-foreground text-sm">Перезвоним в ближайшее время</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label htmlFor="callback-name" className="text-xs text-muted-foreground font-medium mb-1.5 block">
                Ваше имя
              </label>
              <input
                id="callback-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setStatus("idle");
                  setError("");
                }}
                placeholder="Как к вам обращаться"
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/60 focus:outline-none text-white placeholder:text-muted-foreground/70 text-sm"
              />
            </div>
            <div>
              <label htmlFor="callback-phone" className="text-xs text-muted-foreground font-medium mb-1.5 block">
                Телефон
              </label>
              <input
                id="callback-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setStatus("idle");
                  setError("");
                }}
                placeholder="+7 ___ ___-__-__"
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/60 focus:outline-none text-white placeholder:text-muted-foreground/70 text-sm tabular-nums"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm mt-2 shadow-lg shadow-accent/30 transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)", color: "#111" }}
            >
              {status === "loading" ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="PhoneCall" size={16} />
                  Жду звонка
                </>
              )}
            </button>

            <p className="text-[10px] text-muted-foreground/60 text-center leading-snug mt-1">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default CallbackModal;