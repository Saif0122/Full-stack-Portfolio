import { Redirect } from '../models/redirect.model.js';
import { NotFoundLog } from '../models/notfound.model.js';

export const getRedirects = async (req, res) => {
  try {
    const redirects = await Redirect.find().sort('-createdAt');
    res.status(200).json({ success: true, data: redirects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveRedirects = async (req, res) => {
  try {
    // Used by frontend middleware to cache active redirects
    const redirects = await Redirect.find({ isActive: true }).select('source destination statusCode');
    res.status(200).json({ success: true, data: redirects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRedirect = async (req, res) => {
  try {
    const { source, destination, statusCode, notes } = req.body;
    
    // Prevent infinite loops (source == destination)
    if (source === destination) {
      return res.status(400).json({ success: false, message: 'Source and destination cannot be identical (Infinite loop).' });
    }

    const redirect = await Redirect.create({ source, destination, statusCode, notes });
    res.status(201).json({ success: true, data: redirect });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Redirect source already exists.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRedirect = async (req, res) => {
  try {
    const { source, destination } = req.body;
    if (source && destination && source === destination) {
      return res.status(400).json({ success: false, message: 'Source and destination cannot be identical.' });
    }

    const redirect = await Redirect.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!redirect) return res.status(404).json({ success: false, message: 'Redirect not found' });
    res.status(200).json({ success: true, data: redirect });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRedirect = async (req, res) => {
  try {
    const redirect = await Redirect.findByIdAndDelete(req.params.id);
    if (!redirect) return res.status(404).json({ success: false, message: 'Redirect not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotFoundLogs = async (req, res) => {
  try {
    const logs = await NotFoundLog.find().sort('-createdAt').limit(100);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logNotFound = async (req, res) => {
  try {
    const { path, referrer } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    
    await NotFoundLog.create({ path, referrer, userAgent, ipAddress });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
