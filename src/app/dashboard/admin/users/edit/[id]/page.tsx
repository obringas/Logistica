"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUsers, saveUsers } from "@/utils/userStorage";
import { User } from "@/utils/users";
import { useAuth } from "@/context/AuthContext";
import { usePermission } from "@/hooks/usePermission";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { hasPermission } = usePermission();

  const userId = Number(params.id);
  const [targetUser, setTargetUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const canEditAny = hasPermission("canEditUsers");
    const isEditingOwnAccount = user.userId === userId;

    if (!canEditAny && !isEditingOwnAccount) {
      router.push("/dashboard");
      return;
    }

    const users = getUsers();
    const found = users.find((u) => u.id === userId);
    if (!found) {
      router.push("/dashboard/admin/users");
    } else {
      setTargetUser(found);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setTargetUser((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : null
    );
  };

  const handleSave = () => {
    if (!targetUser) return;
    const users = getUsers();
    const updated = users.map((u) => (u.id === userId ? targetUser : u));
    saveUsers(updated);
    router.push("/dashboard/admin/users");
  };

  if (!targetUser) return <p className="p-4">Cargando usuario...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>

      <label className="block mb-2 text-sm font-medium">Usuario</label>
      <input
        name="username"
        value={targetUser.username}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Contraseña</label>
      <input
        name="password"
        type="password"
        value={targetUser.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      {user?.role === "admin" && (
        <>
          <label className="block mb-2 text-sm font-medium">Rol</label>
          <select
            name="role"
            value={targetUser.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-4"
          >
            <option value="admin">Admin</option>
            <option value="user">Usuario</option>
          </select>
        </>
      )}

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        name="email"
        type="email"
        value={targetUser.email ?? ""}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      {user?.role === "admin" && (
        <>
          <label className="block mb-2 text-sm font-medium">Aplicación</label>
          <input
            name="applicationName"
            value={targetUser.applicationName ?? ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="active"
              checked={targetUser.active}
              onChange={handleChange}
              className="mr-2"
            />
            Usuario activo
          </label>
        </>
      )}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar cambios
      </button>
    </div>
  );
}
