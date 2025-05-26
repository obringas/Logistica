import { StockItem } from "@/hooks/useStockData";

interface Props {
  data: StockItem[];
  loading: boolean;
}

export function ResultadoStock({ data, loading }: Props) {
  if (loading) return <div className="p-4">Cargando stock...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-2 py-1">Producto</th>
            <th className="border px-2 py-1">Variedad</th>
            <th className="border px-2 py-1">Galpón</th>
            <th className="border px-2 py-1">Estiba</th>
            <th className="border px-2 py-1">Cajas</th>
            <th className="border px-2 py-1">Kilos</th>
            <th className="border px-2 py-1">Warrant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-sm border-t">
              <td className="border px-2 py-1">{item.tipoProducto}</td>
              <td className="border px-2 py-1">{item.variedad}</td>
              <td className="border px-2 py-1">{item.nombreGalpon}</td>
              <td className="border px-2 py-1">{item.nombreEstiba}</td>
              <td className="border px-2 py-1">{item.cantidadCajas}</td>
              <td className="border px-2 py-1">{item.kilosTotales}</td>
              <td className="border px-2 py-1">{item.afectado_warrant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
