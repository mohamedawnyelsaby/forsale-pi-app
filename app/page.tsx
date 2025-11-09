"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SupportTicket } from "@/lib/ai-support"
import { createSupportTicket, addMessageToTicket, generateAIResponse } from "@/lib/ai-support"
import { Send, MessageCircle, Loader, Home } from "lucide-react"

export default function SupportPage() {
  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [subject, setSubject] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [ticket?.messages])

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim()) return

    const newTicket = createSupportTicket("user_123", subject)
    setTicket(newTicket)
    setShowForm(false)
    setSubject("")
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !ticket || loading) return

    setLoading(true)

    try {
      // Add user message
      let updatedTicket = addMessageToTicket(ticket, "user", inputValue)
      setTicket(updatedTicket)
      setInputValue("")

      // Generate AI response
      const aiResponse = await generateAIResponse(inputValue)

      // Add AI response
      updatedTicket = addMessageToTicket(updatedTicket, "assistant", aiResponse)
      setTicket(updatedTicket)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!ticket ? (
            // Initial Form
            <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-foreground mb-2">AI Support Chat</h1>
                <p className="text-muted-foreground">
                  Get instant help from our AI support team. Available 24/7 to assist you.
                </p>
              </div>

              <form onSubmit={handleStartChat} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What can we help you with?</label>
                  <Input
                    type="text"
                    placeholder="e.g., Track my order, Return a product, Payment issues..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
                  Start Chat
                </Button>
              </form>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Common topics:</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Shipping & Tracking", "Payment Issues", "Returns & Refunds", "Account Help"].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setSubject(topic)
                        const newTicket = createSupportTicket("user_123", topic)
                        setTicket(newTicket)
                        setShowForm(false)
                      }}
                      className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg text-sm text-foreground transition text-left"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Chat Interface
            <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-[600px]">
              {/* Header */}
              <div className="bg-secondary border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{ticket.subject}</h2>
                    <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
                  </div>
                  <button
                    onClick={() => {
                      setTicket(null)
                      setShowForm(true)
                    }}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {ticket.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Start typing to begin the conversation</p>
                  </div>
                ) : (
                  ticket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground border border-border"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-foreground border border-border px-4 py-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-6 bg-secondary">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={loading}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
