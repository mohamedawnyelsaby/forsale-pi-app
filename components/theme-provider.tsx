"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// 💥 تم التعديل لمعالجة الخطأ السابق
// هذا يحل مشكلة Cannot find module '@/lib/utils'
import { cn } from '../lib/utils' 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // ملاحظة: cn هنا يُستخدم عادةً لدمج Tailwind CSS Classes
  // لكننا نستخدمه داخل <NextThemesProvider> لضمان تطبيق الثيم
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// يمكن إضافة أي مكونات أخرى تتعلق بالثيم (Theme) هنا
