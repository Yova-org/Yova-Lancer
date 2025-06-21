"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Download, Target, Wallet, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const monthlyData = [
  { month: "يناير", income: 25000, expenses: 8000, profit: 17000 },
  { month: "فبراير", income: 30000, expenses: 9500, profit: 20500 },
  { month: "مارس", income: 28000, expenses: 7800, profit: 20200 },
  { month: "أبريل", income: 35000, expenses: 10200, profit: 24800 },
  { month: "مايو", income: 32000, expenses: 9800, profit: 22200 },
  { month: "يونيو", income: 38000, expenses: 11500, profit: 26500 },
]

const expenseCategories = [
  { category: "برامج وأدوات", amount: 2400, percentage: 35 },
  { category: "خدمات تقنية", amount: 1800, percentage: 26 },
  { category: "معدات", amount: 1200, percentage: 17 },
  { category: "مواصلات", amount: 800, percentage: 12 },
  { category: "أخرى", amount: 700, percentage: 10 },
]

const clientRevenue = [
  { client: "شركة التقنية المتقدمة", revenue: 45000, projects: 3 },
  { client: "مؤسسة الإبداع", revenue: 28000, projects: 2 },
  { client: "متجر الأناقة", revenue: 35000, projects: 4 },
  { client: "شركة التسوق الذكي", revenue: 22000, projects: 2 },
]

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("هذا الشهر")
  const [selectedYear, setSelectedYear] = useState("2024")

  const currentMonthData = monthlyData[monthlyData.length - 1]
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0)
  const totalProfit = totalIncome - totalExpenses
  const profitMargin = Math.round((totalProfit / totalIncome) * 100)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">التقارير المالية</h1>
            <p className="text-gray-600 mt-1">تحليل الأداء المالي والإحصائيات</p>
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
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalIncome.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">إجمالي الدخل</p>
                  <p className="text-xs text-green-600 mt-1">+12% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalExpenses.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">إجمالي المصروفات</p>
                  <p className="text-xs text-red-600 mt-1">+5% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{totalProfit.toLocaleString()} ج.م</p>
                  <p className="text-sm text-gray-600">صافي الربح</p>
                  <p className="text-xs text-green-600 mt-1">+18% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profitMargin}%</p>
                  <p className="text-sm text-gray-600">هامش الربح</p>
                  <p className="text-xs text-blue-600 mt-1">+3% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="income">تحليل الدخل</TabsTrigger>
            <TabsTrigger value="expenses">تحليل المصروفات</TabsTrigger>
            <TabsTrigger value="clients">تحليل العملاء</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Monthly Performance */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">الأداء الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{month.month}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">دخل: {month.income.toLocaleString()} ج.م</span>
                          <span className="text-red-600">مصروفات: {month.expenses.toLocaleString()} ج.م</span>
                          <span className="text-blue-600 font-semibold">ربح: {month.profit.toLocaleString()} ج.م</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>الدخل</span>
                          <span>{Math.round((month.income / 50000) * 100)}%</span>
                        </div>
                        <Progress value={(month.income / 50000) * 100} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Goals */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">الأهداف المالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">هدف الدخل الشهري</span>
                        <span className="text-sm text-gray-600">40,000 ج.م</span>
                      </div>
                      <Progress value={95} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">38,000 ج.م من 40,000 ج.م</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">هدف الربح الشهري</span>
                        <span className="text-sm text-gray-600">30,000 ج.م</span>
                      </div>
                      <Progress value={88} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">26,500 ج.م من 30,000 ج.م</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">هدف المشاريع الشهرية</span>
                        <span className="text-sm text-gray-600">5 مشاريع</span>
                      </div>
                      <Progress value={80} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">4 مشاريع من 5 مشاريع</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">هدف العملاء الجدد</span>
                        <span className="text-sm text-gray-600">3 عملاء</span>
                      </div>
                      <Progress value={67} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">2 عملاء من 3 عملاء</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            {/* Expense Categories */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل المصروفات حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{category.category}</h4>
                          <p className="text-sm text-gray-600">{category.amount.toLocaleString()} ج.م</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{category.percentage}%</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            {/* Client Revenue Analysis */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">تحليل إيرادات العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientRevenue.map((client, index) => (
                    <motion.div
                      key={client.client}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{client.client}</h4>
                          <p className="text-sm text-gray-600">{client.projects} مشاريع</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">{client.revenue.toLocaleString()} ج.م</p>
                          <p className="text-sm text-gray-600">
                            {Math.round((client.revenue / totalIncome) * 100)}% من إجمالي الدخل
                          </p>
                        </div>
                      </div>
                      <Progress value={(client.revenue / totalIncome) * 100} className="h-2" />
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
