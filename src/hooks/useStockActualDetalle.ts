import { useState } from "react";
import { getStockActualDetalle, StockActualDetalleRequest, StockActualDetalleItem } from "@/services/stockService";

export function useStockActualDetalle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StockActualDetalleItem[] | null>(null);

  const fetchStockActualDetalle = async (filters: StockActualDetalleRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStockActualDetalle(filters);
      setData(result);
    } catch (err: any) {
      console.error("🔴 Error en fetchStockActualDetalle:", err);
      setError(err.message || "Error desconocido");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchStockActualDetalle };
}
