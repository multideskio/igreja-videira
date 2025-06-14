import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    location: string
    image: string
    price: number
    description: string
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-gray-700 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
        <div className="mb-4 space-y-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-green-400" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-green-400" />
            {event.location}
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-gray-300">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-400">
            {event.price === 0 ? "Gratuito" : `R$ ${event.price.toFixed(2)}`}
          </span>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href={`/eventos/${event.id}`}>Saiba Mais</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
