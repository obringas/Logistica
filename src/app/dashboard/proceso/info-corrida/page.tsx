"use client";

import { useState } from "react";
import { useInfoCorrida } from "@/hooks/useInfoCorrida";
import { InfoCorridaFiltros } from "@/components/proceso/info-corrida/InfoCorridaFiltros";
import { InfoCorridaResultado } from "@/components/proceso/info-corrida/InfoCorridaResultado";
import { InfoProductosResultado } from "@/components/proceso/info-corrida/infoProductoResultado";
import { InfoReprocesoResultado } from "@/components/proceso/info-corrida/InfoReprocesoResultado";
import {
  FileDown,
  LineChart,
  PackageSearch,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function InfoCorridaPage() {
  const corrida = useInfoCorrida();
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const exportToExcel = (
    data: object[],
    nombreHoja: string,
    tipo: "corrida" | "productos" | "sobrantes" | "mermas" | "reprocesos"
  ) => {
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
      <h2 className="text-2xl font-bold text-gray-800">⚙️ Información de Corrida</h2>

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
            <InfoCorridaFiltros {...corrida} />
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda: Corrida + Mermas + Reprocesos */}
        <div className="space-y-6">
          {/* Corrida Original */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <LineChart className="w-5 h-5" />
                Corrida Original
              </div>
              <button
                onClick={() => exportToExcel(corrida.resultados, "Corrida", "corrida")}
                className="hover:opacity-80 transition"
              >
                <FileDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <InfoCorridaResultado
                resultados={corrida.resultados}
                loading={corrida.loading}
              />
            </div>
          </div>

          {/* Mermas */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-rose-600 text-white px-4 py-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <LineChart className="w-5 h-5" />
                Mermas
              </div>
              <button
                onClick={() => exportToExcel(corrida.mermas, "Mermas", "mermas")}
                className="hover:opacity-80 transition"
              >
                <FileDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <InfoCorridaResultado
                resultados={corrida.mermas}
                loading={corrida.loading}
              />
            </div>
          </div>

          {/* Reprocesos */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <LineChart className="w-5 h-5" />
                Reprocesos
              </div>
              <button
                onClick={() => exportToExcel(corrida.reprocesos, "Reprocesos", "reprocesos")}
                className="hover:opacity-80 transition"
              >
                <FileDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <InfoReprocesoResultado
                resultados={corrida.reprocesos}
                loading={corrida.loading}
              />
            </div>
          </div>
        </div>

        {/* Columna derecha: Productos + Sobrantes */}
        <div className="space-y-6">
          {/* Productos Procesados */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-green-600 text-white px-4 py-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <PackageSearch className="w-5 h-5" />
                Productos Procesados
              </div>
              <button
                onClick={() => exportToExcel(corrida.productos, "Productos", "productos")}
                className="hover:opacity-80 transition"
              >
                <FileDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <InfoProductosResultado
                resultados={corrida.productos}
                loading={corrida.loading}
              />
            </div>
          </div>

          {/* Sobrantes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-yellow-600 text-white px-4 py-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <PackageSearch className="w-5 h-5" />
                Sobrantes
              </div>
              <button
                onClick={() => exportToExcel(corrida.sobrantes, "Sobrantes", "sobrantes")}
                className="hover:opacity-80 transition"
              >
                <FileDown className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <InfoProductosResultado
                resultados={corrida.sobrantes}
                loading={corrida.loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global loading spinner */}
      {corrida.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-blue-700 font-medium">Cargando datos...</span>
          </div>
        </div>
      )}
    </div>
  );
}
