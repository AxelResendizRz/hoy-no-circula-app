"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";

interface ContingenciaData {
  contingenciaActiva: boolean;
  fase: number;
  detalles: string;
  ultimaActualizacion: string | null;
}

interface Engomado {
  id: string;
  nombre: string;
  dia: string;
  placas: string;
  digitos: string[];
  colorBg: string;
  colorBorder: string;
  textColor: string;
}

// Configuración de engomados oficiales de CDMX / Edomex
const ENGOMADOS: Engomado[] = [
  {
    id: "amarillo",
    nombre: "Amarillo",
    dia: "Lunes",
    placas: "5 y 6",
    digitos: ["5", "6"],
    colorBg: "bg-yellow-400",
    colorBorder: "border-yellow-400",
    textColor: "text-yellow-950",
  },
  {
    id: "rosa",
    nombre: "Rosa",
    dia: "Martes",
    placas: "7 y 8",
    digitos: ["7", "8"],
    colorBg: "bg-pink-400",
    colorBorder: "border-pink-400",
    textColor: "text-pink-950",
  },
  {
    id: "rojo",
    nombre: "Rojo",
    dia: "Miércoles",
    placas: "3 y 4",
    digitos: ["3", "4"],
    colorBg: "bg-red-500",
    colorBorder: "border-red-500",
    textColor: "text-white",
  },
  {
    id: "verde",
    nombre: "Verde",
    dia: "Jueves",
    placas: "1 y 2",
    digitos: ["1", "2"],
    colorBg: "bg-emerald-500",
    colorBorder: "border-emerald-500",
    textColor: "text-white",
  },
  {
    id: "azul",
    nombre: "Azul",
    dia: "Viernes",
    placas: "9 y 0",
    digitos: ["9", "0"],
    colorBg: "bg-blue-600",
    colorBorder: "border-blue-600",
    textColor: "text-white",
  },
];

const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// Fecha actual en hora de México, sin importar la zona del navegador o servidor
function ahoraMX(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }),
  );
}

export default function Home() {
  const [data, setData] = useState<ContingenciaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [ahora, setAhora] = useState<Date | null>(null);
  const [ahoraMs, setAhoraMs] = useState<number>(0);

  // Formulario intuitivo
  const [holograma, setHolograma] = useState<string>("1");
  const [placa, setPlaca] = useState<string>("");
  const [engomadoSeleccionado, setEngomadoSeleccionado] = useState<string>("");

  // Al presionar un número de placa, seleccionamos automáticamente el engomado correspondiente
  const handleSelectPlaca = (num: string) => {
    setPlaca(num);
    const eng = ENGOMADOS.find((e) => e.digitos.includes(num));
    if (eng) setEngomadoSeleccionado(eng.id);
  };

  // Fecha actual (en efecto para evitar errores de hidratación)
  useEffect(() => {
    const tick = () => {
      setAhora(ahoraMX());
      setAhoraMs(Date.now());
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Consumir API de contingencia
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/contingencia");
        const json = await res.json();
        if (json.data) {
          setData({
            contingenciaActiva: json.data.activa,
            fase: json.data.fase,
            detalles: json.data.detalles,
            ultimaActualizacion: json.data.ultimaActualizacion ?? null,
          });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const id = setInterval(fetchData, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  // Evaluación de circulación según el día actual
  const diaNombre = ahora ? DIAS[ahora.getDay()] : null;
  const engomadoHoy = ENGOMADOS.find((e) => e.dia === diaNombre) ?? null;
  const esFinDeSemana = ahora ? [0, 6].includes(ahora.getDay()) : false;

  const fechaTexto = ahora
    ? ahora.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const esExento = ["00", "0", "exento"].includes(holograma);
  const placaRestringidaHoy =
    !!engomadoHoy && engomadoHoy.digitos.includes(placa);
  const noCirculaHoy = !esExento && placaRestringidaHoy;
  const horarioHoy =
    holograma === "foraneo" ? "5:00 a 11:00 h" : "5:00 a 22:00 h";

  const HORAS_MAX_SIN_ACTUALIZAR = 6;

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

  // Estado del resultado del verificador
  const estadoResultado: "pendiente" | "finde" | "restringido" | "libre" =
    !placa
      ? "pendiente"
      : esFinDeSemana
        ? "finde"
        : noCirculaHoy
          ? "restringido"
          : "libre";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="py-6 sm:py-10 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Banner de Contingencia Ambiental */}
          {!loading && data?.contingenciaActiva && (
            <div className="bg-red-600 text-white p-5 rounded-3xl shadow-lg flex items-center gap-4 animate-pulse">
              <span className="text-4xl">🚨</span>
              <div>
                <p className="font-extrabold text-xl">
                  ¡CONTINGENCIA AMBIENTAL ACTIVA (Fase {data.fase})!
                </p>
                <p className="text-sm opacity-95">{data.detalles}</p>
              </div>
            </div>
          )}

          {/* Layout Principal: 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* COLUMNA IZQUIERDA: Información General Hoy */}
            <div className="space-y-6" id="inicio">
              {!ahora && (
                <div className="h-72 rounded-3xl bg-white border border-slate-200/80 animate-pulse" />
              )}

              {ahora && (
                <>
                  {/* HERO: estado del día */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Estado oficial del día
                      </span>
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                        Hoy <span className="capitalize">{fechaTexto}</span>
                      </h1>

                      {engomadoHoy ? (
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          Hoy{" "}
                          <strong className="text-red-600">no circulan</strong>{" "}
                          los vehículos con engomado{" "}
                          <strong>{engomadoHoy.nombre.toLowerCase()}</strong>,
                          cuyas placas terminan en{" "}
                          <strong>{engomadoHoy.placas}</strong>. La restricción
                          aplica según el holograma de tu auto.
                        </p>
                      ) : (
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          Hoy no aplica la restricción por engomado de lunes a
                          viernes. Si tu vehículo tiene holograma 2 o es
                          foráneo, revisa las reglas de fin de semana en la
                          fuente oficial.
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

                    {/* Placas restringidas */}
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
                            Engomado {engomadoHoy.nombre.toUpperCase()} · Placas
                            terminación {engomadoHoy.placas}
                          </p>
                          <p className="text-xs text-slate-600 font-medium">
                            Fíjate en el último número de tu placa: si coincide,
                            hoy tu auto descansa (salvo que tenga holograma
                            exento).
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ¿A QUIÉN APLICA? */}
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
                                <p className="font-black text-slate-900">
                                  Hologramas 1 y 2
                                </p>
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
                              Los sábados pueden aplicar restricciones según el
                              holograma y la terminación de la placa. Consulta
                              la fuente oficial para tu caso.
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
                            <strong>Sí circulan</strong> sin restricción, sin
                            importar la terminación de su placa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CALENDARIO SEMANAL */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Calendario de la semana
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">
                        Qué engomado descansa cada día (lunes a viernes).
                      </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {ENGOMADOS.map((eng) => {
                        const esHoy = eng.id === engomadoHoy?.id;
                        return (
                          <div
                            key={eng.id}
                            className={`rounded-2xl p-2.5 text-center transition-all ${eng.colorBg} ${eng.textColor} ${
                              esHoy
                                ? "ring-4 ring-slate-900 scale-105 shadow-md"
                                : "opacity-60"
                            }`}
                          >
                            <p className="text-[10px] font-black uppercase tracking-wide">
                              {eng.dia.slice(0, 3)}
                            </p>
                            <p className="text-sm font-black">{eng.nombre}</p>
                            <p className="text-[11px] font-bold">
                              {eng.placas}
                            </p>
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

                  {/* NOTAS Y FUENTE */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
                    <h2 className="text-xl font-black text-slate-900">
                      Ten en cuenta
                    </h2>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span>🕔</span>
                        <span>
                          La restricción empieza a las 5:00 h, así que si sales
                          de madrugada ya aplica.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>🚨</span>
                        <span>
                          En una contingencia ambiental pueden sumarse
                          restricciones adicionales; revisa el aviso en la parte
                          superior.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>🔎</span>
                        <span>
                          Tu holograma depende de tu última verificación
                          vehicular, no solo del color del engomado.
                        </span>
                      </li>
                    </ul>
                    {!loading && (
                      <p
                        className={`text-xs font-medium ${
                          datosDesactualizados
                            ? "text-amber-700"
                            : "text-slate-500"
                        }`}
                      >
                        {textoActualizacion
                          ? `Aviso de contingencia actualizado: ${textoActualizacion} (hora CDMX)`
                          : "Sin registro de la última actualización del aviso de contingencia."}
                      </p>
                    )}

                    {datosDesactualizados && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl border border-amber-200 bg-amber-50 text-xs text-amber-900">
                        <span className="text-base">⚠️</span>
                        <p>
                          El aviso de contingencia no se actualiza desde hace
                          varias horas, así que podría no reflejar la situación
                          actual. Confírmalo en la fuente oficial antes de
                          salir.
                        </p>
                      </div>
                    )}
                    {/* FUENTE DE INFORMACIÓN OFICIAL */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-slate-600">
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
                </>
              )}
            </div>

            {/* COLUMNA DERECHA: Verificador Intuitivo */}
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
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                    (num) => (
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
                    ),
                  )}
                </div>
              </div>

              {/* Paso 2: Identificador visual de Engomado */}
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

              {/* Paso 3: Holograma */}
              <div className="space-y-3">
                <label className="block text-sm font-black text-slate-800">
                  2. ¿Qué Holograma tienes?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "00", label: "00 / Exento" },
                    { id: "0", label: "Holograma 0" },
                    { id: "1", label: "Holograma 1" },
                    { id: "2", label: "Holograma 2" },
                    { id: "foraneo", label: "Foráneo" },
                    { id: "exento", label: "Híbrido/Eléctrico" },
                  ].map((item) => (
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
          </div>
        </div>
      </main>
    </div>
  );
}
