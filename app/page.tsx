"use client"

// ----------------------------------------------------------------
// 1. Firebase/Supabase Setup Imports
// ----------------------------------------------------------------
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button"; // افتراض أن لديك زر Tailwind/shadcn/ui
import { LogOut, User as UserIcon } from "lucide-react"; // أيقونات

// ----------------------------------------------------------------
// 2. Component Imports (تمت إضافتها لحل خطأ ReferenceError: Hero is not defined)
// ----------------------------------------------------------------
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

// ----------------------------------------------------------------
// 3. Page Logic and Component Definitions
// ----------------------------------------------------------------

// قم بإنشاء عميل Supabase للمكونات من جانب العميل
const supabase = createClientComponentClient();

export default function ForsalePage() {
  const [user, setUser] = useState<User | null>(null);

  // جلب معلومات المستخدم عند تحميل الصفحة
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  // دالة تسجيل الخروج
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ----------------------------------------------------------------
  // 4. Page Rendering (يستخدم المكونات المستوردة)
  // ----------------------------------------------------------------

  return (
    <main className="min-h-screen bg-background">
      {/* تمرير بيانات المستخدم ودالة تسجيل الخروج إلى Header */}
      <Header user={user} onSignOut={handleSignOut} /> 
      
      {/* استخدام المكونات التي تسببت في الخطأ الآن */}
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <Footer />
    </main>
  );
}

// ----------------------------------------------------------------
// *ملاحظة هامة*:
// يتم افتراض أن الدوال التالية معرفة في ملفات أخرى (مثل components/Hero.tsx)
// ولا يجب أن تكون هنا في هذا الملف (page.tsx)
// *إلا إذا كنت لا تستخدم ملفات مكونات منفصلة، وفي هذه الحالة يجب أن تكون معرفة هنا*
// لكن بما أنك تستخدم Imports، فهذا يعني أنها في ملفات منفصلة.
// *----------------------------------------------------------------
//
// مثال على مكون Header (يجب أن يكون في components/Header.tsx)
//
// function Header({ user, onSignOut }) {
//     return (
//         // ... كود Header ...
//     );
// }
//
// مثال على مكون Hero (يجب أن يكون في components/Hero.tsx)
//
// function Hero() {
//     return (
//         // ... كود Hero ...
//     );
// }
