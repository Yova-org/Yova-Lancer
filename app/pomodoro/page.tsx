"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  Coffee,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard-layout"

const pomodoroSessions = [
  {
    id: 1,
    task: "تطوير صفحة المشاريع",
    duration: 25,
    completed: true,
    date: "2024-06-21",
    time: "09:00",
  },
  {
    id: 2,
    task: "مراجعة التصميم",
    duration: 25,
    completed: true,
    date: "2024-06-21",
    time: "09:30",
  },
  {
    id: 3,
    task: "كتابة الوثائق",
    duration: 15,
    completed: true,
    date: "2024-06-21",
    time: "10:00",
  },
  {
    id: 4,
    task: "اختبار الموقع",
    duration: 25,
    completed: false,
    date: "2024-06-21",
    time: "10:30",
  },
]

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [currentTask, setCurrentTask] = useState("مهمة جديدة")
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    soundEnabled: true,
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      if (settings.soundEnabled && audioRef.current) {
        audioRef.current.play()
      }

      if (!isBreak) {
        setCompletedPomodoros((prev) => prev + 1)
        // Start break
        const isLongBreak = (completedPomodoros + 1) % settings.longBreakInterval === 0
        setTimeLeft(isLongBreak ? settings.longBreak * 60 : settings.shortBreak * 60)
        setIsBreak(true)
      } else {
        // Break finished, start new work session
        setTimeLeft(settings.workDuration * 60)
        setIsBreak(false)
      }
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak, completedPomodoros, settings])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(isBreak ? settings.shortBreak * 60 : settings.workDuration * 60)
  }

  const skipSession = () => {
    setIsActive(false)
    if (!isBreak) {
      // Skip work, go to break
      const isLongBreak = (completedPomodoros + 1) % settings.longBreakInterval === 0
      setTimeLeft(isLongBreak ? settings.longBreak * 60 : settings.shortBreak * 60)
      setIsBreak(true)
    } else {
      // Skip break, go to work
      setTimeLeft(settings.workDuration * 60)
      setIsBreak(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    const totalTime = isBreak
      ? (completedPomodoros % settings.longBreakInterval === 0 ? settings.longBreak : settings.shortBreak) * 60
      : settings.workDuration * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const todaysSessions = pomodoroSessions.filter((session) => session.date === "2024-06-21")
  const completedToday = todaysSessions.filter((session) => session.completed).length
  const totalTimeToday = todaysSessions.reduce((acc, session) => acc + session.duration, 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تقنية البومودورو</h1>
            <p className="text-gray-600 mt-1">تحسين التركيز والإنتاجية</p>
          </div>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                الإعدادات
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إعدادات البومودورو</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="workDuration">مدة العمل (دقيقة)</Label>
                  <Input
                    id="workDuration"
                    type="number"
                    value={settings.workDuration}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, workDuration: Number.parseInt(e.target.value) }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shortBreak">الاستراحة القصيرة (دقيقة)</Label>
                  <Input
                    id="shortBreak"
                    type="number"
                    value={settings.shortBreak}
                    onChange={(e) => setSettings((prev) => ({ ...prev, shortBreak: Number.parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="longBreak">الاستراحة الطويلة (دقيقة)</Label>
                  <Input
                    id="longBreak"
                    type="number"
                    value={settings.longBreak}
                    onChange={(e) => setSettings((prev) => ({ ...prev, longBreak: Number.parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="longBreakInterval">فترة الاستراحة الطويلة (كل كم جلسة)</Label>
                  <Input
                    id="longBreakInterval"
                    type="number"
                    value={settings.longBreakInterval}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, longBreakInterval: Number.parseInt(e.target.value) }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="soundEnabled"
                    checked={settings.soundEnabled}
                    onChange={(e) => setSettings((prev) => ({ ...prev, soundEnabled: e.target.checked }))}
                  />
                  <Label htmlFor="soundEnabled">تفعيل الصوت</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => setIsSettingsOpen(false)}>حفظ</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completedPomodoros}</p>
                  <p className="text-sm text-gray-600">جلسات اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
                  <p className="text-sm text-gray-600">مهام مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalTimeToday}</p>
                  <p className="text-sm text-gray-600">دقائق اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                  <p className="text-sm text-gray-600">معدل الإنجاز</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Current Task */}
                  <div>
                    <Input
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      className="text-center text-lg font-medium border-none shadow-none text-gray-900"
                      placeholder="ما المهمة التي تعمل عليها؟"
                    />
                  </div>

                  {/* Timer Display */}
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto relative">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                          className={`transition-all duration-1000 ${isBreak ? "text-green-500" : "text-red-500"}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 mb-2">{formatTime(timeLeft)}</div>
                          <div className={`text-sm font-medium ${isBreak ? "text-green-600" : "text-red-600"}`}>
                            {isBreak ? "استراحة" : "عمل"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress value={getProgress()} className="h-2" />
                    <p className="text-sm text-gray-600">{Math.round(getProgress())}% مكتمل</p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={toggleTimer}
                      size="lg"
                      className={`${
                        isBreak
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Pause className="w-5 h-5 ml-2" />
                          إيقاف مؤقت
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 ml-2" />
                          بدء
                        </>
                      )}
                    </Button>
                    <Button onClick={resetTimer} variant="outline" size="lg">
                      <RotateCcw className="w-5 h-5 ml-2" />
                      إعادة تعيين
                    </Button>
                    <Button onClick={skipSession} variant="outline" size="lg">
                      <Square className="w-5 h-5 ml-2" />
                      تخطي
                    </Button>
                  </div>

                  {/* Session Info */}
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>الجلسة {completedPomodoros + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4" />
                      <span>
                        الاستراحة التالية:{" "}
                        {(completedPomodoros + 1) % settings.longBreakInterval === 0 ? "طويلة" : "قصيرة"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                    >
                      {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Sessions */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">جلسات اليوم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border ${
                        session.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{session.task}</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {session.time} - {session.duration} دقيقة
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden audio element for timer sound */}
        <audio ref={audioRef} preload="auto">
          <source src="/timer-sound.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </DashboardLayout>
  )
}
