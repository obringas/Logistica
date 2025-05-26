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
  kilosTotalesSubConsulta: number;
  taraTotal: number;
  tipoProducto: string;
  variedad: string;
  nombreGalpon: string;
  nombreEstiba: string;
  nombreEstado: string;
  propietarioNombre: string;
  id_galpon: number;
  id_estiba: number;
  id_estado: number;
  id_variedad: number;
  id_producto: number;
  id_propietario: number;
  afectado_warrant: string;
  kilosTotalesConsulta: number;
}

export async function fetchStock(filters: StockFilters): Promise<StockItem[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_STOCK_CONSULTA!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error("Error al consultar el stock.");
  }

  return await response.json();
}
