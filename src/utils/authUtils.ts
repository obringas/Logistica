// utils/authUtils.ts

import { logout } from "@/services/authService";

export function getAuthToken(): string | null {
  const match = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
  return match ? match[2] : null;
}

export function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("Error al decodificar JWT:", error);
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

export function setAuthCookie(token: string, expirationMinutes: number = 60) {
  const expiration = new Date(Date.now() + expirationMinutes * 60 * 1000);
  document.cookie = `auth_token=${token}; path=/; expires=${expiration.toUTCString()}; secure; SameSite=Strict`;
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
