import { useState } from "react";
import { DetalleItem } from "@/hooks/useDetalleStock";
import * as XLSX from "xlsx";

interface Props {
  detalle: DetalleItem[];
  loading: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 10;

export function DetalleStockTabla({ detalle, loading, onClose }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(detalle);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Detalle");
    XLSX.writeFile(wb, "detalle_stock.xlsx");
  };

  if (loading) return <div className="text-blue-600">Cargando detalle...</div>;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = detalle.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(detalle.length / ITEMS_PER_PAGE);

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">Detalle de Stock</h3>
        <div>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-1 rounded mr-2">📤 Exportar</button>
          <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded">❌ Cerrar</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-200 text-xs uppercase font-semibold">
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
            {paginatedData.map((d, i) => (
              <tr key={i} className="border-t">
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

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-3 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
