import { useState } from "react";

export interface CampaniaResponse {
  codigo_Camp: number;
}

export function useCampaniaData() {
  const [campanias, setCampanias] = useState<CampaniaResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCampanias = async () => {
    setLoading(true);
    try {
      const response = await fetch("/StockLogistica/api/stock/get-campania");
      const data = await response.json();

      // Validamos que sea array y ordenamos de mayor a menor
      if (Array.isArray(data)) {
        const ordenado = data.sort((a, b) => b.codigo_Camp - a.codigo_Camp);
        setCampanias(ordenado);
      } else {
        setCampanias([]);
      }
    } catch (error) {
      console.error("Error al obtener campañas:", error);
      setCampanias([]);
    } finally {
      setLoading(false);
    }
  };

  return { campanias, fetchCampanias, loading };
}
