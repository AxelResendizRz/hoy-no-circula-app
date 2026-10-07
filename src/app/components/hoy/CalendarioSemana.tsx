import { ENGOMADOS, type Engomado } from "@/lib/engomados";

interface Props {
  engomadoHoy: Engomado | null;
}
export default function CalendarioSemana({ engomadoHoy }: Props) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          Calendario de la semana
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Qué engomado descansa cada día (lunes a viernes).
        </p>
      </div>

      <div className="grid grid-cols-5 items-center gap-1 lg:gap-2">
        {ENGOMADOS.map((eng) => {
          const esHoy = eng.id === engomadoHoy?.id;
          return (
            <div
              key={eng.id}
              className={`rounded-2xl lg:p-2.5 text-center transition-all ${eng.colorBg} ${eng.textColor} ${
                esHoy
                  ? "ring-4 ring-slate-900 scale-105 shadow-md"
                  : "opacity-60"
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-wide">
                {eng.dia.slice(0, 3)}
              </p>
              <p className="text-sm font-black">{eng.nombre}</p>
              <p className="text-[11px] font-bold">{eng.placas}</p>
              {esHoy && (
                <span className="inline-block mt-1 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  HOY
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
