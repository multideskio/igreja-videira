"use client"

import { useState, useRef, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, CameraOff, Search, CheckCircle, XCircle, Clock, User, Calendar, MapPin, Ticket } from "lucide-react"

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState("")
  const [searchCode, setSearchCode] = useState("")
  const [scanResult, setScanResult] = useState<any>(null)
  const [scanHistory, setScanHistory] = useState<any[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Dados simulados de ingressos
  const tickets = [
    {
      id: "QR001",
      eventId: "1",
      eventName: "Conferência Anual de Adoração",
      eventDate: "15 de Junho, 2024",
      eventLocation: "Igreja Videira - Sede",
      participantName: "João Silva",
      participantEmail: "joao@exemplo.com",
      participantPhone: "(11) 98765-4321",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
      purchaseDate: "10 de Maio, 2024",
      isUsed: false,
      usedAt: null,
      usedBy: null,
    },
    {
      id: "QR002",
      eventId: "1",
      eventName: "Conferência Anual de Adoração",
      eventDate: "15 de Junho, 2024",
      eventLocation: "Igreja Videira - Sede",
      participantName: "Maria Silva",
      participantEmail: "maria@exemplo.com",
      participantPhone: "(11) 98765-4322",
      celula: "Célula Central",
      discipulador: "Pr. Roberto",
      regiao: "Zona Norte",
      purchaseDate: "10 de Maio, 2024",
      isUsed: true,
      usedAt: "15 de Junho, 2024 - 18:30",
      usedBy: "Administrador",
    },
    {
      id: "QR003",
      eventId: "3",
      eventName: "Seminário de Liderança",
      eventDate: "10 de Agosto, 2024",
      eventLocation: "Igreja Videira - Unidade Centro",
      participantName: "Pedro Santos",
      participantEmail: "pedro@exemplo.com",
      participantPhone: "(11) 98765-4323",
      celula: "Célula Norte",
      discipulador: "Pr. Ana",
      regiao: "Zona Norte",
      purchaseDate: "20 de Julho, 2024",
      isUsed: false,
      usedAt: null,
      usedBy: null,
    },
  ]

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsScanning(true)
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const handleScan = (code: string) => {
    const ticket = tickets.find((t) => t.id === code)
    setScanResult(ticket || { error: "QR Code não encontrado" })
    setScannedCode(code)

    if (ticket) {
      // Adicionar ao histórico
      const scanEntry = {
        ...ticket,
        scannedAt: new Date().toLocaleString("pt-BR"),
        scannedBy: "Administrador",
      }
      setScanHistory((prev) => [scanEntry, ...prev.slice(0, 9)]) // Manter apenas os 10 mais recentes
    }
  }

  const handleSearch = () => {
    if (searchCode.trim()) {
      handleScan(searchCode.trim())
    }
  }

  const markAsUsed = (ticketId: string) => {
    const ticketIndex = tickets.findIndex((t) => t.id === ticketId)
    if (ticketIndex !== -1) {
      tickets[ticketIndex].isUsed = true
      tickets[ticketIndex].usedAt = new Date().toLocaleString("pt-BR")
      tickets[ticketIndex].usedBy = "Administrador"

      // Atualizar resultado do scan
      setScanResult({ ...tickets[ticketIndex] })

      // Atualizar histórico
      setScanHistory((prev) =>
        prev.map((item) =>
          item.id === ticketId ? { ...item, isUsed: true, usedAt: tickets[ticketIndex].usedAt } : item,
        ),
      )
    }
  }

  const markAsUnused = (ticketId: string) => {
    const ticketIndex = tickets.findIndex((t) => t.id === ticketId)
    if (ticketIndex !== -1) {
      tickets[ticketIndex].isUsed = false
      tickets[ticketIndex].usedAt = null
      tickets[ticketIndex].usedBy = null

      // Atualizar resultado do scan
      setScanResult({ ...tickets[ticketIndex] })

      // Atualizar histórico
      setScanHistory((prev) =>
        prev.map((item) => (item.id === ticketId ? { ...item, isUsed: false, usedAt: null } : item)),
      )
    }
  }

  // Simular leitura de QR code (em produção seria integrado com uma biblioteca de QR code)
  const simulateQRScan = () => {
    const codes = ["QR001", "QR002", "QR003", "QR999"] // QR999 não existe
    const randomCode = codes[Math.floor(Math.random() * codes.length)]
    handleScan(randomCode)
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Scanner de QR Code</h2>
        </div>

        <Tabs defaultValue="scanner" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scanner">Scanner</TabsTrigger>
            <TabsTrigger value="search">Buscar Ingresso</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Scanner */}
              <Card className="border-gray-800 bg-gray-900">
                <CardHeader>
                  <CardTitle>Scanner de QR Code</CardTitle>
                  <CardDescription>Use a câmera para escanear os QR codes dos ingressos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!isScanning ? (
                      <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800">
                        <Camera className="mb-4 h-12 w-12 text-gray-500" />
                        <p className="mb-4 text-center text-gray-400">Clique no botão abaixo para iniciar o scanner</p>
                        <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                          <Camera className="mr-2 h-4 w-4" />
                          Iniciar Scanner
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <video ref={videoRef} autoPlay playsInline className="h-64 w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-32 w-32 border-2 border-green-500 bg-transparent"></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={stopCamera}
                            variant="outline"
                            className="flex-1 border-gray-700 hover:bg-gray-800"
                          >
                            <CameraOff className="mr-2 h-4 w-4" />
                            Parar Scanner
                          </Button>
                          <Button onClick={simulateQRScan} className="flex-1 bg-green-600 hover:bg-green-700">
                            Simular Scan
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resultado */}
              <Card className="border-gray-800 bg-gray-900">
                <CardHeader>
                  <CardTitle>Resultado do Scan</CardTitle>
                  <CardDescription>Informações do ingresso escaneado</CardDescription>
                </CardHeader>
                <CardContent>
                  {!scanResult ? (
                    <div className="flex h-64 flex-col items-center justify-center text-gray-500">
                      <Ticket className="mb-4 h-12 w-12" />
                      <p>Nenhum QR code escaneado ainda</p>
                    </div>
                  ) : scanResult.error ? (
                    <div className="flex h-64 flex-col items-center justify-center text-red-400">
                      <XCircle className="mb-4 h-12 w-12" />
                      <p className="text-center">{scanResult.error}</p>
                      <p className="mt-2 text-sm text-gray-400">Código: {scannedCode}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{scanResult.participantName}</h3>
                        <Badge className={scanResult.isUsed ? "bg-red-500" : "bg-green-500"}>
                          {scanResult.isUsed ? "Usado" : "Válido"}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-green-400" />
                          <span>{scanResult.eventName}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-400" />
                          <span>{scanResult.eventDate}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-green-400" />
                          <span>{scanResult.eventLocation}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-green-400" />
                          <span>{scanResult.participantEmail}</span>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-800 p-3">
                        <h4 className="mb-2 font-medium">Informações da Igreja</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p>Célula: {scanResult.celula}</p>
                          <p>Discipulador: {scanResult.discipulador}</p>
                          <p>Região: {scanResult.regiao}</p>
                        </div>
                      </div>

                      {scanResult.isUsed && (
                        <div className="rounded-lg bg-red-900/30 p-3">
                          <p className="text-sm text-red-400">Usado em: {scanResult.usedAt}</p>
                          <p className="text-sm text-red-400">Por: {scanResult.usedBy}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {!scanResult.isUsed ? (
                          <Button
                            onClick={() => markAsUsed(scanResult.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como Usado
                          </Button>
                        ) : (
                          <Button
                            onClick={() => markAsUnused(scanResult.id)}
                            variant="outline"
                            className="flex-1 border-gray-700 hover:bg-gray-800"
                          >
                            Marcar como Não Usado
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle>Buscar Ingresso</CardTitle>
                <CardDescription>Digite o código do QR para buscar informações do ingresso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Digite o código do QR (ex: QR001)"
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {scanResult && !scanResult.error && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{scanResult.participantName}</h3>
                      <Badge className={scanResult.isUsed ? "bg-red-500" : "bg-green-500"}>
                        {scanResult.isUsed ? "Usado" : "Válido"}
                      </Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Informações do Evento</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p>{scanResult.eventName}</p>
                          <p>{scanResult.eventDate}</p>
                          <p>{scanResult.eventLocation}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Informações do Participante</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p>{scanResult.participantEmail}</p>
                          <p>{scanResult.participantPhone}</p>
                          <p>Célula: {scanResult.celula}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!scanResult.isUsed ? (
                        <Button onClick={() => markAsUsed(scanResult.id)} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar como Usado
                        </Button>
                      ) : (
                        <Button
                          onClick={() => markAsUnused(scanResult.id)}
                          variant="outline"
                          className="border-gray-700 hover:bg-gray-800"
                        >
                          Marcar como Não Usado
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle>Histórico de Scans</CardTitle>
                <CardDescription>Últimos QR codes escaneados</CardDescription>
              </CardHeader>
              <CardContent>
                {scanHistory.length === 0 ? (
                  <div className="flex h-32 flex-col items-center justify-center text-gray-500">
                    <Clock className="mb-2 h-8 w-8" />
                    <p>Nenhum scan realizado ainda</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scanHistory.map((scan, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-800 p-3"
                      >
                        <div>
                          <p className="font-medium">{scan.participantName}</p>
                          <p className="text-sm text-gray-400">{scan.eventName}</p>
                          <p className="text-xs text-gray-500">Escaneado em: {scan.scannedAt}</p>
                        </div>
                        <Badge className={scan.isUsed ? "bg-red-500" : "bg-green-500"}>
                          {scan.isUsed ? "Usado" : "Válido"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
