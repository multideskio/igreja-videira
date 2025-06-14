"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ArrowUpRight, Users, Calendar, Ticket, DollarSign } from "lucide-react"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados simulados para os gráficos
  const salesData = [
    { name: "Jan", vendas: 4000 },
    { name: "Fev", vendas: 3000 },
    { name: "Mar", vendas: 5000 },
    { name: "Abr", vendas: 2780 },
    { name: "Mai", vendas: 1890 },
    { name: "Jun", vendas: 2390 },
    { name: "Jul", vendas: 3490 },
  ]

  const eventPopularityData = [
    { name: "Conferência Anual", value: 400 },
    { name: "Retiro de Jovens", value: 300 },
    { name: "Seminário de Liderança", value: 200 },
    { name: "Culto Especial", value: 100 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const userGrowthData = [
    { name: "Jan", usuarios: 500 },
    { name: "Fev", usuarios: 600 },
    { name: "Mar", usuarios: 750 },
    { name: "Abr", usuarios: 900 },
    { name: "Mai", usuarios: 1100 },
    { name: "Jun", usuarios: 1300 },
    { name: "Jul", usuarios: 1500 },
  ]

  // Dados simulados para os cards
  const statsCards = [
    {
      title: "Total de Vendas",
      value: "R$ 24.780,00",
      change: "+12%",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Ingressos Vendidos",
      value: "1,234",
      change: "+8%",
      icon: <Ticket className="h-4 w-4" />,
    },
    {
      title: "Eventos Ativos",
      value: "12",
      change: "+2",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Usuários Cadastrados",
      value: "1,543",
      change: "+15%",
      icon: <Users className="h-4 w-4" />,
    },
  ]

  // Dados simulados para eventos recentes
  const recentEvents = [
    {
      id: "1",
      title: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      sales: 245,
      revenue: "R$ 18.375,00",
    },
    {
      id: "2",
      title: "Retiro de Jovens",
      date: "22-24 de Julho, 2024",
      sales: 120,
      revenue: "R$ 18.000,00",
    },
    {
      id: "3",
      title: "Seminário de Liderança",
      date: "10 de Agosto, 2024",
      sales: 85,
      revenue: "R$ 4.250,00",
    },
    {
      id: "4",
      title: "Culto Especial de Aniversário",
      date: "5 de Setembro, 2024",
      sales: 350,
      revenue: "R$ 0,00",
    },
  ]

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((card, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <div className="h-4 w-4 text-green-500">{card.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-green-500 flex items-center">
                      {card.change}
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                      <span className="text-gray-500 dark:text-gray-400 ml-1">em relação ao mês anterior</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Vendas Mensais</CardTitle>
                  <CardDescription>Vendas de ingressos nos últimos 7 meses</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="vendas" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Popularidade dos Eventos</CardTitle>
                  <CardDescription>Distribuição de vendas por evento</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={eventPopularityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventPopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Crescimento de Usuários</CardTitle>
                  <CardDescription>Novos usuários cadastrados por mês</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="usuarios" stroke="#22c55e" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Eventos Recentes</CardTitle>
                  <CardDescription>Desempenho dos últimos eventos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 text-sm font-medium text-gray-500">
                      <div>Evento</div>
                      <div>Data</div>
                      <div className="text-right">Vendas</div>
                      <div className="text-right">Receita</div>
                    </div>
                    {recentEvents.map((event) => (
                      <div key={event.id} className="grid grid-cols-4 items-center py-2">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-gray-500">{event.date}</div>
                        <div className="text-right">{event.sales}</div>
                        <div className="text-right font-medium">{event.revenue}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análises Detalhadas</CardTitle>
                <CardDescription>Visualize métricas avançadas sobre seus eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de análises detalhadas será exibido aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Gere e exporte relatórios personalizados</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo de relatórios será exibido aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
