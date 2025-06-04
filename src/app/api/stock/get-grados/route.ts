import { fetch, Agent } from "undici";
const agent = new Agent({
  connect: {
    rejectUnauthorized: false, // ⚠️ Ignora certificado autofirmado (solo para desarrollo)
  },
});
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${BASE_URL}/Stock/GetGrados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      dispatcher: agent, // 👈 ESTO reemplaza a "agent"
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al consultar grados:", error);
    return new Response(JSON.stringify({ error: "Error al consultar grados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
