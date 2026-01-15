"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardNav from "@/components/dashboard-nav"
import { MessageSquare, Send, Search, Paperclip, Phone, Video, MoreVertical, CheckCheck, Check } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conv1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample conversations data
  const conversations = [
    {
      id: "conv1",
      company: "TechCorp Inc.",
      recruiter: "Sarah Johnson",
      recruiterRole: "Senior Recruiter",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for your interest! We'd like to schedule an interview.",
      timestamp: "2 hours ago",
      unread: 2,
      status: "active",
    },
    {
      id: "conv2",
      company: "DesignHub",
      recruiter: "Mike Chen",
      recruiterRole: "Hiring Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Could you share your portfolio with us?",
      timestamp: "1 day ago",
      unread: 0,
      status: "active",
    },
    {
      id: "conv3",
      company: "WebSolutions",
      recruiter: "Lisa Wang",
      recruiterRole: "HR Director",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We'll get back to you within a week.",
      timestamp: "3 days ago",
      unread: 0,
      status: "pending",
    },
    {
      id: "conv4",
      company: "StartupXYZ",
      recruiter: "Alex Rodriguez",
      recruiterRole: "CTO",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for applying. We'll review your application.",
      timestamp: "1 week ago",
      unread: 0,
      status: "closed",
    },
  ]

  // Sample messages for selected conversation
  const messages = [
    {
      id: "msg1",
      sender: "recruiter",
      content: "Hi John! Thank you for applying to the Senior Frontend Developer position at TechCorp Inc.",
      timestamp: "2024-05-10 10:00 AM",
      status: "read",
    },
    {
      id: "msg2",
      sender: "user",
      content: "Thank you for reaching out! I'm very interested in this opportunity.",
      timestamp: "2024-05-10 10:15 AM",
      status: "read",
    },
    {
      id: "msg3",
      sender: "recruiter",
      content:
        "Great! I've reviewed your profile and I'm impressed with your React experience. Would you be available for a technical interview next week?",
      timestamp: "2024-05-10 11:00 AM",
      status: "read",
    },
    {
      id: "msg4",
      sender: "user",
      content: "Yes, I'm available next week. What days work best for your team?",
      timestamp: "2024-05-10 11:30 AM",
      status: "read",
    },
    {
      id: "msg5",
      sender: "recruiter",
      content: "Thanks for your interest! We'd like to schedule an interview.",
      timestamp: "2024-05-12 2:00 PM",
      status: "delivered",
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.recruiter.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-blue-600">AI Job Finder</h1>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r bg-gray-50">
              <div className="p-4 border-b bg-white">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-2">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                        selectedConversation === conversation.id
                          ? "bg-blue-100 border-blue-200"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.recruiter} />
                          <AvatarFallback>
                            {conversation.recruiter
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">{conversation.company}</h3>
                            {conversation.unread > 0 && (
                              <Badge className="bg-blue-600 text-white text-xs">{conversation.unread}</Badge>
                            )}
                          </div>

                          <p className="text-xs text-gray-600 mb-1">
                            {conversation.recruiter} • {conversation.recruiterRole}
                          </p>

                          <p className="text-sm text-gray-700 truncate mb-1">{conversation.lastMessage}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                conversation.status === "active"
                                  ? "border-green-500 text-green-700"
                                  : conversation.status === "pending"
                                    ? "border-yellow-500 text-yellow-700"
                                    : "border-gray-500 text-gray-700"
                              }`}
                            >
                              {conversation.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} alt={selectedConv.recruiter} />
                          <AvatarFallback>
                            {selectedConv.recruiter
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedConv.company}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedConv.recruiter} • {selectedConv.recruiterRole}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={`flex items-center justify-between mt-2 text-xs ${
                                message.sender === "user" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              <span>{message.timestamp}</span>
                              {message.sender === "user" && (
                                <div className="flex items-center gap-1">
                                  {message.status === "read" ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex items-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-[40px] max-h-32 resize-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                      </div>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
