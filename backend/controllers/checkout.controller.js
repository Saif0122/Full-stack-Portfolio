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

export const webhook = async (req, res, next) => {
  try {
    const providerName = 'stripe'; // Or determine from headers
    const result = await paymentService.handleWebhook(providerName, req);
    res.status(200).send('Webhook handled');
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
