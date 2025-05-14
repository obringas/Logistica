'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUsers, saveUsers } from '@/utils/userStorage'
import { User } from '@/utils/users'

export default function UserAdminPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const auth = localStorage.getItem('authUser')
        if (!auth) {
            router.push('/login')
            return
        }

        const user = JSON.parse(auth)
        if (user.role !== 'admin') {
            router.push('/dashboard')
            return
        }

        const data = getUsers()
        setUsers(data)
        setLoading(false)
    }, [])

    const toggleActive = (id: number) => {
        const updated = users.map(u => u.id === id ? { ...u, active: !u.active } : u)
        setUsers(updated)
        saveUsers(updated)
    }

    const deleteUser = (id: number) => {
        const updated = users.filter(u => u.id !== id)
        setUsers(updated)
        saveUsers(updated)
    }

    if (loading) return <p>Cargando...</p>

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Administración de Usuarios</h2>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push('/dashboard/admin/users/create')}
                >
                    + Nuevo Usuario
                </button>
            </div>
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Usuario</th>
                        <th className="border px-4 py-2">Rol</th>
                        <th className="border px-4 py-2">Activo</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="border px-4 py-2">{u.username}</td>
                            <td className="border px-4 py-2">{u.role}</td>
                            <td className="border px-4 py-2 text-center">{u.active ? '✅' : '❌'}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => toggleActive(u.id)}
                                >
                                    Activar/Inactivar
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => router.push(`/dashboard/admin/users/edit/${u.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(u.id)}
                                    disabled={u.username === 'admin'} // opcional
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
