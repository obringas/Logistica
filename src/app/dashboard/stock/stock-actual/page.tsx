"use client";

import { useState } from "react";
import { FiltrosStock } from "@/components/stock/stock-actual/FiltrosStock";
import { ResultadoStock } from "@/components/stock/stock-actual/ResultadoStock";
import { StockFilters, StockItem, useStockData } from "@/hooks/useStockData";

export default function StockActualPage() {
  const [filters, setFilters] = useState<StockFilters>({
    idAdministrador: 3,
    idGrado: 0,
    cajaDesde: 0,
    cajaHasta: 0,
    idGalpon: 0,
    idEstiba: 0,
    idProducto: 0,
    codCampania: 2025,
    nroCataBuscar: 0,
  });
  //const [stockData, setStockData] = useState<any[]>([]);
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { fetchStockData } = useStockData();

  const handleSubmit = async () => {
  setLoading(true);
  try {
    console.log("🟡 Ejecutando búsqueda con filtros:", filters);
    const data = await fetchStockData(filters);
    setStockData(data ?? []);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Actual</h1>
      <FiltrosStock
        filters={filters}
        onChange={setFilters}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <ResultadoStock data={stockData} loading={loading} />
    </div>
  );
}