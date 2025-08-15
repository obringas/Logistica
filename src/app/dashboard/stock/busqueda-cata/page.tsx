"use client";

import { useState } from "react";
import { BusquedaCataForm } from "@/components/stock/busqueda-cata/BusquedaCataForm";
import { BusquedaCataResultado } from "@/components/stock/busqueda-cata/BusquedaCataResultado";
import { useBusquedaCata } from "@/hooks/useBusquedaCata";
import { BusquedaCataRequest } from "@/services/stockService";
import {
  SearchCheck,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Toaster, toast } from "sonner";

export default function BusquedaCataPage() {
  const { resultados, buscar, loading, limpiarResultados } = useBusquedaCata(); // Asumimos que el hook ahora expone limpiarResultados
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const [filtros, setFiltros] = useState<BusquedaCataRequest>({
    idGrado: 0,
    idPropietario: 0,
    nroCata: 0,
  });

  const handleBuscar = async () => {
    if (filtros.nroCata > 0) {
      try {
        await buscar(filtros);
      } catch (error) {
        toast.error("Ocurrió un error al buscar los datos.");
      }
    } else {
      toast.error("Por favor, ingrese un número de CATA para buscar.");
    }
  };

  const handleLimpiar = () => {
    setFiltros({ idGrado: 0, idPropietario: 0, nroCata: 0 });
    // Limpiamos los resultados sin hacer una nueva llamada a la API
    limpiarResultados();
  };

  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <SearchCheck className="w-7 h-7" /> Búsqueda por CATA
      </h2>

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
            <BusquedaCataForm
              filtros={filtros}
              setFiltros={setFiltros}
              onBuscar={handleBuscar}
              onLimpiar={handleLimpiar}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Tarjeta de Resultados */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <BusquedaCataResultado resultados={resultados} loading={loading} />
      </div>
    </div>
  );
}