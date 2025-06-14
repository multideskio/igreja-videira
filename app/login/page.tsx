"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/shared/auth-provider"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/minha-conta")
      } else {
        setError("Email ou senha inválidos")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-400">Igreja Videira</h1>
          <p className="mt-2 text-gray-400">Acesse sua conta</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button variant="link" className="h-auto p-0 text-xs text-green-400">
                  Esqueceu a senha?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-green-600 py-5 hover:bg-green-700">
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-green-400 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Para fins de demonstração, use:
            <br />
            Email: usuario@exemplo.com
            <br />
            Senha: senha123
          </p>
        </div>
      </div>
    </div>
  )
}
