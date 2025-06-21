"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Search,
  User,
  FolderOpen,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Edit,
  Plus,
  Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

const activities = [
  {
    id: 1,
    type: "project",
    action: "إنشاء",
    title: "تم إنشاء مشروع جديد",
    description: "تطوير موقع شركة التقنية",
    user: "أحمد محمد",
    timestamp: "منذ 5 دقائق",
    icon: FolderOpen,
    color: "bg-blue-500",
    details: "تم إنشاء مشروع جديد لشركة التقنية المتقدمة بقيمة 25,000 ج.م",
  },
  {
    id: 2,
    type: "client",
    action: "تحديث",
    title: "تم تحديث بيانات العميل",
    description: "مؤسسة الإبداع",
    user: "أحمد محمد",
    timestamp: "منذ 15 دقيقة",
    icon: Users,
    color: "bg-green-500",
    details: "تم تحديث معلومات الاتصال ورقم الهاتف",
  },
  {
    id: 3,
    type: "meeting",
    action: "جدولة",
    title: "تم جدولة اجتماع جديد",
    description: "مراجعة المشروع الأول",
    user: "أحمد محمد",
    timestamp: "منذ 30 دقيقة",
    icon: Calendar,
    color: "bg-purple-500",
    details: "اجتماع مع شركة التقنية المتقدمة يوم 21 يونيو الساعة 2:00 م",
  },
  {
    id: 4,
    type: "payment",
    action: "استلام",
    title: "تم استلام دفعة",
    description: "فاتورة INV-2024-001",
    user: "النظام",
    timestamp: "منذ ساعة",
    icon: CreditCard,
    color: "bg-emerald-500",
    details: "تم استلام دفعة بقيمة 25,000 ج.م من شركة التقنية المتقدمة",
  },
  {
    id: 5,
    type: "project",
    action: "تحديث",
    title: "تم تحديث حالة المشروع",
    description: "تصميم هوية بصرية",
    user: "أحمد محمد",
    timestamp: "منذ ساعتين",
    icon: FolderOpen,
    color: "bg-orange-500",
    details: "تم تغيير حالة المشروع إلى مكتمل بنسبة 100%",
  },
  {
    id: 6,
    type: "settings",
    action: "تعديل",
    title: "تم تعديل الإعدادات",
    description: "إعدادات الحساب",
    user: "أحمد محمد",
    timestamp: "منذ 3 ساعات",
    icon: Settings,
    color: "bg-gray-500",
    details: "تم تحديث إعدادات الإشعارات والخصوصية",
  },
]

const activityTypes = ["الكل", "project", "client", "meeting", "payment", "settings"]
const activityActions = ["الكل", "إنشاء", "تحديث", "حذف", "جدولة", "استلام", "تعديل"]

const typeLabels: Record<string, string> = {
  project: "مشروع",
  client: "عميل",
  meeting: "اجتماع",
  payment: "دفعة",
  settings: "إعدادات",
}

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedAction, setSelectedAction] = useState("الكل")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "الكل" || activity.type === selectedType
    const matchesAction = selectedAction === "الكل" || activity.action === selectedAction
    return matchesSearch && matchesType && matchesAction
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case "إنشاء":
        return "bg-green-100 text-green-700"
      case "تحديث":
        return "bg-blue-100 text-blue-700"
      case "حذف":
        return "bg-red-100 text-red-700"
      case "جدولة":
        return "bg-purple-100 text-purple-700"
      case "استلام":
        return "bg-emerald-100 text-emerald-700"
      case "تعديل":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">سجل الأنشطة</h1>
            <p className="text-gray-600 mt-1">تتبع جميع الأنشطة والتغييرات في النظام</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الأنشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {activities.filter((a) => a.action === "إنشاء").length}
                  </p>
                  <p className="text-sm text-gray-600">عمليات إنشاء</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {activities.filter((a) => a.action === "تحديث" || a.action === "تعديل").length}
                  </p>
                  <p className="text-sm text-gray-600">عمليات تحديث</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-sm text-gray-600">أنشطة اليوم</p>
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
                  placeholder="البحث في الأنشطة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {activityTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-violet-500 hover:bg-violet-600" : ""}
                  >
                    {type === "الكل" ? type : typeLabels[type] || type}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                {activityActions.map((action) => (
                  <Button
                    key={action}
                    variant={selectedAction === action ? "default" : "outline"}
                    onClick={() => setSelectedAction(action)}
                    className={selectedAction === action ? "bg-violet-500 hover:bg-violet-600" : ""}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Timeline */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center`}>
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getActionColor(activity.action)}>{activity.action}</Badge>
                          <Badge variant="outline">{typeLabels[activity.type] || activity.type}</Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{activity.details}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{activity.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أنشطة</h3>
            <p className="text-gray-600">لم يتم العثور على أنشطة تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
