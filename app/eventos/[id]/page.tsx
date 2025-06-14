"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function EventoDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  // Dados simulados do evento
  const event = {
    id,
    title: "Conferência Anual de Adoração",
    date: "15 de Junho, 2024",
    time: "19:00 - 22:00",
    location: "Igreja Videira - Sede",
    address: "Av. Principal, 1000 - Centro",
    image: "/placeholder.svg?height=600&width=1200",
    description:
      "Uma noite de adoração e comunhão com os melhores ministérios de louvor da região. Venha participar deste momento especial de conexão com Deus através da música e adoração. Teremos a presença de ministros de louvor renomados e um tempo dedicado à palavra e oração.",
    details: [
      "Abertura dos portões: 18:00",
      "Início da conferência: 19:00",
      "Coffee break: 20:30",
      "Encerramento: 22:00",
    ],
    speakers: ["Pr. João Silva", "Min. Maria Oliveira", "Banda Adoração Videira"],
    availableTickets: 150,
    ticketVariations: [
      {
        id: "1",
        name: "Ingresso Padrão",
        description: "Acesso a todas as áreas comuns do evento",
        price: 75.0,
        availableQuantity: 100,
        isActive: true,
      },
      {
        id: "2",
        name: "Ingresso VIP",
        description: "Acesso a todas as áreas + área VIP com coffee break exclusivo",
        price: 150.0,
        availableQuantity: 30,
        isActive: true,
      },
      {
        id: "3",
        name: "Ingresso Família",
        description: "Pacote para 4 pessoas com desconto especial",
        price: 250.0,
        availableQuantity: 20,
        isActive: true,
      },
    ],
  }

  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState(event.ticketVariations[0].id)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleCheckout = () => {
    router.push(`/checkout/${id}?quantity=${quantity}&variation=${selectedVariation}`)
  }

  // Encontrar a variação selecionada
  const currentVariation = event.ticketVariations.find((v) => v.id === selectedVariation) || event.ticketVariations[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4 -ml-3 text-gray-400 hover:text-white">
          <Link href="/eventos" className="flex items-center">
            <ChevronLeft className="mr-1 h-5 w-5" />
            Voltar para eventos
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Coluna da Esquerda - Imagem e Detalhes */}
        <div className="lg:col-span-2">
          <div className="mb-6 overflow-hidden rounded-xl">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-auto w-full object-cover" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">{event.title}</h1>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-center rounded-lg bg-gray-900 p-4">
              <Calendar className="mr-3 h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Data</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-gray-900 p-4">
              <Clock className="mr-3 h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Horário</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-gray-900 p-4">
              <MapPin className="mr-3 h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Local</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-gray-900 p-4">
              <Users className="mr-3 h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Ingressos Disponíveis</p>
                <p className="font-medium">{event.availableTickets}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-6">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">Sobre o Evento</h2>
              <p className="text-gray-300">{event.description}</p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">Programação</h2>
              <ul className="space-y-2 text-gray-300">
                {event.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-400">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">Palestrantes</h2>
              <ul className="space-y-2 text-gray-300">
                {event.speakers.map((speaker, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-400">•</span>
                    {speaker}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">Localização</h2>
              <p className="mb-4 text-gray-300">{event.address}</p>
              <div className="h-64 rounded-lg bg-gray-800">
                {/* Aqui seria integrado um mapa */}
                <div className="flex h-full items-center justify-center text-gray-500">Mapa do Local</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da Direita - Compra de Ingressos */}
        <div className="lg:sticky lg:top-6">
          <div className="rounded-xl bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Ingressos</h2>

            {/* Seleção de Variação de Ingresso */}
            <div className="mb-6">
              <Label className="mb-2 block">Selecione o tipo de ingresso</Label>
              <RadioGroup value={selectedVariation} onValueChange={setSelectedVariation} className="space-y-3">
                {event.ticketVariations.map((variation) => (
                  <Card
                    key={variation.id}
                    className={`cursor-pointer border-gray-800 transition-colors ${selectedVariation === variation.id ? "border-green-500 bg-gray-800/50" : "bg-gray-900 hover:border-gray-700"}`}
                  >
                    <CardContent className="p-4" onClick={() => setSelectedVariation(variation.id)}>
                      <RadioGroupItem value={variation.id} id={`variation-${variation.id}`} className="sr-only" />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={`variation-${variation.id}`} className="text-base font-medium">
                            {variation.name}
                          </Label>
                          <p className="text-sm text-gray-400">{variation.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">R$ {variation.price.toFixed(2)}</p>
                          <p className="text-xs text-gray-400">{variation.availableQuantity} disponíveis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <span className="text-gray-300">Quantidade</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    quantity <= 1 ? "bg-gray-800 text-gray-600" : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-6 border-t border-gray-800 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span>R$ {(currentVariation.price * quantity).toFixed(2)}</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-300">Taxa de serviço</span>
                <span>R$ 0.00</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="text-xl text-green-400">R$ {(currentVariation.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full bg-green-600 py-6 text-lg hover:bg-green-700">
              Comprar Ingressos
            </Button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Ao comprar, você concorda com os{" "}
              <Link href="/termos" className="text-green-400 hover:underline">
                Termos de Serviço
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
