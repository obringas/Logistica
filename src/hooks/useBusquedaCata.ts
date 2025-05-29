import { useState } from "react";
import { DetalleItem } from "./useDetalleStock";

export interface BusquedaCataRequest {
  idGrado: number;
  idPropietario: number;
  nroCata: number;
}

export function useBusquedaCata() {
  const [filtros, setFiltros] = useState<BusquedaCataRequest>({
    idGrado: 0,
    idPropietario: 0,
    nroCata: 0,
  });

  const [resultados, setResultados] = useState<DetalleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const buscar = async ({ idGrado, idPropietario, nroCata }: BusquedaCataRequest) => {
    setLoading(true);
    try {
      const response = await fetch("/StockLogistica/api/stock/detalle", {
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
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error("Error al buscar CATA:", error);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const limpiar = () => {
    setFiltros({ idGrado: 0, idPropietario: 0, nroCata: 0 });
    setResultados([]);
  };

  return {
    filtros,
    setFiltros,
    resultado: resultados,
    buscar,
    limpiar,
    loading,
  };
}
