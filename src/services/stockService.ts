const API_URL=process.env.NEXT_PUBLIC_API_URL ;

export const getPropietarios = async () => {
    const res = await fetch(`${API_URL}/stock/propietarios`);
    if (!res.ok) throw new Error("Error al obtener propietarios");
    return await res.json();
  };
  
  export const getGrados = async () => {
    const res = await fetch(`${API_URL}/stock/grados`);
    if (!res.ok) throw new Error("Error al obtener grados");
    return await res.json();
  };
  
  export const getGalpones = async () => {
    const res = await fetch(`${API_URL}/stock/galpones`);
    if (!res.ok) throw new Error("Error al obtener galpones");
    return await res.json();
  };
  
  export const getEstibas = async () => {
    const res = await fetch(`${API_URL}/stock/estibas`);
    if (!res.ok) throw new Error("Error al obtener estibas");
    return await res.json();
  };
  
  export const getProductos = async () => {
    const res = await fetch(`${API_URL}/stock/productos`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  };
  
  export const getCampanias = async () => {
    const res = await fetch(`${API_URL}//stock/campanias`);
    if (!res.ok) throw new Error("Error al obtener campañas");
    return await res.json();
  };
  