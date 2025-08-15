import { useState, useCallback } from "react";
import {
  BusquedaCataRequest,
  DetalleItem,
} from "@/services/stockService";

export const useBusquedaCata = () => {
  const [resultados, setResultados] = useState<DetalleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const buscar = useCallback(async (params: BusquedaCataRequest) => {
    setLoading(true);
    try {
      const response = await fetch("/StockLogistica/api/stock/detalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        // Lanzamos un error para que el componente lo capture
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      const data: DetalleItem[] = await response.json();
      setResultados(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setResultados([]); // Limpiamos resultados en caso de error
      throw error; // Re-lanzamos el error para que el componente lo maneje
    } finally {
      setLoading(false);
    }
  }, []);

  const limpiarResultados = useCallback(() => {
    setResultados([]);
  }, []);

  return { resultados, buscar, loading, limpiarResultados };
};