"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash } from "lucide-react"

interface CustomField {
  id: string
  name: string
  type: string
  required: boolean
}

interface CustomFieldEditorProps {
  field: CustomField
  onUpdate: (field: string, value: any) => void
  onRemove: () => void
}

export function CustomFieldEditor({ field, onUpdate, onRemove }: CustomFieldEditorProps) {
  const fieldTypes = [
    { value: "text", label: "Texto" },
    { value: "number", label: "Número" },
    { value: "email", label: "Email" },
    { value: "tel", label: "Telefone" },
    { value: "select", label: "Seleção" },
    { value: "checkbox", label: "Checkbox" },
    { value: "date", label: "Data" },
  ]

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-medium">Campo Personalizado</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 rounded-full text-gray-400 hover:bg-gray-700 hover:text-red-400"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`field-name-${field.id}`}>Nome do Campo</Label>
          <Input
            id={`field-name-${field.id}`}
            value={field.name}
            onChange={(e) => onUpdate("name", e.target.value)}
            placeholder="Ex: Célula, Região, etc."
            className="border-gray-700 bg-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`field-type-${field.id}`}>Tipo de Campo</Label>
          <Select value={field.type} onValueChange={(value) => onUpdate("type", value)}>
            <SelectTrigger id={`field-type-${field.id}`} className="border-gray-700 bg-gray-700 text-white">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-white">
              {fieldTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id={`field-required-${field.id}`}
            checked={field.required}
            onCheckedChange={(checked) => onUpdate("required", checked)}
          />
          <Label htmlFor={`field-required-${field.id}`}>Campo obrigatório</Label>
        </div>

        {field.type === "select" && (
          <div className="grid gap-2">
            <Label htmlFor={`field-options-${field.id}`}>Opções (separadas por vírgula)</Label>
            <Input
              id={`field-options-${field.id}`}
              placeholder="Opção 1, Opção 2, Opção 3"
              className="border-gray-700 bg-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        )}
      </div>
    </div>
  )
}
