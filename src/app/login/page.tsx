"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login,login1 } from "@/services/authService";
import { getGlobalUser } from "@/utils/globalState";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }
    const success = await login1(username, password);
    setLoading(false);

    if (success) {
      router.push("/dashboard");
      console.log("Usuario actual:", getGlobalUser());
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-800">Ingreso al sistema</h1>

        {error && <div className="text-red-600 mb-3 text-sm text-center">{error}</div>}

        <label className="block text-sm font-medium mb-1 text-gray-700">Usuario</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}
