import Message from '../models/message.model.js';

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
    const message = await Message.create(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (error) { next(error); }
};

export const updateMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
