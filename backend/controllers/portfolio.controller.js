import { PortfolioService } from '../services/portfolio.service.js';

const portfolioService = new PortfolioService();

export const getAllSections = async (req, res, next) => {
  try {
    const data = await portfolioService.getAllSections();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const data = await portfolioService.getSection(section);
    if (!data) return res.status(404).json({ success: false, message: 'Section not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createSection = async (req, res, next) => {
  try {
    const data = await portfolioService.createSection(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const data = await portfolioService.updateSection(section, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    await portfolioService.deleteSection(section);
    res.status(200).json({ success: true, message: 'Section deleted' });
  } catch (error) {
    next(error);
  }
};
