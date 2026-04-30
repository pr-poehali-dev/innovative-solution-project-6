import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "./heroData";

const HeroLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cargo, setCargo] = useState("");
  const [fromAddr, setFromAddr] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    try {
      const commentParts = [
        cargo && `Груз: ${cargo}`,
        fromAddr && `Откуда: ${fromAddr}`,
        toAddr && `Куда: ${toAddr}`,
      ].filter(Boolean);
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment: commentParts.join(" · ") }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setCargo("");
        setFromAddr("");
        setToAddr("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative rounded-2xl p-[2px] overflow-hidden" style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}>
        <div className="bg-background rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircle" size={22} className="text-accent" />
          </div>
          <div>
            <p className="font-black text-white text-base">Заявка принята!</p>
            <p className="text-xs text-white/70">Перезвоним в ближайшие 5 минут.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" id="order">
      {/* Мягкое золотое свечение */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-30 blur-md pointer-events-none animate-pulse"
        style={{ background: "linear-gradient(135deg, #e8a820 0%, transparent 50%, #e8a820 100%)" }}
      />

      {/* Золотая рамка-градиент */}
      <div className="relative rounded-2xl p-[1.5px]" style={{ background: "linear-gradient(135deg, rgba(245,208,96,0.9) 0%, rgba(232,168,32,0.3) 50%, rgba(232,168,32,0.8) 100%)" }}>
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-950 via-background to-black p-3.5 sm:p-4 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-[11px] text-white/60 mb-2 leading-snug text-center">
              Перезвоним за 5 минут · рассчитаем цену · подберём технику
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
              <div className="flex flex-col sm:flex-row gap-1.5">
                <div className="relative flex-1">
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
                <div className="relative flex-1">
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
              </div>
              <div className="flex flex-col sm:flex-row gap-1.5">
                <div className="relative flex-1">
                  <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Откуда (адрес погрузки)"
                    value={fromAddr}
                    onChange={e => setFromAddr(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="relative flex-1">
                  <Icon name="Flag" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Куда (адрес разгрузки)"
                    value={toAddr}
                    onChange={e => setToAddr(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  />
                </div>
              </div>
              <div className="relative">
                <Icon name="Package" size={14} className="absolute left-3 top-3 text-accent/70 pointer-events-none" />
                <textarea
                  rows={2}
                  placeholder="Что везём (груз, вес, размеры, подъездные пути для техники)"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none leading-snug"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative mt-0.5 w-full px-5 py-3 rounded-lg font-black text-sm sm:text-base flex items-center gap-2 justify-center transition-all disabled:opacity-60 active:scale-[0.98] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  color: "#000",
                  boxShadow: "0 4px 18px rgba(232,168,32,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.03em",
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                {status === "loading" ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="relative">Отправка...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Оставить заявку</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">Ошибка отправки, попробуйте ещё раз или позвоните.</p>
              )}

              <p className="text-[10px] text-white/50 text-center leading-snug mt-0.5">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" target="_blank" rel="noopener" className="text-accent/80 hover:text-accent hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLeadForm;