"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function MeusIngressosPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>("1")

  // Dados simulados de ingressos
  const ingressos = [
    {
      id: "1",
      eventId: "1",
      eventName: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      location: "Igreja Videira - Sede",
      participantName: "João Silva",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
    },
    {
      id: "2",
      eventId: "1",
      eventName: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      location: "Igreja Videira - Sede",
      participantName: "Maria Silva",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
    },
    {
      id: "3",
      eventId: "3",
      eventName: "Seminário de Liderança",
      date: "10 de Agosto, 2024",
      location: "Igreja Videira - Unidade Centro",
      participantName: "João Silva",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
    },
  ]

  const filteredIngressos = selectedEvent
    ? ingressos.filter((ingresso) => ingresso.eventId === selectedEvent)
    : ingressos

  const uniqueEvents = Array.from(new Set(ingressos.map((ingresso) => ingresso.eventId))).map((eventId) => {
    const ingresso = ingressos.find((i) => i.eventId === eventId)
    return {
      id: eventId,
      name: ingresso?.eventName || "",
      date: ingresso?.date || "",
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Ingressos</h1>
        <p className="text-gray-400">Visualize e baixe seus ingressos para eventos</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedEvent === null ? "default" : "outline"}
          onClick={() => setSelectedEvent(null)}
          className={selectedEvent === null ? "bg-green-600 hover:bg-green-700" : "border-gray-700 hover:bg-gray-800"}
        >
          Todos
        </Button>
        {uniqueEvents.map((event) => (
          <Button
            key={event.id}
            variant={selectedEvent === event.id ? "default" : "outline"}
            onClick={() => setSelectedEvent(event.id)}
            className={
              selectedEvent === event.id ? "bg-green-600 hover:bg-green-700" : "border-gray-700 hover:bg-gray-800"
            }
          >
            {event.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredIngressos.map((ingresso) => (
          <Card key={ingresso.id} className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{ingresso.eventName}</CardTitle>
              <CardDescription>{ingresso.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-white p-4">
                <div className="mb-2 flex h-32 w-32 items-center justify-center bg-gray-200">
                  <QrCode className="h-24 w-24 text-gray-800" />
                </div>
                <p className="text-center text-sm font-medium text-gray-800">{ingresso.participantName}</p>
              </div>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Célula:</span>
                  <span>{ingresso.celula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discipulador:</span>
                  <span>{ingresso.discipulador}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Região:</span>
                  <span>{ingresso.regiao}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" /> Baixar
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIngressos.length === 0 && (
        <div className="rounded-lg border border-gray-800 bg-gray-800/30 p-8 text-center">
          <QrCode className="mx-auto mb-4 h-12 w-12 text-gray-500" />
          <h3 className="mb-2 text-xl font-medium">Nenhum ingresso encontrado</h3>
          <p className="mb-4 text-gray-400">Você não possui ingressos para os filtros selecionados.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/eventos">Ver Eventos Disponíveis</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
