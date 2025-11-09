"use client"

import { useState } from "react"
import { Send, MessageCircle, X } from "lucide-react"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "مرحباً! أنا لوجي، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { role: "user", text: input }])
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: "سأساعدك في البحث عن أفضل المنتجات!" }])
    }, 500)
    setInput("")
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "360px",
            maxHeight: "500px",
            background: "linear-gradient(180deg, var(--card), #05131a)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.03)",
            display: "flex",
            flexDirection: "column",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          >
            <div style={{ fontWeight: "700" }}>Logy - AI Assistant</div>
            <button className="ghost" style={{ padding: "4px" }} onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  background: msg.role === "user" ? "rgba(255, 212, 0, 0.15)" : "rgba(0, 255, 127, 0.1)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  textAlign: msg.role === "user" ? "right" : "left",
                  fontSize: "14px",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div
            style={{ display: "flex", gap: "8px", padding: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.03)" }}
          >
            <input
              type="text"
              placeholder="اسأل شيئاً..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                padding: "8px 12px",
                background: "transparent",
                border: "1px solid rgba(255, 212, 0, 0.2)",
                borderRadius: "6px",
                color: "var(--text)",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button className="btn" style={{ padding: "8px 12px" }} onClick={handleSend}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--pi-yellow), var(--accent-green))",
          border: "0",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "999",
        }}
      >
        <MessageCircle size={24} color="#0D1B2A" />
      </button>
    </>
  )
}
