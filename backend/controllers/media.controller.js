import { MediaService } from '../services/media.service.js';

const mediaService = new MediaService();

export const getAllMedia = async (req, res, next) => {
  try {
    const data = await mediaService.getAllMedia();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await mediaService.getMediaById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Media not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    // Construct the absolute URL. 
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const url = `${protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    const mediaData = {
      type: 'image',
      url: url,
      ...req.body
    };
    
    const data = await mediaService.uploadMedia(mediaData);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await mediaService.updateMedia(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    await mediaService.deleteMedia(id);
    res.status(200).json({ success: true, message: 'Media deleted' });
  } catch (error) {
    next(error);
  }
};
