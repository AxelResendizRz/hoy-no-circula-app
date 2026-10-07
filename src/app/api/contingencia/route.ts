import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { supabase } from "@/lib/supabase";

const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

function secretoValido(recibido: string | null): boolean {
  if (!WEBHOOK_SECRET || !recibido) return false;
  const a = Buffer.from(recibido);
  const b = Buffer.from(WEBHOOK_SECRET);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET() {
  const { data, error } = await supabase
    .from("contingencia")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error leyendo contingencia:", error.message);
    return NextResponse.json(
      { success: false, error: "No se pudo obtener el estado." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        activa: data.activa,
        fase: data.fase,
        detalles: data.detalles,
        fuente: data.fuente,
        ultimaActualizacion: data.ultima_actualizacion,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  try {
    if (!secretoValido(request.headers.get("x-webhook-secret"))) {
      return NextResponse.json(
        { success: false, error: "No autorizado. Token inválido." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { activa, fase, detalles, fuente } = body;

    if (typeof activa !== "boolean") {
      return NextResponse.json(
        { success: false, error: 'El campo "activa" debe ser un booleano.' },
        { status: 400 },
      );
    }

    if (fase !== undefined && fase !== null && !Number.isInteger(fase)) {
      return NextResponse.json(
        { success: false, error: 'El campo "fase" debe ser un entero.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("contingencia")
      .update({
        activa,
        fase: activa ? fase || 1 : 0,
        detalles:
          detalles ||
          (activa ? "Contingencia fase 1 activada" : "Sin contingencia"),
        fuente: fuente || "n8n CAMe Scraper",
        ultima_actualizacion: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      console.error("Error guardando contingencia:", error.message);
      return NextResponse.json(
        { success: false, error: "No se pudo guardar el estado." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Estado guardado en Supabase correctamente",
      data,
    });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json(
      { success: false, error: "Error procesando la petición del webhook." },
      { status: 500 },
    );
  }
}
