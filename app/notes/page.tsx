"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { StickyNote, Plus, Search, Edit, Trash2, Pin, Tag, MoreHorizontal, Star, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const notes = [
  {
    id: 1,
    title: "أفكار لتطوير المنصة",
    content: "- إضافة نظام تتبع الوقت\n- تحسين واجهة المستخدم\n- إضافة تقارير متقدمة\n- تكامل مع أدوات خارجية",
    category: "أفكار",
    tags: ["تطوير", "منصة", "مميزات"],
    pinned: true,
    favorite: false,
    createdAt: "2024-06-20",
    updatedAt: "2024-06-21",
    color: "yellow",
  },
  {
    id: 2,
    title: "ملاحظات اجتماع العميل",
    content:
      "العميل يريد:\n- تغيير الألوان إلى الأزرق\n- إضافة صفحة عن الشركة\n- تحسين سرعة الموقع\n- إضافة نظام دردشة",
    category: "اجتماعات",
    tags: ["عميل", "متطلبات", "موقع"],
    pinned: false,
    favorite: true,
    createdAt: "2024-06-19",
    updatedAt: "2024-06-19",
    color: "blue",
  },
  {
    id: 3,
    title: "قائمة المهام الأسبوعية",
    content:
      "المهام المطلوبة هذا الأسبوع:\n☐ إنهاء تصميم الصفحة الرئيسية\n☑ مراجعة الكود\n☐ اختبار الموقع\n☐ تسليم المشروع",
    category: "مهام",
    tags: ["أسبوعي", "مهام", "تخطيط"],
    pinned: false,
    favorite: false,
    createdAt: "2024-06-18",
    updatedAt: "2024-06-20",
    color: "green",
  },
  {
    id: 4,
    title: "موارد تعليمية مفيدة",
    content:
      "مواقع ومصادر للتعلم:\n- React Documentation\n- Next.js Guide\n- Tailwind CSS\n- TypeScript Handbook\n- Design Patterns",
    category: "تعلم",
    tags: ["تعلم", "موارد", "برمجة"],
    pinned: false,
    favorite: true,
    createdAt: "2024-06-15",
    updatedAt: "2024-06-18",
    color: "purple",
  },
  {
    id: 5,
    title: "أسعار الخدمات 2024",
    content:
      "تحديث أسعار الخدمات:\n- تصميم موقع: 5000-15000 ج.م\n- تطوير تطبيق: 10000-30000 ج.م\n- استشارة تقنية: 500 ج.م/ساعة\n- صيانة شهرية: 1000 ج.م",
    category: "أعمال",
    tags: ["أسعار", "خدمات", "2024"],
    pinned: true,
    favorite: false,
    createdAt: "2024-06-10",
    updatedAt: "2024-06-15",
    color: "red",
  },
]

const categories = ["الكل", "أفكار", "اجتماعات", "مهام", "تعلم", "أعمال"]
const colors = ["yellow", "blue", "green", "purple", "red", "orange", "pink", "gray"]

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "الكل" || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const pinnedNotes = filteredNotes.filter((note) => note.pinned)
  const regularNotes = filteredNotes.filter((note) => !note.pinned)

  const getColorClasses = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-100 border-yellow-300"
      case "blue":
        return "bg-blue-100 border-blue-300"
      case "green":
        return "bg-green-100 border-green-300"
      case "purple":
        return "bg-purple-100 border-purple-300"
      case "red":
        return "bg-red-100 border-red-300"
      case "orange":
        return "bg-orange-100 border-orange-300"
      case "pink":
        return "bg-pink-100 border-pink-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الملاحظات</h1>
            <p className="text-gray-600 mt-1">تدوين وتنظيم الأفكار والملاحظات</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <Plus className="w-4 h-4 ml-2" />
                ملاحظة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">العنوان</Label>
                  <Input id="title" placeholder="عنوان الملاحظة" />
                </div>
                <div>
                  <Label htmlFor="content">المحتوى</Label>
                  <Textarea id="content" placeholder="اكتب ملاحظتك هنا..." className="min-h-32" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="أفكار">أفكار</SelectItem>
                        <SelectItem value="اجتماعات">اجتماعات</SelectItem>
                        <SelectItem value="مهام">مهام</SelectItem>
                        <SelectItem value="تعلم">تعلم</SelectItem>
                        <SelectItem value="أعمال">أعمال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">اللون</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اللون" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded ${getColorClasses(color)}`}></div>
                              {color}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">العلامات (مفصولة بفاصلة)</Label>
                  <Input id="tags" placeholder="علامة1, علامة2, علامة3" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button className="bg-violet-500 hover:bg-violet-600">حفظ الملاحظة</Button>
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
                  <StickyNote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الملاحظات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Pin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pinnedNotes.length}</p>
                  <p className="text-sm text-gray-600">مثبتة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notes.filter((n) => n.favorite).length}</p>
                  <p className="text-sm text-gray-600">مفضلة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                  <p className="text-sm text-gray-600">فئات</p>
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
                  placeholder="البحث في الملاحظات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
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

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Pin className="w-5 h-5 text-yellow-500" />
              الملاحظات المثبتة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`border-2 ${getColorClasses(note.color)} hover:shadow-md transition-all duration-300`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{note.category}</Badge>
                            {note.favorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
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
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 ml-2" />
                              نسخ
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pin className="w-4 h-4 ml-2" />
                              إلغاء التثبيت
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-gray-700 mb-3 line-clamp-4 whitespace-pre-line">{note.content}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>تم الإنشاء: {note.createdAt}</span>
                        <span>آخر تحديث: {note.updatedAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">جميع الملاحظات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border ${getColorClasses(note.color)} hover:shadow-md transition-all duration-300`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{note.category}</Badge>
                          {note.favorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
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
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pin className="w-4 h-4 ml-2" />
                            تثبيت
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="w-4 h-4 ml-2" />
                            إضافة للمفضلة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 ml-2" />
                            نسخ
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-4 whitespace-pre-line">{note.content}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>تم الإنشاء: {note.createdAt}</span>
                      <span>آخر تحديث: {note.updatedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ملاحظات</h3>
            <p className="text-gray-600">لم يتم العثور على ملاحظات تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
