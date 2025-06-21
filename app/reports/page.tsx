"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, CreditCard, FolderOpen, CheckSquare, Download, DollarSign, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

// Sample data for reports
const clientsAnalytics = [
  { name: "شركة التقنية المتقدمة", projects: 5, revenue: 75000, status: "نشط", satisfaction: 95 },
  { name: "مؤسسة الإبداع", projects: 3, revenue: 45000, status: "نشط", satisfaction: 88 },
  { name: "متجر الأناقة", projects: 4, revenue: 35000, status: "مكتمل", satisfaction: 92 },
  { name: "شركة التسوق الذكي", projects: 2, revenue: 28000, status: "نشط", satisfaction: 85 },
]

const paymentsAnalytics = [
  { month: "يناير", paid: 25000, pending: 8000, overdue: 2000 },
  { month: "فبراير", paid: 30000, pending: 12000, overdue: 1500 },
  { month: "مارس", paid: 28000, pending: 15000, overdue: 3000 },
  { month: "أبريل", paid: 35000, pending: 10000, overdue: 2500 },
  { month: "مايو", paid: 32000, pending: 18000, overdue: 1000 },
  { month: "يونيو", paid: 38000, pending: 22000, overdue: 4000 },
]

const projectsAnalytics = [
  { name: "تطوير موقع شركة التقنية", status: "قيد التنفيذ", progress: 75, budget: 25000, spent: 18000 },
  { name: "تصميم هوية بصرية", status: "مكتمل", progress: 100, budget: 15000, spent: 14500 },
  { name: "تطبيق إدارة المخزون", status: "قيد التنفيذ", progress: 45, budget: 35000, spent: 15000 },
  { name: "موقع التجارة الإلكترونية", status: "متأخر", progress: 30, budget: 40000, spent: 20000 },
]

const tasksAnalytics = [
  { category: "تطوير", completed: 45, pending: 12, overdue: 3 },
  { category: "تصميم", completed: 32, pending: 8, overdue: 1 },
  { category: "مراجعة", completed: 28, pending: 5, overdue: 2 },
  { category: "اختبار", completed: 15, pending: 7, overdue: 1 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("هذا الشهر")
  const [selectedReport, setSelectedReport] = useState("overview")

  const totalRevenue = clientsAnalytics.reduce((sum, client) => sum + client.revenue, 0)
  const totalProjects = clientsAnalytics.reduce((sum, client) => sum + client.projects, 0)
  const activeClients = clientsAnalytics.filter((client) => client.status === "نشط").length
  const avgSatisfaction = Math.round(
    clientsAnalytics.reduce((sum, client) => sum + client.satisfaction, 0) / clientsAnalytics.length,
  )

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">التقارير والتحليلات</h1>
            <p className="text-gray-600 mt-1">تحليل شامل لأداء العمل والعملاء</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="هذا الشهر">هذا الشهر</SelectItem>
                <SelectItem value="الشهر الماضي">الشهر الماضي</SelectItem>
                <SelectItem value="آخر 3 شهور">آخر 3 شهور</SelectItem>
                <SelectItem value="هذا العام">هذا العام</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600">
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
                  <p className="text-sm text-gray-600">عملاء نشطين</p>
                  <p className="text-xs text-green-600 mt-1">+12% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                  <p className="text-xs text-green-600 mt-1">+18% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
                  <p className="text-sm text-gray-600">إجمالي المشاريع</p>
                  <p className="text-xs text-blue-600 mt-1">+8% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{avgSatisfaction}%</p>
                  <p className="text-sm text-gray-600">رضا العملاء</p>
                  <p className="text-xs text-green-600 mt-1">+5% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              العملاء
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              المدفوعات
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              المشاريع
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              المهام
            </TabsTrigger>
          </TabsList>

          {/* Clients Analytics */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل أداء العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientsAnalytics.map((client, index) => (
                    <motion.div
                      key={client.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{client.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={client.status === "نشط" ? "default" : "secondary"}>{client.status}</Badge>
                            <span className="text-sm text-gray-600">{client.projects} مشاريع</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">{client.revenue.toLocaleString()} ج.م</p>
                          <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>رضا العميل</span>
                            <span>{client.satisfaction}%</span>
                          </div>
                          <Progress value={client.satisfaction} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>مساهمة في الإيرادات</span>
                            <span>{Math.round((client.revenue / totalRevenue) * 100)}%</span>
                          </div>
                          <Progress value={(client.revenue / totalRevenue) * 100} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Analytics */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل المدفوعات والفواتير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentsAnalytics.map((month, index) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{month.month}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>مدفوع: {month.paid.toLocaleString()} ج.م</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>معلق: {month.pending.toLocaleString()} ج.م</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>متأخر: {month.overdue.toLocaleString()} ج.م</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>معدل التحصيل</span>
                          <span>{Math.round((month.paid / (month.paid + month.pending + month.overdue)) * 100)}%</span>
                        </div>
                        <Progress
                          value={(month.paid / (month.paid + month.pending + month.overdue)) * 100}
                          className="h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Analytics */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل أداء المشاريع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectsAnalytics.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <Badge
                            variant={
                              project.status === "مكتمل"
                                ? "default"
                                : project.status === "متأخر"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="mt-1"
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{project.progress}%</p>
                          <p className="text-sm text-gray-600">مكتمل</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">الميزانية</p>
                          <p className="font-semibold text-gray-900">{project.budget.toLocaleString()} ج.م</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">المنفق</p>
                          <p className="font-semibold text-gray-900">{project.spent.toLocaleString()} ج.م</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>استخدام الميزانية</span>
                          <span>{Math.round((project.spent / project.budget) * 100)}%</span>
                        </div>
                        <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Analytics */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل أداء المهام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasksAnalytics.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{category.category}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>مكتمل: {category.completed}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>قيد التنفيذ: {category.pending}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>متأخر: {category.overdue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>معدل الإنجاز</span>
                          <span>
                            {Math.round(
                              (category.completed / (category.completed + category.pending + category.overdue)) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (category.completed / (category.completed + category.pending + category.overdue)) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
