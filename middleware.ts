import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Aquí asumimos que usas cookies para autenticación

  const isAuthPage = req.nextUrl.pathname === "/login";

  // Si el usuario está autenticado y está en el login, lo redirige al dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Si no está autenticado y quiere entrar a una ruta protegida, lo manda al login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo en ciertas rutas
export const config = {
  matcher: ["/dashboard/:path*", "/"], // Protege el dashboard y la raíz
};
