"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Search, Edit, Trash, Eye, Building, Plus, Users, Calendar } from "lucide-react"
import { useAuth } from "@/components/shared/auth-provider"
import { useRouter } from "next/navigation"

export default function AdminIgrejasPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [churches, setChurches] = useState([
    {
      id: "1",
      name: "Igreja Videira - Sede",
      address: "Av. Principal, 1000 - Centro, São Paulo - SP",
      pastor: "Pr. João Silva",
      phone: "(11) 99999-9999",
      email: "sede@igrejavideira.com.br",
      status: "active",
      membersCount: 1200,
      eventsCount: 15,
      adminsCount: 3,
      createdAt: "10/01/2020",
    },
    {
      id: "2",
      name: "Igreja Videira - Zona Norte",
      address: "Rua das Flores, 500 - Zona Norte, São Paulo - SP",
      pastor: "Pr. Maria Oliveira",
      phone: "(11) 99999-8888",
      email: "zonanorte@igrejavideira.com.br",
      status: "active",
      membersCount: 800,
      eventsCount: 8,
      adminsCount: 2,
      createdAt: "15/06/2021",
    },
    {
      id: "3",
      name: "Igreja Videira - Zona Sul",
      address: "Av. das Árvores, 300 - Zona Sul, São Paulo - SP",
      pastor: "Pr. Pedro Santos",
      phone: "(11) 99999-7777",
      email: "zonasul@igrejavideira.com.br",
      status: "active",
      membersCount: 650,
      eventsCount: 6,
      adminsCount: 2,
      createdAt: "20/03/2022",
    },
    {
      id: "4",
      name: "Igreja Videira - Campinas",
      address: "Rua Central, 200 - Centro, Campinas - SP",
      pastor: "Pr. Ana Costa",
      phone: "(19) 99999-6666",
      email: "campinas@igrejavideira.com.br",
      status: "inactive",
      membersCount: 450,
      eventsCount: 3,
      adminsCount: 1,
      createdAt: "05/11/2022",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Verificar se o usuário é superadmin
  if (user?.role !== "superadmin") {
    router.push("/admin")
    return null
  }

  const filteredChurches = churches.filter((church) => {
    const matchesSearch =
      church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.pastor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || church.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativa</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">Inativa</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const toggleChurchStatus = (churchId: string) => {
    setChurches(
      churches.map((church) =>
        church.id === churchId ? { ...church, status: church.status === "active" ? "inactive" : "active" } : church,
      ),
    )
  }

  // Estatísticas
  const totalChurches = churches.length
  const activeChurches = churches.filter((c) => c.status === "active").length
  const totalMembers = churches.reduce((sum, church) => sum + church.membersCount, 0)
  const totalEvents = churches.reduce((sum, church) => sum + church.eventsCount, 0)

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Igrejas</h2>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Igreja
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Igrejas</CardTitle>
              <Building className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChurches}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Igrejas Ativas</CardTitle>
              <Building className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeChurches}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar igrejas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-700 bg-gray-800 pl-9 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativas</option>
              <option value="inactive">Inativas</option>
            </select>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              Exportar
            </Button>
          </div>
        </div>

        {/* Tabela de igrejas */}
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableHead className="text-gray-400">Nome</TableHead>
                <TableHead className="text-gray-400">Pastor</TableHead>
                <TableHead className="text-gray-400">Contato</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-right text-gray-400">Membros</TableHead>
                <TableHead className="text-right text-gray-400">Eventos</TableHead>
                <TableHead className="text-right text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChurches.map((church) => (
                <TableRow key={church.id} className="border-gray-800 hover:bg-gray-900">
                  <TableCell className="font-medium">{church.name}</TableCell>
                  <TableCell>{church.pastor}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{church.email}</div>
                      <div className="text-gray-400">{church.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(church.status)}</TableCell>
                  <TableCell className="text-right">{church.membersCount}</TableCell>
                  <TableCell className="text-right">{church.eventsCount}</TableCell>
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
                          onClick={() => toggleChurchStatus(church.id)}
                        >
                          {church.status === "active" ? <span>Desativar</span> : <span>Ativar</span>}
                        </DropdownMenuItem>
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

        {filteredChurches.length === 0 && (
          <div className="rounded-lg border border-gray-800 bg-gray-800/30 p-8 text-center">
            <Building className="mx-auto mb-4 h-12 w-12 text-gray-500" />
            <h3 className="mb-2 text-xl font-medium">Nenhuma igreja encontrada</h3>
            <p className="text-gray-400">Nenhuma igreja corresponde aos filtros selecionados.</p>
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
            Próxima
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
