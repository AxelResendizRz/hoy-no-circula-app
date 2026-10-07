export interface Engomado {
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
export const ENGOMADOS: Engomado[] = [
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

export const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// Fecha actual en hora de México, sin importar la zona del navegador o servidor
export function ahoraMX(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" }),
  );
}

// Engomado que descansa en la fecha dada (null en fin de semana o sin fecha)
export function engomadoDelDia(fecha: Date | null): Engomado | null {
  if (!fecha) return null;
  return ENGOMADOS.find((e) => e.dia === DIAS[fecha.getDay()]) ?? null;
}

export function esFinDeSemana(fecha: Date | null): boolean {
  return fecha ? [0, 6].includes(fecha.getDay()) : false;
}

// Ej.: "miércoles, 7 de octubre de 2026"
export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
