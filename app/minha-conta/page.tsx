"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { useAuth } from "@/components/shared/auth-provider"
import { useRouter } from "next/navigation"

export default function MinhaContaPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("proximos")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Dados simulados de eventos do usuário
  const proximosEventos = [
    {
      id: "1",
      title: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      time: "19:00 - 22:00",
      location: "Igreja Videira - Sede",
      ticketCount: 2,
    },
    {
      id: "3",
      title: "Seminário de Liderança",
      date: "10 de Agosto, 2024",
      time: "09:00 - 17:00",
      location: "Igreja Videira - Unidade Centro",
      ticketCount: 1,
    },
  ]

  const eventosPassados = [
    {
      id: "7",
      title: "Retiro de Jovens",
      date: "22-24 de Março, 2024",
      time: "Todo o dia",
      location: "Acampamento Videira",
      ticketCount: 1,
    },
    {
      id: "8",
      title: "Workshop de Música e Adoração",
      date: "15 de Fevereiro, 2024",
      time: "14:00 - 18:00",
      location: "Igreja Videira - Unidade Zona Sul",
      ticketCount: 1,
    },
    {
      id: "9",
      title: "Encontro de Casais",
      date: "10-11 de Janeiro, 2024",
      time: "Todo o dia",
      location: "Hotel Recanto",
      ticketCount: 2,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-green-500"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Minha Conta</h1>
        <p className="text-gray-400">Gerencie seus ingressos e informações pessoais</p>
      </div>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle>Meus Eventos</CardTitle>
          <CardDescription>Visualize seus ingressos para eventos futuros e passados</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="proximos" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
              <TabsTrigger value="passados">Eventos Passados</TabsTrigger>
            </TabsList>

            <TabsContent value="proximos" className="space-y-4">
              {proximosEventos.length > 0 ? (
                proximosEventos.map((evento) => <EventoCard key={evento.id} evento={evento} isPast={false} />)
              ) : (
                <div className="rounded-lg border border-gray-800 bg-gray-800/30 p-8 text-center">
                  <Ticket className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                  <h3 className="mb-2 text-xl font-medium">Nenhum evento futuro</h3>
                  <p className="text-gray-400">Você não tem ingressos para eventos futuros.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="passados" className="space-y-4">
              {eventosPassados.map((evento) => (
                <EventoCard key={evento.id} evento={evento} isPast={true} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface EventoCardProps {
  evento: {
    id: string
    title: string
    date: string
    time: string
    location: string
    ticketCount: number
  }
  isPast: boolean
}

function EventoCard({ evento, isPast }: EventoCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-800/30">
      <div className="p-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="mb-2 text-xl font-medium">{evento.title}</h3>
            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-400" />
                {evento.date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-green-400" />
                {evento.time}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-green-400" />
                {evento.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="rounded-full bg-gray-700 px-3 py-1 text-sm">
              {evento.ticketCount} {evento.ticketCount === 1 ? "ingresso" : "ingressos"}
            </div>
            {isPast ? (
              <button className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                Ver Certificado
              </button>
            ) : (
              <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                Ver QR Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
