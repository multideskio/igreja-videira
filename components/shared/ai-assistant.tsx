"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente virtual da Igreja Videira. Como posso ajudar você hoje? Posso fornecer informações sobre eventos, ajudar com compras de ingressos ou responder perguntas sobre nossa igreja.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Adiciona a mensagem do usuário
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    // Simula resposta do assistente
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("evento")) {
        response =
          "Temos vários eventos programados! Nossa próxima Conferência Anual de Adoração será em 15 de Junho. Você gostaria de mais informações ou deseja comprar ingressos?"
      } else if (input.toLowerCase().includes("ingresso") || input.toLowerCase().includes("comprar")) {
        response =
          "Para comprar ingressos, você pode navegar até a seção de Eventos, escolher o evento desejado e clicar em 'Comprar Ingressos'. Posso ajudar você a encontrar um evento específico?"
      } else if (input.toLowerCase().includes("horário") || input.toLowerCase().includes("culto")) {
        response =
          "Nossos cultos de celebração acontecem aos domingos às 10h e 18h. Também temos culto de oração às quartas-feiras às 19h30. Você planeja nos visitar em breve?"
      } else if (input.toLowerCase().includes("célula") || input.toLowerCase().includes("grupo")) {
        response =
          "Nossas células são pequenos grupos que se reúnem durante a semana em diversos bairros. Posso ajudar você a encontrar uma célula próxima à sua residência. Em qual região você mora?"
      } else {
        response =
          "Obrigado por sua mensagem! Estou aqui para ajudar com informações sobre eventos, compra de ingressos, horários de cultos e muito mais. Tem alguma pergunta específica sobre a Igreja Videira?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-xl md:h-[600px] md:w-[400px]">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Assistente IA</h3>
                <p className="text-xs text-gray-400">Igreja Videira</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-green-600 text-white" : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-gray-800 px-4 py-2 text-gray-100">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 bg-gray-900 p-3">
            <div className="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full p-0 text-green-400 hover:bg-gray-700 hover:text-green-400"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
