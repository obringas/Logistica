// src/app/dashboard/busqueda-cata/page.tsx
'use client';

import { useBusquedaCata } from '@/hooks/useBusquedaCata';
import { BusquedaCataForm } from '@/components/stock/busqueda-cata/BusquedaCataForm';
import { BusquedaCataResultado } from '@/components/stock/busqueda-cata/BusquedaCataResultado';

export default function BusquedaCataPage() {
  const {
    filtros,
    setFiltros,
    resultado,
    loading,
    buscar,
    limpiar,
  } = useBusquedaCata();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">🔍 Búsqueda por CATA</h1>
      <BusquedaCataForm
        filtros={filtros}
        setFiltros={setFiltros}
        onBuscar={buscar}
        onLimpiar={limpiar}
      />
      <BusquedaCataResultado data={resultado} loading={loading} />
    </div>
  );
}
