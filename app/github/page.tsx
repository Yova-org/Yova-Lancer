"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Plus,
  Search,
  GitBranch,
  Star,
  Eye,
  GitCommit,
  Code,
  Settings,
  Link,
  Unlink,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { DashboardLayout } from "@/components/dashboard-layout"

const connectedRepos = [
  {
    id: 1,
    name: "yova-saas-platform",
    fullName: "ahmed-dev/yova-saas-platform",
    description: "منصة SaaS متكاملة لإدارة أعمال المستقلين",
    language: "TypeScript",
    stars: 24,
    forks: 8,
    watchers: 12,
    lastCommit: "منذ 2 ساعات",
    status: "متصل",
    isPrivate: true,
    url: "https://github.com/ahmed-dev/yova-saas-platform",
    commits: 156,
    branches: 3,
    issues: 5,
  },
  {
    id: 2,
    name: "client-portfolio-website",
    fullName: "ahmed-dev/client-portfolio-website",
    description: "موقع شخصي لعرض أعمال العميل",
    language: "React",
    stars: 12,
    forks: 3,
    watchers: 8,
    lastCommit: "منذ يوم",
    status: "متصل",
    isPrivate: false,
    url: "https://github.com/ahmed-dev/client-portfolio-website",
    commits: 89,
    branches: 2,
    issues: 2,
  },
  {
    id: 3,
    name: "ecommerce-dashboard",
    fullName: "ahmed-dev/ecommerce-dashboard",
    description: "لوحة تحكم متجر إلكتروني",
    language: "Next.js",
    stars: 18,
    forks: 5,
    watchers: 10,
    lastCommit: "منذ 3 أيام",
    status: "خطأ في المزامنة",
    isPrivate: true,
    url: "https://github.com/ahmed-dev/ecommerce-dashboard",
    commits: 234,
    branches: 4,
    issues: 8,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "commit",
    repo: "yova-saas-platform",
    message: "إضافة صفحة إدارة المشاريع",
    author: "أحمد محمد",
    timestamp: "منذ 2 ساعات",
    hash: "a1b2c3d",
  },
  {
    id: 2,
    type: "push",
    repo: "client-portfolio-website",
    message: "تحديث التصميم الرئيسي",
    author: "أحمد محمد",
    timestamp: "منذ يوم",
    hash: "e4f5g6h",
  },
  {
    id: 3,
    type: "merge",
    repo: "ecommerce-dashboard",
    message: "دمج فرع التحديثات الجديدة",
    author: "أحمد محمد",
    timestamp: "منذ 3 أيام",
    hash: "i7j8k9l",
  },
]

const githubSettings = {
  autoSync: true,
  webhookNotifications: true,
  commitNotifications: false,
  issueNotifications: true,
  pullRequestNotifications: true,
}

export default function GitHubPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const [settings, setSettings] = useState(githubSettings)

  const filteredRepos = connectedRepos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متصل":
        return "bg-green-100 text-green-700"
      case "خطأ في المزامنة":
        return "bg-red-100 text-red-700"
      case "قيد المزامنة":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "متصل":
        return CheckCircle
      case "خطأ في المزامنة":
        return AlertCircle
      case "قيد المزامنة":
        return Clock
      default:
        return Clock
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "TypeScript":
        return "bg-blue-100 text-blue-700"
      case "React":
        return "bg-cyan-100 text-cyan-700"
      case "Next.js":
        return "bg-gray-100 text-gray-700"
      case "JavaScript":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ربط GitHub</h1>
            <p className="text-gray-600 mt-1">إدارة ومزامنة مستودعات GitHub مع مشاريعك</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 ml-2" />
              مزامنة
            </Button>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              <Plus className="w-4 h-4 ml-2" />
              ربط مستودع جديد
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">حساب GitHub</h3>
                  <p className="text-sm text-gray-600">{isConnected ? "متصل بحساب: ahmed-dev" : "غير متصل"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={isConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {isConnected ? "متصل" : "غير متصل"}
                </Badge>
                <Button variant={isConnected ? "destructive" : "default"}>
                  {isConnected ? (
                    <>
                      <Unlink className="w-4 h-4 ml-2" />
                      قطع الاتصال
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 ml-2" />
                      ربط الحساب
                    </>
                  )}
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
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{connectedRepos.length}</p>
                  <p className="text-sm text-gray-600">مستودعات مربوطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <GitCommit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {connectedRepos.reduce((acc, repo) => acc + repo.commits, 0)}
                  </p>
                  <p className="text-sm text-gray-600">إجمالي الكوميتات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {connectedRepos.reduce((acc, repo) => acc + repo.stars, 0)}
                  </p>
                  <p className="text-sm text-gray-600">إجمالي النجوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {connectedRepos.reduce((acc, repo) => acc + repo.branches, 0)}
                  </p>
                  <p className="text-sm text-gray-600">إجمالي الفروع</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Repositories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="البحث في المستودعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Repositories List */}
            <div className="space-y-4">
              {filteredRepos.map((repo, index) => {
                const StatusIcon = getStatusIcon(repo.status)
                return (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                              <Github className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                                {repo.isPrivate && <Badge variant="outline">خاص</Badge>}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                  <span>{repo.language}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4" />
                                  <span>{repo.stars}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <GitBranch className="w-4 h-4" />
                                  <span>{repo.forks}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{repo.watchers}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(repo.status)}>
                              <StatusIcon className="w-3 h-3 ml-1" />
                              {repo.status}
                            </Badge>
                            <Button variant="ghost" size="icon" asChild>
                              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">الكوميتات</p>
                            <p className="font-semibold text-violet-600">{repo.commits}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">الفروع</p>
                            <p className="font-semibold text-violet-600">{repo.branches}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">المشاكل</p>
                            <p className="font-semibold text-violet-600">{repo.issues}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">آخر تحديث: {repo.lastCommit}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4 ml-2" />
                              إعدادات
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-4 h-4 ml-2" />
                              مزامنة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <GitCommit className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-600">{activity.repo}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{activity.hash}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* GitHub Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">إعدادات GitHub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSync" className="font-medium">
                      المزامنة التلقائية
                    </Label>
                    <p className="text-sm text-gray-600">مزامنة تلقائية كل ساعة</p>
                  </div>
                  <Switch
                    id="autoSync"
                    checked={settings.autoSync}
                    onCheckedChange={(checked) => updateSetting("autoSync", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="webhookNotifications" className="font-medium">
                      إشعارات Webhook
                    </Label>
                    <p className="text-sm text-gray-600">إشعارات فورية للأحداث</p>
                  </div>
                  <Switch
                    id="webhookNotifications"
                    checked={settings.webhookNotifications}
                    onCheckedChange={(checked) => updateSetting("webhookNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="commitNotifications" className="font-medium">
                      إشعارات الكوميتات
                    </Label>
                    <p className="text-sm text-gray-600">إشعار عند كل كوميت جديد</p>
                  </div>
                  <Switch
                    id="commitNotifications"
                    checked={settings.commitNotifications}
                    onCheckedChange={(checked) => updateSetting("commitNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="issueNotifications" className="font-medium">
                      إشعارات المشاكل
                    </Label>
                    <p className="text-sm text-gray-600">إشعار عند إنشاء مشكلة جديدة</p>
                  </div>
                  <Switch
                    id="issueNotifications"
                    checked={settings.issueNotifications}
                    onCheckedChange={(checked) => updateSetting("issueNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pullRequestNotifications" className="font-medium">
                      إشعارات Pull Requests
                    </Label>
                    <p className="text-sm text-gray-600">إشعار عند طلبات الدمج</p>
                  </div>
                  <Switch
                    id="pullRequestNotifications"
                    checked={settings.pullRequestNotifications}
                    onCheckedChange={(checked) => updateSetting("pullRequestNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <Github className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مستودعات</h3>
            <p className="text-gray-600">لم يتم العثور على مستودعات تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
