// components/stock/stock-actual/ResultadoStock.tsx
'use client';
import { useState } from "react";
import { StockItem } from "@/hooks/useStockData";
import { useDetalleStock } from "@/hooks/useDetalleStock";
import * as XLSX from "xlsx";
import { DetalleStockTabla } from "./DetalleStockTabla";

interface Props {
  data: StockItem[] | null;
  loading: boolean;
}

const ITEMS_PER_PAGE = 10;

export function ResultadoStock({ data, loading }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [selectedIdGrado, setSelectedIdGrado] = useState<number | null>(null);
  const { detalle, fetchDetalle, loading: loadingDetalle } = useDetalleStock();

  const handleVerDetalle = async (idGrado: number) => {
    setSelectedIdGrado(idGrado);
    await fetchDetalle(idGrado);
    setDetalleOpen(true);
  };

  const exportToExcel = () => {
    if (!data) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");
    XLSX.writeFile(workbook, "reporte_stock.xlsx");
  };

  if (loading) return <div className="text-center text-blue-600">🔄 Cargando...</div>;
  if (!data || data.length === 0) return <div className="text-center text-gray-500">No hay resultados.</div>;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span>Resultados: {data.length}</span>
        <button onClick={exportToExcel} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">📤 Exportar a Excel</button>
      </div>

      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
            <tr>
              <th className="px-2 py-1">🔍</th>
              <th className="px-2 py-1">Producto</th>
              <th className="px-2 py-1">Variedad</th>
              <th className="px-2 py-1">Grado</th>
              <th className="px-2 py-1">Galpón</th>
              <th className="px-2 py-1">Estiba</th>
              <th className="px-2 py-1">Cant. Cajas</th>
              <th className="px-2 py-1">Rango Cajas</th>
              <th className="px-2 py-1">Kilos</th>
              <th className="px-2 py-1">Tara</th>
              <th className="px-2 py-1">Estado</th>
              <th className="px-2 py-1">Propietario</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-2 py-1 text-center">
                  <button onClick={() => handleVerDetalle(item.id_gradoMarca)} className="text-blue-600 hover:text-blue-800">
                    🔍
                  </button>
                </td>
                <td className="px-2 py-1">{item.tipoProducto}</td>
                <td className="px-2 py-1">{item.variedad}</td>
                <td className="px-2 py-1">{item.nombreGradoMarca}</td>
                <td className="px-2 py-1">{item.nombreGalpon}</td>
                <td className="px-2 py-1">{item.nombreEstiba}</td>
                <td className="px-2 py-1 text-center">{item.cantidadCajas}</td>
                <td className="px-2 py-1 text-center">{item.rangoCajas}</td>
                <td className="px-2 py-1 text-right">{item.kilosTotales.toFixed(2)}</td>
                <td className="px-2 py-1 text-right">{item.tara.toFixed(2)}</td>
                <td className="px-2 py-1">{item.nombreEstado}</td>
                <td className="px-2 py-1">{item.propietarioNombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-3 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}>
            {i + 1}
          </button>
        ))}
      </div>

      {detalleOpen && selectedIdGrado !== null && (
        <DetalleStockTabla detalle={detalle} loading={loadingDetalle} onClose={() => setDetalleOpen(false)} />
      )}
    </div>
  );
}
