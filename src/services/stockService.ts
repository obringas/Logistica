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
