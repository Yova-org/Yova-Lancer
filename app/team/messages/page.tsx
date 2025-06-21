"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Search,
  Plus,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Archive,
  Star,
  Reply,
  Forward,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard-layout"

const conversations = [
  {
    id: 1,
    name: "سارة أحمد",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "تم الانتهاء من تطوير صفحة تسجيل الدخول، يمكنك مراجعتها",
    timestamp: "منذ 5 دقائق",
    unreadCount: 2,
    isOnline: true,
    role: "مطورة واجهات أمامية",
  },
  {
    id: 2,
    name: "محمد علي",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "سأحتاج لمزيد من التفاصيل حول متطلبات قاعدة البيانات",
    timestamp: "منذ 15 دقيقة",
    unreadCount: 0,
    isOnline: true,
    role: "مطور خلفي",
  },
  {
    id: 3,
    name: "فاطمة حسن",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "تم رفع التصاميم الجديدة على Figma",
    timestamp: "منذ ساعة",
    unreadCount: 1,
    isOnline: false,
    role: "مصممة UI/UX",
  },
  {
    id: 4,
    name: "أحمد محمود",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "API جاهز للاختبار، يرجى المراجعة",
    timestamp: "منذ ساعتين",
    unreadCount: 0,
    isOnline: true,
    role: "مطور تطبيقات جوال",
  },
  {
    id: 5,
    name: "نور الدين",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "وجدت بعض المشاكل في نظام الدفع، سأرسل التقرير",
    timestamp: "منذ 3 ساعات",
    unreadCount: 3,
    isOnline: false,
    role: "مختبر جودة",
  },
  {
    id: 6,
    name: "ليلى عبدالله",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "تم تحديث الجدول الزمني للمشروع",
    timestamp: "أمس",
    unreadCount: 0,
    isOnline: true,
    role: "مديرة مشاريع",
  },
]

const messages = [
  {
    id: 1,
    senderId: 1,
    senderName: "سارة أحمد",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "مرحباً، تم الانتهاء من تطوير صفحة تسجيل الدخول",
    timestamp: "10:30 ص",
    isMe: false,
    attachments: [],
  },
  {
    id: 2,
    senderId: "me",
    senderName: "أنت",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "ممتاز! هل يمكنك إرسال رابط المعاينة؟",
    timestamp: "10:32 ص",
    isMe: true,
    attachments: [],
  },
  {
    id: 3,
    senderId: 1,
    senderName: "سارة أحمد",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "بالطبع، إليك الرابط مع بعض الملاحظات",
    timestamp: "10:35 ص",
    isMe: false,
    attachments: [
      { name: "login-page-preview.png", size: "2.3 MB", type: "image" },
      { name: "notes.pdf", size: "156 KB", type: "document" },
    ],
  },
  {
    id: 4,
    senderId: "me",
    senderName: "أنت",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "شكراً لك، سأراجعها وأرد عليك قريباً",
    timestamp: "10:40 ص",
    isMe: true,
    attachments: [],
  },
  {
    id: 5,
    senderId: 1,
    senderName: "سارة أحمد",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "تمام، في انتظار ملاحظاتك 👍",
    timestamp: "10:42 ص",
    isMe: false,
    attachments: [],
  },
]

export default function TeamMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      // هنا يتم إرسال الرسالة
      setNewMessage("")
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex h-[calc(100vh-8rem)] gap-6">
          {/* Conversations Sidebar */}
          <Card className="w-80 border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">الرسائل</h2>
                <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="group-name">اسم المجموعة</Label>
                        <Input id="group-name" placeholder="أدخل اسم المجموعة" />
                      </div>
                      <div>
                        <Label>أعضاء المجموعة</Label>
                        <div className="space-y-2 mt-2">
                          {conversations.map((member) => (
                            <div key={member.id} className="flex items-center space-x-2">
                              <Checkbox id={`member-${member.id}`} />
                              <Label htmlFor={`member-${member.id}`} className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {member.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsGroupDialogOpen(false)}>
                          إلغاء
                        </Button>
                        <Button className="bg-gradient-to-r from-violet-500 to-purple-600">إنشاء المجموعة</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-1 p-4">
                  {filteredConversations.map((conversation) => (
                    <motion.div key={conversation.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation.id === conversation.id
                            ? "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                              <AvatarFallback>
                                {conversation.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            <p className="text-xs text-gray-400 mt-1">{conversation.role}</p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-violet-500 text-white text-xs">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 border-0 shadow-sm">
            {/* Chat Header */}
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        alt={selectedConversation.name}
                      />
                      <AvatarFallback>
                        {selectedConversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                    <p className="text-xs text-gray-400">{selectedConversation.isOnline ? "متصل الآن" : "غير متصل"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Info className="w-4 h-4 ml-2" />
                        معلومات المحادثة
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="w-4 h-4 ml-2" />
                        إضافة للمفضلة
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 ml-2" />
                        أرشفة المحادثة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 ml-2" />
                        حذف المحادثة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="p-0 flex flex-col h-[calc(100vh-20rem)]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}
                    >
                      {!message.isMe && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                          <AvatarFallback>
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-xs lg:max-w-md ${message.isMe ? "text-right" : ""}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.isMe
                              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2 rounded border ${
                                    message.isMe ? "border-white/20 bg-white/10" : "border-gray-200 bg-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Paperclip className="w-4 h-4" />
                                    <div className="flex-1">
                                      <p className="text-xs font-medium">{attachment.name}</p>
                                      <p className="text-xs opacity-70">{attachment.size}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {!message.isMe && (
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="w-6 h-6">
                                <Reply className="w-3 h-3" />
                              </Button>
                              <Button size="icon" variant="ghost" className="w-6 h-6">
                                <Forward className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="اكتب رسالتك..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="pr-12"
                    />
                    <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
