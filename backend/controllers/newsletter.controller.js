import Newsletter from '../models/newsletter.model.js';

export const getNewsletters = async (req, res, next) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: newsletters });
  } catch (error) { next(error); }
};

export const getNewsletter = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: newsletter });
  } catch (error) { next(error); }
};

export const createNewsletter = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.create(req.body);
    res.status(201).json({ success: true, data: newsletter });
  } catch (error) { 
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }
    next(error); 
  }
};

export const updateNewsletter = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!newsletter) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: newsletter });
  } catch (error) { next(error); }
};

export const deleteNewsletter = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: {} });
  } catch (error) { next(error); }
};
