import { PaymentService } from '../services/payment.service.js';

const paymentService = new PaymentService();

export const getUserPayments = async (req, res, next) => {
  try {
    const data = await paymentService.getUserPayments(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    const { provider } = req.params;
    await paymentService.handleWebhook(provider, req);
    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
