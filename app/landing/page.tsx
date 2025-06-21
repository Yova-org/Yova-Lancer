"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import type * as THREE from "three"
import {
  ArrowRight,
  Check,
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  BarChart3,
  Zap,
  Globe,
  Smartphone,
  HeadphonesIcon,
  Briefcase,
  Calendar,
  MessageSquare,
  ChevronDown,
  Play,
  Quote,
  ArrowUp,
  Menu,
  X,
  AlertTriangle,
  Rocket,
  Database,
  Lock,
  Cloud,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  Palette,
  Code,
  Camera,
  Megaphone,
  PenTool,
  Eye,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// 3D Components
function FloatingCube({
  position,
  color,
  speed = 1,
}: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <FloatingCube position={[-3, 2, 0]} color="#8B5CF6" speed={1.5} />
      <FloatingCube position={[3, -1, 0]} color="#06B6D4" speed={1.2} />
      <AnimatedSphere position={[0, 1, 0]} color="#10B981" />
      <AnimatedSphere position={[-2, -2, 0]} color="#F59E0B" />
      <AnimatedSphere position={[2, 2, 0]} color="#EF4444" />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

function DashboardScene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Dashboard Elements */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[-1, 0.5, 0.1]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[1, -0.5, 0.1]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color="#06B6D4" />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}

// Data
const problems = [
  {
    icon: AlertTriangle,
    title: "فقدان المشاريع والعملاء",
    description: "صعوبة في تتبع المشاريع المتعددة وإدارة قاعدة بيانات العملاء",
    impact: "خسارة 30% من الفرص",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "ضياع الوقت في المهام الإدارية",
    description: "قضاء ساعات طويلة في الأعمال الإدارية بدلاً من التركيز على الإبداع",
    impact: "40% من الوقت مهدر",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: DollarSign,
    title: "صعوبة تتبع الأرباح والمصروفات",
    description: "عدم وضوح الوضع المالي وصعوبة في حساب الأرباح الحقيقية",
    impact: "نقص 25% في الأرباح",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "ضعف التواصل مع العملاء",
    description: "فقدان تفاصيل المحادثات والاتفاقات مع العملاء",
    impact: "انخفاض رضا العملاء 35%",
    color: "from-purple-500 to-pink-500",
  },
]

const solutions = [
  {
    problem: "فقدان المشاريع والعملاء",
    solution: "نظام CRM متكامل",
    icon: Database,
    description: "قاعدة بيانات شاملة لجميع مشاريعك وعملائك مع تتبع تلقائي للحالة والتقدم",
    features: ["تتبع تلقائي للمشاريع", "قاعدة بيانات العملاء", "تذكيرات ذكية", "تقارير مفصلة"],
    improvement: "+70% تحسن في إدارة المشاريع",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    problem: "ضياع الوقت في المهام الإدارية",
    solution: "أتمتة ذكية للمهام",
    icon: Zap,
    description: "أتمتة المهام الروتينية مثل إنشاء الفواتير وإرسال التذكيرات والتقارير",
    features: ["فواتير تلقائية", "تذكيرات مجدولة", "تقارير آلية", "قوالب جاهزة"],
    improvement: "+60% توفير في الوقت",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    problem: "صعوبة تتبع الأرباح والمصروفات",
    solution: "لوحة تحكم مالية متقدمة",
    icon: BarChart3,
    description: "تتبع دقيق للإيرادات والمصروفات مع تحليلات مالية عميقة ورسوم بيانية تفاعلية",
    features: ["تتبع الإيرادات", "إدارة المصروفات", "تحليلات مالية", "توقعات الأرباح"],
    improvement: "+45% زيادة في الأرباح",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    problem: "ضعف التواصل مع العملاء",
    solution: "مركز تواصل موحد",
    icon: MessageSquare,
    description: "منصة موحدة لجميع التفاعلات مع العملاء مع سجل كامل للمحادثات والاتفاقات",
    features: ["سجل المحادثات", "تذكيرات المتابعة", "قوالب الرسائل", "تقييم العملاء"],
    improvement: "+80% تحسن في رضا العملاء",
    gradient: "from-teal-500 to-blue-500",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "إنشاء الحساب",
    description: "سجل مجاناً في دقائق وأعد إعداد ملفك الشخصي",
    icon: Users,
    color: "from-violet-500 to-purple-500",
  },
  {
    step: "02",
    title: "إضافة المشاريع والعملاء",
    description: "أضف مشاريعك الحالية وقاعدة بيانات عملائك",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "03",
    title: "تخصيص سير العمل",
    description: "اضبط النظام ليناسب طريقة عملك الخاصة",
    icon: Settings,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04",
    title: "البدء في الإنتاج",
    description: "ابدأ في استخدام الأدوات وشاهد تحسن إنتاجيتك",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
  },
]

const beforeAfter = [
  {
    category: "إدارة المشاريع",
    before: {
      title: "قبل يوفا",
      points: ["ملفات متناثرة", "نسيان المواعيد", "فقدان التفاصيل", "تأخير التسليم"],
      icon: XCircle,
      color: "text-red-500",
    },
    after: {
      title: "مع يوفا",
      points: ["تنظيم شامل", "تذكيرات تلقائية", "تتبع دقيق", "تسليم في الوقت"],
      icon: CheckCircle,
      color: "text-green-500",
    },
  },
  {
    category: "الإدارة المالية",
    before: {
      title: "قبل يوفا",
      points: ["حسابات يدوية", "أخطاء في الفواتير", "عدم وضوح الأرباح", "تأخير المدفوعات"],
      icon: XCircle,
      color: "text-red-500",
    },
    after: {
      title: "مع يوفا",
      points: ["حسابات تلقائية", "فواتير احترافية", "تقارير مالية واضحة", "متابعة المدفوعات"],
      icon: CheckCircle,
      color: "text-green-500",
    },
  },
  {
    category: "إدارة الوقت",
    before: {
      title: "قبل يوفا",
      points: ["تقدير خاطئ للوقت", "عدم تتبع الساعات", "صعوبة التسعير", "إرهاق مستمر"],
      icon: XCircle,
      color: "text-red-500",
    },
    after: {
      title: "مع يوفا",
      points: ["تتبع دقيق للوقت", "تسعير عادل", "توازن أفضل", "إنتاجية عالية"],
      icon: CheckCircle,
      color: "text-green-500",
    },
  },
]

const industries = [
  {
    name: "التطوير والبرمجة",
    icon: Code,
    description: "أدوات متخصصة لمطوري الويب والتطبيقات",
    features: ["تتبع المهام التقنية", "إدارة الأكواد", "تقارير الأداء", "تكامل Git"],
    clients: "2,500+ مطور",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "التصميم الجرافيكي",
    icon: Palette,
    description: "حلول مخصصة للمصممين والفنانين",
    features: ["معرض الأعمال", "إدارة الملفات", "تقييم العملاء", "عروض الأسعار"],
    clients: "1,800+ مصمم",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "التسويق الرقمي",
    icon: Megaphone,
    description: "أدوات شاملة لخبراء التسويق",
    features: ["تتبع الحملات", "تحليل النتائج", "إدارة العملاء", "تقارير ROI"],
    clients: "1,200+ مسوق",
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "الكتابة والمحتوى",
    icon: PenTool,
    description: "منصة متكاملة للكتاب ومنشئي المحتوى",
    features: ["إدارة المقالات", "تتبع الكلمات", "جدولة النشر", "تحليل الأداء"],
    clients: "900+ كاتب",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "التصوير والفيديو",
    icon: Camera,
    description: "حلول احترافية للمصورين ومحرري الفيديو",
    features: ["معرض الصور", "إدارة المشاريع", "عقود التصوير", "تسليم الملفات"],
    clients: "700+ مصور",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "الاستشارات",
    icon: Users,
    description: "أدوات متقدمة للمستشارين والخبراء",
    features: ["جدولة الجلسات", "تتبع الساعات", "تقارير الاستشارة", "إدارة العقود"],
    clients: "600+ مستشار",
    gradient: "from-indigo-500 to-purple-500",
  },
]

const advancedTools = [
  {
    name: "مؤقت الوقت الذكي",
    icon: Clock,
    description: "تتبع دقيق لساعات العمل مع تصنيف المهام وحساب التكاليف تلقائياً",
    features: ["تتبع تلقائي", "تصنيف المهام", "تقارير الوقت", "حساب التكاليف"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "مولد الفواتير الاحترافي",
    icon: FileText,
    description: "إنشاء فواتير احترافية مع قوالب متعددة وإرسال تلقائي للعملاء",
    features: ["قوالب متعددة", "إرسال تلقائي", "تتبع المدفوعات", "تذكيرات الدفع"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "لوحة التحليلات المتقدمة",
    icon: BarChart3,
    description: "رؤى عميقة حول أدائك المالي والإنتاجي مع رسوم بيانية تفاعلية",
    features: ["تحليلات مالية", "مؤشرات الأداء", "توقعات الأرباح", "تقارير مخصصة"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "نظام إدارة العملاء CRM",
    icon: Users,
    description: "قاعدة بيانات شاملة لعملائك مع تتبع التفاعلات وسجل المشاريع",
    features: ["قاعدة بيانات شاملة", "سجل التفاعلات", "تقييم العملاء", "تذكيرات المتابعة"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

const successMetrics = [
  {
    metric: "زيادة الإنتاجية",
    value: "65%",
    description: "متوسط زيادة الإنتاجية للمستخدمين",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    metric: "توفير الوقت",
    value: "40%",
    description: "تقليل الوقت المستغرق في المهام الإدارية",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    metric: "زيادة الأرباح",
    value: "45%",
    description: "متوسط زيادة الأرباح خلال 6 أشهر",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
  },
  {
    metric: "رضا العملاء",
    value: "92%",
    description: "نسبة رضا العملاء عن الخدمة",
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
]

const securityFeatures = [
  {
    icon: Shield,
    title: "تشفير متقدم",
    description: "تشفير AES-256 لحماية جميع بياناتك",
  },
  {
    icon: Lock,
    title: "مصادقة ثنائية",
    description: "حماية إضافية لحسابك مع المصادقة الثنائية",
  },
  {
    icon: Cloud,
    title: "نسخ احتياطية يومية",
    description: "نسخ احتياطية تلقائية لضمان عدم فقدان البيانات",
  },
  {
    icon: Eye,
    title: "مراقبة الأمان 24/7",
    description: "فريق أمان متخصص يراقب النظام على مدار الساعة",
  },
]

const integrations = [
  { name: "Google Workspace", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Microsoft Office", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Slack", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Trello", logo: "/placeholder.svg?height=40&width=40" },
  { name: "PayPal", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Stripe", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Zoom", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Dropbox", logo: "/placeholder.svg?height=40&width=40" },
]

const features = [
  {
    icon: Briefcase,
    title: "إدارة المشاريع",
    description: "نظام متكامل لإدارة جميع مشاريعك بكفاءة عالية وتتبع التقدم",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "إدارة العملاء",
    description: "قاعدة بيانات شاملة لعملائك مع تتبع التفاعلات والمشاريع",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "إدارة المدفوعات",
    description: "تتبع الفواتير والمدفوعات مع تقارير مالية مفصلة",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "تتبع الوقت",
    description: "مؤقت ذكي لتسجيل ساعات العمل وحساب التكاليف تلقائياً",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "التقارير والتحليلات",
    description: "رؤى عميقة حول أدائك المالي والإنتاجي مع رسوم بيانية تفاعلية",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Calendar,
    title: "إدارة المواعيد",
    description: "جدولة الاجتماعات والمهام مع تذكيرات ذكية",
    gradient: "from-teal-500 to-blue-500",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "زيادة الإنتاجية بنسبة 40%",
    description: "أتمتة المهام الروتينية وتحسين سير العمل",
  },
  {
    icon: Shield,
    title: "أمان البيانات المطلق",
    description: "حماية متقدمة لبياناتك مع نسخ احتياطية يومية",
  },
  {
    icon: Zap,
    title: "سرعة في الأداء",
    description: "واجهة سريعة ومتجاوبة تعمل على جميع الأجهزة",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم فني 24/7",
    description: "فريق دعم متخصص متاح على مدار الساعة",
  },
]

const testimonials = [
  {
    name: "أحمد محمد",
    role: "مطور ويب مستقل",
    image: "/placeholder.svg?height=60&width=60",
    content: "يوفا غيرت طريقة عملي تماماً! أصبحت أكثر تنظيماً وزادت أرباحي بنسبة 60% في 6 أشهر فقط.",
    rating: 5,
  },
  {
    name: "فاطمة أحمد",
    role: "مصممة جرافيك",
    image: "/placeholder.svg?height=60&width=60",
    content: "المنصة سهلة الاستخدام ومليئة بالمميزات المفيدة. أنصح بها كل مستقل يريد تطوير عمله.",
    rating: 5,
  },
  {
    name: "محمد علي",
    role: "مستشار تسويق رقمي",
    image: "/placeholder.svg?height=60&width=60",
    content: "التقارير المالية والتحليلات ساعدتني في اتخاذ قرارات أفضل وزيادة هامش الربح.",
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: "المبتدئ",
    price: "مجاني",
    period: "",
    description: "مثالي للمستقلين الجدد",
    features: ["حتى 3 مشاريع", "5 عملاء", "تتبع الوقت الأساسي", "تقارير بسيطة", "دعم عبر البريد الإلكتروني"],
    popular: false,
    cta: "ابدأ مجاناً",
  },
  {
    name: "المحترف",
    price: "299",
    period: "شهرياً",
    description: "للمستقلين المحترفين",
    features: [
      "مشاريع غير محدودة",
      "عملاء غير محدودين",
      "تتبع وقت متقدم",
      "تقارير مفصلة",
      "إدارة الفواتير",
      "دعم أولوية",
      "تكامل مع الأدوات الخارجية",
    ],
    popular: true,
    cta: "جرب 14 يوم مجاناً",
  },
  {
    name: "المؤسسي",
    price: "599",
    period: "شهرياً",
    description: "للفرق والوكالات",
    features: [
      "جميع مميزات المحترف",
      "إدارة الفريق",
      "أذونات متقدمة",
      "تقارير مخصصة",
      "API متقدم",
      "دعم مخصص",
      "تدريب شخصي",
    ],
    popular: false,
    cta: "تواصل معنا",
  },
]

const faqs = [
  {
    question: "هل يمكنني تجربة المنصة مجاناً؟",
    answer: "نعم، نوفر خطة مجانية دائمة تتضمن المميزات الأساسية، كما نوفر تجربة مجانية لمدة 14 يوم للخطط المدفوعة.",
  },
  {
    question: "هل البيانات آمنة ومحمية؟",
    answer: "نعم، نستخدم أحدث تقنيات التشفير وننشئ نسخ احتياطية يومية لضمان أمان بياناتك بنسبة 100%.",
  },
  {
    question: "هل يمكنني إلغاء الاشتراك في أي وقت؟",
    answer: "بالطبع، يمكنك إلغاء اشتراكك في أي وقت دون أي رسوم إضافية، وستحتفظ بالوصول حتى نهاية فترة الاشتراك.",
  },
  {
    question: "هل تدعم المنصة اللغة العربية؟",
    answer: "نعم، المنصة مصممة خصيصاً للسوق العربي وتدعم اللغة العربية بالكامل مع واجهة RTL.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية، فيزا، ماستركارد، والمحافظ الإلكترونية.",
  },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ي</span>
                </div>
              </div>
              <div className="hidden md:block mr-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  يوفا
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mr-10 flex items-baseline space-x-8 space-x-reverse">
                <a
                  href="#problems"
                  className="text-gray-700 hover:text-violet-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  المشاكل والحلول
                </a>
                <a
                  href="#features"
                  className="text-gray-700 hover:text-violet-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  المميزات
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-violet-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  الأسعار
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-violet-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  آراء العملاء
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mr-4 flex items-center space-x-4 space-x-reverse">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-violet-600">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                    ابدأ مجاناً
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a href="#problems" className="text-gray-700 hover:text-violet-600 block px-3 py-2 text-base font-medium">
                المشاكل والحلول
              </a>
              <a href="#features" className="text-gray-700 hover:text-violet-600 block px-3 py-2 text-base font-medium">
                المميزات
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-violet-600 block px-3 py-2 text-base font-medium">
                الأسعار
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-violet-600 block px-3 py-2 text-base font-medium"
              >
                آراء العملاء
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-3 space-x-reverse">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-center">
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full justify-center bg-gradient-to-r from-violet-600 to-purple-600">
                      ابدأ مجاناً
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-violet-100 text-violet-700 border-violet-200 px-4 py-2 text-sm">
                🚀 منصة إدارة الأعمال للمستقلين
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  يوفا
                </span>{" "}
                - منصتك الشاملة
                <br />
                لإدارة أعمالك كمستقل
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                نظام متكامل لإدارة المشاريع والعملاء والمدفوعات مع تقارير مالية مفصلة وأدوات تتبع الوقت المتقدمة. ابدأ
                رحلتك نحو النجاح المهني اليوم!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-8 py-4 text-lg"
                  >
                    ابدأ مجاناً الآن
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 border-violet-200 hover:bg-violet-50"
                >
                  <Play className="ml-2 h-5 w-5" />
                  شاهد العرض التوضيحي
                </Button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>تجربة مجانية 14 يوم</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>بدون بطاقة ائتمانية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>إلغاء في أي وقت</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: "10,000+", label: "مستقل نشط" },
              { number: "50,000+", label: "مشروع مكتمل" },
              { number: "99.9%", label: "وقت التشغيل" },
              { number: "4.9/5", label: "تقييم العملاء" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-violet-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">المشاكل الشائعة</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">التحديات التي يواجهها المستقلون</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نفهم التحديات اليومية التي تواجهك كمستقل، ولذلك صممنا يوفا لحل هذه المشاكل
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${problem.color} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <problem.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{problem.description}</p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 font-semibold">{problem.impact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">الحلول المبتكرة</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف تحل يوفا مشاكلك؟</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                لكل مشكلة حل مبتكر ومدروس يساعدك على تحقيق أهدافك بكفاءة أكبر
              </p>
            </motion.div>
          </div>

          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="text-red-700 font-semibold">المشكلة: {solution.problem}</span>
                    </div>
                  </div>

                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.solution}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{solution.description}</p>

                  <div className="space-y-3 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 font-semibold">{solution.improvement}</span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                    <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
                      <DashboardScene />
                    </Suspense>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">كيف يعمل النظام</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ابدأ في 4 خطوات بسيطة</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                عملية بسيطة وسريعة للبدء في استخدام يوفا وتحسين إنتاجيتك
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* الخط الرابط - يظهر خلف العناصر */}
            <div
              className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              style={{ zIndex: 0 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" style={{ zIndex: 10 }}>
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative bg-white"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg`}
                    style={{ zIndex: 20 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="text-sm font-bold text-gray-900">{step.step}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">قبل وبعد</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الفرق الذي ستلاحظه</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">مقارنة واضحة بين حالتك قبل وبعد استخدام يوفا</p>
            </motion.div>
          </div>

          <div className="space-y-12">
            {beforeAfter.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 text-center">
                      <h3 className="text-2xl font-bold">{comparison.category}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-8 bg-red-50">
                        <div className="flex items-center gap-3 mb-6">
                          <comparison.before.icon className={`w-8 h-8 ${comparison.before.color}`} />
                          <h4 className="text-xl font-bold text-gray-900">{comparison.before.title}</h4>
                        </div>
                        <ul className="space-y-3">
                          {comparison.before.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-center gap-3">
                              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-8 bg-green-50">
                        <div className="flex items-center gap-3 mb-6">
                          <comparison.after.icon className={`w-8 h-8 ${comparison.after.color}`} />
                          <h4 className="text-xl font-bold text-gray-900">{comparison.after.title}</h4>
                        </div>
                        <ul className="space-y-3">
                          {comparison.after.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200">الصناعات المختلفة</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">حلول مخصصة لكل تخصص</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                أدوات متخصصة ومصممة خصيصاً لتلبية احتياجات كل مجال عمل
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{industry.description}</p>

                    <div className="space-y-2 mb-6">
                      {industry.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-violet-600" />
                        <span className="text-violet-600 font-semibold">{industry.clients}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-cyan-200">الأدوات المتقدمة</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أدوات احترافية لعمل احترافي</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مجموعة شاملة من الأدوات المتقدمة المصممة لتلبية احتياجاتك المهنية
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {advancedTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <tool.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{tool.name}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{tool.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {tool.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={tool.image || "/placeholder.svg"}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">النجاح بالأرقام</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية يحققها عملاؤنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                إحصائيات مثبتة تظهر التحسن الملموس في أداء المستقلين الذين يستخدمون يوفا
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${metric.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <metric.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.metric}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">الأمان والموثوقية</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">بياناتك في أمان تام</h2>
              <p className="text-xl text-gray-600 mb-8">نستخدم أحدث تقنيات الأمان لحماية بياناتك ومعلوماتك الحساسة</p>
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
                  <Canvas className="w-full h-full">
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <Environment preset="warehouse" />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />

                    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
                      <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color="#EF4444" metalness={0.8} roughness={0.2} />
                      </mesh>
                    </Float>

                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                      <mesh position={[-2, 1, 0]}>
                        <sphereGeometry args={[0.5, 32, 32]} />
                        <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.3} />
                      </mesh>
                    </Float>

                    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.5}>
                      <mesh position={[2, -1, 0]}>
                        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
                        <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.1} />
                      </mesh>
                    </Float>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                  </Canvas>
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">التكامل مع الأدوات</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">يتكامل مع أدواتك المفضلة</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اربط يوفا بالأدوات التي تستخدمها يومياً لتحقيق أقصى استفادة
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 hover:shadow-xl transition-shadow duration-300">
                  <img src={integration.logo || "/placeholder.svg"} alt={integration.name} className="w-10 h-10" />
                </div>
                <span className="text-sm text-gray-600 text-center">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">المميزات الرئيسية</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كل ما تحتاجه لإدارة أعمالك</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مجموعة شاملة من الأدوات المتقدمة لتسهيل عملك وزيادة إنتاجيتك
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm group">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">لماذا يوفا؟</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">اكتشف الفرق مع يوفا</h2>
              <p className="text-xl text-gray-600 mb-8">
                منصة مصممة خصيصاً للمستقلين العرب لتحقيق أقصى استفادة من وقتهم وجهدهم
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">40%</div>
                    <div className="text-violet-100">زيادة الإنتاجية</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">60%</div>
                    <div className="text-violet-100">توفير الوقت</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">99.9%</div>
                    <div className="text-violet-100">موثوقية النظام</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-violet-100">دعم فني</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200">آراء عملائنا</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ماذا يقول المستقلون عن يوفا؟</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اكتشف كيف ساعدت يوفا آلاف المستقلين في تطوير أعمالهم وزيادة أرباحهم
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Quote className="w-12 h-12 text-violet-600 mx-auto mb-6" />
                  <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">{testimonials[activeTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? "bg-violet-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">خطط الأسعار</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">اختر الخطة المناسبة لك</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                خطط مرنة تناسب جميع احتياجاتك مع إمكانية الترقية أو التراجع في أي وقت
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${plan.popular ? "scale-105" : ""}`}
              >
                <Card className={`h-full border-0 shadow-lg ${plan.popular ? "ring-2 ring-violet-600" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-violet-600 text-white px-4 py-1">الأكثر شعبية</Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && <span className="text-gray-600 mr-2">ج.م / {plan.period}</span>}
                      </div>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">هل تحتاج خطة مخصصة لفريقك أو شركتك؟</p>
            <Button variant="outline" size="lg" className="border-2 border-violet-200 hover:bg-violet-50">
              تواصل مع فريق المبيعات
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200">الأسئلة الشائعة</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أسئلة يطرحها العملاء كثيراً</h2>
              <p className="text-xl text-gray-600">إجابات على أهم الأسئلة حول منصة يوفا ومميزاتها</p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ابدأ رحلتك نحو النجاح اليوم</h2>
            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المستقلين الذين يستخدمون يوفا لإدارة أعمالهم بكفاءة وتحقيق أرباح أكثر
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 px-8 py-4 text-lg">
                  ابدأ تجربتك المجانية
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-violet-600 px-8 py-4 text-lg"
              >
                تحدث مع خبير
              </Button>
            </div>
            <p className="text-violet-200 mt-6 text-sm">
              تجربة مجانية لمدة 14 يوم • بدون بطاقة ائتمانية • إلغاء في أي وقت
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center ml-4">
                  <span className="text-white font-bold text-2xl">ي</span>
                </div>
                <span className="text-3xl font-bold">يوفا</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                منصة شاملة لإدارة أعمال المستقلين مع أدوات متقدمة لتتبع المشاريع والعملاء والمدفوعات.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">المنتج</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    المميزات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأسعار
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    التحديثات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأمان
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">الدعم</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    مركز المساعدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تواصل معنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الحالة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 يوفا ديجيتال. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  )
}
