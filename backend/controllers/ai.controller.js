import aiService from '../services/ai.service.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await aiService.getSettings();
    res.status(200).json({ status: 'success', data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await aiService.updateSettings(req.body);
    res.status(200).json({ status: 'success', data: settings });
  } catch (error) {
    next(error);
  }
};

export const getPrompts = async (req, res, next) => {
  try {
    const prompts = await aiService.getPrompts(req.query);
    res.status(200).json({ status: 'success', data: prompts });
  } catch (error) {
    next(error);
  }
};

export const generate = async (req, res, next) => {
  try {
    const { module, prompt, options } = req.body;
    const response = await aiService.generateContent(req.user._id, module, prompt, options);
    res.status(200).json({ status: 'success', data: response });
  } catch (error) {
    next(error);
  }
};
