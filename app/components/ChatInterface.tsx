import type { FormEvent } from "react"
import type { Message } from "ai"

interface ChatInterfaceProps {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  showOptions: boolean
  isObviousIssue: boolean
  handleOptionSelect: (option: string) => void
}

export default function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  showOptions,
  isObviousIssue,
  handleOptionSelect,
}: ChatInterfaceProps) {
  return (
    <div className="border rounded-lg p-4 max-w-2xl mx-auto">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Enter your symptoms or choose an option..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
          Send
        </button>
      </form>
      {showOptions && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">
            {isObviousIssue ? "How would you like to proceed?" : "What would you like to do?"}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {isObviousIssue ? (
              <>
                <button
                  onClick={() => handleOptionSelect("More Information")}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  More Information
                </button>
                <button
                  onClick={() => handleOptionSelect("Meditation")}
                  className="bg-purple-500 text-white p-2 rounded"
                >
                  Meditation
                </button>
                <button onClick={() => handleOptionSelect("Talk")} className="bg-yellow-500 text-white p-2 rounded">
                  Talk
                </button>
                <button
                  onClick={() => handleOptionSelect("Distractions")}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Distractions
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleOptionSelect("Breathing Exercises")}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Breathing Exercises
                </button>
                <button
                  onClick={() => handleOptionSelect("Distractions")}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Distractions
                </button>
                <button
                  onClick={() => handleOptionSelect("Information")}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Information
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

