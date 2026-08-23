import AiProviderFactory from '../providers/ai-provider.factory.js';
import AiCacheService from './ai-cache.service.js';
import AIPrompt from '../models/ai-prompt.model.js';
import AIHistory from '../models/ai-history.model.js';

import { TokenEstimator } from '../utils/token-estimator.js';

import AiContextService from './ai-context.service.js';

import { aiSafetyValidator } from '../middleware/ai-safety.middleware.js';

class AiSeoService {
  constructor() {
    this.provider = AiProviderFactory.getProvider();
  }

  async getPromptTemplate(title) {
    const prompt = await AIPrompt.findOne({ title, isActive: true }).sort({ version: -1 });
    if (!prompt) {
      throw new Error(`AI Prompt Template '${title}' not found or inactive.`);
    }
    return prompt;
  }

  injectVariables(templateString, variables) {
    let result = templateString;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }

  async processRequest(promptTitle, variables, userId, moduleName, schema = null) {
    const template = await this.getPromptTemplate(promptTitle);
    const hydratedPrompt = this.injectVariables(template.content, variables);
    const cacheKey = AiCacheService.generateKey(`${promptTitle}-v${template.version}`, variables);
    const cachedResponse = AiCacheService.get(cacheKey);
    
    if (cachedResponse) return cachedResponse;

    let aiResult;
    if (schema) {
      aiResult = await this.provider.generateJson(hydratedPrompt, schema, template.description);
    } else {
      aiResult = await this.provider.generateText(hydratedPrompt, template.description);
    }

    let aiResponse = aiResult.content;
    let inputTokens = aiResult.usage?.inputTokens || 0;
    let outputTokens = aiResult.usage?.outputTokens || 0;
    let isEstimated = !aiResult.usage;

    if (isEstimated) {
      inputTokens = TokenEstimator.estimateTokens(hydratedPrompt);
      outputTokens = TokenEstimator.estimateTokens(aiResponse);
    }

    const totalTokens = inputTokens + outputTokens;
    const cost = TokenEstimator.calculateCost(inputTokens, outputTokens);

    // Apply Safety Layer
    const safetyCheck = aiSafetyValidator(aiResponse);
    aiResponse = safetyCheck.sanitizedResponse;
    const isSafe = safetyCheck.isSafe;
    const safetyFlags = safetyCheck.flags;

    // Apply Composite Confidence Score & Context Memory checks
    if (typeof aiResponse === 'object' && aiResponse.focusKeyword) {
      const duplicateCheck = await AiContextService.checkDuplicateKeyword(aiResponse.focusKeyword);
      
      const composite = AiContextService.calculateCompositeConfidence(
        aiResponse.confidenceScore || 80, // LLM base
        true, // isRelevant
        100,  // completeness
        aiResponse.readabilityScore || 80, // readability
        !duplicateCheck.exists // isUnique
      );
      
      aiResponse.compositeConfidenceScore = composite.score;
      aiResponse.confidenceLevel = composite.level;
      aiResponse.confidenceExplanation = composite.explanation;
      
      aiResponse.issues = aiResponse.issues || [];
      if (duplicateCheck.exists) {
        aiResponse.issues.push(`Keyword '${aiResponse.focusKeyword}' is already in use (${duplicateCheck.method} match). Consider a long-tail variation.`);
      }
      if (!isSafe) {
        aiResponse.issues.push(...safetyFlags);
      }
    }

    const historyEntry = await AIHistory.create({
      user: userId,
      module: moduleName,
      prompt: hydratedPrompt,
      response: typeof aiResponse === 'object' ? JSON.stringify(aiResponse) : aiResponse,
      provider: this.provider.constructor.name,
      promptVersion: template.version,
      status: 'pending',
      originalSuggestion: typeof aiResponse === 'object' ? aiResponse : { text: aiResponse },
      inputTokens,
      outputTokens,
      totalTokens,
      isEstimated,
      cost
    });

    // 6. Cache Result
    const finalResult = {
      suggestion: aiResponse,
      historyId: historyEntry._id
    };
    AiCacheService.set(cacheKey, finalResult);

    return finalResult;
  }

  /**
   * Unified generator for SEO Metadata (Title, Desc, Keywords)
   */
  async generateSeoMetadata(entityType, data, userId) {
    const schema = {
      type: 'object',
      properties: {
        metaTitle: { type: 'string' },
        metaDescription: { type: 'string' },
        focusKeyword: { type: 'string' },
        secondaryKeywords: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['metaTitle', 'metaDescription', 'focusKeyword', 'confidenceScore', 'explanation']
    };

    return this.processRequest('SEO Metadata Generator', {
      entityType,
      title: data.title || '',
      content: data.content || data.description || '',
    }, userId, entityType, schema);
  }

  /**
   * Analyzes content for readability, headings, cannibalization
   */
  async analyzeContentQuality(content, focusKeyword, userId, moduleName) {
    const schema = {
      type: 'object',
      properties: {
        readabilityScore: { type: 'number' },
        issues: { type: 'array', items: { type: 'string' } },
        improvements: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['readabilityScore', 'issues', 'improvements', 'confidenceScore', 'explanation']
    };

    return this.processRequest('Content Quality Analyzer', {
      content,
      focusKeyword
    }, userId, moduleName, schema);
  }

  /**
   * Generates Keyword Intelligence (Semantic, LSI, Intent)
   */
  async generateKeywordIntelligence(topic, userId, moduleName) {
    const schema = {
      type: 'object',
      properties: {
        primaryKeyword: { type: 'string' },
        searchIntent: { type: 'string' },
        semanticKeywords: { type: 'array', items: { type: 'string' } },
        relatedQuestions: { type: 'array', items: { type: 'string' } },
        longTailVariations: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['primaryKeyword', 'searchIntent', 'semanticKeywords', 'confidenceScore', 'explanation']
    };

    return this.processRequest('Keyword Intelligence Generator', {
      topic
    }, userId, moduleName, schema);
  }

  /**
   * Generates AI suggestions for structured data schemas (FAQ, Article, Product, etc.)
   */
  async generateSchemaSuggestions(content, type, userId, moduleName) {
    const schema = {
      type: 'object',
      properties: {
        suggestedSchema: { type: 'object' },
        missingProperties: { type: 'array', items: { type: 'string' } },
        improvements: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['suggestedSchema', 'missingProperties', 'improvements', 'confidenceScore', 'explanation']
    };

    return this.processRequest('Schema Intelligence Generator', {
      content,
      type
    }, userId, moduleName, schema);
  }

  /**
   * Generates location-specific SEO metadata and Google Business Profile suggestions
   */
  async generateLocalSeoSuggestions(locationName, serviceArea, businessData, userId, moduleName = 'local') {
    const schema = {
      type: 'object',
      properties: {
        metaTitle: { type: 'string' },
        metaDescription: { type: 'string' },
        localKeywords: { type: 'array', items: { type: 'string' } },
        gbpDescription: { type: 'string' },
        serviceAreaRecommendations: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['metaTitle', 'metaDescription', 'localKeywords', 'gbpDescription', 'serviceAreaRecommendations', 'confidenceScore', 'explanation']
    };

    return this.processRequest('Local SEO Intelligence Generator', {
      locationName,
      serviceArea,
      businessData: JSON.stringify(businessData)
    }, userId, moduleName, schema);
  }

  /**
   * Generates AI suggestions for Media and Images
   */
  async generateMediaSeoSuggestions(imageContext, metadata, userId, moduleName = 'media') {
    // If the provider supports actual image understanding, this could pass the image. 
    // Currently, it falls back to contextual metadata generation.
    const schema = {
      type: 'object',
      properties: {
        altText: { type: 'string' },
        caption: { type: 'string' },
        description: { type: 'string' },
        filename: { type: 'string' },
        imageKeywords: { type: 'array', items: { type: 'string' } },
        openGraphDescription: { type: 'string' },
        accessibilitySuggestions: { type: 'array', items: { type: 'string' } },
        confidenceScore: { type: 'number' },
        explanation: { type: 'string' }
      },
      required: ['altText', 'caption', 'description', 'filename', 'imageKeywords', 'confidenceScore', 'explanation']
    };

    return this.processRequest('Media SEO Intelligence Generator', {
      context: imageContext,
      metadata: JSON.stringify(metadata)
    }, userId, moduleName, schema);
  }

  /**
   * Generates internal linking suggestions using the content graph
   */
  async generateInternalLinkSuggestions(sourceContent, availableNodes, userId, moduleName = 'linking') {
    const schema = {
      type: 'object',
      properties: {
        suggestions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              targetUri: { type: 'string' },
              suggestedAnchorText: { type: 'string' },
              suggestedPlacement: { type: 'string' },
              contextualRationale: { type: 'string' },
              confidenceScore: { type: 'number' }
            },
            required: ['targetUri', 'suggestedAnchorText', 'suggestedPlacement', 'contextualRationale', 'confidenceScore']
          }
        }
      },
      required: ['suggestions']
    };

    return this.processRequest('Internal Link Rationale Generator', {
      sourceContent,
      availableTargets: JSON.stringify(availableNodes)
    }, userId, moduleName, schema);
  }

  /**
   * Generates Topic Clusters from nodes
   */
  async generateTopicClusters(nodeList, userId, moduleName = 'linking') {
    const schema = {
      type: 'object',
      properties: {
        clusters: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              pillarTitle: { type: 'string' },
              pillarUri: { type: 'string' },
              supportingUris: { type: 'array', items: { type: 'string' } },
              missingSupportingTopics: { type: 'array', items: { type: 'string' } },
              rationale: { type: 'string' }
            },
            required: ['pillarTitle', 'pillarUri', 'supportingUris', 'rationale']
          }
        }
      },
      required: ['clusters']
    };

    return this.processRequest('Topic Cluster Builder', {
      availableNodes: JSON.stringify(nodeList)
    }, userId, moduleName, schema);
  }
  /**
   * Generates recommendations based on integrated analytics from GSC, GA4, Bing, and Clarity.
   */
  async generateAnalyticsRecommendations(analyticsSnapshots, userId, moduleName = 'analytics') {
    const schema = {
      type: 'object',
      properties: {
        insights: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['traffic_drop', 'ctr_drop', 'high_bounce', 'ranking_drop', 'opportunity'] },
              pageUrl: { type: 'string' },
              description: { type: 'string' },
              suggestedAction: { type: 'string' },
              expectedImpact: { type: 'string', enum: ['high', 'medium', 'low'] }
            },
            required: ['type', 'pageUrl', 'description', 'suggestedAction', 'expectedImpact']
          }
        },
        overallAssessment: { type: 'string' }
      },
      required: ['insights', 'overallAssessment']
    };

    return this.processRequest('Analytics Intelligence Assistant', {
      analyticsData: JSON.stringify(analyticsSnapshots)
    }, userId, moduleName, schema);
  }
}

export default new AiSeoService();
