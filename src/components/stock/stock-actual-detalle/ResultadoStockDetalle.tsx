"use client";

import { useState, useMemo } from "react";
import { StockActualDetalleItem } from "@/services/stockService";
import { PackageSearch, Loader2, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  data: StockActualDetalleItem[] | null;
  loading: boolean;
}

const ITEMS_POR_PAGINA = 30;

export function ResultadoStockDetalle({ data, loading }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const stockData = data || [];

  const exportToExcel = () => {
    if (!stockData || stockData.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(stockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockActualDetalle");
    
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "reporte_stock_actual_detalle.xlsx");
  };

  const totalPaginas = Math.ceil(stockData.length / ITEMS_POR_PAGINA);
  const datosPaginados = useMemo(() => {
    const inicio = (currentPage - 1) * ITEMS_POR_PAGINA;
    return stockData.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [stockData, currentPage]);

  const totalKgsNeto = useMemo(() => 
    stockData.reduce((sum, item) => sum + item.kgsNeto, 0), 
    [stockData]
  );

  const irAPaginaSiguiente = () => {
    if (currentPage < totalPaginas) setCurrentPage(prev => prev + 1);
  };

  const irAPaginaAnterior = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <PackageSearch className="w-5 h-5" />
          Resultados del Stock Actual Detalle
        </div>
        <button
          onClick={exportToExcel}
          disabled={!stockData || stockData.length === 0}
          className="hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Exportar a Excel"
        >
          <FileDown className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex-grow overflow-x-auto">
        {loading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        ) : stockData.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No se encontraron resultados.</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
              <tr>
                <th className="px-3 py-2">Grado</th>
                <th className="px-3 py-2">Nro Bulto</th>
                <th className="px-3 py-2">Nro CATA</th>
                <th className="px-3 py-2">Fecha Grabación</th>
                <th className="px-3 py-2">Campaña</th>
                <th className="px-3 py-2 text-right">Kgs Neto</th>
                <th className="px-3 py-2 text-right">Tara</th>
                <th className="px-3 py-2">Propietario</th>
                <th className="px-3 py-2">Boleta DGI</th>
                <th className="px-3 py-2">Galpón</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 even:bg-gray-50 hover:bg-blue-50">
                  <td className="px-3 py-2">{item.grado}</td>
                  <td className="px-3 py-2">{item.nroBulto}</td>
                  <td className="px-3 py-2">{item.nroCATA}</td>
                  <td className="px-3 py-2">{new Date(item.fyhGrabacion).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{item.campania}</td>
                  <td className="px-3 py-2 text-right">{item.kgsNeto.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">{item.tara.toFixed(2)}</td>
                  <td className="px-3 py-2">{item.propietario}</td>
                  <td className="px-3 py-2">{item.boletaDGI}</td>
                  <td className="px-3 py-2">{item.galpon}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-200 font-bold">
              <tr>
                <td colSpan={5} className="px-3 py-2 text-right">TOTAL KGS NETO:</td>
                <td className="px-3 py-2 text-right">{totalKgsNeto.toFixed(2)}</td>
                <td colSpan={4} className="px-3 py-2"></td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      
      {!loading && stockData.length > 0 && (
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <span className="text-sm text-gray-600">
            Mostrando {datosPaginados.length} de {stockData.length} resultados. Página {currentPage} de {totalPaginas}.
          </span>
          <div className="flex gap-2">
            <button
              onClick={irAPaginaAnterior}
              disabled={currentPage === 1}
              className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={irAPaginaSiguiente}
              disabled={currentPage === totalPaginas}
              className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
