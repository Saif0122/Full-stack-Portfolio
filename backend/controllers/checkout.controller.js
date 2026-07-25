import { PaymentService } from '../services/payment.service.js';

const paymentService = new PaymentService();

export const checkout = async (req, res, next) => {
  try {
    const { orderData, providerName } = req.body;
    // Assume orderData contains product details, user info, etc.
    const result = await paymentService.createPayment(providerName || 'stripe', orderData);
    res.status(200).json({ success: true, data: result.session });
  } catch (error) {
    next(error);
  }
};
