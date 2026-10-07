"use client";

import { useState } from "react";
import { ENGOMADOS, type Engomado } from "@/lib/engomados";

const PLACAS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const HOLOGRAMAS = [
  { id: "00", label: "00 / Exento" },
  { id: "0", label: "Holograma 0" },
  { id: "1", label: "Holograma 1" },
  { id: "2", label: "Holograma 2" },
  { id: "foraneo", label: "Foráneo" },
  { id: "exento", label: "Híbrido/Eléctrico" },
];

interface Props {
  engomadoHoy: Engomado | null;
  esFinDeSemana: boolean;
}

export default function Verificador({ engomadoHoy, esFinDeSemana }: Props) {
  const [holograma, setHolograma] = useState<string>("1");
  const [placa, setPlaca] = useState<string>("");
  const [engomadoSeleccionado, setEngomadoSeleccionado] = useState<string>("");

  const handleSelectPlaca = (num: string) => {
    setPlaca(num);
    const eng = ENGOMADOS.find((e) => e.digitos.includes(num));
    if (eng) setEngomadoSeleccionado(eng.id);
  };

  const esExento = ["00", "0", "exento"].includes(holograma);
  const placaRestringidaHoy =
    !!engomadoHoy && engomadoHoy.digitos.includes(placa);
  const noCirculaHoy = !esExento && placaRestringidaHoy;
  const horarioHoy =
    holograma === "foraneo" ? "5:00 a 11:00 h" : "5:00 a 22:00 h";

  const estadoResultado: "pendiente" | "finde" | "restringido" | "libre" =
    !placa
      ? "pendiente"
      : esFinDeSemana
        ? "finde"
        : noCirculaHoy
          ? "restringido"
          : "libre";

  return (
    <div
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6 sticky top-20"
      id="verificador"
    >
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-slate-900">
          ¿Circula mi auto hoy?
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Toca la terminación de tu placa o el color de tu engomado.
        </p>
      </div>

      {/* Paso 1: Seleccionar Placa */}
      <div className="space-y-3">
        <label className="block text-sm font-black text-slate-800">
          1. ¿En qué número termina tu placa?
        </label>
        <div className="grid grid-cols-5 gap-2.5">
          {PLACAS.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleSelectPlaca(num)}
              className={`py-3.5 cursor-pointer rounded-2xl text-xl font-black border-2 transition-all ${
                placa === num
                  ? "bg-slate-900 text-white border-slate-900 scale-105 shadow-md"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Identificador visual de Engomado */}
      <div className="space-y-3">
        <label className="block text-sm font-black text-slate-800">
          Engomado correspondiente:
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {ENGOMADOS.map((eng) => (
            <div
              key={eng.id}
              onClick={() => setEngomadoSeleccionado(eng.id)}
              className={`p-2 rounded-xl border-2 text-center cursor-pointer transition-all ${eng.colorBg} ${
                engomadoSeleccionado === eng.id
                  ? "ring-4 ring-slate-900 scale-105 shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <p className={`text-xs font-black ${eng.textColor}`}>
                {eng.nombre}
              </p>
              <p className={`text-[10px] font-bold ${eng.textColor}`}>
                {eng.placas}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Paso 2: Holograma */}
      <div className="space-y-3">
        <label className="block text-sm font-black text-slate-800">
          2. ¿Qué Holograma tienes?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {HOLOGRAMAS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setHolograma(item.id)}
              className={`py-2.5 px-2 cursor-pointer rounded-xl text-xs font-black border-2 transition-all ${
                holograma === item.id
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTADO VISUAL Y CLARO */}
      <div
        className={`p-5 rounded-2xl border-2 text-center space-y-2 transition-all ${
          estadoResultado === "restringido"
            ? "bg-red-500 text-white border-red-600 shadow-lg"
            : estadoResultado === "libre"
              ? "bg-emerald-500 text-white border-emerald-600 shadow-lg"
              : "bg-slate-100 text-slate-700 border-slate-200"
        }`}
      >
        <div className="text-5xl">
          {estadoResultado === "restringido"
            ? "🚫"
            : estadoResultado === "libre"
              ? "✅"
              : estadoResultado === "finde"
                ? "📅"
                : "👆"}
        </div>
        <p className="text-2xl font-black uppercase tracking-wide">
          {estadoResultado === "restringido"
            ? "NO CIRCULAS HOY"
            : estadoResultado === "libre"
              ? "SÍ CIRCULAS HOY"
              : estadoResultado === "finde"
                ? "FIN DE SEMANA"
                : "SELECCIONA TU PLACA"}
        </p>
        <p className="text-sm font-bold opacity-90 leading-relaxed">
          {estadoResultado === "restringido" &&
            `Placa terminación ${placa} con holograma ${holograma} no puede transitar de ${horarioHoy}.`}
          {estadoResultado === "libre" &&
            `Vehículo terminación ${placa} con holograma ${holograma} circula sin restricción hoy.`}
          {estadoResultado === "finde" &&
            "Hoy no aplica la restricción por engomado. Revisa las reglas de sábado según tu holograma en la fuente oficial."}
          {estadoResultado === "pendiente" &&
            "Toca el último número de tu placa para ver si circulas hoy."}
        </p>
      </div>
    </div>
  );
}
