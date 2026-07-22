import { ChatMessage, BlogPost } from "../types";

/**
 * SYSTEM PROMPTS
 * These_toggle instructions are safe to keep in frontend
 */
const SYSTEM_PROMPTS = {
  assistant: `You are Nexus, Saiful Islam's AI portfolio assistant.
  
PERSONA: Professional, witty, and highly technical Senior Engineer.
CONTEXT: Saiful is a MERN Stack Architect specializing in scalable SaaS.
GOAL: Answer questions about Saiful's skills, experience, and contact info.
CONTACT: If asked to hire, link to: https://wa.me/923169751636?text=Hi%20Saiful

Keep answers concise (under 3 sentences) unless asked for details.`,

  project: `You are a Senior System Architect.
TASK: Create a 12-point technical blueprint for the user's project idea.
MODEL: MERN Stack (MongoDB, Express, React, Node.js).
FORMAT: Strictly plain text. Do not use markdown bolding (**) in headers.

REQUIRED OUTPUT FORMAT (Exactly this style):
1. Architectural Pattern: [Content]
2. Frontend Strategy: [Content]
3. Backend Structure: [Content]
4. Database Schema: [Content]
5. Scaling Logic: [Content]
6. Security Protocol: [Content]
7. Caching Layer: [Content]
8. DevOps Pipeline: [Content]
9. Observability: [Content]
10. API Specification: [Content]
11. Performance Benchmarks: [Content]
12. Risk Mitigation: [Content]`,

  blog: (postTitle: string, context: string) => `You are a Technical Editor for the article "${postTitle}".
CONTEXT: ${context}
TASK: Explain the architectural concepts from the article to the user.
TONE: Educational, senior engineering level.
CONSTRAINT: Answer based strictly on the provided context.`
};

/**
 * 🔐 Secure AI Generator
 * Calls your Vercel serverless function instead of Gemini directly
 */
async function generateAiContent(systemInstruction: string, contents: any) {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction,
        contents,
      }),
    });

    if (!response.ok) {
      throw new Error("AI_API_ERROR");
    }

    const data = await response.json();
    return data.text || "No response generated.";
  } catch (error) {
    console.error("Nexus AI Error:", error);
    return "Nexus Core offline (Rate Limit or Network Error). Try again in 10s.";
  }
}

/**
 * Blog Assistant
 */
export async function getBlogAssistantResponse(
  messages: ChatMessage[],
  post: BlogPost
): Promise<string> {

  const context = JSON.stringify({
    architecture: post.technicalSegments.architecturalDecisions,
    tradeoffs: post.technicalSegments.tradeOffs,
    scaling: post.technicalSegments.scalingStrategy
  });

  const systemPrompt = SYSTEM_PROMPTS.blog(post.title, context);

  const formattedMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  return await generateAiContent(systemPrompt, formattedMessages);
}

/**
 * Project Consultation
 */
export async function getProjectConsultation(idea: string): Promise<string> {
  const contents = [{
    role: "user",
    parts: [{ text: `Create a MERN stack engineering blueprint for: ${idea}` }]
  }];

  return await generateAiContent(SYSTEM_PROMPTS.project, contents);
}

/**
 * General AI Chat
 */
export async function getAIChatResponse(
  messages: ChatMessage[]
): Promise<string> {

  const formattedMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  return await generateAiContent(SYSTEM_PROMPTS.assistant, formattedMessages);
}
