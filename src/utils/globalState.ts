// Definimos la interfaz para el usuario global
export interface UserGlobal {
    userId: number;
    userName: string;
    email: string;
    role: string;
    token: string;
    applicationName?: string;
  }

  // Estado global del usuario
  
  
  // Función para establecer el usuario global
  export function setGlobalUser(user: any) {
    globalUser = user;
  }
  
  // Función para obtener el usuario global
  export function getGlobalUser(): UserGlobal | null {
    return globalUser;
  }

  export function clearGlobalUser() {
    globalUser = null;
  }
  function parseCookie(): any | null {
  const raw = document.cookie.split(";").find(c => c.trim().startsWith("auth_token="));
  if (!raw) return null;

  try {
    const base64 = raw.split("=")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export let globalUser: UserGlobal| null = null;

if (typeof window !== "undefined") {
  globalUser = parseCookie();
}
