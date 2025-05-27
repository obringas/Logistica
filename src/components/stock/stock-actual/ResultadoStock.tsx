// src/components/stock/stock-actual/ResultadoStock.tsx
import { StockItem } from "@/hooks/useStockData";

interface Props {
  data: StockItem[] | null;
  loading: boolean;
}

export function ResultadoStock({ data, loading }: Props) {
  if (loading) {
    return <div className="text-center text-blue-600 font-semibold">🔄 Cargando resultados...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No hay resultados para los filtros aplicados.</div>;
  }

  return (
    <div className="overflow-x-auto mt-4 border rounded shadow">
      <table className="min-w-full text-sm text-left text-gray-700 bg-white">
        <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Variedad</th>
            <th className="px-4 py-2">Grado</th>
            <th className="px-4 py-2">Galpón</th>
            <th className="px-4 py-2">Estiba</th>
            <th className="px-4 py-2">Cajas</th>
            <th className="px-4 py-2">Kilos Totales</th>
            <th className="px-4 py-2">Tara</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Propietario</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{item.tipoProducto}</td>
              <td className="px-4 py-2">{item.variedad}</td>
              <td className="px-4 py-2">{item.nombreGradoMarca}</td>
              <td className="px-4 py-2">{item.nombreGalpon}</td>
              <td className="px-4 py-2">{item.nombreEstiba}</td>
              <td className="px-4 py-2 text-center">{item.cantidadCajas}</td>
              <td className="px-4 py-2 text-right">{item.kilosTotales.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">{item.tara.toFixed(2)}</td>
              <td className="px-4 py-2">{item.nombreEstado}</td>
              <td className="px-4 py-2">{item.propietarioNombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
