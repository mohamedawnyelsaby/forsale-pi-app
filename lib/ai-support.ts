export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  status: "open" | "in-progress" | "resolved" | "closed"
  messages: Message[]
  createdAt: string
  updatedAt: string
}

// Mock AI responses
const aiResponses: Record<string, string> = {
  shipping:
    "Your order is being processed and will be shipped within 24-48 hours. You can track your shipment using the tracking number provided in your order confirmation email.",
  payment:
    "We accept Pi Network payments on our platform. All transactions are secure and processed through the Pi Network blockchain.",
  return: "We offer a 30-day return policy for most items. Please contact our support team to initiate a return.",
  refund: "Refunds are typically processed within 5-7 business days after we receive your returned item.",
  account: "You can manage your account settings in the Dashboard. Click on 'Edit Profile' to update your information.",
  product:
    "We have a wide variety of products available. Use our search and filter features to find exactly what you're looking for.",
  default:
    "Thank you for your question! Our AI support team is here to help. Could you provide more details about your issue?",
}

export async function generateAIResponse(userMessage: string): Promise<string> {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lowerMessage = userMessage.toLowerCase()

  for (const [keyword, response] of Object.entries(aiResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  return aiResponses.default
}

export function createSupportTicket(userId: string, subject: string): SupportTicket {
  return {
    id: `ticket_${Date.now()}`,
    userId,
    subject,
    status: "open",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function addMessageToTicket(ticket: SupportTicket, role: "user" | "assistant", content: string): SupportTicket {
  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  }

  return {
    ...ticket,
    messages: [...ticket.messages, newMessage],
    updatedAt: new Date().toISOString(),
  }
}
