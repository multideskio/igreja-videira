"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, CreditCard, QrCode, Tag, Ticket } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/shared/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, login } = useAuth()
  const initialQuantity = Number.parseInt(searchParams.get("quantity") || "1", 10)
  const variationId = searchParams.get("variation") || "1"
  const { id } = params

  // Estados principais
  const [step, setStep] = useState<"auth" | "checkout" | "payment" | "confirmation">("auth")
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Estados para cupom de desconto
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    type: "percentage" | "fixed"
    value: number
  } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Dados do evento (simulado)
  const event = {
    id,
    title: "Conferência Anual de Adoração",
    date: "15 de Junho, 2024",
    location: "Igreja Videira - Sede",
    customFields: [
      { id: "1", name: "Célula", type: "text", required: true },
      { id: "2", name: "Discipulador", type: "text", required: true },
      { id: "3", name: "Região", type: "text", required: true },
    ],
    allowMultipleQrCode: true,
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

  // Encontrar a variação selecionada
  const selectedVariation = event.ticketVariations.find((v) => v.id === variationId) || event.ticketVariations[0]

  // Estados do formulário
  const [quantity, setQuantity] = useState(initialQuantity)
  const [qrCodeOption, setQrCodeOption] = useState<"single" | "multiple">("single")
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [isProcessing, setIsProcessing] = useState(false)

  // Dados de autenticação
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    nome: "",
    telefone: "",
    endereco: "",
  })

  // Dados dos participantes
  const [participantData, setParticipantData] = useState<
    Array<{ nome: string; email: string; telefone: string; [key: string]: string }>
  >(
    Array(initialQuantity).fill({
      nome: "",
      email: "",
      telefone: "",
      celula: "",
      discipulador: "",
      regiao: "",
    }),
  )

  // Verificar se usuário já está logado
  useEffect(() => {
    if (user) {
      setStep("checkout")
    }
  }, [user])

  // Calcular o subtotal
  const subtotal = selectedVariation.price * quantity

  // Calcular o desconto
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0

    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.value) / 100
    } else {
      return appliedCoupon.value
    }
  }

  const discount = calculateDiscount()

  // Calcular o total
  const total = Math.max(subtotal - discount, 0)

  // Handlers de autenticação
  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAuthData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (authMode === "login") {
        const success = await login(authData.email, authData.password)
        if (success) {
          setStep("checkout")
        } else {
          setError("Email ou senha inválidos")
        }
      } else {
        // Simulação de registro
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simular criação de conta e login automático
        const success = await login(authData.email, "senha123") // Senha padrão para demo
        if (success) {
          setStep("checkout")
        }
      }
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handlers dos participantes
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
    if (newQuantity > participantData.length) {
      const newParticipants = Array(newQuantity - participantData.length).fill({
        nome: "",
        email: "",
        telefone: "",
        celula: "",
        discipulador: "",
        regiao: "",
      })
      setParticipantData([...participantData, ...newParticipants])
    } else if (newQuantity < participantData.length) {
      setParticipantData(participantData.slice(0, newQuantity))
    }
  }

  const handleParticipantDataChange = (index: number, field: string, value: string) => {
    const newData = [...participantData]
    newData[index] = { ...newData[index], [field]: value }
    setParticipantData(newData)
  }

  const handleProceedToPayment = () => {
    // Validar todos os formulários de participantes
    const isValid = participantData.every(
      (data) =>
        data.nome &&
        data.email &&
        data.telefone &&
        event.customFields.every((field) => !field.required || data[field.name.toLowerCase()]),
    )

    if (isValid) {
      setStep("payment")
    } else {
      setError("Por favor, preencha todos os campos obrigatórios para cada participante.")
    }
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)

    try {
      // Simular processamento de pagamento e criação da compra
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui seria criada a compra no banco de dados com:
      // - Dados do usuário
      // - Dados dos participantes
      // - Informações do evento
      // - QR codes gerados
      // - Cupom aplicado (se houver)

      setStep("confirmation")
    } finally {
      setIsProcessing(false)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    handleQuantityChange(quantity + 1)
  }

  // Função para aplicar cupom
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Digite um código de cupom")
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")
    setCouponSuccess("")

    try {
      // Simulação de validação de cupom
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cupons válidos para simulação
      const validCoupons = [
        { code: "WELCOME20", type: "percentage" as const, value: 20 },
        { code: "VIDEIRA50", type: "fixed" as const, value: 50 },
        { code: "VIP10", type: "percentage" as const, value: 10 },
      ]

      const coupon = validCoupons.find((c) => c.code.toLowerCase() === couponCode.trim().toLowerCase())

      if (coupon) {
        setAppliedCoupon(coupon)
        setCouponSuccess(`Cupom ${coupon.code} aplicado com sucesso!`)
      } else {
        setCouponError("Cupom inválido ou expirado")
        setAppliedCoupon(null)
      }
    } catch (error) {
      setCouponError("Erro ao aplicar o cupom. Tente novamente.")
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponSuccess("")
    setCouponError("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          {step !== "auth" && (
            <Button variant="ghost" onClick={() => setStep("auth")} className="-ml-3 text-gray-400 hover:text-white">
              <ChevronLeft className="mr-1 h-5 w-5" />
              Voltar
            </Button>
          )}
          {step === "auth" && (
            <Button asChild variant="ghost" className="-ml-3 text-gray-400 hover:text-white">
              <Link href={`/eventos/${id}`} className="flex items-center">
                <ChevronLeft className="mr-1 h-5 w-5" />
                Voltar para o evento
              </Link>
            </Button>
          )}
        </div>
        <h1 className="text-2xl font-bold text-green-400 md:text-3xl">Igreja Videira</h1>
      </div>

      {/* Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step === "auth" || step === "checkout" || step === "payment" || step === "confirmation"
                  ? "bg-green-600"
                  : "bg-gray-700"
              } text-white`}
            >
              1
            </div>
            <div className={`h-1 flex-1 ${step !== "auth" ? "bg-green-600" : "bg-gray-700"}`}></div>
          </div>
          <div className="flex flex-1 items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step === "payment" || step === "confirmation" ? "bg-green-600" : "bg-gray-700"
              } text-white`}
            >
              2
            </div>
            <div className={`h-1 flex-1 ${step === "confirmation" ? "bg-green-600" : "bg-gray-700"}`}></div>
          </div>
          <div className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step === "confirmation" ? "bg-green-600" : "bg-gray-700"
              } text-white`}
            >
              3
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className={step === "auth" || step === "checkout" ? "text-green-400" : "text-gray-400"}>
            {step === "auth" ? "Login/Cadastro" : "Informações"}
          </span>
          <span className={step === "payment" ? "text-green-400" : "text-gray-400"}>Pagamento</span>
          <span className={step === "confirmation" ? "text-green-400" : "text-gray-400"}>Confirmação</span>
        </div>
      </div>

      {/* Informações do Evento */}
      <div className="mb-6 rounded-lg bg-gray-900 p-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <div className="flex flex-col justify-between text-gray-400 md:flex-row">
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
        <div className="mt-2 flex items-center">
          <Tag className="mr-2 h-4 w-4 text-green-400" />
          <span className="font-medium text-green-400">{selectedVariation.name}</span>
          <span className="ml-auto font-bold">R$ {selectedVariation.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Etapa de Autenticação */}
      {step === "auth" && (
        <div className="mx-auto max-w-md">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-center">
                {authMode === "login" ? "Entre na sua conta" : "Crie sua conta"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {error && <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-400">{error}</div>}

                {authMode === "register" && (
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={authData.nome}
                      onChange={handleAuthChange}
                      placeholder="Seu nome completo"
                      required
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={authData.email}
                    onChange={handleAuthChange}
                    placeholder="seu@email.com"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                {authMode === "register" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={authData.telefone}
                        onChange={handleAuthChange}
                        placeholder="(00) 00000-0000"
                        required
                        className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Textarea
                        id="endereco"
                        name="endereco"
                        value={authData.endereco}
                        onChange={handleAuthChange}
                        placeholder="Seu endereço completo"
                        required
                        className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={authData.password}
                    onChange={handleAuthChange}
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-green-600 py-5 hover:bg-green-700">
                  {isLoading ? "Processando..." : authMode === "login" ? "Entrar" : "Criar Conta"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                  className="text-sm text-green-400 hover:underline"
                >
                  {authMode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resto do checkout (informações, pagamento, confirmação) */}
      {step === "checkout" && (
        <>
          {/* Quantidade de Ingressos */}
          <div className="mb-6 rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Quantidade de Ingressos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tipo de ingresso</span>
                <span className="font-medium">{selectedVariation.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Preço por ingresso</span>
                <span className="font-medium">R$ {selectedVariation.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Quantidade</span>
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

              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-green-400">
                  R$ {(selectedVariation.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações dos Participantes */}
          <div className="mb-6 rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Informações dos Participantes</h3>
            {Array.from({ length: quantity }).map((_, index) => (
              <div key={index} className={`py-4 ${index !== quantity - 1 ? "border-b border-gray-800" : ""}`}>
                <h4 className="mb-4 font-medium">Participante {index + 1}</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Campos fixos */}
                  <div className="grid gap-2">
                    <Label htmlFor={`nome-${index}`}>Nome Completo *</Label>
                    <Input
                      id={`nome-${index}`}
                      value={participantData[index]?.nome || ""}
                      onChange={(e) => handleParticipantDataChange(index, "nome", e.target.value)}
                      placeholder="Nome completo do participante"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`email-${index}`}>Email *</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={participantData[index]?.email || ""}
                      onChange={(e) => handleParticipantDataChange(index, "email", e.target.value)}
                      placeholder="email@exemplo.com"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`telefone-${index}`}>Telefone *</Label>
                    <Input
                      id={`telefone-${index}`}
                      type="tel"
                      value={participantData[index]?.telefone || ""}
                      onChange={(e) => handleParticipantDataChange(index, "telefone", e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  {/* Campos personalizados do evento */}
                  {event.customFields.map((field) => (
                    <div key={field.id} className="grid gap-2">
                      <Label htmlFor={`${field.name.toLowerCase()}-${index}`}>
                        {field.name} {field.required && "*"}
                      </Label>
                      <Input
                        id={`${field.name.toLowerCase()}-${index}`}
                        value={participantData[index]?.[field.name.toLowerCase()] || ""}
                        onChange={(e) => handleParticipantDataChange(index, field.name.toLowerCase(), e.target.value)}
                        placeholder={`Digite ${field.name.toLowerCase()}`}
                        className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Opções de QR Code */}
          {event.allowMultipleQrCode && (
            <div className="mb-6 rounded-lg bg-gray-900 p-6">
              <h3 className="mb-4 text-lg font-medium">Opções de QR Code</h3>
              <RadioGroup
                value={qrCodeOption}
                onValueChange={(value) => setQrCodeOption(value as "single" | "multiple")}
                className="space-y-3"
              >
                <div
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    qrCodeOption === "single"
                      ? "border-green-500 bg-gray-800/50"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                  onClick={() => setQrCodeOption("single")}
                >
                  <RadioGroupItem value="single" id="single" className="text-green-500" />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <Label htmlFor="single" className="cursor-pointer text-base">
                        Gerar um único QR Code para todos os ingressos
                      </Label>
                      <p className="text-sm text-gray-400">Todos os ingressos serão acessados com o mesmo QR Code</p>
                    </div>
                    <QrCode className="h-10 w-10 text-green-400 opacity-70" />
                  </div>
                </div>

                <div
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    qrCodeOption === "multiple"
                      ? "border-green-500 bg-gray-800/50"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                  onClick={() => setQrCodeOption("multiple")}
                >
                  <RadioGroupItem value="multiple" id="multiple" className="text-green-500" />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <Label htmlFor="multiple" className="cursor-pointer text-base">
                        Gerar um QR Code por ingresso
                      </Label>
                      <p className="text-sm text-gray-400">Cada participante terá seu próprio QR Code individual</p>
                    </div>
                    <div className="relative">
                      <QrCode className="h-10 w-10 text-green-400 opacity-70" />
                      <QrCode className="absolute -bottom-2 -right-2 h-8 w-8 text-green-400 opacity-70" />
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Prosseguir para Pagamento */}
          <div className="mt-8">
            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-green-600 py-6 text-lg font-medium hover:bg-green-700"
            >
              Prosseguir para Pagamento
            </Button>
          </div>
        </>
      )}

      {/* Etapa de pagamento */}
      {step === "payment" && (
        <div className="space-y-6">
          {/* Cupom de Desconto */}
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Cupom de Desconto</h3>

            {appliedCoupon ? (
              <div className="space-y-4">
                <Alert className="bg-green-900/30 border-green-800">
                  <Ticket className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">
                    Cupom <span className="font-bold">{appliedCoupon.code}</span> aplicado com sucesso!
                    {appliedCoupon.type === "percentage"
                      ? ` (${appliedCoupon.value}% de desconto)`
                      : ` (R$ ${appliedCoupon.value.toFixed(2)} de desconto)`}
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                  onClick={handleRemoveCoupon}
                >
                  Remover Cupom
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Digite seu código de cupom"
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                  >
                    {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                  </Button>
                </div>

                {couponError && (
                  <Alert className="bg-red-900/30 border-red-800">
                    <AlertDescription className="text-red-400">{couponError}</AlertDescription>
                  </Alert>
                )}

                {couponSuccess && (
                  <Alert className="bg-green-900/30 border-green-800">
                    <AlertDescription className="text-green-400">{couponSuccess}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          {/* Método de Pagamento */}
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Método de Pagamento</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "pix" | "card")}
              className="space-y-3"
            >
              <div
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                  paymentMethod === "pix" ? "border-green-500 bg-gray-800/50" : "border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => setPaymentMethod("pix")}
              >
                <RadioGroupItem value="pix" id="pix" className="text-green-500" />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <Label htmlFor="pix" className="cursor-pointer text-base">
                      Pix
                    </Label>
                    <p className="text-sm text-gray-400">Pagamento instantâneo</p>
                  </div>
                  <QrCode className="h-6 w-6 text-green-400" />
                </div>
              </div>

              <div
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                  paymentMethod === "card" ? "border-green-500 bg-gray-800/50" : "border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <RadioGroupItem value="card" id="card" className="text-green-500" />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <Label htmlFor="card" className="cursor-pointer text-base">
                      Cartão de Crédito
                    </Label>
                    <p className="text-sm text-gray-400">Visa, Mastercard, Elo, etc.</p>
                  </div>
                  <CreditCard className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Resumo do Pedido */}
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  {selectedVariation.name} ({quantity} {quantity === 1 ? "ingresso" : "ingressos"})
                </span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>- R$ {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de processamento</span>
                <span>R$ 0.00</span>
              </div>

              <div className="flex justify-between border-t border-gray-800 pt-2">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold text-green-400">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Confirmar Pagamento */}
          <Button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full bg-green-600 py-6 text-lg font-medium hover:bg-green-700"
          >
            {isProcessing ? "Processando..." : "Confirmar Pagamento"}
          </Button>
        </div>
      )}

      {step === "confirmation" && (
        <div className="space-y-6">
          {/* Confirmação */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Pagamento Confirmado!</h2>
            <p className="text-center text-gray-400">Seus ingressos foram gerados com sucesso.</p>

            {appliedCoupon && (
              <div className="mt-2 text-center text-green-400">
                <p>Cupom {appliedCoupon.code} aplicado com sucesso.</p>
                <p>Você economizou R$ {discount.toFixed(2)}!</p>
              </div>
            )}
          </div>

          {/* QR Codes */}
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium">Seus QR Codes</h3>

            {qrCodeOption === "single" ? (
              <div className="flex flex-col items-center rounded-lg bg-white p-4">
                <div className="mb-4 flex h-48 w-48 items-center justify-center bg-gray-200">
                  <QrCode className="h-32 w-32 text-gray-800" />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  QR Code para {quantity} {quantity === 1 ? "ingresso" : "ingressos"} - {selectedVariation.name}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {participantData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center rounded-lg bg-white p-4">
                    <div className="mb-2 flex h-32 w-32 items-center justify-center bg-gray-200">
                      <QrCode className="h-24 w-24 text-gray-800" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">{data.nome}</p>
                    <p className="text-xs text-gray-600">{selectedVariation.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <Button className="flex w-full items-center justify-center bg-green-600 py-4 text-lg font-medium hover:bg-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Baixar Ingressos
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-gray-700 py-4 text-lg font-medium hover:bg-gray-800"
            >
              <Link href="/minha-conta">Ir para Minha Conta</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
