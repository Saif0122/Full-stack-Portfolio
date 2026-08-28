import Message from '../models/message.model.js';
import xss from 'xss';

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) { next(error); }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: message });
  } catch (error) { next(error); }
};

export const createMessage = async (req, res, next) => {
  try {
    const sanitizedBody = {};
    for (const key in req.body) {
      sanitizedBody[key] = typeof req.body[key] === 'string' ? xss(req.body[key]) : req.body[key];
    }
    const message = await Message.create(sanitizedBody);
    res.status(201).json({ success: true, data: message });
  } catch (error) { next(error); }
};

export const updateMessage = async (req, res, next) => {
  try {
    const sanitizedBody = {};
    for (const key in req.body) {
      sanitizedBody[key] = typeof req.body[key] === 'string' ? xss(req.body[key]) : req.body[key];
    }
    const message = await Message.findByIdAndUpdate(req.params.id, sanitizedBody, { new: true, runValidators: true });
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: message });
  } catch (error) { next(error); }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: {} });
  } catch (error) { next(error); }
};
