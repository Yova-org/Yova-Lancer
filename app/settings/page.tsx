"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DashboardLayout } from "@/components/dashboard-layout"

const settingsSections = [
  { id: "profile", label: "الملف الشخصي", icon: User },
  { id: "notifications", label: "الإشعارات", icon: Bell },
  { id: "security", label: "الأمان", icon: Shield },
  { id: "appearance", label: "المظهر", icon: Palette },
  { id: "language", label: "اللغة والمنطقة", icon: Globe },
  { id: "data", label: "البيانات والنسخ الاحتياطي", icon: Database },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "+966501234567",
    bio: "مطور ومصمم مواقع ويب متخصص في تقنيات الويب الحديثة",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    paymentAlerts: true,
    meetingReminders: true,

    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,

    // Appearance settings
    theme: "light",
    language: "ar",
    timezone: "Asia/Riyadh",

    // Data settings
    autoBackup: true,
    dataRetention: "1year",
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الشخصية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">الاسم الأول</Label>
            <Input
              id="firstName"
              value={settings.firstName}
              onChange={(e) => updateSetting("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">الاسم الأخير</Label>
            <Input
              id="lastName"
              value={settings.lastName}
              onChange={(e) => updateSetting("lastName", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الاتصال</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input id="phone" value={settings.phone} onChange={(e) => updateSetting("phone", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="bio">نبذة تعريفية</Label>
            <Textarea id="bio" value={settings.bio} onChange={(e) => updateSetting("bio", e.target.value)} rows={3} />
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات الإشعارات</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-gray-600">استقبال الإشعارات عبر البريد الإلكتروني</p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">الإشعارات الفورية</p>
                <p className="text-sm text-gray-600">إشعارات فورية في المتصفح</p>
              </div>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">رسائل SMS</p>
                <p className="text-sm text-gray-600">استقبال الإشعارات عبر الرسائل النصية</p>
              </div>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">أنواع الإشعارات</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تحديثات المشاريع</p>
              <p className="text-sm text-gray-600">إشعارات عند تحديث حالة المشاريع</p>
            </div>
            <Switch
              checked={settings.projectUpdates}
              onCheckedChange={(checked) => updateSetting("projectUpdates", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تنبيهات المدفوعات</p>
              <p className="text-sm text-gray-600">إشعارات عند استلام أو استحقاق المدفوعات</p>
            </div>
            <Switch
              checked={settings.paymentAlerts}
              onCheckedChange={(checked) => updateSetting("paymentAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تذكير الاجتماعات</p>
              <p className="text-sm text-gray-600">تذكير قبل موعد الاجتماعات</p>
            </div>
            <Switch
              checked={settings.meetingReminders}
              onCheckedChange={(checked) => updateSetting("meetingReminders", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات الأمان</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">المصادقة الثنائية</p>
                <p className="text-sm text-gray-600">حماية إضافية لحسابك</p>
              </div>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">تنبيهات تسجيل الدخول</p>
                <p className="text-sm text-gray-600">إشعار عند تسجيل الدخول من جهاز جديد</p>
              </div>
            </div>
            <Switch
              checked={settings.loginAlerts}
              onCheckedChange={(checked) => updateSetting("loginAlerts", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">تغيير كلمة المرور</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة المرور الحالية"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
            <Input id="newPassword" type="password" placeholder="أدخل كلمة المرور الجديدة" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <Input id="confirmPassword" type="password" placeholder="أعد إدخال كلمة المرور الجديدة" />
          </div>
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Lock className="w-4 h-4 ml-2" />
            تحديث كلمة المرور
          </Button>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات المظهر</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="theme">المظهر</Label>
            <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">فاتح</SelectItem>
                <SelectItem value="dark">داكن</SelectItem>
                <SelectItem value="system">تلقائي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">اللغة والمنطقة</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="language">اللغة</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">المنطقة الزمنية</Label>
            <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                <SelectItem value="Africa/Cairo">القاهرة (GMT+2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDataSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">النسخ الاحتياطي</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">النسخ الاحتياطي التلقائي</p>
              <p className="text-sm text-gray-600">إنشاء نسخة احتياطية تلقائياً من بياناتك</p>
            </div>
            <Switch checked={settings.autoBackup} onCheckedChange={(checked) => updateSetting("autoBackup", checked)} />
          </div>
          <div>
            <Label htmlFor="dataRetention">مدة الاحتفاظ بالبيانات</Label>
            <Select value={settings.dataRetention} onValueChange={(value) => updateSetting("dataRetention", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 أشهر</SelectItem>
                <SelectItem value="1year">سنة واحدة</SelectItem>
                <SelectItem value="2years">سنتان</SelectItem>
                <SelectItem value="forever">دائماً</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة البيانات</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Database className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <RefreshCw className="w-4 h-4 ml-2" />
            إنشاء نسخة احتياطية الآن
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <Database className="w-4 h-4 ml-2" />
            حذف جميع البيانات
          </Button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection()
      case "notifications":
        return renderNotificationsSection()
      case "security":
        return renderSecuritySection()
      case "appearance":
        return renderAppearanceSection()
      case "language":
        return renderLanguageSection()
      case "data":
        return renderDataSection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
            <p className="text-gray-600 mt-1">إدارة إعدادات حسابك والنظام</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {settingsSections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeSection === section.id ? "bg-violet-500 hover:bg-violet-600" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <section.icon className="w-4 h-4 ml-2" />
                        {section.label}
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>

                  <Separator className="my-6" />

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">إلغاء</Button>
                    <Button className="bg-violet-500 hover:bg-violet-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
