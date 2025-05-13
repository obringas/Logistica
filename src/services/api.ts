export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

export async function fetchData(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`);
  if (!res.ok) throw new Error("Error al obtener los datos");
  return res.json();
}
