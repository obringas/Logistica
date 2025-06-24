"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUserData } from "@/services/authService";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  
  // Estados locales para los campos del formulario
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Cuando el usuario del contexto cargue, inicializamos el estado del email
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Cargando sesión...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-10">No se pudo cargar la sesión del usuario.</p>;
  }

  const handleSave = () => {
    const dataToUpdate: { password?: string; email?: string } = {};
    if (password) { // Solo actualizamos la contraseña si el campo no está vacío
      dataToUpdate.password = password;
    }
    if (email !== user.email) { // Solo actualizamos el email si ha cambiado
        dataToUpdate.email = email;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        alert("No has realizado ningún cambio.");
        return;
    }

    updateUserData(user.userId, dataToUpdate);
    alert("Datos actualizados correctamente. La sesión se refrescará en la próxima recarga.");
    setIsEditing(false);
    setPassword(""); // Limpiamos el campo
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Perfil del Usuario</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-md">
        {/* ... (código para mostrar los datos del usuario, sin cambios) ... */}
        <div>
          <p className="text-gray-600"><strong>ID:</strong> {user.userId}</p>
          <p className="text-gray-600 mt-2"><strong>Usuario:</strong> {user.userName}</p>
          <p className="text-gray-600 mt-2"><strong>Email:</strong> {user.email || "No especificado"}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Rol:</strong> <span className="font-semibold capitalize">{user.role}</span></p>
          <p className="text-gray-600 mt-2"><strong>Aplicación:</strong> {user.applicationName || "N/A"}</p>
        </div>
      </div>

      {user.role !== "admin" && !isEditing && (
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Editar mis datos
        </button>
      )}

      {user.role !== "admin" && isEditing && (
        <div className="bg-gray-50 border p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Editar Perfil</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@ejemplo.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">Nueva Contraseña (dejar en blanco para no cambiar)</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
              onClick={handleSave}
            >
              Guardar cambios
            </button>
            <button
              className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {user.role === "admin" && (
        <div className="mt-6">
          <Link
            href="/dashboard/admin/users"
            className="inline-block bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
          >
            👤 Administrar usuarios
          </Link>
        </div>
      )}
    </div>
  );
}