"use client"

import { QrCode } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QrCodeOptionsProps {
  selected: "single" | "multiple"
  onChange: (option: "single" | "multiple") => void
}

export default function QrCodeOptions({ selected, onChange }: QrCodeOptionsProps) {
  return (
    <RadioGroup
      value={selected}
      onValueChange={(value) => onChange(value as "single" | "multiple")}
      className="space-y-3"
    >
      <div
        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
          selected === "single" ? "border-green-500 bg-gray-700/50" : "border-gray-700 hover:border-gray-600"
        }`}
        onClick={() => onChange("single")}
      >
        <RadioGroupItem value="single" id="single" className="text-green-500" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <Label htmlFor="single" className="text-base cursor-pointer">
              Gerar um único QR Code para todos os ingressos
            </Label>
            <p className="text-sm text-gray-400">Todos os ingressos serão acessados com o mesmo QR Code</p>
          </div>
          <QrCode className="h-10 w-10 text-green-400 opacity-70" />
        </div>
      </div>

      <div
        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
          selected === "multiple" ? "border-green-500 bg-gray-700/50" : "border-gray-700 hover:border-gray-600"
        }`}
        onClick={() => onChange("multiple")}
      >
        <RadioGroupItem value="multiple" id="multiple" className="text-green-500" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <Label htmlFor="multiple" className="text-base cursor-pointer">
              Gerar um QR Code por ingresso
            </Label>
            <p className="text-sm text-gray-400">Cada participante terá seu próprio QR Code individual</p>
          </div>
          <div className="relative">
            <QrCode className="h-10 w-10 text-green-400 opacity-70" />
            <QrCode className="h-8 w-8 text-green-400 opacity-70 absolute -bottom-2 -right-2" />
          </div>
        </div>
      </div>
    </RadioGroup>
  )
}
