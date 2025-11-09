"use client";

import React from "react";

export default function SignupPage() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>إنشاء حساب جديد</h1>
      <form style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          style={{ padding: "0.5rem", width: "250px" }}
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          style={{ padding: "0.5rem", width: "250px" }}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          style={{ padding: "0.5rem", width: "250px" }}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          تسجيل
        </button>
      </form>
    </main>
  );
}

