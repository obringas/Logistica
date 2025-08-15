'use client';

import { useState, useMemo, useEffect } from "react"; // AÑADIDO: useEffect
import { StockItem } from "@/hooks/useStockData";
import { useDetalleStock } from "@/hooks/useDetalleStock";
import { DetalleStockTabla } from "./DetalleStockTabla";
import { PackageSearch, Loader2, FileDown, Search } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  data: StockItem[] | null;
  loading: boolean;
}

const ITEMS_POR_PAGINA = 30;

export function ResultadoStock({ data, loading }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [selectedIdGrado, setSelectedIdGrado] = useState<number | null>(null);
  const { detalle, fetchDetalle, loading: loadingDetalle } = useDetalleStock();

  const stockData = data || [];

  // ✅ CORRECCIÓN 1: Lógica de carga y apertura del modal desacoplada
  const handleVerDetalle = (idGrado: number) => {
    // Solo marcamos qué fila estamos cargando e iniciamos el fetch
    setSelectedIdGrado(idGrado);
    fetchDetalle(idGrado);
  };
  
  // Este nuevo useEffect observa los datos y abre el modal cuando están listos
  useEffect(() => {
    if (!loadingDetalle && selectedIdGrado !== null && detalle && detalle.length > 0) {
      setDetalleOpen(true);
    }
     // Si la carga terminó pero no hay datos, informamos y reseteamos
    else if (!loadingDetalle && selectedIdGrado !== null && (!detalle || detalle.length === 0)) {
        alert("No se encontró detalle para el grado seleccionado.");
        setSelectedIdGrado(null);
    }
  }, [loadingDetalle, detalle, selectedIdGrado]);


  const cerrarDetalle = () => {
    setDetalleOpen(false);
    setSelectedIdGrado(null);
  };

  const exportToExcel = () => {
    if (!stockData || stockData.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(stockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");
    
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "reporte_stock.xlsx");
  };

  // ✅ CORRECCIÓN 2: Arreglado el typo en ITEMS_POR_PAGINA
  const totalPaginas = Math.ceil(stockData.length / ITEMS_POR_PAGINA);
  const datosPaginados = useMemo(() => {
    const inicio = (currentPage - 1) * ITEMS_POR_PAGINA;
    return stockData.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [stockData, currentPage]);

  const totalCajas = useMemo(() => 
    stockData.reduce((sum, item) => sum + item.cantidadCajas, 0), 
    [stockData]
  );
  const totalKilos = useMemo(() => 
    stockData.reduce((sum, item) => sum + item.kilosTotales, 0), 
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
      {loadingDetalle && (
          <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex items-center gap-3 text-blue-700 font-medium">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Cargando detalle...
              </div>
          </div>
      )}

      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <PackageSearch className="w-5 h-5" />
          Resultados del Stock
        </div>
        <button
          onClick={exportToExcel}
          disabled={!stockData || stockData.length === 0 || loadingDetalle}
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
                <th className="px-3 py-2 text-center">Detalle</th>
                <th className="px-3 py-2">Producto</th>
                <th className="px-3 py-2">Variedad</th>
                <th className="px-3 py-2">Grado</th>
                <th className="px-3 py-2">Galpón</th>
                <th className="px-3 py-2">Estiba</th>
                <th className="px-3 py-2 text-center">Cant. Cajas</th>
                <th className="px-3 py-2 text-center">Rango Cajas</th>
                <th className="px-3 py-2 text-right">Kilos</th>
                <th className="px-3 py-2 text-right">Tara</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Propietario</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((item) => (
                <tr key={item.id_gradoMarca} className="border-b hover:bg-blue-50">
                  <td className="px-3 py-2 text-center">
                    <button 
                      onClick={() => handleVerDetalle(item.id_gradoMarca)} 
                      className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-wait" 
                      title="Ver detalle de cajas"
                      disabled={loadingDetalle}
                    >
                      {loadingDetalle && selectedIdGrado === item.id_gradoMarca ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-2">{item.tipoProducto}</td>
                  <td className="px-3 py-2">{item.variedad}</td>
                  <td className="px-3 py-2">{item.nombreGradoMarca}</td>
                  <td className="px-3 py-2">{item.nombreGalpon}</td>
                  <td className="px-3 py-2">{item.nombreEstiba}</td>
                  <td className="px-3 py-2 text-center">{item.cantidadCajas}</td>
                  <td className="px-3 py-2 text-center">{item.rangoCajas}</td>
                  <td className="px-3 py-2 text-right">{item.kilosTotales.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right">{item.tara.toFixed(2)}</td>
                  <td className="px-3 py-2">{item.nombreEstado}</td>
                  <td className="px-3 py-2">{item.propietarioNombre}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-200 font-bold">
              <tr>
                <td colSpan={6} className="px-3 py-2 text-right">TOTALES GENERALES:</td>
                <td className="px-3 py-2 text-center">{totalCajas}</td>
                <td className="px-3 py-2 text-center"></td>
                <td className="px-3 py-2 text-right">{totalKilos.toFixed(2)}</td>
                <td colSpan={3} className="px-3 py-2"></td>
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
              disabled={currentPage === 1 || loadingDetalle}
              className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={irAPaginaSiguiente}
              disabled={currentPage === totalPaginas || loadingDetalle}
              className="px-4 py-1 text-sm bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {detalleOpen && selectedIdGrado !== null && (
        <DetalleStockTabla detalle={detalle || []} loading={loadingDetalle} onClose={cerrarDetalle} />
      )}
    </div>
  );
}