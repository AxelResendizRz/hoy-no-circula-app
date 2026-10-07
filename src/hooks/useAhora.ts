"use client";

import { useEffect, useState } from "react";
import { ahoraMX } from "@/lib/engomados";

export function useAhora(intervaloMs = 60_000) {
  const [ahora, setAhora] = useState<Date | null>(null);
  const [ahoraMs, setAhoraMs] = useState<number>(0);

  useEffect(() => {
    const tick = () => {
      setAhora(ahoraMX());
      setAhoraMs(Date.now());
    };
    tick();
    const id = setInterval(tick, intervaloMs);
    return () => clearInterval(id);
  }, [intervaloMs]);

  return { ahora, ahoraMs };
}
