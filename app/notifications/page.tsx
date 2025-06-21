"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Check,
  Clock,
  User,
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  MoreHorizontal,
  Trash2,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const notifications = [
  {
    id: 1,
    title: "دفعة جديدة من شركة التقنية",
    message: "تم استلام دفعة بقيمة 15,000 ج.م من شركة التقنية المتقدمة",
    type: "payment",
    time: "منذ 5 دقائق",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    title: "اجتماع قادم",
    message: "لديك اجتماع مع عميل جديد غداً في الساعة 2:00 مساءً",
    type: "meeting",
    time: "منذ ساعة",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "مهمة متأخرة",
    message: "مهمة 'تطوير صفحة المشاريع' متأخرة عن الموعد المحدد",
    type: "task",
    time: "منذ 3 ساعات",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    title: "عميل جديد",
    message: "انضم عميل جديد 'شركة الابتكار' إلى قائمة عملائك",
    type: "client",
    time: "منذ يوم",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    title: "تذكير: تجديد الاشتراك",
    message: "ينتهي اشتراك Adobe Creative Suite خلال 3 أيام",
    type: "reminder",
    time: "منذ يومين",
    read: false,
    priority: "medium",
  },
  {
    id: 6,
    title: "تحديث النظام",
    message: "تم تحديث النظام بنجاح وإضافة مميزات جديدة",
    type: "system",
    time: "منذ أسبوع",
    read: true,
    priority: "low",
  },
]

const notificationTypes = ["الكل", "المدفوعات", "الاجتماعات", "المهام", "العملاء", "التذكيرات", "النظام"]
const priorities = ["الكل", "عالية", "متوسطة", "منخفضة"]

export default function NotificationsPage() {
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedPriority, setSelectedPriority] = useState("الكل")
  const [activeTab, setActiveTab] = useState("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return CreditCard
      case "meeting":
        return Calendar
      case "task":
        return CheckCircle
      case "client":
        return User
      case "reminder":
        return Clock
      case "system":
        return Settings
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "payment":
        return "from-green-500 to-emerald-500"
      case "meeting":
        return "from-blue-500 to-cyan-500"
      case "task":
        return "from-orange-500 to-red-500"
      case "client":
        return "from-purple-500 to-pink-500"
      case "reminder":
        return "from-yellow-500 to-orange-500"
      case "system":
        return "from-gray-500 to-slate-500"
      default:
        return "from-violet-500 to-purple-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      selectedType === "الكل" ||
      (selectedType === "المدفوعات" && notification.type === "payment") ||
      (selectedType === "الاجتماعات" && notification.type === "meeting") ||
      (selectedType === "المهام" && notification.type === "task") ||
      (selectedType === "العملاء" && notification.type === "client") ||
      (selectedType === "التذكيرات" && notification.type === "reminder") ||
      (selectedType === "النظام" && notification.type === "system")

    const matchesPriority =
      selectedPriority === "الكل" ||
      (selectedPriority === "عالية" && notification.priority === "high") ||
      (selectedPriority === "متوسطة" && notification.priority === "medium") ||
      (selectedPriority === "منخفضة" && notification.priority === "low")

    return matchesType && matchesPriority
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayCount = notifications.filter((n) => n.time.includes("دقائق") || n.time.includes("ساعة")).length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الإشعارات</h1>
            <p className="text-gray-600 mt-1">متابعة جميع التحديثات والأنشطة</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Check className="w-4 h-4 ml-2" />
              تحديد الكل كمقروء
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 ml-2" />
              إعدادات الإشعارات
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الإشعارات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-sm text-gray-600">غير مقروءة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
                  <p className="text-sm text-gray-600">اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</p>
                  <p className="text-sm text-gray-600">مقروءة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {notificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">قائمة الإشعارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      notification.read ? "border-gray-200 bg-white" : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className={`font-semibold ${notification.read ? "text-gray-900" : "text-blue-900"}`}>
                                {notification.title}
                              </h4>
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority === "high"
                                  ? "عالية"
                                  : notification.priority === "medium"
                                    ? "متوسطة"
                                    : "منخفضة"}
                              </Badge>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 ml-2" />
                                {notification.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إشعارات</h3>
            <p className="text-gray-600">لم يتم العثور على إشعارات تطابق الفلاتر المحددة</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
