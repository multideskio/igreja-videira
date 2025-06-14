"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"

interface ColorPickerProps {
  defaultColor?: string
  onChange?: (color: string) => void
}

export function ColorPicker({ defaultColor = "#22c55e", onChange }: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setColor(defaultColor)
  }, [defaultColor])

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    if (onChange) {
      onChange(newColor)
    }
  }

  // Cores predefinidas para escolha rápida
  const presetColors = [
    "#22c55e", // verde
    "#16a34a", // verde escuro
    "#0ea5e9", // azul
    "#6366f1", // indigo
    "#a855f7", // roxo
    "#ec4899", // rosa
    "#ef4444", // vermelho
    "#f59e0b", // âmbar
    "#000000", // preto
    "#ffffff", // branco
  ]

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex w-full justify-between border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-full border border-gray-600" style={{ backgroundColor: color }} />
              <span>{color}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 border-gray-700 bg-gray-900 p-3">
          <div className="mb-3 grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="relative h-8 w-8 rounded-md border border-gray-700 transition-all hover:scale-110"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  handleColorChange(presetColor)
                  setIsOpen(false)
                }}
              >
                {color === presetColor && (
                  <Check
                    className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 ${
                      presetColor === "#ffffff" ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Selecionar cor personalizada</label>
              <Input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-10 w-full cursor-pointer border-gray-700 bg-gray-800 p-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Código hexadecimal</label>
              <Input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
