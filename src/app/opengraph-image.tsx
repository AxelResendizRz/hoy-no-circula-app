import { ImageResponse } from "next/og";

export const alt = "Hoy No Circula CDMX y EDOMEX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 34,
          fontWeight: 700,
          color: "#34d399",
          marginBottom: 24,
        }}
      >
        CDMX y EDOMEX
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.05,
        }}
      >
        Hoy No Circula
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 44,
          marginTop: 32,
          color: "#cbd5e1",
        }}
      >
        ¿Circula mi auto hoy? Placa, engomado y holograma.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          gap: 16,
        }}
      >
        {["#facc15", "#f472b6", "#ef4444", "#10b981", "#2563eb"].map((c) => (
          <div
            key={c}
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: c,
            }}
          />
        ))}
      </div>
    </div>,
    size,
  );
}
