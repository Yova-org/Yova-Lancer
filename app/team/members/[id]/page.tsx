"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  Edit,
  Trash2,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  FileText,
  Send,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

// Mock data - في التطبيق الحقيقي ستأتي من API
const getMemberById = (id: string) => {
  const members = {
    "1": {
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
      avatar: "/placeholder.svg?height=120&width=120",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "JavaScript", "HTML/CSS"],
      lastActive: "منذ ساعتين",
      bio: "مطورة واجهات أمامية متخصصة في React و TypeScript مع خبرة 5 سنوات في تطوير تطبيقات الويب الحديثة.",
      experience: "5 سنوات",
      education: "بكالوريوس علوم الحاسوب - جامعة القاهرة",
      languages: ["العربية", "الإنجليزية"],
      hourlyRate: "25 $/ساعة",
      totalHours: 1250,
      projects: [
        {
          id: 1,
          name: "تطبيق التجارة الإلكترونية",
          status: "مكتمل",
          progress: 100,
          startDate: "2024-01-01",
          endDate: "2024-03-15",
          role: "مطور أساسي",
        },
        {
          id: 2,
          name: "منصة إدارة المحتوى",
          status: "جاري",
          progress: 75,
          startDate: "2024-03-20",
          endDate: "2024-05-30",
          role: "مطور أساسي",
        },
        {
          id: 3,
          name: "تطبيق الحجوزات",
          status: "جاري",
          progress: 30,
          startDate: "2024-04-10",
          endDate: "2024-06-15",
          role: "مطور مساعد",
        },
      ],
      recentTasks: [
        {
          id: 1,
          title: "تطوير صفحة الدفع",
          project: "تطبيق التجارة الإلكترونية",
          status: "مكتمل",
          priority: "عالية",
          dueDate: "2024-01-20",
          completedDate: "2024-01-18",
        },
        {
          id: 2,
          title: "إصلاح مشكلة التصميم المتجاوب",
          project: "منصة إدارة المحتوى",
          status: "جاري",
          priority: "متوسطة",
          dueDate: "2024-01-25",
        },
        {
          id: 3,
          title: "تحسين أداء التطبيق",
          project: "تطبيق الحجوزات",
          status: "معلق",
          priority: "منخفضة",
          dueDate: "2024-01-30",
        },
      ],
      performance: {
        onTimeDelivery: 92,
        codeQuality: 88,
        communication: 95,
        teamwork: 90,
        problemSolving: 85,
      },
      achievements: [
        {
          title: "أفضل مطور للشهر",
          date: "ديسمبر 2023",
          description: "حصلت على لقب أفضل مطور لشهر ديسمبر لإنجازها المتميز",
        },
        {
          title: "إكمال 50 مهمة",
          date: "نوفمبر 2023",
          description: "أكملت 50 مهمة بنجاح مع معدل جودة عالي",
        },
      ],
    },
    // يمكن إضافة المزيد من الأعضاء هنا
  }
  return members[id] || null
}

const statusColors = {
  نشط: "bg-green-100 text-green-700",
  "في إجازة": "bg-yellow-100 text-yellow-700",
  "غير نشط": "bg-red-100 text-red-700",
}

const taskStatusColors = {
  مكتمل: "bg-green-100 text-green-700",
  جاري: "bg-blue-100 text-blue-700",
  معلق: "bg-yellow-100 text-yellow-700",
  ملغي: "bg-red-100 text-red-700",
}

const priorityColors = {
  عالية: "bg-red-100 text-red-700",
  متوسطة: "bg-yellow-100 text-yellow-700",
  منخفضة: "bg-green-100 text-green-700",
}

export default function MemberProfilePage() {
  const params = useParams()
  const memberId = params.id as string
  const member = getMemberById(memberId)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  if (!member) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">العضو غير موجود</h1>
          <Link href="/team/members">
            <Button>العودة لقائمة الأعضاء</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/team/members">
            <Button variant="ghost" size="icon">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ملف {member.name}</h1>
            <p className="text-gray-600 mt-1">معلومات مفصلة عن عضو الفريق</p>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-2xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-lg">{member.rating}</span>
                  </div>
                  <Badge className={statusColors[member.status]}>{member.status}</Badge>
                </div>
                <p className="text-sm text-gray-500 text-center md:text-right">آخر نشاط: {member.lastActive}</p>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                  <p className="text-lg text-violet-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 mt-2">{member.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>انضم في {member.joinDate}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">الخبرة: </span>
                      <span className="font-medium">{member.experience}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">التعليم: </span>
                      <span className="font-medium">{member.education}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">السعر بالساعة: </span>
                      <span className="font-medium text-violet-600">{member.hourlyRate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">إجمالي الساعات: </span>
                      <span className="font-medium">{member.totalHours} ساعة</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-violet-500 to-purple-600">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        إرسال رسالة
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>إرسال رسالة إلى {member.name}</DialogTitle>
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

                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Edit className="w-4 h-4 ml-2" />
                        تعديل البيانات
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>تعديل بيانات {member.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-name">الاسم الكامل</Label>
                            <Input id="edit-name" defaultValue={member.name} />
                          </div>
                          <div>
                            <Label htmlFor="edit-role">المنصب</Label>
                            <Input id="edit-role" defaultValue={member.role} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                            <Input id="edit-email" defaultValue={member.email} />
                          </div>
                          <div>
                            <Label htmlFor="edit-phone">رقم الهاتف</Label>
                            <Input id="edit-phone" defaultValue={member.phone} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="edit-bio">نبذة شخصية</Label>
                          <Textarea id="edit-bio" defaultValue={member.bio} rows={3} />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            إلغاء
                          </Button>
                          <Button className="bg-gradient-to-r from-violet-500 to-purple-600">حفظ التغييرات</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 ml-2" />
                    إزالة من الفريق
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.completedTasks}</p>
                  <p className="text-sm text-gray-600">مهام مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.currentTasks}</p>
                  <p className="text-sm text-gray-600">مهام جارية</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.projects.length}</p>
                  <p className="text-sm text-gray-600">مشاريع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{member.performance.onTimeDelivery}%</p>
                  <p className="text-sm text-gray-600">التسليم في الوقت</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="projects">المشاريع</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>المهارات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-violet-50 text-violet-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>اللغات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {member.languages.map((language, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                        <span>{language}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">المشاريع ({member.projects.length})</h3>
            </div>
            <div className="grid gap-4">
              {member.projects.map((project) => (
                <Card key={project.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.role}</p>
                      </div>
                      <Badge
                        className={
                          project.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-4">
                      <span>البداية: {project.startDate}</span>
                      <span>النهاية: {project.endDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">المهام الأخيرة</h3>
              <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مهمة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة مهمة جديدة لـ {member.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="task-title">عنوان المهمة</Label>
                      <Input id="task-title" placeholder="أدخل عنوان المهمة" />
                    </div>
                    <div>
                      <Label htmlFor="task-project">المشروع</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المشروع" />
                        </SelectTrigger>
                        <SelectContent>
                          {member.projects.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="task-priority">الأولوية</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الأولوية" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="عالية">عالية</SelectItem>
                            <SelectItem value="متوسطة">متوسطة</SelectItem>
                            <SelectItem value="منخفضة">منخفضة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-due">تاريخ الاستحقاق</Label>
                        <Input id="task-due" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="task-description">الوصف</Label>
                      <Textarea id="task-description" placeholder="وصف المهمة..." rows={3} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-gradient-to-r from-violet-500 to-purple-600">إضافة المهمة</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {member.recentTasks.map((task) => (
                <Card key={task.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{task.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                        <Badge className={taskStatusColors[task.status]}>{task.status}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.project}</p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>الاستحقاق: {task.dueDate}</span>
                      {task.completedDate && <span>اكتمل في: {task.completedDate}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>مقاييس الأداء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(member.performance).map(([key, value]) => {
                  const labels = {
                    onTimeDelivery: "التسليم في الوقت",
                    codeQuality: "جودة الكود",
                    communication: "التواصل",
                    teamwork: "العمل الجماعي",
                    problemSolving: "حل المشاكل",
                  }
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{labels[key]}</span>
                        <span className="font-bold text-violet-600">{value}%</span>
                      </div>
                      <Progress value={value} className="h-3" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4">
              {member.achievements.map((achievement, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
