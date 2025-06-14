"use client"

import { Check, Download, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmationScreenProps {
  ticketQuantity: number
  qrCodeOption: "single" | "multiple"
  participantData: Array<{
    celula: string
    discipulador: string
    regiao: string
  }>
}

export default function ConfirmationScreen({ ticketQuantity, qrCodeOption, participantData }: ConfirmationScreenProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h2>
        <p className="text-gray-400 text-center">Seus ingressos foram gerados com sucesso.</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Seus QR Codes</h3>

        {qrCodeOption === "single" ? (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg">
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
              <QrCode className="h-32 w-32 text-gray-800" />
            </div>
            <p className="text-gray-800 text-sm font-medium">
              QR Code para {ticketQuantity} {ticketQuantity === 1 ? "ingresso" : "ingressos"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {participantData.map((data, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mb-2">
                  <QrCode className="h-24 w-24 text-gray-800" />
                </div>
                <p className="text-gray-800 text-sm font-medium">
                  Participante {index + 1}: {data.celula}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
          <Download className="mr-2 h-5 w-5" />
          Baixar Ingressos
        </Button>

        <Button
          variant="outline"
          className="w-full py-4 border-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        >
          Voltar para a Página Inicial
        </Button>
      </div>
    </div>
  )
}
