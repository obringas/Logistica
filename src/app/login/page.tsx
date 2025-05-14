"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginLocal } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import {getGlobalUser} from "@/utils/globalState";
import { utils } from "xlsx";
import { getUsers } from '@/utils/userStorage'; // ✅ Ruta al helper
import {  setGlobalUser,clearGlobalUser } from "@/utils/globalState";
import { data } from "autoprefixer";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const router = useRouter();
/*
  const handleLogin1 = async () => {
    setLoading(true);
    setError("");

    const success = await login(username, password); // ✅ Pasamos setUser

    setLoading(false);

    if (success) {
      router.push("/dashboard");
      console.log("Usuario actual:", getGlobalUser());
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };
  */

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  const success = loginLocal(username, password);
  if (success) {
    router.push("/dashboard");
  } else {
    alert("Credenciales incorrectas o usuario inactivo");
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 border rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          className={`w-full p-2 rounded ${loading ? "bg-gray-500" : "bg-blue-500 text-white"}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Espere..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}
