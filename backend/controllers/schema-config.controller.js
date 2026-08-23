import SchemaConfig from '../models/schema-config.model.js';

export const getSchemaConfig = async (req, res) => {
  try {
    let config = await SchemaConfig.findOne();
    if (!config) {
      config = await SchemaConfig.create({}); // Create default if none exists
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateSchemaConfig = async (req, res) => {
  try {
    let config = await SchemaConfig.findOne();
    if (config) {
      config = await SchemaConfig.findByIdAndUpdate(config._id, req.body, { new: true, runValidators: true });
    } else {
      config = await SchemaConfig.create(req.body);
    }
    res.status(200).json({ success: true, data: config, message: 'Schema configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
