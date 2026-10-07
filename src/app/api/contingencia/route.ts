// src/app/api/contingencia/route.ts
import { NextRequest, NextResponse } from "next/server";

let estadoContingencia = {
  activa: false,
  fase: 0,
  ultimaActualizacion: new Date().toISOString(),
  fuente: "Sistema Base",
};

const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || "mi_clave_secreta_n8n";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: estadoContingencia,
  });
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-webhook-secret");
    if (authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, error: "No autorizado. Token inválido." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { activa, fase, fuente } = body;

    if (typeof activa !== "boolean") {
      return NextResponse.json(
        { success: false, error: 'El campo "activa" debe ser un booleano.' },
        { status: 400 },
      );
    }

    estadoContingencia = {
      activa,
      fase: fase || (activa ? 1 : 0),
      ultimaActualizacion: new Date().toISOString(),
      fuente: fuente || "n8n CAMe Scraper",
    };

    return NextResponse.json({
      success: true,
      message: "Estado de contingencia actualizado correctamente",
      data: estadoContingencia,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error procesando la petición del webhook." },
      { status: 500 },
    );
  }
}
