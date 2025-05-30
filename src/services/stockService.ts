interface FiltrosStock {
  idAdministrador: number;
  idGrado: number;
  cajaDesde: number;
  cajaHasta: number;
  idGalpon: number;
  idProducto: number;
  idZona: number;
  idSector: number;
  estado: string;
}
export interface BusquedaCataRequest {
  idGrado: number;
  idPropietario: number;
  nroCata: number;
}

export async function fetchStock(filtros: FiltrosStock) {
  console.log("🟡 Ejecutando búsqueda con filtros:", filtros);

  try {
    const response = await fetch("/StockLogistica/api/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtros),
    });

    if (!response.ok) {
      throw new Error("Error al consultar el stock.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🔴 Error en fetchStock:", error);
    throw error;
  }
}
export async function getGrados(campania: number): Promise<{ idGradoMarca: number; nombreGradoMarca: string }[]> {
  const response = await fetch("/api/stock/get-grados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ campania, idPropietario: 3 }),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener los grados.");
  }

  return await response.json();
}
export async function fetchDetalleStock(idGrado: number) {
  const response = await fetch("/api/stock/detalle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle.");
  }

  return await response.json();
}