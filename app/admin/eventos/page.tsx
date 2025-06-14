"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  MoreVertical,
  Search,
  Edit,
  Trash,
  Eye,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
} from "lucide-react"
import Link from "next/link"
import { SalesReportModal } from "@/components/admin/sales-report-modal"

export default function AdminEventosPage() {
  const [selectedEventForSales, setSelectedEventForSales] = useState<string | null>(null)

  // Dados simulados de eventos com mais informações de relatório
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      location: "Igreja Videira - Sede",
      price: 75.0,
      status: "active",
      sales: 245,
      revenue: 18375.0,
      capacity: 500,
      ticketsSold: 245,
      conversionRate: 68.5,
      variations: [
        { name: "Comum", sold: 180, price: 75.0 },
        { name: "VIP", sold: 65, price: 120.0 },
      ],
    },
    {
      id: "2",
      title: "Retiro de Jovens",
      date: "22-24 de Julho, 2024",
      location: "Acampamento Videira",
      price: 150.0,
      status: "active",
      sales: 120,
      revenue: 18000.0,
      capacity: 200,
      ticketsSold: 120,
      conversionRate: 85.2,
      variations: [{ name: "Comum", sold: 120, price: 150.0 }],
    },
    {
      id: "3",
      title: "Seminário de Liderança",
      date: "10 de Agosto, 2024",
      location: "Igreja Videira - Unidade Centro",
      price: 50.0,
      status: "active",
      sales: 85,
      revenue: 4250.0,
      capacity: 150,
      ticketsSold: 85,
      conversionRate: 72.3,
      variations: [{ name: "Comum", sold: 85, price: 50.0 }],
    },
    {
      id: "4",
      title: "Culto Especial de Aniversário",
      date: "5 de Setembro, 2024",
      location: "Igreja Videira - Sede",
      price: 0.0,
      status: "active",
      sales: 350,
      revenue: 0.0,
      capacity: 800,
      ticketsSold: 350,
      conversionRate: 92.1,
      variations: [{ name: "Gratuito", sold: 350, price: 0.0 }],
    },
    {
      id: "5",
      title: "Workshop de Música e Adoração",
      date: "18 de Setembro, 2024",
      location: "Igreja Videira - Unidade Zona Sul",
      price: 35.0,
      status: "draft",
      sales: 0,
      revenue: 0.0,
      capacity: 100,
      ticketsSold: 0,
      conversionRate: 0,
      variations: [{ name: "Comum", sold: 0, price: 35.0 }],
    },
  ])

  // Cálculos para o resumo geral
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalTicketsSold = events.reduce((sum, event) => sum + event.ticketsSold, 0)
  const activeEvents = events.filter((event) => event.status === "active").length
  const averageTicketPrice = totalTicketsSold > 0 ? totalRevenue / totalTicketsSold : 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Rascunho</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Agendado</Badge>
      case "completed":
        return <Badge className="bg-purple-500">Concluído</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              Exportar Relatório
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/admin/eventos/novo">
                <Plus className="mr-2 h-4 w-4" /> Criar Evento
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="events">Lista de Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Cards de Resumo */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-gray-800 bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-gray-500">+12.5% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Ingressos Vendidos</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalTicketsSold.toLocaleString("pt-BR")}</div>
                  <p className="text-xs text-gray-500">+8.2% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Eventos Ativos</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{activeEvents}</div>
                  <p className="text-xs text-gray-500">de {events.length} eventos totais</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Ticket Médio</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    R$ {averageTicketPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-gray-500">+5.1% em relação ao mês anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Performance dos Eventos */}
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-white">Performance dos Eventos</CardTitle>
                <CardDescription className="text-gray-400">Ocupação e receita por evento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter((event) => event.status === "active")
                    .map((event) => {
                      const occupancyPercentage = (event.ticketsSold / event.capacity) * 100
                      return (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 border border-gray-800 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{event.title}</h4>
                            <p className="text-sm text-gray-400">{event.date}</p>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <p className="text-gray-400">Ocupação</p>
                              <p className={`font-medium ${getOccupancyColor(occupancyPercentage)}`}>
                                {occupancyPercentage.toFixed(1)}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-400">Vendidos</p>
                              <p className="font-medium text-white">
                                {event.ticketsSold}/{event.capacity}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-400">Receita</p>
                              <p className="font-medium text-green-400">R$ {event.revenue.toLocaleString("pt-BR")}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEventForSales(event.id)}
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Ver Vendas
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar eventos..."
                  className="w-full border-gray-700 bg-gray-800 pl-9 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Filtrar
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader className="bg-gray-900">
                  <TableRow className="border-gray-800 hover:bg-gray-900">
                    <TableHead className="text-gray-400">Nome</TableHead>
                    <TableHead className="text-gray-400">Data</TableHead>
                    <TableHead className="text-gray-400">Local</TableHead>
                    <TableHead className="text-gray-400">Preço</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-right text-gray-400">Vendas</TableHead>
                    <TableHead className="text-right text-gray-400">Receita</TableHead>
                    <TableHead className="text-right text-gray-400">Ocupação</TableHead>
                    <TableHead className="text-right text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => {
                    const occupancyPercentage = (event.ticketsSold / event.capacity) * 100
                    return (
                      <TableRow key={event.id} className="border-gray-800 hover:bg-gray-900">
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.price === 0 ? "Gratuito" : `R$ ${event.price.toFixed(2)}`}</TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell className="text-right">{event.sales}</TableCell>
                        <TableCell className="text-right text-green-400">
                          R$ {event.revenue.toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell className={`text-right ${getOccupancyColor(occupancyPercentage)}`}>
                          {occupancyPercentage.toFixed(1)}%
                        </TableCell>
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
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-gray-800"
                                onClick={() => setSelectedEventForSales(event.id)}
                              >
                                <BarChart3 className="mr-2 h-4 w-4" />
                                <span>Ver Vendas</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

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
          </TabsContent>
        </Tabs>

        {/* Modal de Relatório de Vendas */}
        {selectedEventForSales && (
          <SalesReportModal
            eventId={selectedEventForSales}
            event={events.find((e) => e.id === selectedEventForSales)}
            isOpen={!!selectedEventForSales}
            onClose={() => setSelectedEventForSales(null)}
          />
        )}
      </div>
    </AdminLayout>
  )
}
