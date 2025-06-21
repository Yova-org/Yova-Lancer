"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  MoreHorizontal,
  UserPlus,
  Send,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

const teamMembers = [
  {
    id: 1,
    name: "سارة أحمد",
    role: "مطورة واجهات أمامية",
    email: "sara@example.com",
    phone: "+20 123 456 789",
    location: "القاهرة، مصر",
    joinDate: "2024-01-15",
    status: "نشط",
    rating: 4.8,
    completedTasks: 45,
    currentTasks: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    lastActive: "منذ ساعتين",
  },
  {
    id: 2,
    name: "محمد علي",
    role: "مطور خلفي",
    email: "mohamed@example.com",
    phone: "+20 123 456 790",
    location: "الإسكندرية، مصر",
    joinDate: "2024-02-01",
    status: "نشط",
    rating: 4.9,
    completedTasks: 38,
    currentTasks: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "MongoDB"],
    lastActive: "متصل الآن",
  },
  {
    id: 3,
    name: "فاطمة حسن",
    role: "مصممة UI/UX",
    email: "fatma@example.com",
    phone: "+20 123 456 791",
    location: "الجيزة، مصر",
    joinDate: "2024-03-10",
    status: "في إجازة",
    rating: 4.7,
    completedTasks: 32,
    currentTasks: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Figma", "Adobe XD", "Photoshop"],
    lastActive: "منذ 3 أيام",
  },
  {
    id: 4,
    name: "أحمد محمود",
    role: "مطور تطبيقات جوال",
    email: "ahmed@example.com",
    phone: "+20 123 456 792",
    location: "المنصورة، مصر",
    joinDate: "2024-04-05",
    status: "نشط",
    rating: 4.6,
    completedTasks: 28,
    currentTasks: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Flutter", "React Native", "Firebase"],
    lastActive: "منذ 30 دقيقة",
  },
  {
    id: 5,
    name: "نور الدين",
    role: "مختبر جودة",
    email: "nour@example.com",
    phone: "+20 123 456 793",
    location: "أسوان، مصر",
    joinDate: "2024-05-20",
    status: "غير نشط",
    rating: 4.5,
    completedTasks: 15,
    currentTasks: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Manual Testing", "Automation", "Selenium"],
    lastActive: "منذ أسبوع",
  },
  {
    id: 6,
    name: "ليلى عبدالله",
    role: "مديرة مشاريع",
    email: "layla@example.com",
    phone: "+20 123 456 794",
    location: "الأقصر، مصر",
    joinDate: "2024-01-01",
    status: "نشط",
    rating: 4.9,
    completedTasks: 52,
    currentTasks: 6,
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Project Management", "Agile", "Scrum"],
    lastActive: "منذ ساعة",
  },
]

const statusColors = {
  نشط: "bg-green-100 text-green-700",
  "في إجازة": "bg-yellow-100 text-yellow-700",
  "غير نشط": "bg-red-100 text-red-700",
}

export default function TeamMembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [selectedRole, setSelectedRole] = useState("الكل")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "الكل" || member.status === selectedStatus
    const matchesRole = selectedRole === "الكل" || member.role.includes(selectedRole)
    return matchesSearch && matchesStatus && matchesRole
  })

  const totalMembers = teamMembers.length
  const activeMembers = teamMembers.filter((m) => m.status === "نشط").length
  const totalTasks = teamMembers.reduce((sum, m) => sum + m.currentTasks, 0)
  const avgRating = teamMembers.reduce((sum, m) => sum + m.rating, 0) / teamMembers.length

  const openMessageDialog = (member) => {
    setSelectedMember(member)
    setIsMessageDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">أعضاء الفريق</h1>
            <p className="text-gray-600 mt-1">إدارة ومتابعة أعضاء الفريق الخارجي</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <UserPlus className="w-4 h-4 ml-2" />
                إضافة عضو
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة عضو جديد للفريق</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="member-name">الاسم الكامل</Label>
                    <Input id="member-name" placeholder="أدخل اسم العضو" />
                  </div>
                  <div>
                    <Label htmlFor="member-role">المنصب</Label>
                    <Input id="member-role" placeholder="أدخل منصب العضو" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="member-email">البريد الإلكتروني</Label>
                    <Input id="member-email" type="email" placeholder="example@domain.com" />
                  </div>
                  <div>
                    <Label htmlFor="member-phone">رقم الهاتف</Label>
                    <Input id="member-phone" placeholder="+20 123 456 789" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="member-location">الموقع</Label>
                  <Input id="member-location" placeholder="المدينة، البلد" />
                </div>
                <div>
                  <Label htmlFor="member-skills">المهارات</Label>
                  <Input id="member-skills" placeholder="React, Node.js, Python (مفصولة بفاصلة)" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-600">إضافة العضو</Button>
                </div>
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
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
                  <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
                  <p className="text-sm text-gray-600">أعضاء نشطون</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                  <p className="text-sm text-gray-600">مهام جارية</p>
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
                  <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">متوسط التقييم</p>
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
                  placeholder="البحث في الأعضاء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="في إجازة">في إجازة</SelectItem>
                  <SelectItem value="غير نشط">غير نشط</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع المناصب</SelectItem>
                  <SelectItem value="مطور">مطور</SelectItem>
                  <SelectItem value="مصمم">مصمم</SelectItem>
                  <SelectItem value="مدير">مدير</SelectItem>
                  <SelectItem value="مختبر">مختبر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
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
                          <Link href={`/team/members/${member.id}`}>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض الملف الشخصي
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openMessageDialog(member)}>
                          <MessageSquare className="w-4 h-4 ml-2" />
                          إرسال رسالة
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل البيانات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 ml-2" />
                          إزالة من الفريق
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={statusColors[member.status]}>{member.status}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{member.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{member.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-600">مهام مكتملة</p>
                      <p className="font-semibold">{member.completedTasks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">مهام جارية</p>
                      <p className="font-semibold">{member.currentTasks}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">المهارات:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-gray-500">آخر نشاط: {member.lastActive}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => openMessageDialog(member)}>
                      <MessageSquare className="w-4 h-4 ml-2" />
                      رسالة
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 ml-2" />
                      اتصال
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Message Dialog */}
        <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إرسال رسالة إلى {selectedMember?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="message-subject">الموضوع</Label>
                <Input id="message-subject" placeholder="موضوع الرسالة" />
              </div>
              <div>
                <Label htmlFor="message-content">الرسالة</Label>
                <Textarea id="message-content" placeholder="اكتب رسالتك هنا..." rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600">
                  <Send className="w-4 h-4 ml-2" />
                  إرسال
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد أعضاء</h3>
            <p className="text-gray-600">لم يتم العثور على أعضاء يطابقون البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
