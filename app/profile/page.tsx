"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Star,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  FolderOpen,
  Users,
  CreditCard,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DashboardLayout } from "@/components/dashboard-layout"

const profileData = {
  personalInfo: {
    firstName: "أحمد",
    lastName: "محمد علي",
    title: "مطور ومصمم مواقع ويب",
    email: "ahmed@example.com",
    phone: "+966501234567",
    location: "الرياض، السعودية",
    bio: "مطور ومصمم مواقع ويب متخصص في تقنيات الويب الحديثة وتطوير تطبيقات SaaS. أعمل مع العملاء لتحويل أفكارهم إلى حلول رقمية مبتكرة.",
    website: "https://ahmed-dev.com",
    linkedin: "https://linkedin.com/in/ahmed-dev",
    twitter: "https://twitter.com/ahmed_dev",
    github: "https://github.com/ahmed-dev",
    joinDate: "يناير 2024",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  stats: {
    projectsCompleted: 24,
    activeClients: 18,
    totalRevenue: "125,000 ج.م",
    successRate: 98,
    avgRating: 4.9,
    totalHours: 1250,
  },
  skills: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "MongoDB", level: 75 },
  ],
  achievements: [
    {
      id: 1,
      title: "مطور محترف",
      description: "أكمل 20+ مشروع بنجاح",
      icon: Award,
      color: "bg-yellow-500",
      earned: true,
    },
    {
      id: 2,
      title: "عميل سعيد",
      description: "حصل على تقييم 5 نجوم من 10 عملاء",
      icon: Star,
      color: "bg-blue-500",
      earned: true,
    },
    {
      id: 3,
      title: "سرعة في التسليم",
      description: "سلم 15 مشروع في الوقت المحدد",
      icon: Clock,
      color: "bg-green-500",
      earned: true,
    },
    {
      id: 4,
      title: "خبير تقني",
      description: "استخدم 5+ تقنيات مختلفة",
      icon: TrendingUp,
      color: "bg-purple-500",
      earned: false,
    },
  ],
  recentProjects: [
    {
      id: 1,
      name: "منصة يوفا SaaS",
      client: "مشروع شخصي",
      status: "مكتمل",
      completion: 100,
      tech: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 2,
      name: "موقع شركة التقنية",
      client: "شركة التقنية المتقدمة",
      status: "قيد التنفيذ",
      completion: 75,
      tech: ["React", "Node.js"],
    },
    {
      id: 3,
      name: "تطبيق إدارة المخزون",
      client: "متجر الأناقة",
      status: "قيد التنفيذ",
      completion: 45,
      tech: ["Next.js", "MongoDB"],
    },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={profileData.personalInfo.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-3xl">
                    {profileData.personalInfo.firstName.charAt(0)}
                    {profileData.personalInfo.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(Math.floor(profileData.stats.avgRating))}
                </div>
                <p className="text-sm text-gray-600">{profileData.stats.avgRating} من 5.0</p>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                    </h1>
                    <p className="text-xl text-gray-600 mb-3">{profileData.personalInfo.title}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-700">متاح للعمل</Badge>
                      <Badge className="bg-blue-100 text-blue-700">مطور محترف</Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        عضو منذ {profileData.personalInfo.joinDate}
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                    تعديل الملف الشخصي
                  </Button>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{profileData.personalInfo.bio}</p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>{profileData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{profileData.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{profileData.personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <a href={profileData.personalInfo.website} className="text-violet-600 hover:underline">
                      الموقع الشخصي
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 ml-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.personalInfo.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 ml-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 ml-2" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.stats.projectsCompleted}</p>
                  <p className="text-sm text-gray-600">مشروع مكتمل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.stats.activeClients}</p>
                  <p className="text-sm text-gray-600">عميل نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.stats.totalRevenue}</p>
                  <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profileData.stats.successRate}%</p>
                  <p className="text-sm text-gray-600">معدل النجاح</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">المهارات والخبرات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileData.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">المشاريع الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.recentProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.client}</p>
                        </div>
                        <Badge
                          className={
                            project.status === "مكتمل" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">التقدم</span>
                          <span className="font-medium">{project.completion}%</span>
                        </div>
                        <Progress value={project.completion} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">الإنجازات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${achievement.color} rounded-lg flex items-center justify-center`}>
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ساعات العمل الإجمالية</span>
                  <span className="font-semibold text-violet-600">{profileData.stats.totalHours}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">متوسط التقييم</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-violet-600">{profileData.stats.avgRating}</span>
                    <div className="flex">{renderStars(Math.floor(profileData.stats.avgRating))}</div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">معدل النجاح</span>
                  <span className="font-semibold text-violet-600">{profileData.stats.successRate}%</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المشاريع النشطة</span>
                  <span className="font-semibold text-violet-600">
                    {profileData.recentProjects.filter((p) => p.status === "قيد التنفيذ").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">تواصل معي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Mail className="w-4 h-4 ml-2" />
                  إرسال رسالة
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 ml-2" />
                  حجز اجتماع
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 ml-2" />
                  مكالمة هاتفية
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
