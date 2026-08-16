# AI Optimization Strategy

This report defines the optimization strategies specifically tailored for the AI Features (Gemini 3.1 Pro integration), focusing on token efficiency, latency, and context management.

## 1. Latency & Streaming

*   **Current State:** Wait times for AI generations block UI rendering, increasing LCP and creating a poor user experience.
*   **Optimization:** Implement the `Vercel AI SDK` `streamText` function. This delivers chunks to the client instantly, reducing Time To First Byte (TTFB) from ~2.5s down to <200ms.
*   **Edge Functions:** Move the AI processing API routes to Vercel Edge Runtime instead of Node.js Serverless to eliminate cold start times.

## 2. Token & Context Optimization

*   **Prompt Compression:** Refactor system prompts to be concise. Remove redundant adjectives and use markdown structures for instructions (which LLMs parse more efficiently).
*   **Context Window Limitation:** 
    *   Do not send the *entire* chat history to the model on every request.
    *   Implement a sliding window: Only send the System Prompt + the last 4-6 conversational turns.

## 3. Semantic Caching (Pinecone & Redis)

*   **Deduplication:** Many users may ask the AI identical or highly similar questions (e.g., "What is your tech stack?").
*   **Strategy:** Implement Semantic Caching.
    1. Embed the user's prompt.
    2. Check Pinecone/Redis for a vector match with a cosine similarity > 0.98.
    3. If found, return the cached AI response instantly (saves tokens and reduces latency to <50ms).
    4. If not, call Gemini and cache the response.

## 4. Rate Limiting & Abuse Prevention
*   Enforce strict token-per-minute (TPM) limits on a per-user/IP basis using Redis to prevent runaway cloud billing costs.
