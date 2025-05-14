'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getUsers, saveUsers } from '@/utils/userStorage'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const [active, setActive] = useState(true)

  useEffect(() => {
    const user = getUsers().find(u => u.id === id)
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
      setRole(user.role)
      setActive(user.active)
    }
  }, [id])

  const handleSave = () => {
    const users = getUsers().map(u =>
      u.id === id ? { ...u, username, password, role, active } : u
    )
    saveUsers(users)
    router.push('/dashboard/admin/users')
  }

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <input className="border mb-2 w-full p-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border mb-2 w-full p-2" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <select className="border mb-2 w-full p-2" value={role} onChange={e => setRole(e.target.value as any)}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
        Activo
      </label>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
        Guardar Cambios
      </button>
    </div>
  )
}
