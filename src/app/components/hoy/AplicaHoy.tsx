import type { Engomado } from "@/lib/engomados";

interface Props {
  engomadoHoy: Engomado | null;
}

export default function AplicaHoy({ engomadoHoy }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          ¿A quién aplica hoy?
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Según el holograma de tu vehículo.
        </p>
      </div>

      <div className="space-y-3">
        {engomadoHoy && (
          <>
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-red-100 bg-red-50/50">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl">
                🚫
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-slate-900">Hologramas 1 y 2</p>
                  <span className="bg-red-500 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">
                    Placas {engomadoHoy.placas}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  No circulan de <strong>5:00 a 22:00 h</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl border border-red-100 bg-red-50/50">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl">
                🚫
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-slate-900">
                    Vehículos foráneos
                  </p>
                  <span className="bg-red-500 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">
                    Placas {engomadoHoy.placas}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  No circulan de <strong>5:00 a 11:00 h</strong>.
                </p>
              </div>
            </div>
          </>
        )}

        {!engomadoHoy && (
          <div className="flex items-start gap-4 p-4 rounded-2xl border border-amber-100 bg-amber-50/60">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl">
              ℹ️
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900">
                Reglas de fin de semana
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Los sábados pueden aplicar restricciones según el holograma y la
                terminación de la placa. Consulta la fuente oficial para tu
                caso.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl">
            ✅
          </div>
          <div className="flex-1">
            <p className="font-black text-slate-900">
              Hologramas 00 y 0 · Híbridos y eléctricos
            </p>
            <p className="text-xs text-slate-600 mt-1">
              <strong>Sí circulan</strong> sin restricción, sin importar la
              terminación de su placa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
