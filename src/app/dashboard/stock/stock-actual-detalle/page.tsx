"use client";

import { useState } from "react";
import { FiltrosStockDetalle } from "@/components/stock/stock-actual-detalle/FiltrosStockDetalle";
import { ResultadoStockDetalle } from "@/components/stock/stock-actual-detalle/ResultadoStockDetalle";
import { StockActualDetalleRequest } from "@/services/stockService";
import { useStockActualDetalle } from "@/hooks/useStockActualDetalle";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

export default function StockActualDetallePage() {
  const [filters, setFilters] = useState<StockActualDetalleRequest>({
    campania: new Date().getFullYear(), // Inicia con el año actual
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(true); // Para el panel plegable

  const { data, loading, fetchStockActualDetalle } = useStockActualDetalle();

  const handleSubmit = async () => {
    // Asegurarse de que la campaña sea un número
    const campaignNumber = Number(filters.campania);
    if (isNaN(campaignNumber) || campaignNumber === 0) {
      alert("Por favor, ingrese una campaña válida.");
      return;
    }
    await fetchStockActualDetalle({ ...filters, campania: campaignNumber });
  };

  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">📊 Stock Actual Detalle</h1>

      {/* Tarjeta de Filtros Plegable */}
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
            <FiltrosStockDetalle
              filters={filters}
              onChange={setFilters}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}
      </div>
      
      {/* Tarjeta de Resultados */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <ResultadoStockDetalle data={data} loading={loading} />
      </div>
    </div>
  );
}
