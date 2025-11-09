"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { SupportTicket } from "@/lib/ai-support"
import { createSupportTicket, addMessageToTicket, generateAIResponse } from "@/lib/ai-support"
import { MessageCircle, X, Send, Loader } from "lucide-react"

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [ticket?.messages])

  const handleOpen = () => {
    setIsOpen(true)
    if (!ticket) {
      const newTicket = createSupportTicket("user_123", "Chat Support")
      setTicket(newTicket)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !ticket || loading) return

    setLoading(true)

    try {
      let updatedTicket = addMessageToTicket(ticket, "user", inputValue)
      setTicket(updatedTicket)
      setInputValue("")

      const aiResponse = await generateAIResponse(inputValue)
      updatedTicket = addMessageToTicket(updatedTicket, "assistant", aiResponse)
      setTicket(updatedTicket)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg transition z-40"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-secondary border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Support</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                setTicket(null)
              }}
              className="text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {ticket?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground border border-border"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground border border-border px-3 py-2 rounded-lg">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-secondary">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2 bg-primary hover:bg-primary/90 rounded-lg transition disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
