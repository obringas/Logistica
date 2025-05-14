"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { setGlobalUser, clearGlobalUser } from "@/utils/globalState"; // 
interface User {
  userId: number;
  userName: string;
  email: string;
  role: string;
  token: string;
    applicationName?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; // Agregamos setUser para actualizar el estado
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false); // Estado para detectar si estamos en el cliente

  // Detectar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
    const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Escuchar cambios en sessionStorage/localStorage y actualizar el usuario
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

    // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setUser(null);
    clearGlobalUser(); // ✅ Limpiar la variable global
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/login`;
;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {isClient ? children : null} {/* No renderizamos nada en SSR */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}