"use client";

import { useState, useEffect, useCallback } from "react";
import {
  evaluarCirculacion,
  Holograma,
  ResultadoCirculacion,
} from "@/lib/circulacion";

export default function Home() {
  const [holograma, setHolograma] = useState<Holograma>("0");
  const [placa, setPlaca] = useState<number>(5);
  const [diaSemana, setDiaSemana] = useState<number>(1);

  const [contingenciaActiva, setContingenciaActiva] = useState<boolean>(false);
  const [faseContingencia, setFaseContingencia] = useState<number>(0);
  const [fuenteContingencia, setFuenteContingencia] = useState<string>("");
  const [cargandoApi, setCargandoApi] = useState<boolean>(true);

  const obtenerEstadoContingencia = useCallback(async () => {
    setCargandoApi(true);
    try {
      const res = await fetch("/api/contingencia");
      if (res.ok) {
        const json = await res.json();
        const data = json.data || {};
        setContingenciaActiva(data.activa ?? false);
        setFaseContingencia(data.fase ?? 0);
        setFuenteContingencia(data.fuente ?? "Manual / Sistema");
      }
    } catch (error) {
      console.error("Error al consultar el estado de contingencia:", error);
    } finally {
      setCargandoApi(false);
    }
  }, []);

  useEffect(() => {
    obtenerEstadoContingencia();
  }, [obtenerEstadoContingencia]);

  const resultado: ResultadoCirculacion = evaluarCirculacion({
    holograma,
    terminacionPlaca: placa,
    diaSemana: Number(diaSemana),
    esContingencia: contingenciaActiva,
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-xl p-6 space-y-6 border border-slate-700">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-emerald-400">
            Hoy No Circula Edomex
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verificador en tiempo real
          </p>
        </header>

        <div
          className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
            contingenciaActiva
              ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
              : "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
          }`}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider block">
              Estado Ambiental (API)
            </span>
            <span className="text-sm font-medium">
              {cargandoApi
                ? "Consultando API..."
                : contingenciaActiva
                  ? `🔴 Contingencia Fase ${faseContingencia}`
                  : "🟢 Normal (Sin Contingencia)"}
            </span>
            {fuenteContingencia && (
              <span className="text-[10px] block opacity-70 mt-0.5">
                Fuente: {fuenteContingencia}
              </span>
            )}
          </div>
          <button
            onClick={obtenerEstadoContingencia}
            disabled={cargandoApi}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-2.5 py-1.5 rounded-lg transition-colors text-slate-200"
          >
            {cargandoApi ? "..." : "🔄"}
          </button>
        </div>

        {/* Formulario de selección */}
        <div className="space-y-4">
          {/* Holograma */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Holograma:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["00", "0", "1", "2"] as Holograma[]).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHolograma(h)}
                  className={`py-2 text-sm font-semibold rounded-lg border transition ${
                    holograma === h
                      ? "bg-emerald-500 border-emerald-400 text-slate-950"
                      : "bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Placa */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Último dígito de la placa:
            </label>
            <select
              value={placa}
              onChange={(e) => setPlaca(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  Terminación {num}
                </option>
              ))}
            </select>
          </div>

          {/* Día de la semana */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Día de la semana:
            </label>
            <select
              value={diaSemana}
              onChange={(e) => setDiaSemana(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={1}>Lunes</option>
              <option value={2}>Martes</option>
              <option value={3}>Miércoles</option>
              <option value={4}>Jueves</option>
              <option value={5}>Viernes</option>
              <option value={6}>Sábado</option>
              <option value={0}>Domingo</option>
            </select>
          </div>
        </div>

        {/* Semáforo visual del resultado */}
        <div
          className={`p-5 rounded-2xl border text-center space-y-2 transition-colors ${
            resultado.circula
              ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
              : "bg-rose-950/50 border-rose-500/50 text-rose-300"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase block opacity-80">
            Resultado
          </span>
          <div className="text-3xl font-extrabold uppercase tracking-wide">
            {resultado.circula ? "🚗 SÍ CIRCULA" : "🚫 NO CIRCULA"}
          </div>
          <p className="text-xs opacity-90 max-w-xs mx-auto leading-relaxed">
            {resultado.motivo}
          </p>
        </div>
      </div>
    </main>
  );
}
