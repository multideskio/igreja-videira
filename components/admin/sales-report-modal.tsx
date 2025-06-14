"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, Users, DollarSign, Calendar, CreditCard, Percent } from "lucide-react"

interface SalesReportModalProps {
  eventId: string
  event?: any
  isOpen: boolean
  onClose: () => void
}

export function SalesReportModal({ eventId, event, isOpen, onClose }: SalesReportModalProps) {
  const [timeFilter, setTimeFilter] = useState("all")

  // Dados simulados de vendas detalhadas
  const salesData = {
    summary: {
      totalSales: event?.ticketsSold || 0,
      totalRevenue: event?.revenue || 0,
      averageTicketPrice: event?.revenue && event?.ticketsSold ? event.revenue / event.ticketsSold : 0,
      conversionRate: event?.conversionRate || 0,
      refunds: 5,
      refundAmount: 375.0,
    },
    salesByDay: [
      { date: "2024-05-01", sales: 45, revenue: 3375 },
      { date: "2024-05-02", sales: 32, revenue: 2400 },
      { date: "2024-05-03", sales: 28, revenue: 2100 },
      { date: "2024-05-04", sales: 41, revenue: 3075 },
      { date: "2024-05-05", sales: 38, revenue: 2850 },
      { date: "2024-05-06", sales: 35, revenue: 2625 },
      { date: "2024-05-07", sales: 26, revenue: 1950 },
    ],
    salesByVariation: event?.variations || [],
    salesByPaymentMethod: [
      { method: "Cartão de Crédito", sales: 180, percentage: 73.5 },
      { method: "PIX", sales: 45, percentage: 18.4 },
      { method: "Cartão de Débito", sales: 20, percentage: 8.1 },
    ],
    recentTransactions: [
      {
        id: "TXN001",
        customerName: "Maria Silva",
        email: "maria@email.com",
        ticketType: "VIP",
        quantity: 2,
        amount: 240.0,
        paymentMethod: "Cartão de Crédito",
        date: "2024-05-07 14:30",
        status: "Confirmado",
      },
      {
        id: "TXN002",
        customerName: "João Santos",
        email: "joao@email.com",
        ticketType: "Comum",
        quantity: 1,
        amount: 75.0,
        paymentMethod: "PIX",
        date: "2024-05-07 13:15",
        status: "Confirmado",
      },
      {
        id: "TXN003",
        customerName: "Ana Costa",
        email: "ana@email.com",
        ticketType: "Comum",
        quantity: 3,
        amount: 225.0,
        paymentMethod: "Cartão de Débito",
        date: "2024-05-07 12:45",
        status: "Confirmado",
      },
      {
        id: "TXN004",
        customerName: "Pedro Lima",
        email: "pedro@email.com",
        ticketType: "VIP",
        quantity: 1,
        amount: 120.0,
        paymentMethod: "Cartão de Crédito",
        date: "2024-05-07 11:20",
        status: "Estornado",
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmado":
        return <Badge className="bg-green-500">Confirmado</Badge>
      case "Pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>
      case "Estornado":
        return <Badge className="bg-red-500">Estornado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Relatório de Vendas</DialogTitle>
          <DialogDescription className="text-gray-400">
            {event.title} - {event.date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px] border-gray-700 bg-gray-800">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Resumo</TabsTrigger>
              <TabsTrigger value="sales">Vendas por Dia</TabsTrigger>
              <TabsTrigger value="variations">Por Variação</TabsTrigger>
              <TabsTrigger value="transactions">Transações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Cards de Resumo */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-800 bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total de Vendas</CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{salesData.summary.totalSales}</div>
                    <p className="text-xs text-gray-500">de {event.capacity} disponíveis</p>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      R$ {salesData.summary.totalRevenue.toLocaleString("pt-BR")}
                    </div>
                    <p className="text-xs text-gray-500">
                      -R$ {salesData.summary.refundAmount.toLocaleString("pt-BR")} em estornos
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Ticket Médio</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      R$ {salesData.summary.averageTicketPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-gray-500">por ingresso vendido</p>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Taxa de Conversão</CardTitle>
                    <Percent className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{salesData.summary.conversionRate}%</div>
                    <p className="text-xs text-gray-500">visitantes que compraram</p>
                  </CardContent>
                </Card>
              </div>

              {/* Vendas por Método de Pagamento */}
              <Card className="border-gray-800 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Vendas por Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.salesByPaymentMethod.map((method) => (
                      <div key={method.method} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{method.method}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400">{method.sales} vendas</span>
                          <span className="text-white font-medium">{method.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card className="border-gray-800 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Vendas por Dia</CardTitle>
                  <CardDescription className="text-gray-400">Evolução das vendas ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.salesByDay.map((day) => (
                      <div
                        key={day.date}
                        className="flex items-center justify-between p-3 border border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{new Date(day.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Vendas</p>
                            <p className="text-white font-medium">{day.sales}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Receita</p>
                            <p className="text-green-400 font-medium">R$ {day.revenue.toLocaleString("pt-BR")}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variations" className="space-y-4">
              <Card className="border-gray-800 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Vendas por Variação de Ingresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.salesByVariation.map((variation) => (
                      <div
                        key={variation.name}
                        className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                      >
                        <div>
                          <h4 className="text-white font-medium">{variation.name}</h4>
                          <p className="text-gray-400 text-sm">R$ {variation.price.toFixed(2)} por ingresso</p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Vendidos</p>
                            <p className="text-white font-medium">{variation.sold}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Receita</p>
                            <p className="text-green-400 font-medium">
                              R$ {(variation.sold * variation.price).toLocaleString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="border-gray-800 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Transações Recentes</CardTitle>
                  <CardDescription className="text-gray-400">Últimas vendas realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-400">Cliente</TableHead>
                        <TableHead className="text-gray-400">Tipo</TableHead>
                        <TableHead className="text-gray-400">Qtd</TableHead>
                        <TableHead className="text-gray-400">Valor</TableHead>
                        <TableHead className="text-gray-400">Pagamento</TableHead>
                        <TableHead className="text-gray-400">Data</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-gray-700">
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">{transaction.customerName}</p>
                              <p className="text-gray-400 text-sm">{transaction.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">{transaction.ticketType}</TableCell>
                          <TableCell className="text-white">{transaction.quantity}</TableCell>
                          <TableCell className="text-green-400">
                            R$ {transaction.amount.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-white">{transaction.paymentMethod}</TableCell>
                          <TableCell className="text-gray-400">{transaction.date}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
