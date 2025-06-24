export interface BlendRequest {
  campania: number;
}

export interface BlendResponse {
  nroBlend: number;
  descripcion: string;
}

export interface OperacionRequest {
  nroBlend: number;
}

export interface OperacionResponse {
  nroOperacionMp: number;
}

export interface CorridaRequest {
  campania: number;
  nroOperacion: number;
}

export interface CorridaResponse {
  claseGi: string;
  kilosDescripcion: string;
  porcentajeDescripcion: string;
  kilos: number;
  porcentaje: number;
  kgsNeto: number | null;
}
export interface ProductosRequest {
  nroOperacion: number;
  campaña: number;
  totalVerde: number;
  soloAceptado: boolean;
}

export interface ProductoResultadoItem {
  producto: string;
  marca: string | null;
  lote: string | null;
  kilos: number;
  cajas: number;
  cajasRechazadas: number;
  tipoProductoId: number;
  porcentaje: number;
  kilosDescripcion: string;
  cajasDescripcion: string;
  porcentajeDescripcion: string;
}
export interface ReprocesosRequest {
  nroBlend: number;
  nroOperacion: number;
}
export interface ReprocesosResponse {
  tipo: string;
  marcaProducida: string;
  marcaProcesada: string;
  nroOpProducida: number;
  kgsNeto: number;
  kilos: number;
  rendimiento: number;
  kilosDescripcion: string;
  kgsNetoDescripcion: string;
  rendimientoDescripcion: string;
}
export interface ProductoCajaResponse {
  campania: number;
  nroOperacion: number;
  marca: string;
  nroBulto: string;
  nroCATA: string;
  kgsNeto: number;
  tara: number;
  fecha: string; // O `Date` si vas a convertirlo al recibirlo
  lote: string;
  estado: string;
  nroEnCorrida?: number;
  nroEnMarca?: number;
  nroEnLotnumber?: number;
  lotNumberCliente: string;
}

export async function obtenerBlends(request: BlendRequest): Promise<BlendResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/blends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener los blends.");
  }

  return await response.json();
}

export async function obtenerOperaciones(request: OperacionRequest): Promise<OperacionResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/operaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener las operaciones.");
  }

  return await response.json();
}

export async function buscarCorrida(request: CorridaRequest): Promise<CorridaResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/corrida", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}
export async function obtenerProductos(request: ProductosRequest): Promise<ProductoResultadoItem[]> {

  const response = await fetch("/StockLogistica/api/proceso/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}

export async function obtenerSobrantes(request: ProductosRequest): Promise<ProductoResultadoItem[]> {

  const response = await fetch("/StockLogistica/api/proceso/sobrantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}

export async function obtenerMermas(request: CorridaRequest): Promise<CorridaResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/mermas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}
export async function obtenerReprocesos(request: ReprocesosRequest): Promise<ReprocesosResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/reprocesos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}

export async function obtenerCajas(request: CorridaRequest): Promise<ProductoCajaResponse[]> {
  const response = await fetch("/StockLogistica/api/proceso/cajas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de corrida.");
  }

  return await response.json();
}