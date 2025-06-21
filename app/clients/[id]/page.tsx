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
  FileText,
  DollarSign,
  Clock,
  TrendingUp,
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
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

// Mock data - في التطبيق الحقيقي ستأتي من API
const getClientById = (id: string) => {
  const clients = {
    "1": {
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
      avatar: "/placeholder.svg?height=120&width=120",
      rating: 5,
      description:
        "شركة رائدة في مجال التكنولوجيا والحلول الرقمية، تركز على تطوير التطبيقات والمواقع الإلكترونية المتقدمة.",
      industry: "التكنولوجيا",
      companySize: "50-100 موظف",
      website: "www.techadvanced.com",
      taxId: "123456789",
      contactPerson: "أحمد محمد",
      contactTitle: "مدير التطوير",
      preferredCommunication: "البريد الإلكتروني",
      timezone: "GMT+3",
      projects: [
        {
          id: 1,
          name: "تطوير موقع الشركة",
          status: "مكتمل",
          value: "25,000 ج.م",
          startDate: "2024-01-01",
          endDate: "2024-02-15",
          progress: 100,
        },
        {
          id: 2,
          name: "تطبيق إدارة العملاء",
          status: "جاري",
          value: "35,000 ج.م",
          startDate: "2024-02-20",
          endDate: "2024-04-30",
          progress: 65,
        },
        {
          id: 3,
          name: "نظام إدارة المخزون",
          status: "معلق",
          value: "15,000 ج.م",
          startDate: "2024-05-01",
          endDate: "2024-06-30",
          progress: 0,
        },
      ],
      invoices: [
        {
          id: 1,
          number: "INV-001",
          amount: "25,000 ج.م",
          status: "مدفوع",
          dueDate: "2024-02-15",
          paidDate: "2024-02-10",
        },
        {
          id: 2,
          number: "INV-002",
          amount: "17,500 ج.م",
          status: "مدفوع",
          dueDate: "2024-03-15",
          paidDate: "2024-03-12",
        },
        {
          id: 3,
          number: "INV-003",
          amount: "17,500 ج.م",
          status: "معلق",
          dueDate: "2024-04-15",
        },
      ],
      communications: [
        {
          id: 1,
          type: "بريد إلكتروني",
          subject: "مراجعة التصميم الأولي",
          date: "2024-01-20",
          status: "مقروء",
        },
        {
          id: 2,
          type: "مكالمة",
          subject: "مناقشة متطلبات المشروع",
          date: "2024-01-25",
          duration: "45 دقيقة",
        },
        {
          id: 3,
          type: "اجتماع",
          subject: "عرض النموذج الأولي",
          date: "2024-02-01",
          duration: "1.5 ساعة",
        },
      ],
      notes: [
        {
          id: 1,
          content: "العميل يفضل التواصل عبر البريد الإلكتروني في الصباح",
          date: "2024-01-15",
          author: "أنت",
        },
        {
          id: 2,
          content: "طلب إضافة ميزة التقارير المتقدمة",
          date: "2024-02-01",
          author: "أنت",
        },
      ],
    },
    // يمكن إضافة المزيد من العملاء هنا
  }
  return clients[id] || null
}

const statusColors = {
  نشط: "bg-green-100 text-green-700",
  "غير نشط": "bg-red-100 text-red-700",
  معلق: "bg-yellow-100 text-yellow-700",
}

const projectStatusColors = {
  مكتمل: "bg-green-100 text-green-700",
  جاري: "bg-blue-100 text-blue-700",
  معلق: "bg-yellow-100 text-yellow-700",
  ملغي: "bg-red-100 text-red-700",
}

const invoiceStatusColors = {
  مدفوع: "bg-green-100 text-green-700",
  معلق: "bg-yellow-100 text-yellow-700",
  متأخر: "bg-red-100 text-red-700",
}

export default function ClientProfilePage() {
  const params = useParams()
  const clientId = params.id as string
  const client = getClientById(clientId)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)

  if (!client) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">العميل غير موجود</h1>
          <Link href="/clients">
            <Button>العودة لقائمة العملاء</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const totalPaid = client.invoices
    .filter((inv) => inv.status === "مدفوع")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[^\d.]/g, "")), 0)

  const pendingAmount = client.invoices
    .filter((inv) => inv.status === "معلق")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[^\d.]/g, "")), 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/clients">
            <Button variant="ghost" size="icon">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ملف {client.name}</h1>
            <p className="text-gray-600 mt-1">معلومات مفصلة عن العميل</p>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback className="text-2xl">{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-lg">{client.rating}</span>
                  </div>
                  <Badge className={statusColors[client.status]}>{client.status}</Badge>
                </div>
                <Badge variant="outline">{client.type}</Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                  <p className="text-lg text-violet-600 font-medium">{client.industry}</p>
                  <p className="text-gray-600 mt-2">{client.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{client.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>عميل منذ {client.joinDate}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">حجم الشركة: </span>
                      <span className="font-medium">{client.companySize}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">الموقع الإلكتروني: </span>
                      <span className="font-medium text-violet-600">{client.website}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">شخص الاتصال: </span>
                      <span className="font-medium">{client.contactPerson}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">المنصب: </span>
                      <span className="font-medium">{client.contactTitle}</span>
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
                        <DialogTitle>إرسال رسالة إلى {client.name}</DialogTitle>
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
                        <DialogTitle>تعديل بيانات {client.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-name">اسم العميل</Label>
                            <Input id="edit-name" defaultValue={client.name} />
                          </div>
                          <div>
                            <Label htmlFor="edit-industry">المجال</Label>
                            <Input id="edit-industry" defaultValue={client.industry} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                            <Input id="edit-email" defaultValue={client.email} />
                          </div>
                          <div>
                            <Label htmlFor="edit-phone">رقم الهاتف</Label>
                            <Input id="edit-phone" defaultValue={client.phone} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="edit-description">وصف العميل</Label>
                          <Textarea id="edit-description" defaultValue={client.description} rows={3} />
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
                    حذف العميل
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{client.projects.length}</p>
                  <p className="text-sm text-gray-600">المشاريع</p>
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
                  <p className="text-2xl font-bold text-gray-900">{totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">إجمالي المدفوع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pendingAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">مبالغ معلقة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{client.rating}</p>
                  <p className="text-sm text-gray-600">التقييم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">المشاريع</TabsTrigger>
            <TabsTrigger value="invoices">الفواتير</TabsTrigger>
            <TabsTrigger value="communications">التواصل</TabsTrigger>
            <TabsTrigger value="notes">الملاحظات</TabsTrigger>
            <TabsTrigger value="details">التفاصيل</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">المشاريع ({client.projects.length})</h3>
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                <Plus className="w-4 h-4 ml-2" />
                مشروع جديد
              </Button>
            </div>
            <div className="grid gap-4">
              {client.projects.map((project) => (
                <Card key={project.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">القيمة: {project.value}</p>
                      </div>
                      <Badge className={projectStatusColors[project.status]}>{project.status}</Badge>
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

          <TabsContent value="invoices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">الفواتير ({client.invoices.length})</h3>
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                <Plus className="w-4 h-4 ml-2" />
                فاتورة جديدة
              </Button>
            </div>
            <div className="grid gap-4">
              {client.invoices.map((invoice) => (
                <Card key={invoice.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{invoice.number}</h4>
                        <p className="text-lg text-violet-600 font-medium">{invoice.amount}</p>
                      </div>
                      <Badge className={invoiceStatusColors[invoice.status]}>{invoice.status}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>تاريخ الاستحقاق: {invoice.dueDate}</span>
                      {invoice.paidDate && <span>تاريخ الدفع: {invoice.paidDate}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">سجل التواصل</h3>
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                <Plus className="w-4 h-4 ml-2" />
                إضافة تواصل
              </Button>
            </div>
            <div className="grid gap-4">
              {client.communications.map((comm) => (
                <Card key={comm.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{comm.subject}</h4>
                      <Badge variant="outline">{comm.type}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>التاريخ: {comm.date}</span>
                      {comm.duration && <span>المدة: {comm.duration}</span>}
                      {comm.status && <span>الحالة: {comm.status}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">الملاحظات</h3>
              <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة ملاحظة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="note-content">الملاحظة</Label>
                      <Textarea id="note-content" placeholder="اكتب ملاحظتك هنا..." rows={4} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button className="bg-gradient-to-r from-violet-500 to-purple-600">حفظ الملاحظة</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {client.notes.map((note) => (
                <Card key={note.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-gray-900 mb-3">{note.content}</p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>بواسطة: {note.author}</span>
                      <span>{note.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>معلومات الشركة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-gray-600">الرقم الضريبي: </span>
                    <span className="font-medium">{client.taxId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">حجم الشركة: </span>
                    <span className="font-medium">{client.companySize}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">الموقع الإلكتروني: </span>
                    <span className="font-medium text-violet-600">{client.website}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">المنطقة الزمنية: </span>
                    <span className="font-medium">{client.timezone}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>تفضيلات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-gray-600">الطريقة المفضلة: </span>
                    <span className="font-medium">{client.preferredCommunication}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">شخص الاتصال: </span>
                    <span className="font-medium">{client.contactPerson}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">المنصب: </span>
                    <span className="font-medium">{client.contactTitle}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
