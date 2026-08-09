import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';


const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '',
});

async function main() {
  try {
    console.log("Starting generation...");
    const result = streamText({
      model: google('gemini-3.5-flash'),
      prompt: "Hello",
    });

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
    console.log("\nDone.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();
