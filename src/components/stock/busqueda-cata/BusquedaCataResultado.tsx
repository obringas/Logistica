'use client';

import { DetalleItem } from "@/hooks/useDetalleStock";
import { ListOrdered, Loader2 } from "lucide-react";

interface Props {
  resultados: DetalleItem[];
  loading: boolean;
}

export function BusquedaCataResultado({ resultados, loading }: Props) {
  
  return (
    <div className="flex flex-col h-full">
      {/* Cabecera de la tarjeta */}
      <div className="flex items-center justify-between bg-teal-600 text-white px-4 py-2">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <ListOrdered className="w-5 h-5" />
          Resultados de la Búsqueda
        </div>
        {!loading && resultados && (
          <span className="text-sm font-normal">{resultados.length} registro(s) encontrado(s)</span>
        )}
      </div>

      {/* Contenedor de la tabla */}
      <div className="p-4 flex-grow overflow-x-auto">
        {loading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                <span className="ml-3 text-gray-600">Buscando...</span>
            </div>
        ) : !resultados || resultados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Ingrese un número de CATA para iniciar la búsqueda.</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
              <tr>
                <th className="px-3 py-2">Grado</th>
                <th className="px-3 py-2">Campaña</th>
                <th className="px-3 py-2">CATA</th>
                <th className="px-3 py-2">Boleta DGI</th>
                <th className="px-3 py-2">Bulto</th>
                <th className="px-3 py-2">Depósito</th>
                <th className="px-3 py-2">Galpón</th>
                <th className="px-3 py-2">Estiba</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((d, idx) => (
                <tr key={idx} className="border-b hover:bg-teal-50">
                  <td className="px-3 py-2">{d.nombreGradoMarca}</td>
                  <td className="px-3 py-2">{d.campania}</td>
                  <td className="px-3 py-2 font-bold">{d.nroCATA}</td>
                  <td className="px-3 py-2">{d.boletaDGI}</td>
                  <td className="px-3 py-2">{d.nroBulto}</td>
                  <td className="px-3 py-2">{d.deposito}</td>
                  <td className="px-3 py-2">{d.galpon}</td>
                  <td className="px-3 py-2">{d.estiba}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}