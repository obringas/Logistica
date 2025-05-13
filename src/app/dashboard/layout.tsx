"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        {/* Sección superior */}
        <div>
          {/* Datos del Usuario */}
          <div className="mb-4 border-b pb-4">
            {user && (
              <>
                <h2 className="text-lg font-bold">{user.userName}</h2>
                <p className="text-sm text-gray-300">{user.role}</p>
              </>
            )}
          </div>

          {/* Menú de Navegación */}
          <ul className="mt-4 space-y-2">
            <li><Link href="/dashboard" className="block p-2 hover:bg-gray-700">Inicio</Link></li>
            <li><Link href="/dashboard/profile" className="block p-2 hover:bg-gray-700">Perfil</Link></li>

            {/* Nuevo Menú de Reportes */}
            <li>
              <details className="bg-gray-800 p-2 rounded">
                <summary className="cursor-pointer">📊 Reportes</summary>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link href="/dashboard/reportes/liquidaciones-por-socio" className="block p-2 hover:bg-gray-700">
                      Liquidaciones por Socio
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/reportes/entregas-por-socio" className="block p-2 hover:bg-gray-700">
                      Entregas por Socio
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/stock/stock-actual" className="block p-2 hover:bg-gray-700">
                      Stock Actual
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Sección Inferior con Botón Cerrar Sesión */}
        <div className="mb-4">
          <button
            className="w-full p-2 bg-red-600 rounded hover:bg-red-500"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
          <div className="mt-4 flex justify-center">
            <img src="/next.svg" alt="Next.js Logo" className="h-6 opacity-50" />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
}
