"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  DollarSign,
  AlertTriangle,
  Copy,
  FilePenLineIcon as Signature,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/components/dashboard-layout"

const contracts = [
  {
    id: 1,
    title: "عقد تطوير موقع تجارة إلكترونية",
    client: "شركة التسوق الذكي",
    amount: 45000,
    status: "نشط",
    startDate: "2024-06-01",
    endDate: "2024-09-01",
    signedDate: "2024-05-28",
    progress: 65,
    type: "تطوير ويب",
    description: "تطوير موقع تجارة إلكترونية متكامل مع نظام إدارة المخزون والدفع الإلكتروني",
  },
  {
    id: 2,
    title: "عقد تصميم هوية بصرية",
    client: "مؤسسة الإبداع الجديد",
    amount: 25000,
    status: "مكتمل",
    startDate: "2024-04-15",
    endDate: "2024-06-15",
    signedDate: "2024-04-10",
    progress: 100,
    type: "تصميم",
    description: "تصميم هوية بصرية كاملة تشمل الشعار والألوان والخطوط ودليل الاستخدام",
  },
  {
    id: 3,
    title: "عقد تطبيق إدارة المشاريع",
    client: "شركة البناء المتطورة",
    amount: 65000,
    status: "في الانتظار",
    startDate: "2024-07-01",
    endDate: "2024-12-01",
    signedDate: null,
    progress: 0,
    type: "تطبيق جوال",
    description: "تطوير تطبيق جوال شامل لإدارة المشاريع والمهام مع لوحة تحكم ويب",
  },
  {
    id: 4,
    title: "عقد صيانة وتطوير",
    client: "متجر الأجهزة الذكية",
    amount: 18000,
    status: "منتهي",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    signedDate: "2023-12-28",
    progress: 100,
    type: "صيانة",
    description: "عقد صيانة شهرية للموقع مع تحديثات دورية وإضافة مميزات جديدة",
  },
  {
    id: 5,
    title: "عقد استشارات تقنية",
    client: "شركة الحلول الرقمية",
    amount: 30000,
    status: "مسودة",
    startDate: "2024-07-15",
    endDate: "2024-10-15",
    signedDate: null,
    progress: 0,
    type: "استشارات",
    description: "تقديم استشارات تقنية شاملة لتطوير البنية التحتية الرقمية",
  },
]

const statusColors = {
  مسودة: "bg-gray-100 text-gray-700",
  "في الانتظار": "bg-yellow-100 text-yellow-700",
  نشط: "bg-green-100 text-green-700",
  مكتمل: "bg-blue-100 text-blue-700",
  منتهي: "bg-red-100 text-red-700",
}

const statusIcons = {
  مسودة: FileText,
  "في الانتظار": Clock,
  نشط: CheckCircle,
  مكتمل: CheckCircle,
  منتهي: XCircle,
}

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [selectedType, setSelectedType] = useState("الكل")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || contract.status === selectedStatus
    const matchesType = selectedType === "الكل" || contract.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const totalContracts = contracts.length
  const activeContracts = contracts.filter((c) => c.status === "نشط").length
  const completedContracts = contracts.filter((c) => c.status === "مكتمل").length
  const totalValue = contracts.reduce((sum, c) => sum + c.amount, 0)
  const activeValue = contracts.filter((c) => c.status === "نشط").reduce((sum, c) => sum + c.amount, 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة العقود</h1>
            <p className="text-gray-600 mt-1">إنشاء ومتابعة العقود مع العملاء</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <Plus className="w-4 h-4 ml-2" />
                عقد جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء عقد جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contract-title">عنوان العقد</Label>
                    <Input id="contract-title" placeholder="أدخل عنوان العقد" />
                  </div>
                  <div>
                    <Label htmlFor="client-name">اسم العميل</Label>
                    <Input id="client-name" placeholder="أدخل اسم العميل" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contract-amount">قيمة العقد</Label>
                    <Input id="contract-amount" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="start-date">تاريخ البداية</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">تاريخ النهاية</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contract-type">نوع العقد</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تطوير ويب">تطوير ويب</SelectItem>
                      <SelectItem value="تصميم">تصميم</SelectItem>
                      <SelectItem value="تطبيق جوال">تطبيق جوال</SelectItem>
                      <SelectItem value="استشارات">استشارات</SelectItem>
                      <SelectItem value="صيانة">صيانة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">وصف العقد</Label>
                  <Textarea id="description" placeholder="أدخل وصف تفصيلي للعقد" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-600">إنشاء العقد</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalContracts}</p>
                  <p className="text-sm text-gray-600">إجمالي العقود</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeContracts}</p>
                  <p className="text-sm text-gray-600">عقود نشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">قيمة العقود النشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((completedContracts / totalContracts) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">معدل الإنجاز</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث في العقود..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الحالات</SelectItem>
                  <SelectItem value="مسودة">مسودة</SelectItem>
                  <SelectItem value="في الانتظار">في الانتظار</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="منتهي">منتهي</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الأنواع</SelectItem>
                  <SelectItem value="تطوير ويب">تطوير ويب</SelectItem>
                  <SelectItem value="تصميم">تصميم</SelectItem>
                  <SelectItem value="تطبيق جوال">تطبيق جوال</SelectItem>
                  <SelectItem value="استشارات">استشارات</SelectItem>
                  <SelectItem value="صيانة">صيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contracts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredContracts.map((contract, index) => {
            const StatusIcon = statusIcons[contract.status]
            const isExpiringSoon =
              contract.status === "نشط" && new Date(contract.endDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

            return (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{contract.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={statusColors[contract.status]}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {contract.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {contract.type}
                          </Badge>
                          {isExpiringSoon && (
                            <Badge className="bg-orange-100 text-orange-700">
                              <AlertTriangle className="w-3 h-3 ml-1" />
                              ينتهي قريباً
                            </Badge>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Signature className="w-4 h-4 ml-2" />
                            طلب التوقيع
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 ml-2" />
                            نسخ
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 ml-2" />
                            تنزيل PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{contract.client}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{contract.description}</p>

                    {contract.status === "نشط" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">التقدم</span>
                          <span className="font-medium">{contract.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {contract.startDate} - {contract.endDate}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">{contract.amount.toLocaleString()} ج.م</p>
                      </div>
                    </div>

                    {contract.signedDate && (
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">تم التوقيع في: {contract.signedDate}</p>
                      </div>
                    )}

                    {contract.status === "مسودة" && (
                      <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600">
                        <Send className="w-4 h-4 ml-2" />
                        إرسال للتوقيع
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد عقود</h3>
            <p className="text-gray-600">لم يتم العثور على عقود تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
