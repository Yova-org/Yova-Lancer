"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  Heart,
  MessageCircle,
  Globe,
  Share2,
  Search,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// بيانات وهمية للمعرض العام
const portfolioData = {
  user: {
    name: "أحمد محمد علي",
    title: "مطور ومصمم مواقع ويب",
    bio: "مطور ومصمم مواقع ويب متخصص في تقنيات الويب الحديثة وتطوير تطبيقات SaaS. أعمل مع العملاء لتحويل أفكارهم إلى حلول رقمية مبتكرة.",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "الرياض، السعودية",
    email: "ahmed@example.com",
    phone: "+966501234567",
    website: "https://ahmed-dev.com",
    linkedin: "https://linkedin.com/in/ahmed-dev",
    twitter: "https://twitter.com/ahmed_dev",
    github: "https://github.com/ahmed-dev",
    rating: 4.9,
    reviewsCount: 24,
    projectsCount: 18,
    yearsExperience: 5,
  },
  projects: [
    {
      id: 1,
      title: "منصة يوفا SaaS",
      description: "منصة متكاملة لإدارة أعمال المستقلين مع لوحة تحكم متقدمة وتقارير تفصيلية",
      category: "تطوير ويب",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-06-01",
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
      date: "2024-05-15",
      likes: 18,
      views: 89,
      comments: 5,
      projectUrl: "https://techadvanced.com",
      githubUrl: null,
    },
    {
      id: 3,
      title: "هوية بصرية لمؤسسة الإبداع",
      description: "تصميم هوية بصرية متكاملة تشمل الشعار والألوان والخطوط",
      category: "تصميم جرافيك",
      tags: ["Illustrator", "Photoshop", "Branding", "Logo"],
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-03-10",
      likes: 31,
      views: 203,
      comments: 12,
      projectUrl: null,
      githubUrl: null,
    },
  ],
  skills: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "MongoDB", level: 75 },
  ],
  testimonials: [
    {
      id: 1,
      name: "سارة أحمد",
      company: "شركة التقنية المتقدمة",
      text: "أحمد مطور محترف جداً، سلم المشروع في الوقت المحدد وبجودة عالية. أنصح بالتعامل معه.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "محمد علي",
      company: "مؤسسة الإبداع",
      text: "تعامل ممتاز وفهم عميق للمتطلبات. النتيجة فاقت توقعاتنا بكثير.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
}

const categories = ["الكل", "تطوير ويب", "تصميم ويب", "تطوير تطبيقات", "تصميم جرافيك"]

export default function PublicPortfolioPage({ params }: { params: { username: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "الكل" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={portfolioData.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>أم</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-gray-900">{portfolioData.user.name}</h1>
                <p className="text-sm text-gray-600">{portfolioData.user.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
              <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                <Mail className="w-4 h-4 ml-2" />
                تواصل معي
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-white/20">
              <AvatarImage src={portfolioData.user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-3xl">أم</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-4xl font-bold mb-2">{portfolioData.user.name}</h1>
              <p className="text-xl text-violet-100 mb-4">{portfolioData.user.title}</p>
              <p className="text-violet-100 mb-6 leading-relaxed">{portfolioData.user.bio}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-violet-100">
                  <MapPin className="w-4 h-4" />
                  <span>{portfolioData.user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-violet-100">
                  <Calendar className="w-4 h-4" />
                  <span>{portfolioData.user.yearsExperience} سنوات خبرة</span>
                </div>
                <div className="flex items-center gap-2 text-violet-100">
                  <Star className="w-4 h-4 fill-current" />
                  <span>
                    {portfolioData.user.rating} ({portfolioData.user.reviewsCount} تقييم)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button variant="secondary" size="sm" asChild>
                  <a href={`mailto:${portfolioData.user.email}`}>
                    <Mail className="w-4 h-4 ml-2" />
                    البريد الإلكتروني
                  </a>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <a href={`tel:${portfolioData.user.phone}`}>
                    <Phone className="w-4 h-4 ml-2" />
                    الهاتف
                  </a>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <a href={portfolioData.user.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 ml-2" />
                    الموقع
                  </a>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <a href={portfolioData.user.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 ml-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <a href={portfolioData.user.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 ml-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-violet-600 mb-2">{portfolioData.user.projectsCount}</div>
              <div className="text-gray-600">مشروع مكتمل</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-violet-600 mb-2">{portfolioData.user.reviewsCount}</div>
              <div className="text-gray-600">تقييم إيجابي</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-violet-600 mb-2">{portfolioData.user.yearsExperience}+</div>
              <div className="text-gray-600">سنوات خبرة</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">معرض الأعمال</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث في الأعمال..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-64"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-gray-700">{project.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{project.comments}</span>
                        </div>
                      </div>
                      <span>{project.date}</span>
                    </div>

                    <div className="flex gap-2">
                      {project.projectUrl && (
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 ml-2" />
                            المشروع
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 ml-2" />
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
        </div>

        {/* Skills & Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">المهارات والخبرات</h3>
              <div className="space-y-4">
                {portfolioData.skills.map((skill, index) => (
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
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">آراء العملاء</h3>
              <div className="space-y-6">
                {portfolioData.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      </div>
                      <div className="mr-auto flex">{renderStars(testimonial.rating)}</div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">هل لديك مشروع في ذهنك؟</h3>
          <p className="text-gray-600 mb-6">دعنا نتحدث ونحول فكرتك إلى واقع رقمي مبهر</p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              asChild
            >
              <a href={`mailto:${portfolioData.user.email}`}>
                <Mail className="w-5 h-5 ml-2" />
                تواصل معي الآن
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`tel:${portfolioData.user.phone}`}>
                <Phone className="w-5 h-5 ml-2" />
                اتصل بي
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600">
            © 2024 {portfolioData.user.name}. جميع الحقوق محفوظة. مدعوم بـ{" "}
            <a href="https://yova.digital" className="text-violet-600 hover:underline">
              منصة يوفا
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
