"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Trash } from "lucide-react"

interface TicketVariationProps {
  variation: {
    id: string
    name: string
    description: string
    price: string
    quantity: string
    isActive: boolean
    startDate: string
    endDate: string
  }
  onUpdate: (field: string, value: any) => void
  onRemove: () => void
  canRemove: boolean
  isEventFree: boolean
}

export function TicketVariationEditor({ variation, onUpdate, onRemove, canRemove, isEventFree }: TicketVariationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium">{variation.name || "Nova Variação"}</h4>
          <p className="text-sm text-gray-400">
            {isEventFree
              ? "Gratuito"
              : `R$ ${Number.parseFloat(variation.price || "0").toFixed(2)} · ${variation.quantity} disponíveis`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? "Recolher" : "Expandir"}
          </Button>
          {canRemove && (
            <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8 text-gray-400 hover:text-red-400">
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`name-${variation.id}`}>Nome da Variação</Label>
            <Input
              id={`name-${variation.id}`}
              value={variation.name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder="Ex: Ingresso VIP, Primeiro Lote, etc."
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`description-${variation.id}`}>Descrição</Label>
            <Input
              id={`description-${variation.id}`}
              value={variation.description}
              onChange={(e) => onUpdate("description", e.target.value)}
              placeholder="Descreva os benefícios ou características desta variação"
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {!isEventFree && (
              <div className="grid gap-2">
                <Label htmlFor={`price-${variation.id}`}>Preço (R$)</Label>
                <Input
                  id={`price-${variation.id}`}
                  type="number"
                  value={variation.price}
                  onChange={(e) => onUpdate("price", e.target.value)}
                  placeholder="0.00"
                  className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor={`quantity-${variation.id}`}>Quantidade Disponível</Label>
              <Input
                id={`quantity-${variation.id}`}
                type="number"
                value={variation.quantity}
                onChange={(e) => onUpdate("quantity", e.target.value)}
                placeholder="100"
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`startDate-${variation.id}`}>Data de Início das Vendas</Label>
              <Input
                id={`startDate-${variation.id}`}
                type="date"
                value={variation.startDate}
                onChange={(e) => onUpdate("startDate", e.target.value)}
                className="border-gray-700 bg-gray-800 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`endDate-${variation.id}`}>Data de Término das Vendas</Label>
              <Input
                id={`endDate-${variation.id}`}
                type="date"
                value={variation.endDate}
                onChange={(e) => onUpdate("endDate", e.target.value)}
                className="border-gray-700 bg-gray-800 text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={`isActive-${variation.id}`}
              checked={variation.isActive}
              onCheckedChange={(checked) => onUpdate("isActive", checked)}
            />
            <Label htmlFor={`isActive-${variation.id}`}>Variação Ativa</Label>
          </div>
        </div>
      )}
    </div>
  )
}
