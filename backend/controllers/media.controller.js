import { MediaService } from '../services/media.service.js';
import { StorageProviderFactory } from '../providers/storage/storage-provider.factory.js';

const mediaService = new MediaService();
const storage = StorageProviderFactory.getProvider();

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
    const { file, originalName, folder, ...rest } = req.body;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file/image provided' });
    }

    // Upload via active storage provider (Cloudinary)
    const result = await storage.upload(file, {
      folder: folder || 'portfolio_media',
      filename: originalName
    });

    const mediaData = {
      filename: result.publicId,
      originalName: originalName || result.publicId || 'image',
      mimetype: result.format ? `image/${result.format}` : 'image/jpeg',
      size: result.size || 0,
      url: result.url,
      width: result.width,
      height: result.height,
      hash: result.hash || `${Date.now()}`,
      folder: folder || 'portfolio_media',
      uploadedBy: req.user?._id,
      ...rest
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
    const media = await mediaService.getMediaById(id);
    if (media) {
      if (media.filename) {
        await storage.delete(media.filename);
      }
      await mediaService.deleteMedia(id);
    }
    res.status(200).json({ success: true, message: 'Media deleted' });
  } catch (error) {
    next(error);
  }
};
