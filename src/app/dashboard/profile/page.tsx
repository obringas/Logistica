"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGlobalUser } from "@/utils/globalState";
import { updateUserData } from "@/services/authService";

export default function ProfilePage() {
  const router = useRouter();
  const user = getGlobalUser();

  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");

  if (!user) {
    return <p className="text-center text-gray-500">Cargando usuario...</p>;
  }

  const handleSave = () => {
    if (!password) {
      alert("Debes ingresar una nueva contraseña.");
      return;
    }

    updateUserData(user.id, user.username, password);
    alert("Contraseña actualizada correctamente.");
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-700">
            <strong>ID de Usuario:</strong> {user.id}
          </p>
          <p className="text-gray-700">
            <strong>Nombre de Usuario:</strong> {user.username}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email || "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>Rol:</strong> {user.role}
          </p>
          <p className="text-gray-700">
            <strong>Aplicación:</strong> {user.applicationName || "N/A"}
          </p>
        </div>
      </div>

      {user.role !== "admin" && !isEditing && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Editar mis datos
        </button>
      )}

      {user.role !== "admin" && isEditing && (
        <div className="bg-gray-50 border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Editar contraseña</h3>
          <label className="block text-gray-700 mb-1">Nombre de usuario</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3 bg-gray-100"
            value={user.username}
            readOnly
          />
          <label className="block text-gray-700 mb-1">Nueva contraseña</label>
          <input
            className="w-full border px-3 py-2 rounded mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <div className="flex gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Guardar cambios
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {user.role === "admin" && (
        <div className="mt-6">
          <button
            onClick={() => router.push("/dashboard/admin/users")}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            👤 Administrar usuarios
          </button>
        </div>
      )}
    </div>
  );
}
