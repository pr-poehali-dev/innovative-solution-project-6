import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

type Props = {
  status: "idle" | "loading" | "success" | "error";
};

const SubmitButton = ({ status }: Props) => {
  return (
    <>
      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative mt-0.5 w-full px-5 h-12 sm:h-11 rounded-lg font-black text-base sm:text-base flex items-center gap-2 justify-center transition-all disabled:opacity-60 active:scale-[0.98] overflow-hidden"
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
    </>
  );
};

export default SubmitButton;
