import Icon from "@/components/ui/icon";
import { faq, PHONE, PHONE_TEL } from "./asfaltirovanieData";

const AsfaltirovanieFaqAndCta = () => {
  return (
    <>
      {/* FAQ */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Частые вопросы
            </span>
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Если вашего вопроса нет — звоните, ответим
          </p>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white/90 border border-amber-200 shadow-md shadow-amber-200/20 hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <summary className="cursor-pointer p-5 flex items-center justify-between gap-3 list-none">
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {item.q}
                  </span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className="text-amber-600 flex-shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-100 via-white to-orange-100 shadow-2xl shadow-amber-400/30 p-6 sm:p-10 lg:p-12 text-center">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-300/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-300/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tighter mb-3">
                <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
                  Готовы рассчитать ваш объект?
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
                Позвоните прямо сейчас — назовём цену, согласуем дату выезда
                замерщика и пришлём смету
              </p>

              <a
                href={PHONE_TEL}
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white overflow-hidden hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all relative"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <Icon name="Phone" size={22} className="relative animate-pulse" />
                <span className="relative text-lg sm:text-2xl">{PHONE}</span>
              </a>

              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  На связи прямо сейчас · Без выходных · Замер бесплатно
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AsfaltirovanieFaqAndCta;
