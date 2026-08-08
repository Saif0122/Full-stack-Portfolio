import jwt from 'jsonwebtoken';
import License from '../models/license.model.js';

export const generateLicense = async (userId, productId, orderId, type = 'single_device') => {
  try {
    // Generate signed JWT as license key
    const payload = {
      user: userId.toString(),
      product: productId.toString(),
      order: orderId.toString(),
      type
    };

    const secret = process.env.JWT_SECRET || 'nexus_default_secret_key_2026';
    // Expire in 1 year for single_device, or no expiry for unlimited
    const options = type === 'single_device' ? { expiresIn: '365d' } : {};
    
    const key = jwt.sign(payload, secret, options);

    // Save to database
    const license = new License({
      key,
      user: userId,
      product: productId,
      order: orderId,
      type,
      status: 'active',
      expiresAt: type === 'single_device' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null
    });

    await license.save();
    return key;
  } catch (error) {
    console.error('License Generation Error:', error);
    throw new Error('Failed to generate license key');
  }
};
