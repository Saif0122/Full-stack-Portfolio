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
    const { stream, fileName, size } = await downloadService.downloadProduct(req.user._id, req.params.id);
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', size);
    
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const generateDownloadLink = async (req, res, next) => {
  try {
    const downloadUrl = await downloadService.generateSecureLink(req.user._id, req.params.productId);
    res.status(200).json({ success: true, url: downloadUrl });
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
