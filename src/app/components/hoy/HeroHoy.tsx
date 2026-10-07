import type { Engomado } from "@/lib/engomados";

interface Props {
  fechaTexto: string;
  engomadoHoy: Engomado | null;
}
export default function HeroHoy({ fechaTexto, engomadoHoy }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Estado oficial del día
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          Hoy {fechaTexto}
        </h1>

        {engomadoHoy ? (
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hoy <strong className="text-red-600">no circulan</strong> los
            vehículos con engomado{" "}
            <strong>{engomadoHoy.nombre.toLowerCase()}</strong>, cuyas placas
            terminan en <strong>{engomadoHoy.placas}</strong>. La restricción
            aplica según el holograma de tu auto.
          </p>
        ) : (
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hoy no aplica la restricción por engomado de lunes a viernes. Si tu
            vehículo tiene holograma 2 o es foráneo, revisa las reglas de fin de
            semana en la fuente oficial.
          </p>
        )}

        {engomadoHoy ? (
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            Restricción activa de 5:00 a 22:00 h
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold">
            Sin restricción por engomado hoy
          </div>
        )}
      </div>
      {engomadoHoy && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex gap-2">
            {engomadoHoy.digitos.map((n) => (
              <div
                key={n}
                className={`w-16 h-20 ${engomadoHoy.colorBg} ${engomadoHoy.textColor} rounded-2xl flex items-center justify-center text-4xl font-black shadow-md border-2 ${engomadoHoy.colorBorder}`}
              >
                {n}
              </div>
            ))}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-black text-slate-900 text-lg">
              Engomado {engomadoHoy.nombre.toUpperCase()} · Placas terminación{" "}
              {engomadoHoy.placas}
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Fíjate en el último número de tu placa: si coincide, hoy tu auto
              descansa (salvo que tenga holograma exento).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
