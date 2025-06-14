"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/shared/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"admin" | "superadmin" | "scanner">("admin")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Usar o email correto baseado na tab selecionada
      let loginEmail = email
      if (activeTab === "superadmin" && email === "admin") {
        loginEmail = "superadmin@igrejavideira.com"
      } else if (activeTab === "admin" && email === "admin") {
        loginEmail = "admin@igrejavideira.com"
      } else if (activeTab === "scanner" && email === "scanner") {
        loginEmail = "scanner@igrejavideira.com"
      }

      const success = await login(loginEmail, password)
      if (success) {
        router.push("/admin")
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
          <p className="mt-2 text-gray-400">Acesso ao Painel Administrativo</p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "admin" | "superadmin" | "scanner")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="superadmin">Super Admin</TabsTrigger>
              <TabsTrigger value="scanner">Scanner</TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
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
            </TabsContent>

            <TabsContent value="superadmin">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="email-super">Email</Label>
                  <Input
                    id="email-super"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-super">Senha</Label>
                    <Button variant="link" className="h-auto p-0 text-xs text-green-400">
                      Esqueceu a senha?
                    </Button>
                  </div>
                  <Input
                    id="password-super"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 py-5 hover:bg-purple-700">
                  {isLoading ? "Entrando..." : "Entrar como Super Admin"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="scanner">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="email-scanner">Email</Label>
                  <Input
                    id="email-scanner"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-scanner">Senha</Label>
                    <Button variant="link" className="h-auto p-0 text-xs text-green-400">
                      Esqueceu a senha?
                    </Button>
                  </div>
                  <Input
                    id="password-scanner"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 py-5 hover:bg-blue-700">
                  {isLoading ? "Entrando..." : "Entrar como Scanner"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Para fins de demonstração, use:
            <br />
            <strong>Super Admin:</strong> superadmin@igrejavideira.com / admin123
            <br />
            <strong>Admin:</strong> admin@igrejavideira.com / admin123
            <br />
            <strong>Scanner:</strong> scanner@igrejavideira.com / scanner123
            <br />
            <strong>Ou simplesmente:</strong> admin / admin123 (em qualquer tab)
          </p>
        </div>
      </div>
    </div>
  )
}
