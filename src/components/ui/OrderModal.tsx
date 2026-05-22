import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/lib/metrika";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  truckName?: string;
  calcSummary?: string;
  submitLabel?: string;
  title?: string;
}

const SUBMIT_URL = "https://functions.poehali.dev/dc327032-aa41-4632-b107-a026d92ef031";

export default function OrderModal({ open, onClose, truckName, calcSummary, submitLabel, title }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      reachGoal("order_modal_open", { truck: truckName });
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      setTimeout(() => {
        setName("");
        setPhone("");
        setComment("");
        setStatus("idle");
        setShowExtra(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          comment: [truckName ? `Техника: ${truckName}` : "", calcSummary ? `Расчёт: ${calcSummary}` : "", comment].filter(Boolean).join("\n"),
        }),
      });
      if (res.ok) {
        setStatus("success");
        reachGoal("order_sent", { truck: truckName });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
      style={{ zIndex: 999999 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-background border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl shadow-black/50 my-2 sm:my-4 max-h-[calc(100vh-1rem)] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white z-10"
        >
          <Icon name="X" size={16} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="CheckCircle" size={28} className="text-green-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 flex items-center justify-center gap-2">Заявка принята <Icon name="Sparkles" size={20} className="text-accent" /></h3>
            <p className="text-muted-foreground mb-5 text-sm sm:text-base">Перезвоним в течение 15 минут.</p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-accent text-black font-bold rounded-xl hover:bg-accent/90 transition"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg sm:text-2xl font-black tracking-tighter pr-8 leading-tight">
              {title || "Оставить заявку"}
            </h3>
            {truckName && (
              <p className="text-xs sm:text-sm text-accent mt-1">{truckName}</p>
            )}
            {calcSummary && (
              <div className="mt-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold" style={{ background: "rgba(232,168,32,0.10)", border: "1px solid rgba(232,168,32,0.3)", color: "#e8a820" }}>
                {calcSummary}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3 sm:mt-4">
              <div className="relative">
                <Icon name="Phone" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                <input
                  type="tel"
                  inputMode="tel"
                  autoFocus
                  placeholder="+7 ___ ___-__-__"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/[0.07] border-2 border-accent/50 rounded-xl pl-10 pr-3 py-3 sm:py-3.5 text-white placeholder:text-white/50 text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-accent to-accent/80 text-black font-black rounded-xl hover:shadow-xl hover:shadow-accent/40 transition-all disabled:opacity-60 text-base shadow-lg shadow-accent/30"
              >
                {status === "loading" ? "Отправка..." : submitLabel || "Перезвоните мне"}
              </button>

              {!showExtra && (
                <button
                  type="button"
                  onClick={() => setShowExtra(true)}
                  className="text-xs text-accent/80 hover:text-accent underline self-center mt-0.5"
                >
                  + добавить имя и комментарий
                </button>
              )}

              {showExtra && (
                <>
                  <div className="relative">
                    <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Имя (необязательно)"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Icon name="MessageSquare" size={14} className="absolute left-3 top-3 text-accent/70 pointer-events-none" />
                    <textarea
                      placeholder="Комментарий (груз, объём, пожелания)"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={2}
                      className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent transition-all resize-none leading-snug"
                    />
                  </div>
                </>
              )}

              {status === "error" && (
                <p className="text-red-400 text-xs sm:text-sm">Ошибка отправки. Позвоните: +7 960 188-30-84</p>
              )}

              <p className="text-center text-[10px] text-muted-foreground/70 leading-snug mt-1">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" target="_blank" rel="noopener" className="text-accent/80 hover:text-accent hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}