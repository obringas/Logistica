"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, saveUsers } from "@/utils/userStorage";
import { User } from "@/utils/users";
import { usePermission } from "@/hooks/usePermission";
import { useAuth } from "@/context/AuthContext";

export default function UserAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
    const { user } = useAuth();
  const { hasPermission } = usePermission();

  useEffect(() => {
    // Proteger la ruta
    if (!user) {
      router.push("/login");
      return;
    }

    if (!hasPermission("canAccessUsers")) {
      router.push("/dashboard");
      return;
    }

    const data = getUsers();
    setUsers(data);
    setLoading(false);
  }, [user]);

  const toggleActive = (id: number) => {
    const updated = users.map((u) => (u.id === id ? { ...u, active: !u.active } : u));
    setUsers(updated);
    saveUsers(updated);
  };

  const deleteUser = (id: number) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
  };

  if (loading) return <p className="text-center p-6">Cargando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Administración de Usuarios</h2>

      <div className="flex justify-end mb-4">
        {hasPermission("canCreateUsers") && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push("/dashboard/admin/users/create")}
          >
            Crear Usuario
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      user.role === "admin"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-2 border">
                  {user.active ? (
                    <span className="text-green-700 font-medium">Activo</span>
                  ) : (
                    <span className="text-red-700 font-medium">Inactivo</span>
                  )}
                </td>
                <td className="p-2 border text-center space-x-2">
                  {hasPermission("canEditUsers") && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        router.push(`/dashboard/admin/users/edit/${user.id}`)
                      }
                    >
                      Editar
                    </button>
                  )}
                  {hasPermission("canEditUsers") && (
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      onClick={() => toggleActive(user.id)}
                    >
                      {user.active ? "Desactivar" : "Activar"}
                    </button>
                  )}
                  {hasPermission("canEditUsers") && (
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={() => deleteUser(user.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
