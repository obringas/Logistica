"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo y scrollable */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between fixed top-0 left-0 h-screen overflow-y-auto p-4 z-40">
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
            <li>
              <Link href="/dashboard" className="block p-2 hover:bg-gray-700">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className="block p-2 hover:bg-gray-700">
                Perfil
              </Link>
            </li>

            {/* Menú de Proceso */}
            <li>
              <details className="bg-gray-800 p-2 rounded">
                <summary className="cursor-pointer"> ⚙️ Proceso</summary>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link href="/dashboard/proceso/info-corrida" className="block p-2 hover:bg-gray-700">
                      📈 Información de Corrida
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/stock/busqueda-cata" className="block px-4 py-2 hover:bg-gray-200">
                      🔍 Búsqueda por CATA
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* Menú de Stock */}
            <li>
              <details className="bg-gray-800 p-2 rounded">
                <summary className="cursor-pointer">📦 Stock</summary>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link href="/dashboard/stock/stock-actual" className="block p-2 hover:bg-gray-700">
                      📄 Stock Actual
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/stock/busqueda-cata" className="block px-4 py-2 hover:bg-gray-200">
                      🔍 Búsqueda por CATA
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Sección inferior */}
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

      {/* Contenido principal con margen para sidebar */}
      <div className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}
