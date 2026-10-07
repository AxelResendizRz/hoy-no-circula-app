// src/lib/circulacion.ts

export type Holograma = "00" | "0" | "1" | "2";
export type Engomado = "amarillo" | "rosa" | "rojo" | "verde" | "azul";

export interface EvaluacionCirculacionInput {
  holograma: Holograma;
  terminacionPlaca: number;
  diaSemana: number;
  esContingencia: boolean;
}

export interface ResultadoCirculacion {
  circula: boolean;
  motivo: string;
}

export function evaluarCirculacion(
  input: EvaluacionCirculacionInput,
): ResultadoCirculacion {
  const { holograma, terminacionPlaca, diaSemana, esContingencia } = input;

  if (diaSemana === 0 && !esContingencia) {
    return {
      circula: true,
      motivo: "Los domingos no aplica el Hoy No Circula habitual.",
    };
  }

  // 2. Hologramas 00 y 0 circulan en días normales
  if ((holograma === "00" || holograma === "0") && !esContingencia) {
    return {
      circula: true,
      motivo: "Holograma 00/0 exento de restricciones ordinarias.",
    };
  }

  // 3. Regla en caso de Contingencia Ambiental
  if (esContingencia) {
    if (holograma === "2") {
      return {
        circula: false,
        motivo: "Contingencia ambiental activa: Holograma 2 no circula.",
      };
    }
    if (holograma === "1") {
      return {
        circula: false,
        motivo: "Contingencia ambiental activa: Holograma 1 no circula.",
      };
    }
    const restriccionContingencia =
      obtenerEngomadoPorPlaca(terminacionPlaca) ===
      obtenerEngomadoPorDia(diaSemana);
    if (restriccionContingencia) {
      return {
        circula: false,
        motivo:
          "Contingencia ambiental activa: Restricción por engomado/placa.",
      };
    }
  }

  // 4. Calendario Ordinario Lunes a Viernes (Hologramas 1 y 2)
  const engomadoDia = obtenerEngomadoPorDia(diaSemana);
  const engomadoVehiculo = obtenerEngomadoPorPlaca(terminacionPlaca);

  if (diaSemana >= 1 && diaSemana <= 5) {
    if (engomadoDia === engomadoVehiculo) {
      return {
        circula: false,
        motivo: `No circula por engomado ${engomadoVehiculo} (terminación ${terminacionPlaca}).`,
      };
    }
  }

  // Holograma 2 no circula ningún sábado
  if (diaSemana === 6 && holograma === "2") {
    return {
      circula: false,
      motivo: "Holograma 2 descansa todos los sábados.",
    };
  }

  return { circula: true, motivo: "Vehículo autorizado para circular." };
}

export function obtenerEngomadoPorPlaca(terminacion: number): Engomado {
  switch (terminacion) {
    case 5:
    case 6:
      return "amarillo";
    case 7:
    case 8:
      return "rosa";
    case 3:
    case 4:
      return "rojo";
    case 1:
    case 2:
      return "verde";
    case 0:
    case 9:
    default:
      return "azul";
  }
}

export function obtenerEngomadoPorDia(dia: number): Engomado | null {
  switch (dia) {
    case 1:
      return "amarillo"; // Lunes
    case 2:
      return "rosa"; // Martes
    case 3:
      return "rojo"; // Miércoles
    case 4:
      return "verde"; // Jueves
    case 5:
      return "azul"; // Viernes
    default:
      return null;
  }
}
