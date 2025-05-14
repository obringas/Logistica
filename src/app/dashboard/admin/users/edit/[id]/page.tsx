"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUsers, saveUsers } from "@/utils/userStorage";
import { User } from "@/utils/users";

export default function EditUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const users = getUsers();
    const existingUser = users.find((u) => u.id === id);
    if (existingUser) {
      setUser(existingUser);
    } else {
      router.push("/dashboard/admin/users");
    }
  }, [id, router]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setUser((prev) => (prev ? { ...prev, [name]: checked } : null));
  } else {
    setUser((prev) => (prev ? { ...prev, [name]: value } : null));
  }
};


  const handleSave = () => {
    if (!user) return;
    const users = getUsers();
    const updated = users.map((u) => (u.id === id ? user : u));
    saveUsers(updated);
    router.push("/dashboard/admin/users");
  };

  if (!user) return <p className="p-4">Cargando usuario...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>

      <label className="block mb-2 text-sm font-medium">Usuario</label>
      <input
        name="username"
        value={user.username}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Contraseña</label>
      <input
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Rol</label>
      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
      </select>

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        name="email"
        type="email"
        value={user.email ?? ""}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Aplicación</label>
      <input
        name="applicationName"
        value={user.applicationName ?? ""}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="active"
          checked={user.active}
          onChange={handleChange}
          className="mr-2"
        />
        Usuario activo
      </label>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar cambios
      </button>
    </div>
  );
}
