import { EventCard } from "@/components/shared/event-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, CalendarDays, Users, MapPin } from "lucide-react"
import Link from "next/link"

export default function Home() {
  // Dados simulados de eventos em destaque
  const featuredEvents = [
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
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-br from-green-900 to-green-700 px-6 py-16 text-white md:px-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-600/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-green-600/30 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Eventos que transformam vidas na Igreja Videira
          </h1>
          <p className="mb-8 text-lg text-green-100">
            Participe dos nossos eventos e cresça espiritualmente junto com nossa comunidade. Encontre conferências,
            retiros e muito mais.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-green-800 hover:bg-green-100">
              <Link href="/eventos">Ver Todos os Eventos</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/sobre">Conheça Nossa Igreja</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Próximos Eventos</h2>
          <Button asChild variant="ghost" className="text-green-400 hover:text-green-300">
            <Link href="/eventos" className="flex items-center">
              Ver todos <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Sobre a Igreja */}
      <section className="mb-16 rounded-2xl bg-gray-900 p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Igreja Videira</h2>
            <p className="mb-6 text-gray-300">
              Somos uma comunidade cristã comprometida com o crescimento espiritual e o discipulado. Nossa missão é
              levar a palavra de Deus a todos e formar discípulos de Cristo.
            </p>
            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <CalendarDays className="mr-3 h-5 w-5 text-green-400" />
                <span>Cultos aos domingos às 10h e 18h</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5 text-green-400" />
                <span>Células durante a semana em diversos bairros</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-green-400" />
                <span>Sede: Av. Principal, 1000 - Centro</span>
              </div>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/sobre">Saiba Mais</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-800">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Igreja Videira"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-2xl bg-gradient-to-r from-green-800 to-green-600 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Faça Parte da Nossa Comunidade</h2>
        <p className="mx-auto mb-6 max-w-2xl text-green-100">
          Venha conhecer nossa igreja e participar dos nossos eventos. Estamos ansiosos para recebê-lo em nossa
          comunidade.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-green-800 hover:bg-green-100">
            <Link href="/eventos">Participar de Eventos</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
