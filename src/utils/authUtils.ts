// utils/authUtils.ts

import { logout } from "@/services/authService";

export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
  return match ? match[2] : null;
}

// En: utils/authUtils.ts

export function decodeJwt(token: string): any | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    // Reemplazamos caracteres para que sea compatible con atob
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // AÑADIDO: Agregamos el padding '=' que Next.js/btoa a veces quita. Esto es crucial.
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    
    const jsonPayload = decodeURIComponent(atob(base64 + padding).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar el token JWT:", error);
    return null;
  }
}

export function isSessionActive(): boolean {
  const token = getAuthToken();
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload?.exp) return false;

  const expiryTime = payload.exp * 1000; // Convertir a milisegundos
  return Date.now() < expiryTime;
}


// En el archivo utils/authUtils.ts

export function setAuthCookie(token: string, expirationMinutes: number = 60) {
  const expiration = new Date(Date.now() + expirationMinutes * 60 * 1000);
  
  // Leemos el basePath de la variable de entorno. Usamos '/' como fallback por seguridad.
  const cookiePath = process.env.NEXT_PUBLIC_BASE_PATH || '/';

  document.cookie = `auth_token=${token}; path=${cookiePath}; expires=${expiration.toUTCString()}; SameSite=Lax`;
}

export function autoLogoutOnInactivity(inactivityMinutes: number = 15) {
  let timeout: ReturnType<typeof setTimeout>;

  const logoutAfterInactivity = () => {
    console.log("⏰ Sesión cerrada por inactividad");
    logout();
  };

  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(logoutAfterInactivity, inactivityMinutes * 60 * 1000);
  };

  window.addEventListener("mousemove", resetTimeout);
  window.addEventListener("keydown", resetTimeout);
  window.addEventListener("click", resetTimeout);

  resetTimeout(); // iniciar al cargar

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("mousemove", resetTimeout);
    window.removeEventListener("keydown", resetTimeout);
    window.removeEventListener("click", resetTimeout);
  };
}
