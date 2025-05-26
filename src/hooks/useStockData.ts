import { useEffect, useState } from "react";
import { fetchStock, StockFilters, StockItem } from "@/services/stockService";

export function useStockData(filters: StockFilters) {
  const [data, setData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchStock(filters);
        setData(result);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filters]);

  return { data, loading };
}

export type { StockFilters, StockItem };
