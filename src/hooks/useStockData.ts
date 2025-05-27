// src/hooks/useStockData.ts
import { useEffect, useState } from "react";

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

export function useStockData(filters: StockFilters) {
  const [data, setData] = useState<StockItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔵 Disparando useEffect con filtros:", filters);

      try {
        const response = await fetch("/api/stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        });

        if (!response.ok) {
          throw new Error("Error al consultar el stock.");
        }

        const result: StockItem[] = await response.json();
        setData(result);
      } catch (err: any) {
        console.error("🔴 Error en fetchStock:", err);
        setError(err.message || "Error desconocido");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filters]);

  return { data, loading, error };
}
