"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type UserRole = "superadmin" | "admin" | "scanner" | "user"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  churchId?: string // ID da igreja para admins
  churchName?: string // Nome da igreja para admins
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica se há um usuário no localStorage (simulação)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulação de login
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "superadmin@igrejavideira.com" && password === "admin123") {
        const user = {
          id: "1",
          name: "Super Administrador",
          email: "superadmin@igrejavideira.com",
          role: "superadmin" as UserRole,
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      } else if (email === "admin@igrejavideira.com" && password === "admin123") {
        const user = {
          id: "2",
          name: "Administrador",
          email: "admin@igrejavideira.com",
          role: "admin" as UserRole,
          churchId: "1",
          churchName: "Igreja Videira - Sede",
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      } else if (email === "scanner@igrejavideira.com" && password === "scanner123") {
        const user = {
          id: "3",
          name: "Operador Scanner",
          email: "scanner@igrejavideira.com",
          role: "scanner" as UserRole,
          churchId: "1",
          churchName: "Igreja Videira - Sede",
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      } else if (email === "usuario@exemplo.com" && password === "senha123") {
        const user = {
          id: "4",
          name: "João Silva",
          email: "usuario@exemplo.com",
          role: "user" as UserRole,
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
