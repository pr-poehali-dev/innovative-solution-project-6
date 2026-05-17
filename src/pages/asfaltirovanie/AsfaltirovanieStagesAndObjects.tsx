import Icon from "@/components/ui/icon";
import { stages, objects } from "./asfaltirovanieData";

const AsfaltirovanieStagesAndObjects = () => {
  return (
    <>
      {/* Stages */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Как мы работаем
            </span>
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Пять понятных этапов от заявки до сдачи объекта
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((s, i) => (
              <div
                key={i}
                className="relative p-5 rounded-2xl bg-white/90 border border-amber-200 shadow-lg shadow-amber-200/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-300/40 hover:border-amber-400 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-display font-black bg-gradient-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                  {s.n}
                </div>
                <h3 className="font-bold text-base mb-2 text-slate-900">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objects */}
      <section
        className="relative z-10 px-4 sm:px-6 py-12 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,243,220,0.6) 0%, rgba(255,236,200,0.8) 50%, rgba(255,243,220,0.6) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-3 text-center">
            <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Какие объекты делаем
            </span>
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
            От маленького двора до промышленной площадки в 10 000 м²
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {objects.map((o, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-amber-200 shadow-lg shadow-amber-200/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-300/40 hover:border-amber-400 transition-all flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-lg shadow-amber-400/40 flex items-center justify-center mb-3">
                  <Icon name={o.icon} size={22} className="text-white drop-shadow" />
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900">{o.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AsfaltirovanieStagesAndObjects;
