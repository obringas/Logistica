'use client';
import { DetalleItem } from "@/hooks/useDetalleStock";

interface Props {
  resultados: DetalleItem[];
  loading: boolean;
}


export function BusquedaCataResultado({ resultados, loading }: Props) {
  if (loading) return <p className="text-blue-600">🔄 Buscando...</p>;
  if (!resultados || resultados.length === 0) return <p className="text-gray-500">No se encontraron resultados.</p>;

  return (
    <div className="mt-4 border rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 font-semibold text-xs uppercase text-gray-600">
          <tr>
            <th className="px-2 py-1">Grado</th>
            <th className="px-2 py-1">Campaña</th>
            <th className="px-2 py-1">CATA</th>
            <th className="px-2 py-1">Boleta DGI</th>
            <th className="px-2 py-1">Bulto</th>
            <th className="px-2 py-1">Depósito</th>
            <th className="px-2 py-1">Galpón</th>
            <th className="px-2 py-1">Estiba</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((d, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-2 py-1">{d.nombreGradoMarca}</td>
              <td className="px-2 py-1">{d.campania}</td>
              <td className="px-2 py-1">{d.nroCATA}</td>
              <td className="px-2 py-1">{d.boletaDGI}</td>
              <td className="px-2 py-1">{d.nroBulto}</td>
              <td className="px-2 py-1">{d.deposito}</td>
              <td className="px-2 py-1">{d.galpon}</td>
              <td className="px-2 py-1">{d.estiba}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
