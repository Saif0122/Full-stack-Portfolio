import AiSetting from '../models/ai-setting.model.js';

export const getAiSettings = async (req, res) => {
  try {
    let settings = await AiSetting.findOne();
    
    // Create default if none exists
    if (!settings) {
      settings = await AiSetting.create({});
    }
    
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateAiSettings = async (req, res) => {
  try {
    let settings = await AiSetting.findOne();
    
    if (!settings) {
      settings = new AiSetting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    settings.updatedBy = req.user._id;
    await settings.save();
    
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
