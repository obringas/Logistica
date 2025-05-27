import { useEffect, useState } from "react";
import { fetchStock, StockFilters, StockItem } from "@/services/stockService";

export function useStockData(filters: StockFilters) {
  const [data, setData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  console.log("🔵 Disparando useEffect con filtros:", filters);
  
  const getData = async () => {
    try {
      console.log("🟢 Llamando al endpoint:", process.env.NEXT_PUBLIC_API_STOCK_CONSULTA);
      const result = await fetchStock(filters);
      console.log("✅ Resultado de la API:", result);
      setData(result);
    } catch (error) {
      console.error("🔴 Error en fetchStock:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  setLoading(true);
  getData();
}, [filters]);

  return { data, loading };
}

export type { StockFilters, StockItem };
