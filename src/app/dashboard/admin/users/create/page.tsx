'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUsers, saveUsers } from '@/utils/userStorage'

export default function CreateUserPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const router = useRouter()

  const handleCreate = () => {
    if (!username || !password) return alert('Faltan datos')

    const users = getUsers()
    const id = Math.max(...users.map(u => u.id)) + 1
    const newUser = { id, username, password, role, active: true }
    saveUsers([...users, newUser])
    router.push('/dashboard/admin/users')
  }

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Nuevo Usuario</h2>
      <input className="border mb-2 w-full p-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border mb-2 w-full p-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <select className="border mb-4 w-full p-2" value={role} onChange={e => setRole(e.target.value as any)}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
        Crear
      </button>
    </div>
  )
}
