import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

function secretoValido(recibido: string | null): boolean {
  if (!WEBHOOK_SECRET || !recibido) return false;
  const a = Buffer.from(recibido);
  const b = Buffer.from(WEBHOOK_SECRET);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function ejecutarScrapingYActualizar() {
  const supabaseAdmin = getSupabaseAdmin();

  const resCAMe = await fetch("https://www.gob.mx/came", { cache: "no-store" });
  const html = await resCAMe.text();

  const htmlLower = html.toLowerCase();
  const activa =
    htmlLower.includes("fase 1") ||
    htmlLower.includes("fase i") ||
    htmlLower.includes("se activa contingencia");
  const fase = activa ? 1 : 0;

  const { data, error } = await supabaseAdmin
    .from("contingencia")
    .update({
      activa,
      fase,
      detalles: activa ? "Contingencia Fase 1 activada" : "Sin contingencia",
      fuente: "Vercel Cron Job (CAMe)",
      ultima_actualizacion: new Date().toISOString(),
    })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function GET(request?: NextRequest) {
  const isCron =
    request?.headers?.get("authorization") ===
      `Bearer ${process.env.CRON_SECRET}` ||
    request?.nextUrl?.searchParams?.get("cron") === "true";

  if (isCron) {
    try {
      const data = await ejecutarScrapingYActualizar();
      return NextResponse.json({
        success: true,
        message: "Cron ejecutado con éxito",
        data,
      });
    } catch (err: any) {
      console.error("Error en Vercel Cron:", err?.message || err);
      return NextResponse.json(
        { success: false, error: err?.message || "Error procesando el cron" },
        { status: 500 },
      );
    }
  }

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
    const supabaseAdmin = getSupabaseAdmin();
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

    const { data, error } = await supabaseAdmin
      .from("contingencia")
      .update({
        activa,
        fase: activa ? fase || 1 : 0,
        detalles:
          detalles ||
          (activa ? "Contingencia fase 1 activada" : "Sin contingencia"),
        fuente: fuente || "Manual / External Webhook",
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
