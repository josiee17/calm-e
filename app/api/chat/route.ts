import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

const PROJECT_ID = 'mythic-lead-448919-s4';
const LOCATION = 'northamerica-northeast1'; 
const MODEL_NAME = 'gemini-1.5-flash-001';

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required in the request body.' }, { status: 400 });
    }

    const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

    const generativeModel = vertexAI.getGenerativeModel({
      model: MODEL_NAME,
    });

    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = await resp.response;

    return NextResponse.json({ result: contentResponse }, { status: 200 });

    
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
