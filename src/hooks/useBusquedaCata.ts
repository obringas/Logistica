import { useState } from "react";
import { DetalleItem } from "./useDetalleStock";

export interface BusquedaCataRequest {
  idGrado: number;
  idPropietario: number;
  nroCata: number;
}

export function useBusquedaCata() {
  const [resultados, setResultados] = useState<DetalleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const buscar = async ({ idGrado, idPropietario, nroCata }: BusquedaCataRequest) => {
    setLoading(true);
    try {
      const res = await fetch("/StockLogistica/api/stock/detalle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idGrado,
          idGalpon: 0,
          idEstiba: 0,
          idEstado: 0,
          idVariedad: 0,
          idProducto: 0,
          idPropietario,
          nroBultoDesde: 0,
          nroBultoHasta: 0,
          nroCata,
        }),
      });

      const data = await res.json();
      setResultados(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  return { resultados, buscar, loading };
}
