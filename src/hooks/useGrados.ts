import { useEffect, useState } from "react";

export interface GradoRequest {
  campania: number;
  idPropietario: number;
}

export interface GradoResponse {
  idGradoMarca: number;
  nombreGradoMarca: string;
}


export function useGradoData() {
  const [grados, setGrados] = useState<GradoResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGrados = async (campania: number, idPropietario: number = 3) => {
    setLoading(true);
    try {
      const response = await fetch("/StockLogistica/api/stock/get-grados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campania, idPropietario }),
      });
      const data = await response.json();
      setGrados(data);
    } catch (error) {
      console.error("Error al obtener grados:", error);
      setGrados([]);
    } finally {
      setLoading(false);
    }
  };

  return { grados, fetchGrados, loading };
}