import { NextRequest, NextResponse } from 'next/server';
import { TextModel } from '@google-cloud/vertexai';

// Constants for Vertex AI configuration
const PROJECT_ID = 'tensile-topic-448919-d9';
const LOCATION = 'northamerica-northeast1';
const MODEL_NAME = 'text-bison-001'; // Update if needed

// Initialize the TextModel
const textModel = new TextModel({
  projectId: PROJECT_ID,
  location: LOCATION,
});

let patientHasProvidedSymptoms = false; // Track if symptoms are already provided

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, userStep } = body;

    if (!userStep) {
      return NextResponse.json({ error: 'User step is required in the request body.' }, { status: 400 });
    }

    let fullPrompt = '';

    // Handle different conversation steps
    if (userStep === 'greeting') {
      // First step: Greet the patient and ask about symptoms
      patientHasProvidedSymptoms = false; // Reset if starting a new conversation
      fullPrompt = `
        You are a medical chatbot assisting patients in a waiting room.
        Start the conversation by greeting the patient professionally and empathetically.
        Then ask them what symptoms they are experiencing today.
      `;
    } else if (userStep === 'initial' && !patientHasProvidedSymptoms) {
      // Step for receiving symptoms
      fullPrompt = `
        You have received the following symptoms from the patient: ${prompt}.
        Thank them for sharing and provide concise information about what they can expect next.
        Inform them about potential questions the doctor might ask.
      `;
      patientHasProvidedSymptoms = true; // Mark that symptoms have been provided
    } else if (userStep === 'support_options') {
      // Provide support options without asking for symptoms again
      fullPrompt = `
        Ask the patient which type of assistance they would like:
        1. Clarification or coping tips
        2. Meditation or breathing exercises
        3. A listening ear or casual conversation
        4. Distractions based on their interests.
        Wait for their choice before proceeding.
      `;
    } else if (userStep === 'specific_support') {
      // Respond based on the specific support choice
      fullPrompt = `
        Based on the patient's choice, provide relevant support.
        For example:
        - Clarification or coping: Offer detailed information or videos.
        - Meditation: Provide guided exercises.
        - Listening ear: Engage them in a supportive conversation.
        - Distractions: Suggest content based on their preferences.
      `;
    } else {
      // Handle invalid or unrecognized steps
      return NextResponse.json({ error: 'Invalid user step provided.' }, { status: 400 });
    }

    // Generate content from the Vertex AI model
    const [response] = await textModel.predict({
      instances: [{ content: fullPrompt }],
      parameters: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    // Return the generated content
    return NextResponse.json({ result: response.content }, { status: 200 });

  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}