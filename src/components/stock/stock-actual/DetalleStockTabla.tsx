'use client';

import { useState, useMemo, useEffect } from "react";
import { DetalleItem } from "@/hooks/useDetalleStock";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ListChecks, Loader2, FileDown, X } from "lucide-react";

interface Props {
  detalle: DetalleItem[];
  loading: boolean;
  onClose: () => void;
}

const ITEMS_POR_PAGINA = 30; // 👈 Requisito: Paginación de 30 items

export function DetalleStockTabla({ detalle, loading, onClose }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(detalle);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DetalleStock");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "detalle_stock.xlsx");
  };
  
  // --- Lógica de Paginación y Totales ---
  const totalPaginas = Math.ceil(detalle.length / ITEMS_POR_PAGINA);
  const datosPaginados = useMemo(() => {
    const inicio = (currentPage - 1) * ITEMS_POR_PAGINA;
    return detalle.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [detalle, currentPage]);

  const totalItems = useMemo(() => detalle.length, [detalle]);

  const irAPaginaSiguiente = () => {
    if (currentPage < totalPaginas) setCurrentPage(prev => prev + 1);
  };

  const irAPaginaAnterior = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  
  // Efecto para cerrar el modal con la tecla 'Escape'
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    // ✅ Requisito: Interfaz Modal Profesional
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Cierra el modal al hacer clic en el fondo
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between bg-teal-600 text-white px-4 py-2 rounded-t-xl">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <ListChecks className="w-5 h-5" />
            Detalle de Cajas por Grado
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportToExcel}
              disabled={!detalle || detalle.length === 0}
              className="hover:opacity-80 transition disabled:opacity-50"
              title="Exportar a Excel"
            >
              <FileDown className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="hover:opacity-80 transition" title="Cerrar (Esc)">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenido principal del Modal (tabla) */}
        <div className="p-4 flex-grow overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              <span className="ml-3 text-gray-600">Cargando detalle...</span>
            </div>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase font-semibold sticky top-0">
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
                {datosPaginados.map((d, i) => (
                  <tr key={i} className="border-b hover:bg-teal-50">
                    <td className="px-3 py-2">{d.nombreGradoMarca}</td>
                    <td className="px-3 py-2">{d.campania}</td>
                    <td className="px-3 py-2">{d.nroCATA}</td>
                    <td className="px-3 py-2">{d.boletaDGI}</td>
                    <td className="px-3 py-2">{d.nroBulto}</td>
                    <td className="px-3 py-2">{d.deposito}</td>
                    <td className="px-3 py-2">{d.galpon}</td>
                    <td className="px-3 py-2">{d.estiba}</td>
                  </tr>
                ))}
              </tbody>
               {/* ✅ Requisito: Fila de Totales */}
              <tfoot className="bg-gray-200 font-bold">
                <tr>
                  <td colSpan={7} className="px-3 py-2 text-right">TOTAL DE CAJAS:</td>
                  <td className="px-3 py-2 text-left">{totalItems}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Controles de Paginación */}
        {!loading && detalle.length > 0 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-xl">
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPaginas}
            </span>
            <div className="flex gap-2">
              <button
                onClick={irAPaginaAnterior}
                disabled={currentPage === 1}
                className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={irAPaginaSiguiente}
                disabled={currentPage === totalPaginas}
                className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}