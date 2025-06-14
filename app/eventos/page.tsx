import { EventCard } from "@/components/shared/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, MapPin } from "lucide-react"

export default function EventosPage() {
  // Dados simulados de eventos
  const events = [
    {
      id: "1",
      title: "Conferência Anual de Adoração",
      date: "15 de Junho, 2024",
      location: "Igreja Videira - Sede",
      image: "/placeholder.svg?height=400&width=600",
      price: 75.0,
      description: "Uma noite de adoração e comunhão com os melhores ministérios de louvor da região.",
    },
    {
      id: "2",
      title: "Retiro de Jovens",
      date: "22-24 de Julho, 2024",
      location: "Acampamento Videira",
      image: "/placeholder.svg?height=400&width=600",
      price: 150.0,
      description: "Um final de semana de renovação espiritual para jovens de todas as células.",
    },
    {
      id: "3",
      title: "Seminário de Liderança",
      date: "10 de Agosto, 2024",
      location: "Igreja Videira - Unidade Centro",
      image: "/placeholder.svg?height=400&width=600",
      price: 50.0,
      description: "Capacitação para líderes de células e ministérios com palestrantes renomados.",
    },
    {
      id: "4",
      title: "Culto Especial de Aniversário",
      date: "5 de Setembro, 2024",
      location: "Igreja Videira - Sede",
      image: "/placeholder.svg?height=400&width=600",
      price: 0.0,
      description: "Celebração especial de aniversário da Igreja Videira com convidados especiais.",
    },
    {
      id: "5",
      title: "Workshop de Música e Adoração",
      date: "18 de Setembro, 2024",
      location: "Igreja Videira - Unidade Zona Sul",
      image: "/placeholder.svg?height=400&width=600",
      price: 35.0,
      description: "Aprenda técnicas de adoração e música com os líderes do ministério de louvor.",
    },
    {
      id: "6",
      title: "Encontro de Casais",
      date: "1-2 de Outubro, 2024",
      location: "Hotel Recanto",
      image: "/placeholder.svg?height=400&width=600",
      price: 200.0,
      description: "Um final de semana especial para casais fortalecerem seu relacionamento com base bíblica.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Eventos</h1>
        <p className="text-gray-400">Encontre e participe dos próximos eventos da Igreja Videira</p>
      </div>

      {/* Filtros */}
      <div className="mb-8 rounded-xl bg-gray-900 p-6">
        <div className="mb-4 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar eventos..."
              className="border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select>
              <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="this-month">Este mês</SelectItem>
                <SelectItem value="next-month">Próximo mês</SelectItem>
                <SelectItem value="next-3-months">Próximos 3 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Select>
              <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                <SelectValue placeholder="Local" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sede">Sede</SelectItem>
                <SelectItem value="centro">Unidade Centro</SelectItem>
                <SelectItem value="zona-sul">Unidade Zona Sul</SelectItem>
                <SelectItem value="outros">Outros locais</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700">Aplicar Filtros</Button>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Paginação */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
            Anterior
          </Button>
          <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
            1
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
            2
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
            3
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
