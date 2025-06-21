"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Flag,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/dashboard-layout"

const teamTasks = [
  {
    id: 1,
    title: "تطوير صفحة تسجيل الدخول",
    description: "إنشاء صفحة تسجيل دخول متجاوبة مع التحقق من صحة البيانات",
    assignee: {
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "موقع التجارة الإلكترونية",
    status: "قيد التنفيذ",
    priority: "عالية",
    dueDate: "2024-06-25",
    createdDate: "2024-06-20",
    progress: 75,
    estimatedHours: 8,
    actualHours: 6,
    tags: ["Frontend", "React", "Authentication"],
    comments: 3,
    attachments: 2,
  },
  {
    id: 2,
    title: "تصميم واجهة لوحة التحكم",
    description: "تصميم واجهة مستخدم حديثة للوحة تحكم الإدارية",
    assignee: {
      name: "فاطمة حسن",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "نظام إدارة المحتوى",
    status: "مكتملة",
    priority: "متوسطة",
    dueDate: "2024-06-22",
    createdDate: "2024-06-15",
    progress: 100,
    estimatedHours: 12,
    actualHours: 10,
    tags: ["UI/UX", "Design", "Dashboard"],
    comments: 5,
    attachments: 8,
  },
  {
    id: 3,
    title: "إعداد قاعدة البيانات",
    description: "إنشاء وتكوين قاعدة البيانات مع الجداول الأساسية",
    assignee: {
      name: "محمد علي",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "تطبيق إدارة المشاريع",
    status: "جديدة",
    priority: "عالية",
    dueDate: "2024-06-28",
    createdDate: "2024-06-21",
    progress: 0,
    estimatedHours: 16,
    actualHours: 0,
    tags: ["Backend", "Database", "MongoDB"],
    comments: 1,
    attachments: 0,
  },
  {
    id: 4,
    title: "اختبار وظائف الدفع",
    description: "اختبار شامل لنظام الدفع الإلكتروني وبوابات الدفع",
    assignee: {
      name: "نور الدين",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "موقع التجارة الإلكترونية",
    status: "متأخرة",
    priority: "عالية",
    dueDate: "2024-06-20",
    createdDate: "2024-06-10",
    progress: 30,
    estimatedHours: 20,
    actualHours: 15,
    tags: ["Testing", "Payment", "QA"],
    comments: 7,
    attachments: 3,
  },
  {
    id: 5,
    title: "تطوير API للمنتجات",
    description: "إنشاء واجهة برمجية لإدارة المنتجات والفئات",
    assignee: {
      name: "أحمد محمود",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "تطبيق التسوق الجوال",
    status: "قيد المراجعة",
    priority: "متوسطة",
    dueDate: "2024-06-30",
    createdDate: "2024-06-18",
    progress: 90,
    estimatedHours: 24,
    actualHours: 22,
    tags: ["API", "Backend", "Products"],
    comments: 4,
    attachments: 1,
  },
  {
    id: 6,
    title: "تحديث خطة المشروع",
    description: "مراجعة وتحديث الجدول الزمني للمشروع",
    assignee: {
      name: "ليلى عبدالله",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "نظام إدارة المحتوى",
    status: "قيد التنفيذ",
    priority: "منخفضة",
    dueDate: "2024-07-01",
    createdDate: "2024-06-19",
    progress: 50,
    estimatedHours: 4,
    actualHours: 2,
    tags: ["Planning", "Management", "Timeline"],
    comments: 2,
    attachments: 5,
  },
]

const statusColors = {
  جديدة: "bg-blue-100 text-blue-700",
  "قيد التنفيذ": "bg-yellow-100 text-yellow-700",
  "قيد المراجعة": "bg-purple-100 text-purple-700",
  مكتملة: "bg-green-100 text-green-700",
  متأخرة: "bg-red-100 text-red-700",
}

const statusIcons = {
  جديدة: Clock,
  "قيد التنفيذ": AlertCircle,
  "قيد المراجعة": Eye,
  مكتملة: CheckCircle,
  متأخرة: XCircle,
}

const priorityColors = {
  منخفضة: "bg-gray-100 text-gray-700",
  متوسطة: "bg-yellow-100 text-yellow-700",
  عالية: "bg-red-100 text-red-700",
}

const priorityIcons = {
  منخفضة: Flag,
  متوسطة: Flag,
  عالية: Flag,
}

export default function TeamTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [selectedPriority, setSelectedPriority] = useState("الكل")
  const [selectedAssignee, setSelectedAssignee] = useState("الكل")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredTasks = teamTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || task.status === selectedStatus
    const matchesPriority = selectedPriority === "الكل" || task.priority === selectedPriority
    const matchesAssignee = selectedAssignee === "الكل" || task.assignee.name === selectedAssignee
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const totalTasks = teamTasks.length
  const completedTasks = teamTasks.filter((t) => t.status === "مكتملة").length
  const inProgressTasks = teamTasks.filter((t) => t.status === "قيد التنفيذ").length
  const overdueTasks = teamTasks.filter((t) => t.status === "متأخرة").length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مهام الفريق</h1>
            <p className="text-gray-600 mt-1">إدارة ومتابعة مهام أعضاء الفريق</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <Plus className="w-4 h-4 ml-2" />
                مهمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء مهمة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="task-title">عنوان المهمة</Label>
                  <Input id="task-title" placeholder="أدخل عنوان المهمة" />
                </div>
                <div>
                  <Label htmlFor="task-description">وصف المهمة</Label>
                  <Textarea id="task-description" placeholder="أدخل وصف تفصيلي للمهمة" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-assignee">المكلف بالمهمة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر عضو الفريق" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sara">سارة أحمد</SelectItem>
                        <SelectItem value="mohamed">محمد علي</SelectItem>
                        <SelectItem value="fatma">فاطمة حسن</SelectItem>
                        <SelectItem value="ahmed">أحمد محمود</SelectItem>
                        <SelectItem value="nour">نور الدين</SelectItem>
                        <SelectItem value="layla">ليلى عبدالله</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task-project">المشروع</Label>
                    <Input id="task-project" placeholder="اسم المشروع" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="task-priority">الأولوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="منخفضة">منخفضة</SelectItem>
                        <SelectItem value="متوسطة">متوسطة</SelectItem>
                        <SelectItem value="عالية">عالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task-due-date">تاريخ الاستحقاق</Label>
                    <Input id="task-due-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="task-hours">الساعات المقدرة</Label>
                    <Input id="task-hours" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="task-tags">العلامات</Label>
                  <Input id="task-tags" placeholder="Frontend, React, API (مفصولة بفاصلة)" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-600">إنشاء المهمة</Button>
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
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                  <p className="text-sm text-gray-600">إجمالي المهام</p>
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
                  <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                  <p className="text-sm text-gray-600">مهام مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
                  <p className="text-sm text-gray-600">قيد التنفيذ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{overdueTasks}</p>
                  <p className="text-sm text-gray-600">مهام متأخرة</p>
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
                  placeholder="البحث في المهام..."
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
                  <SelectItem value="جديدة">جديدة</SelectItem>
                  <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                  <SelectItem value="مكتملة">مكتملة</SelectItem>
                  <SelectItem value="متأخرة">متأخرة</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الأولويات</SelectItem>
                  <SelectItem value="منخفضة">منخفضة</SelectItem>
                  <SelectItem value="متوسطة">متوسطة</SelectItem>
                  <SelectItem value="عالية">عالية</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الأعضاء</SelectItem>
                  <SelectItem value="سارة أحمد">سارة أحمد</SelectItem>
                  <SelectItem value="محمد علي">محمد علي</SelectItem>
                  <SelectItem value="فاطمة حسن">فاطمة حسن</SelectItem>
                  <SelectItem value="أحمد محمود">أحمد محمود</SelectItem>
                  <SelectItem value="نور الدين">نور الدين</SelectItem>
                  <SelectItem value="ليلى عبدالله">ليلى عبدالله</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => {
            const StatusIcon = statusIcons[task.status]
            const PriorityIcon = priorityIcons[task.priority]
            const isOverdue = task.status === "متأخرة"

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <Badge className={statusColors[task.status]}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {task.status}
                          </Badge>
                          <Badge className={priorityColors[task.priority]}>
                            <PriorityIcon className="w-3 h-3 ml-1" />
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{task.project}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>الاستحقاق: {task.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {task.actualHours}/{task.estimatedHours} ساعة
                            </span>
                          </div>
                        </div>
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
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل المهمة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 ml-2" />
                            إضافة تعليق
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف المهمة
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback>
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{task.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-4 h-4" />
                          <span>{task.attachments}</span>
                        </div>
                      </div>
                    </div>

                    {task.status !== "مكتملة" && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">التقدم</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isOverdue
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : "bg-gradient-to-r from-violet-500 to-purple-600"
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد مهام</h3>
            <p className="text-gray-600">لم يتم العثور على مهام تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
