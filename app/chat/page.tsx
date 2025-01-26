"use client";

import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import ChatInterface from "../components/ChatInterface";

export default function ChatPage() {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "/api/chat",
  });

  const handleOptionSelect = (option: string) => {
    setMessages([
      ...messages,
      { id: Date.now().toString(), role: "user", content: `I choose option: ${option}` }, 
    ]);
  };
  

  return (
    <div
      className="relative h-screen w-screen flex flex-col"
      style={{
        backgroundImage: 'url("/images/chat-background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-10 left-20" style={{ height: "auto" }} >
        <span
          onClick={() => router.push("/")}
          className="text-white text-xl  px-4 py-2 bg-blue-400 rounded-lg shadow-lg hover:bg-blue-600 cursor-pointer"
        >
          Back
        </span>
      </div>


    <div className="flex-grow container mx-auto px-4 py-16">
      <h1 className="text-center text-2xl font-semibold text-blue-800 mb-8">
        Hi! I am Calm-E, your personal health partner
      </h1>
      <div
        className="bg-blue-100/70 p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.7)",
          minHeight: "500px", 
        }}
      >
        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          showOptions={false}
          isObviousIssue={false}
          handleOptionSelect={handleOptionSelect}
        />
      </div>
    </div>
    </div>
  );
}
