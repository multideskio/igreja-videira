"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ParticipantFormProps {
  index: number
  data: {
    celula: string
    discipulador: string
    regiao: string
  }
  onChange: (index: number, field: string, value: string) => void
  isLast: boolean
}

export default function ParticipantForm({ index, data, onChange, isLast }: ParticipantFormProps) {
  return (
    <div className={`py-4 ${!isLast ? "border-b border-gray-700" : ""}`}>
      <h4 className="font-medium mb-4">Participante {index + 1}</h4>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor={`celula-${index}`}>Célula</Label>
          <Input
            id={`celula-${index}`}
            value={data.celula}
            onChange={(e) => onChange(index, "celula", e.target.value)}
            placeholder="Digite o nome da sua célula"
            className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`discipulador-${index}`}>Discipulador</Label>
          <Input
            id={`discipulador-${index}`}
            value={data.discipulador}
            onChange={(e) => onChange(index, "discipulador", e.target.value)}
            placeholder="Nome do seu discipulador"
            className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`regiao-${index}`}>Região</Label>
          <Input
            id={`regiao-${index}`}
            value={data.regiao}
            onChange={(e) => onChange(index, "regiao", e.target.value)}
            placeholder="Sua região"
            className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  )
}
