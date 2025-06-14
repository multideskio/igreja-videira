"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/shared/auth-provider"
import { Home, Ticket, User, LogOut, Menu, X } from "lucide-react"

export function UserAccountNav() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Fechar menu móvel quando a rota mudar
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigation = [
    { name: "Visão Geral", href: "/minha-conta", icon: Home },
    { name: "Meus Ingressos", href: "/minha-conta/ingressos", icon: Ticket },
    { name: "Meu Perfil", href: "/minha-conta/perfil", icon: User },
  ]

  return (
    <>
      {/* Versão móvel */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <h2 className="text-xl font-bold">Minha Conta</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="border-gray-700 hover:bg-gray-800"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu móvel */}
      {isMobileMenuOpen && (
        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-4 md:hidden">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-gray-800 text-green-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-green-400" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              )
            })}
            <button
              onClick={() => logout()}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sair
            </button>
          </nav>
        </div>
      )}

      {/* Versão desktop */}
      <div className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-20 rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h2 className="mb-4 px-3 text-lg font-semibold">Minha Conta</h2>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-gray-800 text-green-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-green-400" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              )
            })}
            <button
              onClick={() => logout()}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sair
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
