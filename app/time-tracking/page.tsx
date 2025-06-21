"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Square, Clock, Calendar, BarChart3, Plus, Edit, Trash2, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

const timeEntries = [
  {
    id: 1,
    project: "منصة يوفا SaaS",
    task: "تطوير صفحة المشاريع",
    startTime: "09:00",
    endTime: "12:30",
    duration: "3:30",
    date: "2024-06-21",
    status: "مكتمل",
    hourlyRate: 50,
  },
  {
    id: 2,
    project: "موقع شركة التقنية",
    task: "تصميم الصفحة الرئيسية",
    startTime: "14:00",
    endTime: "17:15",
    duration: "3:15",
    date: "2024-06-21",
    status: "مكتمل",
    hourlyRate: 45,
  },
  {
    id: 3,
    project: "تطبيق إدارة المخزون",
    task: "برمجة API للمنتجات",
    startTime: "10:00",
    endTime: null,
    duration: "2:45",
    date: "2024-06-21",
    status: "جاري",
    hourlyRate: 55,
  },
]

const projects = [
  { id: 1, name: "منصة يوفا SaaS", client: "مشروع شخصي", rate: 50 },
  { id: 2, name: "موقع شركة التقنية", client: "شركة التقنية المتقدمة", rate: 45 },
  { id: 3, name: "تطبيق إدارة المخزون", client: "متجر الأناقة", rate: 55 },
]

export default function TimeTrackingPage() {
  const [currentTimer, setCurrentTimer] = useState<{
    project: string
    task: string
    startTime: Date
    elapsed: number
  } | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedDate, setSelectedDate] = useState("اليوم")

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentTimer) {
      interval = setInterval(() => {
        setCurrentTimer((prev) => (prev ? { ...prev, elapsed: prev.elapsed + 1 } : null))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentTimer])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = (project: string, task: string) => {
    setCurrentTimer({
      project,
      task,
      startTime: new Date(),
      elapsed: 0,
    })
  }

  const pauseTimer = () => {
    // Logic to pause timer
  }

  const stopTimer = () => {
    if (currentTimer) {
      // Save time entry
      setCurrentTimer(null)
    }
  }

  const totalHoursToday = timeEntries
    .filter((entry) => entry.date === "2024-06-21")
    .reduce((acc, entry) => {
      const [hours, minutes] = entry.duration.split(":").map(Number)
      return acc + hours + minutes / 60
    }, 0)

  const totalEarningsToday = timeEntries
    .filter((entry) => entry.date === "2024-06-21")
    .reduce((acc, entry) => {
      const [hours, minutes] = entry.duration.split(":").map(Number)
      const totalHours = hours + minutes / 60
      return acc + totalHours * entry.hourlyRate
    }, 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تتبع الوقت</h1>
            <p className="text-gray-600 mt-1">تتبع وقت العمل على المشاريع</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة وقت يدوياً
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة وقت يدوياً</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="project">المشروع</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المشروع" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.name}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task">المهمة</Label>
                    <Input id="task" placeholder="وصف المهمة" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">وقت البداية</Label>
                      <Input id="startTime" type="time" />
                    </div>
                    <div>
                      <Label htmlFor="endTime">وقت النهاية</Label>
                      <Input id="endTime" type="time" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="date">التاريخ</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-violet-500 hover:bg-violet-600">حفظ</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Current Timer */}
        {currentTimer && (
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentTimer.project}</h3>
                    <p className="text-sm text-gray-600">{currentTimer.task}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{formatTime(currentTimer.elapsed)}</div>
                    <div className="text-sm text-gray-600">
                      بدأ في{" "}
                      {currentTimer.startTime.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={pauseTimer}>
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={stopTimer}>
                      <Square className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Start Timer */}
        {!currentTimer && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">بدء تتبع الوقت</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => startTimer(project.name, "مهمة جديدة")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{project.client}</p>
                    <p className="text-sm text-violet-600 font-medium">{project.rate} ج.م/ساعة</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalHoursToday.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">ساعات اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalEarningsToday.toFixed(0)} ج.م</p>
                  <p className="text-sm text-gray-600">أرباح اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">32.5</p>
                  <p className="text-sm text-gray-600">ساعات الأسبوع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,625 ج.م</p>
                  <p className="text-sm text-gray-600">أرباح الأسبوع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="جميع المشاريع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المشاريع</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="اليوم">اليوم</SelectItem>
                  <SelectItem value="أمس">أمس</SelectItem>
                  <SelectItem value="هذا الأسبوع">هذا الأسبوع</SelectItem>
                  <SelectItem value="هذا الشهر">هذا الشهر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Time Entries */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">سجل الأوقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{entry.project}</h4>
                        <Badge
                          className={
                            entry.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{entry.task}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{entry.date}</span>
                        <span>
                          {entry.startTime} - {entry.endTime || "جاري"}
                        </span>
                        <span className="font-medium text-violet-600">{entry.hourlyRate} ج.م/ساعة</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{entry.duration}</div>
                        <div className="text-sm text-gray-600">
                          {(Number.parseFloat(entry.duration.replace(":", ".")) * entry.hourlyRate).toFixed(0)} ج.م
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
