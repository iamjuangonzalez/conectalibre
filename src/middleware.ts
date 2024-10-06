// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Obtener la cookie de la autenticación de Firebase
  const token = req.cookies.get("firebaseToken");

  // Rutas protegidas (las que requieren autenticación)
  const protectedRoutes = ["/dashboard/home"];

  // Si el usuario intenta acceder a una ruta protegida
  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      // Si no hay token de autenticación, redirigir a login
      url.pathname = "/dashboard/auth";
      return NextResponse.redirect(url);
    }
  }

  console.log("Middleware ejecutándose para la ruta:", url.pathname);

  // Si el token existe, permitir la navegación
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Aplica el middleware a todas las rutas bajo /dashboard
};
