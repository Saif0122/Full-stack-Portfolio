import AiSeoService from '../services/ai-seo.service.js';

export const generateSeoMetadata = async (req, res) => {
  try {
    const { entityType, title, content } = req.body;
    const userId = req.user._id;

    const result = await AiSeoService.generateSeoMetadata(entityType, { title, content }, userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error in generateSeoMetadata:', error);
    if (error.message.includes('AI request limit')) {
      return res.status(429).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const analyzeContentQuality = async (req, res) => {
  try {
    const { content, focusKeyword, moduleName } = req.body;
    const userId = req.user._id;

    const result = await AiSeoService.analyzeContentQuality(content, focusKeyword, userId, moduleName);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Error in analyzeContentQuality:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

export const generateKeywordIntelligence = async (req, res) => {
  try {
    const { topic, moduleName } = req.body;
    const userId = req.user._id;

    const result = await AiSeoService.generateKeywordIntelligence(topic, userId, moduleName);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error in generateKeywordIntelligence:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};
