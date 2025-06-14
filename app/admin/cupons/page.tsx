"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, MoreVertical, Search, Edit, Trash, Copy, Percent, DollarSign, Calendar, Users } from "lucide-react"

export default function AdminCuponsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    applicableEvents: "all",
    specificEvent: "",
    isActive: true,
  })

  // Dados simulados de cupons
  const [coupons, setCoupons] = useState([
    {
      id: "1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      startDate: "2024-05-01",
      endDate: "2024-12-31",
      usageLimit: 100,
      usageCount: 45,
      applicableEvents: "all",
      isActive: true,
      totalSavings: 1350.0,
    },
    {
      id: "2",
      code: "JOVENS20",
      type: "percentage",
      value: 20,
      startDate: "2024-06-01",
      endDate: "2024-07-31",
      usageLimit: 50,
      usageCount: 32,
      applicableEvents: "specific",
      specificEvent: "Retiro de Jovens",
      isActive: true,
      totalSavings: 960.0,
    },
    {
      id: "3",
      code: "DESCONTO50",
      type: "fixed",
      value: 50,
      startDate: "2024-05-15",
      endDate: "2024-06-15",
      usageLimit: 25,
      usageCount: 18,
      applicableEvents: "all",
      isActive: false,
      totalSavings: 900.0,
    },
  ])

  const totalSavings = coupons.reduce((sum, coupon) => sum + coupon.totalSavings, 0)
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usageCount, 0)
  const activeCoupons = coupons.filter((coupon) => coupon.isActive).length

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? <Badge className="bg-green-500">Ativo</Badge> : <Badge className="bg-gray-500">Inativo</Badge>
  }

  const getTypeBadge = (type: string) => {
    return type === "percentage" ? (
      <Badge variant="outline" className="border-blue-500 text-blue-400">
        Percentual
      </Badge>
    ) : (
      <Badge variant="outline" className="border-green-500 text-green-400">
        Valor Fixo
      </Badge>
    )
  }

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCoupon({ ...newCoupon, code: result })
  }

  const handleCreateCoupon = () => {
    // Aqui você implementaria a lógica para criar o cupom
    console.log("Criando cupom:", newCoupon)
    setIsCreateModalOpen(false)
    setNewCoupon({
      code: "",
      type: "percentage",
      value: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
      applicableEvents: "all",
      specificEvent: "",
      isActive: true,
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Cupons de Desconto</h2>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Criar Cupom
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Criar Novo Cupom</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Configure um novo cupom de desconto para seus eventos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-white">
                    Código do Cupom
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="code"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                      placeholder="Ex: DESCONTO10"
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                    <Button variant="outline" onClick={generateCouponCode} className="border-gray-700">
                      Gerar
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Tipo de Desconto</Label>
                  <Select value={newCoupon.type} onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}>
                    <SelectTrigger className="border-gray-700 bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="percentage">Percentual (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value" className="text-white">
                    Valor do Desconto {newCoupon.type === "percentage" ? "(%)" : "(R$)"}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                    placeholder={newCoupon.type === "percentage" ? "10" : "50.00"}
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-white">
                      Data de Início
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCoupon.startDate}
                      onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-white">
                      Data de Término
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newCoupon.endDate}
                      onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                      className="border-gray-700 bg-gray-800 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usageLimit" className="text-white">
                    Limite de Uso
                  </Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                    placeholder="100"
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={newCoupon.isActive}
                    onCheckedChange={(checked) => setNewCoupon({ ...newCoupon, isActive: checked })}
                  />
                  <Label htmlFor="isActive" className="text-white">
                    Cupom ativo
                  </Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="border-gray-700">
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateCoupon} className="bg-green-600 hover:bg-green-700">
                    Criar Cupom
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Cupons Ativos</CardTitle>
              <Percent className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeCoupons}</div>
              <p className="text-xs text-gray-500">de {coupons.length} cupons totais</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total de Usos</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalUsage}</div>
              <p className="text-xs text-gray-500">cupons utilizados</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Economia Total</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ {totalSavings.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-gray-500">economizados pelos clientes</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Taxa de Uso</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">68%</div>
              <p className="text-xs text-gray-500">dos cupons são utilizados</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar cupons..."
              className="w-full border-gray-700 bg-gray-800 pl-9 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              Filtrar
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              Exportar
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableHead className="text-gray-400">Código</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Valor</TableHead>
                <TableHead className="text-gray-400">Período</TableHead>
                <TableHead className="text-gray-400">Uso</TableHead>
                <TableHead className="text-gray-400">Economia</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-right text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id} className="border-gray-800 hover:bg-gray-900">
                  <TableCell className="font-medium font-mono">{coupon.code}</TableCell>
                  <TableCell>{getTypeBadge(coupon.type)}</TableCell>
                  <TableCell>
                    {coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(coupon.startDate).toLocaleDateString("pt-BR")} -{" "}
                    {new Date(coupon.endDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <span className="text-white">{coupon.usageCount}</span>
                    <span className="text-gray-400">/{coupon.usageLimit}</span>
                  </TableCell>
                  <TableCell className="text-green-400">R$ {coupon.totalSavings.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>{getStatusBadge(coupon.isActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 text-white">
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Copiar Código</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}
