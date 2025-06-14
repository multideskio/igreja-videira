"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ChevronLeft, Plus, Upload, Save, Trash } from "lucide-react"
import Link from "next/link"
import { CustomFieldEditor } from "@/components/admin/custom-field-editor"
import { useRouter } from "next/navigation"
import { TicketVariationEditor } from "@/components/admin/ticket-variation-editor"

export default function NovoEventoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("informacoes")
  const [customFields, setCustomFields] = useState([
    { id: "1", name: "Célula", type: "text", required: true },
    { id: "2", name: "Discipulador", type: "text", required: true },
    { id: "3", name: "Região", type: "text", required: true },
  ])

  // Estado para variações de ingressos
  const [ticketVariations, setTicketVariations] = useState([
    {
      id: "1",
      name: "Ingresso Padrão",
      description: "Acesso a todas as áreas do evento",
      price: "75.00",
      quantity: "100",
      isActive: true,
      startDate: "",
      endDate: "",
    },
  ])

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    isFree: false,
    allowMultipleQrCode: true,
    maxTicketsPerPurchase: "10",
    isFeatured: false,
    requireRegistration: true,
    salesStartDate: "",
    salesEndDate: "",
    status: "draft",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEventData((prev) => ({ ...prev, [name]: checked }))
  }

  const addCustomField = () => {
    const newId = (customFields.length + 1).toString()
    setCustomFields([...customFields, { id: newId, name: "", type: "text", required: false }])
  }

  const updateCustomField = (id: string, field: string, value: any) => {
    setCustomFields(customFields.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
  }

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((f) => f.id !== id))
  }

  // Funções para gerenciar variações de ingressos
  const addTicketVariation = () => {
    const newId = (ticketVariations.length + 1).toString()
    setTicketVariations([
      ...ticketVariations,
      {
        id: newId,
        name: `Ingresso Tipo ${newId}`,
        description: "",
        price: "0.00",
        quantity: "50",
        isActive: true,
        startDate: "",
        endDate: "",
      },
    ])
  }

  const updateTicketVariation = (id: string, field: string, value: any) => {
    setTicketVariations(ticketVariations.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  const removeTicketVariation = (id: string) => {
    // Não permitir remover se for a única variação
    if (ticketVariations.length <= 1) return
    setTicketVariations(ticketVariations.filter((v) => v.id !== id))
  }

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar para a lista de eventos após sucesso
      router.push("/admin/eventos?created=true")
    } catch (error) {
      console.error("Erro ao criar evento:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button asChild variant="ghost" className="-ml-3 mr-2 text-gray-400 hover:text-white">
              <Link href="/admin/eventos">
                <ChevronLeft className="mr-1 h-5 w-5" />
                Voltar
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Novo Evento</h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Salvando..." : "Salvar como Rascunho"}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publicando..." : "Publicar Evento"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="ingressos">Ingressos</TabsTrigger>
            <TabsTrigger value="variacoes">Variações</TabsTrigger>
            <TabsTrigger value="campos">Campos Personalizados</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Nome do Evento</Label>
                    <Input
                      id="title"
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      placeholder="Digite o nome do evento"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={eventData.description}
                      onChange={handleChange}
                      placeholder="Descreva o evento em detalhes"
                      className="min-h-32 border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        type="date"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="time">Horário</Label>
                      <Input
                        id="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        type="time"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="location">Local</Label>
                    <Input
                      id="location"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      placeholder="Local do evento"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={eventData.address}
                      onChange={handleChange}
                      placeholder="Endereço completo"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Imagem do Evento</Label>
                    <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800 p-6">
                      <Upload className="mb-4 h-10 w-10 text-gray-500" />
                      <p className="mb-2 text-center text-sm text-gray-500">
                        Arraste e solte uma imagem aqui, ou clique para selecionar
                      </p>
                      <Button variant="outline" className="mt-2 border-gray-700 hover:bg-gray-800">
                        Selecionar Imagem
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingressos" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="free-event"
                      checked={eventData.isFree}
                      onCheckedChange={(checked) => handleSwitchChange("isFree", checked)}
                    />
                    <Label htmlFor="free-event">Evento Gratuito</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="multiple-qr"
                      checked={eventData.allowMultipleQrCode}
                      onCheckedChange={(checked) => handleSwitchChange("allowMultipleQrCode", checked)}
                    />
                    <Label htmlFor="multiple-qr">Permitir escolha entre QR Code único ou múltiplo</Label>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="max-tickets">Máximo de Ingressos por Compra</Label>
                    <Input
                      id="max-tickets"
                      name="maxTicketsPerPurchase"
                      type="number"
                      value={eventData.maxTicketsPerPurchase}
                      onChange={handleChange}
                      placeholder="10"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="salesStartDate">Data de Início das Vendas</Label>
                      <Input
                        id="salesStartDate"
                        name="salesStartDate"
                        value={eventData.salesStartDate}
                        onChange={handleChange}
                        type="datetime-local"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="salesEndDate">Data de Término das Vendas</Label>
                      <Input
                        id="salesEndDate"
                        name="salesEndDate"
                        value={eventData.salesEndDate}
                        onChange={handleChange}
                        type="datetime-local"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 bg-gray-900/50 px-6 py-4">
                <div className="text-sm text-gray-400">
                  <p>
                    A opção de QR Code único ou múltiplo permite que o usuário escolha entre receber um único QR Code
                    para todos os ingressos ou um QR Code individual para cada ingresso.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="variacoes" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Variações de Ingressos</h3>
                  <Button onClick={addTicketVariation} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Variação
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketVariations.map((variation) => (
                    <TicketVariationEditor
                      key={variation.id}
                      variation={variation}
                      onUpdate={(field, value) => updateTicketVariation(variation.id, field, value)}
                      onRemove={() => removeTicketVariation(variation.id)}
                      canRemove={ticketVariations.length > 1}
                      isEventFree={eventData.isFree}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 bg-gray-900/50 px-6 py-4">
                <div className="text-sm text-gray-400">
                  <p>
                    Crie diferentes tipos de ingressos para seu evento, como VIP, Camarote, ou diferentes lotes com
                    preços e quantidades específicas. Cada variação pode ter seu próprio período de vendas e
                    disponibilidade.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="campos" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Campos Personalizados</h3>
                  <Button onClick={addCustomField} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Campo
                  </Button>
                </div>

                <div className="space-y-4">
                  {customFields.map((field) => (
                    <CustomFieldEditor
                      key={field.id}
                      field={field}
                      onUpdate={(fieldName, value) => updateCustomField(field.id, fieldName, value)}
                      onRemove={() => removeCustomField(field.id)}
                    />
                  ))}
                </div>

                {customFields.length === 0 && (
                  <div className="rounded-lg border border-gray-800 bg-gray-800/30 p-8 text-center">
                    <Trash className="mx-auto mb-4 h-12 w-12 text-gray-500" />
                    <h3 className="mb-2 text-xl font-medium">Nenhum campo personalizado</h3>
                    <p className="mb-4 text-gray-400">
                      Adicione campos personalizados para coletar informações específicas dos participantes.
                    </p>
                    <Button onClick={addCustomField} className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" /> Adicionar Campo
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-800 bg-gray-900/50 px-6 py-4">
                <div className="text-sm text-gray-400">
                  <p>
                    Os campos personalizados serão exibidos no formulário de compra de ingressos. Cada participante
                    deverá preencher estes campos.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={eventData.isFeatured}
                      onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                    />
                    <Label htmlFor="featured">Destacar na Página Inicial</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="registration-required"
                      checked={eventData.requireRegistration}
                      onCheckedChange={(checked) => handleSwitchChange("requireRegistration", checked)}
                    />
                    <Label htmlFor="registration-required">Exigir Cadastro para Compra</Label>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="status">Status do Evento</Label>
                    <select
                      id="status"
                      name="status"
                      value={eventData.status}
                      onChange={handleChange}
                      className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    >
                      <option value="draft">Rascunho</option>
                      <option value="scheduled">Agendado</option>
                      <option value="active">Ativo</option>
                      <option value="completed">Concluído</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
