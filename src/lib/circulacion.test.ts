// src/lib/circulacion.test.ts
import { evaluarCirculacion } from "./circulacion";

describe("Evaluador de Circulacion (Hoy No Circula)", () => {
  test("Holograma 00 debe circular un lunes normal", () => {
    const res = evaluarCirculacion({
      holograma: "00",
      terminacionPlaca: 5,
      diaSemana: 1, // Lunes
      esContingencia: false,
    });
    expect(res.circula).toBe(true);
  });

  test("Placa terminación 5 (Engomado Amarillo) NO circula el lunes con Holograma 1", () => {
    const res = evaluarCirculacion({
      holograma: "1",
      terminacionPlaca: 5,
      diaSemana: 1, // Lunes
      esContingencia: false,
    });
    expect(res.circula).toBe(false);
    expect(res.motivo).toContain("amarillo");
  });

  test("Holograma 2 NO circula ningún sábado", () => {
    const res = evaluarCirculacion({
      holograma: "2",
      terminacionPlaca: 3,
      diaSemana: 6, // Sábado
      esContingencia: false,
    });
    expect(res.circula).toBe(false);
  });

  test("En contingencia ambiental, holograma 1 descansa", () => {
    const res = evaluarCirculacion({
      holograma: "1",
      terminacionPlaca: 8,
      diaSemana: 3, // Miércoles
      esContingencia: true,
    });
    expect(res.circula).toBe(false);
    expect(res.motivo).toContain("Contingencia ambiental");
  });
});
