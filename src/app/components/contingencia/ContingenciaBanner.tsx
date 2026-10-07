import type { ContingenciaData } from "@/hooks/useContingencia";

interface Props {
  data: ContingenciaData | null;
  loading: boolean;
}

export default function ContingenciaBanner({ data, loading }: Props) {
  if (loading || !data?.contingenciaActiva) return null;

  return (
    <div className="bg-red-600 text-white p-5 rounded-3xl shadow-lg flex items-center gap-4 animate-pulse">
      <span className="text-4xl">🚨</span>
      <div>
        <p className="font-extrabold text-xl">
          ¡CONTINGENCIA AMBIENTAL ACTIVA (Fase {data.fase})!
        </p>
        <p className="text-sm opacity-95">{data.detalles}</p>
      </div>
    </div>
  );
}
