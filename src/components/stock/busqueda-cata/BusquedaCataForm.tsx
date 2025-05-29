'use client';
import { BusquedaCataRequest } from "@/hooks/useBusquedaCata";
import { ChangeEvent } from "react";

interface Props {
  filtros: BusquedaCataRequest;
  setFiltros: (f: BusquedaCataRequest) => void;
  onBuscar: (data: BusquedaCataRequest) => Promise<void>;
  onLimpiar: () => void;
}

export function BusquedaCataForm({ filtros, setFiltros, onBuscar, onLimpiar }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-lg font-semibold mb-3">🔍 Búsqueda por CATA</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          name="idGrado"
          value={filtros.idGrado}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="ID Grado"
        />
        <input
          type="number"
          name="idPropietario"
          value={filtros.idPropietario}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="ID Propietario"
        />
        <input
          type="number"
          name="nroCata"
          value={filtros.nroCata}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="Nro CATA"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onBuscar(filtros)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
        <button onClick={onLimpiar} className="bg-gray-300 text-black px-4 py-2 rounded">
          Limpiar
        </button>
      </div>
    </div>
  );
}
