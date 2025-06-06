"use client";

import { FC } from "react";

interface ResultadoCorridaItem {
  claseGi: string;
  kilosDescripcion: string;
  porcentajeDescripcion: string;
  kilos: number;
  porcentaje: number;
  kgsNeto: number | null;
}

interface Props {
  resultados: ResultadoCorridaItem[];
  loading: boolean;
}

function getRowClass(claseGi: string): string {
  const texto = claseGi.toUpperCase();

  if (texto.includes("TOTAL") || texto.includes("SUBTOTAL")) return "font-bold text-green-700";
  if (texto.includes("VERDE")) return "text-emerald-600";
  if (texto.includes("SETOUT ING.")) return "text-blue-600";
  if (texto.includes("SETOUT DEV.")) return "text-amber-600";
  if (texto.includes("MOHO")) return "text-fuchsia-600";
  if (texto.includes("NDB")) return "text-pink-600";
  if (texto.includes("DEVOLUCIONES")) return "text-red-600";

  return "";
}

export const InfoCorridaResultado: FC<Props> = ({ resultados, loading }) => {
  if (loading) return <div className="text-blue-600">🔄 Cargando...</div>;
  if (!resultados || resultados.length === 0)
    return <div className="text-gray-500">No hay resultados.</div>;

  return (
    <div className="mt-4 border rounded shadow overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">Clase Interna</th>
              <th className="px-3 py-2 text-center">Kilos</th>
              <th className="px-3 py-2 text-center">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item, idx) => (
              <tr key={idx} className={`border-t ${getRowClass(item.claseGi)}`}>
                <td className="px-3 py-2">{item.claseGi}</td>
                <td className="px-3 py-2 text-center">{item.kilos}</td>
                <td className="px-3 py-2 text-center">{item.porcentaje.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
