import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "يوفا - منصة إدارة أعمال المستقلين",
  description: "منصة SaaS متكاملة لإدارة المشاريع والعملاء والمدفوعات للمستقلين",
  keywords: "فريلانسر, إدارة المشاريع, العملاء, المدفوعات, SaaS",
  authors: [{ name: "Yova Digital" }],
  creator: "Yova Digital",
  publisher: "Yova Digital",
  robots: "index, follow",
  openGraph: {
    title: "يوفا - منصة إدارة أعمال المستقلين",
    description: "منصة SaaS متكاملة لإدارة المشاريع والعملاء والمدفوعات للمستقلين",
    url: "https://yova.digital",
    siteName: "Yova Digital",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "يوفا - منصة إدارة أعمال المستقلين",
    description: "منصة SaaS متكاملة لإدارة المشاريع والعملاء والمدفوعات للمستقلين",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8B5CF6",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${cairo.className} antialiased`}>{children}</body>
    </html>
  )
}
