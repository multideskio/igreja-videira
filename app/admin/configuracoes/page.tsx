"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ColorPicker } from "@/components/admin/color-picker"
import { Upload } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <Button className="bg-green-600 hover:bg-green-700">Salvar Alterações</Button>
        </div>

        <Tabs defaultValue="geral" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="church-name">Nome da Igreja</Label>
                    <Input
                      id="church-name"
                      defaultValue="Igreja Videira"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      defaultValue="Somos uma comunidade cristã comprometida com o crescimento espiritual e o discipulado."
                      className="min-h-32 border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      defaultValue="Av. Principal, 1000 - Centro"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email de Contato</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="contato@igrejavideira.com.br"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        defaultValue="(11) 99999-9999"
                        className="border-gray-700 bg-gray-800 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-medium">Redes Sociais</h3>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      defaultValue="@igrejavideira"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      defaultValue="facebook.com/igrejavideira"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      defaultValue="youtube.com/igrejavideira"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aparencia" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label>Logo da Igreja</Label>
                    <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800 p-6">
                      <Upload className="mb-4 h-10 w-10 text-gray-500" />
                      <p className="mb-2 text-center text-sm text-gray-500">
                        Arraste e solte uma imagem aqui, ou clique para selecionar
                      </p>
                      <Button variant="outline" className="mt-2 border-gray-700 hover:bg-gray-800">
                        Selecionar Logo
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label>Favicon</Label>
                    <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800 p-6">
                      <Upload className="mb-4 h-10 w-10 text-gray-500" />
                      <p className="mb-2 text-center text-sm text-gray-500">
                        Arraste e solte uma imagem aqui, ou clique para selecionar
                      </p>
                      <Button variant="outline" className="mt-2 border-gray-700 hover:bg-gray-800">
                        Selecionar Favicon
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-medium">Cores do Tema</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label>Cor Primária</Label>
                    <ColorPicker defaultColor="#22c55e" />
                  </div>
                  <div className="grid gap-3">
                    <Label>Cor Secundária</Label>
                    <ColorPicker defaultColor="#16a34a" />
                  </div>
                  <div className="grid gap-3">
                    <Label>Cor de Fundo</Label>
                    <ColorPicker defaultColor="#030712" />
                  </div>
                  <div className="grid gap-3">
                    <Label>Cor do Texto</Label>
                    <ColorPicker defaultColor="#ffffff" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-medium">Configurações de Pagamento</h3>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="cielo-key">Chave da API Cielo</Label>
                    <Input
                      id="cielo-key"
                      type="password"
                      defaultValue="••••••••••••••••"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="cielo-merchant">ID do Comerciante Cielo</Label>
                    <Input
                      id="cielo-merchant"
                      defaultValue="1234567890"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="pix-key">Chave Pix</Label>
                    <Input
                      id="pix-key"
                      defaultValue="contato@igrejavideira.com.br"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-4">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-medium">Configurações de Usuários</h3>
                <div className="grid gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="require-account"
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                      defaultChecked
                    />
                    <Label htmlFor="require-account">Exigir conta para compra de ingressos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-approve" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                    <Label htmlFor="auto-approve">Aprovar novos usuários automaticamente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                      defaultChecked
                    />
                    <Label htmlFor="email-notifications">Enviar notificações por email</Label>
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
