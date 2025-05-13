// Definimos la interfaz para el usuario global
export interface User {
    userId: number;
    userName: string;
    email: string;
    role: string;
    token: string;
    applicationName?: string;
  }
  
  // Estado global del usuario
  export let globalUser: User | null = null;
  
  // Función para establecer el usuario global
  export function setGlobalUser(user: User) {
    globalUser = user;
  }
  
  // Función para obtener el usuario global
  export function getGlobalUser(): User | null {
    return globalUser;
  }

  export function clearGlobalUser() {
    globalUser = null;
  }