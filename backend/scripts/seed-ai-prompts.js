import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AIPrompt from '../models/ai-prompt.model.js';

dotenv.config();

const prompts = [
  {
    title: 'SEO Metadata Generator',
    category: 'SEO',
    variables: ['entityType', 'title', 'content'],
    description: 'Generates SEO Title, Meta Description, and Focus Keywords based on content.',
    version: 1,
    isActive: true,
    content: `You are an expert SEO specialist. Analyze the following {{entityType}} content.
Title: {{title}}
Content: {{content}}

Return a JSON object containing:
- metaTitle (max 60 chars)
- metaDescription (max 160 chars)
- focusKeyword
- secondaryKeywords (array of strings)
- confidenceScore (0-100)
- explanation (short reason for your suggestions)`
  },
  {
    title: 'Content Quality Analyzer',
    category: 'SEO',
    variables: ['content', 'focusKeyword'],
    description: 'Evaluates content readability, headings, thin content, and cannibalization risks.',
    version: 1,
    isActive: true,
    content: `You are a Principal Technical SEO Engineer. Analyze the following content for optimization against the focus keyword "{{focusKeyword}}".
Content: {{content}}

Return a JSON object containing:
- readabilityScore (0-100)
- issues (array of strings, identify thin content, missing headings, or poor keyword density)
- improvements (array of actionable recommendations)
- confidenceScore (0-100)
- explanation (brief summary)`
  },
  {
    title: 'Keyword Intelligence Generator',
    category: 'SEO',
    variables: ['topic'],
    description: 'Generates semantic LSI keywords, search intent, and long-tail variations.',
    version: 1,
    isActive: true,
    content: `You are a Google Search Quality Expert. Analyze the topic: "{{topic}}".

Return a JSON object containing:
- primaryKeyword
- searchIntent (Informational, Transactional, Commercial, Navigational)
- semanticKeywords (array of LSI-style keywords)
- relatedQuestions (array of "People Also Ask" style questions)
- longTailVariations (array of strings)
- confidenceScore (0-100)
- explanation (why these keywords were chosen)`
  }
];

const seedPrompts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    for (const p of prompts) {
      await AIPrompt.findOneAndUpdate(
        { title: p.title, version: p.version },
        { $set: p },
        { upsert: true, new: true }
      );
    }
    
    console.log('Successfully seeded AI Prompts.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding prompts:', error);
    process.exit(1);
  }
};

seedPrompts();
