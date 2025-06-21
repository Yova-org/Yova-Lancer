"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  User,
  FileText,
  Download,
  Copy,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const proposals = [
  {
    id: 1,
    title: "تطوير موقع تجارة إلكترونية",
    client: "شركة التسوق الذكي",
    amount: 45000,
    status: "مرسل",
    date: "2024-06-15",
    validUntil: "2024-07-15",
    description: "تطوير موقع تجارة إلكترونية متكامل مع نظام إدارة المخزون",
    services: ["تطوير الواجهة الأمامية", "تطوير الواجهة الخلفية", "تصميم قاعدة البيانات", "اختبار النظام"],
  },
  {
    id: 2,
    title: "تصميم هوية بصرية شاملة",
    client: "مؤسسة الإبداع الجديد",
    amount: 25000,
    status: "مقبول",
    date: "2024-06-10",
    validUntil: "2024-07-10",
    description: "تصميم هوية بصرية كاملة تشمل الشعار والألوان والخطوط",
    services: ["تصميم الشعار", "دليل الهوية البصرية", "تصميم القرطاسية", "تصميم المواد التسويقية"],
  },
  {
    id: 3,
    title: "تطبيق إدارة المشاريع",
    client: "شركة البناء المتطورة",
    amount: 65000,
    status: "مرفوض",
    date: "2024-06-05",
    validUntil: "2024-07-05",
    description: "تطوير تطبيق جوال لإدارة المشاريع والمهام",
    services: ["تطوير التطبيق", "تصميم واجهة المستخدم", "ربط قاعدة البيانات", "اختبار الأداء"],
  },
  {
    id: 4,
    title: "موقع شركة استشارية",
    client: "مكتب الاستشارات القانونية",
    amount: 18000,
    status: "مسودة",
    date: "2024-06-20",
    validUntil: "2024-07-20",
    description: "تطوير موقع تعريفي للشركة مع نظام حجز المواعيد",
    services: ["تطوير الموقع", "نظام حجز المواعيد", "لوحة تحكم إدارية", "تحسين محركات البحث"],
  },
  {
    id: 5,
    title: "نظام إدارة المخزون",
    client: "متجر الأجهزة الذكية",
    amount: 35000,
    status: "منتهي الصلاحية",
    date: "2024-05-15",
    validUntil: "2024-06-15",
    description: "تطوير نظام شامل لإدارة المخزون والمبيعات",
    services: ["تطوير النظام", "تقارير المبيعات", "إدارة الموردين", "تتبع المخزون"],
  },
]

const statusColors = {
  مسودة: "bg-gray-100 text-gray-700",
  مرسل: "bg-blue-100 text-blue-700",
  مقبول: "bg-green-100 text-green-700",
  مرفوض: "bg-red-100 text-red-700",
  "منتهي الصلاحية": "bg-orange-100 text-orange-700",
}

const statusIcons = {
  مسودة: FileText,
  مرسل: Send,
  مقبول: CheckCircle,
  مرفوض: XCircle,
  "منتهي الصلاحية": Clock,
}

export default function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [sortBy, setSortBy] = useState("الأحدث")

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || proposal.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalProposals = proposals.length
  const acceptedProposals = proposals.filter((p) => p.status === "مقبول").length
  const pendingProposals = proposals.filter((p) => p.status === "مرسل").length
  const totalValue = proposals.reduce((sum, p) => sum + p.amount, 0)
  const acceptedValue = proposals.filter((p) => p.status === "مقبول").reduce((sum, p) => sum + p.amount, 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة العروض</h1>
            <p className="text-gray-600 mt-1">إنشاء ومتابعة عروض الأسعار</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Plus className="w-4 h-4 ml-2" />
            عرض جديد
          </Button>
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
                  <p className="text-2xl font-bold text-gray-900">{totalProposals}</p>
                  <p className="text-sm text-gray-600">إجمالي العروض</p>
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
                  <p className="text-2xl font-bold text-gray-900">{acceptedProposals}</p>
                  <p className="text-sm text-gray-600">عروض مقبولة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pendingProposals}</p>
                  <p className="text-sm text-gray-600">في الانتظار</p>
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
                  <p className="text-2xl font-bold text-gray-900">{Math.round((acceptedValue / totalValue) * 100)}%</p>
                  <p className="text-sm text-gray-600">معدل القبول</p>
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
                  placeholder="البحث في العروض..."
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
                  <SelectItem value="مرسل">مرسل</SelectItem>
                  <SelectItem value="مقبول">مقبول</SelectItem>
                  <SelectItem value="مرفوض">مرفوض</SelectItem>
                  <SelectItem value="منتهي الصلاحية">منتهي الصلاحية</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الأحدث">الأحدث</SelectItem>
                  <SelectItem value="الأقدم">الأقدم</SelectItem>
                  <SelectItem value="القيمة">القيمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Proposals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProposals.map((proposal, index) => {
            const StatusIcon = statusIcons[proposal.status]
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={statusColors[proposal.status]}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {proposal.status}
                          </Badge>
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
                      <span>{proposal.client}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>صالح حتى: {proposal.validUntil}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">{proposal.amount.toLocaleString()} ج.م</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">الخدمات المشمولة:</p>
                      <div className="flex flex-wrap gap-1">
                        {proposal.services.slice(0, 2).map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {proposal.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{proposal.services.length - 2} أخرى
                          </Badge>
                        )}
                      </div>
                    </div>

                    {proposal.status === "مسودة" && (
                      <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600">
                        <Send className="w-4 h-4 ml-2" />
                        إرسال العرض
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد عروض</h3>
            <p className="text-gray-600">لم يتم العثور على عروض تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
