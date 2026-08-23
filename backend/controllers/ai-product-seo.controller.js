import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateProductSeoSuggestions = async (req, res) => {
  try {
    const { title, description, focusKeyword, features, category } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: 'Gemini API key is missing' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert E-commerce SEO Architect and Technical Copywriter.
      Analyze the following digital product information:
      Title: "${title || ''}"
      Category: "${category || ''}"
      Focus Keyword: "${focusKeyword || ''}"
      Description: "${description || ''}"
      Features: "${features || ''}"
      
      Generate optimized SEO metadata and content enhancements for this product.
      Return the output as a valid JSON object matching exactly this structure (do not include markdown wrapping):
      {
        "metaTitle": "SEO title up to 60 chars",
        "metaDescription": "Benefit-driven description up to 160 chars, including a CTA",
        "focusKeyword": "Primary high-intent keyword",
        "secondaryKeywords": ["keyword 1", "keyword 2", "keyword 3"],
        "longTailKeywords": ["long tail 1", "long tail 2"],
        "benefitFocusedCopy": "A short 2-3 sentence paragraph focusing on the core value proposition for the buyer.",
        "ctaSuggestions": ["Buy now and save", "Get instant access today"],
        "faq": [
          {"question": "Common pre-sale question?", "answer": "Clear, concise answer."}
        ],
        "openGraphDescription": "A compelling description optimized for social sharing."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown formatting if present
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    const parsedData = JSON.parse(cleanText);

    return res.status(200).json({
      success: true,
      data: parsedData
    });
    
  } catch (error) {
    console.error('Error generating AI Product SEO suggestions:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate suggestions', error: error.message });
  }
};
