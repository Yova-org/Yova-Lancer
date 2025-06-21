"use client"

import { motion } from "framer-motion"
import {
  FolderOpen,
  Users,
  Calendar,
  CreditCard,
  DollarSign,
  Clock,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

const stats = [
  {
    title: "إجمالي المشاريع",
    value: "24",
    change: "+12%",
    icon: FolderOpen,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
  },
  {
    title: "العملاء النشطين",
    value: "18",
    change: "+8%",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "الإيرادات الشهرية",
    value: "45,280 ج.م",
    change: "+23%",
    icon: DollarSign,
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
  },
  {
    title: "ساعات العمل",
    value: "156",
    change: "+5%",
    icon: Clock,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    title: "الإيرادات المعلقة",
    value: "28,500 ج.م",
    change: "+15%",
    icon: Clock,
    gradient: "from-yellow-500 to-amber-500",
    bgGradient: "from-yellow-50 to-amber-50",
  },
]

const recentProjects = [
  {
    name: "تطوير موقع شركة التقنية",
    client: "شركة التقنية المتقدمة",
    status: "قيد التنفيذ",
    progress: 75,
    color: "bg-blue-500",
  },
  {
    name: "تصميم هوية بصرية",
    client: "مؤسسة الإبداع",
    status: "مكتمل",
    progress: 100,
    color: "bg-green-500",
  },
  {
    name: "تطبيق إدارة المخزون",
    client: "متجر الأناقة",
    status: "قيد التنفيذ",
    progress: 45,
    color: "bg-purple-500",
  },
]

const upcomingMeetings = [
  { title: "مراجعة المشروع", client: "شركة التقنية", time: "2:00 م", date: "اليوم" },
  { title: "عرض التصميم النهائي", client: "مؤسسة الإبداع", time: "10:00 ص", date: "غداً" },
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">مرحباً بك، أحمد! 👋</h1>
              <p className="text-violet-100 mb-6 text-lg">لديك 3 مشاريع تحتاج متابعة و 2 اجتماع اليوم</p>
              <Button className="bg-white text-violet-600 hover:bg-violet-50 font-medium">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء مشروع جديد
              </Button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full"></div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">المشاريع الحديثة</CardTitle>
                    <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                      عرض الكل
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <Badge
                          className={
                            project.status === "مكتمل"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.client}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${project.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Meetings */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">الاجتماعات القادمة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-blue-50 border border-blue-100"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{meeting.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{meeting.client}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {meeting.time} - {meeting.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-md">
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء مشروع جديد
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-gray-50">
                    <Users className="w-4 h-4 ml-2" />
                    إضافة عميل جديد
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-gray-50">
                    <Calendar className="w-4 h-4 ml-2" />
                    جدولة اجتماع
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-gray-50">
                    <CreditCard className="w-4 h-4 ml-2" />
                    إنشاء فاتورة
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
