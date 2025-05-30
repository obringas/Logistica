"use client";

import { useState } from "react";
import { BusquedaCataForm } from "@/components/stock/busqueda-cata/BusquedaCataForm";
import { BusquedaCataResultado } from "@/components/stock/busqueda-cata/BusquedaCataResultado";
import { useBusquedaCata } from "@/hooks/useBusquedaCata";
import { BusquedaCataRequest } from "@/services/stockService";

export default function BusquedaCataPage() {
  const { resultados, buscar, loading } = useBusquedaCata();

  const [filtros, setFiltros] = useState<BusquedaCataRequest>({
    idGrado: 0,
    idPropietario: 0,
    nroCata: 0,
  });

  const handleBuscar = async () => {
    await buscar(filtros);
  };

  const handleLimpiar = () => {
    setFiltros({ idGrado: 0, idPropietario: 0, nroCata: 0 });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🔍 Búsqueda por CATA</h2>
      <BusquedaCataForm
        filtros={filtros}
        setFiltros={setFiltros}
        onBuscar={handleBuscar}
        onLimpiar={handleLimpiar}
      />

      <div className="mt-4">
        <BusquedaCataResultado resultados={resultados} loading={loading} />
      </div>
    </div>
  );
}
