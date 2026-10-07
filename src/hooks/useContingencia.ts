"use client";

import { useEffect, useState } from "react";

export interface ContingenciaData {
  contingenciaActiva: boolean;
  fase: number;
  detalles: string;
  ultimaActualizacion: string | null;
}
export function useContingencia(intervaloMs = 5 * 60_000) {
  const [data, setData] = useState<ContingenciaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/contingencia", { cache: "no-store" });
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
    const id = setInterval(fetchData, intervaloMs);
    return () => clearInterval(id);
  }, [intervaloMs]);

  return { data, loading };
}
