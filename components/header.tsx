"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Bell, Search, X } from "lucide-react"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
  sidebarOpen: boolean
}

const pageNames: Record<string, string> = {
  "/": "لوحة التحكم",
  "/projects": "المشاريع",
  "/clients": "العملاء",
  "/meetings": "الاجتماعات",
  "/payments": "المدفوعات",
  "/activity": "السجل",
  "/portfolio": "معرض الأعمال",
  "/files": "الملفات",
  "/settings": "الإعدادات",
  "/account": "إدارة الحساب",
  "/github": "ربط GitHub",
  "/profile": "الملف الشخصي",
}

export function Header({ setSidebarOpen, sidebarOpen }: HeaderProps) {
  const pathname = usePathname()
  const currentPageName = pageNames[pathname] || "الصفحة"

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button - Always Visible */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 transition-colors"
            title={sidebarOpen ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm">
            <span className="text-violet-600 font-medium">{currentPageName}</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث..."
              className="w-64 pr-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}
