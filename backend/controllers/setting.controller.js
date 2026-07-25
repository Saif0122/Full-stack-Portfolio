import { SettingService } from '../services/setting.service.js';

const settingService = new SettingService();

export const getAllSettings = async (req, res, next) => {
  try {
    const data = await settingService.getAllSettings();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const data = await settingService.getSetting(key);
    if (!data) return res.status(404).json({ success: false, message: 'Setting not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createSetting = async (req, res, next) => {
  try {
    const data = await settingService.createSetting(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const data = await settingService.updateSetting(key, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    await settingService.deleteSetting(key);
    res.status(200).json({ success: true, message: 'Setting deleted' });
  } catch (error) {
    next(error);
  }
};
