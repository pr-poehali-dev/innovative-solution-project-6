import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Логируем в консоль — для отладки и для get_logs
     
    console.error("ErrorBoundary поймал ошибку:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-4 py-8"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)",
          }}
        >
          <div
            className="max-w-md w-full rounded-2xl p-[1.5px]"
            style={{
              background:
                "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
            }}
          >
            <div className="rounded-2xl bg-black/95 p-7 sm:p-9 text-center">
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                  color: "#000",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                !
              </div>

              <h1
                className="text-2xl sm:text-3xl font-black text-white mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Что-то пошло не так
              </h1>
              <p className="text-white/70 text-sm sm:text-base mb-6 leading-snug">
                На сайте произошла техническая ошибка. Попробуйте обновить
                страницу — обычно это помогает.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="w-full h-12 rounded-xl font-black text-black text-base active:scale-[0.98] transition-transform"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)",
                    fontFamily: "'Cinzel', serif",
                    boxShadow: "0 4px 18px rgba(232,168,32,0.4)",
                  }}
                >
                  Обновить страницу
                </button>

                <button
                  type="button"
                  onClick={this.handleGoHome}
                  className="w-full h-11 rounded-xl border border-accent/40 text-accent font-bold text-sm hover:bg-accent/10 transition-colors"
                >
                  На главную
                </button>

                <a
                  href="tel:+79601883084"
                  className="w-full h-11 rounded-xl border border-white/15 text-white/85 font-bold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  Позвонить +7 960 188-30-84
                </a>
              </div>

              {this.state.error && (
                <details className="mt-5 text-left">
                  <summary className="text-white/40 text-xs cursor-pointer hover:text-white/60">
                    Технические подробности
                  </summary>
                  <pre className="mt-2 p-3 rounded-lg bg-white/5 text-white/60 text-[10px] overflow-auto max-h-32 whitespace-pre-wrap break-words">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
