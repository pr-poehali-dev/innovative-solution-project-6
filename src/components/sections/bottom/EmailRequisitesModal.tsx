import Icon from "@/components/ui/icon";

interface EmailRequisitesModalProps {
  open: boolean;
  emailValue: string;
  emailSending: boolean;
  emailStatus: "idle" | "success" | "error";
  emailError: string;
  onClose: () => void;
  onEmailChange: (value: string) => void;
  onSend: () => void;
}

const EmailRequisitesModal = ({
  open,
  emailValue,
  emailSending,
  emailStatus,
  emailError,
  onClose,
  onEmailChange,
  onSend,
}: EmailRequisitesModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => !emailSending && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-accent/30 p-6 sm:p-8 shadow-2xl"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !emailSending && onClose()}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <Icon name="X" size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/40 flex items-center justify-center">
            <Icon name="Mail" size={22} className="text-accent" />
          </div>
          <div>
            <div className="text-accent text-xs font-semibold uppercase tracking-widest">Отправка</div>
            <div className="text-white font-bold text-lg">Реквизиты на email</div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          Укажите ваш email — мы пришлём полные реквизиты ООО «ФАВОРИТ» в удобном виде.
        </p>

        <input
          type="email"
          value={emailValue}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="name@company.ru"
          disabled={emailSending || emailStatus === "success"}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/60 focus:outline-none text-white placeholder:text-muted-foreground text-sm mb-3"
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />

        {emailStatus === "error" && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            <Icon name="AlertCircle" size={14} />
            {emailError}
          </div>
        )}

        {emailStatus === "success" && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs">
            <Icon name="CheckCircle2" size={14} />
            Письмо отправлено — проверьте почту.
          </div>
        )}

        <button
          onClick={onSend}
          disabled={emailSending || emailStatus === "success"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #e8a820 0%, #f5d060 100%)", color: "#111" }}
        >
          {emailSending ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Отправка...
            </>
          ) : emailStatus === "success" ? (
            <>
              <Icon name="Check" size={16} />
              Отправлено
            </>
          ) : (
            <>
              <Icon name="Send" size={16} />
              Отправить реквизиты
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailRequisitesModal;