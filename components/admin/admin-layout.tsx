"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/shared/auth-provider"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Building,
  Globe,
  Ticket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!user && !pathname.includes("/admin/login")) {
      router.push("/admin/login")
    } else if (user && user.role === "user" && !pathname.includes("/admin/login")) {
      // Usuários comuns não podem acessar o painel admin
      router.push("/")
    }
  }, [user, router, pathname])

  // Navegação baseada na role do usuário
  const getSidebarNavigation = () => {
    // Navegação para Super Admin
    if (user?.role === "superadmin") {
      return [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Igrejas", href: "/admin/igrejas", icon: Building },
        { name: "Todos os Eventos", href: "/admin/eventos", icon: Calendar },
        { name: "Usuários", href: "/admin/usuarios", icon: Users },
        { name: "Cupons", href: "/admin/cupons", icon: Ticket },
        { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
      ]
    }

    // Navegação para Admin
    if (user?.role === "admin") {
      return [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Eventos", href: "/admin/eventos", icon: Calendar },
        { name: "Scanner QR", href: "/admin/scanner", icon: QrCode },
        { name: "Usuários", href: "/admin/usuarios", icon: Users },
        { name: "Cupons", href: "/admin/cupons", icon: Ticket },
        { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
      ]
    }

    // Navegação para Scanner
    if (user?.role === "scanner") {
      return [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Scanner QR", href: "/admin/scanner", icon: QrCode },
      ]
    }

    // Fallback para qualquer outra role
    return [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }]
  }

  const navigation = getSidebarNavigation()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  // Se estiver na página de login, não mostrar o layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Se não estiver autenticado ou for usuário comum, não mostrar nada
  if (!user || user.role === "user") {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar para desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-800 bg-gray-900 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-bold text-green-400">Igreja Videira</span>
          </Link>
          <button
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Exibir a igreja atual para admins e scanners */}
        {(user.role === "admin" || user.role === "scanner") && user.churchName && (
          <div className="border-b border-gray-800 px-4 py-2">
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{user.churchName}</span>
            </div>
          </div>
        )}

        {/* Exibir indicador de Super Admin */}
        {user.role === "superadmin" && (
          <div className="border-b border-gray-800 px-4 py-2">
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Super Administrador</span>
            </div>
          </div>
        )}

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-gray-800 text-green-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-green-400" : "text-gray-400"}`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarFallback className="bg-gray-800 text-green-400">{user?.name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || "Administrador"}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="ml-auto text-gray-400 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Cabeçalho */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-4">
          <div className="flex items-center">
            <button
              className="mr-4 rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <button
              className="hidden rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:block"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </button>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-800 text-green-400">
                      {user?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-800 bg-gray-900 text-white">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">Meu Perfil</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">Configurações</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-800" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-gray-950 bg-opacity-75 md:hidden">
            <div className="fixed inset-y-0 left-0 z-40 w-full max-w-xs overflow-y-auto bg-gray-900 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-green-400">Igreja Videira</span>
                </div>
                <button
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Exibir a igreja atual para admins e scanners no mobile */}
              {(user.role === "admin" || user.role === "scanner") && user.churchName && (
                <div className="mt-2 border-b border-gray-800 pb-2">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{user.churchName}</span>
                  </div>
                </div>
              )}

              {/* Exibir indicador de Super Admin no mobile */}
              {user.role === "superadmin" && (
                <div className="mt-2 border-b border-gray-800 pb-2">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-purple-400" />
                    <span className="text-sm text-purple-300">Super Administrador</span>
                  </div>
                </div>
              )}

              <div className="mt-5">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center rounded-md px-3 py-2 text-base font-medium ${
                          isActive ? "bg-gray-800 text-green-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon
                          className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? "text-green-400" : "text-gray-400"}`}
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <LogOut className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400" />
                    Sair
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
