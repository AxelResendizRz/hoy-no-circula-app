import type { ContingenciaData } from "@/hooks/useContingencia";

const HORAS_MAX_SIN_ACTUALIZAR = 6;

interface Props {
  data: ContingenciaData | null;
  loading: boolean;
  ahoraMs: number;
}

export default function EstadoInformacion({ data, loading, ahoraMs }: Props) {
  if (loading) return null;

  const ultimaAct = data?.ultimaActualizacion
    ? new Date(data.ultimaActualizacion)
    : null;

  const textoActualizacion = ultimaAct
    ? ultimaAct.toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const datosDesactualizados =
    !!ultimaAct &&
    ahoraMs > 0 &&
    (ahoraMs - ultimaAct.getTime()) / 36e5 > HORAS_MAX_SIN_ACTUALIZAR;

  const minutosDesdeAct =
    ultimaAct && ahoraMs > 0
      ? Math.max(0, Math.floor((ahoraMs - ultimaAct.getTime()) / 60000))
      : null;

  const textoRelativo =
    minutosDesdeAct === null
      ? null
      : minutosDesdeAct < 1
        ? "hace un momento"
        : minutosDesdeAct < 60
          ? `hace ${minutosDesdeAct} min`
          : minutosDesdeAct < 1440
            ? `hace ${Math.floor(minutosDesdeAct / 60)} h`
            : `hace ${Math.floor(minutosDesdeAct / 1440)} d`;

  const activa = !!data?.contingenciaActiva;

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden ${
        datosDesactualizados
          ? "bg-amber-50 border-amber-300 text-amber-900"
          : "bg-white border-slate-200/80 text-slate-700"
      }`}
    >
      <div className="px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              {!datosDesactualizados && (
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
                    activa ? "bg-red-500" : "bg-emerald-500"
                  }`}
                />
              )}
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${
                  datosDesactualizados
                    ? "bg-amber-500"
                    : activa
                      ? "bg-red-500"
                      : "bg-emerald-500"
                }`}
              />
            </span>
            <p className="text-sm sm:text-base font-black">
              {activa
                ? `Contingencia ambiental activa · Fase ${data?.fase}`
                : "Sin contingencia ambiental"}
            </p>
          </div>

          <p className="text-sm sm:text-base font-medium">
            {textoActualizacion ? (
              <>
                Actualizado el{" "}
                <strong className="font-black">{textoActualizacion}</strong>{" "}
                (hora CDMX)
                {textoRelativo && (
                  <span className="ml-2 inline-block rounded-full bg-slate-900/90 px-2.5 py-0.5 text-xs font-bold text-white">
                    {textoRelativo}
                  </span>
                )}
              </>
            ) : (
              "Sin registro de la última actualización"
            )}
          </p>
        </div>

        {datosDesactualizados && (
          <p className="mt-2 text-xs sm:text-sm font-semibold">
            ⚠️ Este aviso no se actualiza desde hace varias horas y podría no
            reflejar la situación actual. Confírmalo en la fuente oficial antes
            de salir.
          </p>
        )}
      </div>

      {/* Fila 2: fuente oficial */}
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 sm:px-5 border-t text-xs ${
          datosDesactualizados
            ? "border-amber-200 bg-amber-100/60"
            : "border-slate-100 bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🌐</span>
          <div>
            <p className="font-bold text-slate-800">
              Fuente oficial de información:
            </p>
            <p className="text-[11px] text-slate-500">
              Secretaría del Medio Ambiente (SEDEMA / CAMe)
            </p>
          </div>
        </div>
        <a
          href="https://hoynocircula.cdmx.gob.mx/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-white border border-slate-200 text-emerald-700 font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all text-xs shrink-0 shadow-sm"
        >
          <span>Visitar sitio</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
