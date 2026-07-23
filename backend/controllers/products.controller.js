import Product from '../models/product.model.js';

export const getProducts = async (req, res, next) => {
  try {
    // Scaffolded method
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    // Scaffolded method
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    // Scaffolded method
    res.status(201).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
