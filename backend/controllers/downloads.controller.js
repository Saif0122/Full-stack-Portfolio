import { DownloadService } from '../services/download.service.js';

const downloadService = new DownloadService();

export const getProductDownloads = async (req, res, next) => {
  try {
    const data = await downloadService.getProductDownloads(req.params.productId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const downloadFile = async (req, res, next) => {
  try {
    const fileUrl = await downloadService.downloadProduct(req.user._id, req.params.id);
    // In a real app, this would redirect to a signed URL or stream the file
    res.status(200).json({ success: true, data: { fileUrl } });
  } catch (error) {
    next(error);
  }
};

export const createDownload = async (req, res, next) => {
  try {
    const data = await downloadService.createDownload(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
