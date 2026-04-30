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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      reachGoal("order_modal_open", { truck: truckName });
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setName("");
        setPhone("");
        setComment("");
        setStatus("idle");
      }, 300);
    }
    return () => { document.body.style.overflow = ""; };
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-background border border-accent/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition text-muted-foreground"
        >
          <Icon name="X" size={16} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-black mb-2">Заявка принята!</h3>
            <p className="text-muted-foreground mb-6">Перезвоним в течение 15 минут.</p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-accent text-black font-bold rounded-xl hover:bg-accent/90 transition"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black tracking-tighter mb-1">
              {title || "Оставить заявку"}
            </h3>
            {truckName && (
              <p className="text-sm text-accent mb-2">{truckName}</p>
            )}
            {calcSummary && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(232,168,32,0.10)", border: "1px solid rgba(232,168,32,0.3)", color: "#e8a820" }}>
                Расчёт: {calcSummary}
              </div>
            )}
            {!truckName && !calcSummary && (
              <p className="text-muted-foreground text-sm mb-6">Перезвоним в течение 15 минут</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 mt-3">
              <p className="text-[11px] text-white/60 mb-1 leading-snug text-center">
                Перезвоним за 15 минут · уточним детали · согласуем цену
              </p>
              <div className="relative">
                <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Имя или компания"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>
              <div className="relative">
                <Icon name="Phone" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="Телефон +7 (___) ___-__-__"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                />
              </div>
              <div className="relative">
                <Icon name="MessageSquare" size={14} className="absolute left-3 top-3 text-accent/70 pointer-events-none" />
                <textarea
                  placeholder="Что везём (груз, вес, размеры, подъездные пути для техники)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={2}
                  className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none leading-snug"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">Ошибка отправки. Позвоните нам: +7 960 188-30-84</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-gradient-to-r from-accent to-accent/80 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-accent/40 transition-all disabled:opacity-60 text-base"
              >
                {status === "loading" ? "Отправка..." : submitLabel || "Перезвоните мне"}
              </button>

              <p className="text-center text-[10px] text-muted-foreground/70 leading-snug">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" target="_blank" rel="noopener" className="text-accent/80 hover:text-accent hover:underline">
                  политикой конфиденциальности
                </a>
              </p>

              <p className="text-center text-xs text-muted-foreground">
                Или звоните напрямую:{" "}
                <a href="tel:+79601883084" className="text-accent hover:underline">
                  +7 960 188-30-84
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}