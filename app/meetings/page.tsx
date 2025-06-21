"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Plus,
  Search,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

const meetings = [
  {
    id: 1,
    title: "مراجعة المشروع الأول",
    client: "شركة التقنية المتقدمة",
    date: "2024-06-21",
    time: "14:00",
    duration: "60 دقيقة",
    type: "أونلاين",
    status: "مجدول",
    location: "Zoom Meeting",
    notes: "مراجعة التقدم في المشروع ومناقشة المرحلة التالية",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "عرض التصميم النهائي",
    client: "مؤسسة الإبداع",
    date: "2024-06-22",
    time: "10:00",
    duration: "45 دقيقة",
    type: "حضوري",
    status: "مجدول",
    location: "مكتب العميل - الرياض",
    notes: "عرض التصميم النهائي للهوية البصرية",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "اجتماع بداية المشروع",
    client: "متجر الأناقة",
    date: "2024-06-20",
    time: "16:00",
    duration: "90 دقيقة",
    type: "أونلاين",
    status: "مكتمل",
    location: "Google Meet",
    notes: "مناقشة متطلبات المشروع والجدول الزمني",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "متابعة التطوير",
    client: "شركة التسوق الذكي",
    date: "2024-06-19",
    time: "11:00",
    duration: "30 دقيقة",
    type: "هاتفي",
    status: "ملغي",
    location: "مكالمة هاتفية",
    notes: "متابعة سريعة لحالة التطوير",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const meetingTypes = ["الكل", "أونلاين", "حضوري", "هاتفي"]
const meetingStatuses = ["الكل", "مجدول", "مكتمل", "ملغي"]

const statusIcons = {
  مجدول: PlayCircle,
  مكتمل: CheckCircle,
  ملغي: AlertCircle,
}

const typeIcons = {
  أونلاين: Video,
  حضوري: MapPin,
  هاتفي: Phone,
}

export default function MeetingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedStatus, setSelectedStatus] = useState("الكل")

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "الكل" || meeting.type === selectedType
    const matchesStatus = selectedStatus === "الكل" || meeting.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مجدول":
        return "bg-blue-100 text-blue-700"
      case "مكتمل":
        return "bg-green-100 text-green-700"
      case "ملغي":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "أونلاين":
        return "bg-purple-100 text-purple-700"
      case "حضوري":
        return "bg-orange-100 text-orange-700"
      case "هاتفي":
        return "bg-green-100 text-green-700"
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
            <h1 className="text-3xl font-bold text-gray-900">الاجتماعات</h1>
            <p className="text-gray-600 mt-1">إدارة وجدولة جميع اجتماعاتك</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            <Plus className="w-4 h-4 ml-2" />
            اجتماع جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
                  <p className="text-sm text-gray-600">إجمالي الاجتماعات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter((m) => m.status === "مجدول").length}
                  </p>
                  <p className="text-sm text-gray-600">مجدولة</p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter((m) => m.status === "مكتمل").length}
                  </p>
                  <p className="text-sm text-gray-600">مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter((m) => m.type === "أونلاين").length}
                  </p>
                  <p className="text-sm text-gray-600">أونلاين</p>
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
                  placeholder="البحث في الاجتماعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {meetingTypes.map((type) => (
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
                {meetingStatuses.map((status) => (
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

        {/* Meetings List */}
        <div className="space-y-4">
          {filteredMeetings.map((meeting, index) => {
            const StatusIcon = statusIcons[meeting.status as keyof typeof statusIcons]
            const TypeIcon = typeIcons[meeting.type as keyof typeof typeIcons]

            return (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={meeting.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{meeting.client.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <User className="w-4 h-4" />
                                <span>{meeting.client}</span>
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
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStatusColor(meeting.status)}>
                              <StatusIcon className="w-3 h-3 ml-1" />
                              {meeting.status}
                            </Badge>
                            <Badge className={getTypeColor(meeting.type)}>
                              <TypeIcon className="w-3 h-3 ml-1" />
                              {meeting.type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{meeting.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>
                                {meeting.time} ({meeting.duration})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{meeting.location}</span>
                            </div>
                          </div>

                          {meeting.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{meeting.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد اجتماعات</h3>
            <p className="text-gray-600">لم يتم العثور على اجتماعات تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
