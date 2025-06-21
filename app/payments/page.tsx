"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Plus,
  Search,
  Download,
  Send,
  User,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const payments = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    client: "شركة التقنية المتقدمة",
    project: "تطوير موقع شركة التقنية",
    amount: "25,000 ج.م",
    status: "مدفوع",
    dueDate: "2024-06-15",
    paidDate: "2024-06-10",
    createdDate: "2024-05-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    client: "مؤسسة الإبداع",
    project: "تصميم هوية بصرية",
    amount: "15,000 ج.م",
    status: "معلق",
    dueDate: "2024-06-25",
    paidDate: null,
    createdDate: "2024-05-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    client: "متجر الأناقة",
    project: "تطبيق إدارة المخزون",
    amount: "35,000 ج.م",
    status: "متأخر",
    dueDate: "2024-06-01",
    paidDate: null,
    createdDate: "2024-05-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    client: "شركة التسوق الذكي",
    project: "موقع تجارة إلكترونية",
    amount: "50,000 ج.م",
    status: "مسودة",
    dueDate: "2024-07-01",
    paidDate: null,
    createdDate: "2024-06-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const paymentStatuses = ["الكل", "مدفوع", "معلق", "متأخر", "مسودة"]

const statusIcons = {
  مدفوع: CheckCircle,
  معلق: Clock,
  متأخر: AlertCircle,
  مسودة: FileText,
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || payment.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مدفوع":
        return "bg-green-100 text-green-700"
      case "معلق":
        return "bg-yellow-100 text-yellow-700"
      case "متأخر":
        return "bg-red-100 text-red-700"
      case "مسودة":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const totalAmount = payments.reduce((sum, payment) => {
    return sum + Number.parseFloat(payment.amount.replace(/[^\d]/g, ""))
  }, 0)

  const paidAmount = payments
    .filter((p) => p.status === "مدفوع")
    .reduce((sum, payment) => {
      return sum + Number.parseFloat(payment.amount.replace(/[^\d]/g, ""))
    }, 0)

  const pendingAmount = payments
    .filter((p) => p.status === "معلق" || p.status === "متأخر")
    .reduce((sum, payment) => {
      return sum + Number.parseFloat(payment.amount.replace(/[^\d]/g, ""))
    }, 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">المدفوعات</h1>
            <p className="text-gray-600 mt-1">إدارة الفواتير والمدفوعات</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Plus className="w-4 h-4 ml-2" />
            فاتورة جديدة
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الفواتير</p>
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
                  <p className="text-2xl font-bold text-gray-900">{paidAmount.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">المبلغ المدفوع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pendingAmount.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">المبلغ المعلق</p>
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
                  <p className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">إجمالي المبلغ</p>
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
                  placeholder="البحث في الفواتير..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {paymentStatuses.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    onClick={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? "bg-violet-500 hover:bg-violet-600" : ""}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.map((payment, index) => {
            const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons]

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={payment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{payment.client.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{payment.invoiceNumber}</h3>
                                <Badge className={getStatusColor(payment.status)}>
                                  <StatusIcon className="w-3 h-3 ml-1" />
                                  {payment.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                <User className="w-4 h-4" />
                                <span>{payment.client}</span>
                              </div>
                              <p className="text-sm text-gray-600">{payment.project}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-violet-600">{payment.amount}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 ml-2" />
                                    عرض التفاصيل
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 ml-2" />
                                    تحميل PDF
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Send className="w-4 h-4 ml-2" />
                                    إرسال للعميل
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 ml-2" />
                                    تعديل
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 ml-2" />
                                    حذف
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>تاريخ الإنشاء: {payment.createdDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>تاريخ الاستحقاق: {payment.dueDate}</span>
                            </div>
                            {payment.paidDate && (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span>تاريخ الدفع: {payment.paidDate}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 ml-2" />
                              تحميل
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="w-4 h-4 ml-2" />
                              إرسال
                            </Button>
                            {payment.status !== "مدفوع" && (
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <CheckCircle className="w-4 h-4 ml-2" />
                                تسجيل الدفع
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فواتير</h3>
            <p className="text-gray-600">لم يتم العثور على فواتير تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
