"use client";

import { FC } from "react";

interface ReprocesoResponse {
  tipo: string;
  marcaProducida: string;
  marcaProcesada: string;
  nroOpProducida: number;
  kgsNeto: number;
  kilos: number;
  rendimiento: number;
  kilosDescripcion: string;
  kgsNetoDescripcion: string;
  rendimientoDescripcion: string;
}

interface Props {
  resultados: ReprocesoResponse[];
  loading: boolean;
}

export const InfoReprocesoResultado: FC<Props> = ({ resultados, loading }) => {
  if (loading) return <div className="text-blue-600">🔄 Cargando...</div>;
  if (!resultados || resultados.length === 0)
    return <div className="text-gray-500">No hay resultados.</div>;

  return (
    <div className="mt-4 border rounded shadow overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Marca Procesada</th>
              <th className="px-3 py-2">Marca Producida</th>
              <th className="px-3 py-2 text-center">OP Producida</th>
              <th className="px-3 py-2 text-center">Kilos</th>
              <th className="px-3 py-2 text-center">Kgs Neto</th>
              <th className="px-3 py-2 text-center">Rendimiento</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item, idx) => {
              const isTotal = item.tipo?.toUpperCase() === "TOTAL";

              return (
                <tr key={idx} className={`border-t ${isTotal ? "font-bold text-green-700" : ""}`}>
                  <td className="px-3 py-2">{item.tipo}</td>
                  <td className="px-3 py-2">{item.marcaProcesada}</td>
                  <td className="px-3 py-2">{item.marcaProducida}</td>
                  <td className="px-3 py-2 text-center">{item.nroOpProducida}</td>
                  <td className="px-3 py-2 text-center">{item.kilosDescripcion}</td>
                  <td className="px-3 py-2 text-center">{item.kgsNetoDescripcion}</td>
                  <td className="px-3 py-2 text-center">{item.rendimientoDescripcion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
