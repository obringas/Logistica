// app/dashboard/stock/stock-actual/page.tsx
"use client";

import { useState } from "react";
import { FiltrosStock } from "@/components/stock/stock-actual/FiltrosStock";
import { ResultadoStock } from "@/components/stock/stock-actual/ResultadoStock";
import { StockFilters, useStockData } from "@/hooks/useStockData";

export default function StockActualPage() {
  const [filters, setFilters] = useState<StockFilters>({
    idAdministrador: 3,
    idGrado: 0,
    cajaDesde: 0,
    cajaHasta: 0,
    idGalpon: 0,
    idEstiba: 0,
    idProducto: 0,
    codCampania: 2024,
    nroCataBuscar: 0,
  });
  const [submittedFilters, setSubmittedFilters] = useState(filters);

  const { data: stock, loading } = useStockData(submittedFilters);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Actual</h1>
     <FiltrosStock
          filters={filters}
          onChange={setFilters}
          onSubmit={() => {
            console.log("🟡 Ejecutando búsqueda con filtros:", filters);
            setSubmittedFilters(filters);
          }}
          loading={loading}
        />
      <ResultadoStock data={stock} loading={loading} />
    </div>
  );
}
