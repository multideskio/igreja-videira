"use client"

import { Minus, Plus } from "lucide-react"

interface TicketQuantitySelectorProps {
  quantity: number
  onChange: (quantity: number) => void
  price: number
}

export default function TicketQuantitySelector({ quantity, onChange, price }: TicketQuantitySelectorProps) {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onChange(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    onChange(quantity + 1)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Preço por ingresso</span>
        <span className="font-medium">R$ {price.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-300">Quantidade</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              quantity <= 1 ? "bg-gray-700 text-gray-500" : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-8 text-center font-medium">{quantity}</span>

          <button
            onClick={increaseQuantity}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="font-medium">Total</span>
        <span className="font-bold text-green-400">R$ {(price * quantity).toFixed(2)}</span>
      </div>
    </div>
  )
}
