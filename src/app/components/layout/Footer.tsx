// Pie de página del sitio (sin estado ni fechas: se renderiza en el servidor)
export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Marca */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-xl">
              <img src="/icon-preview.png" alt="Logo" />
            </div>
            <div>
              <p className="font-black text-white leading-tight">
                Hoy No Circula
              </p>
              <p className="text-[11px] font-bold tracking-wide text-slate-400">
                CDMX &amp; EDOMEX
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Consulta de forma rápida si tu auto circula hoy, según tu placa,
            engomado y holograma, con el aviso de contingencia ambiental más
            reciente.
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie de página" className="space-y-3">
          <p className="text-sm font-black text-white">En este sitio</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#inicio" className="hover:text-white transition-colors">
                Estado del día
              </a>
            </li>
            <li>
              <a
                href="#verificador"
                className="hover:text-white transition-colors"
              >
                ¿Circula mi auto hoy?
              </a>
            </li>
          </ul>
        </nav>

        {/* Fuente oficial y aviso */}
        <div className="space-y-3">
          <p className="text-sm font-black text-white">Fuente oficial</p>
          <a
            href="https://hoynocircula.cdmx.gob.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            hoynocircula.cdmx.gob.mx
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <p className="text-xs text-slate-400 leading-relaxed">
            Secretaría del Medio Ambiente (SEDEMA) y Comisión Ambiental de la
            Megalópolis (CAMe).
          </p>
        </div>
      </div>

      {/* Aviso legal */}
      <div className="border-t border-slate-800">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-[11px] leading-relaxed text-slate-500">
          Sitio informativo independiente, sin relación con ninguna dependencia
          de gobierno. La información puede cambiar sin previo aviso; antes de
          salir, confirma las restricciones vigentes en la fuente oficial.
        </p>
      </div>
    </footer>
  );
}
