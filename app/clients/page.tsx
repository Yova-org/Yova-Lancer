"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

const clients = [
  {
    id: 1,
    name: "شركة التقنية المتقدمة",
    email: "info@techadvanced.com",
    phone: "+966501234567",
    address: "الرياض، السعودية",
    type: "شركة",
    status: "نشط",
    projects: 3,
    totalValue: "75,000 ج.م",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: 2,
    name: "مؤسسة الإبداع",
    email: "contact@creativity.com",
    phone: "+966507654321",
    address: "جدة، السعودية",
    type: "مؤسسة",
    status: "نشط",
    projects: 2,
    totalValue: "45,000 ج.م",
    joinDate: "2024-01-01",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
  },
  {
    id: 3,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966509876543",
    address: "الدمام، السعودية",
    type: "فرد",
    status: "نشط",
    projects: 1,
    totalValue: "15,000 ج.م",
    joinDate: "2024-02-01",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: 4,
    name: "متجر الأناقة",
    email: "info@elegance.com",
    phone: "+966502468135",
    address: "الخبر، السعودية",
    type: "شركة",
    status: "غير نشط",
    projects: 1,
    totalValue: "35,000 ج.م",
    joinDate: "2024-02-15",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
  },
]

const clientTypes = ["الكل", "شركة", "مؤسسة", "فرد"]
const clientStatuses = ["الكل", "نشط", "غير نشط"]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedStatus, setSelectedStatus] = useState("الكل")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "الكل" || client.type === selectedType
    const matchesStatus = selectedStatus === "الكل" || client.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">العملاء</h1>
            <p className="text-gray-600 mt-1">إدارة قاعدة بيانات العملاء</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Plus className="w-4 h-4 ml-2" />
            عميل جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                  <p className="text-sm text-gray-600">إجمالي العملاء</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{clients.filter((c) => c.type === "شركة").length}</p>
                  <p className="text-sm text-gray-600">شركات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{clients.filter((c) => c.type === "فرد").length}</p>
                  <p className="text-sm text-gray-600">أفراد</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{clients.filter((c) => c.status === "نشط").length}</p>
                  <p className="text-sm text-gray-600">عملاء نشطين</p>
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
                  placeholder="البحث في العملاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {clientTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-violet-500 hover:bg-violet-600" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                {clientStatuses.map((status) => (
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

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <div className="flex items-center gap-1 mt-1">{renderStars(client.rating)}</div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/clients/${client.id}`}>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </Link>
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
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">{client.type}</Badge>
                    <Badge
                      className={client.status === "نشط" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    >
                      {client.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{client.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {client.joinDate}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">المشاريع</p>
                        <p className="font-semibold text-violet-600">{client.projects}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">إجمالي القيمة</p>
                        <p className="font-semibold text-violet-600">{client.totalValue}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد عملاء</h3>
            <p className="text-gray-600">لم يتم العثور على عملاء يطابقون البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
