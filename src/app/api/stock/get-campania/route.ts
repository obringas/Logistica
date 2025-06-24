import { fetch, Agent } from "undici";

const agent = new Agent({
  connect: {
    rejectUnauthorized: false, // ⚠️ Ignora certificado autofirmado (solo para desarrollo)
  },
});

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/Stock/Campanias`, {
      method: "GET",
      dispatcher: agent, // 👈 Usamos el mismo agent
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al consultar campanias:", error);
    return new Response(JSON.stringify({ error: "Error al consultar campanias" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
