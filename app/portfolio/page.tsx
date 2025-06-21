"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ImageIcon,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Share2,
  Calendar,
  Globe,
  Lock,
  MoreHorizontal,
  Heart,
  MessageCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard-layout"

const portfolioItems = [
  {
    id: 1,
    title: "منصة يوفا SaaS",
    description: "منصة متكاملة لإدارة أعمال المستقلين مع لوحة تحكم متقدمة وتقارير تفصيلية",
    category: "تطوير ويب",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    image: "/placeholder.svg?height=300&width=400",
    client: "مشروع شخصي",
    date: "2024-06-01",
    status: "مكتمل",
    isPublic: true,
    likes: 24,
    views: 156,
    comments: 8,
    projectUrl: "https://yova.digital",
    githubUrl: "https://github.com/ahmed/yova-saas",
  },
  {
    id: 2,
    title: "موقع شركة التقنية المتقدمة",
    description: "موقع شركة متجاوب مع تصميم حديث ونظام إدارة محتوى متكامل",
    category: "تصميم ويب",
    tags: ["WordPress", "PHP", "MySQL", "Bootstrap"],
    image: "/placeholder.svg?height=300&width=400",
    client: "شركة التقنية المتقدمة",
    date: "2024-05-15",
    status: "مكتمل",
    isPublic: true,
    likes: 18,
    views: 89,
    comments: 5,
    projectUrl: "https://techadvanced.com",
    githubUrl: null,
  },
  {
    id: 3,
    title: "تطبيق إدارة المخزون",
    description: "تطبيق ويب لإدارة المخزون مع تتبع المنتجات وتقارير المبيعات",
    category: "تطوير تطبيقات",
    tags: ["Vue.js", "Node.js", "MongoDB", "Express"],
    image: "/placeholder.svg?height=300&width=400",
    client: "متجر الأناقة",
    date: "2024-04-20",
    status: "قيد التطوير",
    isPublic: false,
    likes: 12,
    views: 45,
    comments: 3,
    projectUrl: null,
    githubUrl: "https://github.com/ahmed/inventory-app",
  },
  {
    id: 4,
    title: "هوية بصرية لمؤسسة الإبداع",
    description: "تصميم هوية بصرية متكاملة تشمل الشعار والألوان والخطوط",
    category: "تصميم جرافيك",
    tags: ["Illustrator", "Photoshop", "Branding", "Logo"],
    image: "/placeholder.svg?height=300&width=400",
    client: "مؤسسة الإبداع",
    date: "2024-03-10",
    status: "مكتمل",
    isPublic: true,
    likes: 31,
    views: 203,
    comments: 12,
    projectUrl: null,
    githubUrl: null,
  },
]

const categories = ["الكل", "تطوير ويب", "تصميم ويب", "تطوير تطبيقات", "تصميم جرافيك"]
const statuses = ["الكل", "مكتمل", "قيد التطوير", "متوقف"]

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState("https://yova.digital/portfolio/ahmed-mohamed")

  const filteredItems = portfolioItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "الكل" || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const copyPortfolioUrl = () => {
    navigator.clipboard.writeText(portfolioUrl)
    // يمكن إضافة toast notification هنا
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-700"
      case "قيد التطوير":
        return "bg-blue-100 text-blue-700"
      case "متوقف":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">معرض الأعمال</h1>
            <p className="text-gray-600 mt-1">عرض وإدارة أعمالك ومشاريعك</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={copyPortfolioUrl}>
              <Copy className="w-4 h-4 ml-2" />
              نسخ الرابط
            </Button>
            <Button variant="outline" asChild>
              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة المعرض
              </a>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة عمل جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة عمل جديد</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">عنوان العمل</Label>
                      <Input id="title" placeholder="اسم المشروع" />
                    </div>
                    <div>
                      <Label htmlFor="category">التصنيف</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر التصنيف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-dev">تطوير ويب</SelectItem>
                          <SelectItem value="web-design">تصميم ويب</SelectItem>
                          <SelectItem value="app-dev">تطوير تطبيقات</SelectItem>
                          <SelectItem value="graphic">تصميم جرافيك</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea id="description" placeholder="وصف مفصل للمشروع" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client">العميل</Label>
                      <Input id="client" placeholder="اسم العميل" />
                    </div>
                    <div>
                      <Label htmlFor="date">تاريخ الإنجاز</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tags">التقنيات المستخدمة</Label>
                    <Input id="tags" placeholder="React, Next.js, TypeScript (مفصولة بفاصلة)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectUrl">رابط المشروع</Label>
                      <Input id="projectUrl" placeholder="https://example.com" />
                    </div>
                    <div>
                      <Label htmlFor="githubUrl">رابط GitHub</Label>
                      <Input id="githubUrl" placeholder="https://github.com/user/repo" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="isPublic" />
                    <Label htmlFor="isPublic">عرض في المعرض العام</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-violet-500 hover:bg-violet-600">حفظ العمل</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Portfolio URL Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-violet-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">رابط معرض الأعمال</h3>
                  <p className="text-sm text-gray-600">شارك هذا الرابط مع عملائك لعرض أعمالك</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 font-mono text-sm text-gray-700">
                  {portfolioUrl}
                </div>
                <Button variant="outline" size="sm" onClick={copyPortfolioUrl}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{portfolioItems.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الأعمال</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioItems.filter((item) => item.isPublic).length}
                  </p>
                  <p className="text-sm text-gray-600">أعمال عامة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioItems.reduce((acc, item) => acc + item.views, 0)}
                  </p>
                  <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {portfolioItems.reduce((acc, item) => acc + item.likes, 0)}
                  </p>
                  <p className="text-sm text-gray-600">إجمالي الإعجابات</p>
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
                  placeholder="البحث في الأعمال..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-violet-500 hover:bg-violet-600" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                {statuses.map((status) => (
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    {item.isPublic ? (
                      <Badge className="bg-green-100 text-green-700">
                        <Globe className="w-3 h-3 ml-1" />
                        عام
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">
                        <Lock className="w-3 h-3 ml-1" />
                        خاص
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 ml-2" />
                          معاينة
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 ml-2" />
                          مشاركة
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item.projectUrl && (
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 ml-2" />
                          المشروع
                        </a>
                      </Button>
                    )}
                    {item.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 ml-2" />
                          الكود
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أعمال</h3>
            <p className="text-gray-600">لم يتم العثور على أعمال تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
