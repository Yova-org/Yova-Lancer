"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  Plus,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  Wallet,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const expenses = [
  {
    id: 1,
    title: "اشتراك Adobe Creative Suite",
    category: "برامج وأدوات",
    amount: 599,
    type: "expense",
    date: "2024-06-20",
    description: "اشتراك شهري في حزمة Adobe للتصميم",
    receipt: true,
    recurring: true,
  },
  {
    id: 2,
    title: "استضافة الموقع",
    category: "خدمات تقنية",
    amount: 150,
    type: "expense",
    date: "2024-06-18",
    description: "تجديد استضافة الموقع الشخصي",
    receipt: true,
    recurring: true,
  },
  {
    id: 3,
    title: "دفعة من شركة التقنية",
    category: "دفعات العملاء",
    amount: 15000,
    type: "income",
    date: "2024-06-15",
    description: "دفعة مقابل تطوير الموقع الإلكتروني",
    receipt: false,
    recurring: false,
  },
  {
    id: 4,
    title: "معدات مكتبية",
    category: "معدات",
    amount: 800,
    type: "expense",
    date: "2024-06-10",
    description: "شراء كيبورد وماوس جديد",
    receipt: true,
    recurring: false,
  },
]

const categories = ["الكل", "برامج وأدوات", "خدمات تقنية", "دفعات العملاء", "معدات", "مواصلات", "طعام"]
const types = ["الكل", "مصروف", "دخل"]

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [selectedType, setSelectedType] = useState("الكل")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "الكل" || expense.category === selectedCategory
    const matchesType =
      selectedType === "الكل" ||
      (selectedType === "مصروف" && expense.type === "expense") ||
      (selectedType === "دخل" && expense.type === "income")
    return matchesSearch && matchesCategory && matchesType
  })

  const totalIncome = expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
  const totalExpenses = expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)
  const netProfit = totalIncome - totalExpenses

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">المصروفات والدفعات</h1>
            <p className="text-gray-600 mt-1">تتبع الدخل والمصروفات</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة معاملة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة معاملة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="type">نوع المعاملة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">دخل</SelectItem>
                        <SelectItem value="expense">مصروف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="title">العنوان</Label>
                    <Input id="title" placeholder="عنوان المعاملة" />
                  </div>
                  <div>
                    <Label htmlFor="amount">المبلغ</Label>
                    <Input id="amount" type="number" placeholder="المبلغ بالجنيه" />
                  </div>
                  <div>
                    <Label htmlFor="category">الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="برامج وأدوات">برامج وأدوات</SelectItem>
                        <SelectItem value="خدمات تقنية">خدمات تقنية</SelectItem>
                        <SelectItem value="دفعات العملاء">دفعات العملاء</SelectItem>
                        <SelectItem value="معدات">معدات</SelectItem>
                        <SelectItem value="مواصلات">مواصلات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">التاريخ</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea id="description" placeholder="وصف المعاملة" />
                  </div>
                  <div>
                    <Label htmlFor="receipt">إرفاق إيصال</Label>
                    <Input id="receipt" type="file" accept="image/*,application/pdf" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-violet-500 hover:bg-violet-600">حفظ المعاملة</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${netProfit >= 0 ? "from-blue-500 to-cyan-500" : "from-orange-500 to-red-500"} rounded-xl flex items-center justify-center`}
                >
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {netProfit.toLocaleString()} ج.م
                  </p>
                  <p className="text-sm text-gray-600">صافي الربح</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
                  <p className="text-sm text-gray-600">إجمالي المعاملات</p>
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
                  placeholder="البحث في المعاملات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">المعاملات المالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          expense.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {expense.type === "income" ? (
                          <TrendingUp className="w-6 h-6" />
                        ) : (
                          <TrendingDown className="w-6 h-6" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{expense.title}</h4>
                          <Badge variant="outline">{expense.category}</Badge>
                          {expense.recurring && <Badge className="bg-blue-100 text-blue-700">متكرر</Badge>}
                          {expense.receipt && (
                            <Badge className="bg-green-100 text-green-700">
                              <Receipt className="w-3 h-3 ml-1" />
                              إيصال
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{expense.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{expense.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            expense.type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {expense.type === "income" ? "+" : "-"}
                          {expense.amount.toLocaleString()} ج.م
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
                          {expense.receipt && (
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 ml-2" />
                              تحميل الإيصال
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد معاملات</h3>
            <p className="text-gray-600">لم يتم العثور على معاملات تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
