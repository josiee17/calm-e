"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import Header from "./components/Header"
import ChatInterface from "./components/ChatInterface"

export default function Home() {
  const [showOptions, setShowOptions] = useState(false)
  const [isObviousIssue, setIsObviousIssue] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "/api/chat",
  })

  const handleOptionSelect = (option: string) => {
    setMessages([...messages, { id: Date.now().toString(), role: "user", content: `I choose option: ${option}` }])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Virtual Waiting Room Assistant</h1>
        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          showOptions={showOptions}
          isObviousIssue={isObviousIssue}
          handleOptionSelect={handleOptionSelect}
        />
      </main>
    </div>
  )
}

