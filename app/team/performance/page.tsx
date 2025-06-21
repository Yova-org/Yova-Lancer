"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, CheckCircle, Star, Target, Award, Activity, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const teamPerformance = [
  {
    id: 1,
    name: "سارة أحمد",
    role: "مطورة واجهات أمامية",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 45,
    totalTasks: 50,
    hoursWorked: 168,
    efficiency: 92,
    rating: 4.8,
    onTimeDelivery: 95,
    qualityScore: 4.7,
    trend: "up",
    projects: ["موقع التجارة الإلكترونية", "تطبيق الجوال"],
  },
  {
    id: 2,
    name: "محمد علي",
    role: "مطور خلفي",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 38,
    totalTasks: 42,
    hoursWorked: 156,
    efficiency: 88,
    rating: 4.9,
    onTimeDelivery: 90,
    qualityScore: 4.8,
    trend: "up",
    projects: ["نظام إدارة المحتوى", "API المنتجات"],
  },
  {
    id: 3,
    name: "فاطمة حسن",
    role: "مصممة UI/UX",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 32,
    totalTasks: 35,
    hoursWorked: 140,
    efficiency: 85,
    rating: 4.7,
    onTimeDelivery: 88,
    qualityScore: 4.9,
    trend: "stable",
    projects: ["تصميم الهوية البصرية", "واجهات التطبيق"],
  },
  {
    id: 4,
    name: "أحمد محمود",
    role: "مطور تطبيقات جوال",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 28,
    totalTasks: 35,
    hoursWorked: 145,
    efficiency: 82,
    rating: 4.6,
    onTimeDelivery: 85,
    qualityScore: 4.5,
    trend: "down",
    projects: ["تطبيق التسوق", "تطبيق إدارة المشاريع"],
  },
  {
    id: 5,
    name: "نور الدين",
    role: "مختبر جودة",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 15,
    totalTasks: 18,
    hoursWorked: 120,
    efficiency: 78,
    rating: 4.5,
    onTimeDelivery: 82,
    qualityScore: 4.6,
    trend: "up",
    projects: ["اختبار النظام", "ضمان الجودة"],
  },
  {
    id: 6,
    name: "ليلى عبدالله",
    role: "مديرة مشاريع",
    avatar: "/placeholder.svg?height=40&width=40",
    completedTasks: 52,
    totalTasks: 55,
    hoursWorked: 180,
    efficiency: 95,
    rating: 4.9,
    onTimeDelivery: 98,
    qualityScore: 4.8,
    trend: "up",
    projects: ["إدارة جميع المشاريع"],
  },
]

const monthlyStats = {
  totalHours: 969,
  completedTasks: 210,
  averageEfficiency: 87,
  onTimeDelivery: 90,
  teamSatisfaction: 4.7,
  activeProjects: 8,
}

export default function TeamPerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("هذا الشهر")
  const [selectedMetric, setSelectedMetric] = useState("الكفاءة")

  const topPerformer = teamPerformance.reduce((prev, current) =>
    prev.efficiency > current.efficiency ? prev : current,
  )

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">أداء الفريق</h1>
            <p className="text-gray-600 mt-1">تحليل ومتابعة أداء أعضاء الفريق</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="هذا الأسبوع">هذا الأسبوع</SelectItem>
                <SelectItem value="هذا الشهر">هذا الشهر</SelectItem>
                <SelectItem value="هذا الربع">هذا الربع</SelectItem>
                <SelectItem value="هذا العام">هذا العام</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600">
              <BarChart3 className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalHours}</p>
                  <p className="text-sm text-gray-600">إجمالي الساعات</p>
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
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.completedTasks}</p>
                  <p className="text-sm text-gray-600">مهام مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.averageEfficiency}%</p>
                  <p className="text-sm text-gray-600">متوسط الكفاءة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.onTimeDelivery}%</p>
                  <p className="text-sm text-gray-600">التسليم في الوقت</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.teamSatisfaction}</p>
                  <p className="text-sm text-gray-600">رضا الفريق</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{monthlyStats.activeProjects}</p>
                  <p className="text-sm text-gray-600">مشاريع نشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performer Highlight */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-600" />
              أفضل أداء هذا الشهر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={topPerformer.avatar || "/placeholder.svg"} alt={topPerformer.name} />
                <AvatarFallback>
                  {topPerformer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{topPerformer.name}</h3>
                <p className="text-gray-600">{topPerformer.role}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{topPerformer.efficiency}% كفاءة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{topPerformer.rating} تقييم</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">{topPerformer.completedTasks} مهمة مكتملة</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">🏆 الأفضل</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>تفاصيل أداء الفريق</CardTitle>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكفاءة">الكفاءة</SelectItem>
                  <SelectItem value="المهام">المهام</SelectItem>
                  <SelectItem value="الساعات">الساعات</SelectItem>
                  <SelectItem value="التقييم">التقييم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {member.projects.map((project, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {member.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {member.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {member.trend === "stable" && <Activity className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">المهام المكتملة</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(member.completedTasks / member.totalTasks) * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {member.completedTasks}/{member.totalTasks}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">الكفاءة</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.efficiency} className="flex-1" />
                        <span className="text-sm font-medium">{member.efficiency}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">التسليم في الوقت</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.onTimeDelivery} className="flex-1" />
                        <span className="text-sm font-medium">{member.onTimeDelivery}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">التقييم</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ساعات العمل</p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{member.hoursWorked}ساعة</span>
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
