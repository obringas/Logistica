import { useState } from "react";

export interface DetalleItem {
  nombreGradoMarca: string;
  campania: number;
  nroCATA: number;
  boletaDGI: string;
  nroBulto: number;
  deposito: string;
  galpon: string;
  estiba: string;
}

export function useDetalleStock() {
  const [detalle, setDetalle] = useState<DetalleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDetalle = async (idGrado: number) => {
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
          idPropietario: 0,
          nroBultoDesde: 0,
          nroBultoHasta: 0,
          nroCata: 0,
        }),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setDetalle(data);
      } else {
        console.error("⚠️ La respuesta del backend no es un array:", data);
        setDetalle([]);
      }
    } catch (error) {
      console.error("Error al obtener detalle:", error);
      setDetalle([]);
    } finally {
      setLoading(false);
    }
  };

  return { detalle, fetchDetalle, loading };
}
