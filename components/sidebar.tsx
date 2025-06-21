"use client"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Calendar,
  CreditCard,
  Activity,
  Settings,
  User,
  Github,
  X,
  Zap,
  ImageIcon,
  Clock,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Bell,
  StickyNote,
  Timer,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Target,
  Wallet,
  FileText,
  BarChart3,
  MessageSquare,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const sidebarSections = [
  {
    title: "إدارة الأعمال",
    icon: Briefcase,
    items: [
      { icon: LayoutDashboard, label: "لوحة التحكم", href: "/", count: null },
      { icon: FolderOpen, label: "المشاريع", href: "/projects", count: 12 },
      { icon: Users, label: "العملاء", href: "/clients", count: 8 },
      { icon: CheckSquare, label: "المهام", href: "/tasks", count: 15 },
      { icon: FileText, label: "إدارة العروض", href: "/proposals", count: 8 },
      { icon: FileText, label: "إدارة العقود", href: "/contracts", count: 5 },
    ],
  },
  {
    title: "إدارة الفريق",
    icon: Users,
    items: [
      { icon: Users, label: "أعضاء الفريق", href: "/team/members", count: 6 },
      { icon: CheckSquare, label: "مهام الفريق", href: "/team/tasks", count: 12 },
      { icon: MessageSquare, label: "رسائل الفريق", href: "/team/messages", count: 8 },
      { icon: BarChart3, label: "أداء الفريق", href: "/team/performance", count: null },
    ],
  },
  {
    title: "الوقت والإنتاجية",
    icon: Target,
    items: [
      { icon: Clock, label: "تتبع الوقت", href: "/time-tracking", count: null },
      { icon: Timer, label: "البومودورو", href: "/pomodoro", count: null },
      { icon: Calendar, label: "الاجتماعات", href: "/meetings", count: 3 },
    ],
  },
  {
    title: "المالية",
    icon: Wallet,
    items: [
      { icon: CreditCard, label: "المدفوعات", href: "/payments", count: 5 },
      { icon: DollarSign, label: "المصروفات", href: "/expenses", count: null },
      { icon: TrendingUp, label: "التقارير المالية", href: "/financial-reports", count: null },
    ],
  },
  {
    title: "المحتوى",
    icon: FileText,
    items: [
      { icon: ImageIcon, label: "معرض الأعمال", href: "/portfolio", count: null },
      { icon: FolderOpen, label: "الملفات", href: "/files", count: null },
      { icon: StickyNote, label: "الملاحظات", href: "/notes", count: 8 },
    ],
  },
  {
    title: "النظام",
    icon: Settings,
    items: [
      { icon: Bell, label: "الإشعارات", href: "/notifications", count: 12 },
      { icon: Activity, label: "السجل", href: "/activity", count: null },
      { icon: BarChart3, label: "التقارير والتحليلات", href: "/reports", count: null },
      { icon: Settings, label: "الإعدادات", href: "/settings", count: null },
      { icon: User, label: "إدارة الحساب", href: "/account", count: null },
      { icon: Github, label: "ربط GitHub", href: "/github", count: null },
    ],
  },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([
    "إدارة الأعمال",
    "إدارة الفريق",
    "الوقت والإنتاجية",
    "المالية",
    "المحتوى",
    "النظام",
  ])

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((s) => s !== sectionTitle) : [...prev, sectionTitle],
    )
  }

  const expandAll = () => {
    setOpenSections(sidebarSections.map((section) => section.title))
  }

  const closeAll = () => {
    setOpenSections([])
  }

  const allExpanded = openSections.length === sidebarSections.length

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">يوفا</h1>
                <p className="text-sm text-gray-500">منصة المستقلين</p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Expand/Collapse All Button */}
          <div className="px-4 py-2 border-b border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={allExpanded ? closeAll : expandAll}
              className="w-full justify-center h-8 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200"
            >
              {allExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 ml-2" />
                  إغلاق الكل
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 ml-2" />
                  فتح الكل
                </>
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarSections.map((section, sectionIndex) => {
              const isOpen = openSections.includes(section.title)

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.title)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-10 text-right rounded-lg mb-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <section.icon className="w-4 h-4 ml-3" />
                        <span className="flex-1 font-medium text-sm">{section.title}</span>
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mr-4">
                      {section.items.map((item, itemIndex) => {
                        const isActive = pathname === item.href
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.05 }}
                          >
                            <Link href={item.href}>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                className={`w-full justify-start h-10 text-right rounded-lg transition-all duration-200 ${
                                  isActive
                                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md hover:shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                              >
                                <item.icon className="w-4 h-4 ml-3" />
                                <span className="flex-1 font-medium text-sm">{item.label}</span>
                                {item.count && (
                                  <Badge
                                    variant={isActive ? "secondary" : "outline"}
                                    className={`text-xs ${isActive ? "bg-white/20 text-white border-white/30" : ""}`}
                                  >
                                    {item.count}
                                  </Badge>
                                )}
                              </Button>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <Link href="/profile">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">أحمد محمد</p>
                  <p className="text-xs text-gray-500">مطور ومصمم</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
