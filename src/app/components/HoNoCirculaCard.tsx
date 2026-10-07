export default function HoyNoCirculaCard() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 font-sans text-gray-800">
      {/* Tarjeta Principal */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        {/* Encabezado */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Hoy miércoles 7 de octubre de 2026
          </h1>
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            No circulan hoy · 5:00–22:00
          </div>
        </div>

        {/* Sección de Placas y Resumen */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Bloques de Terminación de Placas */}
          <div className="flex gap-3">
            <div className="w-20 h-24 border-2 border-red-500 bg-red-50/50 rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-red-600">3</span>
            </div>
            <div className="w-20 h-24 border-2 border-red-500 bg-red-50/50 rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-red-600">4</span>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-3 flex-1">
            <p className="font-bold text-gray-900 text-lg">
              No circulan engomado rojo · hologramas 1 y 2 y foráneos.
            </p>
            <p className="text-sm text-gray-500">
              16 alcaldías de CDMX + 18 municipios del Edomex. Hologramas 0, 00
              y exentos circulan.
            </p>

            {/* Contador de tiempo restante */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-medium border border-emerald-100">
              <span>⏱</span>
              <span>
                La restricción de hoy termina a las 22:00 ·{" "}
                <b>faltan 8 h 27 min</b>
              </span>
            </div>

            {/* Badges descriptivos */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                Engomado Rojo
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                ⏱ 5:00 – 22:00 h
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                H 1 · 2 · F
              </span>
              <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                Fuente: SEDEMA/CAMe
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de Restricciones */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/30">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/80 text-gray-700 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Tipo Holograma</th>
                <th className="py-3 px-4 text-center">Último dígito placa</th>
                <th className="py-3 px-4">Horario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr>
                <td className="py-3 px-4 font-medium text-gray-700">
                  Holograma 1
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    3 y 4
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">De 5 a 22hs</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-700">
                  Holograma 2
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    3 y 4
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">De 5 a 22hs</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-700">
                  Foráneos
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    3 y 4
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">De 5 a 11hs</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pie de tarjeta y Botones de Acción */}
        <div className="space-y-4 pt-2">
          <p className="text-xs text-gray-400">
            • Verificado hace 27 min (hora CDMX) · Fuentes: SEDEMA / CAMe
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm text-sm">
              Compartir por WhatsApp
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 px-5 rounded-xl transition-all text-sm">
              Ver mañana →
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta Informativa Sabatina */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">
          ¿Qué autos no circulan el sábado?
        </h2>
        <p className="text-sm text-gray-700">
          <b>El próximo sábado 10 de octubre de 2026</b> no circulan placas
          terminación Pares (hologramas 1 y 2).
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          El <b>Hoy No Circula sabatino</b> no funciona como el de lunes a
          viernes: depende del <b>holograma</b> y de qué sábado del mes es, no
          del color del engomado.{" "}
          <a href="#" className="text-emerald-600 underline font-medium">
            Ver el calendario sabatino completo →
          </a>
        </p>
      </div>
    </div>
  );
}
