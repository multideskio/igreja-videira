"use client"

import { useState } from "react"
import { Cross, ChevronLeft } from "lucide-react"
import TicketQuantitySelector from "./ticket-quantity-selector"
import ParticipantForm from "./participant-form"
import QrCodeOptions from "./qr-code-options"
import PaymentSection from "./payment-section"
import ConfirmationScreen from "./confirmation-screen"

export default function CheckoutPage() {
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [qrCodeOption, setQrCodeOption] = useState<"single" | "multiple">("single")
  const [step, setStep] = useState<"checkout" | "payment" | "confirmation">("checkout")
  const [participantData, setParticipantData] = useState<
    Array<{ celula: string; discipulador: string; regiao: string }>
  >([{ celula: "", discipulador: "", regiao: "" }])

  const handleQuantityChange = (quantity: number) => {
    setTicketQuantity(quantity)

    // Update participant data array based on new quantity
    if (quantity > participantData.length) {
      // Add new empty participant data
      setParticipantData([
        ...participantData,
        ...Array(quantity - participantData.length).fill({ celula: "", discipulador: "", regiao: "" }),
      ])
    } else if (quantity < participantData.length) {
      // Remove excess participant data
      setParticipantData(participantData.slice(0, quantity))
    }
  }

  const handleParticipantDataChange = (index: number, field: string, value: string) => {
    const newData = [...participantData]
    newData[index] = { ...newData[index], [field]: value }
    setParticipantData(newData)
  }

  const handleProceedToPayment = () => {
    // Validate all participant forms
    const isValid = participantData.every((data) => data.celula && data.discipulador && data.regiao)

    if (isValid) {
      setStep("payment")
    } else {
      alert("Por favor, preencha todos os campos obrigatórios para cada participante.")
    }
  }

  const handleConfirmPayment = () => {
    setStep("confirmation")
  }

  const handleBackToCheckout = () => {
    setStep("checkout")
  }

  const eventDetails = {
    name: "Conferência Anual de Adoração",
    date: "15 de Junho, 2024",
    location: "Igreja Videira - Sede",
    price: 75.0,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {step !== "checkout" && (
            <button
              onClick={handleBackToCheckout}
              className="mr-2 p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-green-400">Igreja Videira</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Cross className="h-5 w-5" />
        </button>
      </div>

      {/* Event Info */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">{eventDetails.name}</h2>
        <div className="flex flex-col md:flex-row md:justify-between text-gray-300">
          <p>{eventDetails.date}</p>
          <p>{eventDetails.location}</p>
        </div>
      </div>

      {step === "checkout" && (
        <>
          {/* Ticket Quantity */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Quantidade de Ingressos</h3>
            <TicketQuantitySelector
              quantity={ticketQuantity}
              onChange={handleQuantityChange}
              price={eventDetails.price}
            />
          </div>

          {/* Participant Forms */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Informações dos Participantes</h3>
            {Array.from({ length: ticketQuantity }).map((_, index) => (
              <ParticipantForm
                key={index}
                index={index}
                data={participantData[index]}
                onChange={handleParticipantDataChange}
                isLast={index === ticketQuantity - 1}
              />
            ))}
          </div>

          {/* QR Code Options */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Opções de QR Code</h3>
            <QrCodeOptions selected={qrCodeOption} onChange={setQrCodeOption} />
          </div>

          {/* Proceed to Payment */}
          <div className="mt-8">
            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              Prosseguir para Pagamento
            </button>
          </div>
        </>
      )}

      {step === "payment" && (
        <PaymentSection totalAmount={eventDetails.price * ticketQuantity} onConfirmPayment={handleConfirmPayment} />
      )}

      {step === "confirmation" && (
        <ConfirmationScreen
          ticketQuantity={ticketQuantity}
          qrCodeOption={qrCodeOption}
          participantData={participantData}
        />
      )}
    </div>
  )
}
