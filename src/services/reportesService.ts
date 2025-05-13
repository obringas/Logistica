//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://coop_serv8/WebApiInformes/api";
const API_URL=process.env.NEXT_PUBLIC_API_URL ;
export interface Entrega {
  fet: number;
  socio: number;
  nombre: string;
  fecha: string;
  puerta: number;
  romaneo: number;
  formulario: string;
  liquidacion: number;
  kilos: number;
  bruto: number;
  codigo_camp: number;
}

export interface EntregaSocio {
  socio: number;
  fet: number;
  codigo_camp: number;
  nombre: string;
  formulario: string;
  puerta: number;
  romaneo: string;
  liquidacion: string;
  cuit: string;
  fecha: string;
  Kilos: number;
  Importe: number;

  // Clases de compra
  x1L: number;
  x2L: number;
  x3L: number;
  x4L: number;
  x1F: number;
  x2F: number;
  x3F: number;
  x4F: number;
  x2K: number;
  x3K: number;
  n5X: number;
  nvx: number;
  c1L: number;
  c2L: number;
  c3L: number;
  c4L: number;
  c1F: number;
  c2F: number;
  c3F: number;
  c4F: number;
  c2K: number;
  c3K: number;
  n5C: number;
  nvc: number;
  b1L: number;
  b2L: number;
  b3L: number;
  b4L: number;
  b1F: number;
  b2F: number;
  b3F: number;
  b4F: number;
  b2KL: number;
  b3KL: number;
  b2KF: number;
  b3KF: number;
  n5B: number;
  nvb: number;
  t1L: number;
  t2L: number;
  t1F: number;
  t2F: number;
  t2KL: number;
  t2KF: number;
  n5K: number;
  sss: number;
  h1F: number;
  h2F: number;
  h3F: number;
}

export async function obtenerliquidaciones(campañas: string, nroSocio: number | null, nroFet: string | null): Promise<Entrega[]> {
  const requestBody = {
    Campañas: campañas,
    NroSocio: nroSocio,
    NroFet: nroFet,
  };

  console.log("Datos enviados:", requestBody); // ✅ Depuración

  try {
    const response = await fetch(`${API_URL}/reportes/liquidaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("Respuesta recibida:", response); // ✅ Depuración

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de la respuesta:", data); // ✅ Depuración

    return data;
  } catch (error) {
    console.error("Error al obtener las Liquidaciones:", error);
    throw error;
  }
}
export async function obtenerentregas(campañas: string, nroSocio: number | null, nroFet: string | null): Promise<Entrega[]> {
  const requestBody = {
    Campañas: campañas,
    NroSocio: nroSocio,
    NroFet: nroFet,
  };

  console.log("Datos enviados:", requestBody); // ✅ Depuración

  try {
    const response = await fetch(`${API_URL}/Entrega/por-productor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("Respuesta recibida:", response); // ✅ Depuración

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de la respuesta:", data); // ✅ Depuración

    return data;
  } catch (error) {
    console.error("Error al obtener las Liquidaciones:", error);
    throw error;
  }
}
