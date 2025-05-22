"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, saveUsers } from "@/utils/userStorage";
import { User } from "@/utils/users";
import { useEffect } from "react";
import { usePermission } from "@/hooks/usePermission";
import { useAuth } from "@/context/AuthContext";


export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<User, "id">>({
    username: "",
    password: "",
    role: "user",
    active: true,
    email: "",
    applicationName: "",
  });
  
  const { user } = useAuth();
  const { hasPermission } = usePermission();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!hasPermission("canCreateUsers")) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = () => {
    const users = getUsers();
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...form,
    };
    saveUsers([...users, newUser]);
    router.push("/dashboard/admin/users");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>

      <label className="block mb-2 text-sm font-medium">Usuario</label>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Contraseña</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Rol</label>
      <select
        name="role"
        value={form.role}
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
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Aplicación</label>
      <input
        name="applicationName"
        value={form.applicationName}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
          className="mr-2"
        />
        Usuario activo
      </label>

      <button
        onClick={handleCreate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear Usuario
      </button>
    </div>
  );
}
