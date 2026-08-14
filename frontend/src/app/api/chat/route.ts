import { streamText, convertToModelMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const runtime = 'edge';

// Basic in-memory rate limiting for edge (for production, use Upstash Redis)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const limit = rateLimit.get(ip);
    if (limit && now - limit.timestamp < 60000) {
      if (limit.count >= 10) {
        return new Response('Rate limit exceeded. Try again in a minute.', { status: 429 });
      }
      limit.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse Request
    const { messages, context } = await req.json();

    // 3. Semantic Search (RAG)
    let ragContext = '';
    try {
      const lastMessage = messages[messages.length - 1]?.content;
      if (lastMessage && process.env.PINECONE_API_KEY && (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY)) {
        // Dynamically import to avoid edge runtime issues if missing
        const { Pinecone } = await import('@pinecone-database/pinecone');
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        
        const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
        const index = pc.Index(process.env.PINECONE_INDEX || 'portfolio-knowledge');
        
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '');
        // Generate embedding for the user's query
        const embeddingModel = ai.getGenerativeModel({ model: 'text-embedding-004' });
        const result = await embeddingModel.embedContent(lastMessage);
        const embedding = result.embedding.values;

        // Query Pinecone
        const queryResponse = await index.query({
          vector: embedding,
          topK: 3,
          includeMetadata: true
        });

        if (queryResponse.matches.length > 0) {
          ragContext = queryResponse.matches
            .map(match => match.metadata?.text || '')
            .join('\n\n');
        }
      }
    } catch (e) {
      console.warn('Semantic search failed, falling back to page context only.', e);
    }

    // 4. Build Dynamic System Prompt
    const systemPrompt = buildSystemPrompt(context, ragContext);

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '';
    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const result = streamText({
      model: google('gemini-3.5-flash'), // Updated to latest available model
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return new Response(error.stack || error.message || 'Internal Server Error', { status: 500 });
  }
}

function buildSystemPrompt(context: any, ragContext: string = '') {
  let prompt = `You are Nexus, an intelligent, helpful, and professional AI assistant for Saif's portfolio, blog, and store. 
Your goal is to assist visitors, explain technical concepts, recommend products, and answer questions based on the context provided.
Do NOT hallucinate information. If you don't know the answer, politely say so.

### Current Page Context
The user is currently viewing the following page:
URL: ${context?.url || 'Unknown'}
Title: ${context?.title || 'Unknown'}
Description: ${context?.description || 'None'}

### Page Content Summary
${context?.headings ? `Headings on this page: ${context.headings.join(', ')}` : ''}
${context?.specificContent ? `Content snippet: ${context.specificContent}` : ''}
`;

  if (ragContext) {
    prompt += `\n\n### Additional Knowledge Base Retrievals\nHere is some additional information retrieved from the knowledge base that might be relevant to the user's question:\n${ragContext}\n`;
  }

  // Route specific personas
  if (context?.path?.includes('/blog')) {
    prompt += `\n\nRole: You are acting as a Blog Tutor. Explain the concepts in the article clearly and answer any questions the user has about the technical details mentioned in the content snippet.`;
  } else if (context?.path?.includes('/store')) {
    prompt += `\n\nRole: You are acting as a Store Assistant. Help the user understand the product features, pricing, licensing, and technical requirements.`;
  } else if (context?.path?.includes('/projects')) {
    prompt += `\n\nRole: You are acting as a Project Expert. Explain the architecture, tech stack, and challenges overcome in the current project.`;
  }

  return prompt;
}
