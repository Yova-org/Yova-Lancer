"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FolderOpen,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  Share2,
  MoreHorizontal,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Grid,
  List,
  Folder,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"

const files = [
  {
    id: 1,
    name: "تصميم-الشعار-النهائي.ai",
    type: "image",
    size: "2.5 MB",
    uploadDate: "2024-06-20",
    folder: "مشروع الهوية البصرية",
    extension: "ai",
    isShared: true,
    downloads: 12,
    url: "#",
  },
  {
    id: 2,
    name: "عقد-العمل-مع-العميل.pdf",
    type: "document",
    size: "1.2 MB",
    uploadDate: "2024-06-19",
    folder: "المستندات القانونية",
    extension: "pdf",
    isShared: false,
    downloads: 3,
    url: "#",
  },
  {
    id: 3,
    name: "فيديو-عرض-المشروع.mp4",
    type: "video",
    size: "45.8 MB",
    uploadDate: "2024-06-18",
    folder: "عروض المشاريع",
    extension: "mp4",
    isShared: true,
    downloads: 8,
    url: "#",
  },
  {
    id: 4,
    name: "ملف-المشروع-المضغوط.zip",
    type: "archive",
    size: "12.3 MB",
    uploadDate: "2024-06-17",
    folder: "ملفات المشاريع",
    extension: "zip",
    isShared: false,
    downloads: 5,
    url: "#",
  },
  {
    id: 5,
    name: "صور-المنتجات.jpg",
    type: "image",
    size: "3.7 MB",
    uploadDate: "2024-06-16",
    folder: "صور العملاء",
    extension: "jpg",
    isShared: true,
    downloads: 15,
    url: "#",
  },
  {
    id: 6,
    name: "تسجيل-الاجتماع.mp3",
    type: "audio",
    size: "8.9 MB",
    uploadDate: "2024-06-15",
    folder: "تسجيلات الاجتماعات",
    extension: "mp3",
    isShared: false,
    downloads: 2,
    url: "#",
  },
]

const folders = [
  { name: "مشروع الهوية البصرية", fileCount: 8, size: "25.4 MB" },
  { name: "المستندات القانونية", fileCount: 12, size: "15.2 MB" },
  { name: "عروض المشاريع", fileCount: 6, size: "120.5 MB" },
  { name: "ملفات المشاريع", fileCount: 15, size: "89.3 MB" },
  { name: "صور العملاء", fileCount: 24, size: "156.7 MB" },
  { name: "تسجيلات الاجتماعات", fileCount: 9, size: "67.8 MB" },
]

const fileTypes = ["الكل", "صور", "مستندات", "فيديو", "صوت", "أرشيف"]

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedFolder, setSelectedFolder] = useState("الكل")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "الكل" || getFileTypeLabel(file.type) === selectedType
    const matchesFolder = selectedFolder === "الكل" || file.folder === selectedFolder
    return matchesSearch && matchesType && matchesFolder
  })

  function getFileTypeLabel(type: string) {
    switch (type) {
      case "image":
        return "صور"
      case "document":
        return "مستندات"
      case "video":
        return "فيديو"
      case "audio":
        return "صوت"
      case "archive":
        return "أرشيف"
      default:
        return "ملف"
    }
  }

  function getFileIcon(type: string) {
    switch (type) {
      case "image":
        return FileImage
      case "document":
        return FileText
      case "video":
        return FileVideo
      case "audio":
        return FileAudio
      case "archive":
        return Archive
      default:
        return File
    }
  }

  function getFileColor(type: string) {
    switch (type) {
      case "image":
        return "bg-green-500"
      case "document":
        return "bg-red-500"
      case "video":
        return "bg-purple-500"
      case "audio":
        return "bg-blue-500"
      case "archive":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  function formatFileSize(size: string) {
    return size
  }

  const totalFiles = files.length
  const totalSize = "474.9 MB"
  const sharedFiles = files.filter((f) => f.isShared).length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الملفات</h1>
            <p className="text-gray-600 mt-1">إدارة وتنظيم جميع ملفاتك</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Folder className="w-4 h-4 ml-2" />
              مجلد جديد
            </Button>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع ملفات
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>رفع ملفات جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
                    <Button variant="outline">اختيار الملفات</Button>
                  </div>
                  <div>
                    <Label htmlFor="folder">المجلد</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المجلد" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.name} value={folder.name}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {uploadProgress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>جاري الرفع...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-violet-500 hover:bg-violet-600">رفع الملفات</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <File className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
                  <p className="text-sm text-gray-600">إجمالي الملفات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{folders.length}</p>
                  <p className="text-sm text-gray-600">المجلدات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sharedFiles}</p>
                  <p className="text-sm text-gray-600">ملفات مشتركة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalSize}</p>
                  <p className="text-sm text-gray-600">المساحة المستخدمة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Folders Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">المجلدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map((folder, index) => (
                <motion.div
                  key={folder.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Folder className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{folder.name}</h4>
                      <p className="text-sm text-gray-600">
                        {folder.fileCount} ملف • {folder.size}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and View Controls */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث في الملفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fileTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الكل">جميع المجلدات</SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder.name} value={folder.name}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex border border-gray-200 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${getFileColor(file.type)} rounded-xl flex items-center justify-center`}
                        >
                          <FileIcon className="w-6 h-6 text-white" />
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
                              معاينة
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 ml-2" />
                              تحميل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 ml-2" />
                              مشاركة
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <p className="text-sm text-gray-600">{file.folder}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{file.size}</span>
                        <span>{file.uploadDate}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {file.extension.toUpperCase()}
                          </Badge>
                          {file.isShared && <Badge className="bg-green-100 text-green-700 text-xs">مشترك</Badge>}
                        </div>
                        <span className="text-xs text-gray-500">{file.downloads} تحميل</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-medium text-gray-900">الاسم</th>
                      <th className="text-right p-4 font-medium text-gray-900">النوع</th>
                      <th className="text-right p-4 font-medium text-gray-900">الحجم</th>
                      <th className="text-right p-4 font-medium text-gray-900">المجلد</th>
                      <th className="text-right p-4 font-medium text-gray-900">تاريخ الرفع</th>
                      <th className="text-right p-4 font-medium text-gray-900">الحالة</th>
                      <th className="text-right p-4 font-medium text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file, index) => {
                      const FileIcon = getFileIcon(file.type)
                      return (
                        <motion.tr
                          key={file.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 ${getFileColor(file.type)} rounded-lg flex items-center justify-center`}
                              >
                                <FileIcon className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium text-gray-900">{file.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{file.extension.toUpperCase()}</Badge>
                          </td>
                          <td className="p-4 text-gray-600">{file.size}</td>
                          <td className="p-4 text-gray-600">{file.folder}</td>
                          <td className="p-4 text-gray-600">{file.uploadDate}</td>
                          <td className="p-4">
                            {file.isShared ? (
                              <Badge className="bg-green-100 text-green-700">مشترك</Badge>
                            ) : (
                              <Badge variant="outline">خاص</Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 ml-2" />
                                  معاينة
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 ml-2" />
                                  تحميل
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 ml-2" />
                                  مشاركة
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ملفات</h3>
            <p className="text-gray-600">لم يتم العثور على ملفات تطابق البحث</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
