"use client";

import { useState } from "react";
import { useInfoCorrida } from "@/hooks/useInfoCorrida";
import { SlidersHorizontal, ChevronUp, ChevronDown, FileDown, PackageSearch, Loader2 } from "lucide-react";
import { InfoCajasFiltros } from "@/components/proceso/busqueda-caja/infoCajasFiltros";
import { InfoCajasResultado } from "@/components/proceso/busqueda-caja/InfoCajasResultado";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function BusquedaCajaPage() {
  const corrida = useInfoCorrida();
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const exportToExcel = (data: object[], nombreHoja: string, tipo: string) => {
    const campania = corrida.campania ?? "campania";
    const nroOperacion = corrida.operacionSeleccionada ?? "op";
    const nombreArchivo = `${tipo}_${campania}_${nroOperacion}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, nombreArchivo);
  };

  return (
    <div className="relative p-4 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">💰 Búsqueda de Caja</h2>

      {/* Tarjeta Filtros */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div
          className="bg-gray-700 text-white px-4 py-2 font-semibold text-lg flex items-center justify-between cursor-pointer"
          onClick={() => setMostrarFiltros((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filtros de Búsqueda
          </div>
          {mostrarFiltros ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>

        {mostrarFiltros && (
          <div className="p-4 transition-all duration-300 ease-in-out">
            <InfoCajasFiltros {...corrida} />
          </div>
        )}
      </div>

      {/* Resultado con estilo tarjeta y exportación */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        <div className="flex items-center justify-between bg-yellow-600 text-white px-4 py-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <PackageSearch className="w-5 h-5" />
            Resultados de Caja
          </div>
          <button
            onClick={() => exportToExcel(corrida.cajas, "ResultadoCaja", "caja")}
            className="hover:opacity-80 transition"
          >
            <FileDown className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex-grow">
          <InfoCajasResultado cajas={corrida.cajas} loading={corrida.loading} />
        </div>
      </div>

      {/* Spinner global */}
      {corrida.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-yellow-600" />
            <span className="text-yellow-700 font-medium">Cargando datos...</span>
          </div>
        </div>
      )}
    </div>
  );
}
