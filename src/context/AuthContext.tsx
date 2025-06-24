// Archivo: context/AuthContext.tsx (Versión Híbrida y Definitiva)

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {performFullLogout} from "@/services/authService";
import { getAuthToken, decodeJwt, setAuthCookie } from "@/utils/authUtils";

interface User {
  userId: number;
  userName: string;
  role: string;
  email?: string;
  applicationName?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let userFound: User | null = null;

    // --- LÓGICA DE HIDRATACIÓN HÍBRIDA ---

    // Plan A: Intentar leer desde la cookie (la fuente de verdad principal)
    try {
      const token = getAuthToken();
      if (token) {
        const decodedUser = decodeJwt(token);
        if (decodedUser) {
          userFound = { ...decodedUser, token };
        }
      }
    } catch (e) {
      console.error("Fallo al procesar el token de la cookie:", e);
    }
    
    // Plan B: Si la cookie falló o no fue accesible, usar localStorage como respaldo
    if (!userFound) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          console.log("Sesión recuperada desde localStorage como respaldo.");
          userFound = JSON.parse(storedUser);
        }
      } catch (e) {
        console.error("localStorage contenía datos de usuario corruptos:", e);
      }
    }

    // Establecemos el usuario encontrado (o null si ambos fallaron)
    setUser(userFound);
    setIsLoading(false);

  }, []); // Se ejecuta solo una vez al cargar

  const logout = () => {
   performFullLogout();
  };
  
  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser && newUser.token) {
      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthCookie(newUser.token);
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}