import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 300 // 5 minutes

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages: [
      {
        role: "system",
        content: `You are a helpful medical chatbot assisting patients in a virtual waiting room. Your task is to:
1. Analyze the patient's symptoms
2. Determine if the issue is obvious (e.g., "broken leg") or not
3. Provide appropriate next steps, potential questions the doctor might ask, and how to answer them
4. Offer options based on the severity of the issue:
   - For obvious issues: More information, meditation, talk, or distractions
   - For non-obvious issues: Breathing exercises, distractions, or information on possible causes
5. Respond to the patient's choice with relevant information or guidance
Always maintain a compassionate and professional tone. Do not provide definitive medical diagnoses or treatment advice.`,
      },
      ...messages,
    ],
  })

  return result.toDataStreamResponse()
}

