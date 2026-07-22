import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  try {
    const { systemInstruction, contents } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { text: 'Nexus Core offline (Missing API Key). Please configure GEMINI_API_KEY in server environment.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text || 'No response generated.';
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Nexus AI Route Error:', error);
    return NextResponse.json(
      { text: 'Nexus Core offline (Rate Limit or Network Error). Try again in 10s.' },
      { status: 500 }
    );
  }
}
