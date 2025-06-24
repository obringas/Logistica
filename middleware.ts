import { NextRequest, NextResponse } from "next/server";

// Define tu basePath aquí o léelo de una variable de entorno si prefieres
const basePath = "/StockLogistica";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // La ruta completa de la página de login
  const loginPath = `${basePath}/login`;

  // Comprueba si la ruta actual es la página de login
  const isAuthPage = req.nextUrl.pathname === loginPath;

  // 1. Si el usuario TIENE token y está intentando ir a la página de login...
  // ...lo redirigimos al inicio del dashboard.
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(`${basePath}/dashboard`, req.url));
  }

  // 2. Si el usuario NO TIENE token y NO está en la página de login...
  // ...lo redirigimos a la página de login.
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  // 3. Si ninguna de las condiciones anteriores se cumple, permite que la solicitud continúe.
  return NextResponse.next();
}

// Configuración del matcher CORREGIDA para incluir el basePath
export const config = {
  matcher: [
    /*
     * Aplica el middleware a todas estas rutas:
     * - /StockLogistica/dashboard (y todas sus sub-rutas como /admin/users)
     * - /StockLogistica/login (para poder redirigir si ya hay token)
     */
    "/StockLogistica/dashboard/:path*", // Protege las páginas del dashboard
    "/StockLogistica/login",           // Se aplica en la página de login
    "/StockLogistica",                 // <-- AÑADE ESTA LÍNEA. Protege la ruta raíz.
  ],
};