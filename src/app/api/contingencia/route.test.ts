// src/app/api/contingencia/route.test.ts
import { NextRequest } from "next/server";
import { GET, POST } from "./route";

describe("API Route: /api/contingencia", () => {
  test("GET debe retornar el estado inicial de la contingencia", async () => {
    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.activa).toBe(false);
  });

  test("POST debe rechazar peticiones sin token de autorización", async () => {
    const req = new NextRequest("http://localhost:3000/api/contingencia", {
      method: "POST",
      body: JSON.stringify({ activa: true }),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(401);
    expect(json.success).toBe(false);
  });

  test("POST debe actualizar la contingencia con un token válido", async () => {
    const req = new NextRequest("http://localhost:3000/api/contingencia", {
      method: "POST",
      headers: {
        "x-webhook-secret": "mi_clave_secreta_n8n",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activa: true,
        fase: 1,
        fuente: "Prueba Jest",
      }),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.activa).toBe(true);
  });
});
