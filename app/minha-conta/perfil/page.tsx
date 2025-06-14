"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

export default function PerfilPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Dados simulados do usuário
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    celula: "Célula Central",
    discipulador: "Pr. Roberto",
    regiao: "Zona Norte",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    // Simulação de atualização
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage("Perfil atualizado com sucesso!")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    // Simulação de atualização de senha
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage("Senha atualizada com sucesso!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-gray-400">Gerencie suas informações pessoais</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="border-gray-800 bg-gray-900 md:w-1/3">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
            <CardDescription>Atualize sua foto de perfil</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="mb-4 h-32 w-32">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Avatar" />
              <AvatarFallback className="text-2xl">JS</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col gap-2">
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                <Upload className="mr-2 h-4 w-4" /> Alterar Foto
              </Button>
              <Button variant="outline" className="border-gray-700 text-red-400 hover:bg-gray-800 hover:text-red-400">
                Remover Foto
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="informacoes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="senha">Alterar Senha</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes">
              <Card className="border-gray-800 bg-gray-900">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações de contato e da igreja</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {successMessage && (
                      <div className="rounded-md bg-green-900/30 p-3 text-sm text-green-400">{successMessage}</div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={userData.nome}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={userData.telefone}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="celula">Célula</Label>
                      <Input
                        id="celula"
                        name="celula"
                        value={userData.celula}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="discipulador">Discipulador</Label>
                      <Input
                        id="discipulador"
                        name="discipulador"
                        value={userData.discipulador}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="regiao">Região</Label>
                      <Input
                        id="regiao"
                        name="regiao"
                        value={userData.regiao}
                        onChange={handleChange}
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="senha">
              <Card className="border-gray-800 bg-gray-900">
                <form onSubmit={handlePasswordSubmit}>
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Atualize sua senha de acesso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {successMessage && (
                      <div className="rounded-md bg-green-900/30 p-3 text-sm text-green-400">{successMessage}</div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input id="senha-atual" type="password" className="border-gray-700 bg-gray-800 text-white" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input id="nova-senha" type="password" className="border-gray-700 bg-gray-800 text-white" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                      <Input id="confirmar-senha" type="password" className="border-gray-700 bg-gray-800 text-white" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                      {isLoading ? "Atualizando..." : "Atualizar Senha"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
