"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogIn, Ticket, Settings, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/shared/auth-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Fechar menu quando a rota mudar
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Não mostrar o header nas páginas de admin
  if (pathname.startsWith("/admin")) {
    return null
  }

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Eventos", href: "/eventos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950 bg-opacity-95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-400">Igreja Videira</span>
          </Link>
          <nav className="ml-10 hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? "text-green-400" : "text-gray-300 transition-colors hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 text-white">
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-800">
                  <Link href="/minha-conta">
                    <User className="mr-2 h-4 w-4" />
                    <span>Minha Conta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-800">
                  <Link href="/minha-conta/ingressos">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Meus Ingressos</span>
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-800">
                    <Link href="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Painel Administrativo</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer hover:bg-gray-800">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
          )}
        </div>

        <div className="flex md:hidden">
          <button type="button" className="text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Abrir menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "bg-gray-900 text-green-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/minha-conta"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Minha Conta
                </Link>
                <button
                  onClick={() => logout()}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
