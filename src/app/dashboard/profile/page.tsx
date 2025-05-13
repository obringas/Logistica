"use client";
import { useAuth } from "@/context/AuthContext";
import { getGlobalUser } from "@/utils/globalState";

export default function ProfilePage() {
  const  user  = getGlobalUser();

  if (!user) {
    return <p className="text-center text-gray-500">Cargando usuario...</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700"><strong>ID de Usuario:</strong> {user.userId}</p>
          <p className="text-gray-700"><strong>Nombre de Usuario:</strong> {user.userName}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        </div>
        <div>
          <p className="text-gray-700"><strong>Rol:</strong> {user.role}</p>
          <p className="text-gray-700"><strong>Aplicación:</strong> {user.applicationName || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

