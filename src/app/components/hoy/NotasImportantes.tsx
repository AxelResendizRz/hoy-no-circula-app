const NOTAS = [
  {
    icono: "🕔",
    texto:
      "La restricción empieza a las 5:00 h, así que si sales de madrugada ya aplica.",
  },
  {
    icono: "🚨",
    texto:
      "En una contingencia ambiental pueden sumarse restricciones adicionales; revisa el aviso en la parte superior.",
  },
  {
    icono: "🔎",
    texto:
      "Tu holograma depende de tu última verificación vehicular, no solo del color del engomado.",
  },
];

export default function NotasImportantes() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
      <h2 className="text-xl font-black text-slate-900">Ten en cuenta</h2>
      <ul className="space-y-2 text-sm text-slate-600">
        {NOTAS.map((nota) => (
          <li key={nota.icono} className="flex gap-2">
            <span>{nota.icono}</span>
            <span>{nota.texto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
