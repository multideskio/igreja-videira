import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Rotas que precisam de autenticação
  const protectedRoutes = ["/api/admin", "/api/purchases"]
  const publicRoutes = ["/api/auth", "/api/events"]

  const { pathname } = request.nextUrl

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // Se for rota protegida e não for pública
  if (isProtectedRoute && !isPublicRoute) {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token de acesso requerido" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    // Adicionar userId ao header para uso nas rotas
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", payload.userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
