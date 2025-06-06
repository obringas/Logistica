"use client";

import { FC } from "react";

interface ProductoResultadoItem {
  producto: string;
  marca: string | null;
  lote: string | null;
  kilos: number;
  cajas: number;
  cajasRechazadas: number;
  tipoProductoId: number;
  porcentaje: number;
  kilosDescripcion: string;
  cajasDescripcion: string;
  porcentajeDescripcion: string;
}

interface Props {
  resultados: ProductoResultadoItem[];
  loading: boolean;
}

export const InfoProductosResultado: FC<Props> = ({ resultados, loading }) => {
  if (loading) return <div className="text-blue-600">🔄 Cargando...</div>;
  if (!resultados || resultados.length === 0)
    return <div className="text-gray-500">No hay resultados.</div>;

  return (
    <div className="mt-4 border rounded shadow overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">Producto</th>
              <th className="px-3 py-2">Marca</th>
              <th className="px-3 py-2">Lote</th>
              <th className="px-3 py-2 text-center">Kilos</th>
              <th className="px-3 py-2 text-center">Cajas</th>
              <th className="px-3 py-2 text-center">Rechazadas</th>
              <th className="px-3 py-2 text-center">%</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item, idx) => {
              const isTotal = item.producto?.toUpperCase() === "PRODUCTO TOTAL";

              return (
                <tr key={idx} className={`border-t ${isTotal ? "font-bold text-green-700" : ""}`}>
                  <td className="px-3 py-2">{item.producto}</td>
                  <td className="px-3 py-2">{item.marca ?? ""}</td>
                  <td className="px-3 py-2">{item.lote ?? ""}</td>
                  <td className="px-3 py-2 text-center">{item.kilosDescripcion}</td>
                  <td className="px-3 py-2 text-center">{item.cajasDescripcion}</td>
                  <td className="px-3 py-2 text-center">{item.cajasRechazadas}</td>
                  <td className="px-3 py-2 text-center">{item.porcentajeDescripcion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
