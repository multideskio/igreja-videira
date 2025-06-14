"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Search, Edit, Trash, Eye, UserPlus, Users, UserCheck, UserX } from "lucide-react"

export default function AdminUsuariosPage() {
  // Dados simulados de usuários
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123 - Centro",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
      role: "user",
      status: "active",
      createdAt: "10 de Maio, 2024",
      lastLogin: "15 de Junho, 2024",
      totalPurchases: 3,
      totalSpent: 225.0,
    },
    {
      id: "2",
      name: "Maria Silva",
      email: "maria.silva@exemplo.com",
      telefone: "(11) 98765-4322",
      endereco: "Rua das Flores, 123 - Centro",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
      role: "user",
      status: "active",
      createdAt: "10 de Maio, 2024",
      lastLogin: "14 de Junho, 2024",
      totalPurchases: 2,
      totalSpent: 150.0,
    },
    {
      id: "3",
      name: "Pedro Santos",
      email: "pedro.santos@exemplo.com",
      telefone: "(11) 98765-4323",
      endereco: "Av. Principal, 456 - Zona Norte",
      celula: "Célula Norte",
      discipulador: "Pr. Ana",
      regiao: "Zona Norte",
      role: "scanner",
      status: "active",
      createdAt: "20 de Julho, 2024",
      lastLogin: "15 de Junho, 2024",
      totalPurchases: 1,
      totalSpent: 50.0,
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@exemplo.com",
      telefone: "(11) 98765-4324",
      endereco: "Rua da Igreja, 789 - Centro",
      celula: "Célula Sul",
      discipulador: "Pr. Carlos",
      regiao: "Zona Sul",
      role: "user",
      status: "inactive",
      createdAt: "15 de Março, 2024",
      lastLogin: "20 de Maio, 2024",
      totalPurchases: 0,
      totalSpent: 0.0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">Inativo</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspenso</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Administrador</Badge>
      case "scanner":
        return <Badge className="bg-blue-500">Scanner</Badge>
      case "user":
        return <Badge className="bg-gray-600">Usuário</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const changeUserRole = (userId: string, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  // Estatísticas
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const adminUsers = users.filter((u) => u.role === "admin").length
  const scannerUsers = users.filter((u) => u.role === "scanner").length

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
          <Button className="bg-green-600 hover:bg-green-700">
            <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <UserX className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminUsers}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scanners</CardTitle>
              <UserX className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scannerUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-700 bg-gray-800 pl-9 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            >
              <option value="all">Todas as funções</option>
              <option value="admin">Administrador</option>
              <option value="scanner">Scanner</option>
              <option value="user">Usuário</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="suspended">Suspenso</option>
            </select>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              Exportar
            </Button>
          </div>
        </div>

        {/* Tabela de usuários */}
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableHead className="text-gray-400">Nome</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Função</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Célula</TableHead>
                <TableHead className="text-right text-gray-400">Compras</TableHead>
                <TableHead className="text-right text-gray-400">Total Gasto</TableHead>
                <TableHead className="text-right text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-800 hover:bg-gray-900">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.celula}</TableCell>
                  <TableCell className="text-right">{user.totalPurchases}</TableCell>
                  <TableCell className="text-right">R$ {user.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 text-white">
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Visualizar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              <span>Desativar</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              <span>Ativar</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        {user.role !== "admin" && (
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => changeUserRole(user.id, user.role === "scanner" ? "user" : "scanner")}
                          >
                            <span>{user.role === "scanner" ? "Remover Scanner" : "Tornar Scanner"}</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="rounded-lg border border-gray-800 bg-gray-800/30 p-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-500" />
            <h3 className="mb-2 text-xl font-medium">Nenhum usuário encontrado</h3>
            <p className="text-gray-400">Nenhum usuário corresponde aos filtros selecionados.</p>
          </div>
        )}

        {/* Paginação */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            Anterior
          </Button>
          <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
            1
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            2
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            3
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            Próxima
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
