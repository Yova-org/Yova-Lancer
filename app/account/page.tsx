"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Save, Upload, Camera, Shield, CreditCard, Trash2, Download, Key, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const accountData = {
  personalInfo: {
    firstName: "أحمد",
    lastName: "محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    address: "الرياض، السعودية",
    bio: "مطور ومصمم مواقع ويب متخصص في تقنيات الويب الحديثة وتطوير تطبيقات SaaS",
    website: "https://ahmed-dev.com",
    linkedin: "https://linkedin.com/in/ahmed-dev",
    twitter: "https://twitter.com/ahmed_dev",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  subscription: {
    plan: "Pro",
    status: "نشط",
    nextBilling: "2024-07-21",
    price: "99 ج.م/شهر",
    features: ["مشاريع غير محدودة", "عملاء غير محدودين", "تخزين 100 جيجا", "دعم أولوية"],
  },
  security: {
    twoFactorEnabled: true,
    lastLogin: "منذ ساعتين",
    loginSessions: 3,
    passwordLastChanged: "منذ 30 يوم",
  },
  usage: {
    projects: { current: 24, limit: "غير محدود" },
    clients: { current: 18, limit: "غير محدود" },
    storage: { current: 45, limit: 100 },
    apiCalls: { current: 1250, limit: 5000 },
  },
}

const recentActivity = [
  {
    id: 1,
    action: "تسجيل دخول",
    device: "Chrome على Windows",
    location: "الرياض، السعودية",
    timestamp: "منذ ساعتين",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    action: "تحديث الملف الشخصي",
    device: "Safari على iPhone",
    location: "الرياض، السعودية",
    timestamp: "منذ يوم",
    ip: "192.168.1.2",
  },
  {
    id: 3,
    action: "تغيير كلمة المرور",
    device: "Chrome على Windows",
    location: "الرياض، السعودية",
    timestamp: "منذ 30 يوم",
    ip: "192.168.1.1",
  },
]

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(accountData.personalInfo)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const getUsagePercentage = (current: number, limit: number | string) => {
    if (limit === "غير محدود") return 0
    return (current / (limit as number)) * 100
  }

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500"
    if (percentage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة الحساب</h1>
            <p className="text-gray-600 mt-1">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 ml-2" />
                تعديل الملف
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">المعلومات الشخصية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {formData.firstName.charAt(0)}
                        {formData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-violet-500 hover:bg-violet-600"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-gray-600">{formData.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-700">حساب مفعل</Badge>
                      <Badge className="bg-blue-100 text-blue-700">{accountData.subscription.plan}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">نبذة تعريفية</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="website">الموقع الشخصي</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => updateField("twitter", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">كلمة المرور</p>
                          <p className="text-sm text-gray-600">آخر تغيير: {accountData.security.passwordLastChanged}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        تغيير
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">المصادقة الثنائية</p>
                          <p className="text-sm text-gray-600">
                            {accountData.security.twoFactorEnabled ? "مفعلة" : "غير مفعلة"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={accountData.security.twoFactorEnabled} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">آخر تسجيل دخول</h4>
                      <p className="text-sm text-blue-700">{accountData.security.lastLogin}</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">الجلسات النشطة</h4>
                      <p className="text-sm text-green-700">{accountData.security.loginSessions} جلسات</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.device}</p>
                        <p className="text-xs text-gray-500">
                          {activity.location} • {activity.ip}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{activity.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">الاشتراك</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-white">
                  <h3 className="text-xl font-bold">{accountData.subscription.plan}</h3>
                  <p className="text-violet-100">{accountData.subscription.price}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">الحالة</span>
                    <Badge className="bg-green-100 text-green-700">{accountData.subscription.status}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">التجديد التالي</span>
                    <span className="font-medium">{accountData.subscription.nextBilling}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المميزات المتاحة</h4>
                  {accountData.subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <CreditCard className="w-4 h-4 ml-2" />
                    الفواتير
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    تغيير الخطة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">إحصائيات الاستخدام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">المشاريع</span>
                    <span className="font-medium">
                      {accountData.usage.projects.current} / {accountData.usage.projects.limit}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(accountData.usage.projects.current, accountData.usage.projects.limit)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">العملاء</span>
                    <span className="font-medium">
                      {accountData.usage.clients.current} / {accountData.usage.clients.limit}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(accountData.usage.clients.current, accountData.usage.clients.limit)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">التخزين</span>
                    <span className="font-medium">
                      {accountData.usage.storage.current} جيجا / {accountData.usage.storage.limit} جيجا
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(accountData.usage.storage.current, accountData.usage.storage.limit)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">استدعاءات API</span>
                    <span className="font-medium">
                      {accountData.usage.apiCalls.current} / {accountData.usage.apiCalls.limit}
                    </span>
                  </div>
                  <Progress
                    value={getUsagePercentage(accountData.usage.apiCalls.current, accountData.usage.apiCalls.limit)}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير البيانات
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 ml-2" />
                  استيراد البيانات
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 ml-2" />
                  سجل الأمان
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف الحساب
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
