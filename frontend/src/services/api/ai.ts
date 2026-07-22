import { GoogleGenAI } from "@google/genai";

export default async function handler(req: Request) {
  try {
    const { systemInstruction, contents } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return new Response(
      JSON.stringify({ text: response.text }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Server AI Error:", error);

    return new Response(
      JSON.stringify({ error: "AI service failed" }),
      { status: 500 }
    );
  }
}
