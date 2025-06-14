"use client"

import { useState } from "react"
import { CreditCard, QrCode } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PaymentSectionProps {
  totalAmount: number
  onConfirmPayment: () => void
}

export default function PaymentSection({ totalAmount, onConfirmPayment }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onConfirmPayment()
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Método de Pagamento</h3>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "pix" | "card")}
          className="space-y-3"
        >
          <div
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
              paymentMethod === "pix" ? "border-green-500 bg-gray-700/50" : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => setPaymentMethod("pix")}
          >
            <RadioGroupItem value="pix" id="pix" className="text-green-500" />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <Label htmlFor="pix" className="text-base cursor-pointer">
                  Pix
                </Label>
                <p className="text-sm text-gray-400">Pagamento instantâneo</p>
              </div>
              <QrCode className="h-6 w-6 text-green-400" />
            </div>
          </div>

          <div
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
              paymentMethod === "card" ? "border-green-500 bg-gray-700/50" : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <RadioGroupItem value="card" id="card" className="text-green-500" />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <Label htmlFor="card" className="text-base cursor-pointer">
                  Cartão de Crédito
                </Label>
                <p className="text-sm text-gray-400">Visa, Mastercard, Elo, etc.</p>
              </div>
              <CreditCard className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "pix" && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Pagamento via Pix</h3>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
              <QrCode className="h-32 w-32 text-gray-800" />
            </div>
            <p className="text-gray-800 text-sm font-medium">Escaneie o QR Code com seu app de banco</p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 mb-2">Ou copie o código Pix abaixo:</p>
            <div className="flex">
              <Input
                value="00020126580014br.gov.bcb.pix0136example-pix-key@example.com5204000053039865802BR5913Igreja Videira6008Sao Paulo62070503***6304E2CA"
                readOnly
                className="bg-gray-700 border-gray-600 text-sm"
              />
              <Button variant="outline" className="ml-2 bg-gray-700 border-gray-600 hover:bg-gray-600">
                Copiar
              </Button>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Dados do Cartão</h3>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Número do Cartão</Label>
              <Input
                id="card-number"
                placeholder="0000 0000 0000 0000"
                className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Validade</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Nome no Cartão</Label>
              <Input
                id="name"
                placeholder="Nome como aparece no cartão"
                className="bg-gray-700 border-gray-600 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Subtotal</span>
          <span>R$ {totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Taxa de processamento</span>
          <span>R$ 0.00</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-700 mt-2">
          <span className="font-medium">Total</span>
          <span className="font-bold text-green-400">R$ {totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
      >
        {isProcessing ? "Processando..." : "Confirmar Pagamento"}
      </Button>
    </div>
  )
}
