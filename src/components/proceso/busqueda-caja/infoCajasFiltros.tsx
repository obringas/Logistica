"use client";

import { useEffect } from "react";
import { useInfoCorrida } from "@/hooks/useInfoCorrida";

interface Props extends ReturnType<typeof useInfoCorrida> {}

export function InfoCajasFiltros({
  campania,
  setCampania,
  blendSeleccionado,
  setBlendSeleccionado,
  operacionSeleccionada,
  setOperacionSeleccionada,
  blends,
  operaciones,
  loading,
  cargarBlends,
  cargarOperaciones,
  buscarCajas,
}: Props) {
  useEffect(() => {
    if (campania && campania > 0) cargarBlends(campania);
  }, [campania]);

  useEffect(() => {
    if (blendSeleccionado && blendSeleccionado > 0) {
      cargarOperaciones(blendSeleccionado);
      setOperacionSeleccionada(null); // limpiar selección anterior
    }
  }, [blendSeleccionado]);

  const handleBuscar = () => {
    if (campania && operacionSeleccionada) {
      buscarCajas();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Campaña</label>
          <input
            type="number"
            value={campania ?? ""}
            onChange={(e) => setCampania(parseInt(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Blend</label>
          <select
            value={blendSeleccionado ?? 0}
            onChange={(e) => setBlendSeleccionado(parseInt(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={0}>Seleccione</option>
            {blends.map((b) => (
              <option key={b.nroBlend} value={b.nroBlend}>
                {b.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Nro. Operación</label>
          <select
            value={operacionSeleccionada ?? 0}
            onChange={(e) => setOperacionSeleccionada(parseInt(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={0}>Seleccione</option>
            {operaciones.map((op) => (
              <option key={op.nroOperacionMp} value={op.nroOperacionMp}>
                {op.nroOperacionMp}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={handleBuscar}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          🔍 Buscar
        </button>
      </div>
    </div>
  );
}
