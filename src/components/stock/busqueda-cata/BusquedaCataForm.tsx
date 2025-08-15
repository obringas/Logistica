'use client';

import { BusquedaCataRequest } from "@/services/stockService";
import { ChangeEvent } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  filtros: BusquedaCataRequest;
  setFiltros: (f: BusquedaCataRequest) => void;
  onBuscar: () => Promise<void>;
  onLimpiar: () => void;
  loading: boolean;
}

export function BusquedaCataForm({ filtros, setFiltros, onBuscar, onLimpiar, loading }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Aseguramos que el valor sea numérico
    setFiltros({ ...filtros, [name]: Number(value) || 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBuscar();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nro de CATA (campo principal) */}
        <div>
          <label htmlFor="nroCata" className="block text-sm font-semibold mb-1 text-gray-700">Nro de CATA</label>
          <input
            id="nroCata"
            type="number"
            name="nroCata"
            value={filtros.nroCata === 0 ? '' : filtros.nroCata}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el nro de cata..."
          />
        </div>
        
        {/* ID Grado (opcional) */}
        <div>
          <label htmlFor="idGrado" className="block text-sm font-semibold mb-1 text-gray-700">ID Grado (Opcional)</label>
          <input
            id="idGrado"
            type="number"
            name="idGrado"
            value={filtros.idGrado === 0 ? '' : filtros.idGrado}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Filtrar por ID de grado"
          />
        </div>

        {/* ID Propietario (opcional) */}
        <div>
          <label htmlFor="idPropietario" className="block text-sm font-semibold mb-1 text-gray-700">ID Propietario (Opcional)</label>
          <input
            id="idPropietario"
            type="number"
            name="idPropietario"
            value={filtros.idPropietario === 0 ? '' : filtros.idPropietario}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Filtrar por ID de propietario"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button 
          onClick={onLimpiar} 
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Limpiar
        </button>
        <button 
          onClick={onBuscar} 
          disabled={loading}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </div>
  );
}