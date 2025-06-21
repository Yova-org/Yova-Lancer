"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FolderOpen,
  Plus,
  Search,
  Clock,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const projects = [
  {
    id: 1,
    name: "تطوير موقع شركة التقنية",
    client: "شركة التقنية المتقدمة",
    status: "قيد التنفيذ",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    budget: "25,000 ج.م",
    color: "bg-blue-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "تصميم هوية بصرية",
    client: "مؤسسة الإبداع",
    status: "مكتمل",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    budget: "15,000 ج.م",
    color: "bg-green-500",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "تطبيق إدارة المخزون",
    client: "متجر الأناقة",
    status: "قيد التنفيذ",
    progress: 45,
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    budget: "35,000 ج.م",
    color: "bg-purple-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 4,
    name: "موقع تجارة إلكترونية",
    client: "شركة التسوق الذكي",
    status: "متوقف",
    progress: 20,
    startDate: "2024-01-20",
    endDate: "2024-05-20",
    budget: "50,000 ج.م",
    color: "bg-red-500",
    statusColor: "bg-red-100 text-red-700",
  },
]

const statusIcons = {
  "قيد التنفيذ": PlayCircle,
  مكتمل: CheckCircle,
  متوقف: AlertCircle,
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || project.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">المشاريع</h1>
            <p className="text-gray-600 mt-1">إدارة جميع مشاريعك في مكان واحد</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Plus className="w-4 h-4 ml-2" />
            مشروع جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                  <p className="text-sm text-gray-600">إجمالي المشاريع</p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter((p) => p.status === "مكتمل").length}
                  </p>
                  <p className="text-sm text-gray-600">مشاريع مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter((p) => p.status === "قيد التنفيذ").length}
                  </p>
                  <p className="text-sm text-gray-600">قيد التنفيذ</p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                  </p>
                  <p className="text-sm text-gray-600">متوسط الإنجاز</p>
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
                  placeholder="البحث في المشاريع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {["الكل", "قيد التنفيذ", "مكتمل", "متوقف"].map((status) => (
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const StatusIcon = statusIcons[project.status as keyof typeof statusIcons]
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span>{project.client}</span>
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
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge className={project.statusColor}>
                      <StatusIcon className="w-3 h-3 ml-1" />
                      {project.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">التقدم</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">تاريخ البداية</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">تاريخ النهاية</p>
                        <p className="font-medium">{project.endDate}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">الميزانية</span>
                        <span className="font-semibold text-violet-600">{project.budget}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع</h3>
            <p className="text-gray-600">لم يتم العثور على مشاريع تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
