"use client";

import { useEffect, useMemo } from "react";
import { StockActualDetalleRequest } from "@/services/stockService";
import { useCampaniaData } from "@/hooks/useCampaniaData";

interface Props {
  filters: StockActualDetalleRequest;
  onChange: (filters: StockActualDetalleRequest) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function FiltrosStockDetalle({ filters, onChange, onSubmit, loading }: Props) {
  const { campanias, fetchCampanias, loading: loadingCampanias } = useCampaniaData();

  const campaniasOptions = useMemo(() => {
    // Asegúrate de que la opción "Todas" o similar no se incluya si la campaña es obligatoria
    // Aquí, simplemente mapeamos las campañas existentes.
    return campanias;
  }, [campanias]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  useEffect(() => {
    fetchCampanias();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Campaña <span className="text-red-500">*</span></label>
          <select
            name="campania"
            value={filters.campania}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            disabled={loadingCampanias}
          >
            {loadingCampanias && campanias.length === 0 ? (
              <option>Cargando...</option>
            ) : (
              campaniasOptions.map(c => (
                <option key={c.codigo_Camp} value={c.codigo_Camp}>
                  {c.codigo_Camp}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Grado (Opcional)</label>
          <input
            type="text"
            name="nombreGrado"
            value={filters.nombreGrado || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Ej: SCOF"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onSubmit}
          disabled={loading || !filters.campania}
          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white ${
            loading || !filters.campania ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Consultando..." : "Buscar"}
        </button>
      </div>
    </div>
  );
}
