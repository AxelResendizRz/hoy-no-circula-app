"use client";

import Navbar from "./components/layout/Navbar";
import ContingenciaBanner from "./components/contingencia/ContingenciaBanner";
import EstadoInformacion from "./components/contingencia/EstadoInformacion";
import HeroHoy from "./components/hoy/HeroHoy";
import AplicaHoy from "./components/hoy/AplicaHoy";
import CalendarioSemana from "./components/hoy/CalendarioSemana";
import NotasImportantes from "./components/hoy/NotasImportantes";
import Verificador from "./components/verificador/Verificador";
import { useAhora } from "@/hooks/useAhora";
import { useContingencia } from "@/hooks/useContingencia";
import { engomadoDelDia, esFinDeSemana, formatearFecha } from "@/lib/engomados";

export default function Home() {
  const { ahora, ahoraMs } = useAhora();
  const { data, loading } = useContingencia();

  const engomadoHoy = engomadoDelDia(ahora);
  const finDeSemana = esFinDeSemana(ahora);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Navbar />

      <main className="py-6 sm:py-10 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <ContingenciaBanner data={data} loading={loading} />
          <EstadoInformacion data={data} loading={loading} ahoraMs={ahoraMs} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* COLUMNA IZQUIERDA */}
            <div className="space-y-6" id="inicio">
              {!ahora ? (
                <div className="h-72 rounded-3xl bg-white border border-slate-200/80 animate-pulse" />
              ) : (
                <>
                  <HeroHoy
                    fechaTexto={formatearFecha(ahora)}
                    engomadoHoy={engomadoHoy}
                  />
                  <AplicaHoy engomadoHoy={engomadoHoy} />
                  <CalendarioSemana engomadoHoy={engomadoHoy} />
                  <NotasImportantes />
                </>
              )}
            </div>

            {/* COLUMNA DERECHA */}
            <Verificador
              engomadoHoy={engomadoHoy}
              esFinDeSemana={finDeSemana}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
