import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

const PROJECT_ID = 'mythic-lead-448919-s4';
const LOCATION = 'northamerica-northeast1';
const MODEL_NAME = 'gemini-1.5-flash-001';
let globalSymptom: string | null = null;

export async function POST(req: NextRequest) {
try {
// Parse the request body
    const body = await req.json();
const { prompt, userStep } = body;

if (!prompt) {
return NextResponse.json({ error: 'Prompt is required in the request body.' }, { status: 400 });
}

// Define the base system prompt
    const systemPrompt = `
    You are a medical chat bot assisting patients already in a waiting room. 
    Start by greating the patient and explaining what the patient can expect, what is the main cause of their symptom, and why does the symptom usually appear. 
    Your tone should be nice, caring, friendly. Do not provide medical diagnoses or treatments.
    Short responses with no bold font.
    Here’s the structure:
    Provide concise information on the next steps based on symptoms.
    `;


// Combine the system prompt with the user's input and step
    let fullPrompt = systemPrompt;
let nextStep = 'initial'; // Initialize the next step with the current step

    if (nextStep === 'initial') {
      globalSymptom = prompt;
fullPrompt += `
Patient's Symptoms: ${prompt}
Begin by explaining what the patient can expect.
`;
nextStep = 'support_options'

} if (nextStep === 'support_options') {
fullPrompt += `
Ask the patient which type of assistance they would like from the following options (make sure to enumerate them):
1. List 3-4 questions the doctor might ask based on the problem and explain expected respond.
2. Meditation or breathing exercises
3. A listening ear or casual conversation
4. Distractions based on your interests.
Ask them to select 1, 2, 3, 4
Wait for their choice before proceeding.
`;

if(prompt === '1'){
nextStep = 'select1'
fullPrompt = `You are a medical chat bot assisting patients already in a waiting room. Please be nice, caring, friendly, professional, empathetic, and concise. 
Provide questions the doctor might ask based on the user's symptom ${globalSymptom} and the expected form of answers.`;
}

else if(prompt === '2'){
nextStep = 'select2';
fullPrompt = `Guide the user through a concise and short breathing exercise based on the user's symptom ${globalSymptom}.`;
}

else if(prompt === '3'){
nextStep = 'select3';
fullPrompt = `Give a listening ear or have a casual conversation with the user based on the user's symptom ${globalSymptom}`;
}

else if(prompt === '4'){
nextStep = 'select4';
fullPrompt = `Do whatever distraction the user wants, whether it's games, stories, etc based on the user's symptom ${globalSymptom}.`;
}

else{
fullPrompt += `Please select a valid option (1, 2, 3, or 4).`;
}

}

// Initialize the Vertex AI client
    const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

// Access the generative model
    const generativeModel = vertexAI.getGenerativeModel({
model: MODEL_NAME,
});

// Generate the content based on the structured prompt
    const resp = await generativeModel.generateContent(fullPrompt);
const contentResponse = await resp.response;

// Return the generated content as the API response
    return NextResponse.json({ result: contentResponse }, { status: 200 });

} catch (error) {
console.error('Error generating content:', error);
return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
}
}