import type React from "react"
import type { Metadata } from "next"
// تم إزالة استيراد خطوط Geist التي قد تسبب مشاكل في بيئة النشر
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Forsale - Global Marketplace",
  description: "Buy and sell anything with AI-powered intelligence on Pi Network",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* تم تعديل body class لاستخدام font-sans الآمن بدون خط Geist */}
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
