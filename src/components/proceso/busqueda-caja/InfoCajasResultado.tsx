"use client";

import { FC } from "react";

export interface ProductoCajaResponse {
  campania: number;
  nroOperacion: number;
  marca: string;
  nroBulto: string;
  nroCATA: string;
  kgsNeto: number;
  tara: number;
  fecha: string;
  lote: string;
  estado: string;
  nroEnCorrida?: number;
  nroEnMarca?: number;
  nroEnLotnumber?: number;
  lotNumberCliente: string;
}

interface Props {
  cajas: ProductoCajaResponse[];
  loading: boolean;
}

export const InfoCajasResultado: FC<Props> = ({ cajas, loading }) => {
  if (loading) return <div className="text-blue-600">🔄 Cargando...</div>;
  if (!cajas || cajas.length === 0)
    return <div className="text-gray-500">No hay resultados de cajas.</div>;

  return (
    <div className="mt-4 border rounded shadow overflow-hidden">
      <div className="max-h-[400px] overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">Marca</th>
              <th className="px-3 py-2">Nro Bulto</th>
              <th className="px-3 py-2">Nro CATA</th>
              <th className="px-3 py-2 text-center">Kgs Neto</th>
              <th className="px-3 py-2 text-center">Tara</th>
              <th className="px-3 py-2">Lote</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2 text-center">N° en Corrida</th>
              <th className="px-3 py-2 text-center">N° en Marca</th>
              <th className="px-3 py-2 text-center">N° en Lote</th>
              <th className="px-3 py-2">Lot Number Cliente</th>
              <th className="px-3 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {cajas.map((caja, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2">{caja.marca}</td>
                <td className="px-3 py-2">{caja.nroBulto}</td>
                <td className="px-3 py-2">{caja.nroCATA}</td>
                <td className="px-3 py-2 text-center">{caja.kgsNeto.toFixed(2)}</td>
                <td className="px-3 py-2 text-center">{caja.tara.toFixed(2)}</td>
                <td className="px-3 py-2">{caja.lote}</td>
                <td className="px-3 py-2">{caja.estado}</td>
                <td className="px-3 py-2 text-center">{caja.nroEnCorrida ?? ""}</td>
                <td className="px-3 py-2 text-center">{caja.nroEnMarca ?? ""}</td>
                <td className="px-3 py-2 text-center">{caja.nroEnLotnumber ?? ""}</td>
                <td className="px-3 py-2">{caja.lotNumberCliente}</td>
                <td className="px-3 py-2">{new Date(caja.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
