"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CheckSquare,
  Plus,
  Search,
  Calendar,
  User,
  Flag,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard-layout"

const tasks = [
  {
    id: 1,
    title: "تطوير صفحة المشاريع",
    description: "إنشاء واجهة المستخدم لصفحة إدارة المشاريع",
    project: "منصة يوفا SaaS",
    priority: "عالية",
    status: "قيد التنفيذ",
    dueDate: "2024-06-25",
    assignee: "أحمد محمد",
    completed: false,
    estimatedHours: 8,
    actualHours: 5,
  },
  {
    id: 2,
    title: "مراجعة التصميم",
    description: "مراجعة تصميم الصفحة الرئيسية مع العميل",
    project: "موقع شركة التقنية",
    priority: "متوسطة",
    status: "مكتملة",
    dueDate: "2024-06-20",
    assignee: "أحمد محمد",
    completed: true,
    estimatedHours: 2,
    actualHours: 2,
  },
  {
    id: 3,
    title: "إعداد قاعدة البيانات",
    description: "تصميم وإعداد جداول قاعدة البيانات للمشروع",
    project: "تطبيق إدارة المخزون",
    priority: "عالية",
    status: "معلقة",
    dueDate: "2024-06-30",
    assignee: "أحمد محمد",
    completed: false,
    estimatedHours: 12,
    actualHours: 0,
  },
  {
    id: 4,
    title: "كتابة الوثائق",
    description: "توثيق API والدوال المستخدمة في المشروع",
    project: "منصة يوفا SaaS",
    priority: "منخفضة",
    status: "قيد التنفيذ",
    dueDate: "2024-07-05",
    assignee: "أحمد محمد",
    completed: false,
    estimatedHours: 6,
    actualHours: 1,
  },
]

const priorities = ["الكل", "عالية", "متوسطة", "منخفضة"]
const statuses = ["الكل", "قيد التنفيذ", "معلقة", "مكتملة"]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("الكل")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === "الكل" || task.priority === selectedPriority
    const matchesStatus = selectedStatus === "الكل" || task.status === selectedStatus
    return matchesSearch && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "bg-red-100 text-red-700"
      case "متوسطة":
        return "bg-yellow-100 text-yellow-700"
      case "منخفضة":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة":
        return "bg-green-100 text-green-700"
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-700"
      case "معلقة":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة المهام</h1>
            <p className="text-gray-600 mt-1">تنظيم ومتابعة مهام المشاريع</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <Plus className="w-4 h-4 ml-2" />
                مهمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة مهمة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">عنوان المهمة</Label>
                  <Input id="title" placeholder="أدخل عنوان المهمة" />
                </div>
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea id="description" placeholder="وصف تفصيلي للمهمة" />
                </div>
                <div>
                  <Label htmlFor="project">المشروع</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المشروع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yova">منصة يوفا SaaS</SelectItem>
                      <SelectItem value="tech">موقع شركة التقنية</SelectItem>
                      <SelectItem value="inventory">تطبيق إدارة المخزون</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">الأولوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عالية">عالية</SelectItem>
                        <SelectItem value="متوسطة">متوسطة</SelectItem>
                        <SelectItem value="منخفضة">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="estimatedHours">الساعات المقدرة</Label>
                  <Input id="estimatedHours" type="number" placeholder="عدد الساعات" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button className="bg-violet-500 hover:bg-violet-600">إضافة المهمة</Button>
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
                  <CheckSquare className="w-6 h-6 text-white" />
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
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalTasks - completedTasks}</p>
                  <p className="text-sm text-gray-600">مهام معلقة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Flag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
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
                  placeholder="البحث في المهام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-40">
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox checked={task.completed} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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

                      <div className="flex items-center gap-4 mb-3">
                        <Badge className={getPriorityColor(task.priority)}>
                          <Flag className="w-3 h-3 ml-1" />
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        <span className="text-sm text-gray-600">{task.project}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>الاستحقاق: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>مقدر: {task.estimatedHours}س</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>فعلي: {task.actualHours}س</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>التقدم</span>
                          <span>{Math.round((task.actualHours / task.estimatedHours) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مهام</h3>
            <p className="text-gray-600">لم يتم العثور على مهام تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
