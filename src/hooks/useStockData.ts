import { useState } from "react";

export interface StockFilters {
  idAdministrador: number;
  idGrado: number;
  cajaDesde: number;
  cajaHasta: number;
  idGalpon: number;
  idEstiba: number;
  idProducto: number;
  codCampania: number;
  nroCataBuscar: number;
}

export interface StockItem {
  id_gradoMarca: number;
  nombreGradoMarca: string;
  cantidadCajas: number;
  rangoCajas: string;
  campania: number;
  kilosTotales: number;
  tara: number;
  tipoProducto: string;
  variedad: string;
  nombreGalpon: string;
  nombreEstiba: string;
  nombreEstado: string;
  propietarioNombre: string;
  afectado_warrant: string;
  kilosTotalesConsulta: number;
}

export function useStockData() {
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (filters: StockFilters): Promise<StockItem[] | null> => {
    try {
      const response = await fetch("/StockLogistica/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error("Error al consultar el stock.");
      }

      const result: StockItem[] = await response.json();
      return result;
    } catch (err: any) {
      console.error("🔴 Error en fetchStock:", err);
      setError(err.message || "Error desconocido");
      return null;
    }
  };

  return { fetchStockData, error };
}
